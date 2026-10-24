// Composants serveur partagés FR/EN pour le référentiel RT-TECH.
// Les pages src/app/(fr)/referentiel/* et src/app/(en)/en/referentiel/* ne font que choisir la langue.

import Image from 'next/image';
import ReferentielExplorateur from '@/components/ReferentielExplorateur';
import TitreSection from '@/components/TitreSection';
import IntroPage from '@/components/IntroPage';
import { SchemaCode } from '@/components/Schemas';
import { lienWhatsapp, MESSAGES } from '@/lib/whatsapp-public';
import { IconeWhatsApp } from '@/components/BoutonWhatsApp';
import { filArianeLd, JsonLd } from '@/components/JsonLd';
import {
  codePrestation,
  filieresDeSousFonction,
  getReferentiel,
  nomFiliere,
  getSousFonction,
  IMAGE_DOMAINE,
  LIBELLES,
  MENTION_RT_TECH,
  MENTION_RT_TECH_EN,
  referentielPublic,
  versPublique,
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
          <IntroPage cle="referentiel" lang={lang}>
            <SchemaCode lang={lang} />
          </IntroPage>
        </div>
      </section>

      <section className="py-12 px-6 bg-white border-t border-[#E2E5EC]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre={t.sections.domaines} texte={t.sections.domainesTexte} />
        </div>
        <div className="max-w-6xl mx-auto mb-6">
          <a href={`${base}/filieres`} className="inline-block px-4 py-2 border border-[#0D1F5C] rounded text-sm font-semibold text-[#0D1F5C] hover:bg-[#F4F5F8]">
            {LIBELLES[lang].filieres.titre} · 29 →
          </a>
        </div>
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
          <TitreSection titre={t.sections.explorer} texte={t.sections.explorerTexte} />
          <ReferentielExplorateur data={referentielPublic(lang)} lang={lang} />
          <p className="mt-8 text-[11px] text-[#5A6072]">{lang === 'en' ? MENTION_RT_TECH_EN : MENTION_RT_TECH}</p>
        </div>
      </section>
    </div>
  );
}

export function PageSousFonction({ slug, lang }: { slug: string; lang: Lang }) {
  const res = getSousFonction(slug, lang);
  if (!res) return null;
  const { domaine, sf: prive } = res;
  const sf = versPublique(prive);
  const data = getReferentiel(lang);
  const t = LIBELLES[lang];
  const base = lang === 'en' ? '/en' : '';
  const typeLabel = (x: string) => (x === 'P' ? t.fiche.typeP : x === 'N' ? t.fiche.typeN : t.fiche.typeH);
  const services = sf.servicesCles.map((c) => data.services.find((s) => s.code === c)).filter(Boolean);

  // Fil d'Ariane (données structurées) : accueil › référentiel › fiche, libellés existants
  // (navigation, titre du référentiel, code et nom de la sous-fonction).
  const filAriane = filArianeLd([
    { nom: lang === 'en' ? 'Home' : 'Accueil', chemin: base || '/' },
    { nom: t.referentiel, chemin: `${base}/referentiel` },
    { nom: `${sf.code} ${sf.nom}`, chemin: `${base}/referentiel/${sf.slug}` },
  ]);

  return (
    <div className="flex flex-col">
      <JsonLd data={filAriane} />
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
          <IntroPage cle="fiche" lang={lang} />
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
              <p className="text-sm text-[#5A6072]">{sf.risqueEmblematique}</p>
              {sf.nbRisques > 1 && <p className="mt-2 text-xs text-[#5A6072] italic">{t.fiche.autresRisques(sf.nbRisques)}</p>}
            </div>
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-lg font-bold text-[#0D1F5C] mb-2">{t.fiche.normes}</h2>
              {sf.normesPubliques.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {sf.normesPubliques.map((n) => (
                    <li key={n} className="px-2 py-1 text-xs rounded bg-[#F4F5F8] text-[#0D1F5C]">
                      {n}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#5A6072]">{lang === 'en' ? 'Good practice.' : 'Règles de l’art.'}</p>
              )}
              {sf.cadreNational && <p className="mt-2 text-xs text-[#5A6072] italic">{t.fiche.enCours}.</p>}
            </div>
            <div className="p-6 bg-[#0D1F5C] text-white rounded">
              <h2 className="text-lg font-bold mb-2">{t.fiche.complete}</h2>
              <p className="text-sm text-[#E4E8F3] mb-4">{t.fiche.completeTexte}</p>
              <a
                href={`${base}/contact?prestation=${encodeURIComponent(sf.code)}&fiche=complete`}
                className="inline-block px-4 py-2 bg-[#D4A017] text-[#0D1F5C] rounded text-sm font-semibold hover:bg-[#E9C25A] transition-colors"
              >
                {t.fiche.completeCta}
              </a>
            </div>
            <p className="text-[11px] text-[#5A6072]">{lang === 'en' ? MENTION_RT_TECH_EN : MENTION_RT_TECH}</p>
          </div>

          <aside className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0D1F5C] mb-1">{t.sections.mobiliser}</h2>
              <p className="text-sm text-[#5A6072]">{t.sections.mobiliserTexte}</p>
            </div>
            <Image src={IMAGE_DOMAINE[domaine.code]} alt="" className="w-full h-40 object-cover rounded border border-[#E2E5EC]" width={1200} height={800} sizes="(min-width: 1024px) 360px, 100vw" />
            <div className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-sm font-bold text-[#0D1F5C] mb-2">{t.fiche.maillons}</h2>
              <p className="text-sm text-[#5A6072]">{sf.maillonsLibelles.join(' · ')}</p>
            </div>
            {filieresDeSousFonction(sf.code, lang).length > 0 && (
              <div className="p-6 bg-white rounded border border-[#E2E5EC]">
                <h2 className="text-sm font-bold text-[#0D1F5C] mb-2">{LIBELLES[lang].filieres.filieresDeFiche}</h2>
                <ul className="flex flex-wrap gap-2">
                  {filieresDeSousFonction(sf.code, lang).map(({ filiere, niveau }) => (
                    <li key={filiere.code}>
                      <a
                        href={`${base}/filieres/${filiere.slug}`}
                        title={LIBELLES[lang].filieres.niveau[niveau]}
                        className={`inline-block px-2 py-1 text-xs rounded ${niveau === 3 ? 'bg-[#D4A017] text-[#0D1F5C]' : niveau === 2 ? 'bg-[#0D1F5C] text-white' : 'bg-[#F4F5F8] text-[#5A6072]'}`}
                      >
                        {filiere.code} {nomFiliere(filiere, lang)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
            <a
              href={lienWhatsapp(MESSAGES[lang].prestation(`${sf.code} ${sf.nom}`))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded font-semibold hover:bg-[#1ebe5b] transition-colors"
            >
              <IconeWhatsApp />
              {MESSAGES[lang].bouton}
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
