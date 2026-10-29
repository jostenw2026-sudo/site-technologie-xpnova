// Blog de la division TECHNOLOGIE (29/10/2026). Un article = une entrée ici, en français et
// en anglais. Tant que la liste est vide, la page /blog est servie en noindex (liens
// suivis) et reste hors du sitemap, comme /references : une page sans contenu propre
// n'a rien à indexer.
//
// Règles éditoriales du groupe : pas de prix, pas de chiffre non sourcé, pas de
// témoignage inventé ; date = date réelle de mise en ligne.

import { URL_SITES } from '@/lib/sites';

export type ArticleBlog = {
  slug: string;
  titre: { fr: string; en: string };
  chapeau: { fr: string; en: string };
  datePublication: string; // AAAA-MM-JJ
  /** Article publié ailleurs (lien absolu) ; à défaut, page /blog/<slug> du site. */
  url?: string;
};

export const BLOG_DIVISION: ArticleBlog[] = [];

/** Blogs du groupe vers lesquels la page renvoie, dans l'ordre d'affichage. */
export const BLOGS_GROUPE = [
  {
    cle: 'portail',
    nom: 'XP-NOVA',
    url: { fr: `${URL_SITES.portail}/blog`, en: `${URL_SITES.portail}/blog` },
    texte: {
      fr: 'Les guides du cabinet : études de faisabilité, business plans, choix de filières.',
      en: "The firm's guides: feasibility studies, business plans, choice of value chains (in French).",
    },
  },
  {
    cle: 'agrovita',
    nom: 'AGROVITA',
    url: { fr: `${URL_SITES.agrovita}/blog`, en: `${URL_SITES.agrovita}/en/blog` },
    texte: {
      fr: 'Les analyses de la division agricole et agro-industrielle.',
      en: 'Analyses from the agriculture and agri-business division.',
    },
  },
] as const;
