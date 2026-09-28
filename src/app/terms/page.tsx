import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/ui/misc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of CertReady.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Terms", href: "/terms" }]} />
      <div className="mt-4">
        <PageHeader title="Terms of Service" description="Last updated: September 2026" />
      </div>
      <div className="prose-cr mt-8">
        <h2>The service</h2>
        <p>{site.name} provides practice questions, mock exams and study material for professional certification exams. It is a study aid, not a certification program, and passing our practice tests does not guarantee passing any official exam.</p>
        <h2>Independence</h2>
        <p>{site.name} is not affiliated with, endorsed by, or sponsored by any government agency, licensing board or exam provider. All practice questions are original material. Trademarks belong to their respective owners.</p>
        <h2>Your account</h2>
        <p>You are responsible for keeping your password confidential and for activity under your account. One person per account. We may suspend accounts that abuse the service, scrape content, or attempt to circumvent access limits.</p>
        <h2>Content</h2>
        <p>Questions, explanations and study guides are copyrighted by {site.name}. You may use them for your personal study only. Redistribution, resale, or use to train other products is not permitted.</p>
        <h2>Accuracy</h2>
        <p>We work hard to keep content accurate and current, but regulations and exam blueprints change. Always confirm requirements with the official certifying body. Report suspected errors using the Report button on any question.</p>
        <h2>Payments</h2>
        <p>The service is currently free. If paid plans are introduced, their terms, pricing and refund policy will be published before any charge is made.</p>
        <h2>Limitation of liability</h2>
        <p>The service is provided “as is”. To the extent permitted by law, {site.name} is not liable for indirect or consequential damages arising from use of the service, including exam outcomes.</p>
        <h2>Contact</h2>
        <p><a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></p>
      </div>
    </div>
  );
}
