export default function DomainesPage() {
  const domaines = [
    {
      title: 'Mécanisation',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/ec70143f.webp',
      enjeu:
        "La motorisation et l'outillage conditionnent la productivité des exploitations comme des unités agro-industrielles. Mal dimensionnés, ils immobilisent du capital et fragilisent la rentabilité.",
      description:
        'Tracteurs, équipements de travail du sol, semis et récolte adaptés aux contextes africains.',
      perimetre: [
        "Étude du besoin d'équipement selon la surface, les itinéraires techniques et la main-d'œuvre disponible.",
        "Choix raisonné entre motorisation, traction animale et prestations de service (location/entrepreneurs).",
        'Dimensionnement des parcs et spécifications techniques pour les cahiers des charges.',
        "Analyse des coûts d'exploitation, de la disponibilité locale des pièces et de la maintenance.",
      ],
      livrables: [
        "Note de besoins et de dimensionnement du parc",
        'Analyse comparative technico-économique des options',
        "Cahier des charges pour l'acquisition ou la prestation",
      ],
      services: ['Analyse du besoin', 'Dimensionnement', 'Cahiers des charges'],
    },
    {
      title: 'Irrigation et eau',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/977fefdb.webp',
      enjeu:
        "L'eau est le premier facteur limitant des systèmes productifs. Une irrigation mal conçue gaspille la ressource, dégrade les sols et compromet les rendements attendus.",
      description:
        "Systèmes d'irrigation (goutte-à-goutte, aspersion, gravitaire), pompage, traitement et stockage de l'eau.",
      perimetre: [
        "Évaluation de la ressource en eau et des besoins hydriques des cultures.",
        "Comparaison des techniques (goutte-à-goutte, aspersion, gravitaire) selon le contexte.",
        "Dimensionnement du pompage, des réseaux et des ouvrages de stockage.",
        "Spécifications pour le traitement et la gestion durable de la ressource.",
      ],
      livrables: [
        'Étude hydraulique et dimensionnement du réseau',
        'Comparatif des techniques et de leurs coûts',
        "Cahier des charges des ouvrages et équipements",
      ],
      services: ['Analyse du besoin', 'Dimensionnement', 'Architecture technique'],
    },
    {
      title: 'Transformation et usines',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/1ebcaed5.webp',
      enjeu:
        "La transformation capte la valeur ajoutée au plus près de la production. Une ligne de production mal spécifiée entraîne pertes de matière, rebuts et coûts d'exploitation élevés.",
      description:
        'Unités de transformation agroalimentaire, lignes de production, équipements de conditionnement.',
      perimetre: [
        "Définition du procédé et des capacités de production cibles.",
        "Architecture générale de l'unité : flux matière, énergie, utilités et espaces.",
        "Dimensionnement des équipements et des lignes de conditionnement.",
        "Rédaction des spécifications techniques pour les appels d'offres.",
      ],
      livrables: [
        'Schéma de procédé et d\'implantation',
        'Note de dimensionnement des capacités',
        "Cahier des charges des équipements de transformation",
      ],
      services: ['Architecture technique', 'Dimensionnement', 'Cahiers des charges'],
    },
    {
      title: 'Stockage, conservation et froid',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/2736e928.webp',
      enjeu:
        "Le stockage et la chaîne du froid réduisent les pertes post-récolte et sécurisent la commercialisation. Une capacité mal calibrée augmente les coûts sans préserver les produits.",
      description:
        'Entrepôts, silos, chambres froides, chaîne du froid, systèmes de conservation des produits.',
      perimetre: [
        "Analyse des flux, des volumes et des durées de conservation.",
        "Dimensionnement des entrepôts, silos et chambres froides.",
        "Spécifications de la chaîne du froid (température, humidité, traçabilité).",
        "Analyse des coûts énergétiques et des solutions de conservation adaptées.",
      ],
      livrables: [
        'Étude des besoins de stockage et de froid',
        'Note de dimensionnement des capacités',
        "Cahier des charges des infrastructures et équipements",
      ],
      services: ['Dimensionnement', 'Architecture technique', 'Vérification de performance'],
    },
    {
      title: 'Énergie et utilités',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/256e1e9e.webp',
      enjeu:
        "L'accès à une énergie fiable et dimensionnée pilote les coûts d'exploitation de tout site productif. Un mix mal choisi pénalise la compétitivité et la continuité de service.",
      description:
        'Énergie solaire, groupes électrogènes, réseaux électriques, utilités industrielles.',
      perimetre: [
        "Audit des besoins énergétiques et de la disponibilité du réseau.",
        "Comparaison des solutions (solaire, groupes, hybridation) selon le coût et la fiabilité.",
        "Dimensionnement des productions, stockages et réseaux de distribution.",
        "Spécifications des utilités industrielles (air comprimé, vapeur, traitement des eaux).",
      ],
      livrables: [
        'Bilan des puissances et de la demande énergétique',
        'Comparatif technico-économique des mix énergétiques',
        "Cahier des charges des équipements et des réseaux",
      ],
      services: ['Analyse du besoin', 'Dimensionnement', 'Architecture technique'],
    },
    {
      title: 'Manutention et logistique',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/cfddcf57.webp',
      enjeu:
        "La manutention interne conditionne les cadences et la sécurité des sites. Une logistique mal pensée crée des goulots d'étranglement et des surcoûts récurrents.",
      description:
        "Convoyeurs, chariots élévateurs, systèmes de manutention, équipements de logistique interne.",
      perimetre: [
        "Analyse des flux internes et des contraintes du site.",
        "Conception des circuits de manutention et de stockage intermédiaire.",
        "Dimensionnement des équipements (convoyeurs, levage, rayonnage).",
        "Spécifications techniques pour la sélection des fournisseurs.",
      ],
      livrables: [
        'Schéma des flux et des implantations logistiques',
        'Note de dimensionnement des moyens de manutention',
        "Cahier des charges des équipements",
      ],
      services: ['Architecture technique', 'Dimensionnement', 'Cahiers des charges'],
    },
    {
      title: 'Équipements numériques',
      image: 'https://d2lm3begjhzc49.cloudfront.net/generated-images/6733cb9f.webp',
      enjeu:
        "La donnée et le pilotage deviennent un levier de performance des systèmes productifs. Un choix numérique inadapté génère des coûts sans valeur opérationnelle.",
      description:
        'Logiciels de gestion, capteurs et IoT, connectivité, systèmes de monitoring et de pilotage.',
      perimetre: [
        "Expression du besoin numérique et des indicateurs de pilotage attendus.",
        "Architecture des systèmes : capteurs, réseaux, supervision et données.",
        "Spécifications des solutions logicielles et de la connectivité.",
        "Cadrage de l'intégration et des conditions de réception.",
      ],
      livrables: [
        'Cadrage fonctionnel du besoin numérique',
        'Architecture du système de supervision',
        "Cahier des charges des solutions et de l'intégration",
      ],
      services: ['Architecture technique', 'Cahiers des charges', "Assistance à l'intégration"],
    },
  ];

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
          {domaines.map((domaine) => (
            <div key={domaine.title} className="bg-white rounded border border-[#E2E5EC] overflow-hidden flex flex-col">
              <img
                src={domaine.image}
                alt={`Illustration — ${domaine.title}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">{domaine.title}</h2>
                <p className="text-[#5A6072] mb-4">{domaine.enjeu}</p>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Périmètre d'ingénierie XP-NOVA</h3>
                  <ul className="text-sm text-[#5A6072] list-disc list-inside">
                    {domaine.perimetre.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Livrables & garanties</h3>
                  <ul className="text-sm text-[#5A6072] list-disc list-inside">
                    {domaine.livrables.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
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
                  className="mt-auto inline-block px-4 py-2 bg-[#D4A017] text-white rounded text-sm font-semibold hover:bg-[#B8860B] transition-colors self-start"
                >
                  Demander une expertise
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
