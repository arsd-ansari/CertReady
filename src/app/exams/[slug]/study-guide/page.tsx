import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { Markdown } from "@/components/markdown";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]/study-guide">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/study-guide`,
    title: `${exam.shortTitle} Study Guide — What to Know Before the Exam`,
    description: `Free ${exam.title} study guide: the numbers, topics and study plan you need to pass, plus practice questions for every section.`,
  });
}

export default async function StudyGuidePage({ params }: PageProps<"/exams/[slug]/study-guide">) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();

  return (
    <ExamPageShell
      exam={exam}
      tab="study-guide"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "Study guide", href: `/exams/${exam.slug}/study-guide` },
      ]}
      title={`${exam.shortTitle} Study Guide`}
      intro={`Everything you need to know before sitting the ${exam.title} exam, in one place.`}
      aside={
        <>
          <ExamCategoriesCard exam={exam} />
          <ExamFactsCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      <Markdown content={exam.studyGuide} />
    </ExamPageShell>
  );
}
