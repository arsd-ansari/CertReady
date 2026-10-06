import { BarChart3, BookOpenCheck, CheckCircle2, ClipboardList, Search, Target, Timer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ExamCard } from "@/components/exams/exam-card";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getPlatformStats, listCertificationCategories, listFeaturedExams } from "@/lib/content/exams";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Free Practice Tests for Trade & Professional Certifications`,
  description:
    "Free practice questions, timed mock exams and progress tracking for EPA 608, water and wastewater operator, and other professional certification exams.",
  alternates: { canonical: "/" },
};

const HOME_FAQ = [
  {
    question: "Is CertReady free?",
    answer:
      "Yes. Every exam has a free practice tier with explanations and mock exams. A premium tier with the full question bank and deeper analytics is planned; nothing is charged today.",
  },
  {
    question: "Are these the actual exam questions?",
    answer:
      "No. All questions are original practice material written to mirror the topics and difficulty of the official exams. CertReady is not affiliated with any certifying organization.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You can practice a limited set of questions without an account. A free account saves your progress, bookmarks, test history and weak-topic analysis across devices.",
  },
  {
    question: "Which exams are available?",
    answer:
      "EPA 608 (Core, Type I, II and III) and Grade 1 water treatment, wastewater treatment and collection system operator exams, with more skilled-trade certifications being added.",
  },
];

export default async function HomePage() {
  const [featured, categories, stats] = await Promise.all([
    listFeaturedExams(3),
    listCertificationCategories(),
    getPlatformStats(),
  ]);

  return (
    <>
      <FaqJsonLd items={HOME_FAQ} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">{site.tagline}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
              Prepare With Confidence. <span className="text-brand">Get CertReady.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-zinc-600">
              Realistic practice questions, timed mock exams and clear explanations for the certification exams that
              get you hired — starting with EPA 608 and water operator licensing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/exams">Explore Exams</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/practice/epa-608">Start Practicing</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Free to start, no card required</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Explanation for every answer</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Works on your phone</li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            <HeroStat value={stats.exams} label="exams" />
            <HeroStat value={stats.questions} label="practice questions" />
            <HeroStat value={stats.categories} label="certification areas" />
          </div>
        </div>
      </section>

      {/* Popular exams */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">Popular exams</h2>
            <p className="mt-2 text-zinc-600">Start with the exams most technicians and operators are preparing for.</p>
          </div>
          <Link href="/exams" className="hidden text-sm font-medium text-brand hover:underline sm:block">
            View all exams →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
        <Link href="/exams" className="mt-6 block text-sm font-medium text-brand hover:underline sm:hidden">
          View all exams →
        </Link>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">EPA 608 study guides</h2>
        <p className="mt-2 max-w-2xl text-zinc-600">
          The pages technicians search before they book: which type to take, the 72% passing score, and who actually needs the card.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <GuideLink
            href="/exams/epa-608/guides/type-1-vs-type-2"
            title="Type 1 vs Type 2 vs Type 3"
            text="Small appliances, splits and chillers are three different cards. Universal is all three plus Core."
          />
          <GuideLink
            href="/exams/epa-608/guides/passing-score"
            title="Passing score: 72%"
            text="18 of 25 on each section — not an overall average. Fail Core and you take home nothing."
          />
          <GuideLink
            href="/exams/epa-608/guides/who-needs-certification"
            title="Who needs EPA 608"
            text="If you open a refrigerant circuit or buy cylinders, you need 608. Cars are 609."
          />
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">Browse by certification area</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const count = cat._count.exams;
              return (
                <Link
                  key={cat.id}
                  href={`/exams?category=${cat.slug}`}
                  className="rounded-xl border border-border p-5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"
                >
                  <p className="font-semibold text-navy">{cat.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">{cat.description}</p>
                  <p className="mt-3 text-xs font-medium text-zinc-500">
                    {count > 0 ? `${count} exam${count === 1 ? "" : "s"} available` : "Coming soon"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          <Step n={1} icon={Search} title="Choose your exam" text="Pick the certification you're sitting for and see exactly which topics it covers and how they're weighted." />
          <Step n={2} icon={ClipboardList} title="Practice by topic" text="Answer questions in quick sets or drill one category. Every answer shows why it's right and where the rule comes from." />
          <Step n={3} icon={Target} title="Take a mock, fix weak spots" text="Sit a timed mock exam, then let your dashboard point you at the categories that are costing you points." />
        </ol>
      </section>

      {/* Why CertReady */}
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why technicians choose CertReady</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Why icon={BookOpenCheck} title="Written for the real test" text="Questions target the numbers, dates and traps that actually appear — not filler." />
            <Why icon={Timer} title="Timed like the real thing" text="Mock exams match the section length and pacing of the official exam." />
            <Why icon={BarChart3} title="Know where you stand" text="Category-level scores and streaks show whether you're ready to book the exam." />
            <Why icon={CheckCircle2} title="Honest and independent" text="Original material, clear sourcing, and no claims of official affiliation." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">Frequently asked questions</h2>
        <dl className="mt-8 divide-y divide-border rounded-xl border border-border bg-white">
          {HOME_FAQ.map((item) => (
            <div key={item.question} className="p-5">
              <dt className="font-medium text-zinc-900">{item.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-zinc-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-brand to-teal px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to pass on the first try?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Create a free account to save your progress, bookmark tricky questions and track your weak categories.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">Create free account</Link>
            </Button>
            <Button asChild size="lg" variant="navy">
              <Link href="/exams">Explore exams</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 text-center sm:p-6">
      <p className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{value.toLocaleString()}</p>
      <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{label}</p>
    </div>
  );
}

function Step({ n, icon: Icon, title, text }: { n: number; icon: typeof Search; title: string; text: string }) {
  return (
    <li className="rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">{n}</span>
        <Icon className="h-5 w-5 text-navy" aria-hidden />
      </div>
      <h3 className="mt-4 font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
    </li>
  );
}

function GuideLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-brand/40">
      <h3 className="font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
      <p className="mt-3 text-xs font-medium text-brand">Read guide →</p>
    </Link>
  );
}

function Why({ icon: Icon, title, text }: { icon: typeof Search; title: string; text: string }) {
  return (
    <div>
      <Icon className="h-6 w-6 text-teal" aria-hidden />
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/75">{text}</p>
    </div>
  );
}
