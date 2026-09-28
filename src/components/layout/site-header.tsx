import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";

const NAV = [
  { href: "/exams", label: "Exams" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold tracking-tight ${className}`} aria-label="CertReady home">
      <Image src="/logo-mark.png" alt="" width={32} height={32} priority className="h-8 w-8" />
      <span className="text-lg">
        <span className="text-navy">Cert</span>
        <span className="text-brand">Ready</span>
      </span>
    </Link>
  );
}

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <UserMenu name={user.name} email={user.email} isAdmin={user.role === "ADMIN"} />
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Start practicing</Link>
              </Button>
            </>
          )}
        </div>

        <MobileNav
          links={[...NAV]}
          user={user ? { name: user.name, email: user.email, isAdmin: user.role === "ADMIN" } : null}
        />
      </div>
    </header>
  );
}
