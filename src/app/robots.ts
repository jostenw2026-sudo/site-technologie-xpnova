import type { MetadataRoute } from "next";

const isProd = process.env.SITE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://technologie.xp-nova.com"}/sitemap.xml`,
  };
}
