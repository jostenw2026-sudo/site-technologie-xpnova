import { FAQ } from '@/content/faq';
import { INTROS } from '@/content/intros';
import IntroPage from '@/components/IntroPage';
import Illustration from '@/components/Illustration';
import { lienWhatsapp, MESSAGES } from '@/lib/whatsapp-public';
import { JsonLd } from '@/components/JsonLd';

// Page FAQ FR/EN : accordéons natifs <details>, aucun script ; données JSON-LD FAQPage
// pour le référencement. Contenu dans src/content/faq.ts.

export default function PageFaq({ lang }: { lang: 'fr' | 'en' }) {
  const themes = FAQ[lang];
  const base = lang === 'en' ? '/en' : '';
  const t =
    lang === 'en'
      ? { titre: 'Frequently asked questions', lead: 'What prospects, cooperatives, donors and local authorities ask us before engaging the TECHNOLOGY division.', autre: 'Your question is not here?', cta: 'Ask us', wa: 'or on WhatsApp' }
      : { titre: 'Questions fréquentes', lead: 'Ce que promoteurs, coopératives, bailleurs et collectivités nous demandent avant d’engager la division TECHNOLOGIE.', autre: 'Votre question n’est pas là ?', cta: 'Posez-la nous', wa: 'ou sur WhatsApp' };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: themes.flatMap((th) => th.questions.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.r } }))),
  };

  return (
    <div className="flex flex-col">
      <JsonLd data={jsonLd} />
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">{t.titre}</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {themes.map((th) => (
              <a key={th.theme} href={`#${ancre(th.theme)}`} className="px-3 py-1.5 text-sm rounded border border-[#E2E5EC] text-[#0D1F5C] hover:border-[#D4A017]">
                {th.theme}
              </a>
            ))}
          </div>
          <Illustration src="/images/illustrations/faq.webp" alt={lang === 'en' ? 'Cooperative members reviewing an equipment study with an engineer' : "Membres d'une coopérative examinant une étude d'équipement avec un ingénieur"} lang={lang} />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-4xl mx-auto space-y-10">
          {themes.map((th) => (
            <div key={th.theme} id={ancre(th.theme)} className="scroll-mt-32">
              <h2 className="text-xl font-bold text-[#0D1F5C] mb-1">{th.theme}</h2>
              <p className="text-sm text-[#5A6072] mb-4">{th.fonction}</p>
              <div className="space-y-3">
                {th.questions.map((q) => (
                  <details key={q.q} className="group bg-white rounded border border-[#E2E5EC] open:border-[#D4A017]">
                    <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4 font-semibold text-[#0D1F5C]">
                      <span>{q.q}</span>
                      <span className="text-[#D4A017] transition-transform group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-[#5A6072]">
                      <p>{q.r}</p>
                      {q.lien && (
                        <a href={q.lien.href} className="inline-block mt-3 text-[#0D1F5C] underline hover:text-[#D4A017]">
                          {q.lien.label} →
                        </a>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="p-6 bg-white rounded border border-[#E2E5EC] flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="flex-1 text-[#0D1F5C] font-semibold">{t.autre}</p>
            <a href={`${base}/contact`} className="px-4 py-2 bg-[#D4A017] text-[#0D1F5C] rounded font-semibold hover:bg-[#E9C25A] transition-colors text-center">
              {t.cta}
            </a>
            <a href={lienWhatsapp(MESSAGES[lang].defaut)} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5A6072] underline">
              {t.wa}
            </a>
          </div>
          <p className="text-xs text-[#5A6072]">{INTROS[lang].contact.points[0]}</p>
        </div>
      </section>
    </div>
  );
}

function ancre(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
