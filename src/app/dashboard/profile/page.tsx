import type { Metadata } from "next";
import { ChangePasswordForm, ProfileForm } from "@/components/dashboard/profile-forms";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { getEntitlement } from "@/lib/entitlements";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Profile & settings", robots: { index: false } };

export default async function ProfilePage() {
  const user = await requireUser("/dashboard/profile");
  const [exams, entitlement] = await Promise.all([
    db.exam.findMany({ where: { status: "PUBLISHED" }, orderBy: { title: "asc" }, select: { id: true, title: true } }),
    getEntitlement(user.id),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Profile & settings</h1>
        <p className="mt-1 text-sm text-zinc-600">Member since {formatDate(user.createdAt)}.</p>
      </div>

      <section className="rounded-xl border border-border bg-white p-6">
        <h2 className="font-semibold text-navy">Profile</h2>
        <p className="mt-1 text-sm text-zinc-600">Set a target exam and date to unlock the readiness tracker on your dashboard.</p>
        <div className="mt-5">
          <ProfileForm
            defaults={{
              name: user.name ?? "",
              email: user.email,
              targetExamId: user.targetExamId ?? "",
              examDate: user.examDate ? user.examDate.toISOString().slice(0, 10) : "",
            }}
            exams={exams}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-6">
        <h2 className="font-semibold text-navy">Change password</h2>
        <div className="mt-5">
          <ChangePasswordForm />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-navy">Subscription</h2>
          <Badge variant={entitlement.isPremium ? "success" : "neutral"}>{entitlement.isPremium ? "Premium" : "Free plan"}</Badge>
        </div>
        <p className="mt-2 text-sm text-zinc-600">
          {entitlement.isPremium
            ? "You have premium access. Billing management will appear here."
            : "You're on the free plan. Premium plans with the full question bank, unlimited mocks and advanced analytics are coming soon — no payment is collected today."}
        </p>
      </section>
    </div>
  );
}
