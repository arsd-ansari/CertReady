import type { MetadataRoute } from "next";
import { listPublishedExamSlugs } from "@/lib/content/exams";
import { getExamGuides } from "@/content/exam-guides";
import { absoluteUrl } from "@/lib/site";

// Generated from the database on request so the build never needs DB access
// and newly published exams appear without a redeploy.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const exams = await listPublishedExamSlugs();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/exams"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const examEntries: MetadataRoute.Sitemap = exams.flatMap((exam) => [
    { url: absoluteUrl(`/exams/${exam.slug}`), lastModified: exam.updatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl(`/exams/${exam.slug}/practice-test`), lastModified: exam.updatedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl(`/exams/${exam.slug}/study-guide`), lastModified: exam.updatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl(`/exams/${exam.slug}/requirements`), lastModified: exam.updatedAt, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl(`/exams/${exam.slug}/faq`), lastModified: exam.updatedAt, changeFrequency: "monthly", priority: 0.6 },
    ...(getExamGuides(exam.slug).length
      ? [
          {
            url: absoluteUrl(`/exams/${exam.slug}/guides`),
            lastModified: exam.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
          ...getExamGuides(exam.slug).map((guide) => ({
            url: absoluteUrl(`/exams/${exam.slug}/guides/${guide.slug}`),
            lastModified: exam.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.8,
          })),
        ]
      : []),
    ...exam.categories.map((c) => ({
      url: absoluteUrl(`/exams/${exam.slug}/${c.slug}`),
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  return [...staticEntries, ...examEntries];
}
