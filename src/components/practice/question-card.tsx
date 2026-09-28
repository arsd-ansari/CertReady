"use client";

import { Check, X } from "lucide-react";
import type { ClientQuestion } from "@/lib/engine/select-questions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type Feedback = {
  correctOptionId: string;
  explanation: string;
  source: { title: string; url: string | null; publisher: string | null } | null;
  sourceNote: string | null;
};

const DIFF: Record<string, string> = { EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" };

export function QuestionCard({
  question,
  index,
  total,
  selectedOptionId,
  feedback,
  disabled,
  onSelect,
  headerRight,
}: {
  question: ClientQuestion;
  index: number;
  total: number;
  selectedOptionId: string | null;
  feedback: Feedback | null;
  disabled?: boolean;
  onSelect: (optionId: string) => void;
  headerRight?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 sm:p-7">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-zinc-500">
            Question {index + 1} of {total}
          </span>
          <Badge variant="neutral">{question.category.name}</Badge>
          <Badge variant="outline">{DIFF[question.difficulty] ?? question.difficulty}</Badge>
        </div>
        {headerRight}
      </header>

      <h2 className="mt-4 text-lg font-medium leading-relaxed text-zinc-900 sm:text-xl">{question.prompt}</h2>

      <div role="radiogroup" aria-label="Answer options" className="mt-5 grid gap-2.5">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = feedback?.correctOptionId === option.id;
          const showWrong = feedback && isSelected && !isCorrect;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled || Boolean(feedback)}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-[15px] leading-6 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !feedback && !isSelected && "border-zinc-200 bg-white hover:border-brand/50 hover:bg-brand-soft/40",
                !feedback && isSelected && "border-brand bg-brand-soft",
                feedback && isCorrect && "border-success bg-success-soft",
                showWrong && "border-red-400 bg-red-50",
                feedback && !isCorrect && !isSelected && "border-zinc-200 opacity-70",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  feedback && isCorrect
                    ? "border-success bg-success text-white"
                    : showWrong
                      ? "border-red-500 bg-red-500 text-white"
                      : isSelected
                        ? "border-brand bg-brand text-white"
                        : "border-zinc-300 text-zinc-600",
                )}
              >
                {feedback && isCorrect ? <Check className="h-3.5 w-3.5" /> : showWrong ? <X className="h-3.5 w-3.5" /> : option.label}
              </span>
              <span className="text-zinc-800">{option.text}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export function ExplanationPanel({ feedback, isCorrect }: { feedback: Feedback; isCorrect: boolean }) {
  return (
    <section
      aria-live="polite"
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        isCorrect ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50",
      )}
    >
      <p className={cn("font-semibold", isCorrect ? "text-[#15803d]" : "text-amber-800")}>
        {isCorrect ? "Correct" : "Not quite"}
      </p>
      <p className="mt-2 text-[15px] leading-7 text-zinc-800">{feedback.explanation}</p>
      {(feedback.source || feedback.sourceNote) && (
        <p className="mt-3 text-xs text-zinc-600">
          <span className="font-medium">Source: </span>
          {feedback.source?.url ? (
            <a href={feedback.source.url} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-navy">
              {feedback.source.title}
            </a>
          ) : (
            feedback.source?.title
          )}
          {feedback.source?.publisher && ` — ${feedback.source.publisher}`}
          {feedback.sourceNote && ` (${feedback.sourceNote})`}
        </p>
      )}
    </section>
  );
}
