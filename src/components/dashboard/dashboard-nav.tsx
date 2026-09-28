"use client";

import { Bookmark, History, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/history", label: "Test history", icon: History },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/profile", label: "Profile & settings", icon: Settings },
] as const;

export function DashboardNav({ name, email }: { name: string | null; email: string }) {
  const pathname = usePathname();
  return (
    <aside>
      <div className="hidden lg:block">
        <p className="truncate font-semibold text-navy">{name ?? "Your account"}</p>
        <p className="truncate text-xs text-zinc-500">{email}</p>
      </div>
      <nav aria-label="Dashboard" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:mt-6 lg:px-0">
        <ul className="flex gap-1 lg:flex-col">
          {ITEMS.map((item) => {
            const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium",
                    active ? "bg-brand-soft text-brand" : "text-zinc-600 hover:bg-zinc-100 hover:text-navy",
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
