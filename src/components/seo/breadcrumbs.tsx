import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbJsonLd } from "./json-ld";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <BreadcrumbJsonLd items={all} />
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {last ? (
                  <span className="text-zinc-800" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-navy">
                    {item.name}
                  </Link>
                )}
                {!last && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
