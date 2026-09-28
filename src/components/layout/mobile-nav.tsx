"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  links: { href: string; label: string }[];
  user: { name: string | null; email: string; isAdmin: boolean } | null;
};

export function MobileNav({ links, user }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Menu" className="top-4 translate-y-0">
          <nav className="flex flex-col gap-1 text-base">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} className="rounded-md px-3 py-2 hover:bg-zinc-100">
                {l.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={close} className="rounded-md px-3 py-2 hover:bg-zinc-100">
                  Dashboard
                </Link>
                <Link href="/dashboard/history" onClick={close} className="rounded-md px-3 py-2 hover:bg-zinc-100">
                  Test history
                </Link>
                <Link href="/dashboard/bookmarks" onClick={close} className="rounded-md px-3 py-2 hover:bg-zinc-100">
                  Bookmarks
                </Link>
                <Link href="/dashboard/profile" onClick={close} className="rounded-md px-3 py-2 hover:bg-zinc-100">
                  Profile & settings
                </Link>
                {user.isAdmin && (
                  <Link href="/admin" onClick={close} className="rounded-md px-3 py-2 hover:bg-zinc-100">
                    Admin panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => logoutAction()}
                  className="rounded-md px-3 py-2 text-left text-red-600 hover:bg-zinc-100"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild variant="secondary">
                  <Link href="/login" onClick={close}>
                    Log in
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register" onClick={close}>
                    Start practicing
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
}
