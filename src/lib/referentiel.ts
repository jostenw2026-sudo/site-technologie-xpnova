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

export interface Referentiel {
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
  compteurs: { domaines: number; sousFonctions: number; services: number; combinaisons: number };
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

export function getService(code: string, lang: Lang = "fr"): Service | undefined {
  return getReferentiel(lang).services.find((s) => s.code === code);
}

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
    fiche: { equipements: "Équipements types", grandeurs: "Grandeurs à dimensionner", risques: "Risques et contraintes au Cameroun", normes: "Normes et autorités", services: "Services clés", maillons: "Maillons de la chaîne de valeur", demander: "Demander une expertise", retour: "Tous les référentiels", typeP: "Physique", typeN: "Numérique", typeH: "Hybride", enCours: "Cadre en cours de confirmation", prestation: "Code de prestation" },
    transversal: "Transversal : sert les quatre temps",
    aucun: "Aucune sous-fonction ne correspond à ces filtres.",
    doctrine: "Doctrine",
  },
  en: {
    referentiel: "Equipment reference",
    intro:
      "50 sub-functions coded T1.1 to T8.7, classified by technical function, never by brand or value chain. Each sheet describes typical equipment, sizing parameters, Cameroon-specific risks and the regulatory framework.",
    filtres: { domaine: "Domain", type: "Equipment type", maillon: "Link", vue: "Need", tous: "All", toutes: "All", reinit: "Reset" },
    resultats: (n: number) => `${n} sub-function${n > 1 ? "s" : ""}`,
    fiche: { equipements: "Typical equipment", grandeurs: "Sizing parameters", risques: "Risks and constraints in Cameroon", normes: "Standards and authorities", services: "Key services", maillons: "Value chain links", demander: "Request an expertise", retour: "Back to the reference", typeP: "Physical", typeN: "Digital", typeH: "Hybrid", enCours: "Framework being confirmed", prestation: "Service code" },
    transversal: "Cross-cutting: serves all four stages",
    aucun: "No sub-function matches these filters.",
    doctrine: "Doctrine",
  },
} as const;
