import { SourceForm } from "@/components/admin/simple-forms";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listSources } from "@/lib/admin/queries";

export const metadata = { title: "Source references" };

export default async function AdminSourcesPage() {
  const sources = await listSources();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Source references</h1>
        <p className="mt-1 text-sm text-zinc-600">Official documents questions can cite. Shown to learners after they answer.</p>
      </div>
      <Table>
        <THead>
          <TR>
            <TH>Title</TH>
            <TH>Publisher</TH>
            <TH>URL</TH>
            <TH>Questions</TH>
          </TR>
        </THead>
        <TBody>
          {sources.map((s) => (
            <TR key={s.id}>
              <TD className="font-medium">{s.title}</TD>
              <TD className="text-zinc-600">{s.publisher ?? "—"}</TD>
              <TD className="max-w-xs truncate text-xs">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                    {s.url}
                  </a>
                ) : (
                  "—"
                )}
              </TD>
              <TD>{s._count.questions}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 font-semibold text-navy">Add source</h2>
        <SourceForm />
      </section>
    </div>
  );
}
