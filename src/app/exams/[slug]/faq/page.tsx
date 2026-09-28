import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]/faq">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/faq`,
    title: `${exam.shortTitle} FAQ — Common Questions Answered`,
    description: `Answers to the most common questions about the ${exam.title} exam: format, cost, passing score, retakes and certification.`,
  });
}

export default async function FaqPage({ params }: PageProps<"/exams/[slug]/faq">) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();

  return (
    <ExamPageShell
      exam={exam}
      tab="faq"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "FAQ", href: `/exams/${exam.slug}/faq` },
      ]}
      title={`${exam.shortTitle} Frequently Asked Questions`}
      aside={
        <>
          <ExamCategoriesCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      <FaqJsonLd items={exam.faqItems} />
      {exam.faqItems.length === 0 ? (
        <p className="text-zinc-600">No FAQ published for this exam yet.</p>
      ) : (
        <dl className="divide-y divide-border rounded-xl border border-border bg-white">
          {exam.faqItems.map((item) => (
            <div key={item.question} className="p-5">
              <dt className="font-medium text-zinc-900">{item.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-zinc-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      )}
    </ExamPageShell>
  );
}
