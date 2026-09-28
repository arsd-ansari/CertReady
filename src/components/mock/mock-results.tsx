"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { MockResult } from "@/lib/engine/mock-actions";
import { cn, formatDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MockResults({ result, isSignedIn }: { result: MockResult; isSignedIn: boolean }) {
  const passed = result.scorePercent >= 70;
  const [filter, setFilter] = useState<"all" | "incorrect">("incorrect");
  const items = filter === "all" ? result.review : result.review.filter((r) => !r.isCorrect);

  return (
    <div>
      <section className="rounded-2xl border border-border bg-white p-6 sm:p-8">
        <p className="text-sm font-medium text-zinc-500">{result.exam.title} · Mock exam results</p>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <div>
            <p className={cn("text-6xl font-semibold tracking-tight", passed ? "text-[#15803d]" : "text-navy")}>{result.scorePercent}%</p>
            <p className="mt-1 text-sm text-zinc-600">{passed ? "On track — keep it up." : "Below 70%. Review the weak sections below."}</p>
          </div>
          <dl className="grid flex-1 grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <Stat label="Correct" value={result.correct} tone="text-[#15803d]" />
            <Stat label="Incorrect" value={result.incorrect} tone="text-red-600" />
            <Stat label="Unanswered" value={result.unanswered} />
            <Stat label="Time" value={`${formatDuration(result.timeTakenSec)} / ${formatDuration(result.timeLimitSec)}`} />
          </dl>
        </div>
        <Progress value={result.scorePercent} tone="auto" className="mt-6" />

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/mock/${result.exam.slug}`}>Take another mock</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={`/practice/${result.exam.slug}`}>Practice by topic</Link>
          </Button>
          {isSignedIn ? (
            <Button asChild variant="ghost">
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost">
              <Link href={`/register?next=/mock/${result.exam.slug}`}>Save results with a free account</Link>
            </Button>
          )}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold text-navy">Performance by section</h2>
          <ul className="mt-4 space-y-4">
            {result.byCategory.map((c) => (
              <li key={c.id}>
                <div className="flex items-center justify-between text-sm">
                  <Link href={`/practice/${result.exam.slug}/run?mode=CATEGORY&category=${c.slug}&count=10`} className="font-medium text-zinc-800 hover:text-brand">
                    {c.name}
                  </Link>
                  <span className="text-zinc-500">
                    {c.correct}/{c.total} · {c.pct}%
                  </span>
                </div>
                <Progress value={c.pct} tone="auto" className="mt-1.5" />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold text-navy">Recommendations</h2>
          {result.weakest.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-600">Every section is at or above 70%. Take another full mock to confirm consistency, then book the exam.</p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {result.weakest.map((w) => (
                <li key={w.slug} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="font-medium text-amber-900">
                    {w.name} — {w.pct}%
                  </p>
                  <Link href={`/practice/${result.exam.slug}/run?mode=CATEGORY&category=${w.slug}&count=10`} className="mt-1 inline-block font-medium text-brand hover:underline">
                    Drill this section →
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!isSignedIn && (
            <p className="mt-4 text-xs leading-5 text-zinc-500">These results won&apos;t be saved. A free account tracks scores over time and highlights persistent weak spots.</p>
          )}
        </div>
      </section>

      <section className="mt-6">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "incorrect")}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold text-navy">Review answers</h2>
            <TabsList>
              <TabsTrigger value="incorrect">Missed ({result.review.filter((r) => !r.isCorrect).length})</TabsTrigger>
              <TabsTrigger value="all">All ({result.review.length})</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={filter}>
            {items.length === 0 ? (
              <p className="rounded-xl border border-border bg-white p-6 text-sm text-zinc-600">Nothing to review here — every question was answered correctly.</p>
            ) : (
              <ol className="space-y-4">
                {items.map((item) => {
                  const position = result.review.indexOf(item) + 1;
                  return (
                    <li key={item.id} className="rounded-2xl border border-border bg-white p-5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-medium text-zinc-500">Q{position}</span>
                        <Badge variant="neutral">{item.category.name}</Badge>
                        <Badge variant={item.isCorrect ? "success" : item.selectedOptionId ? "danger" : "warning"}>
                          {item.isCorrect ? "Correct" : item.selectedOptionId ? "Incorrect" : "Unanswered"}
                        </Badge>
                      </div>
                      <p className="mt-3 font-medium text-zinc-900">{item.prompt}</p>
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {item.options.map((o) => {
                          const chosen = o.id === item.selectedOptionId;
                          return (
                            <li
                              key={o.id}
                              className={cn(
                                "flex items-start gap-2 rounded-lg border px-3 py-2",
                                o.isCorrect ? "border-green-300 bg-green-50" : chosen ? "border-red-300 bg-red-50" : "border-zinc-200",
                              )}
                            >
                              <span className="mt-0.5 w-4 shrink-0 text-xs font-semibold text-zinc-500">{o.label}</span>
                              <span className="flex-1 text-zinc-800">{o.text}</span>
                              {o.isCorrect && <Check className="h-4 w-4 shrink-0 text-[#15803d]" aria-label="Correct answer" />}
                              {chosen && !o.isCorrect && <X className="h-4 w-4 shrink-0 text-red-600" aria-label="Your answer" />}
                            </li>
                          );
                        })}
                      </ul>
                      <p className="mt-3 text-sm leading-6 text-zinc-700">
                        <span className="font-medium text-zinc-900">Why: </span>
                        {item.explanation}
                      </p>
                    </li>
                  );
                })}
              </ol>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone?: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 p-3">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className={cn("mt-0.5 text-lg font-semibold text-navy", tone)}>{value}</dd>
    </div>
  );
}
