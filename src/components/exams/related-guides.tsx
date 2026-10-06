import Link from "next/link";
import { getExamGuides } from "@/content/exam-guides";

export function RelatedGuides({ examSlug }: { examSlug: string }) {
  const guides = getExamGuides(examSlug);
  if (guides.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Study guides</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/exams/${examSlug}/guides/${guide.slug}`} className="font-medium text-zinc-800 hover:text-brand">
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
