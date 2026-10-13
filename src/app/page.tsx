export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Héros */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D1F5C] mb-6">
            Ingénierie des équipements et systèmes techniques
          </h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Nous concevons et dimensionnons les équipements techniques et numériques nécessaires à vos projets agro-systémiques, de la mécanisation à la chaîne du froid, en passant par l'irrigation et les systèmes de connectivité.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-[#D4A017] text-white rounded font-semibold hover:bg-[#B8860B] transition-colors"
            >
              Demander une expertise technique
            </a>
            <a
              href="/domaines"
              className="px-6 py-3 bg-[#0D1F5C] text-white rounded font-semibold hover:bg-[#0A1850] transition-colors"
            >
              Découvrir nos domaines
            </a>
          </div>
        </div>
      </section>

      {/* Distinction */}
      <section className="py-8 px-6 bg-[#F4F5F8] border-l-4 border-[#D4A017]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#0D1F5C]">
            <strong>Notre rôle :</strong> XP-NOVA assure l'ingénierie, les études et les spécifications techniques. La fourniture d'équipements, les travaux d'installation et l'exploitation sont confiés à des prestataires spécialisés sélectionnés selon vos besoins.
          </p>
        </div>
      </section>

      {/* Domaines */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-4">7 domaines pour des projets complets</h2>
          <p className="text-[#5A6072] mb-8">
            Des équipements de production aux systèmes de stockage, en passant par l'énergie et la connectivité, nous couvrons l'ensemble des besoins techniques des projets agro-systémiques.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Mécanisation',
                description: 'Tracteurs, équipements de travail du sol, semis et récolte adaptés aux contextes africains.',
              },
              {
                title: 'Irrigation et eau',
                description: "Systèmes d'irrigation (goutte-à-goutte, aspersion, gravitaire), pompage, traitement et stockage de l'eau.",
              },
              {
                title: 'Transformation et usines',
                description: 'Unités de transformation agroalimentaire, lignes de production, équipements de conditionnement.',
              },
              {
                title: 'Stockage, conservation et froid',
                description: 'Entrepôts, silos, chambres froides, chaîne du froid, systèmes de conservation des produits.',
              },
              {
                title: 'Énergie et utilités',
                description: 'Énergie solaire, groupes électrogènes, réseaux électriques, utilités industrielles.',
              },
              {
                title: 'Manutention et logistique',
                description: 'Convoyeurs, chariots élévateurs, systèmes de manutention, équipements de logistique interne.',
              },
              {
                title: 'Équipements numériques',
                description: 'Logiciels de gestion, capteurs et IoT, connectivité, systèmes de monitoring et de pilotage.',
              },
            ].map((domaine) => (
              <a
                key={domaine.title}
                href="/domaines"
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
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-4">9 services pour des choix éclairés</h2>
          <p className="text-[#5A6072] mb-8">
            Nous accompagnons vos projets de l'analyse du besoin jusqu'à la réception des équipements, en passant par la conception des spécifications et la sélection des solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Analyse du besoin',
                description: "Diagnostic des besoins techniques, audit de l'existant et définition des objectifs.",
              },
              {
                title: 'Variantes',
                description: 'Étude de solutions alternatives, comparatif technico-économique et recommandation argumentée.',
              },
              {
                title: 'Architecture technique',
                description: "Conception de l'architecture système, schémas fonctionnels et flux de données.",
              },
              {
                title: 'Dimensionnement',
                description: 'Calcul des capacités requises : débits, puissances et capacités de stockage.',
              },
              {
                title: 'Cahiers des charges',
                description: "Rédaction de cahiers des charges techniques pour vos appels d'offres.",
              },
              {
                title: "Analyse d'offres",
                description: 'Vérification de conformité et analyse technico-économique des offres reçues.',
              },
              {
                title: 'Essais / testing',
                description: "Conception de protocoles d'essai pour vérifier la conformité des équipements.",
              },
              {
                title: 'Vérification de performance',
                description: 'Tests de performance sur site et validation des capacités en conditions réelles.',
              },
              {
                title: 'Assistance à la réception',
                description: 'Vérification finale, formation des équipes et documentation de transfert.',
              },
            ].map((service) => (
              <a
                key={service.title}
                href="/services"
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
          <h2 className="text-2xl font-bold mb-4">Votre projet a besoin d'une expertise technique ?</h2>
          <p className="mb-8 text-[#D4A017]">
            Nos ingénieurs vous accompagnent dans la conception et le dimensionnement des équipements et systèmes techniques adaptés à votre contexte.
          </p>
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
