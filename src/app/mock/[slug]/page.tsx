import { Clock, ListChecks, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Alert, PageHeader } from "@/components/ui/misc";
import { getCurrentUser } from "@/lib/auth/session";
import { getPublishedExamBySlug } from "@/lib/content/exams";
import { db } from "@/lib/db";
import { FREE_LIMITS, getEntitlement, hasPremiumFor } from "@/lib/entitlements";

export async function generateMetadata({ params }: PageProps<"/mock/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return {
    title: `${exam.shortTitle} Mock Exam`,
    description: `Timed ${exam.title} mock exam: ${exam.mockQuestionCount} questions in ${exam.mockTimeMinutes} minutes with a category breakdown.`,
    robots: { index: false, follow: true },
  };
}

export default async function MockIntroPage({ params }: PageProps<"/mock/[slug]">) {
  const { slug } = await params;
  const [exam, user] = await Promise.all([getPublishedExamBySlug(slug), getCurrentUser()]);
  if (!exam) notFound();

  const entitlement = await getEntitlement(user?.id ?? null);
  const isPremium = hasPremiumFor(entitlement, exam.id);
  const completed = user ? await db.mockExam.count({ where: { userId: user.id, examId: exam.id, status: "COMPLETED" } }) : 0;
  const remaining = isPremium ? null : Math.max(0, FREE_LIMITS.mockExamsPerExam - completed);
  const questionCount = user ? exam.mockQuestionCount : Math.min(exam.mockQuestionCount, FREE_LIMITS.guestMockQuestions);
  const minutes = Math.max(1, Math.round((exam.mockTimeMinutes * questionCount) / exam.mockQuestionCount));

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Exams", href: "/exams" },
          { name: exam.shortTitle, href: `/exams/${exam.slug}` },
          { name: "Mock exam", href: `/mock/${exam.slug}` },
        ]}
      />
      <div className="mt-4">
        <PageHeader eyebrow={exam.title} title="Timed mock exam" description="Simulates the real exam: no feedback until you submit, a running clock, and a full review with category scores at the end." />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Fact icon={ListChecks} label="Questions" value={String(questionCount)} />
        <Fact icon={Clock} label="Time limit" value={`${minutes} min`} />
        <Fact icon={Target} label="Target score" value={exam.passingScoreText ?? "70%+"} />
      </div>

      <ul className="mt-8 space-y-2 text-sm text-zinc-700">
        <li>• Questions are weighted across sections the way the real exam is.</li>
        <li>• You can flag questions and move back and forth before submitting.</li>
        <li>• The exam auto-submits when the timer reaches zero.</li>
        {user ? <li>• Your result is saved to your dashboard and test history.</li> : <li>• Results are shown once and not saved unless you have an account.</li>}
      </ul>

      {remaining !== null && user && remaining === 0 ? (
        <Alert tone="warning" className="mt-8" title="Free mock exam limit reached">
          Free accounts include {FREE_LIMITS.mockExamsPerExam} completed mock exams per certification. Premium plans with unlimited
          mocks are coming soon; in the meantime you can keep practicing by topic.
        </Alert>
      ) : (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href={`/mock/${exam.slug}/run`}>Begin mock exam</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href={`/practice/${exam.slug}`}>Practice instead</Link>
          </Button>
          {remaining !== null && user && (
            <span className="text-xs text-zinc-500">
              {remaining} of {FREE_LIMITS.mockExamsPerExam} free mock{remaining === 1 ? "" : "s"} remaining
            </span>
          )}
        </div>
      )}

      {!user && (
        <p className="mt-6 text-xs leading-5 text-zinc-500">
          You&apos;re taking a {questionCount}-question sample as a guest.{" "}
          <Link href={`/register?next=/mock/${exam.slug}`} className="font-medium text-brand underline">
            Create a free account
          </Link>{" "}
          for the full {exam.mockQuestionCount}-question mock and saved results.
        </p>
      )}
    </div>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
      <Icon className="h-5 w-5 text-brand" aria-hidden />
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="font-semibold text-navy">{value}</p>
      </div>
    </div>
  );
}
