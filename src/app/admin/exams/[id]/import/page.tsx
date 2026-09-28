import Link from "next/link";
import { notFound } from "next/navigation";
import { ImportForm } from "@/components/admin/import-form";
import { getAdminExam } from "@/lib/admin/queries";

export const metadata = { title: "Import questions" };

export default async function ImportPage({ params }: PageProps<"/admin/exams/[id]/import">) {
  const { id } = await params;
  const exam = await getAdminExam(id);
  if (!exam) notFound();

  const example = JSON.stringify(
    [
      {
        category: exam.categories[0]?.slug ?? "core",
        prompt: "Which gas is acceptable for pressurizing a system to test for leaks?",
        options: ["Oxygen", "Compressed air", "Dry nitrogen", "Acetylene"],
        correctIndex: 2,
        explanation: "Dry nitrogen is inert and moisture-free; oxygen and compressed air can react explosively with oil.",
        difficulty: "EASY",
        isFree: true,
        tags: ["safety"],
      },
    ],
    null,
    2,
  );

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/admin/exams/${exam.id}/questions`} className="text-sm text-zinc-500 hover:text-navy">
          ← Questions
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy">Import questions</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Paste a JSON array. Valid section slugs for {exam.title}:{" "}
          {exam.categories.map((c) => (
            <code key={c.id} className="mr-1 rounded bg-zinc-100 px-1 py-0.5 text-xs">
              {c.slug}
            </code>
          ))}
        </p>
      </div>
      <ImportForm examId={exam.id} example={example} />
    </div>
  );
}
