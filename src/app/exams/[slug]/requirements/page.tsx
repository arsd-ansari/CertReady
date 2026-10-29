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
  const is608 = exam.slug === "epa-608";
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/requirements`,
    title: is608
      ? "EPA 608 Certification Requirements — Eligibility, Format & Passing Score"
      : `${exam.shortTitle} Requirements — Eligibility, Format & Passing Score`,
    description: is608
      ? "EPA 608 certification requirements: no federal age or experience bar, 25 questions per section, 18 correct to pass, and a card from an approved organization."
      : `Who can take the ${exam.title} exam, how it is formatted, the passing score and how certification is issued.`,
  });
}

export default async function RequirementsPage({ params }: PageProps<"/exams/[slug]/requirements">) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();
  const is608 = exam.slug === "epa-608";

  return (
    <ExamPageShell
      exam={exam}
      tab="requirements"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "Requirements", href: `/exams/${exam.slug}/requirements` },
      ]}
      title={is608 ? "EPA 608 Certification Requirements" : `${exam.shortTitle} Exam Requirements`}
      intro={
        is608
          ? "Who can sit for EPA 608 certification, how the sections are scored, and who prints the card. Confirm fees and proctor rules with the organization you book."
          : "Eligibility, exam format, passing score and how certification is issued. Always confirm details with the certifying body before you book."
      }
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
