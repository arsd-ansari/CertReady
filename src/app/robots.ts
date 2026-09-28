import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api/", "/practice/*/run", "/mock/*/run", "/mock/results/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
