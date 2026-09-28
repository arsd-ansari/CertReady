import "server-only";
import { db } from "@/lib/db";
import { percent } from "@/lib/utils";

export type CategoryPerformance = {
  categoryId: string;
  name: string;
  slug: string;
  examSlug: string;
  examTitle: string;
  correct: number;
  total: number;
  pct: number;
};

/** Combines practice answers and mock answers into one per-category accuracy table. */
export async function getCategoryPerformance(userId: string, examId?: string): Promise<CategoryPerformance[]> {
  const [practice, mock] = await Promise.all([
    db.practiceAnswer.findMany({
      where: { session: { userId, ...(examId ? { examId } : {}) } },
      select: { isCorrect: true, question: { select: { categoryId: true } } },
    }),
    db.mockExamQuestion.findMany({
      where: { mockExam: { userId, status: "COMPLETED", ...(examId ? { examId } : {}) }, selectedOptionId: { not: null } },
      select: { isCorrect: true, question: { select: { categoryId: true } } },
    }),
  ]);

  const tally = new Map<string, { correct: number; total: number }>();
  for (const row of [...practice, ...mock]) {
    const entry = tally.get(row.question.categoryId) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (row.isCorrect) entry.correct += 1;
    tally.set(row.question.categoryId, entry);
  }
  if (tally.size === 0) return [];

  const categories = await db.examCategory.findMany({
    where: { id: { in: [...tally.keys()] } },
    select: { id: true, name: true, slug: true, exam: { select: { slug: true, title: true } } },
  });

  return categories
    .map((c) => {
      const t = tally.get(c.id)!;
      return {
        categoryId: c.id,
        name: c.name,
        slug: c.slug,
        examSlug: c.exam.slug,
        examTitle: c.exam.title,
        correct: t.correct,
        total: t.total,
        pct: percent(t.correct, t.total),
      };
    })
    .sort((a, b) => a.pct - b.pct);
}

export async function getDashboardOverview(userId: string) {
  const [progress, mocks, bookmarks, user] = await Promise.all([
    db.userProgress.findMany({
      where: { userId },
      include: { exam: { select: { id: true, slug: true, title: true, shortTitle: true, _count: { select: { questions: { where: { status: "PUBLISHED" } } } } } } },
      orderBy: { lastActivityDate: "desc" },
    }),
    db.mockExam.findMany({
      where: { userId, status: "COMPLETED" },
      orderBy: { completedAt: "desc" },
      select: { id: true, scorePercent: true, completedAt: true, timeTakenSec: true, totalQuestions: true, correctCount: true, exam: { select: { slug: true, shortTitle: true, title: true } } },
    }),
    db.bookmark.count({ where: { userId } }),
    db.user.findUnique({ where: { id: userId }, select: { targetExamId: true, examDate: true } }),
  ]);

  const questionsAnswered = progress.reduce((n, p) => n + p.questionsAnswered, 0);
  const correctAnswers = progress.reduce((n, p) => n + p.correctAnswers, 0);
  const scores = mocks.map((m) => m.scorePercent ?? 0);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const bestScore = scores.length ? Math.max(...scores) : null;
  const streak = progress.reduce((max, p) => Math.max(max, p.currentStreakDays), 0);

  const categories = await getCategoryPerformance(userId);
  const weak = categories.filter((c) => c.total >= 3 && c.pct < 70).slice(0, 5);

  let target: null | {
    exam: { id: string; slug: string; title: string; shortTitle: string | null; totalQuestions: number };
    examDate: Date | null;
    daysLeft: number | null;
    coveragePct: number;
    distinctAnswered: number;
    bestMockScore: number | null;
    mocksCompleted: number;
  } = null;

  if (user?.targetExamId) {
    const exam = await db.exam.findUnique({
      where: { id: user.targetExamId },
      select: { id: true, slug: true, title: true, shortTitle: true, _count: { select: { questions: { where: { status: "PUBLISHED" } } } } },
    });
    if (exam) {
      const [practiceIds, mockIds] = await Promise.all([
        db.practiceAnswer.findMany({ where: { session: { userId, examId: exam.id } }, select: { questionId: true }, distinct: ["questionId"] }),
        db.mockExamQuestion.findMany({ where: { mockExam: { userId, examId: exam.id }, selectedOptionId: { not: null } }, select: { questionId: true }, distinct: ["questionId"] }),
      ]);
      const distinct = new Set([...practiceIds.map((p) => p.questionId), ...mockIds.map((m) => m.questionId)]).size;
      const prog = progress.find((p) => p.examId === exam.id);
      const daysLeft = user.examDate ? Math.ceil((user.examDate.getTime() - Date.now()) / 86_400_000) : null;
      target = {
        exam: { id: exam.id, slug: exam.slug, title: exam.title, shortTitle: exam.shortTitle, totalQuestions: exam._count.questions },
        examDate: user.examDate,
        daysLeft,
        coveragePct: percent(distinct, exam._count.questions),
        distinctAnswered: distinct,
        bestMockScore: prog?.bestMockScore ?? null,
        mocksCompleted: prog?.mocksCompleted ?? 0,
      };
    }
  }

  return {
    examsStarted: progress.length,
    questionsAnswered,
    accuracy: percent(correctAnswers, questionsAnswered),
    avgScore,
    bestScore,
    streak,
    bookmarks,
    recentMocks: mocks.slice(0, 5),
    scoreTrend: [...mocks]
      .reverse()
      .slice(-12)
      .map((m) => ({ date: m.completedAt!, score: m.scorePercent ?? 0, exam: m.exam.shortTitle ?? m.exam.title })),
    progress,
    categories,
    weak,
    target,
  };
}

export async function getTestHistory(userId: string) {
  const [mocks, sessions] = await Promise.all([
    db.mockExam.findMany({
      where: { userId, status: "COMPLETED" },
      orderBy: { completedAt: "desc" },
      take: 50,
      select: { id: true, scorePercent: true, completedAt: true, timeTakenSec: true, totalQuestions: true, correctCount: true, exam: { select: { slug: true, title: true } } },
    }),
    db.practiceSession.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: 50,
      select: {
        id: true,
        mode: true,
        startedAt: true,
        completedAt: true,
        questionCount: true,
        exam: { select: { slug: true, title: true } },
        category: { select: { name: true } },
        _count: { select: { answers: true } },
        answers: { select: { isCorrect: true } },
      },
    }),
  ]);
  return {
    mocks,
    sessions: sessions.map((s) => ({
      id: s.id,
      mode: s.mode,
      startedAt: s.startedAt,
      completedAt: s.completedAt,
      exam: s.exam,
      category: s.category?.name ?? null,
      answered: s._count.answers,
      correct: s.answers.filter((a) => a.isCorrect).length,
    })),
  };
}

export async function getBookmarks(userId: string) {
  return db.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      question: {
        select: {
          id: true,
          prompt: true,
          explanation: true,
          difficulty: true,
          exam: { select: { slug: true, title: true } },
          category: { select: { name: true, slug: true } },
          options: { orderBy: { sortOrder: "asc" }, select: { id: true, label: true, text: true, isCorrect: true } },
        },
      },
    },
  });
}
