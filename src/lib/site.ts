/** Brand constants used across metadata, structured data, and UI. */
export const site = {
  name: "CertReady",
  tagline: "Prepare. Practice. Get Certified.",
  description:
    "Practice tests, mock exams, and study resources for US professional certification and licensing exams.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  supportEmail: "support@certready.com",
} as const;

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
