import Link from "next/link";
import { emptyExamValues, ExamForm } from "@/components/admin/exam-form";
import { db } from "@/lib/db";

export const metadata = { title: "New exam" };

export default async function NewExamPage() {
  const categories = await db.certificationCategory.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } });
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/exams" className="text-sm text-zinc-500 hover:text-navy">
          ← Exams
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy">New exam</h1>
        <p className="mt-1 text-sm text-zinc-600">Exams start as drafts. Add sections and questions, then publish.</p>
      </div>
      <ExamForm values={emptyExamValues} categories={categories} />
    </div>
  );
}
