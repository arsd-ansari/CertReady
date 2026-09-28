import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { Markdown } from "@/components/markdown";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]/requirements">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/requirements`,
    title: `${exam.shortTitle} Requirements — Eligibility, Format & Passing Score`,
    description: `Who can take the ${exam.title} exam, how it is formatted, the passing score and how certification is issued.`,
  });
}

export default async function RequirementsPage({ params }: PageProps<"/exams/[slug]/requirements">) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();

  return (
    <ExamPageShell
      exam={exam}
      tab="requirements"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "Requirements", href: `/exams/${exam.slug}/requirements` },
      ]}
      title={`${exam.shortTitle} Exam Requirements`}
      intro="Eligibility, exam format, passing score and how certification is issued. Always confirm details with the certifying body before you book."
      aside={
        <>
          <ExamFactsCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      <Markdown content={exam.requirements} />
    </ExamPageShell>
  );
}
