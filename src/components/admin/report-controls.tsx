"use client";

import Link from "next/link";
import { useTransition } from "react";
import { resolveReportAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function ReportControls({ reportId, questionId }: { reportId: string; questionId: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex shrink-0 gap-2">
      <Button asChild size="sm" variant="secondary">
        <Link href={`/admin/questions/${questionId}`}>Edit question</Link>
      </Button>
      <Button size="sm" variant="success" disabled={pending} onClick={() => start(() => resolveReportAction(reportId, "RESOLVED"))}>
        Resolve
      </Button>
      <Button size="sm" variant="ghost" disabled={pending} onClick={() => start(() => resolveReportAction(reportId, "DISMISSED"))}>
        Dismiss
      </Button>
    </div>
  );
}
