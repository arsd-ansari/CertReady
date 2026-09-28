import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryManager } from "@/components/admin/category-manager";
import { ExamForm, type ExamFormValues } from "@/components/admin/exam-form";
import { ExamStatusControls } from "@/components/admin/exam-status-controls";
import { Button } from "@/components/ui/button";
import { getAdminExam } from "@/lib/admin/queries";
import { db } from "@/lib/db";

export const metadata = { title: "Edit exam" };

export default async function AdminExamPage({ params }: PageProps<"/admin/exams/[id]">) {
  const { id } = await params;
  const [exam, categories] = await Promise.all([
    getAdminExam(id),
    db.certificationCategory.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!exam) notFound();

  const values: ExamFormValues = {
    slug: exam.slug,
    title: exam.title,
    shortTitle: exam.shortTitle ?? "",
    summary: exam.summary,
    overview: exam.overview ?? "",
    whoShouldTake: exam.whoShouldTake ?? "",
    requirements: exam.requirements ?? "",
    studyGuide: exam.studyGuide ?? "",
    faqJson: JSON.stringify(exam.faq ?? [], null, 2),
    resourcesJson: JSON.stringify(exam.officialResources ?? [], null, 2),
    certifyingBody: exam.certifyingBody ?? "",
    categoryId: exam.categoryId,
    scope: exam.scope,
    states: exam.states.join(", "),
    difficulty: exam.difficulty,
    isFeatured: exam.isFeatured,
    realQuestionCount: exam.realQuestionCount?.toString() ?? "",
    realTimeMinutes: exam.realTimeMinutes?.toString() ?? "",
    passingScoreText: exam.passingScoreText ?? "",
    mockQuestionCount: String(exam.mockQuestionCount),
    mockTimeMinutes: String(exam.mockTimeMinutes),
    freeQuestionLimit: String(exam.freeQuestionLimit),
    seoTitle: exam.seoTitle ?? "",
    seoDescription: exam.seoDescription ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/exams" className="text-sm text-zinc-500 hover:text-navy">
          ← Exams
        </Link>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-navy">{exam.title}</h1>
            <p className="mt-1 text-sm text-zinc-600">
              {exam._count.questions} questions ·{" "}
              {exam.status === "PUBLISHED" ? (
                <Link href={`/exams/${exam.slug}`} className="text-brand hover:underline" target="_blank">
                  View public page ↗
                </Link>
              ) : (
                <span>not public</span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ExamStatusControls examId={exam.id} status={exam.status} questionCount={exam._count.questions} />
            <Button asChild size="sm" variant="secondary">
              <Link href={`/admin/exams/${exam.id}/questions`}>Manage questions</Link>
            </Button>
          </div>
        </div>
      </div>

      <CategoryManager examId={exam.id} examSlug={exam.slug} categories={exam.categories} />

      <ExamForm examId={exam.id} values={values} categories={categories} />
    </div>
  );
}
