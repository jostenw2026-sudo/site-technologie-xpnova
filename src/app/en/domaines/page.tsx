export default function DomainesPageEN() {
  const domaines = [
    {
      title: 'Mechanization',
      enjeu:
        'Motorization and tooling determine the productivity of farms and agro-industrial units. Poorly sized, they immobilize capital and weaken profitability.',
      description:
        'Tractors, soil preparation equipment, planting and harvesting adapted to African contexts.',
      perimetre: [
        'Study of equipment needs according to area, technical itineraries and available labor.',
        'Reasoned choice between motorization, animal traction and service provision (rental/contractors).',
        'Fleet sizing and technical specifications for terms of reference.',
        'Analysis of operating costs, local availability of parts and maintenance.',
      ],
      livrables: [
        'Needs note and fleet sizing',
        'Technico-economic comparative analysis of options',
        'Terms of reference for acquisition or service provision',
      ],
      services: ['Needs analysis', 'Sizing', 'Specifications'],
    },
    {
      title: 'Irrigation and water',
      enjeu:
        'Water is the first limiting factor of productive systems. Poorly designed irrigation wastes the resource, degrades soils and compromises expected yields.',
      description:
        'Irrigation systems (drip, sprinkler, gravity), pumping, water treatment and storage.',
      perimetre: [
        'Assessment of water resources and crop water requirements.',
        'Comparison of techniques (drip, sprinkler, gravity) according to context.',
        'Sizing of pumping, networks and storage works.',
        'Specifications for treatment and sustainable resource management.',
      ],
      livrables: [
        'Hydraulic study and network sizing',
        'Comparison of techniques and their costs',
        'Terms of reference for works and equipment',
      ],
      services: ['Needs analysis', 'Sizing', 'Technical architecture'],
    },
    {
      title: 'Processing and plants',
      enjeu:
        'Processing captures added value closest to production. A poorly specified production line leads to material losses, rejects and high operating costs.',
      description:
        'Agri-food processing units, production lines, packaging equipment.',
      perimetre: [
        'Definition of process and target production capacities.',
        'General architecture of the unit: material flows, energy, utilities and spaces.',
        'Equipment and packaging line sizing.',
        'Drafting of technical specifications for calls for tenders.',
      ],
      livrables: [
        'Process and layout diagram',
        'Capacity sizing note',
        'Terms of reference for processing equipment',
      ],
      services: ['Technical architecture', 'Sizing', 'Specifications'],
    },
    {
      title: 'Storage, preservation and cold',
      enjeu:
        'Storage and cold chain reduce post-harvest losses and secure marketing. A poorly calibrated capacity increases costs without preserving products.',
      description:
        'Warehouses, silos, cold rooms, cold chain, product preservation systems.',
      perimetre: [
        'Analysis of flows, volumes and storage durations.',
        'Sizing of warehouses, silos and cold rooms.',
        'Cold chain specifications (temperature, humidity, traceability).',
        'Analysis of energy costs and adapted preservation solutions.',
      ],
      livrables: [
        'Storage and cold needs study',
        'Capacity sizing note',
        'Terms of reference for infrastructure and equipment',
      ],
      services: ['Sizing', 'Technical architecture', 'Performance verification'],
    },
    {
      title: 'Energy and utilities',
      enjeu:
        'Access to reliable and sized energy drives operating costs of any production site. A poorly chosen mix penalizes competitiveness and service continuity.',
      description:
        'Solar energy, generators, electrical networks, industrial utilities.',
      perimetre: [
        'Audit of energy needs and grid availability.',
        'Comparison of solutions (solar, generators, hybridization) according to cost and reliability.',
        'Sizing of production, storage and distribution networks.',
        'Specifications for industrial utilities (compressed air, steam, water treatment).',
      ],
      livrables: [
        'Power balance and energy demand',
        'Technico-economic comparison of energy mixes',
        'Terms of reference for equipment and networks',
      ],
      services: ['Needs analysis', 'Sizing', 'Technical architecture'],
    },
    {
      title: 'Handling and logistics',
      enjeu:
        'Internal handling determines site rates and safety. Poorly designed logistics creates bottlenecks and recurring extra costs.',
      description:
        'Conveyors, forklifts, handling systems, internal logistics equipment.',
      perimetre: [
        'Analysis of internal flows and site constraints.',
        'Design of handling circuits and intermediate storage.',
        'Equipment sizing (conveyors, lifting, racking).',
        'Technical specifications for supplier selection.',
      ],
      livrables: [
        'Flow and logistics layout diagram',
        'Handling means sizing note',
        'Equipment terms of reference',
      ],
      services: ['Technical architecture', 'Sizing', 'Specifications'],
    },
    {
      title: 'Digital equipment',
      enjeu:
        'Data and control become a performance lever of productive systems. An unsuitable digital choice generates costs without operational value.',
      description:
        'Management software, sensors and IoT, connectivity, monitoring and control systems.',
      perimetre: [
        'Expression of digital need and expected control indicators.',
        'System architecture: sensors, networks, supervision and data.',
        'Software solution and connectivity specifications.',
        'Integration framing and reception conditions.',
      ],
      livrables: [
        'Functional framing of digital need',
        'Supervision system architecture',
        'Terms of reference for solutions and integration',
      ],
      services: ['Technical architecture', 'Specifications', 'Integration assistance'],
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Our intervention domains</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            From production equipment to storage systems, including energy and connectivity, we cover all the technical needs of agro-systemic projects.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {domaines.map((domaine) => (
            <div key={domaine.title} className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">{domaine.title}</h2>
              <p className="text-[#5A6072] mb-4">{domaine.enjeu}</p>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">XP-NOVA engineering scope</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {domaine.perimetre.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Deliverables & guarantees</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {domaine.livrables.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Applicable services</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {domaine.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <a
                href="/en/contact"
                className="inline-block px-4 py-2 bg-[#D4A017] text-white rounded text-sm font-semibold hover:bg-[#B8860B] transition-colors"
              >
                Request expertise
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
