"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertAdmin, AuthError } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export type AdminFormState = { error?: string; fieldErrors?: Record<string, string>; success?: string };

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v : "";
}
function optional(form: FormData, key: string) {
  const v = str(form, key).trim();
  return v === "" ? null : v;
}
function list(form: FormData, key: string) {
  return str(form, key)
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function guard<T>(fn: () => Promise<T>): Promise<T | AdminFormState> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AuthError) return { error: error.message };
    throw error;
  }
}

function revalidatePublic(examSlug?: string) {
  revalidatePath("/");
  revalidatePath("/exams");
  revalidatePath("/sitemap.xml");
  if (examSlug) revalidatePath(`/exams/${examSlug}`, "layout");
}

// ---------------------------------------------------------------------------
// Exams
// ---------------------------------------------------------------------------

const faqSchema = z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) }));
const resourcesSchema = z.array(z.object({ label: z.string().min(1), url: z.url(), description: z.string().optional() }));

const examSchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only."),
  title: z.string().trim().min(3).max(140),
  shortTitle: z.string().trim().max(60).nullable(),
  summary: z.string().trim().min(20, "Write at least one full sentence.").max(400),
  overview: z.string().nullable(),
  whoShouldTake: z.string().nullable(),
  requirements: z.string().nullable(),
  studyGuide: z.string().nullable(),
  faqJson: z.string(),
  resourcesJson: z.string(),
  certifyingBody: z.string().trim().max(200).nullable(),
  categoryId: z.string().min(1, "Choose a category."),
  scope: z.enum(["FEDERAL", "STATE", "NATIONAL_PRIVATE"]),
  states: z.array(z.string().length(2)).transform((s) => s.map((x) => x.toUpperCase())),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  isFeatured: z.boolean(),
  realQuestionCount: z.coerce.number().int().positive().nullable(),
  realTimeMinutes: z.coerce.number().int().positive().nullable(),
  passingScoreText: z.string().trim().max(120).nullable(),
  mockQuestionCount: z.coerce.number().int().min(5).max(200),
  mockTimeMinutes: z.coerce.number().int().min(1).max(600),
  freeQuestionLimit: z.coerce.number().int().min(1).max(100),
  seoTitle: z.string().trim().max(70).nullable(),
  seoDescription: z.string().trim().max(170).nullable(),
});

function parseExamForm(form: FormData) {
  const parsed = examSchema.safeParse({
    slug: str(form, "slug").trim() || slugify(str(form, "title")),
    title: str(form, "title"),
    shortTitle: optional(form, "shortTitle"),
    summary: str(form, "summary"),
    overview: optional(form, "overview"),
    whoShouldTake: optional(form, "whoShouldTake"),
    requirements: optional(form, "requirements"),
    studyGuide: optional(form, "studyGuide"),
    faqJson: str(form, "faqJson").trim() || "[]",
    resourcesJson: str(form, "resourcesJson").trim() || "[]",
    certifyingBody: optional(form, "certifyingBody"),
    categoryId: str(form, "categoryId"),
    scope: str(form, "scope"),
    states: list(form, "states"),
    difficulty: str(form, "difficulty"),
    isFeatured: form.get("isFeatured") === "on",
    realQuestionCount: optional(form, "realQuestionCount"),
    realTimeMinutes: optional(form, "realTimeMinutes"),
    passingScoreText: optional(form, "passingScoreText"),
    mockQuestionCount: str(form, "mockQuestionCount") || 25,
    mockTimeMinutes: str(form, "mockTimeMinutes") || 30,
    freeQuestionLimit: str(form, "freeQuestionLimit") || 10,
    seoTitle: optional(form, "seoTitle"),
    seoDescription: optional(form, "seoDescription"),
  });
  if (!parsed.success) return { ok: false as const, fieldErrors: fieldErrors(parsed.error) };

  let faq: unknown;
  let resources: unknown;
  try {
    faq = faqSchema.parse(JSON.parse(parsed.data.faqJson));
  } catch {
    return { ok: false as const, fieldErrors: { faqJson: 'Must be a JSON array of { "question", "answer" }.' } };
  }
  try {
    resources = resourcesSchema.parse(JSON.parse(parsed.data.resourcesJson));
  } catch {
    return { ok: false as const, fieldErrors: { resourcesJson: 'Must be a JSON array of { "label", "url", "description?" }.' } };
  }

  const { faqJson: _f, resourcesJson: _r, ...rest } = parsed.data;
  void _f;
  void _r;
  return { ok: true as const, data: { ...rest, faq: faq as object[], officialResources: resources as object[] } };
}

export async function createExamAction(_prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  const result = await guard(async () => {
    await assertAdmin();
    const parsed = parseExamForm(form);
    if (!parsed.ok) return { fieldErrors: parsed.fieldErrors };
    const exists = await db.exam.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } });
    if (exists) return { fieldErrors: { slug: "That slug is already in use." } };
    const exam = await db.exam.create({ data: { ...parsed.data, status: "DRAFT" }, select: { id: true } });
    return exam.id;
  });
  if (typeof result === "string") redirect(`/admin/exams/${result}`);
  return result;
}

export async function updateExamAction(examId: string, _prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  return (await guard(async () => {
    await assertAdmin();
    const parsed = parseExamForm(form);
    if (!parsed.ok) return { fieldErrors: parsed.fieldErrors };
    const clash = await db.exam.findFirst({ where: { slug: parsed.data.slug, NOT: { id: examId } }, select: { id: true } });
    if (clash) return { fieldErrors: { slug: "That slug is already in use." } };
    const before = await db.exam.findUnique({ where: { id: examId }, select: { slug: true } });
    await db.exam.update({ where: { id: examId }, data: parsed.data });
    revalidatePublic(before?.slug);
    revalidatePublic(parsed.data.slug);
    return { success: "Exam saved." };
  })) as AdminFormState;
}

export async function setExamStatusAction(examId: string, status: "DRAFT" | "PUBLISHED" | "ARCHIVED") {
  await assertAdmin();
  const exam = await db.exam.update({
    where: { id: examId },
    data: { status, ...(status === "PUBLISHED" ? { publishedAt: new Date() } : {}) },
    select: { slug: true },
  });
  revalidatePublic(exam.slug);
  revalidatePath(`/admin/exams/${examId}`);
}

// ---------------------------------------------------------------------------
// Exam categories
// ---------------------------------------------------------------------------

const categorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().min(1).max(60).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only."),
  description: z.string().trim().max(300).nullable(),
  longDescription: z.string().nullable(),
  weight: z.coerce.number().int().min(0).max(100),
  sortOrder: z.coerce.number().int().min(0).max(999),
  seoTitle: z.string().trim().max(70).nullable(),
  seoDescription: z.string().trim().max(170).nullable(),
});

export async function upsertCategoryAction(examId: string, categoryId: string | null, _prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  return (await guard(async () => {
    await assertAdmin();
    const parsed = categorySchema.safeParse({
      name: str(form, "name"),
      slug: str(form, "slug").trim() || slugify(str(form, "name")),
      description: optional(form, "description"),
      longDescription: optional(form, "longDescription"),
      weight: str(form, "weight") || 0,
      sortOrder: str(form, "sortOrder") || 0,
      seoTitle: optional(form, "seoTitle"),
      seoDescription: optional(form, "seoDescription"),
    });
    if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

    const clash = await db.examCategory.findFirst({
      where: { examId, slug: parsed.data.slug, ...(categoryId ? { NOT: { id: categoryId } } : {}) },
      select: { id: true },
    });
    if (clash) return { fieldErrors: { slug: "Another section already uses this slug." } };

    if (categoryId) await db.examCategory.update({ where: { id: categoryId }, data: parsed.data });
    else await db.examCategory.create({ data: { ...parsed.data, examId } });

    const exam = await db.exam.findUnique({ where: { id: examId }, select: { slug: true } });
    revalidatePublic(exam?.slug);
    revalidatePath(`/admin/exams/${examId}`);
    return { success: categoryId ? "Section saved." : "Section added." };
  })) as AdminFormState;
}

export async function deleteCategoryAction(examId: string, categoryId: string) {
  await assertAdmin();
  const count = await db.question.count({ where: { categoryId } });
  if (count > 0) return { ok: false as const, error: `Move or delete ${count} question(s) first.` };
  await db.examCategory.delete({ where: { id: categoryId } });
  revalidatePath(`/admin/exams/${examId}`);
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Certification categories & sources
// ---------------------------------------------------------------------------

export async function createCertificationCategoryAction(_prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  return (await guard(async () => {
    await assertAdmin();
    const parsed = z
      .object({
        name: z.string().trim().min(2).max(80),
        slug: z.string().regex(/^[a-z0-9-]+$/),
        description: z.string().trim().max(300).nullable(),
        sortOrder: z.coerce.number().int().min(0),
      })
      .safeParse({
        name: str(form, "name"),
        slug: str(form, "slug").trim() || slugify(str(form, "name")),
        description: optional(form, "description"),
        sortOrder: str(form, "sortOrder") || 0,
      });
    if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };
    const exists = await db.certificationCategory.findUnique({ where: { slug: parsed.data.slug } });
    if (exists) return { fieldErrors: { slug: "Slug already exists." } };
    await db.certificationCategory.create({ data: parsed.data });
    revalidatePublic();
    revalidatePath("/admin/categories");
    return { success: "Category added." };
  })) as AdminFormState;
}

export async function createSourceAction(_prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  return (await guard(async () => {
    await assertAdmin();
    const parsed = z
      .object({
        title: z.string().trim().min(2).max(200),
        publisher: z.string().trim().max(120).nullable(),
        url: z.url().nullable(),
        notes: z.string().trim().max(500).nullable(),
      })
      .safeParse({
        title: str(form, "title"),
        publisher: optional(form, "publisher"),
        url: optional(form, "url"),
        notes: optional(form, "notes"),
      });
    if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };
    await db.sourceReference.create({ data: parsed.data });
    revalidatePath("/admin/sources");
    return { success: "Source added." };
  })) as AdminFormState;
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

const questionSchema = z.object({
  categoryId: z.string().min(1, "Choose a section."),
  prompt: z.string().trim().min(10, "Prompt is too short."),
  explanation: z.string().trim().min(10, "Explanation is too short."),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  isFree: z.boolean(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  tags: z.array(z.string().max(40)).max(10),
  sourceId: z.string().nullable(),
  sourceNote: z.string().trim().max(200).nullable(),
  options: z
    .array(z.object({ id: z.string().optional(), text: z.string().trim().min(1, "Option text required.") }))
    .min(2, "At least two options.")
    .max(6),
  correctIndex: z.coerce.number().int().min(0),
});

function parseQuestionForm(form: FormData) {
  const options: { id?: string; text: string }[] = [];
  for (let i = 0; i < 6; i++) {
    const text = str(form, `option${i}`).trim();
    const id = optional(form, `optionId${i}`) ?? undefined;
    if (text) options.push({ id, text });
  }
  const parsed = questionSchema.safeParse({
    categoryId: str(form, "categoryId"),
    prompt: str(form, "prompt"),
    explanation: str(form, "explanation"),
    difficulty: str(form, "difficulty") || "MEDIUM",
    isFree: form.get("isFree") === "on",
    status: str(form, "status") || "DRAFT",
    tags: list(form, "tags"),
    sourceId: optional(form, "sourceId"),
    sourceNote: optional(form, "sourceNote"),
    options,
    correctIndex: str(form, "correctIndex") || 0,
  });
  if (!parsed.success) return { ok: false as const, fieldErrors: fieldErrors(parsed.error) };
  if (parsed.data.correctIndex >= parsed.data.options.length) {
    return { ok: false as const, fieldErrors: { correctIndex: "Mark one of the filled-in options as correct." } };
  }
  return { ok: true as const, data: parsed.data };
}

export async function createQuestionAction(examId: string, _prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  const result = await guard(async () => {
    await assertAdmin();
    const parsed = parseQuestionForm(form);
    if (!parsed.ok) return { fieldErrors: parsed.fieldErrors };
    const category = await db.examCategory.findFirst({ where: { id: parsed.data.categoryId, examId }, select: { id: true } });
    if (!category) return { fieldErrors: { categoryId: "Section does not belong to this exam." } };
    const { options, correctIndex, ...rest } = parsed.data;
    await db.question.create({
      data: {
        ...rest,
        examId,
        options: {
          create: options.map((o, i) => ({ label: "ABCDEF"[i], text: o.text, isCorrect: i === correctIndex, sortOrder: i })),
        },
      },
    });
    const exam = await db.exam.findUnique({ where: { id: examId }, select: { slug: true } });
    revalidatePublic(exam?.slug);
    return "created";
  });
  if (result === "created") {
    if (form.get("intent") === "save-and-new") redirect(`/admin/exams/${examId}/questions/new?saved=1`);
    redirect(`/admin/exams/${examId}/questions?saved=1`);
  }
  return result as AdminFormState;
}

export async function updateQuestionAction(questionId: string, _prev: AdminFormState, form: FormData): Promise<AdminFormState> {
  return (await guard(async () => {
    await assertAdmin();
    const parsed = parseQuestionForm(form);
    if (!parsed.ok) return { fieldErrors: parsed.fieldErrors };
    const question = await db.question.findUnique({ where: { id: questionId }, select: { examId: true, exam: { select: { slug: true } } } });
    if (!question) return { error: "Question not found." };
    const category = await db.examCategory.findFirst({ where: { id: parsed.data.categoryId, examId: question.examId }, select: { id: true } });
    if (!category) return { fieldErrors: { categoryId: "Section does not belong to this exam." } };

    const { options, correctIndex, ...rest } = parsed.data;
    const keptIds = options.map((o) => o.id).filter((id): id is string => Boolean(id));
    // Existing options are updated in place (so past answers keep pointing at valid rows);
    // removed ones are deleted first, then any new ones are created.
    await db.$transaction([
      db.question.update({ where: { id: questionId }, data: rest }),
      db.questionOption.deleteMany({ where: { questionId, id: { notIn: keptIds } } }),
      ...options.map((o, i) =>
        o.id
          ? db.questionOption.update({ where: { id: o.id }, data: { label: "ABCDEF"[i], text: o.text, isCorrect: i === correctIndex, sortOrder: i } })
          : db.questionOption.create({ data: { questionId, label: "ABCDEF"[i], text: o.text, isCorrect: i === correctIndex, sortOrder: i } }),
      ),
    ]);
    revalidatePublic(question.exam.slug);
    return { success: "Question saved." };
  })) as AdminFormState;
}

export async function bulkQuestionStatusAction(examId: string, ids: string[], status: "PUBLISHED" | "DRAFT" | "ARCHIVED") {
  await assertAdmin();
  if (ids.length === 0) return;
  await db.question.updateMany({ where: { id: { in: ids }, examId }, data: { status } });
  const exam = await db.exam.findUnique({ where: { id: examId }, select: { slug: true } });
  revalidatePublic(exam?.slug);
  revalidatePath(`/admin/exams/${examId}/questions`);
}

export async function deleteQuestionAction(questionId: string) {
  await assertAdmin();
  const q = await db.question.findUnique({ where: { id: questionId }, select: { examId: true, exam: { select: { slug: true } } } });
  if (!q) return;
  await db.question.delete({ where: { id: questionId } });
  revalidatePublic(q.exam.slug);
  redirect(`/admin/exams/${q.examId}/questions?deleted=1`);
}

// ---------------------------------------------------------------------------
// Import
// ---------------------------------------------------------------------------

const importItem = z.object({
  category: z.string().min(1),
  prompt: z.string().min(10),
  options: z.array(z.string().min(1)).min(2).max(6),
  correctIndex: z.number().int().min(0),
  explanation: z.string().min(10),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("MEDIUM"),
  isFree: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  sourceNote: z.string().optional(),
});

export type ImportResult = { imported: number; errors: string[] };

export async function importQuestionsAction(examId: string, _prev: ImportResult | null, form: FormData): Promise<ImportResult> {
  try {
    await assertAdmin();
  } catch (error) {
    return { imported: 0, errors: [error instanceof Error ? error.message : "Unauthorized"] };
  }

  const raw = str(form, "payload").trim();
  const publish = form.get("publish") === "on";
  let items: unknown;
  try {
    items = JSON.parse(raw);
  } catch {
    return { imported: 0, errors: ["Payload is not valid JSON."] };
  }
  if (!Array.isArray(items)) return { imported: 0, errors: ["Payload must be a JSON array."] };

  const categories = await db.examCategory.findMany({ where: { examId }, select: { id: true, slug: true } });
  const bySlug = new Map(categories.map((c) => [c.slug, c.id]));
  const errors: string[] = [];
  let imported = 0;

  for (const [index, item] of items.entries()) {
    const parsed = importItem.safeParse(item);
    if (!parsed.success) {
      errors.push(`Row ${index + 1}: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
      continue;
    }
    const categoryId = bySlug.get(parsed.data.category);
    if (!categoryId) {
      errors.push(`Row ${index + 1}: unknown category slug "${parsed.data.category}".`);
      continue;
    }
    if (parsed.data.correctIndex >= parsed.data.options.length) {
      errors.push(`Row ${index + 1}: correctIndex out of range.`);
      continue;
    }
    await db.question.create({
      data: {
        examId,
        categoryId,
        prompt: parsed.data.prompt,
        explanation: parsed.data.explanation,
        difficulty: parsed.data.difficulty,
        isFree: parsed.data.isFree,
        tags: parsed.data.tags,
        sourceNote: parsed.data.sourceNote ?? null,
        status: publish ? "PUBLISHED" : "DRAFT",
        options: {
          create: parsed.data.options.map((text, i) => ({ label: "ABCDEF"[i], text, isCorrect: i === parsed.data.correctIndex, sortOrder: i })),
        },
      },
    });
    imported += 1;
  }

  const exam = await db.exam.findUnique({ where: { id: examId }, select: { slug: true } });
  revalidatePublic(exam?.slug);
  return { imported, errors };
}

// ---------------------------------------------------------------------------
// Users & reports
// ---------------------------------------------------------------------------

export async function setUserStatusAction(userId: string, status: "ACTIVE" | "SUSPENDED") {
  const admin = await assertAdmin();
  if (admin.id === userId) return;
  await db.user.update({ where: { id: userId }, data: { status } });
  if (status === "SUSPENDED") await db.session.deleteMany({ where: { userId } });
  revalidatePath(`/admin/users/${userId}`);
  revalidatePath("/admin/users");
}

export async function setUserRoleAction(userId: string, role: "USER" | "ADMIN") {
  const admin = await assertAdmin();
  if (admin.id === userId) return;
  await db.user.update({ where: { id: userId }, data: { role } });
  revalidatePath(`/admin/users/${userId}`);
}

export async function resolveReportAction(reportId: string, status: "RESOLVED" | "DISMISSED") {
  await assertAdmin();
  await db.questionReport.update({ where: { id: reportId }, data: { status, resolvedAt: new Date() } });
  revalidatePath("/admin/reports");
}
