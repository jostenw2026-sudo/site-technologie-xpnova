import type { MetadataRoute } from "next";
import { URL_PRODUCTION } from "@/lib/indexation";
import { getSousFonctions } from "@/lib/referentiel";

// Plan du site — référencé par robots.txt (il répondait 404 jusqu'ici).
// Liste à tenir à jour quand une page est ajoutée ou retirée.
const ROUTES = [
    "/",
    "/a-propos",
    "/contact",
    "/cycle-de-vie",
    "/domaines",
    "/references",
    "/referentiel",
    "/services",
    "/en",
    "/en/a-propos",
    "/en/contact",
    "/en/cycle-de-vie",
    "/en/domaines",
    "/en/references",
    "/en/referentiel",
    "/en/services",
];

// Fiches du référentiel RT-TECH (50 sous-fonctions × 2 langues), générées depuis src/content.
const FICHES = [
    ...getSousFonctions("fr").map((sf) => `/referentiel/${sf.slug}`),
    ...getSousFonctions("en").map((sf) => `/en/referentiel/${sf.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...ROUTES, ...FICHES].map((route) => ({
    url: `${URL_PRODUCTION}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/en" ? 0.8 : route.includes("/referentiel/") ? 0.5 : 0.6,
  }));
}
