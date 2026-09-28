import Link from "next/link";
import { ReportControls } from "@/components/admin/report-controls";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { listReports } from "@/lib/admin/queries";
import { cn, formatDate } from "@/lib/utils";

export const metadata = { title: "Question reports" };

export default async function AdminReportsPage({ searchParams }: PageProps<"/admin/reports">) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const status = raw === "RESOLVED" || raw === "DISMISSED" ? raw : "OPEN";
  const reports = await listReports(status);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Question reports</h1>
        <p className="mt-1 text-sm text-zinc-600">Problems flagged by learners while practicing.</p>
      </div>
      <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 text-sm w-fit">
        {(["OPEN", "RESOLVED", "DISMISSED"] as const).map((s) => (
          <Link key={s} href={`?status=${s}`} className={cn("rounded-md px-3 py-1.5 font-medium", s === status ? "bg-white text-navy shadow-sm" : "text-zinc-600")}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>
      {reports.length === 0 ? (
        <EmptyState title={`No ${status.toLowerCase()} reports`} />
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r.id} className="rounded-xl border border-border bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="warning">{r.reason.replace("_", " ").toLowerCase()}</Badge>
                    <span className="text-zinc-500">{r.question.exam.title}</span>
                    <span className="text-zinc-400">· {formatDate(r.createdAt)}</span>
                    {r.user && <span className="text-zinc-400">· {r.user.email}</span>}
                  </div>
                  <Link href={`/admin/questions/${r.question.id}`} className="mt-2 block font-medium text-zinc-900 hover:text-brand">
                    {r.question.prompt}
                  </Link>
                  {r.details && <p className="mt-1 text-sm text-zinc-600">“{r.details}”</p>}
                </div>
                {status === "OPEN" && <ReportControls reportId={r.id} questionId={r.question.id} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
