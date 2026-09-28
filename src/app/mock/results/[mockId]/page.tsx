import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MockResults } from "@/components/mock/mock-results";
import { requireUser } from "@/lib/auth/guards";
import { getStoredMockResult } from "@/lib/engine/mock-results";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Mock exam results" };

export default async function MockResultPage({ params }: PageProps<"/mock/results/[mockId]">) {
  const { mockId } = await params;
  const user = await requireUser(`/mock/results/${mockId}`);
  const result = await getStoredMockResult(mockId, user.id);
  if (!result) notFound();
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <MockResults result={result} isSignedIn />
    </div>
  );
}
