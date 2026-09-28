import Link from "next/link";
import { notFound } from "next/navigation";
import { UserControls } from "@/components/admin/user-controls";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/misc";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getAdminUser } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guards";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "User" };

export default async function AdminUserPage({ params }: PageProps<"/admin/users/[id]">) {
  const { id } = await params;
  const [admin, user] = await Promise.all([requireAdmin(), getAdminUser(id)]);
  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/users" className="text-sm text-zinc-500 hover:text-navy">
          ← Users
        </Link>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-navy">{user.name ?? user.email}</h1>
            <p className="mt-1 text-sm text-zinc-600">
              {user.email} · joined {formatDate(user.createdAt)}
              {user.lastLoginAt && ` · last login ${formatDate(user.lastLoginAt)}`}
            </p>
            <div className="mt-2 flex gap-2">
              <Badge variant={user.role === "ADMIN" ? "navy" : "neutral"}>{user.role.toLowerCase()}</Badge>
              <Badge variant={user.status === "ACTIVE" ? "success" : "danger"}>{user.status.toLowerCase()}</Badge>
              {user.targetExam && <Badge variant="outline">Target: {user.targetExam.title}</Badge>}
            </div>
          </div>
          {admin.id !== user.id && <UserControls userId={user.id} status={user.status} role={user.role} />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Questions answered" value={user.progress.reduce((n, p) => n + p.questionsAnswered, 0)} />
        <Stat label="Mocks completed" value={user.progress.reduce((n, p) => n + p.mocksCompleted, 0)} />
        <Stat label="Bookmarks" value={user._count.bookmarks} />
        <Stat label="Active sessions" value={user._count.sessions} />
      </div>

      <section>
        <h2 className="mb-3 font-semibold text-navy">Progress by exam</h2>
        {user.progress.length === 0 ? (
          <p className="text-sm text-zinc-600">No activity.</p>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Exam</TH>
                <TH>Answered</TH>
                <TH>Correct</TH>
                <TH>Mocks</TH>
                <TH>Best</TH>
                <TH>Streak</TH>
                <TH>Last active</TH>
              </TR>
            </THead>
            <TBody>
              {user.progress.map((p) => (
                <TR key={p.id}>
                  <TD className="font-medium">{p.exam.title}</TD>
                  <TD>{p.questionsAnswered}</TD>
                  <TD>{p.correctAnswers}</TD>
                  <TD>{p.mocksCompleted}</TD>
                  <TD>{p.bestMockScore === null ? "—" : `${p.bestMockScore}%`}</TD>
                  <TD>{p.currentStreakDays}d</TD>
                  <TD className="text-zinc-600">{p.lastActivityDate ? formatDate(p.lastActivityDate) : "—"}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-navy">Recent mock exams</h2>
        {user.mockExams.length === 0 ? (
          <p className="text-sm text-zinc-600">None.</p>
        ) : (
          <ul className="divide-y divide-border rounded-xl border border-border bg-white text-sm">
            {user.mockExams.map((m) => (
              <li key={m.id} className="flex items-center justify-between px-4 py-2.5">
                <span>
                  {m.exam.title} <span className="text-zinc-500">· {m.completedAt ? formatDate(m.completedAt) : ""}</span>
                </span>
                <span className="font-semibold">{m.scorePercent}%</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-navy">Subscriptions</h2>
        {user.subscriptions.length === 0 ? (
          <p className="text-sm text-zinc-600">No subscriptions (free plan).</p>
        ) : (
          <ul className="divide-y divide-border rounded-xl border border-border bg-white text-sm">
            {user.subscriptions.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-2.5">
                <span>
                  {s.plan} · {s.provider}
                </span>
                <Badge variant={s.status === "ACTIVE" ? "success" : "neutral"}>{s.status.toLowerCase()}</Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
