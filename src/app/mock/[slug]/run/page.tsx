import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MockRunner } from "@/components/mock/mock-runner";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/misc";
import { startMock } from "@/lib/engine/mock-actions";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Mock exam in progress" };

export default async function MockRunPage({ params }: PageProps<"/mock/[slug]/run">) {
  const { slug } = await params;
  const result = await startMock(slug);

  if (!result.ok) {
    if (result.reason === "NOT_FOUND") notFound();
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <Alert tone="warning" title={result.reason === "LIMIT_REACHED" ? "Free mock exam limit reached" : "Couldn't start the mock exam"}>
          {result.error}
        </Alert>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="secondary">
            <Link href={`/practice/${slug}`}>Practice by topic</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/exams/${slug}`}>Back to exam</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <MockRunner start={result} />;
}
