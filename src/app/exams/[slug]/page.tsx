import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamCategoriesCard, ExamFactsCard, ExamPageShell, OfficialResourcesCard } from "@/components/exams/exam-page-shell";
import { Markdown } from "@/components/markdown";
import { CourseJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { ExamViewTracker } from "@/components/analytics/exam-view-tracker";
import { examMetadata } from "@/lib/content/metadata";
import { getPublishedExamBySlug } from "@/lib/content/exams";

export async function generateMetadata({ params }: PageProps<"/exams/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) return {};
  return examMetadata(exam);
}

export default async function ExamPage({ params }: PageProps<"/exams/[slug]">) {
  const { slug } = await params;
  const exam = await getPublishedExamBySlug(slug);
  if (!exam) notFound();

  return (
    <ExamPageShell
      exam={exam}
      tab=""
      crumbs={[{ name: exam.shortTitle, href: `/exams/${exam.slug}` }]}
      title={`${exam.title} Practice Test`}
      intro={exam.summary}
      aside={
        <>
          <ExamFactsCard exam={exam} />
          <ExamCategoriesCard exam={exam} />
          <OfficialResourcesCard exam={exam} />
        </>
      }
    >
      <ExamViewTracker examId={exam.id} slug={exam.slug} />
      <CourseJsonLd name={`${exam.title} exam prep`} description={exam.summary} href={`/exams/${exam.slug}`} />
      <FaqJsonLd items={exam.faqItems} />

      <Markdown content={exam.overview} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-navy">Who should take this exam</h2>
        <Markdown content={exam.whoShouldTake} className="mt-2" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-navy">What&apos;s on the exam</h2>
        <p className="mt-2 text-sm text-zinc-600">Practice each section separately or mix them in a mock exam.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {exam.categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/exams/${exam.slug}/${cat.slug}`}
                className="block h-full rounded-xl border border-border bg-white p-4 transition-colors hover:border-brand/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-navy">{cat.name}</p>
                  <span className="shrink-0 text-xs text-zinc-500">{cat.weight}% of exam</span>
                </div>
                <p className="mt-1 text-sm text-zinc-600">{cat.description}</p>
                <p className="mt-3 text-xs font-medium text-brand">{cat._count.questions} practice questions →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Practice questions</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Untimed sets with instant feedback and an explanation for every answer. Choose quick, by-topic or random.
          </p>
          <Button asChild className="mt-4">
            <Link href={`/practice/${exam.slug}`}>Start practice</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <h2 className="font-semibold text-navy">Mock exams</h2>
          <p className="mt-1 text-sm text-zinc-600">
            {exam.mockQuestionCount} questions in {exam.mockTimeMinutes} minutes, weighted like the real exam, with a
            category breakdown at the end.
          </p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href={`/mock/${exam.slug}`}>Start mock exam</Link>
          </Button>
        </div>
      </section>

      {exam.faqItems.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-navy">Frequently asked questions</h2>
          <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {exam.faqItems.slice(0, 4).map((item) => (
              <div key={item.question} className="p-4">
                <dt className="font-medium text-zinc-900">{item.question}</dt>
                <dd className="mt-1 text-sm leading-6 text-zinc-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
          {exam.faqItems.length > 4 && (
            <Link href={`/exams/${exam.slug}/faq`} className="mt-3 inline-block text-sm font-medium text-brand hover:underline">
              All {exam.faqItems.length} questions →
            </Link>
          )}
        </section>
      )}

      <p className="mt-10 text-xs leading-5 text-zinc-500">
        All questions on CertReady are original practice material. They are not actual exam questions, and CertReady is
        not affiliated with or endorsed by {exam.certifyingBody.split(" (")[0]}.
      </p>
    </ExamPageShell>
  );
}
