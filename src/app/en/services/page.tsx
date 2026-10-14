export default function ServicesPageEN() {
  const services = [
    {
      title: 'Needs analysis',
      objectif:
        'Frame the technical need precisely before any commitment: understand the existing situation, identify gaps and define verifiable objectives.',
      description:
        'Diagnosis of technical needs, audit of existing systems, identification of gaps, definition of objectives and constraints.',
      livrables: ['Needs analysis report', 'Existing systems mapping', 'Gap identification'],
      role:
        'XP-NOVA acts as an independent advisor, with no ties to suppliers: the analysis does not orient towards a specific brand or technology.',
      duree: '5 to 10 days',
    },
    {
      title: 'Variants',
      objectif:
        'Inform a decision by comparing alternative solutions objectively, based on explicit technical and economic criteria.',
      description:
        'Study of alternative solutions, technico-economic comparison, risk analysis, reasoned recommendation.',
      livrables: ['Variants study', 'Technico-economic comparison', 'Recommendation'],
      role:
        'The recommendation is reasoned and traceable: XP-NOVA remains impartial towards suppliers and receives no commission.',
      duree: '10 to 15 days',
    },
    {
      title: 'Technical architecture',
      objectif:
        'Design the overall system architecture to ensure consistency of equipment, flows and interfaces before any purchase.',
      description:
        'Design of technical architecture, functional diagrams, data flows, equipment interfaces, global sizing.',
      livrables: ['Functional diagrams', 'System architecture', 'Sizing note'],
      role:
        'The role of XP-NOVA is to architect and specify: physical implementation remains entrusted to service providers according to the mandate.',
      duree: '10 to 20 days',
    },
    {
      title: 'Sizing',
      objectif:
        'Determine exactly the necessary capacities to avoid costly oversizing as well as risky undersizing.',
      description:
        'Calculation of required capacities for each equipment and for the overall system: flow rates, powers, storage capacities.',
      livrables: ['Sizing calculations', 'Calculation notes', 'Capacity specifications'],
      role:
        'Calculations are based on documented and verifiable assumptions, provided to the client for any subsequent validation.',
      duree: '5 to 15 days',
    },
    {
      title: 'Specifications',
      objectif:
        'Transform the need into enforceable specifications, in order to launch fair and comparable consultations between suppliers.',
      description:
        'Drafting of technical specifications for your calls for tenders: detailed specifications, evaluation criteria, selection grid.',
      livrables: ['Technical specifications', 'Evaluation grid', 'Selection criteria'],
      role:
        'The specifications are written without favoring a supplier: the selection criteria are neutral and weighted in advance.',
      duree: '10 to 15 days',
    },
    {
      title: 'Offer analysis',
      objectif:
        'Review and compare received offers rigorously to objectify the supplier choice, beyond price alone.',
      description:
        'Analysis of offers received from suppliers: compliance verification, technico-economic analysis, risk identification.',
      livrables: ['Comparative analysis', 'Evaluation grid', 'Choice recommendation'],
      role:
        'The review is impartial and documented: XP-NOVA controls the compliance of offers with specifications, without bias.',
      duree: '5 to 10 days',
    },
    {
      title: 'Testing',
      objectif:
        'Verify, through test protocols, that the delivered equipment actually meets the specifications before commissioning.',
      description:
        'Design of test protocols to verify equipment compliance with specifications: performance tests, safety tests.',
      livrables: ['Test protocols', 'Verification grids', 'Test reports'],
      role:
        'XP-NOVA defines and supervises tests as a trusted third party; material execution remains with the supplier or a service provider.',
      duree: 'Depending on complexity',
    },
    {
      title: 'Performance verification',
      objectif:
        'Measure on site that actual performances reach contractual thresholds, in real operating conditions.',
      description:
        'On-site performance tests: measurement of actual flow rates, capacity verification, threshold validation, tests in real conditions.',
      livrables: ['Test report', 'Capacity validation', 'Compliance certificate'],
      role:
        'Verification is factual and traced; it does not replace regulatory certification, outside the scope of XP-NOVA.',
      duree: '3 to 7 days',
    },
    {
      title: 'Reception assistance',
      objectif:
        'Secure equipment reception: final compliance verification and documented transfer to operation.',
      description:
        'Support during equipment reception: final verification, team training, transfer documentation.',
      livrables: ['Reception minutes', 'Transfer documentation', 'Training materials'],
      role:
        'XP-NOVA assists the client in their receiver role, ensuring objectivity of the minutes vis-à-vis the supplier.',
      duree: '2 to 5 days',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Our technical engineering services</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            We support your projects from needs analysis to equipment reception, with a structured method, clear deliverables and an impartial advisory role.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">{service.title}</h2>
              <p className="text-[#5A6072] mb-4 text-sm italic">{service.objectif}</p>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Deliverables</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {service.livrables.map((livrable) => (
                    <li key={livrable}>{livrable}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Role of XP-NOVA</h3>
                <p className="text-sm text-[#5A6072]">{service.role}</p>
              </div>
              <p className="text-sm text-[#5A6072] mb-4">
                <span className="font-semibold">Indicative duration:</span> {service.duree}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 bg-[#F4F5F8] border-l-4 border-[#D4A017] mb-8">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">What we do not do</h2>
            <ul className="text-[#5A6072] list-disc list-inside">
              <li>Equipment supply (we do not sell equipment)</li>
              <li>Installation works (we do not carry out installations)</li>
              <li>Operation and maintenance (we do not ensure maintenance)</li>
              <li>Regulatory certification (a technical verification is not a certification)</li>
            </ul>
          </div>
          <a
            href="/en/contact"
            className="inline-block px-6 py-3 bg-[#D4A017] text-white rounded font-semibold hover:bg-[#B8860B] transition-colors"
          >
            Request technical expertise
          </a>
        </div>
      </section>
    </div>
  );
}
