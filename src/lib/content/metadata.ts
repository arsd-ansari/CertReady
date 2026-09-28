import type { Metadata } from "next";
import type { PublishedExam } from "./exams";

/** Builds canonical/OG metadata for an exam sub-page. */
export function examMetadata(
  exam: PublishedExam,
  opts: { path: string; title?: string; description?: string } = { path: `/exams/${exam.slug}` },
): Metadata {
  const title = opts.title ?? exam.seoTitle ?? `${exam.title} Practice Test`;
  const description = opts.description ?? exam.seoDescription ?? exam.summary;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: opts.path },
    openGraph: { title, description, url: opts.path, type: "website" },
  };
}
