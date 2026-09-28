import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <Image src="/logo-mark.png" alt="" width={48} height={48} className="h-12 w-12" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
      </div>
      <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">{children}</div>
      {footer && <p className="mt-6 text-center text-sm text-zinc-600">{footer}</p>}
      <p className="mt-8 text-center text-xs text-zinc-400">
        By continuing you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
