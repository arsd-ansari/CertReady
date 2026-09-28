import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

/** Public read queries for exams. Only PUBLISHED content is ever returned here. */

export type ExamFaqItem = { question: string; answer: string };
export type ExamResource = { label: string; url: string; description?: string };

export function parseFaq(value: Prisma.JsonValue | null | undefined): ExamFaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is ExamFaqItem =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as ExamFaqItem).question === "string" &&
      typeof (item as ExamFaqItem).answer === "string",
  );
}

export function parseResources(value: Prisma.JsonValue | null | undefined): ExamResource[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is ExamResource =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as ExamResource).label === "string" &&
      typeof (item as ExamResource).url === "string",
  );
}

const examCardSelect = {
  id: true,
  slug: true,
  title: true,
  shortTitle: true,
  summary: true,
  scope: true,
  states: true,
  difficulty: true,
  isFeatured: true,
  publishedAt: true,
  freeQuestionLimit: true,
  category: { select: { slug: true, name: true } },
  _count: {
    select: {
      questions: { where: { status: "PUBLISHED" } },
      categories: true,
    },
  },
} satisfies Prisma.ExamSelect;

export type ExamCard = Prisma.ExamGetPayload<{ select: typeof examCardSelect }> & {
  freeQuestionCount: number;
};

async function withFreeCounts<T extends { id: string }>(exams: T[]) {
  if (exams.length === 0) return [] as (T & { freeQuestionCount: number })[];
  const free = await db.question.groupBy({
    by: ["examId"],
    where: { examId: { in: exams.map((e) => e.id) }, status: "PUBLISHED", isFree: true },
    _count: { _all: true },
  });
  const map = new Map(free.map((f) => [f.examId, f._count._all]));
  return exams.map((e) => ({ ...e, freeQuestionCount: map.get(e.id) ?? 0 }));
}

export type ExamListFilters = {
  categorySlug?: string;
  state?: string;
  sort?: "popular" | "newest" | "title";
  query?: string;
};

export async function listPublishedExams(filters: ExamListFilters = {}): Promise<ExamCard[]> {
  const where: Prisma.ExamWhereInput = { status: "PUBLISHED" };
  if (filters.categorySlug) where.category = { slug: filters.categorySlug };
  if (filters.state) {
    where.OR = [{ states: { has: filters.state.toUpperCase() } }, { states: { isEmpty: true } }];
  }
  if (filters.query) {
    where.AND = [
      {
        OR: [
          { title: { contains: filters.query, mode: "insensitive" } },
          { summary: { contains: filters.query, mode: "insensitive" } },
        ],
      },
    ];
  }

  const orderBy: Prisma.ExamOrderByWithRelationInput[] =
    filters.sort === "newest"
      ? [{ publishedAt: "desc" }]
      : filters.sort === "title"
        ? [{ title: "asc" }]
        : [{ isFeatured: "desc" }, { title: "asc" }];

  const exams = await db.exam.findMany({ where, orderBy, select: examCardSelect });
  return withFreeCounts(exams);
}

export async function listFeaturedExams(limit = 6): Promise<ExamCard[]> {
  const exams = await db.exam.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    take: limit,
    select: examCardSelect,
  });
  return withFreeCounts(exams);
}

export async function listRecentExams(limit = 6): Promise<ExamCard[]> {
  const exams = await db.exam.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }],
    take: limit,
    select: examCardSelect,
  });
  return withFreeCounts(exams);
}

export async function listCertificationCategories() {
  return db.certificationCategory.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      _count: { select: { exams: { where: { status: "PUBLISHED" } } } },
    },
  });
}

export async function listExamStates() {
  const exams = await db.exam.findMany({
    where: { status: "PUBLISHED", scope: "STATE" },
    select: { states: true },
  });
  return [...new Set(exams.flatMap((e) => e.states))].sort();
}

export async function getPublishedExamBySlug(slug: string) {
  const exam = await db.exam.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      category: { select: { id: true, slug: true, name: true } },
      categories: {
        orderBy: { sortOrder: "asc" },
        include: {
          _count: { select: { questions: { where: { status: "PUBLISHED" } } } },
        },
      },
      _count: { select: { questions: { where: { status: "PUBLISHED" } } } },
    },
  });
  if (!exam) return null;

  const [freeCount, difficultyGroups] = await Promise.all([
    db.question.count({ where: { examId: exam.id, status: "PUBLISHED", isFree: true } }),
    db.question.groupBy({
      by: ["difficulty"],
      where: { examId: exam.id, status: "PUBLISHED" },
      _count: { _all: true },
    }),
  ]);

  return {
    ...exam,
    // Normalize optional CMS fields so pages can render without null checks.
    shortTitle: exam.shortTitle ?? exam.title,
    certifyingBody: exam.certifyingBody ?? "the certifying organization",
    overview: exam.overview ?? "",
    whoShouldTake: exam.whoShouldTake ?? "",
    requirements: exam.requirements ?? "",
    studyGuide: exam.studyGuide ?? "",
    freeQuestionCount: freeCount,
    difficultyCounts: Object.fromEntries(difficultyGroups.map((g) => [g.difficulty, g._count._all])),
    faqItems: parseFaq(exam.faq),
    resources: parseResources(exam.officialResources),
  };
}

export type PublishedExam = NonNullable<Awaited<ReturnType<typeof getPublishedExamBySlug>>>;

export async function getPublishedExamCategory(examSlug: string, categorySlug: string) {
  const category = await db.examCategory.findFirst({
    where: { slug: categorySlug, exam: { slug: examSlug, status: "PUBLISHED" } },
    include: {
      exam: { select: { id: true, slug: true, title: true, shortTitle: true, freeQuestionLimit: true } },
      _count: { select: { questions: { where: { status: "PUBLISHED" } } } },
    },
  });
  if (!category) return null;
  const freeCount = await db.question.count({
    where: { categoryId: category.id, status: "PUBLISHED", isFree: true },
  });
  return {
    ...category,
    exam: { ...category.exam, shortTitle: category.exam.shortTitle ?? category.exam.title },
    freeQuestionCount: freeCount,
  };
}

export async function listPublishedExamSlugs() {
  const exams = await db.exam.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true, categories: { select: { slug: true, updatedAt: true } } },
  });
  return exams;
}

/** Sitewide numbers for the homepage. Real counts, never invented. */
export async function getPlatformStats() {
  const [exams, questions, categories] = await Promise.all([
    db.exam.count({ where: { status: "PUBLISHED" } }),
    db.question.count({ where: { status: "PUBLISHED" } }),
    db.certificationCategory.count(),
  ]);
  return { exams, questions, categories };
}
