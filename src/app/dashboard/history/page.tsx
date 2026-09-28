import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { requireUser } from "@/lib/auth/guards";
import { getTestHistory } from "@/lib/dashboard/queries";
import { formatDate, formatDuration, percent } from "@/lib/utils";

export const metadata: Metadata = { title: "Test history", robots: { index: false } };

const MODE_LABEL = { QUICK: "Quick", CATEGORY: "By topic", RANDOM: "Random" } as const;

export default async function HistoryPage() {
  const user = await requireUser("/dashboard/history");
  const { mocks, sessions } = await getTestHistory(user.id);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Test history</h1>
        <p className="mt-1 text-sm text-zinc-600">Every mock exam and practice session you&apos;ve completed.</p>
      </div>

      <section>
        <h2 className="mb-3 font-semibold text-navy">Mock exams</h2>
        {mocks.length === 0 ? (
          <EmptyState title="No mock exams yet" description="Timed mocks are the best signal of readiness." />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Exam</TH>
                <TH>Date</TH>
                <TH>Score</TH>
                <TH>Correct</TH>
                <TH>Time</TH>
                <TH className="text-right">Review</TH>
              </TR>
            </THead>
            <TBody>
              {mocks.map((m) => (
                <TR key={m.id}>
                  <TD className="font-medium text-zinc-900">{m.exam.title}</TD>
                  <TD className="text-zinc-600">{m.completedAt ? formatDate(m.completedAt) : "—"}</TD>
                  <TD>
                    <Badge variant={(m.scorePercent ?? 0) >= 70 ? "success" : "warning"}>{m.scorePercent}%</Badge>
                  </TD>
                  <TD className="text-zinc-600">
                    {m.correctCount}/{m.totalQuestions}
                  </TD>
                  <TD className="text-zinc-600">{formatDuration(m.timeTakenSec ?? 0)}</TD>
                  <TD className="text-right">
                    <Link href={`/mock/results/${m.id}`} className="font-medium text-brand hover:underline">
                      View
                    </Link>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-navy">Practice sessions</h2>
        {sessions.length === 0 ? (
          <EmptyState title="No practice sessions yet" />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Exam</TH>
                <TH>Mode</TH>
                <TH>Date</TH>
                <TH>Answered</TH>
                <TH>Accuracy</TH>
              </TR>
            </THead>
            <TBody>
              {sessions.map((s) => (
                <TR key={s.id}>
                  <TD className="font-medium text-zinc-900">
                    <Link href={`/practice/${s.exam.slug}`} className="hover:text-brand">
                      {s.exam.title}
                    </Link>
                  </TD>
                  <TD className="text-zinc-600">
                    {MODE_LABEL[s.mode]}
                    {s.category && <span className="text-zinc-400"> · {s.category}</span>}
                  </TD>
                  <TD className="text-zinc-600">{formatDate(s.startedAt)}</TD>
                  <TD className="text-zinc-600">{s.answered}</TD>
                  <TD className="text-zinc-600">{s.answered ? `${percent(s.correct, s.answered)}%` : "—"}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </section>
    </div>
  );
}
