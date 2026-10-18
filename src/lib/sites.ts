/**
 * Adresses des cinq sites du groupe, et état « recette locale ».
 *
 * Chaque adresse se règle par une variable NEXT_PUBLIC_URL_* (inlinée au build).
 * Variable absente ou vide : l'adresse de production — la production ne change
 * donc pas tant qu'on ne pose rien. En recette locale, les variables pointent
 * vers localhost (CDC-RECETTE-XPNOVA v1.1 §5.4).
 *
 * Lecture en toutes lettres (`process.env.NEXT_PUBLIC_…`) : Next n'inline pas
 * une lecture dynamique.
 */
export const URL_SITES = {
  portail: process.env.NEXT_PUBLIC_URL_PORTAIL || "https://xp-nova.com",
  agrovita: process.env.NEXT_PUBLIC_URL_AGROVITA || "https://agrovita.xp-nova.com",
  odt: process.env.NEXT_PUBLIC_URL_ODT || "https://odt.xp-nova.com",
  technologie: process.env.NEXT_PUBLIC_URL_TECHNOLOGIE || "https://technologie.xp-nova.com",
  formation: process.env.NEXT_PUBLIC_URL_FORMATION || "https://ingenierie-formation.xp-nova.com",
};

/** Recette locale ou préproduction : SITE_ENV=recette (lu côté serveur, au rendu). */
export function estRecette(): boolean {
  return process.env.SITE_ENV === "recette";
}
