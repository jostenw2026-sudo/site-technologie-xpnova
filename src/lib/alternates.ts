import type { Metadata } from "next";
import { URL_PRODUCTION } from "@/lib/indexation";
import { getFilieres, getSousFonctions } from "@/lib/referentiel";
import { normaliserChemin, PAIRES_PAGES, paireDe, type Paire } from "@/lib/pages-miroir";

// Liens canonical et hreflang de chaque page (même doctrine que le site Formation).
// - Canonical : la page elle-même, en URL absolue de production.
// - hreflang : fr, en et x-default (= version française), d'après la table des
//   correspondances (src/lib/pages-miroir.ts pour les pages fixes, appariement par
//   code ci-dessous pour les fiches, dont les slugs FR et EN diffèrent).
// URL absolues sur l'hôte de production (URL_PRODUCTION, src/lib/indexation.ts),
// quel que soit l'hôte servi : la recette reste en noindex (src/proxy.ts).
// Module serveur : il lit le référentiel complet, ne pas l'importer dans un composant client.

/** URL absolue d'un chemin du site (« / » → racine sans barre finale). */
export function urlAbsolue(chemin: string): string {
  return chemin === "/" ? URL_PRODUCTION : `${URL_PRODUCTION}${chemin}`;
}

/** Apparie les fiches FR et EN d'une même section par leur code (T1.1, FV01…). */
function apparier(fr: { code: string; slug: string }[], en: { code: string; slug: string }[], section: string): Paire[] {
  const slugEn = new Map(en.map((x) => [x.code, x.slug]));
  return fr.flatMap((x) => {
    const s = slugEn.get(x.code);
    return s ? [[`${section}/${x.slug}`, `/en${section}/${s}`] as const] : [];
  });
}

/** Fiches du référentiel et des filières, appariées FR ↔ EN par code. */
export const PAIRES_FICHES: readonly Paire[] = [
  ...apparier(getSousFonctions("fr"), getSousFonctions("en"), "/referentiel"),
  ...apparier(getFilieres("fr"), getFilieres("en"), "/filieres"),
];

const PAIRES: readonly Paire[] = [...PAIRES_PAGES, ...PAIRES_FICHES];

/** Liens hreflang d'une page (chemin FR ou EN), ou undefined si elle n'a pas d'équivalent. */
export function languesPour(chemin: string): Record<string, string> | undefined {
  const paire = paireDe(chemin, PAIRES);
  if (!paire) return undefined;
  const fr = urlAbsolue(paire[0]);
  return { fr, en: urlAbsolue(paire[1]), "x-default": fr };
}

/** Bloc `alternates` d'une page, désignée par son propre chemin (« /services », « /en/services »…). */
export function alternatesPour(chemin: string): NonNullable<Metadata["alternates"]> {
  const c = normaliserChemin(chemin);
  const langues = languesPour(c);
  return langues ? { canonical: urlAbsolue(c), languages: langues } : { canonical: urlAbsolue(c) };
}
