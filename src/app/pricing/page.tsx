import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/misc";
import { FREE_LIMITS } from "@/lib/entitlements";

export const metadata: Metadata = {
  title: "Pricing — Free Practice, Premium Coming Soon",
  description: "CertReady is free to use. See what the free plan includes and what premium will add when it launches.",
  alternates: { canonical: "/pricing" },
};

const ROWS: { feature: string; free: string | boolean; premium: string | boolean }[] = [
  { feature: "Practice questions with explanations", free: "Free question tier", premium: "Full question bank" },
  { feature: "Practice set size", free: "Up to 10 per set", premium: "Up to 50 per set" },
  { feature: "Timed mock exams", free: `${FREE_LIMITS.mockExamsPerExam} per certification`, premium: "Unlimited" },
  { feature: "Category scores and weak-topic tracking", free: true, premium: true },
  { feature: "Bookmarks and test history", free: true, premium: true },
  { feature: "Study streaks and readiness tracker", free: true, premium: true },
  { feature: "Detailed performance analytics", free: false, premium: true },
  { feature: "Ad-free experience", free: false, premium: true },
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} />
      <div className="mt-4">
        <PageHeader title="Simple, honest pricing" description="Everything you need to pass is free today. Premium will add depth for people who want the full question bank and unlimited mocks. No pricing is final until launch and nothing is charged now." />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Free</p>
          <p className="mt-2 text-4xl font-semibold text-navy">$0</p>
          <p className="mt-1 text-sm text-zinc-600">Available now. No credit card.</p>
          <Button asChild className="mt-6 w-full">
            <Link href="/register">Create free account</Link>
          </Button>
        </div>
        <div className="rounded-2xl border-2 border-brand bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Premium</p>
          <p className="mt-2 text-4xl font-semibold text-navy">Coming soon</p>
          <p className="mt-1 text-sm text-zinc-600">Monthly, annual and single-exam options are planned.</p>
          <Button variant="secondary" className="mt-6 w-full" disabled>
            Not yet available
          </Button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Feature</th>
              <th className="px-4 py-3 font-semibold">Free</th>
              <th className="px-4 py-3 font-semibold">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROWS.map((row) => (
              <tr key={row.feature}>
                <td className="px-4 py-3 text-zinc-800">{row.feature}</td>
                <td className="px-4 py-3"><Cell value={row.free} /></td>
                <td className="px-4 py-3"><Cell value={row.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 text-success" aria-label="Included" />;
  if (value === false) return <Minus className="h-4 w-4 text-zinc-300" aria-label="Not included" />;
  return <span className="text-zinc-700">{value}</span>;
}
