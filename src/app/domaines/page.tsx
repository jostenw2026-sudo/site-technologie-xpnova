export default function DomainesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Nos domaines d'intervention</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Des équipements de production aux systèmes de stockage, en passant par l'énergie et la connectivité, nous couvrons l'ensemble des besoins techniques des projets agro-systémiques.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Mécanisation',
              description: 'Tracteurs, équipements de travail du sol, semis et récolte adaptés aux contextes africains.',
              services: ['Analyse du besoin', 'Dimensionnement', 'Cahiers des charges'],
            },
            {
              title: 'Irrigation et eau',
              description: 'Systèmes d\'irrigation (goutte-à-goutte, aspersion, gravitaire), pompage, traitement et stockage de l\'eau.',
              services: ['Analyse du besoin', 'Dimensionnement', 'Architecture technique'],
            },
            {
              title: 'Transformation et usines',
              description: 'Unités de transformation agroalimentaire, lignes de production, équipements de conditionnement.',
              services: ['Architecture technique', 'Dimensionnement', 'Cahiers des charges'],
            },
            {
              title: 'Stockage, conservation et froid',
              description: 'Entrepôts, silos, chambres froides, chaîne du froid, systèmes de conservation des produits.',
              services: ['Dimensionnement', 'Architecture technique', 'Vérification de performance'],
            },
            {
              title: 'Énergie et utilités',
              description: 'Énergie solaire, groupes électrogènes, réseaux électriques, utilités industrielles.',
              services: ['Analyse du besoin', 'Dimensionnement', 'Architecture technique'],
            },
            {
              title: 'Manutention et logistique',
              description: 'Convoyeurs, chariots élévateurs, systèmes de manutention, équipements de logistique interne.',
              services: ['Architecture technique', 'Dimensionnement', 'Cahiers des charges'],
            },
            {
              title: 'Équipements numériques',
              description: 'Logiciels de gestion, capteurs et IoT, connectivité, systèmes de monitoring et de pilotage.',
              services: ['Architecture technique', 'Cahiers des charges', 'Assistance à l\'intégration'],
            },
          ].map((domaine) => (
            <div key={domaine.title} className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">{domaine.title}</h2>
              <p className="text-[#5A6072] mb-4">{domaine.description}</p>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Services applicables</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {domaine.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <a
                href="/contact"
                className="inline-block px-4 py-2 bg-[#D4A017] text-white rounded text-sm font-semibold hover:bg-[#B8860B] transition-colors"
              >
                Demander une expertise
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
