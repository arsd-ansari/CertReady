/**
 * Seed: certification categories, admin user, and exam content.
 * Idempotent — exams are upserted by slug; questions are inserted when the prompt is new.
 *
 * Run with: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { wastewaterCollection1 } from "./seed-data/collections-1";
import { epa608, type SeedExam } from "./seed-data/epa-608";
import { fromLegacy } from "./seed-data/legacy-adapter";
import { wastewaterTreatment1 } from "./seed-data/wastewater-treatment-1";
import { waterTreatment1 } from "./seed-data/water-treatment-1";

const db = new PrismaClient();

const certificationCategories = [
  { slug: "hvac-refrigeration", name: "HVAC & Refrigeration", description: "EPA 608, NATE, and state HVAC licensing exams.", sortOrder: 1 },
  { slug: "water-wastewater", name: "Water & Wastewater", description: "Treatment, distribution and collection system operator certifications.", sortOrder: 2 },
  { slug: "security", name: "Security", description: "Unarmed and armed security guard licensing exams.", sortOrder: 3 },
  { slug: "pesticide", name: "Pesticide Applicator", description: "Core and category exams for commercial and private applicators.", sortOrder: 4 },
  { slug: "pool-spa", name: "Pool & Spa", description: "Certified Pool Operator and aquatic facility operator exams.", sortOrder: 5 },
  { slug: "electrical-plumbing", name: "Electrical & Plumbing", description: "Journeyman and master trade licensing exams.", sortOrder: 6 },
];

const exams: SeedExam[] = [
  epa608,
  fromLegacy(waterTreatment1, { categorySlug: "water-wastewater" }),
  fromLegacy(wastewaterTreatment1, { categorySlug: "water-wastewater" }),
  fromLegacy(wastewaterCollection1, { categorySlug: "water-wastewater" }),
];

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("↷ ADMIN_EMAIL / ADMIN_PASSWORD not set; skipping admin user.");
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.upsert({
    where: { email },
    update: { role: "ADMIN", status: "ACTIVE" },
    create: { email, name: "CertReady Admin", role: "ADMIN", passwordHash },
  });
  console.log(`✓ admin user ${email}`);
}

async function seedExam(seed: SeedExam) {
  const category = await db.certificationCategory.findUniqueOrThrow({ where: { slug: seed.categorySlug } });

  const exam = await db.exam.upsert({
    where: { slug: seed.slug },
    update: {
      title: seed.title,
      shortTitle: seed.shortTitle,
      summary: seed.summary,
      overview: seed.overview,
      whoShouldTake: seed.whoShouldTake,
      requirements: seed.requirements,
      studyGuide: seed.studyGuide,
      faq: seed.faq,
      officialResources: seed.officialResources,
      certifyingBody: seed.certifyingBody,
      categoryId: category.id,
      scope: seed.scope,
      states: seed.states,
      difficulty: seed.difficulty,
      isFeatured: seed.isFeatured,
      realQuestionCount: seed.realQuestionCount ?? null,
      realTimeMinutes: seed.realTimeMinutes ?? null,
      passingScoreText: seed.passingScoreText ?? null,
      mockQuestionCount: seed.mockQuestionCount,
      mockTimeMinutes: seed.mockTimeMinutes,
      freeQuestionLimit: seed.freeQuestionLimit,
      seoTitle: seed.seoTitle,
      seoDescription: seed.seoDescription,
    },
    create: {
      slug: seed.slug,
      title: seed.title,
      shortTitle: seed.shortTitle,
      summary: seed.summary,
      overview: seed.overview,
      whoShouldTake: seed.whoShouldTake,
      requirements: seed.requirements,
      studyGuide: seed.studyGuide,
      faq: seed.faq,
      officialResources: seed.officialResources,
      certifyingBody: seed.certifyingBody,
      categoryId: category.id,
      scope: seed.scope,
      states: seed.states,
      difficulty: seed.difficulty,
      status: "PUBLISHED",
      publishedAt: new Date(),
      isFeatured: seed.isFeatured,
      realQuestionCount: seed.realQuestionCount ?? null,
      realTimeMinutes: seed.realTimeMinutes ?? null,
      passingScoreText: seed.passingScoreText ?? null,
      mockQuestionCount: seed.mockQuestionCount,
      mockTimeMinutes: seed.mockTimeMinutes,
      freeQuestionLimit: seed.freeQuestionLimit,
      seoTitle: seed.seoTitle,
      seoDescription: seed.seoDescription,
    },
  });

  const categoryIds = new Map<string, string>();
  for (const [index, cat] of seed.categories.entries()) {
    const row = await db.examCategory.upsert({
      where: { examId_slug: { examId: exam.id, slug: cat.slug } },
      update: {
        name: cat.name,
        description: cat.description,
        longDescription: cat.longDescription,
        weight: cat.weight,
        sortOrder: index,
        seoTitle: cat.seoTitle ?? null,
        seoDescription: cat.seoDescription ?? null,
      },
      create: {
        examId: exam.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        longDescription: cat.longDescription,
        weight: cat.weight,
        sortOrder: index,
        seoTitle: cat.seoTitle ?? null,
        seoDescription: cat.seoDescription ?? null,
      },
    });
    categoryIds.set(cat.slug, row.id);
  }

  const sourceIds = new Map<string, string>();
  for (const source of seed.sources) {
    const existing = await db.sourceReference.findFirst({ where: { title: source.title } });
    const row =
      existing ??
      (await db.sourceReference.create({
        data: { title: source.title, publisher: source.publisher, url: source.url ?? null, notes: source.note ?? null },
      }));
    sourceIds.set(source.key, row.id);
  }

  const existing = await db.question.findMany({
    where: { examId: exam.id },
    select: { prompt: true },
  });
  const existingPrompts = new Set(existing.map((row) => row.prompt));

  let inserted = 0;
  for (const question of seed.questions) {
    if (existingPrompts.has(question.prompt)) continue;
    const categoryId = categoryIds.get(question.category);
    if (!categoryId) throw new Error(`Unknown category "${question.category}" in ${seed.slug}`);
    if (question.options.filter((o) => o.correct).length !== 1) {
      throw new Error(`Question must have exactly one correct option: "${question.prompt.slice(0, 60)}"`);
    }
    await db.question.create({
      data: {
        examId: exam.id,
        categoryId,
        prompt: question.prompt,
        explanation: question.explanation,
        difficulty: question.difficulty ?? "MEDIUM",
        isFree: question.isFree ?? true,
        status: "PUBLISHED",
        tags: question.tags ?? [],
        sourceId: question.source ? sourceIds.get(question.source) ?? null : null,
        sourceNote: question.sourceNote ?? null,
        options: {
          create: question.options.map((o, i) => ({ label: o.label, text: o.text, isCorrect: !!o.correct, sortOrder: i })),
        },
      },
    });
    inserted += 1;
  }
  const skipped = seed.questions.length - inserted;
  console.log(`✓ ${seed.slug}: +${inserted} questions (${skipped} already present)`);
}

async function main() {
  for (const cat of certificationCategories) {
    await db.certificationCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
      create: cat,
    });
  }
  console.log(`✓ ${certificationCategories.length} certification categories`);

  await seedAdmin();
  for (const exam of exams) await seedExam(exam);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
