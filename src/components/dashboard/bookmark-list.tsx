"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { toggleBookmark } from "@/lib/engine/practice-actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Item = {
  id: string;
  question: {
    id: string;
    prompt: string;
    explanation: string;
    difficulty: string;
    exam: { slug: string; title: string };
    category: { name: string; slug: string };
    options: { id: string; label: string; text: string; isCorrect: boolean }[];
  };
};

export function BookmarkList({ items }: { items: Item[] }) {
  const [list, setList] = useState(items);
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const [pending, start] = useTransition();

  const remove = (questionId: string) =>
    start(async () => {
      const res = await toggleBookmark(questionId);
      if (res.ok) setList((prev) => prev.filter((b) => b.question.id !== questionId));
      else toast.error(res.error);
    });

  return (
    <ul className="space-y-4">
      {list.map((b) => {
        const open = revealed.has(b.question.id);
        return (
          <li key={b.id} className="rounded-xl border border-border bg-white p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="neutral">{b.question.exam.title}</Badge>
              <Badge variant="outline">{b.question.category.name}</Badge>
            </div>
            <p className="mt-3 font-medium text-zinc-900">{b.question.prompt}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {b.question.options.map((o) => (
                <li
                  key={o.id}
                  className={cn(
                    "flex items-start gap-2 rounded-lg border px-3 py-2",
                    open && o.isCorrect ? "border-green-300 bg-green-50" : "border-zinc-200",
                  )}
                >
                  <span className="mt-0.5 w-4 shrink-0 text-xs font-semibold text-zinc-500">{o.label}</span>
                  <span className="text-zinc-800">{o.text}</span>
                </li>
              ))}
            </ul>
            {open && <p className="mt-3 text-sm leading-6 text-zinc-700">{b.question.explanation}</p>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  setRevealed((prev) => {
                    const next = new Set(prev);
                    if (open) next.delete(b.question.id);
                    else next.add(b.question.id);
                    return next;
                  })
                }
              >
                {open ? "Hide answer" : "Show answer"}
              </Button>
              <Button size="sm" variant="ghost" disabled={pending} onClick={() => remove(b.question.id)} aria-label="Remove bookmark">
                <Trash2 /> Remove
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
