import { URL_SITES } from "@/lib/sites";

/**
 * AGROBOUSSOLE — produit d'appel du groupe, mis en évidence sur les cinq sites
 * (décision DG du 20/10/2026, option A) : bouton dans la barre du groupe et
 * encadré en tête du pied de page. Textes repris de la page AGROBOUSSOLE
 * d'AGROVITA (/ressources/agroboussole), sans formulation nouvelle.
 * Couleurs fixes, indépendantes des jetons de chaque site : or #D4A017 avec
 * texte navy (6,46:1), or clair #E9C25A sur navy profond (≥ 9:1).
 */
const lien = (en: boolean) => `${URL_SITES.agrovita}${en ? "/en" : ""}/ressources/agroboussole`;

/** Bouton de la barre du groupe. `grand` : version du menu déroulant mobile. */
export function BoutonAgroboussole({ en = false, grand = false }: { en?: boolean; grand?: boolean }) {
  const complet = en ? "AGROBOUSSOLE · free mini-assessment" : "AGROBOUSSOLE · mini-évaluation gratuite";
  if (grand) {
    return (
      <a href={lien(en)} className="rounded-md bg-[#D4A017] px-3.5 py-2.5 text-sm font-extrabold text-[#0D1F5C] no-underline hover:no-underline hover:bg-[#E9C25A]">
        {complet}
      </a>
    );
  }
  return (
    <a
      href={lien(en)}
      className="hidden md:inline-flex items-center rounded-md bg-[#D4A017] px-3 py-1 text-[0.8125rem] font-extrabold text-[#0D1F5C] no-underline hover:no-underline hover:bg-[#E9C25A] whitespace-nowrap"
      aria-label={complet}
    >
      <span className="xl:hidden">AGROBOUSSOLE</span>
      <span className="hidden xl:inline">{complet}</span>
    </a>
  );
}

/** Encadré en tête du pied de page. */
export function EncartAgroboussole({ en = false }: { en?: boolean }) {
  return (
    <div className="bg-[#0A1748] border-b border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <div className="border-l-4 border-[#D4A017] pl-4">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-[#E9C25A]">
            {en ? "AGROBOUSSOLE · an XP-NOVA service" : "AGROBOUSSOLE · un service XP-NOVA"}
          </p>
          <p className="m-0 mt-1 text-lg font-semibold text-white">
            {en ? "Is your agricultural idea ready to become a project?" : "Votre idée agricole est-elle prête à devenir un projet ?"}
          </p>
        </div>
        <a
          href={lien(en)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-[#D4A017] px-5 font-bold text-[#0D1F5C] no-underline hover:no-underline hover:bg-[#E9C25A]"
        >
          {en ? "Start — free mini-assessment" : "Commencer — mini-évaluation gratuite"}
        </a>
      </div>
    </div>
  );
}
