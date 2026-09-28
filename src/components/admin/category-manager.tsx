"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteCategoryAction, upsertCategoryAction, type AdminFormState } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Field, FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { Alert } from "@/components/ui/misc";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

export type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  longDescription: string | null;
  weight: number;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  _count: { questions: number };
};

export function CategoryManager({ examId, examSlug, categories }: { examId: string; examSlug: string; categories: CategoryRow[] }) {
  const [editing, setEditing] = useState<CategoryRow | null | "new">(null);
  const [pending, start] = useTransition();
  const totalWeight = categories.reduce((n, c) => n + c.weight, 0);

  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-navy">Sections</h2>
          <p className="text-xs text-zinc-500">
            Each section gets its own SEO landing page at /exams/{examSlug}/&lt;slug&gt;. Weights total {totalWeight}%
            {totalWeight !== 100 && categories.length > 0 && " (aim for 100)"}.
          </p>
        </div>
        <Button size="sm" onClick={() => setEditing("new")}>
          <Plus /> Add section
        </Button>
      </div>

      {categories.length > 0 && (
        <div className="mt-4">
          <Table>
            <THead>
              <TR>
                <TH>Order</TH>
                <TH>Name</TH>
                <TH>Slug</TH>
                <TH>Weight</TH>
                <TH>Questions</TH>
                <TH className="text-right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {categories.map((c) => (
                <TR key={c.id}>
                  <TD>{c.sortOrder}</TD>
                  <TD className="font-medium">{c.name}</TD>
                  <TD className="font-mono text-xs text-zinc-500">{c.slug}</TD>
                  <TD>{c.weight}%</TD>
                  <TD>{c._count.questions}</TD>
                  <TD className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(c)} aria-label={`Edit ${c.name}`}>
                      <Pencil />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={pending || c._count.questions > 0}
                      title={c._count.questions > 0 ? "Move or delete its questions first" : "Delete section"}
                      aria-label={`Delete ${c.name}`}
                      onClick={() =>
                        start(async () => {
                          const res = await deleteCategoryAction(examId, c.id);
                          if (res.ok) toast.success("Section deleted.");
                          else toast.error(res.error);
                        })
                      }
                    >
                      <Trash2 className="text-red-600" />
                    </Button>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      )}

      {editing !== null && (
        <CategoryDialog
          examId={examId}
          category={editing === "new" ? null : editing}
          nextOrder={categories.length}
          onClose={() => setEditing(null)}
        />
      )}
    </section>
  );
}

function CategoryDialog({ examId, category, nextOrder, onClose }: { examId: string; category: CategoryRow | null; nextOrder: number; onClose: () => void }) {
  const action = upsertCategoryAction.bind(null, examId, category?.id ?? null);
  const [state, formAction, pending] = useActionState(action, {} as AdminFormState);
  const fe = state.fieldErrors ?? {};
  // Close on success; the server action already revalidated the page.
  useEffect(() => {
    if (state.success) onClose();
  }, [state.success, onClose]);

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent title={category ? `Edit ${category.name}` : "Add section"} className="max-w-2xl">
        <form action={formAction} className="grid gap-4">
          {state.error && <Alert tone="danger">{state.error}</Alert>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" name="name" defaultValue={category?.name ?? ""} required />
              <FieldError>{fe.name}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="c-slug">Slug</Label>
              <Input id="c-slug" name="slug" defaultValue={category?.slug ?? ""} placeholder="auto from name" />
              <FieldError>{fe.slug}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="c-weight">Weight (% of exam)</Label>
              <Input id="c-weight" name="weight" type="number" min={0} max={100} defaultValue={category?.weight ?? 0} />
              <FieldError>{fe.weight}</FieldError>
            </Field>
            <Field>
              <Label htmlFor="c-order">Sort order</Label>
              <Input id="c-order" name="sortOrder" type="number" min={0} defaultValue={category?.sortOrder ?? nextOrder} />
            </Field>
          </div>
          <Field>
            <Label htmlFor="c-desc">Short description</Label>
            <Textarea id="c-desc" name="description" defaultValue={category?.description ?? ""} rows={2} maxLength={300} />
          </Field>
          <Field>
            <Label htmlFor="c-long">Landing page body (Markdown)</Label>
            <Textarea id="c-long" name="longDescription" defaultValue={category?.longDescription ?? ""} rows={5} className="font-mono text-xs" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="c-seoTitle">SEO title</Label>
              <Input id="c-seoTitle" name="seoTitle" defaultValue={category?.seoTitle ?? ""} maxLength={70} />
            </Field>
            <Field>
              <Label htmlFor="c-seoDesc">SEO description</Label>
              <Input id="c-seoDesc" name="seoDescription" defaultValue={category?.seoDescription ?? ""} maxLength={170} />
            </Field>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
