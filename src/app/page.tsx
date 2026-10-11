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
              'Mécanisation',
              'Irrigation et eau',
              'Transformation et usines',
              'Stockage, conservation et froid',
              'Énergie et utilités',
              'Manutention et logistique',
              'Équipements numériques',
            ].map((domaine) => (
              <div key={domaine} className="p-6 border border-[#E2E5EC] rounded hover:border-[#D4A017] transition-colors">
                <h3 className="font-semibold text-[#0D1F5C] mb-2">{domaine}</h3>
                <p className="text-sm text-[#5A6072]">Détails à venir</p>
              </div>
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
              'Analyse du besoin',
              'Variantes',
              'Architecture technique',
              'Dimensionnement',
              'Cahiers des charges',
              'Analyse d\'offres',
              'Essais / testing',
              'Vérification de performance',
              'Assistance à la réception',
            ].map((service) => (
              <div key={service} className="p-4 bg-white rounded border border-[#E2E5EC]">
                <h3 className="font-semibold text-[#0D1F5C] mb-2">{service}</h3>
                <p className="text-sm text-[#5A6072]">Détails à venir</p>
              </div>
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
