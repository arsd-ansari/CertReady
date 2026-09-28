import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listAdminExams } from "@/lib/admin/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Exams" };

const STATUS_VARIANT = { DRAFT: "warning", PUBLISHED: "success", ARCHIVED: "neutral" } as const;

export default async function AdminExamsPage() {
  const exams = await listAdminExams();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy">Exams</h1>
          <p className="mt-1 text-sm text-zinc-600">Adding a new certification is content only: create the exam, add sections, then add or import questions.</p>
        </div>
        <Button asChild>
          <Link href="/admin/exams/new">New exam</Link>
        </Button>
      </div>
      <Table>
        <THead>
          <TR>
            <TH>Exam</TH>
            <TH>Category</TH>
            <TH>Status</TH>
            <TH>Sections</TH>
            <TH>Questions</TH>
            <TH>Updated</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {exams.map((exam) => (
            <TR key={exam.id}>
              <TD>
                <Link href={`/admin/exams/${exam.id}`} className="font-medium text-zinc-900 hover:text-brand">
                  {exam.title}
                </Link>
                <span className="block font-mono text-xs text-zinc-500">/exams/{exam.slug}</span>
              </TD>
              <TD className="text-zinc-600">{exam.category.name}</TD>
              <TD>
                <Badge variant={STATUS_VARIANT[exam.status]}>{exam.status.toLowerCase()}</Badge>
                {exam.isFeatured && <Badge variant="default" className="ml-1">featured</Badge>}
              </TD>
              <TD>{exam._count.categories}</TD>
              <TD>{exam._count.questions}</TD>
              <TD className="text-zinc-600">{formatDate(exam.updatedAt)}</TD>
              <TD className="text-right">
                <Link href={`/admin/exams/${exam.id}/questions`} className="text-sm font-medium text-brand hover:underline">
                  Questions
                </Link>
                <span className="mx-1 text-zinc-300">·</span>
                <Link href={`/admin/exams/${exam.id}`} className="text-sm font-medium text-brand hover:underline">
                  Edit
                </Link>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
