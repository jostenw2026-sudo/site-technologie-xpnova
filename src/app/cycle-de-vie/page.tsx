export default function CycleDeViePage() {
  const phases = [
    {
      title: 'Disponibilité locale',
      description: 'Accessibilité des équipements sur le marché local',
      points: ['Sources d\'approvisionnement', 'Délais de livraison', 'Coûts d\'importation'],
    },
    {
      title: 'Approvisionnement',
      description: 'Sources d\'approvisionnement, délais, logistique',
      points: ['Fournisseurs', 'Coûts logistiques', 'Délais de livraison'],
    },
    {
      title: 'Installation',
      description: 'Coordination avec prestataires d\'installation',
      points: ['Coordination', 'Supervision', 'Formation initiale'],
    },
    {
      title: 'Mise en service',
      description: 'Protocoles de démarrage, paramétrage',
      points: ['Protocoles de démarrage', 'Paramétrage', 'Tests initiaux'],
    },
    {
      title: 'Sécurité',
      description: 'Normes de sécurité, EPI, procédures',
      points: ['Normes de sécurité', 'EPI', 'Procédures d\'urgence'],
    },
    {
      title: 'Pièces',
      description: 'Disponibilité des pièces de rechange',
      points: ['Stock de pièces', 'Délais de commande', 'Fournisseurs'],
    },
    {
      title: 'Maintenance',
      description: 'Calendrier de maintenance, contrats de service',
      points: ['Maintenance préventive', 'Maintenance corrective', 'Contrats de service'],
    },
    {
      title: 'Coûts d\'exploitation',
      description: 'Estimation des coûts OPEX',
      points: ['Énergie', 'Consommables', 'Main d\'œuvre'],
    },
    {
      title: 'Renouvellement',
      description: 'Durée de vie, plan de renouvellement',
      points: ['Durée de vie', 'Plan de renouvellement', 'Budget de remplacement'],
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Cycle de vie des équipements</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Nous analysons le cycle de vie complet des équipements pour garantir leur durabilité et leur performance dans votre contexte.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.title} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4A017] text-[#0D1F5C] rounded-full flex items-center justify-center font-bold text-sm">
                  CV{index + 1}
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
