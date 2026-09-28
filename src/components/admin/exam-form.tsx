"use client";

import { useActionState } from "react";
import { createExamAction, updateExamAction, type AdminFormState } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Label, NativeSelect, Textarea } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";

export type ExamFormValues = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  overview: string;
  whoShouldTake: string;
  requirements: string;
  studyGuide: string;
  faqJson: string;
  resourcesJson: string;
  certifyingBody: string;
  categoryId: string;
  scope: string;
  states: string;
  difficulty: string;
  isFeatured: boolean;
  realQuestionCount: string;
  realTimeMinutes: string;
  passingScoreText: string;
  mockQuestionCount: string;
  mockTimeMinutes: string;
  freeQuestionLimit: string;
  seoTitle: string;
  seoDescription: string;
};

export const emptyExamValues: ExamFormValues = {
  slug: "",
  title: "",
  shortTitle: "",
  summary: "",
  overview: "",
  whoShouldTake: "",
  requirements: "",
  studyGuide: "",
  faqJson: "[]",
  resourcesJson: "[]",
  certifyingBody: "",
  categoryId: "",
  scope: "FEDERAL",
  states: "",
  difficulty: "MEDIUM",
  isFeatured: false,
  realQuestionCount: "",
  realTimeMinutes: "",
  passingScoreText: "",
  mockQuestionCount: "25",
  mockTimeMinutes: "30",
  freeQuestionLimit: "10",
  seoTitle: "",
  seoDescription: "",
};

const initial: AdminFormState = {};

export function ExamForm({
  examId,
  values,
  categories,
}: {
  examId?: string;
  values: ExamFormValues;
  categories: { id: string; name: string }[];
}) {
  const action = examId ? updateExamAction.bind(null, examId) : createExamAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}

      <Section title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={values.title} required />
            <FieldError>{fe.title}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="shortTitle">Short title</Label>
            <Input id="shortTitle" name="shortTitle" defaultValue={values.shortTitle} placeholder="EPA 608" />
            <FieldError>{fe.shortTitle}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="slug">URL slug</Label>
            <Input id="slug" name="slug" defaultValue={values.slug} placeholder="auto-generated from title" />
            <FieldError>{fe.slug}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="categoryId">Certification category</Label>
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
        </div>
        <Field>
          <Label htmlFor="summary">Summary (cards & meta description)</Label>
          <Textarea id="summary" name="summary" defaultValue={values.summary} maxLength={400} required />
          <FieldError>{fe.summary}</FieldError>
        </Field>
        <Field>
          <Label htmlFor="certifyingBody">Certifying body</Label>
          <Input id="certifyingBody" name="certifyingBody" defaultValue={values.certifyingBody} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-4">
          <Field>
            <Label htmlFor="scope">Scope</Label>
            <NativeSelect id="scope" name="scope" defaultValue={values.scope}>
              <option value="FEDERAL">Federal</option>
              <option value="STATE">State</option>
              <option value="NATIONAL_PRIVATE">National / private</option>
            </NativeSelect>
          </Field>
          <Field>
            <Label htmlFor="states">States (codes, comma-separated)</Label>
            <Input id="states" name="states" defaultValue={values.states} placeholder="TX, CA" />
            <FieldError>{fe.states}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="difficulty">Difficulty</Label>
            <NativeSelect id="difficulty" name="difficulty" defaultValue={values.difficulty}>
              <option value="EASY">Beginner</option>
              <option value="MEDIUM">Intermediate</option>
              <option value="HARD">Advanced</option>
            </NativeSelect>
          </Field>
          <label className="flex items-center gap-2 self-end pb-2 text-sm">
            <input type="checkbox" name="isFeatured" defaultChecked={values.isFeatured} className="h-4 w-4 accent-[#1b6fd6]" />
            Featured on homepage
          </label>
        </div>
      </Section>

      <Section title="Official exam facts">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <Label htmlFor="realQuestionCount">Official question count</Label>
            <Input id="realQuestionCount" name="realQuestionCount" type="number" min={1} defaultValue={values.realQuestionCount} />
          </Field>
          <Field>
            <Label htmlFor="realTimeMinutes">Official time (minutes)</Label>
            <Input id="realTimeMinutes" name="realTimeMinutes" type="number" min={1} defaultValue={values.realTimeMinutes} />
          </Field>
          <Field>
            <Label htmlFor="passingScoreText">Passing score (text)</Label>
            <Input id="passingScoreText" name="passingScoreText" defaultValue={values.passingScoreText} placeholder="70%" />
          </Field>
        </div>
      </Section>

      <Section title="Mock exam & freemium">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <Label htmlFor="mockQuestionCount">Mock questions</Label>
            <Input id="mockQuestionCount" name="mockQuestionCount" type="number" min={5} defaultValue={values.mockQuestionCount} />
            <FieldError>{fe.mockQuestionCount}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="mockTimeMinutes">Mock time (minutes)</Label>
            <Input id="mockTimeMinutes" name="mockTimeMinutes" type="number" min={1} defaultValue={values.mockTimeMinutes} />
            <FieldError>{fe.mockTimeMinutes}</FieldError>
          </Field>
          <Field>
            <Label htmlFor="freeQuestionLimit">Free questions per practice set</Label>
            <Input id="freeQuestionLimit" name="freeQuestionLimit" type="number" min={1} defaultValue={values.freeQuestionLimit} />
            <FieldError>{fe.freeQuestionLimit}</FieldError>
          </Field>
        </div>
      </Section>

      <Section title="Content (Markdown)">
        <Field>
          <Label htmlFor="overview">Overview</Label>
          <Textarea id="overview" name="overview" defaultValue={values.overview} rows={10} className="font-mono text-xs" />
        </Field>
        <Field>
          <Label htmlFor="whoShouldTake">Who should take this exam</Label>
          <Textarea id="whoShouldTake" name="whoShouldTake" defaultValue={values.whoShouldTake} rows={5} className="font-mono text-xs" />
        </Field>
        <Field>
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea id="requirements" name="requirements" defaultValue={values.requirements} rows={8} className="font-mono text-xs" />
        </Field>
        <Field>
          <Label htmlFor="studyGuide">Study guide</Label>
          <Textarea id="studyGuide" name="studyGuide" defaultValue={values.studyGuide} rows={12} className="font-mono text-xs" />
        </Field>
        <Field>
          <Label htmlFor="faqJson">FAQ (JSON array of {"{ question, answer }"})</Label>
          <Textarea id="faqJson" name="faqJson" defaultValue={values.faqJson} rows={6} className="font-mono text-xs" />
          <FieldError>{fe.faqJson}</FieldError>
        </Field>
        <Field>
          <Label htmlFor="resourcesJson">Official resources (JSON array of {"{ label, url, description? }"})</Label>
          <Textarea id="resourcesJson" name="resourcesJson" defaultValue={values.resourcesJson} rows={5} className="font-mono text-xs" />
          <FieldError>{fe.resourcesJson}</FieldError>
        </Field>
      </Section>

      <Section title="SEO">
        <Field>
          <Label htmlFor="seoTitle">SEO title (≤ 70 chars)</Label>
          <Input id="seoTitle" name="seoTitle" defaultValue={values.seoTitle} maxLength={70} />
          <FieldError>{fe.seoTitle}</FieldError>
        </Field>
        <Field>
          <Label htmlFor="seoDescription">SEO description (≤ 170 chars)</Label>
          <Textarea id="seoDescription" name="seoDescription" defaultValue={values.seoDescription} maxLength={170} rows={3} />
          <FieldError>{fe.seoDescription}</FieldError>
        </Field>
      </Section>

      <div className="sticky bottom-0 -mx-4 flex justify-end gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : examId ? "Save exam" : "Create exam"}
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h2 className="mb-4 font-semibold text-navy">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
