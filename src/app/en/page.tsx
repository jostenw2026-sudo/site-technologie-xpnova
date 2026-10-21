import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Equipment and Systems Engineering | XP-NOVA',
  description: 'We design and size technical and digital equipment for agro-systemic projects, from mechanization to cold chain, including irrigation and connectivity systems.',
};

export default function HomeEN() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-6 bg-[#22364A] text-white border-b-4 border-[#D4A017] sur-fonce">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering of technical equipment and systems
          </h1>
          <p className="text-lg text-[#E4E8F3] max-w-3xl">
            We design and size the technical and digital equipment required for your agro-systemic projects, from mechanization to cold chain, including irrigation and connectivity systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/en/contact"
              className="px-6 py-3 bg-[#D4A017] text-[#0D1F5C] rounded font-semibold hover:bg-[#E9C25A] transition-colors"
            >
              Request technical expertise
            </a>
            <a
              href="/en/domaines"
              className="px-6 py-3 border-2 border-white/70 text-white rounded font-semibold hover:bg-white/10 transition-colors"
            >
              Discover our domains
            </a>
          </div>
        </div>
      </section>

      {/* Distinction */}
      <section className="py-8 px-6 bg-[#F4F5F8] border-l-4 border-[#D4A017]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#0D1F5C]">
            <strong>Our role:</strong> XP-NOVA provides engineering, studies and technical specifications. The supply of equipment, installation works and operation are entrusted to specialized service providers selected according to your needs.
          </p>
        </div>
      </section>

      {/* Domains */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-4">8 domains for complete projects</h2>
          <p className="text-[#5A6072] mb-8">
            From production equipment to storage systems, including energy and connectivity, we cover all the technical needs of agro-systemic projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Mechanization',
                description: 'Tractors, soil preparation equipment, planting and harvesting adapted to African contexts.',
              },
              {
                title: 'Irrigation and water',
                description: 'Irrigation systems (drip, sprinkler, gravity), pumping, water treatment and storage.',
              },
              {
                title: 'Controlled production environments',
                description: 'Greenhouses, tunnels and shade houses, livestock buildings, hatcheries and aquaculture: climate control and biosecurity.',
              },
              {
                title: 'Processing and plants',
                description: 'Agri-food processing units, production lines, packaging equipment.',
              },
              {
                title: 'Storage, preservation and cold',
                description: 'Warehouses, silos, cold rooms, cold chain, product preservation systems.',
              },
              {
                title: 'Energy and utilities',
                description: 'Solar energy, generators, electrical networks, industrial utilities.',
              },
              {
                title: 'Handling and logistics',
                description: 'Conveyors, forklifts, handling systems, internal logistics equipment.',
              },
              {
                title: 'Digital equipment',
                description: 'Management software, sensors and IoT, connectivity, monitoring and control systems.',
              },
            ].map((domaine) => (
              <a
                key={domaine.title}
                href="/en/domaines"
                className="p-6 border border-[#E2E5EC] rounded hover:border-[#D4A017] transition-colors block"
              >
                <h3 className="font-semibold text-[#0D1F5C] mb-2">{domaine.title}</h3>
                <p className="text-sm text-[#5A6072]">{domaine.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-4">10 services for informed choices</h2>
          <p className="text-[#5A6072] mb-8">
            We support your projects from needs analysis to equipment reception, including specification design and solution selection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Needs analysis',
                description: 'Diagnosis of technical needs, audit of existing systems and definition of objectives.',
              },
              {
                title: 'Variants',
                description: 'Study of alternative solutions, technico-economic comparison and reasoned recommendation.',
              },
              {
                title: 'Technical architecture',
                description: 'Design of system architecture, functional diagrams and data flows.',
              },
              {
                title: 'Sizing',
                description: 'Calculation of required capacities: flow rates, powers and storage capacities.',
              },
              {
                title: 'Specifications',
                description: 'Drafting of technical specifications for your calls for tenders.',
              },
              {
                title: 'Offer analysis',
                description: 'Compliance verification and technico-economic analysis of received offers.',
              },
              {
                title: 'Testing',
                description: 'Design of test protocols to verify equipment compliance.',
              },
              {
                title: 'Performance verification',
                description: 'On-site performance tests and validation of capacities in real conditions.',
              },
              {
                title: 'Reception assistance',
                description: 'Final verification, team training and transfer documentation.',
              },
              {
                title: 'Integration support',
                description: 'Integration plan, interface specifications and functional acceptance of digital systems.',
              },
            ].map((service) => (
              <a
                key={service.title}
                href="/en/services"
                className="p-4 bg-white rounded border border-[#E2E5EC] hover:border-[#D4A017] transition-colors block"
              >
                <h3 className="font-semibold text-[#0D1F5C] mb-2">{service.title}</h3>
                <p className="text-sm text-[#5A6072]">{service.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 bg-[#0D1F5C] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Does your project need technical expertise?</h2>
          <p className="mb-8 text-[#D4A017]">
            Our engineers support you in the design and sizing of equipment and technical systems adapted to your context.
          </p>
          <a
            href="/en/contact"
            className="inline-block px-6 py-3 bg-[#D4A017] text-[#0D1F5C] rounded font-semibold hover:bg-[#E9C25A] transition-colors"
          >
            Request technical expertise
          </a>
        </div>
      </section>
    </div>
  );
}
