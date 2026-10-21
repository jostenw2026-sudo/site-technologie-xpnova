// Composants serveur partagés FR/EN pour le référentiel RT-TECH.
// Les pages src/app/referentiel/* et src/app/en/referentiel/* ne font que choisir la langue.

import ReferentielExplorateur from '@/components/ReferentielExplorateur';
import {
  codePrestation,
  getReferentiel,
  getSousFonction,
  IMAGE_DOMAINE,
  LIBELLES,
  type Lang,
} from '@/lib/referentiel';

export function PageReferentiel({ lang }: { lang: Lang }) {
  const data = getReferentiel(lang);
  const t = LIBELLES[lang];
  const base = lang === 'en' ? '/en' : '';
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold text-[#D4A017] mb-2">
            {data.referentiel} v{data.version} · {data.compteurs.domaines} / {data.compteurs.sousFonctions} / {data.compteurs.services}
          </p>
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">{t.referentiel}</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl mb-6">{t.intro}</p>
          <div className="p-5 bg-[#F4F5F8] border-l-4 border-[#D4A017] max-w-3xl">
            <p className="text-sm text-[#0D1F5C]">
              <strong>{t.doctrine} :</strong> {data.doctrine.perimetre}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white border-t border-[#E2E5EC]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.domaines.map((d) => (
            <a key={d.code} href={`${base}/domaines#${d.slug}`} className="p-4 border border-[#E2E5EC] rounded hover:border-[#D4A017] transition-colors">
              <span className="text-xs font-bold text-[#D4A017]">{d.code}</span>
              <p className="font-semibold text-[#0D1F5C] text-sm">{d.nom}</p>
              <p className="text-xs text-[#5A6072]">{d.transversal ? t.transversal : `${d.sousFonctions.length} ${lang === 'en' ? 'sub-functions' : 'sous-fonctions'}`}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <ReferentielExplorateur data={data} lang={lang} />
        </div>
      </section>
    </div>
  );
}

export function PageSousFonction({ slug, lang }: { slug: string; lang: Lang }) {
  const res = getSousFonction(slug, lang);
  if (!res) return null;
  const { domaine, sf } = res;
  const data = getReferentiel(lang);
  const t = LIBELLES[lang];
  const base = lang === 'en' ? '/en' : '';
  const typeLabel = (x: string) => (x === 'P' ? t.fiche.typeP : x === 'N' ? t.fiche.typeN : t.fiche.typeH);
  const enCours = /à vérifier|à confirmer|to be verified|to be confirmed|to be checked/i.test(sf.normes);
  const services = sf.servicesCles.map((c) => data.services.find((s) => s.code === c)).filter(Boolean);

  return (
    <div className="flex flex-col">
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <a href={`${base}/referentiel`} className="text-sm text-[#5A6072] hover:text-[#0D1F5C]">
            ← {t.fiche.retour}
          </a>
          <p className="text-xs font-semibold text-[#D4A017] mt-4 mb-1">
            {domaine.code} · {domaine.nom}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1F5C] mb-3">
            <span className="text-[#D4A017]">{sf.code}</span> {sf.nom}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs mb-6">
            {sf.types.map((x) => (
              <span key={x} className="px-2 py-1 rounded bg-[#F4F5F8] text-[#0D1F5C]">
                {typeLabel(x)}
              </span>
            ))}
            <span className="px-2 py-1 rounded bg-[#F4F5F8] text-[#5A6072]">{sf.vueLibelle}</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-lg font-bold text-[#0D1F5C] mb-3">{t.fiche.equipements}</h2>
              <ul className="divide-y divide-[#E2E5EC]">
                {sf.equipements.map((e) => (
                  <li key={e.code} className="py-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#0D1F5C]">
                      <span className="text-[#5A6072] font-mono text-xs mr-2">{e.code}</span>
                      {e.nom}
                    </span>
                    <span className="text-xs text-[#5A6072]">{typeLabel(e.type)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-lg font-bold text-[#0D1F5C] mb-2">{t.fiche.grandeurs}</h2>
              <p className="text-sm text-[#5A6072]">{sf.grandeurs}</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-lg font-bold text-[#0D1F5C] mb-2">{t.fiche.risques}</h2>
              <p className="text-sm text-[#5A6072]">{sf.risques}</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-lg font-bold text-[#0D1F5C] mb-2">{t.fiche.normes}</h2>
              <p className="text-sm text-[#5A6072]">{sf.normes}</p>
              {enCours && <p className="mt-2 text-xs text-[#5A6072] italic">{t.fiche.enCours}.</p>}
            </div>
          </div>

          <aside className="space-y-6">
            <img src={IMAGE_DOMAINE[domaine.code]} alt="" className="w-full h-40 object-cover rounded border border-[#E2E5EC]" loading="lazy" width={1200} height={800} />
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-sm font-bold text-[#0D1F5C] mb-2">{t.fiche.maillons}</h2>
              <p className="text-sm text-[#5A6072]">{sf.maillonsLibelles.join(' · ')}</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-sm font-bold text-[#0D1F5C] mb-3">{t.fiche.services}</h2>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s!.code} className="text-sm">
                    <p className="text-[#0D1F5C] font-semibold">
                      {s!.code} · {s!.nom}
                    </p>
                    <p className="text-xs text-[#5A6072]">{s!.livrables.join(' · ')}</p>
                    <a
                      href={`${base}/contact?prestation=${encodeURIComponent(codePrestation(sf.code, s!.code))}`}
                      className="text-xs text-[#D4A017] hover:underline"
                    >
                      {t.fiche.prestation} {codePrestation(sf.code, s!.code)} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={`${base}/contact?prestation=${encodeURIComponent(sf.code)}`}
              className="block text-center px-4 py-3 bg-[#D4A017] text-[#0D1F5C] rounded font-semibold hover:bg-[#E9C25A] transition-colors"
            >
              {t.fiche.demander}
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
