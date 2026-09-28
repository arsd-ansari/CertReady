import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionTable } from "@/components/admin/question-table";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";
import { getAdminExam, listAdminQuestions } from "@/lib/admin/queries";

export const metadata = { title: "Questions" };

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function AdminQuestionsPage({ params, searchParams }: PageProps<"/admin/exams/[id]/questions">) {
  const { id } = await params;
  const sp = await searchParams;
  const exam = await getAdminExam(id);
  if (!exam) notFound();

  const filters = {
    categoryId: first(sp.category) || undefined,
    status: first(sp.status) || undefined,
    isFree: first(sp.tier) || undefined,
    q: first(sp.q)?.trim() || undefined,
    page: Number(first(sp.page) ?? 1) || 1,
  };
  const result = await listAdminQuestions(exam.id, filters);

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries({ category: filters.categoryId, status: filters.status, tier: filters.isFree, q: filters.q })) if (v) qs.set(k, v);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/admin/exams/${exam.id}`} className="text-sm text-zinc-500 hover:text-navy">
          ← {exam.title}
        </Link>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-navy">Questions</h1>
            <p className="mt-1 text-sm text-zinc-600">{result.total} matching · {exam._count.questions} total</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link href={`/admin/exams/${exam.id}/import`}>Import JSON</Link>
            </Button>
            <Button asChild>
              <Link href={`/admin/exams/${exam.id}/questions/new`}>New question</Link>
            </Button>
          </div>
        </div>
      </div>

      {sp.saved && <Alert tone="success">Question saved.</Alert>}
      {sp.deleted && <Alert tone="success">Question deleted.</Alert>}

      {exam.categories.length === 0 ? (
        <Alert tone="warning" title="Add a section first">
          Questions belong to a section. <Link href={`/admin/exams/${exam.id}`} className="underline">Add sections on the exam page.</Link>
        </Alert>
      ) : (
        <>
          <form method="get" className="grid gap-2 rounded-xl border border-border bg-white p-3 sm:grid-cols-[1fr_auto_auto_auto_auto]">
            <Input type="search" name="q" defaultValue={filters.q ?? ""} placeholder="Search prompt…" aria-label="Search" />
            <NativeSelect name="category" defaultValue={filters.categoryId ?? ""} aria-label="Section" className="sm:w-48">
              <option value="">All sections</option>
              {exam.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect name="status" defaultValue={filters.status ?? ""} aria-label="Status" className="sm:w-36">
              <option value="">Any status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </NativeSelect>
            <NativeSelect name="tier" defaultValue={filters.isFree ?? ""} aria-label="Tier" className="sm:w-32">
              <option value="">Any tier</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </NativeSelect>
            <Button type="submit" variant="secondary">
              Filter
            </Button>
          </form>

          <QuestionTable examId={exam.id} questions={result.questions} />

          {result.pages > 1 && (
            <nav className="flex items-center justify-between text-sm" aria-label="Pagination">
              <span className="text-zinc-500">
                Page {result.page} of {result.pages}
              </span>
              <div className="flex gap-2">
                {result.page > 1 && (
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`?${new URLSearchParams({ ...Object.fromEntries(qs), page: String(result.page - 1) })}`}>Previous</Link>
                  </Button>
                )}
                {result.page < result.pages && (
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`?${new URLSearchParams({ ...Object.fromEntries(qs), page: String(result.page + 1) })}`}>Next</Link>
                  </Button>
                )}
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
