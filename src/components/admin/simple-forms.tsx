"use client";

import { useActionState } from "react";
import { createCertificationCategoryAction, createSourceAction, type AdminFormState } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Label } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";

const initial: AdminFormState = {};

export function CertificationCategoryForm() {
  const [state, action, pending] = useActionState(createCertificationCategoryAction, initial);
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-4">
      {state.error && <Alert tone="danger" className="sm:col-span-4">{state.error}</Alert>}
      {state.success && <Alert tone="success" className="sm:col-span-4">{state.success}</Alert>}
      <Field>
        <Label htmlFor="cc-name">Name</Label>
        <Input id="cc-name" name="name" required />
        <FieldError>{fe.name}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="cc-slug">Slug</Label>
        <Input id="cc-slug" name="slug" placeholder="auto" />
        <FieldError>{fe.slug}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="cc-desc">Description</Label>
        <Input id="cc-desc" name="description" />
      </Field>
      <Field>
        <Label htmlFor="cc-order">Sort order</Label>
        <Input id="cc-order" name="sortOrder" type="number" min={0} defaultValue={99} />
      </Field>
      <Button type="submit" disabled={pending} className="justify-self-start sm:col-span-4">
        Add category
      </Button>
    </form>
  );
}

export function SourceForm() {
  const [state, action, pending] = useActionState(createSourceAction, initial);
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      {state.error && <Alert tone="danger" className="sm:col-span-2">{state.error}</Alert>}
      {state.success && <Alert tone="success" className="sm:col-span-2">{state.success}</Alert>}
      <Field>
        <Label htmlFor="s-title">Title</Label>
        <Input id="s-title" name="title" required />
        <FieldError>{fe.title}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="s-publisher">Publisher</Label>
        <Input id="s-publisher" name="publisher" />
      </Field>
      <Field>
        <Label htmlFor="s-url">URL</Label>
        <Input id="s-url" name="url" type="url" />
        <FieldError>{fe.url}</FieldError>
      </Field>
      <Field>
        <Label htmlFor="s-notes">Notes</Label>
        <Input id="s-notes" name="notes" />
      </Field>
      <Button type="submit" disabled={pending} className="justify-self-start sm:col-span-2">
        Add source
      </Button>
    </form>
  );
}
