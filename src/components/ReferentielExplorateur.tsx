'use client';

import { useMemo, useState } from 'react';
import type { Lang, Referentiel } from '@/lib/referentiel';
import { LIBELLES } from '@/lib/referentiel';

// Explorateur filtrable du référentiel RT-TECH (page /referentiel).
// Les filtres se combinent (ET) ; les compteurs se recalculent côté navigateur.

export default function ReferentielExplorateur({ data, lang }: { data: Referentiel; lang: Lang }) {
  const t = LIBELLES[lang];
  const base = lang === 'en' ? '/en' : '';
  const [domaine, setDomaine] = useState('');
  const [type, setType] = useState('');
  const [maillon, setMaillon] = useState('');
  const [vue, setVue] = useState('');

  const lignes = useMemo(
    () =>
      data.domaines.flatMap((d) =>
        d.sousFonctions
          .filter((sf) => !domaine || d.code === domaine)
          .filter((sf) => !type || sf.types.includes(type as 'P' | 'N' | 'H'))
          .filter((sf) => !maillon || sf.maillons.includes(maillon) || sf.maillons.includes('ALL'))
          .filter((sf) => !vue || sf.vue === vue)
          .map((sf) => ({ d, sf })),
      ),
    [data, domaine, type, maillon, vue],
  );

  const select = 'p-2 border border-[#E2E5EC] rounded bg-white text-sm text-[#0D1F5C] focus:outline-none focus:border-[#D4A017]';

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <label className="text-xs font-semibold text-[#0D1F5C]">
          {t.filtres.domaine}
          <select className={`${select} w-full mt-1`} value={domaine} onChange={(e) => setDomaine(e.target.value)}>
            <option value="">{t.filtres.tous}</option>
            {data.domaines.map((d) => (
              <option key={d.code} value={d.code}>
                {d.code} · {d.nom}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#0D1F5C]">
          {t.filtres.type}
          <select className={`${select} w-full mt-1`} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">{t.filtres.tous}</option>
            {data.types.map((x) => (
              <option key={x.code} value={x.code}>
                {x.nom}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#0D1F5C]">
          {t.filtres.maillon}
          <select className={`${select} w-full mt-1`} value={maillon} onChange={(e) => setMaillon(e.target.value)}>
            <option value="">{t.filtres.tous}</option>
            {data.maillons.map((m) => (
              <option key={m.code} value={m.code}>
                {m.code} · {m.nom}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-[#0D1F5C]">
          {t.filtres.vue}
          <select className={`${select} w-full mt-1`} value={vue} onChange={(e) => setVue(e.target.value)}>
            <option value="">{t.filtres.tous}</option>
            {data.vues.map((v) => (
              <option key={v.code} value={v.code}>
                {v.nom}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#5A6072]">{t.resultats(lignes.length)}</p>
        {(domaine || type || maillon || vue) && (
          <button
            type="button"
            onClick={() => {
              setDomaine('');
              setType('');
              setMaillon('');
              setVue('');
            }}
            className="text-sm text-[#0D1F5C] underline"
          >
            {t.filtres.reinit}
          </button>
        )}
      </div>

      {lignes.length === 0 ? (
        <p className="p-6 bg-white rounded border border-[#E2E5EC] text-[#5A6072]">{t.aucun}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lignes.map(({ d, sf }) => (
            <a
              key={sf.code}
              href={`${base}/referentiel/${sf.slug}`}
              className="p-5 bg-white rounded border border-[#E2E5EC] hover:border-[#D4A017] transition-colors block"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-xs font-bold text-[#D4A017]">{sf.code}</span>
                <span className="text-xs text-[#5A6072]">{d.nom}</span>
              </div>
              <h3 className="font-semibold text-[#0D1F5C] mb-2">{sf.nom}</h3>
              <p className="text-sm text-[#5A6072] mb-3">{sf.equipements.map((e) => e.nom).join(' · ')}</p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {sf.types.map((x) => (
                  <span key={x} className="px-2 py-0.5 rounded bg-[#F4F5F8] text-[#0D1F5C]">
                    {x}
                  </span>
                ))}
                <span className="px-2 py-0.5 rounded bg-[#F4F5F8] text-[#5A6072]">{sf.vueLibelle}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
