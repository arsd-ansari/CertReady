import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { RelatedGuides } from "@/components/exams/related-guides";
import { Markdown } from "@/components/markdown";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]/study-guide">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  const isCdl = exam.slug === "cdl";
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/study-guide`,
    title: isCdl
      ? "CDL Study Guide — How to Study for the Knowledge Tests"
      : `${exam.shortTitle} Study Guide — What to Know Before the Exam`,
    description: isCdl
      ? "CDL study guide for the permit knowledge tests: General Knowledge, Air Brakes, and Combination, one section at a time. The study order is on the permit guide. 80% on each test."
      : `Free ${exam.title} study guide: the numbers, topics and study plan you need to pass, plus practice questions for every section.`,
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
      title={exam.slug === "cdl" ? "CDL Study Guide" : `${exam.shortTitle} Study Guide`}
      intro={
        exam.slug === "cdl"
          ? "The numbers for General Knowledge, Air Brakes, and Combination. How to study for the permit test and what that test consists of are on the permit guide."
          : `Everything you need to know before sitting the ${exam.title} exam, in one place.`
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
      {exam.slug === "cdl" && (
        <p className="mb-6 text-sm leading-6 text-zinc-700">
          <Link href="/exams/cdl/guides/cdl-permit" className="font-medium text-brand hover:underline">
            How to study for the CDL permit test
          </Link>{" "}
          is one knowledge test at a time — General Knowledge, then Air Brakes, then Combination if you are booking Class A — until each category is above 85%. This page is the numbers those tests use. The written tests are not the{" "}
          <Link href="/exams/cdl/guides/pre-trip" className="font-medium text-brand hover:underline">
            pre-trip inspection
          </Link>
          .
        </p>
      )}
      <Markdown content={exam.studyGuide} />
    </ExamPageShell>
  );
}
