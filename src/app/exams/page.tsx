import type { Metadata } from "next";
import Link from "next/link";
import { ExamCard } from "@/components/exams/exam-card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { EmptyState, PageHeader } from "@/components/ui/misc";
import { listCertificationCategories, listExamStates, listPublishedExams, listRecentExams } from "@/lib/content/exams";
import { US_STATES } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Certification Practice Exams",
  description:
    "Browse free practice tests for professional and trade certification exams: EPA 608, CDL knowledge tests, water and wastewater operator licensing and more. Filter by category and state.",
  alternates: { canonical: "/exams" },
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ExamsPage({ searchParams }: PageProps<"/exams">) {
  const sp = await searchParams;
  const category = first(sp.category) || undefined;
  const state = first(sp.state) || undefined;
  const q = first(sp.q)?.trim() || undefined;
  const sortRaw = first(sp.sort);
  const sort = sortRaw === "newest" || sortRaw === "title" ? sortRaw : "popular";

  const [exams, categories, states, recent] = await Promise.all([
    listPublishedExams({ categorySlug: category, state, query: q, sort }),
    listCertificationCategories(),
    listExamStates(),
    listRecentExams(3),
  ]);

  const hasFilters = Boolean(category || state || q);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Exams", href: "/exams" }]} />
      <div className="mt-4">
        <PageHeader
          title="Certification practice exams"
          description="Every exam includes free practice questions with explanations, topic-by-topic drills and timed mock exams."
        />
      </div>

      <form method="get" className="mt-8 grid gap-3 rounded-xl border border-border bg-white p-4 sm:grid-cols-[1fr_auto_auto_auto_auto]">
        <Input type="search" name="q" defaultValue={q ?? ""} placeholder="Search exams…" aria-label="Search exams" />
        <NativeSelect name="category" defaultValue={category ?? ""} aria-label="Category" className="sm:w-52">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect name="state" defaultValue={state ?? ""} aria-label="State" className="sm:w-44">
          <option value="">All states</option>
          {Object.entries(US_STATES)
            .filter(([code]) => states.length === 0 || states.includes(code))
            .map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
        </NativeSelect>
        <NativeSelect name="sort" defaultValue={sort} aria-label="Sort" className="sm:w-40">
          <option value="popular">Most popular</option>
          <option value="newest">Recently added</option>
          <option value="title">A – Z</option>
        </NativeSelect>
        <Button type="submit">Apply</Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-zinc-600">
        <p>
          {exams.length} exam{exams.length === 1 ? "" : "s"}
          {category && ` in ${categories.find((c) => c.slug === category)?.name ?? category}`}
          {state && ` for ${US_STATES[state] ?? state}`}
          {q && ` matching “${q}”`}
        </p>
        {hasFilters && (
          <Link href="/exams" className="font-medium text-brand hover:underline">
            Clear filters
          </Link>
        )}
      </div>

      {exams.length === 0 ? (
        <EmptyState
          className="mt-6"
          title="No exams match those filters yet"
          description="We add new certifications regularly. Try clearing a filter or browse everything."
          action={
            <Button asChild variant="secondary">
              <Link href="/exams">Show all exams</Link>
            </Button>
          }
        />
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}

      {!hasFilters && recent.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-navy">Recently added</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {recent.map((exam) => (
              <li key={exam.id}>
                <Link href={`/exams/${exam.slug}`} className="block rounded-lg border border-border bg-white p-4 text-sm hover:border-brand/40">
                  <span className="font-medium text-navy">{exam.title}</span>
                  <span className="mt-1 block text-xs text-zinc-500">{exam._count.questions} questions</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
