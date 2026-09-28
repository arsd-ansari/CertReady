"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  forgotPasswordAction,
  loginAction,
  registerAction,
  resetPasswordAction,
  type FormState,
} from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Label } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";

const initial: FormState = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);
  return (
    <form action={action} className="grid gap-4" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} />
        <FieldError>{state.fieldErrors?.email}</FieldError>
      </Field>
      <Field>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-xs font-medium text-brand hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input id="password" name="password" type="password" autoComplete="current-password" required aria-invalid={Boolean(state.fieldErrors?.password)} />
        <FieldError>{state.fieldErrors?.password}</FieldError>
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Signing in…" : "Log in"}
      </Button>
    </form>
  );
}

export function RegisterForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(registerAction, initial);
  return (
    <form action={action} className="grid gap-4" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(state.fieldErrors?.name)} />
        <FieldError>{state.fieldErrors?.name}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} />
        <FieldError>{state.fieldErrors?.email}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required aria-invalid={Boolean(state.fieldErrors?.password)} />
        <FieldError>{state.fieldErrors?.password}</FieldError>
        <p className="text-xs text-zinc-500">At least 8 characters.</p>
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Creating account…" : "Create free account"}
      </Button>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, initial);
  if (state.success) return <Alert tone="success">{state.success}</Alert>;
  return (
    <form action={action} className="grid gap-4" noValidate>
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} />
        <FieldError>{state.fieldErrors?.email}</FieldError>
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, initial);
  return (
    <form action={action} className="grid gap-4" noValidate>
      <input type="hidden" name="token" value={token} />
      {state.error && <Alert tone="danger">{state.error}</Alert>}
      <Field>
        <Label htmlFor="password">New password</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required aria-invalid={Boolean(state.fieldErrors?.password)} />
        <FieldError>{state.fieldErrors?.password}</FieldError>
      </Field>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Updating…" : "Set new password"}
      </Button>
    </form>
  );
}
