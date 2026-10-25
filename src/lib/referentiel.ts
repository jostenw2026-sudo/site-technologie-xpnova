// Référentiel Technologie XP-NOVA (RT-TECH v1.0, validé le 21/10/2026).
// Source de vérité : scripts/generer-rt-tech.py → src/content/rt-tech.{fr,en}.json.
// Ne pas modifier les JSON à la main : corriger le script puis le relancer.

import fr from "@/content/rt-tech.fr.json";
import en from "@/content/rt-tech.en.json";

export type Lang = "fr" | "en";
export type TypeEquipement = "P" | "N" | "H";

export interface Equipement {
  code: string;
  nom: string;
  type: TypeEquipement;
}

export interface SousFonction {
  code: string;
  nom: string;
  slug: string;
  types: TypeEquipement[];
  maillons: string[];
  maillonsLibelles: string[];
  vue: string;
  vueLibelle: string;
  equipements: Equipement[];
  grandeurs: string;
  risques: string;
  normes: string;
  servicesCles: string[];
}

export interface Domaine {
  code: string;
  nom: string;
  slug: string;
  transversal: boolean;
  sousFonctions: SousFonction[];
}

export interface Service {
  code: string;
  nom: string;
  slug: string;
  livrables: string[];
  dureeIndicative: string;
  phase: string;
  phaseLibelle: string;
  prestationsAgrovita: string[];
}

export interface Filiere {
  code: string;
  nom: string;
  nomEn: string;
  maillon: string;
  slug: string;
  sousFonctions: { code: string; niveau: 1 | 2 | 3 }[];
}

export interface Referentiel {
  filieres: Filiere[];
  referentiel: string;
  version: string;
  dateValidation: string;
  langue: string;
  doctrine: { signature: string; perimetre: string };
  types: { code: string; nom: string }[];
  vues: { code: string; nom: string }[];
  maillons: { code: string; nom: string }[];
  domaines: Domaine[];
  services: Service[];
  cycleDeVie: { code: string; nom: string }[];
  compteurs: { domaines: number; sousFonctions: number; services: number; combinaisons: number; filieres: number };
}

export function getReferentiel(lang: Lang = "fr"): Referentiel {
  return (lang === "en" ? en : fr) as unknown as Referentiel;
}

export function getSousFonctions(lang: Lang = "fr"): SousFonction[] {
  return getReferentiel(lang).domaines.flatMap((d) => d.sousFonctions);
}

export function getSousFonction(slug: string, lang: Lang = "fr"): { domaine: Domaine; sf: SousFonction } | null {
  for (const domaine of getReferentiel(lang).domaines) {
    const sf = domaine.sousFonctions.find((s) => s.slug === slug);
    if (sf) return { domaine, sf };
  }
  return null;
}

export function getFilieres(lang: Lang = "fr"): Filiere[] {
  return getReferentiel(lang).filieres;
}

export function getFiliere(slug: string, lang: Lang = "fr"): Filiere | undefined {
  return getReferentiel(lang).filieres.find((f) => f.slug === slug);
}

/** Filières qui mobilisent une sous-fonction, par niveau décroissant. */
export function filieresDeSousFonction(code: string, lang: Lang = "fr"): { filiere: Filiere; niveau: number }[] {
  return getReferentiel(lang)
    .filieres.flatMap((f) => f.sousFonctions.filter((s) => s.code === code).map((s) => ({ filiere: f, niveau: s.niveau })))
    .sort((a, b) => b.niveau - a.niveau);
}

export function nomFiliere(f: Filiere, lang: Lang): string {
  return lang === "en" ? f.nomEn : f.nom;
}

export function getService(code: string, lang: Lang = "fr"): Service | undefined {
  return getReferentiel(lang).services.find((s) => s.code === code);
}

// ---------------------------------------------------------------------------
// Titres (<title>) des fiches du référentiel et des fiches filières (décision D6 de la
// direction, 24/10/2026) : le nom, sans le code interne, qui reste dans le H1, le corps et
// le fil d'Ariane. Deux fiches de même nom dans une langue (T3.5 et FH01 « Aquaculture »)
// prennent entre parenthèses le libellé affiché au-dessus de leur H1 : le domaine parent
// pour une sous-fonction, le maillon pour une filière. Les autres gardent leur nom seul.
// ---------------------------------------------------------------------------

const cleNom = (nom: string, lang: Lang) => nom.trim().toLocaleLowerCase(lang);

/** Noms portés par plusieurs fiches (sous-fonctions et filières confondues) d'une langue. */
function nomsHomonymes(lang: Lang): Set<string> {
  const noms = [...getSousFonctions(lang).map((s) => s.nom), ...getFilieres(lang).map((f) => nomFiliere(f, lang))].map((n) => cleNom(n, lang));
  return new Set(noms.filter((n, i) => noms.indexOf(n) !== i));
}

function nomTitre(nom: string, libelle: string | undefined, lang: Lang): string {
  return libelle && nomsHomonymes(lang).has(cleNom(nom, lang)) ? `${nom} (${libelle})` : nom;
}

export function nomTitreSousFonction(domaine: Domaine, sf: SousFonction, lang: Lang): string {
  return nomTitre(sf.nom, domaine.nom, lang);
}

export function nomTitreFiliere(f: Filiere, lang: Lang): string {
  return nomTitre(nomFiliere(f, lang), getReferentiel(lang).maillons.find((m) => m.code === f.maillon)?.nom, lang);
}

// ---------------------------------------------------------------------------
// Description (meta description) des fiches filières (tableau de référencement validé par la
// direction le 24/10/2026) : nom de la filière, nombre de sous-fonctions mobilisées et les
// premières dans l'ordre de la page (essentielles, puis fréquentes, puis occasionnelles ; ordre
// des données à niveau égal). Trois sous-fonctions citées, deux, une ou aucune : le plus grand
// nombre qui tient en 160 caractères.
// ---------------------------------------------------------------------------

const DESCRIPTION_MAX = 160;

export function descriptionFiliere(f: Filiere, lang: Lang): string {
  const noms = new Map(getSousFonctions(lang).map((s) => [s.code, s.nom]));
  const ordre = [3, 2, 1]
    .flatMap((n) => f.sousFonctions.filter((s) => s.niveau === n))
    .flatMap((s) => noms.get(s.code) ?? [])
    // En cours de phrase : initiale en minuscule (aucun nom ne commence par un sigle).
    .map((n) => n.charAt(0).toLocaleLowerCase(lang) + n.slice(1));
  const nb = f.sousFonctions.length;
  const nom = nomFiliere(f, lang);
  const et = lang === 'en' ? ' and ' : ' et ';
  // Noms composés (« séchage, fumage et lyophilisation ») : séparés par un point-virgule.
  const pv = lang === 'en' ? '; ' : ' ; ';
  const enumeration = (xs: string[]) =>
    xs.length < 2
      ? xs[0]
      : xs.some((x) => x.includes(',') || x.includes(et))
        ? xs.join(pv)
        : `${xs.slice(0, -1).join(', ')}${et}${xs[xs.length - 1]}`;
  const phrase = (xs: string[]) =>
    lang === 'en'
      ? `${nom}: ${nb} equipment sub-functions involved${xs.length ? `, including ${enumeration(xs)}` : ''}. XP-NOVA RT-TECH reference.`
      : `${nom} : ${nb} sous-fonctions d'équipement mobilisées${xs.length ? `, dont ${enumeration(xs)}` : ''}. Référentiel RT-TECH de XP-NOVA.`;
  for (let k = Math.min(3, ordre.length); k > 0; k--) {
    const d = phrase(ordre.slice(0, k));
    if (d.length <= DESCRIPTION_MAX) return d;
  }
  return phrase([]);
}

// ---------------------------------------------------------------------------
// Secret industriel (décision DG du 21/10/2026) — fiche en deux niveaux.
// Niveau public : code, nom, équipements types, grandeurs, maillons, services, un risque
// emblématique, références internationales seules. Niveau privé (sur demande, après
// ouverture de dossier) : liste complète des risques, autorités camerounaises et état de
// vérification, grille CV1–CV9 appliquée. Les champs privés ne quittent jamais le serveur.
// ---------------------------------------------------------------------------

/** Références internationales citées dans `normes`, sans les autorités ni les mentions « à vérifier ». */
export function normesPubliques(normes: string): string[] {
  const refs = normes.match(/\b(?:ISO(?:\/IEC)?|IEC|EN|NF C|Codex(?: CXC)?)\s?[0-9][0-9A-Za-z.\-]*(?:-[0-9]+)?|\bGS1\b|\bHACCP\b|\bCodex\b|R[èe]glement \(UE\) \d{4}\/\d+|Regulation \(EU\) \d{4}\/\d+|Accord ATP|ATP Agreement/g) ?? [];
  return [...new Set(refs.map((r) => r.replace(/\s+/g, ' ').trim()))];
}

/** Premier risque de la liste, en une phrase. */
export function risqueEmblematique(risques: string): string {
  return risques.split(/\s*;\s*/)[0];
}

export type SousFonctionPublique = Omit<SousFonction, 'risques' | 'normes'> & {
  risqueEmblematique: string;
  normesPubliques: string[];
  nbRisques: number;
  cadreNational: boolean;
};

export function versPublique(sf: SousFonction): SousFonctionPublique {
  const { risques, normes, ...reste } = sf;
  return {
    ...reste,
    risqueEmblematique: risqueEmblematique(risques),
    normesPubliques: normesPubliques(normes),
    nbRisques: risques.split(';').length,
    cadreNational: /MINADER|MINEPIA|MINEPDED|ANOR|CCAA|ARSEL|ART|CNHPCAT|CENEEMA|PECAE|à vérifier|à confirmer|to be verified|to be confirmed|to be checked/i.test(normes),
  };
}

/** Référentiel sans les champs privés : seule forme transmise aux composants client. */
export function referentielPublic(lang: Lang = 'fr') {
  const r = getReferentiel(lang);
  return {
    ...r,
    domaines: r.domaines.map((d) => ({ ...d, sousFonctions: d.sousFonctions.map(versPublique) })),
  };
}
export type ReferentielPublic = ReturnType<typeof referentielPublic>;

export const MENTION_RT_TECH = 'Référentiel RT-TECH v1.0 © XP-NOVA SARL — reproduction interdite sans autorisation écrite.';
export const MENTION_RT_TECH_EN = 'RT-TECH reference v1.0 © XP-NOVA SARL — reproduction prohibited without written permission.';

/** Image d'illustration du domaine (public/images/illustrations). */
export const IMAGE_DOMAINE: Record<string, string> = {
  T1: "/images/illustrations/mecanisation.webp",
  T2: "/images/illustrations/irrigation-eau.webp",
  T3: "/images/illustrations/serres-agricoles.webp",
  T4: "/images/illustrations/transformation-usines.webp",
  T5: "/images/illustrations/stockage-froid.webp",
  T6: "/images/illustrations/energie-utilites.webp",
  T7: "/images/illustrations/manutention-logistique.webp",
  T8: "/images/illustrations/equipements-numeriques.webp",
};

/** Code de prestation Tx.y·TS-nn, tel qu'il est pré-rempli dans le formulaire de contact. */
export function codePrestation(sf: string, ts: string): string {
  return `${sf}·${ts}`;
}

export const LIBELLES = {
  fr: {
    referentiel: "Référentiel des équipements",
    intro:
      "50 sous-fonctions codées T1.1 à T8.7, classées par fonction technique, jamais par marque ni par filière. Chaque fiche décrit les équipements types, les grandeurs à dimensionner, les risques propres au Cameroun et le cadre normatif.",
    filtres: { domaine: "Domaine", type: "Type d'équipement", maillon: "Maillon", vue: "Besoin", tous: "Tous", toutes: "Toutes", reinit: "Réinitialiser" },
    resultats: (n: number) => `${n} sous-fonction${n > 1 ? "s" : ""}`,
    fiche: { equipements: "Équipements types", grandeurs: "Grandeurs à dimensionner", risques: "Risque emblématique au Cameroun", normes: "Références internationales de bonne pratique", services: "Services clés", maillons: "Maillons de la chaîne de valeur", demander: "Demander une expertise", retour: "Retour au référentiel", typeP: "Physique", typeN: "Numérique", typeH: "Hybride", enCours: "Cadre camerounais documenté dans la fiche complète", prestation: "Code de prestation", complete: "Fiche technique complète sur demande", completeTexte: "Liste complète des risques et contraintes, autorités camerounaises et textes applicables, grille de cycle de vie CV1–CV9 : remis après ouverture du dossier.", completeCta: "Demander la fiche complète", autresRisques: (n: number) => `${n - 1} autre${n > 2 ? "s" : ""} risque${n > 2 ? "s" : ""} documenté${n > 2 ? "s" : ""} dans la fiche complète.` },
    transversal: "Transversal : sert les quatre temps",
    filieres: { titre: "Entrer par filière", intro: "Les 29 filières d'AGROVITA, chacune avec les sous-fonctions qu'elle mobilise : essentielles, fréquentes ou occasionnelles. Une filière n'est pas un domaine : elle traverse plusieurs domaines.", niveau: { 3: "Essentiel", 2: "Fréquent", 1: "Occasionnel" } as Record<number, string>, retour: "Toutes les filières", mobilise: "Sous-fonctions mobilisées", agrovita: "Voir la filière sur AGROVITA", filieresDeFiche: "Filières qui mobilisent cette sous-fonction", chapeau: "Comment lire cette page", chapeauTexte: "Chaque filière liste les sous-fonctions du référentiel qu'un projet de cette filière mobilise le plus souvent. Le niveau indique la fréquence, pas l'importance : un projet précis peut s'en écarter, c'est l'analyse du besoin (TS-01) qui tranche." },
    sections: { domaines: "Entrer par domaine", domainesTexte: "Huit raccourcis vers les cartes de la page Domaines ; le nombre de sous-fonctions indique l'étendue de chacun.", explorer: "Explorer les sous-fonctions", explorerTexte: "Un domaine à la fois, affiné par type d'équipement, maillon de la chaîne de valeur et besoin ; chaque carte ouvre une fiche.", mobiliser: "Mobiliser cette sous-fonction", mobiliserTexte: "Maillons concernés, services clés et deux façons de nous solliciter : le formulaire, pré-rempli avec le code, ou WhatsApp." },
    aucun: "Aucune sous-fonction ne correspond à ces filtres.",
    doctrine: "Doctrine",
  },
  en: {
    referentiel: "Equipment reference",
    intro:
      "50 sub-functions coded T1.1 to T8.7, classified by technical function, never by brand or value chain. Each sheet describes typical equipment, sizing parameters, Cameroon-specific risks and the regulatory framework.",
    filtres: { domaine: "Domain", type: "Equipment type", maillon: "Link", vue: "Need", tous: "All", toutes: "All", reinit: "Reset" },
    resultats: (n: number) => `${n} sub-function${n > 1 ? "s" : ""}`,
    fiche: { equipements: "Typical equipment", grandeurs: "Sizing parameters", risques: "Key risk in Cameroon", normes: "International good-practice references", services: "Key services", maillons: "Value chain links", demander: "Request an expertise", retour: "Back to the reference", typeP: "Physical", typeN: "Digital", typeH: "Hybrid", enCours: "Cameroonian framework documented in the full sheet", prestation: "Service code", complete: "Full technical sheet on request", completeTexte: "Complete list of risks and constraints, Cameroonian authorities and applicable texts, CV1–CV9 life-cycle grid: provided after the file is opened.", completeCta: "Request the full sheet", autresRisques: (n: number) => `${n - 1} other risk${n > 2 ? "s" : ""} documented in the full sheet.` },
    transversal: "Cross-cutting: serves all four stages",
    filieres: { titre: "Enter by value chain", intro: "AGROVITA's 29 value chains, each with the sub-functions it mobilises: essential, frequent or occasional. A value chain is not a domain: it cuts across several domains.", niveau: { 3: "Essential", 2: "Frequent", 1: "Occasional" } as Record<number, string>, retour: "All value chains", mobilise: "Sub-functions mobilised", agrovita: "See the value chain on AGROVITA", filieresDeFiche: "Value chains that mobilise this sub-function", chapeau: "How to read this page", chapeauTexte: "Each value chain lists the reference sub-functions a project in that chain most often mobilises. The level indicates frequency, not importance: a specific project may differ, and the needs analysis (TS-01) decides." },
    sections: { domaines: "Enter by domain", domainesTexte: "Eight shortcuts to the cards of the Domains page; the number of sub-functions shows the extent of each.", explorer: "Explore the sub-functions", explorerTexte: "One domain at a time, refined by equipment type, value-chain link and need; each card opens a sheet.", mobiliser: "Mobilise this sub-function", mobiliserTexte: "Links concerned, key services and two ways to reach us: the form, pre-filled with the code, or WhatsApp." },
    aucun: "No sub-function matches these filters.",
    doctrine: "Doctrine",
  },
} as const;
