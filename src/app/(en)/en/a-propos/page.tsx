import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import TitreSection from '@/components/TitreSection';
import IntroPage from '@/components/IntroPage';

// Titre et description : ceux du layout racine (inchangés) ; liens canonical et hreflang.
export const metadata: Metadata = { alternates: alternatesPour('/en/a-propos') };

export default function AboutPageEN() {
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">About the Technology division</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            The Technology division of XP-NOVA designs and sizes the technical and digital equipment required for agro-systemic projects.
          </p>
          <IntroPage cle="aPropos" lang="en" />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre="The division in five points" texte="Positioning, approach, skills, partners and limits: enough to judge whether we are the right contact for your need." />
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Our positioning</h2>
            <p className="text-[#5A6072]">
              XP-NOVA provides engineering, studies and technical specifications. The supply of equipment, installation works and operation are entrusted to specialized service providers selected according to your needs.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Our approach</h2>
            <p className="text-[#5A6072]">
              We adopt a structured and measurable method, based on the analysis of real needs, the design of solutions adapted to the local context, and the validation of performances.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Our skills</h2>
            <p className="text-[#5A6072]">
              Our engineers cover all technical domains: mechanization, irrigation, processing, storage, cold, energy, handling and digital equipment.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Our partners</h2>
            <p className="text-[#5A6072]">
              When the required qualifications or means are not available internally, we mobilize laboratories, integrators, suppliers and specialized companies according to your needs.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Our limits</h2>
            <p className="text-[#5A6072]">
              We do not sell equipment, do not carry out installations, do not ensure maintenance and do not issue regulatory certifications. A technical verification is not a certification.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
