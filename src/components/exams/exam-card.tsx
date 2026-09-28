import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ExamCard as ExamCardData } from "@/lib/content/exams";
import { Badge } from "@/components/ui/badge";

const DIFFICULTY_LABEL = { EASY: "Beginner", MEDIUM: "Intermediate", HARD: "Advanced" } as const;
const SCOPE_LABEL = { FEDERAL: "Federal", STATE: "State", NATIONAL_PRIVATE: "National" } as const;

export function ExamCard({ exam }: { exam: ExamCardData }) {
  const scope =
    exam.scope === "STATE" && exam.states.length > 0
      ? exam.states.length > 3
        ? `${exam.states.length} states`
        : exam.states.join(", ")
      : SCOPE_LABEL[exam.scope];
  const premiumCount = exam._count.questions - exam.freeQuestionCount;

  return (
    <Link
      href={`/exams/${exam.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:border-brand/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="neutral">{exam.category.name}</Badge>
        <Badge variant="outline">{scope}</Badge>
        {exam.isFeatured && <Badge variant="success">Popular</Badge>}
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-navy group-hover:text-brand">{exam.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-zinc-600">{exam.summary}</p>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-xs text-zinc-500">
        <div>
          <dt className="sr-only">Questions</dt>
          <dd>
            <span className="block text-base font-semibold text-zinc-900">{exam._count.questions}</span>
            {exam._count.questions === 1 ? "question" : "questions"}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Mock exams</dt>
          <dd>
            <span className="block text-base font-semibold text-zinc-900">{exam._count.categories}</span>
            {exam._count.categories === 1 ? "topic" : "topics"}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Difficulty</dt>
          <dd>
            <span className="block text-base font-semibold text-zinc-900">{DIFFICULTY_LABEL[exam.difficulty]}</span>
            difficulty
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-zinc-600">
          <span className="font-medium text-[#15803d]">{exam.freeQuestionCount} free</span>
          {premiumCount > 0 && <span className="text-zinc-500"> · {premiumCount} premium</span>}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-brand">
          Start <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
