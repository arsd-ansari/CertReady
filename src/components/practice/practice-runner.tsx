"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { track } from "@/lib/analytics/client";
import { EVENTS } from "@/lib/analytics/events";
import { answerQuestion, completePractice, type StartPracticeResult } from "@/lib/engine/practice-actions";
import { percent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExplanationPanel, QuestionCard, type Feedback } from "./question-card";
import { BookmarkButton, ReportButton } from "./question-tools";

type Start = Extract<StartPracticeResult, { ok: true }>;
type Graded = Feedback & { selectedOptionId: string; isCorrect: boolean };

export function PracticeRunner({ start, initialBookmarks }: { start: Start; initialBookmarks: string[] }) {
  const { questions, sessionId, exam, category, isSignedIn, limited } = start;
  const [index, setIndex] = useState(0);
  const [graded, setGraded] = useState<Record<string, Graded>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => new Set(initialBookmarks));
  const [finished, setFinished] = useState(false);
  const [pending, startTransition] = useTransition();
  const questionStartedAt = useRef(0); // set by the effect below; Date.now() is impure during render

  const question = questions[index];
  const current = graded[question.id] ?? null;
  const answeredCount = Object.keys(graded).length;
  const correctCount = Object.values(graded).filter((g) => g.isCorrect).length;

  useEffect(() => {
    questionStartedAt.current = Date.now();
  }, [index]);

  const grade = useCallback(
    (optionId: string) => {
      setSelected(optionId);
      startTransition(async () => {
        const res = await answerQuestion({
          sessionId,
          questionId: question.id,
          optionId,
          timeSpentSec: Math.min(3600, Math.round((Date.now() - questionStartedAt.current) / 1000)),
        });
        if (!res.ok) {
          toast.error(res.error);
          setSelected(null);
          return;
        }
        setGraded((prev) => ({
          ...prev,
          [question.id]: {
            selectedOptionId: optionId,
            isCorrect: res.isCorrect,
            correctOptionId: res.correctOptionId,
            explanation: res.explanation,
            source: res.source,
            sourceNote: res.sourceNote,
          },
        }));
        track(EVENTS.questionAnswered, { exam: exam.slug, correct: res.isCorrect });
      });
    },
    [exam.slug, question.id, sessionId],
  );

  const goTo = (next: number) => {
    setSelected(null);
    setIndex(Math.max(0, Math.min(questions.length - 1, next)));
  };

  const finish = () => {
    setFinished(true);
    if (sessionId) void completePractice(sessionId);
  };

  if (finished) {
    const pct = percent(correctCount, answeredCount);
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-border bg-white p-8 text-center">
          <p className="text-sm font-medium text-zinc-500">{exam.title}{category ? ` · ${category.name}` : ""}</p>
          <p className="mt-3 text-5xl font-semibold tracking-tight text-navy">{pct}%</p>
          <p className="mt-2 text-zinc-600">
            {correctCount} of {answeredCount} correct
          </p>
          <Progress value={pct} tone="auto" className="mx-auto mt-4 max-w-xs" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={`/practice/${exam.slug}`}>Practice again</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/mock/${exam.slug}`}>Take a mock exam</Link>
            </Button>
            {isSignedIn ? (
              <Button asChild variant="ghost">
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant="ghost">
                <Link href={`/register?next=/practice/${exam.slug}`}>Save my progress</Link>
              </Button>
            )}
          </div>
          {!isSignedIn && (
            <p className="mt-6 text-xs text-zinc-500">
              This result wasn&apos;t saved. Create a free account to track scores, streaks and weak topics.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-4 flex items-center justify-between gap-4 text-sm">
        <Link href={`/exams/${exam.slug}`} className="truncate font-medium text-zinc-600 hover:text-navy">
          ← {exam.title}
        </Link>
        <span className="shrink-0 text-zinc-500">
          {correctCount}/{answeredCount} correct
        </span>
      </div>
      <Progress value={((index + (current ? 1 : 0)) / questions.length) * 100} className="mb-6" />

      {limited && index === 0 && (
        <p className="mb-4 rounded-lg bg-brand-soft px-4 py-2 text-xs text-navy">
          Free tier: this set was limited to {questions.length} question{questions.length === 1 ? "" : "s"}.{" "}
          {!isSignedIn && (
            <Link href={`/register?next=/practice/${exam.slug}`} className="font-medium underline">
              Create a free account
            </Link>
          )}
        </p>
      )}

      <QuestionCard
        question={question}
        index={index}
        total={questions.length}
        selectedOptionId={current?.selectedOptionId ?? selected}
        feedback={current}
        disabled={pending}
        onSelect={grade}
        headerRight={
          <div className="flex items-center gap-1">
            <BookmarkButton
              questionId={question.id}
              bookmarked={bookmarks.has(question.id)}
              isSignedIn={isSignedIn}
              onChange={(b) =>
                setBookmarks((prev) => {
                  const next = new Set(prev);
                  if (b) next.add(question.id);
                  else next.delete(question.id);
                  return next;
                })
              }
            />
            <ReportButton questionId={question.id} />
          </div>
        }
      />

      {current && (
        <div className="mt-4">
          <ExplanationPanel feedback={current} isCorrect={current.isCorrect} />
        </div>
      )}

      <div className="sticky bottom-0 mt-6 flex items-center justify-between gap-3 border-t border-border bg-background/95 py-4 backdrop-blur">
        <Button type="button" variant="ghost" onClick={() => goTo(index - 1)} disabled={index === 0}>
          <ArrowLeft /> Previous
        </Button>
        <div className="flex gap-2">
          {index < questions.length - 1 ? (
            <Button type="button" onClick={() => goTo(index + 1)} disabled={!current}>
              Next <ArrowRight />
            </Button>
          ) : (
            <Button type="button" variant="success" onClick={finish} disabled={answeredCount === 0}>
              Finish set
            </Button>
          )}
          {answeredCount > 0 && index === questions.length - 1 && !current && (
            <Button type="button" variant="ghost" onClick={finish}>
              <RotateCcw /> End early
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
