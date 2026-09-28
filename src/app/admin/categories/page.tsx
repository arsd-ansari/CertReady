import { CertificationCategoryForm } from "@/components/admin/simple-forms";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { db } from "@/lib/db";

export const metadata = { title: "Certification categories" };

export default async function AdminCategoriesPage() {
  const categories = await db.certificationCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { exams: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Certification categories</h1>
        <p className="mt-1 text-sm text-zinc-600">Top-level groups shown on the homepage and used as the exam directory filter.</p>
      </div>
      <Table>
        <THead>
          <TR>
            <TH>Order</TH>
            <TH>Name</TH>
            <TH>Slug</TH>
            <TH>Exams</TH>
          </TR>
        </THead>
        <TBody>
          {categories.map((c) => (
            <TR key={c.id}>
              <TD>{c.sortOrder}</TD>
              <TD>
                <span className="font-medium">{c.name}</span>
                {c.description && <span className="block text-xs text-zinc-500">{c.description}</span>}
              </TD>
              <TD className="font-mono text-xs text-zinc-500">{c.slug}</TD>
              <TD>{c._count.exams}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 font-semibold text-navy">Add category</h2>
        <CertificationCategoryForm />
      </section>
    </div>
  );
}
