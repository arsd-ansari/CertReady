import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-zinc-600">{site.tagline}</p>
          <p className="mt-4 max-w-md text-xs leading-5 text-zinc-500">
            CertReady is an independent study platform. All practice questions are original material and are not
            actual exam questions. CertReady is not affiliated with, endorsed by, or connected to the U.S. EPA, any
            state licensing board, or any certifying organization.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">Exams</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li><Link href="/exams" className="hover:text-navy">All exams</Link></li>
            <li><Link href="/exams/epa-608" className="hover:text-navy">EPA 608</Link></li>
            <li><Link href="/exams/epa-608/practice-test" className="hover:text-navy">EPA 608 practice test</Link></li>
            <li><Link href="/exams/epa-608/study-guide" className="hover:text-navy">EPA 608 study guide</Link></li>
            <li><Link href="/exams?category=water-wastewater" className="hover:text-navy">Water & wastewater</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li><Link href="/about" className="hover:text-navy">About</Link></li>
            <li><Link href="/pricing" className="hover:text-navy">Pricing</Link></li>
            <li><Link href="/privacy" className="hover:text-navy">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-navy">Terms</Link></li>
            <li><a href={`mailto:${site.supportEmail}`} className="hover:text-navy">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-zinc-500 sm:px-6">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
