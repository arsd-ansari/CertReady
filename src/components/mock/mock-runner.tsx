"use client";

import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveMockAnswer, submitMock, type MockResult, type StartMockResult } from "@/lib/engine/mock-actions";
import { cn, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuestionCard } from "@/components/practice/question-card";
import { MockResults } from "./mock-results";

type Start = Extract<StartMockResult, { ok: true }>;

export function MockRunner({ start }: { start: Start }) {
  const { questions, mockId, exam, timeLimitSec, isGuest, resume } = start;
  const elapsedAtLoad = resume?.elapsedSec ?? 0;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => resume?.answers ?? {});
  const [flags, setFlags] = useState<Set<string>>(() => new Set(resume?.flags ?? []));
  const [remaining, setRemaining] = useState(Math.max(0, timeLimitSec - elapsedAtLoad));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<MockResult | null>(null);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0); // set on mount; Date.now() is impure during render
  const submittedRef = useRef(false);

  const question = questions[index];
  const answeredCount = Object.keys(answers).length;

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setConfirmOpen(false);
    startTransition(async () => {
      const res = await submitMock({
        mockId,
        examSlug: exam.slug,
        answers: questions.map((q) => ({ questionId: q.id, optionId: answers[q.id] ?? null })),
        timeTakenSec: Math.min(timeLimitSec, Math.round((Date.now() - startedAt.current) / 1000)),
      });
      if (!res.ok) {
        submittedRef.current = false;
        toast.error(res.error);
        return;
      }
      setResult(res.result);
      window.scrollTo({ top: 0 });
    });
  }, [answers, exam.slug, mockId, questions, timeLimitSec]);

  // Countdown. Auto-submit at zero.
  useEffect(() => {
    if (result) return;
    if (!startedAt.current) startedAt.current = Date.now() - elapsedAtLoad * 1000;
    const id = window.setInterval(() => {
      const elapsed = Math.round((Date.now() - startedAt.current) / 1000);
      const left = Math.max(0, timeLimitSec - elapsed);
      setRemaining(left);
      if (left === 0) {
        window.clearInterval(id);
        submit();
      }
    }, 500);
    return () => window.clearInterval(id);
  }, [elapsedAtLoad, result, submit, timeLimitSec]);

  // Warn before leaving mid-exam.
  useEffect(() => {
    if (result) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [result]);

  const choose = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    if (mockId) void saveMockAnswer({ mockId, questionId: question.id, optionId, isFlagged: flags.has(question.id) });
  };

  const toggleFlag = () => {
    const flagged = !flags.has(question.id);
    const next = new Set(flags);
    if (flagged) next.add(question.id);
    else next.delete(question.id);
    setFlags(next);
    if (mockId) void saveMockAnswer({ mockId, questionId: question.id, optionId: answers[question.id] ?? null, isFlagged: flagged });
  };

  if (result) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <MockResults result={result} isSignedIn={!isGuest} />
      </div>
    );
  }

  const low = remaining <= 60;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3">
        <p className="truncate text-sm font-medium text-zinc-700">{exam.title} · Mock exam</p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-500">
            {answeredCount}/{questions.length} answered
          </span>
          <span
            role="timer"
            aria-live={low ? "assertive" : "off"}
            className={cn("rounded-md px-2.5 py-1 font-mono text-sm font-semibold tabular-nums", low ? "bg-red-50 text-red-700" : "bg-zinc-100 text-navy")}
          >
            {formatDuration(remaining)}
          </span>
          <Button size="sm" variant="success" onClick={() => setConfirmOpen(true)} disabled={pending}>
            Submit
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_240px]">
        <div>
          <QuestionCard
            question={question}
            index={index}
            total={questions.length}
            selectedOptionId={answers[question.id] ?? null}
            feedback={null}
            disabled={pending}
            onSelect={choose}
            headerRight={
              <Button type="button" variant="ghost" size="sm" aria-pressed={flags.has(question.id)} onClick={toggleFlag}>
                <Flag className={flags.has(question.id) ? "fill-amber-400 text-amber-500" : ""} />
                <span className="hidden sm:inline">{flags.has(question.id) ? "Flagged" : "Flag"}</span>
              </Button>
            }
          />

          <div className="mt-5 flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              <ArrowLeft /> Previous
            </Button>
            {index < questions.length - 1 ? (
              <Button type="button" onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}>
                Next <ArrowRight />
              </Button>
            ) : (
              <Button type="button" variant="success" onClick={() => setConfirmOpen(true)} disabled={pending}>
                Review & submit
              </Button>
            )}
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Questions</p>
          <ol className="mt-3 grid grid-cols-5 gap-1.5 lg:grid-cols-4">
            {questions.map((q, i) => {
              const answered = Boolean(answers[q.id]);
              const flagged = flags.has(q.id);
              return (
                <li key={q.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Question ${i + 1}${answered ? ", answered" : ""}${flagged ? ", flagged" : ""}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "relative flex h-9 w-full items-center justify-center rounded-md border text-xs font-medium",
                      i === index ? "border-brand ring-2 ring-brand/30" : "border-zinc-200",
                      answered ? "bg-navy text-white" : "bg-white text-zinc-700",
                    )}
                  >
                    {i + 1}
                    {flagged && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400" />}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 space-y-1 text-xs text-zinc-500">
            <p><span className="inline-block h-2.5 w-2.5 rounded-sm bg-navy align-middle" /> Answered</p>
            <p><span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 align-middle" /> Flagged</p>
          </div>
        </aside>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent title="Submit mock exam?" description={`You've answered ${answeredCount} of ${questions.length} questions. Unanswered questions count as incorrect.`}>
          {flags.size > 0 && <p className="text-sm text-amber-700">You still have {flags.size} flagged question{flags.size === 1 ? "" : "s"}.</p>}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Keep working
            </Button>
            <Button variant="success" onClick={submit} disabled={pending}>
              Submit now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
