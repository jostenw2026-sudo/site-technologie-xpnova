import type { MetadataRoute } from "next";
import { URL_PRODUCTION } from "@/lib/indexation";

// Plan du site — référencé par robots.txt (il répondait 404 jusqu'ici).
// Liste à tenir à jour quand une page est ajoutée ou retirée.
const ROUTES = [
    "/",
    "/a-propos",
    "/contact",
    "/cycle-de-vie",
    "/domaines",
    "/references",
    "/services",
    "/en",
    "/en/a-propos",
    "/en/contact",
    "/en/cycle-de-vie",
    "/en/domaines",
    "/en/references",
    "/en/services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${URL_PRODUCTION}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/en" ? 0.8 : 0.6,
  }));
}
