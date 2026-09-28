import Link from "next/link";
import { notFound } from "next/navigation";
import { emptyQuestionValues, QuestionForm } from "@/components/admin/question-form";
import { Alert } from "@/components/ui/misc";
import { getAdminExam, listSources } from "@/lib/admin/queries";

export const metadata = { title: "New question" };

export default async function NewQuestionPage({ params, searchParams }: PageProps<"/admin/exams/[id]/questions/new">) {
  const { id } = await params;
  const sp = await searchParams;
  const [exam, sources] = await Promise.all([getAdminExam(id), listSources()]);
  if (!exam) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/admin/exams/${exam.id}/questions`} className="text-sm text-zinc-500 hover:text-navy">
          ← Questions
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy">New question</h1>
        <p className="mt-1 text-sm text-zinc-600">{exam.title}</p>
      </div>
      {sp.saved && <Alert tone="success">Question saved. Add the next one.</Alert>}
      <QuestionForm examId={exam.id} values={emptyQuestionValues} categories={exam.categories} sources={sources} />
    </div>
  );
}
