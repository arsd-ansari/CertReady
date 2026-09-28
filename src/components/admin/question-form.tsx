"use client";

import { useActionState, useTransition } from "react";
import { createQuestionAction, deleteQuestionAction, updateQuestionAction, type AdminFormState } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Label, NativeSelect, Textarea } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";

export type QuestionFormValues = {
  categoryId: string;
  prompt: string;
  explanation: string;
  difficulty: string;
  isFree: boolean;
  status: string;
  tags: string;
  sourceId: string;
  sourceNote: string;
  options: { id?: string; text: string; isCorrect: boolean }[];
};

export const emptyQuestionValues: QuestionFormValues = {
  categoryId: "",
  prompt: "",
  explanation: "",
  difficulty: "MEDIUM",
  isFree: false,
  status: "DRAFT",
  tags: "",
  sourceId: "",
  sourceNote: "",
  options: [
    { text: "", isCorrect: true },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
};

const initial: AdminFormState = {};

export function QuestionForm({
  examId,
  questionId,
  values,
  categories,
  sources,
}: {
  examId: string;
  questionId?: string;
  values: QuestionFormValues;
  categories: { id: string; name: string }[];
  sources: { id: string; title: string }[];
}) {
  const action = questionId ? updateQuestionAction.bind(null, questionId) : createQuestionAction.bind(null, examId);
  const [state, formAction, pending] = useActionState(action, initial);
  const [deleting, startDelete] = useTransition();
  const fe = state.fieldErrors ?? {};
  const correctIndex = Math.max(0, values.options.findIndex((o) => o.isCorrect));
  const slots = Array.from({ length: 6 }, (_, i) => values.options[i] ?? { text: "", isCorrect: false });

  return (
    <form action={formAction} className="space-y-6">
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}

      <section className="space-y-4 rounded-xl border border-border bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-4">
          <Field className="sm:col-span-2">
            <Label htmlFor="categoryId">Section</Label>
            <NativeSelect id="categoryId" name="categoryId" defaultValue={values.categoryId} required>
              <option value="">Choose…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
            <FieldError>{fe.categoryId}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="difficulty">Difficulty</Label>
            <NativeSelect id="difficulty" name="difficulty" defaultValue={values.difficulty}>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </NativeSelect>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <NativeSelect id="status" name="status" defaultValue={values.status}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </NativeSelect>
          </Field>
        </div>

        <Field>
          <Label htmlFor="prompt">Question</Label>
          <Textarea id="prompt" name="prompt" defaultValue={values.prompt} rows={3} required />
          <FieldError>{fe.prompt}</FieldError>
        </Field>

        <fieldset>
          <legend className="text-sm font-medium text-zinc-800">Answer options (select the correct one)</legend>
          <p className="mb-2 text-xs text-zinc-500">Leave unused rows blank. Minimum two.</p>
          <div className="space-y-2">
            {slots.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctIndex"
                  value={i}
                  defaultChecked={i === correctIndex}
                  aria-label={`Option ${"ABCDEF"[i]} is correct`}
                  className="h-4 w-4 accent-[#16a34a]"
                />
                <span className="w-5 text-sm font-semibold text-zinc-500">{"ABCDEF"[i]}</span>
                {opt.id && <input type="hidden" name={`optionId${i}`} value={opt.id} />}
                <Input name={`option${i}`} defaultValue={opt.text} placeholder={i < 2 ? "Required" : "Optional"} aria-label={`Option ${"ABCDEF"[i]} text`} />
              </div>
            ))}
          </div>
          <FieldError>{fe.options ?? fe.correctIndex}</FieldError>
        </fieldset>

        <Field>
          <Label htmlFor="explanation">Explanation</Label>
          <Textarea id="explanation" name="explanation" defaultValue={values.explanation} rows={4} required />
          <FieldError>{fe.explanation}</FieldError>
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <Label htmlFor="sourceId">Source reference</Label>
            <NativeSelect id="sourceId" name="sourceId" defaultValue={values.sourceId}>
              <option value="">None</option>
              {sources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field>
            <Label htmlFor="sourceNote">Source note</Label>
            <Input id="sourceNote" name="sourceNote" defaultValue={values.sourceNote} placeholder="§82.156(a)" />
          </Field>
          <Field>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" name="tags" defaultValue={values.tags} />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isFree" defaultChecked={values.isFree} className="h-4 w-4 accent-[#1b6fd6]" />
          Free question (available without premium)
        </label>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {questionId ? (
          <Button
            type="button"
            variant="destructive"
            disabled={deleting}
            onClick={() => {
              if (window.confirm("Delete this question? Answer history referencing it will be removed.")) {
                startDelete(() => deleteQuestionAction(questionId));
              }
            }}
          >
            Delete question
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          {!questionId && (
            <Button type="submit" name="intent" value="save-and-new" variant="secondary" disabled={pending}>
              Save & add another
            </Button>
          )}
          <Button type="submit" name="intent" value="save" disabled={pending}>
            {pending ? "Saving…" : questionId ? "Save question" : "Save question"}
          </Button>
        </div>
      </div>
    </form>
  );
}
