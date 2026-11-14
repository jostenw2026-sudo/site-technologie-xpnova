import G from "@/content/donnees-groupe.json";

// Réseaux sociaux du groupe, affichés dans le pied de page de chaque site.
// Les adresses sont lues dans la référence donnees-groupe.json (CDC-RECETTE §8) :
// une seule source pour tous les dépôts, aucune URL recopiée ici.
// Icônes : tracés Simple Icons (CC0) des marques LinkedIn et YouTube.

const ICONES: Record<string, string> = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

type Props = {
  en?: boolean;
  /** Classes de couleur du titre (jeton `text-gold` par défaut). */
  classeTitre?: string;
  /** Classes de couleur des liens (jetons du groupe par défaut). */
  classeLien?: string;
};

export default function ReseauxSociaux({
  en = false,
  classeTitre = "text-gold",
  classeLien = "text-white/70 hover:text-gold",
}: Props) {
  return (
    <div className="mt-5">
      <p className={`mb-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] ${classeTitre}`}>
        {en ? "Follow us" : "Suivez-nous"}
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.86rem] leading-snug">
        {G.reseaux.map((r) => (
          <li key={r.cle}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={en ? r.libelleEn : r.libelle}
              className={`inline-flex items-center gap-2 no-underline ${classeLien}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d={ICONES[r.cle] ?? ""} />
              </svg>
              <span>{r.nom}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
