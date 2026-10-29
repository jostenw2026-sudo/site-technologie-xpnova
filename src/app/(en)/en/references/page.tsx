import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import TitreSection from '@/components/TitreSection';
import IntroPage from '@/components/IntroPage';

// Titre : traduction de celui de la page française (tableau de référencement validé par la
// direction le 24/10/2026). Description : celle du layout racine, à rédiger quand des
// références seront publiées. D'ici là, page hors index (noindex, liens suivis) et hors sitemap,
// comme la page française. Liens canonical et hreflang.
export const metadata: Metadata = {
  alternates: alternatesPour('/en/references'),
  title: 'Technical engineering projects — TECHNOLOGY XP-NOVA',
  robots: { index: false, follow: true },
};

export default function ReferencesPageEN() {
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Technical engineering projects</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            References will be published once documented: XP-NOVA’s exact role, client, location and period.
          </p>
          <IntroPage cle="references" lang="en" />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre="Documented missions" texte="XP-NOVA's exact role, client, location and period for each published reference; nothing is shown before it is verified." />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded border border-[#E2E5EC] mb-8">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Coming soon</h2>
            <p className="text-[#5A6072]">
              Detailed references will be added after validation by the General Management. Each reference will mention the exact role of XP-NOVA, the client, the location, the period and the deliverable.
            </p>
          </div>

          <div className="p-6 bg-[#F4F5F8] border-l-4 border-[#D4A017]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Important note</h2>
            <p className="text-[#5A6072]">
              The references presented here reflect the engineering role of XP-NOVA. Performance results, certifications and operational impacts depend on the supply, installation and operation service providers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
