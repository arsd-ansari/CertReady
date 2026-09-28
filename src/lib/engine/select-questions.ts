import "server-only";
import type { Difficulty, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { shuffle } from "@/lib/utils";

/**
 * Question selection shared by practice and mock exams.
 * Correct-answer flags never leave this module unless the caller asks for them.
 */

export type SelectOptions = {
  examId: string;
  categoryId?: string | null;
  difficulty?: Difficulty | null;
  count: number;
  /** When false, only isFree questions are eligible. */
  includePremium: boolean;
  excludeIds?: string[];
};

export type ClientOption = { id: string; label: string; text: string };
export type ClientQuestion = {
  id: string;
  prompt: string;
  difficulty: Difficulty;
  isFree: boolean;
  category: { id: string; slug: string; name: string };
  options: ClientOption[];
};

const clientQuestionSelect = {
  id: true,
  prompt: true,
  difficulty: true,
  isFree: true,
  category: { select: { id: true, slug: true, name: true } },
  options: {
    orderBy: { sortOrder: "asc" },
    select: { id: true, label: true, text: true },
  },
} satisfies Prisma.QuestionSelect;

/**
 * Picks a random set of published questions. Uses a two-step id sample so it stays fast
 * on large banks (ORDER BY random() over a full table is avoided).
 */
export async function selectQuestions(opts: SelectOptions): Promise<ClientQuestion[]> {
  const where: Prisma.QuestionWhereInput = {
    examId: opts.examId,
    status: "PUBLISHED",
    ...(opts.categoryId ? { categoryId: opts.categoryId } : {}),
    ...(opts.difficulty ? { difficulty: opts.difficulty } : {}),
    ...(opts.includePremium ? {} : { isFree: true }),
    ...(opts.excludeIds?.length ? { id: { notIn: opts.excludeIds } } : {}),
  };

  const ids = await db.question.findMany({ where, select: { id: true } });
  const chosen = shuffle(ids).slice(0, opts.count).map((q) => q.id);
  if (chosen.length === 0) return [];

  const questions = await db.question.findMany({
    where: { id: { in: chosen } },
    select: clientQuestionSelect,
  });

  // Preserve the random order; findMany returns in arbitrary order.
  const byId = new Map(questions.map((q) => [q.id, q]));
  return chosen.map((id) => byId.get(id)).filter((q): q is ClientQuestion => Boolean(q));
}

/**
 * Mock selection weighted by category weight so a mock resembles the real blueprint.
 * Falls back to uniform sampling when weights are missing.
 */
export async function selectMockQuestions(opts: {
  examId: string;
  count: number;
  includePremium: boolean;
}): Promise<ClientQuestion[]> {
  const categories = await db.examCategory.findMany({
    where: { examId: opts.examId },
    select: { id: true, weight: true },
  });
  const totalWeight = categories.reduce((sum, c) => sum + Math.max(c.weight, 0), 0);

  if (categories.length === 0 || totalWeight === 0) {
    return selectQuestions({ ...opts, count: opts.count });
  }

  const picked: ClientQuestion[] = [];
  for (const category of categories) {
    const share = Math.round((Math.max(category.weight, 0) / totalWeight) * opts.count);
    if (share === 0) continue;
    picked.push(
      ...(await selectQuestions({
        examId: opts.examId,
        categoryId: category.id,
        count: share,
        includePremium: opts.includePremium,
      })),
    );
  }

  // Rounding can leave a shortfall; top up from anywhere.
  if (picked.length < opts.count) {
    picked.push(
      ...(await selectQuestions({
        examId: opts.examId,
        count: opts.count - picked.length,
        includePremium: opts.includePremium,
        excludeIds: picked.map((q) => q.id),
      })),
    );
  }

  return shuffle(picked).slice(0, opts.count);
}

/** Server-side grading data for one question. */
export async function getAnswerKey(questionId: string) {
  return db.question.findFirst({
    where: { id: questionId, status: "PUBLISHED" },
    select: {
      id: true,
      examId: true,
      categoryId: true,
      explanation: true,
      sourceNote: true,
      source: { select: { title: true, url: true, publisher: true } },
      options: { select: { id: true, isCorrect: true } },
    },
  });
}
