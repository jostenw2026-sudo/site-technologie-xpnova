export default function LifecyclePageEN() {
  const phases = [
    {
      title: 'Local availability',
      description: 'Equipment accessibility on the local market',
      points: ['Supply sources', 'Delivery times', 'Import costs'],
    },
    {
      title: 'Procurement',
      description: 'Supply sources, lead times, logistics',
      points: ['Suppliers', 'Logistics costs', 'Delivery times'],
    },
    {
      title: 'Installation',
      description: 'Coordination with installation service providers',
      points: ['Coordination', 'Supervision', 'Initial training'],
    },
    {
      title: 'Commissioning',
      description: 'Startup protocols, configuration',
      points: ['Startup protocols', 'Configuration', 'Initial tests'],
    },
    {
      title: 'Safety',
      description: 'Safety standards, PPE, procedures',
      points: ['Safety standards', 'PPE', 'Emergency procedures'],
    },
    {
      title: 'Parts',
      description: 'Spare parts availability',
      points: ['Parts stock', 'Order lead times', 'Suppliers'],
    },
    {
      title: 'Maintenance',
      description: 'Maintenance schedule, service contracts',
      points: ['Preventive maintenance', 'Corrective maintenance', 'Service contracts'],
    },
    {
      title: 'Operating costs',
      description: 'OPEX cost estimation',
      points: ['Energy', 'Consumables', 'Labor'],
    },
    {
      title: 'Renewal',
      description: 'Lifespan, renewal plan',
      points: ['Lifespan', 'Renewal plan', 'Replacement budget'],
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Equipment lifecycle</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            We analyze the complete lifecycle of equipment to ensure their sustainability and performance in your context.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.title} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4A017] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <div className="flex-1 p-6 bg-white rounded border border-[#E2E5EC]">
                  <h2 className="text-xl font-bold text-[#0D1F5C] mb-2">{phase.title}</h2>
                  <p className="text-[#5A6072] mb-4">{phase.description}</p>
                  <ul className="text-sm text-[#5A6072] list-disc list-inside">
                    {phase.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
