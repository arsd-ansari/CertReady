"use server";

import type { Difficulty, PracticeMode } from "@prisma/client";
import { z } from "zod";
import { EVENTS } from "@/lib/analytics/events";
import { trackServer } from "@/lib/analytics/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { getEntitlement, hasPremiumFor, PREMIUM_MAX_QUESTIONS } from "@/lib/entitlements";
import { rateLimitByIp } from "@/lib/rate-limit";
import { recordActivity } from "./progress";
import { getAnswerKey, selectQuestions, type ClientQuestion } from "./select-questions";

const startSchema = z.object({
  examSlug: z.string().min(1),
  mode: z.enum(["QUICK", "CATEGORY", "RANDOM"]),
  categorySlug: z.string().optional().nullable(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional().nullable(),
  count: z.coerce.number().int().min(1).max(PREMIUM_MAX_QUESTIONS).default(10),
});

export type StartPracticeInput = z.input<typeof startSchema>;

export type StartPracticeResult =
  | {
      ok: true;
      sessionId: string | null;
      questions: ClientQuestion[];
      /** True when the set was reduced to the free tier. */
      limited: boolean;
      requestedCount: number;
      isPremium: boolean;
      isSignedIn: boolean;
      exam: { id: string; slug: string; title: string };
      category: { slug: string; name: string } | null;
    }
  | { ok: false; error: string };

export async function startPractice(raw: StartPracticeInput): Promise<StartPracticeResult> {
  const parsed = startSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Invalid practice settings." };
  const input = parsed.data;

  const exam = await db.exam.findFirst({
    where: { slug: input.examSlug, status: "PUBLISHED" },
    select: { id: true, slug: true, title: true, freeQuestionLimit: true },
  });
  if (!exam) return { ok: false, error: "Exam not found." };

  let category: { id: string; slug: string; name: string } | null = null;
  if (input.categorySlug) {
    category = await db.examCategory.findFirst({
      where: { examId: exam.id, slug: input.categorySlug },
      select: { id: true, slug: true, name: true },
    });
    if (!category) return { ok: false, error: "Category not found." };
  }

  const user = await getCurrentUser();
  const entitlement = await getEntitlement(user?.id ?? null);
  const isPremium = hasPremiumFor(entitlement, exam.id);

  const cap = isPremium ? PREMIUM_MAX_QUESTIONS : exam.freeQuestionLimit;
  const count = Math.min(input.count, cap);

  const questions = await selectQuestions({
    examId: exam.id,
    categoryId: category?.id ?? null,
    difficulty: (input.difficulty as Difficulty | null) ?? null,
    count,
    includePremium: isPremium,
  });

  if (questions.length === 0) {
    return { ok: false, error: "No questions match those settings yet. Try another category or difficulty." };
  }

  let sessionId: string | null = null;
  if (user) {
    const session = await db.practiceSession.create({
      data: {
        userId: user.id,
        examId: exam.id,
        mode: input.mode as PracticeMode,
        categoryId: category?.id ?? null,
        difficulty: (input.difficulty as Difficulty | null) ?? null,
        questionCount: questions.length,
      },
      select: { id: true },
    });
    sessionId = session.id;
  }

  trackServer({
    name: EVENTS.practiceStarted,
    userId: user?.id,
    examId: exam.id,
    properties: { mode: input.mode, count: questions.length, category: category?.slug ?? null },
  });

  return {
    ok: true,
    sessionId,
    questions,
    limited: !isPremium && (input.count > cap || questions.length < input.count),
    requestedCount: input.count,
    isPremium,
    isSignedIn: Boolean(user),
    exam: { id: exam.id, slug: exam.slug, title: exam.title },
    category: category ? { slug: category.slug, name: category.name } : null,
  };
}

const answerSchema = z.object({
  sessionId: z.string().nullable().optional(),
  questionId: z.string().min(1),
  optionId: z.string().min(1),
  timeSpentSec: z.number().int().min(0).max(3600).optional(),
});

export type AnswerResult =
  | {
      ok: true;
      isCorrect: boolean;
      correctOptionId: string;
      explanation: string;
      source: { title: string; url: string | null; publisher: string | null } | null;
      sourceNote: string | null;
    }
  | { ok: false; error: string };

export async function answerQuestion(raw: z.input<typeof answerSchema>): Promise<AnswerResult> {
  const parsed = answerSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Invalid answer." };
  const input = parsed.data;

  const key = await getAnswerKey(input.questionId);
  if (!key) return { ok: false, error: "Question not found." };

  const correct = key.options.find((o) => o.isCorrect);
  if (!correct) return { ok: false, error: "Question has no correct option configured." };
  const chosen = key.options.find((o) => o.id === input.optionId);
  if (!chosen) return { ok: false, error: "That option does not belong to this question." };

  const isCorrect = chosen.isCorrect;
  const user = await getCurrentUser();

  if (user && input.sessionId) {
    const session = await db.practiceSession.findFirst({
      where: { id: input.sessionId, userId: user.id },
      select: { id: true, examId: true },
    });
    if (session) {
      const existing = await db.practiceAnswer.findUnique({
        where: { sessionId_questionId: { sessionId: session.id, questionId: key.id } },
        select: { id: true },
      });
      if (!existing) {
        await db.$transaction([
          db.practiceAnswer.create({
            data: {
              sessionId: session.id,
              questionId: key.id,
              selectedOptionId: chosen.id,
              isCorrect,
              timeSpentSec: input.timeSpentSec,
            },
          }),
          db.practiceSession.update({
            where: { id: session.id },
            data: { answeredCount: { increment: 1 }, correctCount: { increment: isCorrect ? 1 : 0 } },
          }),
        ]);
        await recordActivity({ userId: user.id, examId: session.examId, answered: 1, correct: isCorrect ? 1 : 0 });
      }
    }
  }

  trackServer({
    name: EVENTS.questionAnswered,
    userId: user?.id,
    examId: key.examId,
    properties: { questionId: key.id, correct: isCorrect },
  });

  return {
    ok: true,
    isCorrect,
    correctOptionId: correct.id,
    explanation: key.explanation,
    source: key.source,
    sourceNote: key.sourceNote,
  };
}

export async function completePractice(sessionId: string) {
  const user = await getCurrentUser();
  if (!user) return;
  await db.practiceSession.updateMany({
    where: { id: sessionId, userId: user.id, completedAt: null },
    data: { completedAt: new Date() },
  });
}

export async function toggleBookmark(questionId: string): Promise<{ ok: true; bookmarked: boolean } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Sign in to bookmark questions." };

  const existing = await db.bookmark.findUnique({
    where: { userId_questionId: { userId: user.id, questionId } },
  });
  if (existing) {
    await db.bookmark.delete({ where: { id: existing.id } });
    return { ok: true, bookmarked: false };
  }
  const question = await db.question.findFirst({ where: { id: questionId, status: "PUBLISHED" }, select: { id: true } });
  if (!question) return { ok: false, error: "Question not found." };
  await db.bookmark.create({ data: { userId: user.id, questionId } });
  return { ok: true, bookmarked: true };
}

export async function getBookmarkedIds(questionIds: string[]): Promise<string[]> {
  const user = await getCurrentUser();
  if (!user || questionIds.length === 0) return [];
  const rows = await db.bookmark.findMany({
    where: { userId: user.id, questionId: { in: questionIds } },
    select: { questionId: true },
  });
  return rows.map((r) => r.questionId);
}

const reportSchema = z.object({
  questionId: z.string().min(1),
  reason: z.enum(["WRONG_ANSWER", "TYPO", "UNCLEAR", "OUTDATED", "OTHER"]),
  details: z.string().max(2000).optional(),
});

export async function reportQuestion(raw: z.input<typeof reportSchema>): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = reportSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Please choose a reason." };

  const limit = await rateLimitByIp("report-question", 10, 600);
  if (!limit.ok) return { ok: false, error: "Too many reports. Please try again later." };

  const user = await getCurrentUser();
  await db.questionReport.create({
    data: {
      questionId: parsed.data.questionId,
      userId: user?.id ?? null,
      reason: parsed.data.reason,
      details: parsed.data.details?.trim() || null,
    },
  });
  return { ok: true };
}
