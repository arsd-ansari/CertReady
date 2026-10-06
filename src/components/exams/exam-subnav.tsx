import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { segment: "", label: "Overview" },
  { segment: "practice-test", label: "Practice test" },
  { segment: "study-guide", label: "Study guide" },
  { segment: "requirements", label: "Requirements" },
  { segment: "faq", label: "FAQ" },
  { segment: "guides", label: "Guides" },
] as const;

export type ExamTab = (typeof TABS)[number]["segment"];

export function ExamSubnav({
  slug,
  active,
  showGuides = false,
}: {
  slug: string;
  active: ExamTab;
  showGuides?: boolean;
}) {
  const tabs = TABS.filter((tab) => tab.segment !== "guides" || showGuides);
  return (
    <nav aria-label="Exam sections" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1 border-b border-border">
        {tabs.map((tab) => {
          const href = tab.segment ? `/exams/${slug}/${tab.segment}` : `/exams/${slug}`;
          const isActive = tab.segment === active;
          return (
            <li key={tab.segment}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "-mb-px block whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium",
                  isActive ? "border-brand text-brand" : "border-transparent text-zinc-600 hover:text-navy",
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
