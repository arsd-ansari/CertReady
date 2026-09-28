"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setExamStatusAction } from "@/lib/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const VARIANT = { DRAFT: "warning", PUBLISHED: "success", ARCHIVED: "neutral" } as const;

export function ExamStatusControls({ examId, status, questionCount }: { examId: string; status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; questionCount: number }) {
  const [pending, start] = useTransition();
  const set = (next: "DRAFT" | "PUBLISHED" | "ARCHIVED") =>
    start(async () => {
      await setExamStatusAction(examId, next);
      toast.success(`Exam ${next.toLowerCase()}.`);
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant={VARIANT[status]}>{status.toLowerCase()}</Badge>
      {status !== "PUBLISHED" && (
        <Button size="sm" variant="success" disabled={pending || questionCount === 0} onClick={() => set("PUBLISHED")} title={questionCount === 0 ? "Add questions before publishing" : undefined}>
          Publish
        </Button>
      )}
      {status === "PUBLISHED" && (
        <Button size="sm" variant="secondary" disabled={pending} onClick={() => set("DRAFT")}>
          Unpublish
        </Button>
      )}
      {status !== "ARCHIVED" && (
        <Button size="sm" variant="ghost" disabled={pending} onClick={() => set("ARCHIVED")}>
          Archive
        </Button>
      )}
    </div>
  );
}
