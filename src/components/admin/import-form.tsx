"use client";

import { useActionState } from "react";
import { importQuestionsAction, type ImportResult } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, Label, Textarea } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";

export function ImportForm({ examId, example }: { examId: string; example: string }) {
  const [result, action, pending] = useActionState(importQuestionsAction.bind(null, examId), null as ImportResult | null);

  return (
    <form action={action} className="space-y-4">
      {result && result.imported > 0 && <Alert tone="success">{result.imported} question{result.imported === 1 ? "" : "s"} imported.</Alert>}
      {result && result.errors.length > 0 && (
        <Alert tone="danger" title={`${result.errors.length} row${result.errors.length === 1 ? "" : "s"} skipped`}>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs">
            {result.errors.slice(0, 20).map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Field>
        <Label htmlFor="payload">JSON payload</Label>
        <Textarea id="payload" name="payload" rows={18} className="font-mono text-xs" defaultValue={example} required />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="publish" className="h-4 w-4 accent-[#1b6fd6]" />
        Publish imported questions immediately (otherwise saved as drafts)
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Importing…" : "Import"}
      </Button>
    </form>
  );
}
