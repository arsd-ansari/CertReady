"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { bulkQuestionStatusAction } from "@/lib/admin/actions";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

type Row = {
  id: string;
  prompt: string;
  difficulty: string;
  isFree: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  updatedAt: Date;
  category: { name: string };
  _count: { reports: number };
};

const STATUS_VARIANT = { DRAFT: "warning", PUBLISHED: "success", ARCHIVED: "neutral" } as const;

export function QuestionTable({ examId, questions }: { examId: string; questions: Row[] }) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [pending, start] = useTransition();
  const allSelected = questions.length > 0 && questions.every((q) => selected.has(q.id));

  const bulk = (status: "PUBLISHED" | "DRAFT" | "ARCHIVED") =>
    start(async () => {
      await bulkQuestionStatusAction(examId, [...selected], status);
      toast.success(`${selected.size} question${selected.size === 1 ? "" : "s"} ${status.toLowerCase()}.`);
      setSelected(new Set());
    });

  if (questions.length === 0) {
    return (
      <EmptyState
        title="No questions match"
        action={
          <Button asChild>
            <Link href={`/admin/exams/${examId}/questions/new`}>Add the first question</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-navy px-3 py-2 text-sm text-white">
          <span className="mr-2 font-medium">{selected.size} selected</span>
          <Button size="sm" variant="success" disabled={pending} onClick={() => bulk("PUBLISHED")}>
            Publish
          </Button>
          <Button size="sm" variant="secondary" disabled={pending} onClick={() => bulk("DRAFT")}>
            Unpublish
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 hover:text-white" disabled={pending} onClick={() => bulk("ARCHIVED")}>
            Archive
          </Button>
          <button type="button" className="ml-auto text-xs underline" onClick={() => setSelected(new Set())}>
            Clear
          </button>
        </div>
      )}
      <Table>
        <THead>
          <TR>
            <TH className="w-10">
              <input
                type="checkbox"
                aria-label="Select all"
                checked={allSelected}
                onChange={(e) => setSelected(e.target.checked ? new Set(questions.map((q) => q.id)) : new Set())}
                className="h-4 w-4 accent-[#1b6fd6]"
              />
            </TH>
            <TH>Prompt</TH>
            <TH>Section</TH>
            <TH>Difficulty</TH>
            <TH>Tier</TH>
            <TH>Status</TH>
            <TH>Updated</TH>
          </TR>
        </THead>
        <TBody>
          {questions.map((q) => (
            <TR key={q.id}>
              <TD>
                <input
                  type="checkbox"
                  aria-label="Select question"
                  checked={selected.has(q.id)}
                  onChange={(e) =>
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (e.target.checked) next.add(q.id);
                      else next.delete(q.id);
                      return next;
                    })
                  }
                  className="h-4 w-4 accent-[#1b6fd6]"
                />
              </TD>
              <TD className="max-w-md">
                <Link href={`/admin/questions/${q.id}`} className="line-clamp-2 font-medium text-zinc-900 hover:text-brand">
                  {q.prompt}
                </Link>
                {q._count.reports > 0 && (
                  <Badge variant="danger" className="mt-1">
                    {q._count.reports} open report{q._count.reports === 1 ? "" : "s"}
                  </Badge>
                )}
              </TD>
              <TD className="text-zinc-600">{q.category.name}</TD>
              <TD className="text-zinc-600">{q.difficulty.toLowerCase()}</TD>
              <TD>
                <Badge variant={q.isFree ? "success" : "navy"}>{q.isFree ? "free" : "premium"}</Badge>
              </TD>
              <TD>
                <Badge variant={STATUS_VARIANT[q.status]}>{q.status.toLowerCase()}</Badge>
              </TD>
              <TD className="whitespace-nowrap text-zinc-600">{formatDate(q.updatedAt)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
