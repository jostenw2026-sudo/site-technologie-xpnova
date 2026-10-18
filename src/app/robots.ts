import type { MetadataRoute } from "next";
import { URL_PRODUCTION } from "@/lib/indexation";

// Règles servies sur l'hôte de production. Sur tout autre hôte, src/proxy.ts
// répond à la place par « Disallow: / ».
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${URL_PRODUCTION}/sitemap.xml`,
  };
}
