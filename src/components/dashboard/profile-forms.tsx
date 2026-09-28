"use client";

import { useActionState } from "react";
import { changePasswordAction, updateProfileAction, type FormState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Label, NativeSelect } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";

const initial: FormState = {};

export function ProfileForm({
  defaults,
  exams,
}: {
  defaults: { name: string; email: string; targetExamId: string; examDate: string };
  exams: { id: string; title: string }[];
}) {
  const [state, action, pending] = useActionState(updateProfileAction, initial);
  return (
    <form action={action} className="grid gap-4 sm:max-w-lg" noValidate>
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={defaults.name} required aria-invalid={Boolean(state.fieldErrors?.name)} />
        <FieldError>{state.fieldErrors?.name}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={defaults.email} disabled />
        <p className="text-xs text-zinc-500">Contact support to change your email.</p>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <Label htmlFor="targetExamId">Target certification</Label>
          <NativeSelect id="targetExamId" name="targetExamId" defaultValue={defaults.targetExamId}>
            <option value="">None selected</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </NativeSelect>
          <FieldError>{state.fieldErrors?.targetExamId}</FieldError>
        </Field>
        <Field>
          <Label htmlFor="examDate">Exam date</Label>
          <Input id="examDate" name="examDate" type="date" defaultValue={defaults.examDate} />
          <FieldError>{state.fieldErrors?.examDate}</FieldError>
        </Field>
      </div>
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, initial);
  return (
    <form action={action} className="grid gap-4 sm:max-w-lg" noValidate>
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}
      <Field>
        <Label htmlFor="currentPassword">Current password</Label>
        <Input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required aria-invalid={Boolean(state.fieldErrors?.currentPassword)} />
        <FieldError>{state.fieldErrors?.currentPassword}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="newPassword">New password</Label>
        <Input id="newPassword" name="newPassword" type="password" autoComplete="new-password" minLength={8} required aria-invalid={Boolean(state.fieldErrors?.newPassword)} />
        <FieldError>{state.fieldErrors?.newPassword}</FieldError>
      </Field>
      <Button type="submit" variant="secondary" disabled={pending} className="justify-self-start">
        {pending ? "Updating…" : "Change password"}
      </Button>
    </form>
  );
}
