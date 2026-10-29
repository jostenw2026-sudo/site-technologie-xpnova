// Correspondance FR ↔ EN des pages du site — une seule table pour les liens hreflang
// (src/lib/alternates.ts, src/app/sitemap.ts) et pour le bouton FR/EN de la barre du
// groupe (src/components/shared/UtilityBar.tsx).
//
// Module sans données du référentiel : il est lu par un composant client. Les fiches
// (/referentiel/[slug], /filieres/[slug]), dont les slugs FR et EN diffèrent, sont
// appariées par code côté serveur (pairesFiches, src/lib/alternates.ts) et passées au
// bouton par les layouts racine.

export type Langue = "fr" | "en";

/** Pages fixes présentes dans les deux langues, sous le même chemin (« /x » ↔ « /en/x »). */
export const PAGES_MIROIR = [
  "/",
  "/a-propos",
  "/contact",
  "/cycle-de-vie",
  "/domaines",
  "/faq",
  "/blog",
  "/references",
  "/referentiel",
  "/filieres",
  "/services",
] as const;

/** Paire [chemin français, chemin anglais] d'une page. */
export type Paire = readonly [fr: string, en: string];

/** Chemin français → chemin anglais d'une page fixe (« / » → « /en », « /x » → « /en/x »). */
export function cheminAnglais(cheminFr: string): string {
  return cheminFr === "/" ? "/en" : `/en${cheminFr}`;
}

/** Chemin sans barre finale ni paramètres (« /en/ » → « /en », « » → « / »). */
export function normaliserChemin(chemin: string | null | undefined): string {
  const brut = (chemin ?? "/").split(/[?#]/)[0];
  return brut.replace(/\/+$/, "") || "/";
}

export function langueDuChemin(chemin: string): Langue {
  return chemin === "/en" || chemin.startsWith("/en/") ? "en" : "fr";
}

/** Paires des pages fixes. */
export const PAIRES_PAGES: readonly Paire[] = PAGES_MIROIR.map((p) => [p, cheminAnglais(p)] as const);

/** Paire FR/EN qui contient ce chemin, ou undefined (page sans équivalent). */
export function paireDe(chemin: string, paires: readonly Paire[]): Paire | undefined {
  const c = normaliserChemin(chemin);
  return paires.find(([fr, en]) => fr === c || en === c);
}

/**
 * Chemin équivalent dans l'autre langue (page fixe ou fiche appariée par code),
 * ou l'accueil de cette langue à défaut.
 */
export function pageEquivalente(chemin: string | null | undefined, vers: Langue, fiches: readonly Paire[] = []): string {
  const paire = paireDe(normaliserChemin(chemin), [...PAIRES_PAGES, ...fiches]);
  if (paire) return vers === "en" ? paire[1] : paire[0];
  return vers === "en" ? "/en" : "/";
}
