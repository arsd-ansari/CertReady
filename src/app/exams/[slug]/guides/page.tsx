import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { getExamGuides } from "@/content/exam-guides";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

type GuideIndexParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GuideIndexParams): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  const guides = getExamGuides(exam.slug);
  if (guides.length === 0) return {};
  const isCdl = exam.slug === "cdl";
  return examMetadata(exam, {
    path: `/exams/${exam.slug}/guides`,
    title: isCdl
      ? `${exam.shortTitle} Study Guides — Class B CDL, Permit Test & States`
      : exam.slug === "epa-608"
        ? "EPA 608 Study Guides — Certification, Types, 72% Score & Spanish"
        : `${exam.shortTitle} Study Guides — Type Comparisons, Passing Score & Who Needs It`,
    description: isCdl
      ? `Free CDL guides: Class B vs Class A and Class C, the permit practice test, the 80% score, pre-trip inspection, Texas Commercial Rules, and California, Ohio, Florida, and Georgia pages.`
      : exam.slug === "epa-608"
        ? `Free EPA 608 guides: certification and cost, Type I vs Type II, EPA universal certification, the 72% passing score, online proctoring, and Spanish sittings.`
        : `Free ${exam.title} guides: which certification type to take, the 72% passing score, and who must be certified before handling refrigerant.`,
  });
}

export default async function ExamGuidesIndexPage({ params }: GuideIndexParams) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();
  const guides = getExamGuides(exam.slug);
  if (guides.length === 0) notFound();

  return (
    <ExamPageShell
      exam={exam}
      tab="guides"
      crumbs={[
        { name: exam.shortTitle, href: `/exams/${exam.slug}` },
        { name: "Guides", href: `/exams/${exam.slug}/guides` },
      ]}
      title={`${exam.shortTitle} study guides`}
      intro={
        exam.slug === "cdl"
          ? "Class B vs Class A and Class C, the permit practice test, the 80% score, the pre-trip inspection, Texas Commercial Rules, and state pages for Ohio, California, Florida, and Georgia."
          : exam.slug === "epa-608"
            ? "EPA 608 certification, which type to take, EPA universal certification, the 72% bar, online proctoring, and how Spanish sittings work."
            : "Longer answers to the questions technicians actually search before they book the exam."
      }
      aside={
        <>
          <ExamFactsCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      {exam.slug === "cdl" && (
        <p className="mb-6 text-sm leading-6 text-zinc-700">
          <Link href="/exams/cdl/guides/cdl-permit" className="font-medium text-brand hover:underline">
            How to study for the CDL permit test
          </Link>
          , and what that test consists of, are on the permit guide. The{" "}
          <Link href="/exams/cdl/study-guide" className="font-medium text-brand hover:underline">
            study guide
          </Link>{" "}
          holds the numbers, and the{" "}
          <Link href="/exams/cdl/guides/passing-score" className="font-medium text-brand hover:underline">
            80% passing score
          </Link>{" "}
          is per knowledge test. The written tests are not the{" "}
          <Link href="/exams/cdl/guides/pre-trip" className="font-medium text-brand hover:underline">
            pre-trip inspection
          </Link>
          .
        </p>
      )}
      {exam.slug === "epa-608" && (
        <p className="mb-6 text-sm leading-6 text-zinc-700">
          The Clean Air Act question, the sales restriction, and who needs the card are in{" "}
          <Link href="/exams/epa-608/guides/who-needs-certification" className="font-medium text-brand hover:underline">
            EPA Section 608 certification
          </Link>
          . Type II appliances and chiller leak categories are in{" "}
          <Link href="/exams/epa-608/guides/type-1-vs-type-2" className="font-medium text-brand hover:underline">
            Type 1 vs Type 2 vs Type 3
          </Link>
          .{" "}
          <Link href="/exams/epa-608/guides/universal" className="font-medium text-brand hover:underline">
            Universal EPA certification
          </Link>{" "}
          is its own guide. The score is{" "}
          <Link href="/exams/epa-608/guides/passing-score" className="font-medium text-brand hover:underline">
            18 of 25
          </Link>
          .
        </p>
      )}
      <ul className="grid gap-4">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/exams/${exam.slug}/guides/${guide.slug}`}
              className="block rounded-xl border border-border bg-white p-5 transition-colors hover:border-brand/40"
            >
              <h2 className="font-semibold text-navy">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{guide.intro}</p>
              <p className="mt-3 text-xs font-medium text-brand">Read guide →</p>
            </Link>
          </li>
        ))}
      </ul>
    </ExamPageShell>
  );
}
