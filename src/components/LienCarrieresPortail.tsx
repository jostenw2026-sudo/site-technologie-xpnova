import { URL_SITES } from '@/lib/sites';

// Renvoi vers le portail (29/10/2026) : les offres de toutes les divisions et la base
// d'experts du groupe sont publiées sur xp-nova.com/carrieres et /experts.
const TEXTES = {
  fr: {
    titre: "Carrières XP-NOVA",
    texte: "Les offres de toutes les divisions et la base d’experts du groupe sont réunies sur le portail XP-NOVA.",
    offres: "Voir toutes les offres du groupe",
    experts: "Rejoindre la base d’experts",
  },
  en: {
    titre: "XP-NOVA careers",
    texte: "Openings across all divisions and the group’s expert database are gathered on the XP-NOVA portal.",
    offres: "See all group openings",
    experts: "Join the expert database",
  },
};

export default function LienCarrieresPortail({ lang }: { lang: 'fr' | 'en' }) {
  const t = TEXTES[lang];
  const base = `${URL_SITES.portail}${lang === 'en' ? '/en' : ''}`;
  return (
    <aside aria-label={t.titre} className="mt-8 p-6 bg-[#F4F5F8] rounded border border-[#E2E5EC] border-l-4 border-l-[#D4A017] max-w-3xl">
      <p className="font-semibold text-[#0D1F5C] mb-2">{t.titre}</p>
      <p className="text-[#5A6072] mb-4">{t.texte}</p>
      <div className="flex flex-wrap gap-3">
        <a href={`${base}/carrieres`} className="inline-block px-5 py-3 rounded bg-[#0D1F5C] text-white font-semibold hover:bg-[#1A2F7A]">
          {t.offres} →
        </a>
        <a href={`${base}/experts`} className="inline-block px-5 py-3 rounded border-2 border-[#0D1F5C] text-[#0D1F5C] font-semibold hover:bg-white">
          {t.experts} →
        </a>
      </div>
    </aside>
  );
}
