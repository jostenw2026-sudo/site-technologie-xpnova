import type { ReactNode } from 'react';
import { INTROS, type CleIntro } from '@/content/intros';

// Chapeau pédagogique commun à toutes les pages : un titre, un paragraphe, trois repères
// et, quand il aide à comprendre, un schéma passé en enfant (src/components/Schemas.tsx).

export default function IntroPage({ cle, lang = 'fr', children }: { cle: CleIntro; lang?: 'fr' | 'en'; children?: ReactNode }) {
  const intro = INTROS[lang][cle];
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className={`${children ? 'lg:col-span-2' : 'lg:col-span-5'} p-6 bg-[#F4F5F8] border-l-4 border-[#D4A017] rounded-r`}>
        <h2 className="text-base font-bold text-[#0D1F5C] mb-2">{intro.titre}</h2>
        <p className="text-sm text-[#0D1F5C] mb-4">{intro.texte}</p>
        <ul className="space-y-2">
          {intro.points.map((p) => (
            <li key={p} className="flex gap-2 text-sm text-[#5A6072]">
              <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D4A017]" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      {children && <div className="lg:col-span-3 p-4 bg-white border border-[#E2E5EC] rounded">{children}</div>}
    </div>
  );
}
