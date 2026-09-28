"use server";

import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { EVENTS } from "@/lib/analytics/events";
import { trackServer } from "@/lib/analytics/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { FREE_LIMITS, getEntitlement, hasPremiumFor } from "@/lib/entitlements";
import { percent } from "@/lib/utils";
import { recordActivity } from "./progress";
import { selectMockQuestions, type ClientQuestion } from "./select-questions";

export type StartMockResult =
  | {
      ok: true;
      /** Null for guests: the attempt is graded server-side on submit but not stored. */
      mockId: string | null;
      questions: ClientQuestion[];
      timeLimitSec: number;
      isGuest: boolean;
      exam: { id: string; slug: string; title: string };
      /** Present when an unfinished attempt was resumed (page reload, navigation back). */
      resume?: { answers: Record<string, string>; flags: string[]; elapsedSec: number };
    }
  | { ok: false; error: string; reason?: "LIMIT_REACHED" | "NOT_FOUND" | "NO_QUESTIONS" };

const resumeSelect = {
  id: true,
  startedAt: true,
  timeLimitSec: true,
  questions: {
    orderBy: { position: "asc" },
    select: {
      selectedOptionId: true,
      isFlagged: true,
      question: {
        select: {
          id: true,
          prompt: true,
          difficulty: true,
          isFree: true,
          category: { select: { id: true, slug: true, name: true } },
          options: { orderBy: { sortOrder: "asc" }, select: { id: true, label: true, text: true } },
        },
      },
    },
  },
} satisfies Prisma.MockExamSelect;

/**
 * Returns the user's unexpired IN_PROGRESS attempt for an exam, or null.
 * Expired attempts are marked ABANDONED so they never count toward the free limit.
 */
async function findResumableMock(userId: string, examId: string) {
  const open = await db.mockExam.findMany({
    where: { userId, examId, status: "IN_PROGRESS" },
    orderBy: { startedAt: "desc" },
    select: resumeSelect,
  });
  if (open.length === 0) return null;

  const now = Date.now();
  const live = open.filter((m) => m.startedAt.getTime() + m.timeLimitSec * 1000 > now);
  const expired = open.filter((m) => !live.includes(m));
  if (expired.length > 0) {
    await db.mockExam.updateMany({
      where: { id: { in: expired.map((m) => m.id) } },
      data: { status: "ABANDONED" },
    });
  }
  return live[0] ?? null;
}

export async function startMock(examSlug: string): Promise<StartMockResult> {
  const exam = await db.exam.findFirst({
    where: { slug: examSlug, status: "PUBLISHED" },
    select: { id: true, slug: true, title: true, mockQuestionCount: true, mockTimeMinutes: true },
  });
  if (!exam) return { ok: false, error: "Exam not found.", reason: "NOT_FOUND" };

  const user = await getCurrentUser();

  if (user) {
    const existing = await findResumableMock(user.id, exam.id);
    if (existing && existing.questions.length > 0) {
      const answers: Record<string, string> = {};
      const flags: string[] = [];
      for (const row of existing.questions) {
        if (row.selectedOptionId) answers[row.question.id] = row.selectedOptionId;
        if (row.isFlagged) flags.push(row.question.id);
      }
      return {
        ok: true,
        mockId: existing.id,
        questions: existing.questions.map((row) => row.question),
        timeLimitSec: existing.timeLimitSec,
        isGuest: false,
        exam: { id: exam.id, slug: exam.slug, title: exam.title },
        resume: {
          answers,
          flags,
          elapsedSec: Math.max(0, Math.floor((Date.now() - existing.startedAt.getTime()) / 1000)),
        },
      };
    }
  }

  const entitlement = await getEntitlement(user?.id ?? null);
  const isPremium = hasPremiumFor(entitlement, exam.id);

  if (user && !isPremium) {
    const completed = await db.mockExam.count({
      where: { userId: user.id, examId: exam.id, status: "COMPLETED" },
    });
    if (completed >= FREE_LIMITS.mockExamsPerExam) {
      return {
        ok: false,
        reason: "LIMIT_REACHED",
        error: `Free accounts include ${FREE_LIMITS.mockExamsPerExam} completed mock exams per certification.`,
      };
    }
  }

  const count = user ? exam.mockQuestionCount : Math.min(exam.mockQuestionCount, FREE_LIMITS.guestMockQuestions);
  const questions = await selectMockQuestions({ examId: exam.id, count, includePremium: isPremium });
  if (questions.length === 0) {
    return { ok: false, error: "This exam has no published questions yet.", reason: "NO_QUESTIONS" };
  }

  // Scale the clock to the questions actually served (matters for the shorter guest mock).
  const perQuestionSec = (exam.mockTimeMinutes * 60) / exam.mockQuestionCount;
  const timeLimitSec = Math.max(60, Math.round(perQuestionSec * questions.length));

  let mockId: string | null = null;
  if (user) {
    const mock = await db.mockExam.create({
      data: {
        userId: user.id,
        examId: exam.id,
        totalQuestions: questions.length,
        timeLimitSec,
        questions: {
          create: questions.map((q, index) => ({ questionId: q.id, position: index })),
        },
      },
      select: { id: true },
    });
    mockId = mock.id;
  }

  trackServer({
    name: EVENTS.mockStarted,
    userId: user?.id,
    examId: exam.id,
    properties: { questions: questions.length, guest: !user },
  });

  return {
    ok: true,
    mockId,
    questions,
    timeLimitSec,
    isGuest: !user,
    exam: { id: exam.id, slug: exam.slug, title: exam.title },
  };
}

const saveSchema = z.object({
  mockId: z.string().min(1),
  questionId: z.string().min(1),
  optionId: z.string().nullable(),
  isFlagged: z.boolean().optional(),
});

/** Persists one answer for a signed-in attempt so the user can resume after a reload. */
export async function saveMockAnswer(raw: z.input<typeof saveSchema>) {
  const parsed = saveSchema.safeParse(raw);
  if (!parsed.success) return { ok: false as const };
  const user = await getCurrentUser();
  if (!user) return { ok: false as const };

  const row = await db.mockExamQuestion.findFirst({
    where: {
      mockExamId: parsed.data.mockId,
      questionId: parsed.data.questionId,
      mockExam: { userId: user.id, status: "IN_PROGRESS" },
    },
    select: { id: true, question: { select: { options: { select: { id: true, isCorrect: true } } } } },
  });
  if (!row) return { ok: false as const };

  const chosen = parsed.data.optionId
    ? row.question.options.find((o) => o.id === parsed.data.optionId)
    : null;

  await db.mockExamQuestion.update({
    where: { id: row.id },
    data: {
      selectedOptionId: chosen?.id ?? null,
      isCorrect: chosen ? chosen.isCorrect : null,
      ...(parsed.data.isFlagged === undefined ? {} : { isFlagged: parsed.data.isFlagged }),
    },
  });
  return { ok: true as const };
}

const submitSchema = z.object({
  mockId: z.string().nullable(),
  examSlug: z.string().min(1),
  answers: z.array(z.object({ questionId: z.string(), optionId: z.string().nullable() })),
  timeTakenSec: z.number().int().min(0),
});

export type MockReviewItem = {
  id: string;
  prompt: string;
  explanation: string;
  category: { id: string; name: string; slug: string };
  options: { id: string; label: string; text: string; isCorrect: boolean }[];
  selectedOptionId: string | null;
  isCorrect: boolean;
};

export type MockResult = {
  mockId: string | null;
  exam: { slug: string; title: string };
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  scorePercent: number;
  timeTakenSec: number;
  timeLimitSec: number;
  byCategory: { id: string; name: string; slug: string; correct: number; total: number; pct: number }[];
  weakest: { name: string; slug: string; pct: number }[];
  review: MockReviewItem[];
};

export async function submitMock(raw: z.input<typeof submitSchema>): Promise<{ ok: true; result: MockResult } | { ok: false; error: string }> {
  const parsed = submitSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Invalid submission." };
  const input = parsed.data;

  const exam = await db.exam.findFirst({
    where: { slug: input.examSlug, status: "PUBLISHED" },
    select: { id: true, slug: true, title: true, mockTimeMinutes: true },
  });
  if (!exam) return { ok: false, error: "Exam not found." };

  const user = await getCurrentUser();
  const questionIds = input.answers.map((a) => a.questionId);

  const questions = await db.question.findMany({
    where: { id: { in: questionIds }, examId: exam.id },
    select: {
      id: true,
      prompt: true,
      explanation: true,
      category: { select: { id: true, name: true, slug: true } },
      options: { orderBy: { sortOrder: "asc" }, select: { id: true, label: true, text: true, isCorrect: true } },
    },
  });
  const byId = new Map(questions.map((q) => [q.id, q]));

  const review: MockReviewItem[] = [];
  for (const answer of input.answers) {
    const q = byId.get(answer.questionId);
    if (!q) continue;
    const chosen = q.options.find((o) => o.id === answer.optionId) ?? null;
    review.push({
      id: q.id,
      prompt: q.prompt,
      explanation: q.explanation,
      category: q.category,
      options: q.options,
      selectedOptionId: chosen?.id ?? null,
      isCorrect: chosen?.isCorrect ?? false,
    });
  }

  const total = review.length;
  const correct = review.filter((r) => r.isCorrect).length;
  const unanswered = review.filter((r) => r.selectedOptionId === null).length;
  const scorePercent = percent(correct, total);

  const catMap = new Map<string, { id: string; name: string; slug: string; correct: number; total: number }>();
  for (const r of review) {
    const entry = catMap.get(r.category.id) ?? { ...r.category, correct: 0, total: 0 };
    entry.total += 1;
    if (r.isCorrect) entry.correct += 1;
    catMap.set(r.category.id, entry);
  }
  const byCategory = [...catMap.values()]
    .map((c) => ({ ...c, pct: percent(c.correct, c.total) }))
    .sort((a, b) => a.pct - b.pct);
  const weakest = byCategory.filter((c) => c.pct < 70).slice(0, 3).map((c) => ({ name: c.name, slug: c.slug, pct: c.pct }));

  let timeLimitSec = exam.mockTimeMinutes * 60;

  if (user && input.mockId) {
    const mock = await db.mockExam.findFirst({
      where: { id: input.mockId, userId: user.id },
      select: { id: true, status: true, timeLimitSec: true },
    });
    if (!mock) return { ok: false, error: "Mock exam not found." };
    timeLimitSec = mock.timeLimitSec;

    if (mock.status === "IN_PROGRESS") {
      await db.$transaction([
        ...review.map((r) =>
          db.mockExamQuestion.updateMany({
            where: { mockExamId: mock.id, questionId: r.id },
            data: { selectedOptionId: r.selectedOptionId, isCorrect: r.isCorrect },
          }),
        ),
        db.mockExam.update({
          where: { id: mock.id },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
            timeTakenSec: input.timeTakenSec,
            correctCount: correct,
            scorePercent,
          },
        }),
      ]);
      await recordActivity({ userId: user.id, examId: exam.id, answered: total, correct, mockScore: scorePercent });
    }
  }

  trackServer({
    name: EVENTS.mockCompleted,
    userId: user?.id,
    examId: exam.id,
    properties: { score: scorePercent, total, guest: !user },
  });

  return {
    ok: true,
    result: {
      mockId: user ? input.mockId : null,
      exam: { slug: exam.slug, title: exam.title },
      total,
      correct,
      incorrect: total - correct - unanswered,
      unanswered,
      scorePercent,
      timeTakenSec: input.timeTakenSec,
      timeLimitSec,
      byCategory,
      weakest,
      review,
    },
  };
}
