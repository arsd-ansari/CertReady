import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { RelatedGuides } from "@/components/exams/related-guides";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { CDL_GENERAL_KNOWLEDGE_COPY } from "@/content/cdl-guides";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug, getPublishedExamCategory } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]/[categorySlug]">): Promise<Metadata> {
  const { slug, categorySlug } = await params;
  const [exam, category] = await Promise.all([getPublishedExamBySlug(slug), getPublishedExamCategory(slug, categorySlug)]);
  if (!exam || !category) return {};
  const isGeneralKnowledge = exam.slug === "cdl" && category.slug === "general-knowledge";
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/${category.slug}`,
    title: isGeneralKnowledge
      ? "CDL General Knowledge Test — Free Practice Questions"
      : (category.seoTitle ?? `${exam.shortTitle} ${category.name} Practice Questions`),
    description: isGeneralKnowledge
      ? "The CDL General Knowledge test is usually 50 questions, 80% to pass, so you can miss 10. Free online practice with explanations. The scored test is at your state office, not a PDF answer key."
      : (category.seoDescription ?? category.description ?? `${category.name} practice questions for the ${exam.title} exam.`),
  });
}

export default async function ExamCategoryPage({ params }: PageProps<"/exams/[slug]/[categorySlug]">) {
  const { slug, categorySlug } = await params;
  const [exam, category] = await Promise.all([getPublishedExamBySlug(slug), getPublishedExamCategory(slug, categorySlug)]);
  if (!exam || !category) notFound();
  const isGeneralKnowledge = exam.slug === "cdl" && category.slug === "general-knowledge";

  return (
    <ExamPageShell
      exam={exam}
      tab=""
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: category.name, href: `/exams/${exam.slug}/${category.slug}` },
      ]}
      title={isGeneralKnowledge ? "CDL General Knowledge Test" : `${exam.shortTitle}: ${category.name}`}
      intro={
        isGeneralKnowledge
          ? "The written test every CDL class takes. Most states use 50 questions at 80%. Practice here is online. The scored test is still at your state office."
          : (category.description ?? undefined)
      }
      aside={
        <>
          <ExamCategoriesCard exam={exam} />
          <RelatedGuides examSlug={exam.slug} />
          <ExamFactsCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-2xl font-semibold text-navy">{category._count.questions}</p>
          <p className="text-xs text-zinc-500">practice questions</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-2xl font-semibold text-navy">{category.freeQuestionCount}</p>
          <p className="text-xs text-zinc-500">free questions</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-2xl font-semibold text-navy">{category.weight}%</p>
          <p className="text-xs text-zinc-500">of the real exam</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={`/practice/${exam.slug}/run?mode=CATEGORY&category=${category.slug}&count=10`}>
            Practice {category.name} questions
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href={`/exams/${exam.slug}/study-guide`}>Read the study guide</Link>
        </Button>
      </div>

      {isGeneralKnowledge && <Markdown content={CDL_GENERAL_KNOWLEDGE_COPY} className="mt-10" />}

      {category.longDescription && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-navy">What this section covers</h2>
          <Markdown content={category.longDescription} className="mt-2" />
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-navy">Other {exam.shortTitle} sections</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {exam.categories
            .filter((c) => c.id !== category.id)
            .map((c) => (
              <li key={c.id}>
                <Link href={`/exams/${exam.slug}/${c.slug}`} className="block rounded-xl border border-border bg-white p-4 hover:border-brand/40">
                  <p className="font-medium text-navy">{c.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{c._count.questions} questions · {c.weight}% of exam</p>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </ExamPageShell>
  );
}
