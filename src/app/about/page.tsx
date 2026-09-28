import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/ui/misc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About CertReady",
  description: "CertReady builds practice tests for skilled-trade and professional certification exams, starting with EPA 608 and water operator licensing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      <div className="mt-4">
        <PageHeader title="About CertReady" description={site.tagline} />
      </div>
      <div className="prose-cr mt-8">
        <p>
          CertReady is an independent exam-prep platform for the certifications that skilled trades and technical
          professionals need to get hired and stay licensed. We started with EPA Section 608 for HVAC/R technicians and
          Grade 1 water and wastewater operator exams, and we add certifications based on what learners ask for.
        </p>
        <h2>How we write questions</h2>
        <p>
          Every question is original. We study the published exam blueprints, the underlying regulations and
          reference texts, and write items that test the same facts, numbers and judgment calls the real exam does. Each
          question carries an explanation and, where relevant, a pointer to the official source so you can verify it
          yourself.
        </p>
        <h2>What we are not</h2>
        <p>
          We are not affiliated with the U.S. Environmental Protection Agency, any state licensing board, Water
          Professionals International, or any exam provider. We never publish actual exam questions, and we don&apos;t
          guarantee you&apos;ll pass — but we do our best to make sure you walk in knowing where you stand.
        </p>
        <h2>Found a mistake?</h2>
        <p>
          Use the <strong>Report</strong> button on any question, or email{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. Corrections are reviewed by hand.
        </p>
        <p>
          <Link href="/exams">Browse exams →</Link>
        </p>
      </div>
    </div>
  );
}
