import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listAdminUsers } from "@/lib/admin/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Users" };

export default async function AdminUsersPage({ searchParams }: PageProps<"/admin/users">) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim() || undefined;
  const page = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1;
  const { users, total, pages } = await listAdminUsers(q, page);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Users</h1>
        <p className="mt-1 text-sm text-zinc-600">{total} account{total === 1 ? "" : "s"}</p>
      </div>
      <form method="get" className="flex gap-2">
        <Input type="search" name="q" defaultValue={q ?? ""} placeholder="Search by email or name…" aria-label="Search users" className="max-w-sm" />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>
      <Table>
        <THead>
          <TR>
            <TH>User</TH>
            <TH>Role</TH>
            <TH>Status</TH>
            <TH>Activity</TH>
            <TH>Joined</TH>
            <TH>Last login</TH>
          </TR>
        </THead>
        <TBody>
          {users.map((u) => (
            <TR key={u.id}>
              <TD>
                <Link href={`/admin/users/${u.id}`} className="font-medium text-zinc-900 hover:text-brand">
                  {u.name ?? "—"}
                </Link>
                <span className="block text-xs text-zinc-500">{u.email}</span>
              </TD>
              <TD>
                <Badge variant={u.role === "ADMIN" ? "navy" : "neutral"}>{u.role.toLowerCase()}</Badge>
              </TD>
              <TD>
                <Badge variant={u.status === "ACTIVE" ? "success" : "danger"}>{u.status.toLowerCase()}</Badge>
              </TD>
              <TD className="text-zinc-600">
                {u._count.practiceSessions} sessions · {u._count.mockExams} mocks
              </TD>
              <TD className="text-zinc-600">{formatDate(u.createdAt)}</TD>
              <TD className="text-zinc-600">{u.lastLoginAt ? formatDate(u.lastLoginAt) : "—"}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      {pages > 1 && (
        <div className="flex justify-end gap-2 text-sm">
          {page > 1 && (
            <Button asChild size="sm" variant="secondary">
              <Link href={`?${new URLSearchParams({ ...(q ? { q } : {}), page: String(page - 1) })}`}>Previous</Link>
            </Button>
          )}
          {page < pages && (
            <Button asChild size="sm" variant="secondary">
              <Link href={`?${new URLSearchParams({ ...(q ? { q } : {}), page: String(page + 1) })}`}>Next</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
