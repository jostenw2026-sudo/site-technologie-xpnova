// Entrée « par filière » du référentiel RT-TECH (lot validé le 21/10/2026).
// 29 filières AGROVITA × sous-fonctions, niveau 3 essentiel / 2 fréquent / 1 occasionnel.
// Seuls les champs publics des sous-fonctions sont affichés (code, nom, domaine).

import TitreSection from '@/components/TitreSection';
import { getFiliere, getFilieres, getReferentiel, getSousFonctions, LIBELLES, nomFiliere, type Lang } from '@/lib/referentiel';
import { URL_SITES } from '@/lib/sites';

const DP_LABEL: Record<string, { fr: string; en: string }> = {
  DP1: { fr: 'Agriculture', en: 'Agriculture' },
  DP2: { fr: 'Élevage', en: 'Livestock' },
  DP6: { fr: 'Halieutique et aquacole', en: 'Fisheries and aquaculture' },
  DP7: { fr: 'Forestier', en: 'Forestry' },
};
const NIVEAU_CLASSE: Record<number, string> = {
  3: 'bg-[#D4A017] text-[#0D1F5C]',
  2: 'bg-[#0D1F5C] text-white',
  1: 'bg-[#F4F5F8] text-[#5A6072]',
};

function Chapeau({ lang }: { lang: Lang }) {
  const t = LIBELLES[lang].filieres;
  return (
    <div className="mt-8 p-6 bg-[#F4F5F8] border-l-4 border-[#D4A017] rounded-r max-w-3xl">
      <h2 className="text-base font-bold text-[#0D1F5C] mb-2">{t.chapeau}</h2>
      <p className="text-sm text-[#0D1F5C]">{t.chapeauTexte}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {[3, 2, 1].map((n) => (
          <span key={n} className={`px-2 py-1 rounded ${NIVEAU_CLASSE[n]}`}>
            {t.niveau[n]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PageFilieres({ lang }: { lang: Lang }) {
  const t = LIBELLES[lang].filieres;
  const base = lang === 'en' ? '/en' : '';
  const filieres = getFilieres(lang);
  const groupes = ['DP1', 'DP2', 'DP6', 'DP7'];
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">{t.titre}</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">{t.intro}</p>
          <Chapeau lang={lang} />
        </div>
      </section>
      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto space-y-10">
          {groupes.map((dp) => (
            <div key={dp}>
              <TitreSection
                titre={`${dp} · ${DP_LABEL[dp][lang]}`}
                texte={lang === 'en' ? `${filieres.filter((f) => f.maillon === dp).length} value chains in this link of the chain.` : `${filieres.filter((f) => f.maillon === dp).length} filières dans ce maillon de la chaîne de valeur.`}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filieres
                  .filter((f) => f.maillon === dp)
                  .map((f) => {
                    const ess = f.sousFonctions.filter((s) => s.niveau === 3).length;
                    return (
                      <a key={f.code} href={`${base}/filieres/${f.slug}`} className="p-5 bg-white rounded border border-[#E2E5EC] hover:border-[#D4A017] transition-colors block">
                        <span className="text-xs font-bold text-[#D4A017]">{f.code}</span>
                        <h3 className="font-semibold text-[#0D1F5C] mb-2">{nomFiliere(f, lang)}</h3>
                        <p className="text-xs text-[#5A6072]">
                          {f.sousFonctions.length} {lang === 'en' ? 'sub-functions' : 'sous-fonctions'} · {ess} {lang === 'en' ? 'essential' : 'essentielles'}
                        </p>
                      </a>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function PageFiliere({ slug, lang }: { slug: string; lang: Lang }) {
  const f = getFiliere(slug, lang);
  if (!f) return null;
  const t = LIBELLES[lang].filieres;
  const base = lang === 'en' ? '/en' : '';
  const data = getReferentiel(lang);
  const sfIndex = new Map(getSousFonctions(lang).map((s) => [s.code, s]));
  const domIndex = new Map(data.domaines.flatMap((d) => d.sousFonctions.map((s) => [s.code, d])));
  const parNiveau = [3, 2, 1].map((n) => ({ n, items: f.sousFonctions.filter((s) => s.niveau === n) }));
  return (
    <div className="flex flex-col">
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <a href={`${base}/filieres`} className="text-sm text-[#5A6072] hover:text-[#0D1F5C]">
            ← {t.retour}
          </a>
          <p className="text-xs font-semibold text-[#D4A017] mt-4 mb-1">
            {f.maillon} · {DP_LABEL[f.maillon][lang]}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1F5C] mb-3">
            <span className="text-[#D4A017]">{f.code}</span> {nomFiliere(f, lang)}
          </h1>
          {/* Fiche filière d'AGROVITA (/filieres/fv01, /en/filieres/fv01 : code en minuscules), dans la langue de la page */}
          <a href={`${URL_SITES.agrovita}${base}/filieres/${f.code.toLowerCase()}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0D1F5C] underline hover:text-[#D4A017]">
            {t.agrovita} ↗
          </a>
          <Chapeau lang={lang} />
        </div>
      </section>
      <section className="py-12 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre={t.mobilise} texte={lang === 'en' ? 'Click a sub-function to open its reference sheet.' : 'Cliquez une sous-fonction pour ouvrir sa fiche du référentiel.'} />
          {parNiveau.map(({ n, items }) =>
            items.length === 0 ? null : (
              <div key={n} className="mb-8">
                <h3 className="text-sm font-bold text-[#0D1F5C] mb-3">
                  <span className={`px-2 py-1 rounded text-xs mr-2 ${NIVEAU_CLASSE[n]}`}>{t.niveau[n]}</span>
                  {items.length}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map(({ code }) => {
                    const sf = sfIndex.get(code);
                    const d = domIndex.get(code);
                    if (!sf || !d) return null;
                    return (
                      <a key={code} href={`${base}/referentiel/${sf.slug}`} className="p-4 bg-white rounded border border-[#E2E5EC] hover:border-[#D4A017] transition-colors block">
                        <span className="text-xs font-bold text-[#D4A017] mr-2">{sf.code}</span>
                        <span className="font-semibold text-[#0D1F5C]">{sf.nom}</span>
                        <p className="text-xs text-[#5A6072] mt-1">{d.nom}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
