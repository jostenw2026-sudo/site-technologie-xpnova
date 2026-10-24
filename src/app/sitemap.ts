import type { MetadataRoute } from "next";
import { URL_PRODUCTION } from "@/lib/indexation";
import { getFilieres, getSousFonctions } from "@/lib/referentiel";
import { languesPour } from "@/lib/alternates";

// Plan du site — référencé par robots.txt (il répondait 404 jusqu'ici).
// Liste à tenir à jour quand une page est ajoutée ou retirée.
// Chaque entrée porte ses liens hreflang fr / en / x-default (xhtml:link), les mêmes
// que le <head> de la page (src/lib/alternates.ts : fiches appariées par code).
const ROUTES = [
    "/",
    "/a-propos",
    "/contact",
    "/cycle-de-vie",
    "/domaines",
    "/faq",
    "/references",
    "/referentiel",
    "/filieres",
    "/services",
    "/en",
    "/en/a-propos",
    "/en/contact",
    "/en/cycle-de-vie",
    "/en/domaines",
    "/en/faq",
    "/en/references",
    "/en/referentiel",
    "/en/filieres",
    "/en/services",
];

// Fiches du référentiel RT-TECH (50 sous-fonctions × 2 langues), générées depuis src/content.
const FICHES = [
    ...getSousFonctions("fr").map((sf) => `/referentiel/${sf.slug}`),
    ...getSousFonctions("en").map((sf) => `/en/referentiel/${sf.slug}`),
    ...getFilieres("fr").map((f) => `/filieres/${f.slug}`),
    ...getFilieres("en").map((f) => `/en/filieres/${f.slug}`),
];

// Date de la dernière révision publiée du site (<lastmod>), fixe : un `new Date()` au
// build ferait changer toutes les dates à chaque déploiement, même sans modification.
// À avancer quand le contenu des pages change.
const DATE_REVISION = "2026-10-24";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...ROUTES, ...FICHES].map((route) => {
    const langues = languesPour(route);
    return {
      url: `${URL_PRODUCTION}${route === "/" ? "" : route}`,
      lastModified: DATE_REVISION,
      changeFrequency: "monthly",
      priority: route === "/" ? 1 : route === "/en" ? 0.8 : route.includes("/referentiel/") || route.includes("/filieres/") ? 0.5 : 0.6,
      ...(langues ? { alternates: { languages: langues } } : {}),
    };
  });
}
