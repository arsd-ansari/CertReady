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
      ? `${exam.shortTitle} Study Guides — Class A vs B, Permit, 80% Score & State Tests`
      : `${exam.shortTitle} Study Guides — Type Comparisons, Passing Score & Who Needs It`,
    description: isCdl
      ? `Free CDL guides: Class A vs Class B, the CLP permit wait, 80% passing score, and California, Texas, Florida and Georgia practice pages.`
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
          ? "Class A vs B, the permit wait, the 80% passing score, and state pages for California, Texas, Florida and Georgia."
          : "Longer answers to the questions technicians actually search before they book the exam."
      }
      aside={
        <>
          <ExamFactsCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
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
