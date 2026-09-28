import { requireUser } from "@/lib/auth/guards";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const user = await requireUser("/dashboard");
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <DashboardNav name={user.name} email={user.email} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
