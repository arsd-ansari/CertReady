import "server-only";
import type { ContentStatus, Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const DAY = 86_400_000;

export async function getAdminAnalytics() {
  const now = Date.now();
  const d1 = new Date(now - DAY);
  const d7 = new Date(now - 7 * DAY);
  const d30 = new Date(now - 30 * DAY);

  const [
    totalUsers,
    newUsers7,
    newUsers30,
    questionsAnswered,
    testsCompleted,
    openReports,
    publishedExams,
    publishedQuestions,
    dauRows,
    mauRows,
    avgScore,
    popularByPractice,
    popularByMock,
    recentEvents,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { createdAt: { gte: d7 } } }),
    db.user.count({ where: { createdAt: { gte: d30 } } }),
    db.practiceAnswer.count().then(async (practice) => practice + (await db.mockExamQuestion.count({ where: { selectedOptionId: { not: null } } }))),
    db.mockExam.count({ where: { status: "COMPLETED" } }),
    db.questionReport.count({ where: { status: "OPEN" } }),
    db.exam.count({ where: { status: "PUBLISHED" } }),
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.analyticsEvent.findMany({ where: { createdAt: { gte: d1 }, userId: { not: null } }, select: { userId: true }, distinct: ["userId"] }),
    db.analyticsEvent.findMany({ where: { createdAt: { gte: d30 }, userId: { not: null } }, select: { userId: true }, distinct: ["userId"] }),
    db.mockExam.aggregate({ where: { status: "COMPLETED" }, _avg: { scorePercent: true } }),
    db.practiceSession.groupBy({ by: ["examId"], _count: { _all: true }, orderBy: { _count: { examId: "desc" } }, take: 5 }),
    db.mockExam.groupBy({ by: ["examId"], where: { status: "COMPLETED" }, _count: { _all: true }, _avg: { scorePercent: true } }),
    db.analyticsEvent.groupBy({ by: ["name"], where: { createdAt: { gte: d7 } }, _count: { _all: true }, orderBy: { _count: { name: "desc" } } }),
  ]);

  const examIds = [...new Set([...popularByPractice.map((p) => p.examId), ...popularByMock.map((m) => m.examId)])];
  const exams = examIds.length ? await db.exam.findMany({ where: { id: { in: examIds } }, select: { id: true, title: true, slug: true } }) : [];
  const examMap = new Map(exams.map((e) => [e.id, e]));
  const mockMap = new Map(popularByMock.map((m) => [m.examId, m]));

  const popularExams = examIds
    .map((id) => ({
      exam: examMap.get(id),
      practiceSessions: popularByPractice.find((p) => p.examId === id)?._count._all ?? 0,
      mocks: mockMap.get(id)?._count._all ?? 0,
      avgScore: mockMap.get(id)?._avg.scorePercent ?? null,
    }))
    .filter((r) => r.exam)
    .sort((a, b) => b.practiceSessions + b.mocks - (a.practiceSessions + a.mocks));

  // Daily signups over the last 14 days for the chart.
  const signups = await db.user.findMany({ where: { createdAt: { gte: new Date(now - 14 * DAY) } }, select: { createdAt: true } });
  const buckets = new Map<string, number>();
  for (let i = 13; i >= 0; i--) buckets.set(new Date(now - i * DAY).toISOString().slice(0, 10), 0);
  for (const s of signups) {
    const key = s.createdAt.toISOString().slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  return {
    totalUsers,
    newUsers7,
    newUsers30,
    questionsAnswered,
    testsCompleted,
    openReports,
    publishedExams,
    publishedQuestions,
    dau: dauRows.length,
    mau: mauRows.length,
    avgScore: avgScore._avg.scorePercent === null ? null : Math.round(avgScore._avg.scorePercent),
    popularExams,
    eventCounts: recentEvents.map((e) => ({ name: e.name, count: e._count._all })),
    signupSeries: [...buckets.entries()].map(([date, count]) => ({ date: date.slice(5), count })),
  };
}

export async function listAdminExams() {
  return db.exam.findMany({
    orderBy: [{ status: "asc" }, { title: "asc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      isFeatured: true,
      scope: true,
      updatedAt: true,
      category: { select: { name: true } },
      _count: { select: { questions: true, categories: true } },
    },
  });
}

export async function getAdminExam(id: string) {
  return db.exam.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true } },
      categories: { orderBy: { sortOrder: "asc" }, include: { _count: { select: { questions: true } } } },
      _count: { select: { questions: true } },
    },
  });
}

export type QuestionFilters = { categoryId?: string; status?: string; isFree?: string; q?: string; page?: number };

export async function listAdminQuestions(examId: string, filters: QuestionFilters) {
  const pageSize = 25;
  const page = Math.max(1, filters.page ?? 1);
  const status: ContentStatus | undefined =
    filters.status === "DRAFT" || filters.status === "PUBLISHED" || filters.status === "ARCHIVED" ? filters.status : undefined;
  const where: Prisma.QuestionWhereInput = {
    examId,
    ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
    ...(status ? { status } : {}),
    ...(filters.isFree === "free" ? { isFree: true } : filters.isFree === "premium" ? { isFree: false } : {}),
    ...(filters.q ? { prompt: { contains: filters.q, mode: "insensitive" as const } } : {}),
  };
  const [total, questions] = await Promise.all([
    db.question.count({ where }),
    db.question.findMany({
      where,
      orderBy: [{ category: { sortOrder: "asc" } }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        prompt: true,
        difficulty: true,
        isFree: true,
        status: true,
        updatedAt: true,
        category: { select: { name: true } },
        _count: { select: { reports: { where: { status: "OPEN" } } } },
      },
    }),
  ]);
  return { total, questions, page, pageSize, pages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getAdminQuestion(id: string) {
  return db.question.findUnique({
    where: { id },
    include: {
      options: { orderBy: { sortOrder: "asc" } },
      exam: { select: { id: true, title: true, slug: true, categories: { orderBy: { sortOrder: "asc" }, select: { id: true, name: true } } } },
      reports: { where: { status: "OPEN" }, orderBy: { createdAt: "desc" } },
    },
  });
}

export async function listSources() {
  return db.sourceReference.findMany({ orderBy: { title: "asc" }, include: { _count: { select: { questions: true } } } });
}

export async function listAdminUsers(query?: string, page = 1) {
  const pageSize = 30;
  const where = query
    ? { OR: [{ email: { contains: query, mode: "insensitive" as const } }, { name: { contains: query, mode: "insensitive" as const } }] }
    : {};
  const [total, users] = await Promise.all([
    db.user.count({ where }),
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, lastLoginAt: true, _count: { select: { mockExams: true, practiceSessions: true } } },
    }),
  ]);
  return { total, users, page, pages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getAdminUser(id: string) {
  return db.user.findUnique({
    where: { id },
    include: {
      targetExam: { select: { title: true } },
      progress: { include: { exam: { select: { title: true } } } },
      mockExams: { where: { status: "COMPLETED" }, orderBy: { completedAt: "desc" }, take: 10, include: { exam: { select: { title: true } } } },
      practiceSessions: { orderBy: { startedAt: "desc" }, take: 10, include: { exam: { select: { title: true } } } },
      subscriptions: true,
      _count: { select: { bookmarks: true, sessions: true } },
    },
  });
}

export async function listReports(status: "OPEN" | "RESOLVED" | "DISMISSED" = "OPEN") {
  return db.questionReport.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: { select: { email: true } },
      question: { select: { id: true, prompt: true, examId: true, exam: { select: { title: true } } } },
    },
  });
}
