import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamFactsCard, ExamPageShell } from "@/components/exams/exam-page-shell";
import { RelatedGuides } from "@/components/exams/related-guides";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { CDL_PRACTICE_COPY } from "@/content/cdl-guides";
import { EPA_608_PRACTICE_COPY } from "@/content/exam-guides";
import { FREE_LIMITS } from "@/lib/entitlements";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]/practice-test">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/practice-test`,
    title: `Free ${exam.shortTitle} Practice Test — ${exam._count.questions} Questions with Answers`,
    description: `Take a free ${exam.title} practice test online. ${exam._count.questions} original questions with detailed explanations, timed mock exams and topic scores.`,
  });
}

export default async function PracticeTestPage({ params }: PageProps<"/exams/[slug]/practice-test">) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();

  const modes = [
    {
      title: "Quick practice",
      text: `${Math.min(10, exam.freeQuestionLimit)} mixed questions with instant feedback. Good for a daily warm-up.`,
      href: `/practice/${exam.slug}/run?mode=QUICK&count=10`,
      cta: "Start quick set",
    },
    {
      title: "Practice by topic",
      text: "Drill one section at a time until you consistently score above 80%.",
      href: `/practice/${exam.slug}#topics`,
      cta: "Choose a topic",
    },
    {
      title: "Random practice",
      text: "Pick your own question count and difficulty for a longer session.",
      href: `/practice/${exam.slug}`,
      cta: "Customize",
    },
    {
      title: "Timed mock exam",
      text: `${exam.mockQuestionCount} questions in ${exam.mockTimeMinutes} minutes with a category breakdown at the end.`,
      href: `/mock/${exam.slug}`,
      cta: "Start mock exam",
    },
  ];

  return (
    <ExamPageShell
      exam={exam}
      tab="practice-test"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "Practice test", href: `/exams/${exam.slug}/practice-test` },
      ]}
      title={`Free ${exam.shortTitle} Practice Test`}
      intro={`${exam._count.questions} original practice questions across ${exam.categories.length} sections. ${exam.freeQuestionCount} are free, no account needed.`}
      aside={
        <>
          <ExamFactsCard exam={exam} />
          <RelatedGuides examSlug={exam.slug} />
          <ExamCategoriesCard exam={exam} />
        </>
      }
    >
      {exam.slug === "epa-608" && <Markdown content={EPA_608_PRACTICE_COPY} className="mb-10" />}
      {exam.slug === "cdl" && <Markdown content={CDL_PRACTICE_COPY} className="mb-10" />}

      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((mode) => (
          <div key={mode.title} className="flex flex-col rounded-xl border border-border bg-white p-5">
            <h2 className="font-semibold text-navy">{mode.title}</h2>
            <p className="mt-1 flex-1 text-sm text-zinc-600">{mode.text}</p>
            <Button asChild variant={mode.title.includes("mock") ? "secondary" : "default"} className="mt-4 self-start">
              <Link href={mode.href}>{mode.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-border bg-white p-5 text-sm leading-6 text-zinc-700">
        <h2 className="font-semibold text-navy">What&apos;s free and what&apos;s premium</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Practice sets of up to {exam.freeQuestionLimit} questions from the {exam.freeQuestionCount} free questions, with full explanations.</li>
          <li>
            Free accounts can complete {FREE_LIMITS.mockExamsPerExam} mock exams per certification; visitors without an
            account get a shorter {FREE_LIMITS.guestMockQuestions}-question sample.
          </li>
          <li>Premium (coming soon) unlocks the full bank of {exam._count.questions} questions, unlimited mocks and detailed analytics.</li>
        </ul>
      </section>
    </ExamPageShell>
  );
}
