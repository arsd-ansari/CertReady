"use client";

import { BarChart3, BookOpen, Flag, Library, Tags, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Analytics", icon: BarChart3 },
  { href: "/admin/exams", label: "Exams & questions", icon: BookOpen },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/sources", label: "Sources", icon: Library },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: Flag },
] as const;

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside>
      <p className="hidden text-xs font-semibold uppercase tracking-wide text-zinc-500 lg:block">Admin</p>
      <nav aria-label="Admin" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:mt-3 lg:px-0">
        <ul className="flex gap-1 lg:flex-col">
          {ITEMS.map((item) => {
            const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium",
                    active ? "bg-navy text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-navy",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
