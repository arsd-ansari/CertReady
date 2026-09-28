import "server-only";
import { db } from "@/lib/db";
import { percent } from "@/lib/utils";
import type { MockResult, MockReviewItem } from "./mock-actions";

/** Rebuilds a completed mock's result view from stored rows. Owner-scoped. */
export async function getStoredMockResult(mockId: string, userId: string): Promise<MockResult | null> {
  const mock = await db.mockExam.findFirst({
    where: { id: mockId, userId, status: "COMPLETED" },
    include: {
      exam: { select: { slug: true, title: true } },
      questions: {
        orderBy: { position: "asc" },
        include: {
          question: {
            select: {
              id: true,
              prompt: true,
              explanation: true,
              category: { select: { id: true, name: true, slug: true } },
              options: { orderBy: { sortOrder: "asc" }, select: { id: true, label: true, text: true, isCorrect: true } },
            },
          },
        },
      },
    },
  });
  if (!mock) return null;

  const review: MockReviewItem[] = mock.questions.map((mq) => ({
    id: mq.question.id,
    prompt: mq.question.prompt,
    explanation: mq.question.explanation,
    category: mq.question.category,
    options: mq.question.options,
    selectedOptionId: mq.selectedOptionId,
    isCorrect: mq.isCorrect ?? false,
  }));

  const total = review.length;
  const correct = review.filter((r) => r.isCorrect).length;
  const unanswered = review.filter((r) => r.selectedOptionId === null).length;

  const catMap = new Map<string, { id: string; name: string; slug: string; correct: number; total: number }>();
  for (const r of review) {
    const entry = catMap.get(r.category.id) ?? { ...r.category, correct: 0, total: 0 };
    entry.total += 1;
    if (r.isCorrect) entry.correct += 1;
    catMap.set(r.category.id, entry);
  }
  const byCategory = [...catMap.values()].map((c) => ({ ...c, pct: percent(c.correct, c.total) })).sort((a, b) => a.pct - b.pct);

  return {
    mockId: mock.id,
    exam: mock.exam,
    total,
    correct,
    incorrect: total - correct - unanswered,
    unanswered,
    scorePercent: mock.scorePercent ?? percent(correct, total),
    timeTakenSec: mock.timeTakenSec ?? 0,
    timeLimitSec: mock.timeLimitSec,
    byCategory,
    weakest: byCategory.filter((c) => c.pct < 70).slice(0, 3).map((c) => ({ name: c.name, slug: c.slug, pct: c.pct })),
    review,
  };
}
