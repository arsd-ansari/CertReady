import Link from "next/link";
import type { ReactNode } from "react";
import type { PublishedExam } from "@/lib/content/exams";
import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs, type Crumb } from "@/components/seo/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExamGuides } from "@/content/exam-guides";
import { ExamSubnav, type ExamTab } from "./exam-subnav";

const SCOPE_LABEL = { FEDERAL: "Federal certification", STATE: "State certification", NATIONAL_PRIVATE: "National certification" } as const;

/** Shared header + tabs for every /exams/[slug]/* page so they read as one hub. */
export function ExamPageShell({
  exam,
  tab,
  crumbs,
  title,
  intro,
  children,
  aside,
}: {
  exam: PublishedExam;
  tab: ExamTab;
  crumbs: Crumb[];
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "Exams", href: "/exams" }, ...crumbs]} />

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{exam.category.name}</Badge>
          <Badge variant="outline">{SCOPE_LABEL[exam.scope]}</Badge>
          <Badge variant="success">{exam.freeQuestionCount} free questions</Badge>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title ?? exam.title}</h1>
        {intro && <p className="mt-3 max-w-3xl text-base text-zinc-600 sm:text-lg">{intro}</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={`/practice/${exam.slug}`}>Start practicing</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href={`/mock/${exam.slug}`}>Take a mock exam</Link>
          </Button>
        </div>
      </header>

      <div className="mt-8">
        <ExamSubnav slug={exam.slug} active={tab} showGuides={getExamGuides(exam.slug).length > 0} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">{children}</div>
        <aside className="space-y-6">{aside}</aside>
      </div>

      <AdSlot slot="exam-footer" />
    </div>
  );
}

export function ExamFactsCard({ exam }: { exam: PublishedExam }) {
  const rows: [string, string][] = [];
  rows.push(["Certifying body", exam.certifyingBody]);
  if (exam.realQuestionCount) rows.push(["Official exam length", `${exam.realQuestionCount} questions`]);
  if (exam.realTimeMinutes) rows.push(["Official time limit", `${exam.realTimeMinutes} minutes`]);
  if (exam.passingScoreText) rows.push(["Passing score", exam.passingScoreText]);
  rows.push(["CertReady question bank", `${exam._count.questions} (${exam.freeQuestionCount} free)`]);
  rows.push(["Mock exam format", `${exam.mockQuestionCount} questions · ${exam.mockTimeMinutes} min`]);

  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Exam at a glance</h2>
      <dl className="mt-3 space-y-3 text-sm">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-zinc-500">{label}</dt>
            <dd className="font-medium text-zinc-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ExamCategoriesCard({ exam }: { exam: PublishedExam }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Practice by topic</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {exam.categories.map((cat) => (
          <li key={cat.id}>
            <Link href={`/exams/${exam.slug}/${cat.slug}`} className="flex items-center justify-between gap-3 text-zinc-800 hover:text-brand">
              <span>{cat.name}</span>
              <span className="text-xs text-zinc-500">{cat._count.questions} q</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OfficialResourcesCard({ exam }: { exam: PublishedExam }) {
  if (exam.resources.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Official resources</h2>
      <ul className="mt-3 space-y-3 text-sm">
        {exam.resources.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-brand hover:underline">
              {r.label} ↗
            </a>
            {r.description && <p className="text-xs text-zinc-500">{r.description}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-zinc-500">
        CertReady is an independent study resource and is not affiliated with {exam.certifyingBody.split(" (")[0]}.
      </p>
    </div>
  );
}
