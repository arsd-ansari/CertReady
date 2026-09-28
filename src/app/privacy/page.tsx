import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/ui/misc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CertReady collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "Privacy", href: "/privacy" }]} />
      <div className="mt-4">
        <PageHeader title="Privacy Policy" description="Last updated: September 2026" />
      </div>
      <div className="prose-cr mt-8">
        <h2>What we collect</h2>
        <ul>
          <li><strong>Account data</strong> — your name, email address and a hashed password when you register.</li>
          <li><strong>Study data</strong> — the questions you answer, mock exam results, bookmarks and the target exam and date you choose to save.</li>
          <li><strong>Usage data</strong> — page views and product events (for example “practice started”) used to improve the service. If Google Analytics is enabled, IP addresses are anonymized.</li>
        </ul>
        <h2>How we use it</h2>
        <p>To run the service: save your progress, show your dashboard, send password-reset emails, and understand which exams and features are used. We do not sell personal data.</p>
        <h2>Cookies</h2>
        <p>We use a single, essential session cookie to keep you signed in. Analytics and advertising cookies are only set if those services are enabled and, where required, with your consent.</p>
        <h2>Retention and deletion</h2>
        <p>Your data is kept while your account exists. Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> to request export or deletion of your account and study history.</p>
        <h2>Security</h2>
        <p>Passwords are hashed with bcrypt, sessions are stored server-side with hashed tokens, and all traffic is served over HTTPS in production.</p>
        <h2>Contact</h2>
        <p>Questions about this policy: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.</p>
      </div>
    </div>
  );
}
