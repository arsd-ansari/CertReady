import "server-only";
import { db } from "@/lib/db";

function startOfUtcDay(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/**
 * Updates the per-exam rollup after any graded activity.
 * Streak: consecutive UTC days with at least one answer.
 */
export async function recordActivity(input: {
  userId: string;
  examId: string;
  answered: number;
  correct: number;
  mockScore?: number | null;
}) {
  const today = startOfUtcDay(new Date());
  const existing = await db.userProgress.findUnique({
    where: { userId_examId: { userId: input.userId, examId: input.examId } },
  });

  let streak = 1;
  if (existing?.lastActivityDate) {
    const last = startOfUtcDay(existing.lastActivityDate);
    const diffDays = Math.round((today.getTime() - last.getTime()) / 86_400_000);
    if (diffDays === 0) streak = existing.currentStreakDays || 1;
    else if (diffDays === 1) streak = existing.currentStreakDays + 1;
  }

  const bestMock =
    input.mockScore == null
      ? existing?.bestMockScore ?? null
      : Math.max(existing?.bestMockScore ?? 0, input.mockScore);

  await db.userProgress.upsert({
    where: { userId_examId: { userId: input.userId, examId: input.examId } },
    create: {
      userId: input.userId,
      examId: input.examId,
      questionsAnswered: input.answered,
      correctAnswers: input.correct,
      mocksCompleted: input.mockScore == null ? 0 : 1,
      bestMockScore: bestMock,
      currentStreakDays: 1,
      lastActivityDate: today,
    },
    update: {
      questionsAnswered: { increment: input.answered },
      correctAnswers: { increment: input.correct },
      mocksCompleted: input.mockScore == null ? undefined : { increment: 1 },
      bestMockScore: bestMock,
      currentStreakDays: streak,
      lastActivityDate: today,
    },
  });
}
