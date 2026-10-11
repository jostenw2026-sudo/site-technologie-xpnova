export default function ServicesPage() {
  const services = [
    {
      title: 'Analyse du besoin',
      description: 'Diagnostic des besoins techniques, audit de l\'existant, identification des gaps, définition des objectifs et des contraintes.',
      livrables: ['Rapport d\'analyse du besoin', 'Cartographie de l\'existant', 'Identification des gaps'],
      duree: '5 à 10 jours',
    },
    {
      title: 'Variantes',
      description: 'Étude de solutions alternatives, comparatif technico-économique, analyse des risques, recommandation argumentée.',
      livrables: ['Étude de variantes', 'Comparatif technico-économique', 'Recommandation'],
      duree: '10 à 15 jours',
    },
    {
      title: 'Architecture technique',
      description: 'Conception de l\'architecture technique, schémas fonctionnels, flux de données, interfaces entre équipements, dimensionnement global.',
      livrables: ['Schémas fonctionnels', 'Architecture système', 'Note de dimensionnement'],
      duree: '10 à 20 jours',
    },
    {
      title: 'Dimensionnement',
      description: 'Calcul des capacités requises pour chaque équipement et pour le système global : débits, puissances, capacités de stockage.',
      livrables: ['Calculs de dimensionnement', 'Notes de calcul', 'Spécifications de capacités'],
      duree: '5 à 15 jours',
    },
    {
      title: 'Cahiers des charges',
      description: 'Rédaction des cahiers des charges techniques pour vos appels d\'offres : spécifications détaillées, critères d\'évaluation, grille de sélection.',
      livrables: ['Cahier des charges technique', 'Grille d\'évaluation', 'Critères de sélection'],
      duree: '10 à 15 jours',
    },
    {
      title: 'Analyse d\'offres',
      description: 'Analyse des offres reçues des fournisseurs : vérification de la conformité, analyse technico-économique, identification des risques.',
      livrables: ['Analyse comparative', 'Grille d\'évaluation', 'Recommandation de choix'],
      duree: '5 à 10 jours',
    },
    {
      title: 'Essais / testing',
      description: 'Conception des protocoles d\'essai pour vérifier la conformité des équipements aux spécifications : tests de performance, tests de sécurité.',
      livrables: ['Protocoles d\'essai', 'Grilles de vérification', 'Rapports d\'essai'],
      duree: 'Selon la complexité',
    },
    {
      title: 'Vérification de performance',
      description: 'Tests de performance sur site : mesure des débits réels, vérification des capacités, validation des seuils, tests en conditions réelles.',
      livrables: ['Rapport de tests', 'Validation des capacités', 'Certificat de conformité'],
      duree: '3 à 7 jours',
    },
    {
      title: 'Assistance à la réception',
      description: 'Accompagnement lors de la réception des équipements : vérification finale, formation des équipes, documentation de transfert.',
      livrables: ['Procès-verbal de réception', 'Documentation de transfert', 'Supports de formation'],
      duree: '2 à 5 jours',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Nos services d'ingénierie technique</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Nous accompagnons vos projets de l'analyse du besoin jusqu'à la réception des équipements, avec une méthode structurée et des livrables clairs.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">{service.title}</h2>
              <p className="text-[#5A6072] mb-4 text-sm">{service.description}</p>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Livrables</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {service.livrables.map((livrable) => (
                    <li key={livrable}>{livrable}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[#5A6072] mb-4">
                <span className="font-semibold">Durée indicative :</span> {service.duree}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 bg-[#F4F5F8] border-l-4 border-[#D4A017] mb-8">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Ce que nous ne faisons pas</h2>
            <ul className="text-[#5A6072] list-disc list-inside">
              <li>Fourniture d'équipements (nous ne vendons pas d'équipements)</li>
              <li>Travaux d'installation (nous ne réalisons pas les installations)</li>
              <li>Exploitation et maintenance (nous n'assurons pas la maintenance)</li>
              <li>Certification réglementaire (une vérification technique n'est pas une certification)</li>
            </ul>
          </div>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-[#D4A017] text-white rounded font-semibold hover:bg-[#B8860B] transition-colors"
          >
            Demander une expertise technique
          </a>
        </div>
      </section>
    </div>
  );
}
