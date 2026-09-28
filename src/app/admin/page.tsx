import Link from "next/link";
import { SignupChart } from "@/components/admin/signup-chart";
import { Stat } from "@/components/ui/misc";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getAdminAnalytics } from "@/lib/admin/queries";

export default async function AdminHomePage() {
  const a = await getAdminAnalytics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Analytics</h1>
        <p className="mt-1 text-sm text-zinc-600">Live platform numbers. Conversion metrics will appear once billing is enabled.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Total users" value={a.totalUsers} hint={`+${a.newUsers7} this week · +${a.newUsers30} in 30 days`} />
        <Stat label="Questions answered" value={a.questionsAnswered.toLocaleString()} hint="practice + mock" />
        <Stat label="Mock exams completed" value={a.testsCompleted} hint={a.avgScore === null ? "no scores yet" : `avg score ${a.avgScore}%`} />
        <Stat label="DAU / MAU" value={`${a.dau} / ${a.mau}`} hint="signed-in users with events" />
        <Stat label="Published exams" value={a.publishedExams} />
        <Stat label="Published questions" value={a.publishedQuestions} />
        <Stat
          label="Open reports"
          value={a.openReports}
          hint={
            <Link href="/admin/reports" className="text-brand hover:underline">
              Review
            </Link>
          }
        />
        <Stat label="Conversion" value="—" hint="after Stripe launch" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Sign-ups, last 14 days</h2>
          <div className="mt-4">
            <SignupChart data={a.signupSeries} />
          </div>
        </section>
        <section className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Events, last 7 days</h2>
          {a.eventCounts.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-600">No events recorded yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border text-sm">
              {a.eventCounts.map((e) => (
                <li key={e.name} className="flex justify-between py-2">
                  <span className="font-mono text-zinc-700">{e.name}</span>
                  <span className="font-medium">{e.count.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section>
        <h2 className="mb-3 font-semibold text-navy">Popular exams</h2>
        {a.popularExams.length === 0 ? (
          <p className="text-sm text-zinc-600">No activity yet.</p>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Exam</TH>
                <TH>Practice sessions</TH>
                <TH>Mocks completed</TH>
                <TH>Avg mock score</TH>
              </TR>
            </THead>
            <TBody>
              {a.popularExams.map((row) => (
                <TR key={row.exam!.id}>
                  <TD className="font-medium">
                    <Link href={`/admin/exams/${row.exam!.id}`} className="hover:text-brand">
                      {row.exam!.title}
                    </Link>
                  </TD>
                  <TD>{row.practiceSessions}</TD>
                  <TD>{row.mocks}</TD>
                  <TD>{row.avgScore === null ? "—" : `${Math.round(row.avgScore)}%`}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </section>
    </div>
  );
}
