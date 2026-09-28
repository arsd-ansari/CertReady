import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Label, NativeSelect } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/misc";
import { getCurrentUser } from "@/lib/auth/session";
import { getPublishedExamBySlug } from "@/lib/content/exams";
import { getEntitlement, hasPremiumFor, PREMIUM_MAX_QUESTIONS } from "@/lib/entitlements";

export async function generateMetadata({ params }: PageProps<"/practice/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return {
    title: `Practice ${exam.shortTitle} Questions`,
    description: `Choose quick, by-topic or random practice for the ${exam.title} exam.`,
    robots: { index: false, follow: true },
  };
}

export default async function PracticeSetupPage({ params }: PageProps<"/practice/[slug]">) {
  const { slug } = await params;
  const [exam, user] = await Promise.all([getPublishedExamBySlug(slug), getCurrentUser()]);
  if (!exam) notFound();

  const entitlement = await getEntitlement(user?.id ?? null);
  const isPremium = hasPremiumFor(entitlement, exam.id);
  const cap = isPremium ? PREMIUM_MAX_QUESTIONS : exam.freeQuestionLimit;
  const counts = [5, 10, 15, 20, 25, 30, 40, 50].filter((n) => n <= cap);
  if (!counts.includes(cap)) counts.push(cap);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Exams", href: "/exams" },
          { name: exam.shortTitle, href: `/exams/${exam.slug}` },
          { name: "Practice", href: `/practice/${exam.slug}` },
        ]}
      />
      <div className="mt-4">
        <PageHeader
          eyebrow={exam.title}
          title="Practice questions"
          description="Untimed. Every answer shows the correct choice, an explanation and the source. Your progress is saved when you're signed in."
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Quick practice</h2>
          <p className="mt-1 text-sm text-zinc-600">10 mixed questions from every section. The fastest way to warm up.</p>
          <Button asChild className="mt-4">
            <Link href={`/practice/${exam.slug}/run?mode=QUICK&count=${Math.min(10, cap)}`}>Start quick set</Link>
          </Button>
        </section>

        <section className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Random practice</h2>
          <form action={`/practice/${exam.slug}/run`} method="get" className="mt-3 grid gap-3">
            <input type="hidden" name="mode" value="RANDOM" />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="count">Questions</Label>
                <NativeSelect id="count" name="count" defaultValue={String(Math.min(10, cap))}>
                  {counts.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </NativeSelect>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="difficulty">Difficulty</Label>
                <NativeSelect id="difficulty" name="difficulty" defaultValue="">
                  <option value="">Any</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </NativeSelect>
              </div>
            </div>
            <Button type="submit" variant="secondary">
              Start random set
            </Button>
          </form>
        </section>
      </div>

      <section id="topics" className="mt-8">
        <h2 className="text-lg font-semibold text-navy">Practice by topic</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {exam.categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/practice/${exam.slug}/run?mode=CATEGORY&category=${cat.slug}&count=${Math.min(10, cap)}`}
                className="flex h-full items-center justify-between gap-3 rounded-xl border border-border bg-white p-4 hover:border-brand/40"
              >
                <div>
                  <p className="font-medium text-navy">{cat.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {cat._count.questions} questions · {cat.weight}% of exam
                  </p>
                </div>
                <span className="text-sm font-medium text-brand">Start →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {!isPremium && (
        <p className="mt-8 text-xs leading-5 text-zinc-500">
          Free practice draws from {exam.freeQuestionCount} free questions in sets of up to {exam.freeQuestionLimit}.
          {!user && " Create a free account to save progress and bookmarks."}
        </p>
      )}
    </div>
  );
}
