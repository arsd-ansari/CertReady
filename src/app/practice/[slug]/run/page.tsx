import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PracticeRunner } from "@/components/practice/practice-runner";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/misc";
import { getBookmarkedIds, startPractice } from "@/lib/engine/practice-actions";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Practice session" };

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PracticeRunPage({ params, searchParams }: PageProps<"/practice/[slug]/run">) {
  const { slug } = await params;
  const sp = await searchParams;
  const modeRaw = first(sp.mode);
  const mode = modeRaw === "CATEGORY" || modeRaw === "RANDOM" ? modeRaw : "QUICK";
  const difficultyRaw = first(sp.difficulty);
  const difficulty = difficultyRaw === "EASY" || difficultyRaw === "MEDIUM" || difficultyRaw === "HARD" ? difficultyRaw : null;
  const countRaw = Number(first(sp.count) ?? 10);
  const count = Number.isFinite(countRaw) && countRaw > 0 ? Math.min(countRaw, 50) : 10;

  const result = await startPractice({
    examSlug: slug,
    mode,
    categorySlug: mode === "CATEGORY" ? first(sp.category) ?? null : null,
    difficulty,
    count,
  });

  if (!result.ok) {
    if (result.error === "Exam not found.") notFound();
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <Alert tone="warning" title="Couldn't start that practice set">
          {result.error}
        </Alert>
        <Button asChild variant="secondary" className="mt-6">
          <Link href={`/practice/${slug}`}>Back to practice options</Link>
        </Button>
      </div>
    );
  }

  const bookmarked = await getBookmarkedIds(result.questions.map((q) => q.id));

  return <PracticeRunner start={result} initialBookmarks={bookmarked} />;
}
