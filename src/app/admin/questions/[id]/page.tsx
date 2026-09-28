import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionForm } from "@/components/admin/question-form";
import { Alert } from "@/components/ui/misc";
import { getAdminQuestion, listSources } from "@/lib/admin/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Edit question" };

export default async function EditQuestionPage({ params }: PageProps<"/admin/questions/[id]">) {
  const { id } = await params;
  const [question, sources] = await Promise.all([getAdminQuestion(id), listSources()]);
  if (!question) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/admin/exams/${question.exam.id}/questions`} className="text-sm text-zinc-500 hover:text-navy">
          ← {question.exam.title} questions
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy">Edit question</h1>
      </div>

      {question.reports.length > 0 && (
        <Alert tone="warning" title={`${question.reports.length} open report${question.reports.length === 1 ? "" : "s"}`}>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {question.reports.map((r) => (
              <li key={r.id}>
                <span className="font-medium">{r.reason.replace("_", " ").toLowerCase()}</span>
                {r.details && ` — ${r.details}`} <span className="text-xs">({formatDate(r.createdAt)})</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/reports" className="mt-2 inline-block underline">
            Resolve in reports
          </Link>
        </Alert>
      )}

      <QuestionForm
        examId={question.exam.id}
        questionId={question.id}
        values={{
          categoryId: question.categoryId,
          prompt: question.prompt,
          explanation: question.explanation,
          difficulty: question.difficulty,
          isFree: question.isFree,
          status: question.status,
          tags: question.tags.join(", "),
          sourceId: question.sourceId ?? "",
          sourceNote: question.sourceNote ?? "",
          options: question.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
        }}
        categories={question.exam.categories}
        sources={sources}
      />
    </div>
  );
}
