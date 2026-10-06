import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { RelatedGuides } from "@/components/exams/related-guides";
import { Markdown } from "@/components/markdown";
import { ArticleJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { getExamGuide, getExamGuides } from "@/content/exam-guides";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

type GuidePageParams = { params: Promise<{ slug: string; guideSlug: string }> };

export async function generateMetadata({
  params,
}: GuidePageParams): Promise<Metadata> {
  const { slug, guideSlug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  const guide = getExamGuide(slug, guideSlug);
  if (!exam || !guide) return {};
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/guides/${guide.slug}`,
    title: guide.seoTitle,
    description: guide.seoDescription,
  });
}

export default async function ExamGuidePage({ params }: GuidePageParams) {
  const { slug, guideSlug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  const guide = getExamGuide(slug, guideSlug);
  if (!exam || !guide) notFound();

  const otherGuides = getExamGuides(exam.slug).filter((item) => item.slug !== guide.slug);

  return (
    <ExamPageShell
      exam={exam}
      tab="guides"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "Guides", href: `/exams/${exam.slug}/guides` },
        { name: guide.title, href: `/exams/${exam.slug}/guides/${guide.slug}` },
      ]}
      title={guide.title}
      intro={guide.intro}
      aside={
        <>
          <ExamFactsCard exam={exam} />
          <RelatedGuides examSlug={exam.slug} />
          <ExamCategoriesCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      <ArticleJsonLd
        headline={guide.seoTitle}
        description={guide.seoDescription}
        href={`/exams/${exam.slug}/guides/${guide.slug}`}
      />
      <FaqJsonLd items={guide.faq} />
      <Markdown content={guide.markdown} />

      {guide.faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-navy">Quick answers</h2>
          <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {guide.faq.map((item) => (
              <div key={item.question} className="p-4">
                <dt className="font-medium text-zinc-900">{item.question}</dt>
                <dd className="mt-1 text-sm leading-6 text-zinc-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {otherGuides.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-navy">More {exam.shortTitle} guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {otherGuides.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/exams/${exam.slug}/guides/${item.slug}`}
                  className="block rounded-xl border border-border bg-white p-4 hover:border-brand/40"
                >
                  <p className="font-medium text-navy">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.intro}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ExamPageShell>
  );
}
