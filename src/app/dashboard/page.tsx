import { Flame } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoryBarChart, ScoreTrendChart } from "@/components/dashboard/charts";
import { Button } from "@/components/ui/button";
import { Alert, EmptyState, Stat } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { requireUser } from "@/lib/auth/guards";
import { getDashboardOverview } from "@/lib/dashboard/queries";
import { formatDate, formatDuration, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

export default async function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  const user = await requireUser("/dashboard");
  const sp = await searchParams;
  const data = await getDashboardOverview(user.id);
  const firstName = user.name?.split(" ")[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{firstName ? `Welcome back, ${firstName}` : "Your dashboard"}</h1>
        <p className="mt-1 text-sm text-zinc-600">Here&apos;s where your preparation stands.</p>
      </div>

      {sp.reset && <Alert tone="success">Your password has been reset and you&apos;re signed in.</Alert>}

      {data.questionsAnswered === 0 ? (
        <EmptyState
          title="No practice yet"
          description="Answer a few questions or take a mock exam and your stats, streak and weak topics will show up here."
          action={
            <Button asChild>
              <Link href="/exams">Choose an exam</Link>
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Stat label="Exams started" value={data.examsStarted} />
            <Stat label="Questions answered" value={data.questionsAnswered} hint={`${data.accuracy}% accuracy`} />
            <Stat label="Average mock score" value={data.avgScore === null ? "—" : `${data.avgScore}%`} />
            <Stat label="Best mock score" value={data.bestScore === null ? "—" : `${data.bestScore}%`} />
            <Stat
              label="Study streak"
              value={
                <span className="inline-flex items-center gap-1">
                  {data.streak} <Flame className="h-5 w-5 text-amber-500" aria-hidden />
                </span>
              }
              hint={data.streak === 1 ? "day" : "days"}
            />
            <Stat label="Bookmarks" value={data.bookmarks} />
          </div>

          {data.target ? (
            <section className="rounded-xl border border-border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Target exam</p>
                  <h2 className="mt-1 text-lg font-semibold text-navy">{data.target.exam.title}</h2>
                  {data.target.examDate && (
                    <p className="text-sm text-zinc-600">
                      Exam date {formatDate(data.target.examDate)}
                      {data.target.daysLeft !== null && (data.target.daysLeft >= 0 ? ` · ${data.target.daysLeft} days left` : " · date passed")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm">
                    <Link href={`/practice/${data.target.exam.slug}`}>Practice</Link>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/mock/${data.target.exam.slug}`}>Mock exam</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Question bank covered</span>
                    <span className="font-medium">{data.target.coveragePct}%</span>
                  </div>
                  <Progress value={data.target.coveragePct} className="mt-1.5" />
                  <p className="mt-1 text-xs text-zinc-500">
                    {data.target.distinctAnswered} of {data.target.exam.totalQuestions} questions seen
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Best mock score</span>
                    <span className="font-medium">{data.target.bestMockScore === null ? "—" : `${data.target.bestMockScore}%`}</span>
                  </div>
                  <Progress value={data.target.bestMockScore ?? 0} tone="auto" className="mt-1.5" />
                  <p className="mt-1 text-xs text-zinc-500">{`${pluralize(data.target.mocksCompleted, "mock")} completed`}</p>
                </div>
                <div className="text-sm text-zinc-600">
                  {data.target.bestMockScore !== null && data.target.bestMockScore >= 80
                    ? "You're scoring comfortably above passing. Keep taking mocks to stay sharp."
                    : "Aim for 80%+ on two consecutive mocks before booking the exam."}
                </div>
              </div>
            </section>
          ) : (
            <Alert tone="info">
              <Link href="/dashboard/profile" className="font-medium underline">
                Set a target exam and exam date
              </Link>{" "}
              to see a readiness tracker here.
            </Alert>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-border bg-white p-5">
              <h2 className="font-semibold text-navy">Mock score trend</h2>
              {data.scoreTrend.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-600">Complete a mock exam to start the trend line.</p>
              ) : (
                <div className="mt-4">
                  <ScoreTrendChart data={data.scoreTrend.map((t) => ({ ...t, date: formatDate(t.date) }))} />
                </div>
              )}
            </section>

            <section className="rounded-xl border border-border bg-white p-5">
              <h2 className="font-semibold text-navy">Accuracy by section</h2>
              {data.categories.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-600">Answer questions to see section-level accuracy.</p>
              ) : (
                <div className="mt-4">
                  <CategoryBarChart data={data.categories.slice(0, 8).map((c) => ({ name: c.name, pct: c.pct }))} />
                </div>
              )}
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl border border-border bg-white p-5">
              <h2 className="font-semibold text-navy">Weak categories</h2>
              {data.weak.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-600">No section below 70% with enough attempts yet. Keep practicing.</p>
              ) : (
                <ul className="mt-3 divide-y divide-border">
                  {data.weak.map((c) => (
                    <li key={c.categoryId} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                      <div>
                        <p className="font-medium text-zinc-900">{c.name}</p>
                        <p className="text-xs text-zinc-500">
                          {c.examTitle} · {c.correct}/{c.total} correct
                        </p>
                      </div>
                      <Link href={`/practice/${c.examSlug}/run?mode=CATEGORY&category=${c.slug}&count=10`} className="shrink-0 font-medium text-brand hover:underline">
                        Drill →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy">Recent mock exams</h2>
                <Link href="/dashboard/history" className="text-sm font-medium text-brand hover:underline">
                  All history
                </Link>
              </div>
              {data.recentMocks.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-600">No mock exams yet.</p>
              ) : (
                <ul className="mt-3 divide-y divide-border">
                  {data.recentMocks.map((m) => (
                    <li key={m.id} className="py-2.5 text-sm">
                      <Link href={`/mock/results/${m.id}`} className="flex items-center justify-between gap-3 hover:text-brand">
                        <div>
                          <p className="font-medium text-zinc-900">{m.exam.title}</p>
                          <p className="text-xs text-zinc-500">
                            {m.completedAt ? formatDate(m.completedAt) : ""} · {m.correctCount}/{m.totalQuestions} · {formatDuration(m.timeTakenSec ?? 0)}
                          </p>
                        </div>
                        <span className={`text-lg font-semibold ${(m.scorePercent ?? 0) >= 70 ? "text-[#15803d]" : "text-amber-600"}`}>{m.scorePercent}%</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="font-semibold text-navy">Exams in progress</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {data.progress.map((p) => (
                <li key={p.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/exams/${p.exam.slug}`} className="font-medium text-navy hover:text-brand">
                      {p.exam.title}
                    </Link>
                    <span className="text-xs text-zinc-500">{p.lastActivityDate ? formatDate(p.lastActivityDate) : ""}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    {`${p.questionsAnswered} answered · ${pluralize(p.mocksCompleted, "mock")}`}
                    {p.bestMockScore !== null && ` · best ${p.bestMockScore}%`}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`/practice/${p.exam.slug}`}>Continue practicing</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
