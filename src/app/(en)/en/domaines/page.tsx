import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import Image from 'next/image';
import TitreSection from '@/components/TitreSection';
import { SchemaFlux } from '@/components/Schemas';
import IntroPage from '@/components/IntroPage';
import { getReferentiel } from '@/lib/referentiel';

// Titre et description : traduction de ceux de la page française (tableau de référencement
// validé par la direction le 24/10/2026) ; liens canonical et hreflang.
export const metadata: Metadata = {
  alternates: alternatesPour('/en/domaines'),
  title: 'Domains of intervention — Technology XP-NOVA',
  description:
    'Mechanization, irrigation, processing, storage, cold chain, energy, handling, digital: the domains of intervention of the Technology division.',
};

// The 8 cards follow the T1..T8 order of the RT-TECH reference (src/content/rt-tech.en.json).
const REF = getReferentiel('en').domaines;

export default function DomainesPage() {
  const domaines = [
    {
      title: 'Mechanization',
      image: '/images/illustrations/mecanisation.webp',
      enjeu:
        "Motorization and equipment determine the productivity of farms and agro-industrial units. Poorly sized, they immobilize capital and weaken profitability.",
      description:
        'Tractors, soil tillage equipment, seeding and harvesting adapted to African contexts.',
      perimetre: [
        "Study of equipment needs based on surface area, technical itineraries and available labor.",
        "Informed choice between motorization, animal traction and service provision (rental/contractors).",
        'Sizing of fleets and technical specifications for tender documents.',
        "Analysis of operating costs, local spare parts availability and maintenance.",
      ],
      livrables: [
        "Needs and fleet sizing report",
        'Comparative technical-economic analysis of options',
        "Specifications for acquisition or service provision",
      ],
      services: ['Needs Analysis', 'Sizing', 'Specifications'],
    },
    {
      title: 'Irrigation and Water',
      image: '/images/illustrations/irrigation-eau.webp',
      enjeu:
        "Water is the primary limiting factor for productive systems. Poorly designed irrigation wastes resources, degrades soils and compromises expected yields.",
      description:
        "Irrigation systems (drip, sprinkler, gravity), pumping, water treatment and storage.",
      perimetre: [
        "Assessment of water resources and crop water requirements.",
        "Comparison of techniques (drip, sprinkler, gravity) according to context.",
        "Sizing of pumping, networks and storage facilities.",
        "Specifications for treatment and sustainable resource management.",
      ],
      livrables: [
        'Hydraulic study and network sizing',
        'Comparison of techniques and their costs',
        "Specifications for structures and equipment",
      ],
      services: ['Needs Analysis', 'Sizing', 'Technical Architecture'],
    },
    {
      title: 'Controlled production environments',
      image: '/images/illustrations/serres-agricoles.webp',
      enjeu:
        "Greenhouses protect crops from climatic hazards and enable microclimate control. Poorly designed, they generate overheating, diseases and yields below expectations.",
      description:
        'Multi-tunnel greenhouses, chapel structures, ventilation, shading, integrated irrigation, climate management.',
      perimetre: [
        "Sizing of structures and surfaces according to crops and local climate.",
        "Choice of covering materials (polyethylene film, polycarbonate, glass) and anchoring systems.",
        "Design of natural or mechanical ventilation, shading and misting systems.",
        "Integration of localized irrigation and climate control (sensors, regulation).",
        "Design of livestock buildings, hatcheries and aquaculture ponds: ventilation, watering, effluents and biosecurity.",
      ],
      livrables: [
        'Greenhouse sizing and layout report',
        'Technical specifications for structures and climate equipment',
        "Specifications for acquisition and construction",
      ],
      services: ['Technical Architecture', 'Sizing', 'Specifications'],
    },
    {
      title: 'Processing and Plants',
      image: '/images/illustrations/transformation-usines.webp',
      enjeu:
        "Processing captures added value close to production. A poorly specified production line leads to material losses, rejects and high operating costs.",
      description:
        'Agri-food processing units, production lines, packaging equipment.',
      perimetre: [
        "Definition of the process and target production capacities.",
        "General plant architecture: material, energy, utilities and space flows.",
        "Sizing of equipment and packaging lines.",
        "Drafting of technical specifications for tenders.",
      ],
      livrables: [
        'Process and layout diagram',
        'Capacity sizing report',
        "Specifications for processing equipment",
      ],
      services: ['Technical Architecture', 'Sizing', 'Specifications'],
    },
    {
      title: 'Storage, Preservation and Cold Chain',
      image: '/images/illustrations/stockage-froid.webp',
      enjeu:
        "Storage and cold chain reduce post-harvest losses and secure marketing. Poorly calibrated capacity increases costs without preserving products.",
      description:
        'Warehouses, silos, cold rooms, cold chain, product preservation systems.',
      perimetre: [
        "Analysis of flows, volumes and preservation durations.",
        "Sizing of warehouses, silos and cold rooms.",
        "Cold chain specifications (temperature, humidity, traceability).",
        "Analysis of energy costs and adapted preservation solutions.",
      ],
      livrables: [
        'Storage and cold chain requirements study',
        'Capacity sizing report',
        "Specifications for infrastructure and equipment",
      ],
      services: ['Sizing', 'Technical Architecture', 'Performance Verification'],
    },
    {
      title: 'Energy and Utilities',
      image: '/images/illustrations/energie-utilites.webp',
      enjeu:
        "Access to reliable and properly sized energy drives the operating costs of any production site. A poorly chosen mix penalizes competitiveness and service continuity.",
      description:
        'Solar energy, generators, electrical networks, industrial utilities.',
      perimetre: [
        "Audit of energy needs and grid availability.",
        "Comparison of solutions (solar, generators, hybridization) by cost and reliability.",
        "Sizing of production, storage and distribution networks.",
        "Specifications for industrial utilities (compressed air, steam, water treatment).",
      ],
      livrables: [
        'Power and energy demand balance',
        'Technical-economic comparison of energy mixes',
        "Specifications for equipment and networks",
      ],
      services: ['Needs Analysis', 'Sizing', 'Technical Architecture'],
    },
    {
      title: 'Handling and Logistics',
      image: '/images/illustrations/manutention-logistique.webp',
      enjeu:
        "Internal handling determines site throughput and safety. Poorly designed logistics create bottlenecks and recurring extra costs.",
      description:
        "Conveyors, forklifts, handling systems, internal logistics equipment.",
      perimetre: [
        "Analysis of internal flows and site constraints.",
        "Design of handling circuits and intermediate storage.",
        "Sizing of equipment (conveyors, lifting, racking).",
        "Technical specifications for supplier selection.",
      ],
      livrables: [
        'Flow and logistics layout diagram',
        'Handling equipment sizing report',
        "Equipment specifications",
      ],
      services: ['Technical Architecture', 'Sizing', 'Specifications'],
    },
    {
      title: 'Digital Equipment',
      image: '/images/illustrations/equipements-numeriques.webp',
      enjeu:
        "Data and control become a performance lever for production systems. An unsuitable digital choice generates costs without operational value.",
      description:
        'Management software, sensors and IoT, connectivity, monitoring and control systems.',
      perimetre: [
        "Expression of digital needs and expected management indicators.",
        "System architecture: sensors, networks, supervision and data.",
        "Specifications for software solutions and connectivity.",
        "Framework for integration and acceptance conditions.",
      ],
      livrables: [
        'Functional framework for digital needs',
        'Supervision system architecture',
        "Specifications for solutions and integration",
      ],
      services: ['Technical Architecture', 'Specifications', "Integration Support"],
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Our Domains of Intervention</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            From production equipment to storage systems, through energy and connectivity, we cover all technical needs of agro-systemic projects.
          </p>
          <IntroPage cle="domaines" lang="en">
            <SchemaFlux lang="en" />
          </IntroPage>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre="The eight domains" texte="Each card states the engineering scope, the deliverables and the sub-functions of the domain; click a sub-function to open its sheet." />
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {domaines.map((domaine, index) => (
            <div key={domaine.title} id={REF[index]?.slug} className="bg-white rounded border border-[#E2E5EC] overflow-hidden flex flex-col scroll-mt-32">
              {/* Illustration générée par IA, hébergée par le site : mention unique en bas de la liste (DG, 20/10/2026). */}
              <Image src={domaine.image} alt={`Illustration — ${domaine.title}`} className="w-full h-48 object-cover" width={1200} height={800} sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw" />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">
                  <span className="text-[#D4A017] mr-2">{REF[index]?.code}</span>
                  {domaine.title}
                </h2>
                <p className="text-[#5A6072] mb-4">{domaine.enjeu}</p>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">XP-NOVA Engineering Scope</h3>
                  <ul className="text-sm text-[#5A6072] list-disc list-inside">
                    {domaine.perimetre.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Deliverables & Guarantees</h3>
                  <ul className="text-sm text-[#5A6072] list-disc list-inside">
                    {domaine.livrables.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Applicable Services</h3>
                  <ul className="text-sm text-[#5A6072] list-disc list-inside">
                    {domaine.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
                {REF[index] && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Reference sub-functions</h3>
                    <ul className="flex flex-wrap gap-2">
                      {REF[index].sousFonctions.map((sf) => (
                        <li key={sf.code}>
                          <a href={`/en/referentiel/${sf.slug}`} className="inline-block px-2 py-1 text-xs rounded bg-[#F4F5F8] text-[#0D1F5C] hover:bg-[#E9C25A] transition-colors">
                            <span className="font-semibold">{sf.code}</span> {sf.nom}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <a
                  href="/en/contact"
                  className="mt-auto inline-block px-4 py-2 bg-[#D4A017] text-[#0D1F5C] rounded text-sm font-semibold hover:bg-[#E9C25A] transition-colors self-start"
                >
                  Request Expertise
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="max-w-6xl mx-auto mt-8 text-[11px] leading-snug text-[#5A6072]">Illustrations on this page are generated and for information only.</p>
      </section>
    </div>
  );
}
