import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import TitreSection from '@/components/TitreSection';
import { SchemaParcours } from '@/components/Schemas';
import IntroPage from '@/components/IntroPage';
import Illustration from '@/components/Illustration';

// Titre et description : tableau de référencement validé par la direction le 24/10/2026 ;
// liens canonical et hreflang.
export const metadata: Metadata = {
  alternates: alternatesPour('/services'),
  title: "Nos services d'ingénierie technique — TECHNOLOGIE XP-NOVA",
  description:
    "Services d'ingénierie technique de XP-NOVA : mécanisation, irrigation, transformation, stockage, froid, énergie et équipements numériques.",
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Analyse du besoin',
      objectif:
        "Cadrer précisément le besoin technique avant tout engagement : comprendre l'existant, identifier les écarts et définir des objectifs vérifiables.",
      description:
        "Diagnostic des besoins techniques, audit de l'existant, identification des gaps, définition des objectifs et des contraintes.",
      livrables: ["Rapport d'analyse du besoin", "Cartographie de l'existant", 'Identification des gaps'],
      role:
        "XP-NOVA intervient en conseil indépendant, sans lien avec les fournisseurs : l'analyse n'oriente pas vers une marque ou une technologie donnée.",
      duree: '5 à 10 jours',
    },
    {
      title: 'Variantes',
      objectif:
        'Éclairer une décision en comparant des solutions alternatives de manière objective, sur des critères techniques et économiques explicites.',
      description:
        "Étude de solutions alternatives, comparatif technico-économique, analyse des risques, recommandation argumentée.",
      livrables: ['Étude de variantes', 'Comparatif technico-économique', 'Recommandation'],
      role:
        "La recommandation est argumentée et traçable : XP-NOVA reste impartial vis-à-vis des fournisseurs et ne perçoit aucune commission.",
      duree: '10 à 15 jours',
    },
    {
      title: 'Architecture technique',
      objectif:
        "Concevoir l'architecture globale du système pour garantir la cohérence des équipements, des flux et des interfaces avant tout achat.",
      description:
        "Conception de l'architecture technique, schémas fonctionnels, flux de données, interfaces entre équipements, dimensionnement global.",
      livrables: ['Schémas fonctionnels', 'Architecture système', 'Note de dimensionnement'],
      role:
        "Le rôle de XP-NOVA est d'architecturer et de spécifier : la réalisation physique reste confiée à des prestataires selon le mandat.",
      duree: '10 à 20 jours',
    },
    {
      title: 'Dimensionnement',
      objectif:
        "Déterminer les capacités exactement nécessaires pour éviter le surdimensionnement coûteux comme le sous-dimensionnement risqué.",
      description:
        'Calcul des capacités requises pour chaque équipement et pour le système global : débits, puissances, capacités de stockage.',
      livrables: ['Calculs de dimensionnement', 'Notes de calcul', 'Spécifications de capacités'],
      role:
        "Les calculs reposent sur des hypothèses documentées et vérifiables, fournies au client pour toute validation ultérieure.",
      duree: '5 à 15 jours',
    },
    {
      title: 'Cahiers des charges',
      objectif:
        "Transformer le besoin en spécifications opposables, afin de lancer des consultations équitables et comparables entre fournisseurs.",
      description:
        "Rédaction des cahiers des charges techniques pour vos appels d'offres : spécifications détaillées, critères d'évaluation, grille de sélection.",
      livrables: ['Cahier des charges technique', "Grille d'évaluation", 'Critères de sélection'],
      role:
        "Le cahier des charges est rédigé sans favoriser un fournisseur : les critères de sélection sont neutres et pondérés par avance.",
      duree: '10 à 15 jours',
    },
    {
      title: "Analyse d'offres",
      objectif:
        "Dépouiller et comparer les offres reçues de façon rigoureuse pour objectiver le choix du fournisseur, au-delà du seul prix.",
      description:
        "Analyse des offres reçues des fournisseurs : vérification de la conformité, analyse technico-économique, identification des risques.",
      livrables: ['Analyse comparative', "Grille d'évaluation", 'Recommandation de choix'],
      role:
        "Le dépouillement est impartial et documenté : XP-NOVA contrôle la conformité des offres aux spécifications, sans parti pris.",
      duree: '5 à 10 jours',
    },
    {
      title: 'Essais / testing',
      objectif:
        "Vérifier, par des protocoles d'essai, que les équipements livrés répondent réellement aux spécifications avant leur mise en service.",
      description:
        "Conception des protocoles d'essai pour vérifier la conformité des équipements aux spécifications : tests de performance, tests de sécurité.",
      livrables: ["Protocoles d'essai", 'Grilles de vérification', "Rapports d'essai"],
      role:
        "XP-NOVA définit et encadre les essais en tiers de confiance ; l'exécution matérielle revient au fournisseur ou à un prestataire.",
      duree: 'Selon la complexité',
    },
    {
      title: 'Vérification de performance',
      objectif:
        "Mesurer sur site que les performances réelles atteignent les seuils contractualisés, en conditions d'exploitation réelles.",
      description:
        'Tests de performance sur site : mesure des débits réels, vérification des capacités, validation des seuils, tests en conditions réelles.',
      livrables: ['Rapport de tests', 'Validation des capacités', 'Certificat de conformité'],
      role:
        "La vérification est factuelle et tracée ; elle ne se substitue pas à une certification réglementaire, hors du périmètre de XP-NOVA.",
      duree: '3 à 7 jours',
    },
    {
      title: 'Assistance à la réception',
      objectif:
        "Sécuriser la réception des équipements : vérification finale de conformité et transfert documenté vers l'exploitation.",
      description:
        "Accompagnement lors de la réception des équipements : vérification finale, formation des équipes, documentation de transfert.",
      livrables: ['Procès-verbal de réception', 'Documentation de transfert', 'Supports de formation'],
      role:
        "XP-NOVA assiste le client dans son rôle de réceptionnaire, en veillant à l'objectivité du procès-verbal face au fournisseur.",
      duree: '2 à 5 jours',
    },
    {
      title: "Assistance à l'intégration",
      objectif:
        "Faire fonctionner ensemble capteurs, automates, logiciels de gestion et plateformes de traçabilité, et vérifier que les données attendues arrivent bien là où elles sont utiles.",
      description:
        "Plan d'intégration, spécifications d'interfaces entre équipements et systèmes, recette fonctionnelle des flux de données.",
      livrables: ["Plan d'intégration", "Spécifications d'interfaces", 'Procès-verbal de recette fonctionnelle'],
      role:
        "XP-NOVA cadre et recette l'intégration ; le paramétrage et le développement restent confiés aux intégrateurs retenus.",
      duree: 'Selon la complexité',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Nos services d'ingénierie technique</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Nous accompagnons vos projets de l'analyse du besoin jusqu'à la réception des équipements, avec une méthode structurée, des livrables clairs et un rôle de conseil impartial.
          </p>
          <IntroPage cle="services" lang="fr">
            <SchemaParcours lang="fr" />
          </IntroPage>
          <Illustration src="/images/illustrations/services.webp" alt="Ingénieur relevant les paramètres d'une unité de décorticage de riz" lang="fr" />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre="Les dix services, de TS-01 à TS-10" texte="Chaque carte donne l'objectif, les livrables, le rôle de XP-NOVA et une durée indicative ; les services se commandent séparément ou en chaîne." />
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="p-6 bg-white rounded border border-[#E2E5EC]">
              <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">{service.title}</h2>
              <p className="text-[#5A6072] mb-4 text-sm italic">{service.objectif}</p>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Livrables</h3>
                <ul className="text-sm text-[#5A6072] list-disc list-inside">
                  {service.livrables.map((livrable) => (
                    <li key={livrable}>{livrable}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-[#0D1F5C] mb-2">Rôle de XP-NOVA</h3>
                <p className="text-sm text-[#5A6072]">{service.role}</p>
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
            className="inline-block px-6 py-3 bg-[#D4A017] text-[#0D1F5C] rounded font-semibold hover:bg-[#E9C25A] transition-colors"
          >
            Demander une expertise technique
          </a>
        </div>
      </section>
    </div>
  );
}
