// FAQ de la division TECHNOLOGIE (décision DG du 21/10/2026). Réponses alignées sur la
// doctrine « ingénierie seule », le référentiel RT-TECH v1.0 et les conditions publiées
// sur AGROVITA (dépôt gratuit, premier retour sous 48 h, devis après ouverture du dossier).

export interface QuestionFaq {
  q: string;
  r: string;
  lien?: { label: string; href: string };
}

export interface ThemeFaq {
  theme: string;
  fonction: string;
  questions: QuestionFaq[];
}

export const FAQ: Record<'fr' | 'en', ThemeFaq[]> = {
  fr: [
    {
      theme: 'Rôle de XP-NOVA',
      fonction: "Ce que nous faisons, et surtout ce que nous ne faisons pas.",
      questions: [
        {
          q: 'Vendez-vous ou installez-vous des équipements ?',
          r: "Non. XP-NOVA TECHNOLOGIE fait de l'ingénierie : analyse du besoin, comparaison de solutions, dimensionnement, cahiers des charges, analyse d'offres, essais et réception. La fourniture, l'installation et la maintenance sont confiées à des prestataires que vous choisissez sur la base de nos spécifications. Nous ne percevons aucune commission.",
          lien: { label: 'Nos services', href: '/services' },
        },
        {
          q: 'Pourquoi passer par un bureau d’ingénierie plutôt que demander directement un devis à un fournisseur ?',
          r: "Un fournisseur dimensionne sur son catalogue ; nous dimensionnons sur votre réel : matière première disponible, énergie fiable, compétences locales, pièces de rechange. Les spécifications que nous rédigeons rendent les offres comparables et vous protègent du surdimensionnement comme du sous-dimensionnement.",
        },
        {
          q: 'Recommandez-vous des marques ?',
          r: "Non. Le référentiel classe les équipements par fonction technique, jamais par marque. Nos cahiers des charges fixent des performances, des conditions d'exploitation et des critères de sélection pondérés à l'avance ; le choix du fournisseur se fait ensuite, offres en main.",
          lien: { label: 'Le référentiel', href: '/referentiel' },
        },
        {
          q: 'Délivrez-vous des certifications ?',
          r: "Non. Une vérification de performance XP-NOVA constate qu'un équipement atteint les seuils contractuels ; elle ne remplace ni une certification ANOR, ni une homologation du CNHPCAT, ni un agrément sanitaire. Nous vous indiquons lesquelles sont nécessaires et à quel moment.",
        },
      ],
    },
    {
      theme: 'Demande, délais et coûts',
      fonction: "Comment une mission démarre, combien de temps elle prend, quand le devis arrive.",
      questions: [
        {
          q: 'Combien coûte une première demande ?',
          r: "Rien. Le dépôt d'une demande est gratuit et sans engagement. Vous recevez un premier retour sous 48 h ouvrées. Le devis de mission, en FCFA, n'est établi qu'après ouverture officielle du dossier, une fois le besoin cadré.",
          lien: { label: 'Déposer une demande', href: '/contact' },
        },
        {
          q: 'Combien de temps dure une mission ?',
          r: "Chaque service porte une durée indicative publiée : de 2 à 5 jours pour une assistance à la réception, de 10 à 20 jours pour une architecture technique. Une chaîne complète, de l'analyse du besoin au cahier des charges, se situe le plus souvent entre quatre et huit semaines selon la disponibilité des données de site.",
          lien: { label: 'Durées par service', href: '/services' },
        },
        {
          q: 'Pouvez-vous intervenir sur un projet déjà engagé ou sur une unité existante ?',
          r: "Oui. Les services se commandent séparément : un audit de l'existant (TS-01), une analyse d'offres déjà reçues (TS-06), des essais avant réception (TS-07 et TS-08) ou un plan de maintenance issu de la grille de cycle de vie.",
        },
        {
          q: 'Travaillez-vous hors de Yaoundé ?',
          r: "Oui, sur tout le territoire camerounais et en Afrique centrale. Les frais de mission sur site sont indiqués séparément dans le devis. Une partie du travail (variantes, dimensionnement, cahiers des charges) se fait à distance à partir des données que vous nous transmettez.",
        },
      ],
    },
    {
      theme: 'Le référentiel RT-TECH',
      fonction: "Lire les codes, les types et les mentions du référentiel des équipements.",
      questions: [
        {
          q: 'À quoi sert le référentiel des équipements ?',
          r: "À nommer un besoin sans ambiguïté. Ses 50 sous-fonctions (T1.1 à T8.7) couvrent la production, la transformation, le stockage, l'énergie, la logistique et le numérique. Chaque fiche donne les équipements types, les grandeurs à dimensionner, les risques au Cameroun et le cadre normatif.",
          lien: { label: 'Explorer le référentiel', href: '/referentiel' },
        },
        {
          q: 'Que signifie un code comme T2.2·TS-04 ?',
          r: "T2 est le domaine (Irrigation et eau), T2.2 la sous-fonction (Pompage), TS-04 le service (Dimensionnement). Le code désigne donc le dimensionnement d'un pompage. Depuis une fiche du référentiel, ce code se pré-remplit dans le formulaire de contact.",
        },
        {
          q: 'Physique, numérique, hybride : quelle différence ?',
          r: "Un équipement physique fonctionne sans logiciel (une presse à huile). Un équipement numérique est un logiciel ou un service de données (un ERP). Un équipement hybride est un organe physique piloté ou mesuré par du numérique (une pompe solaire régulée, une chambre froide monitorée).",
        },
        {
          q: 'Pourquoi certaines normes sont marquées « cadre en cours de confirmation » ?',
          r: "Parce que nous ne citons une norme ou une autorité comme obligatoire qu'après avoir lu le texte. Les références internationales (ISO, IEC, Codex) servent à rédiger les spécifications ; leur caractère obligatoire au Cameroun dépend de la liste des normes rendues d'application obligatoire par l'ANOR, que nous vérifions domaine par domaine.",
        },
      ],
    },
    {
      theme: 'Contexte camerounais',
      fonction: "Électricité, pièces, douane et réglementation export : ce que nos études intègrent d'office.",
      questions: [
        {
          q: 'Tenez-vous compte des coupures d’électricité ?',
          r: "Systématiquement. Toute étude d'équipement sensible (froid, couvoir, transformation) intègre un budget de continuité chiffré en FCFA : énergie de secours, bascule automatique, stock critique. À la réception, nous demandons un essai de continuité en charge, réseau volontairement coupé.",
          lien: { label: 'Énergie et utilités', href: '/domaines#energie-utilites' },
        },
        {
          q: 'Comment gérez-vous la disponibilité des pièces et de la maintenance ?',
          r: "Par la grille de cycle de vie CV1 à CV9 appliquée à chaque variante. Disponibilité locale, délai de pièces, compétences de maintenance et coût d'exploitation sont notés avant le prix d'achat. Une machine sans pièces ni réparateur dans votre région est écartée même si elle est la moins chère.",
          lien: { label: 'Cycle de vie des équipements', href: '/cycle-de-vie' },
        },
        {
          q: 'Un équipement importé doit-il passer par le PECAE ?',
          r: "Dans la plupart des cas, oui : l'ANOR exige un certificat de conformité pour dédouaner les produits réglementés importés, avec un seuil d'exemption pour les petits envois. Nous l'intégrons dans le calendrier et le coût d'approvisionnement (CV2) de chaque variante.",
        },
        {
          q: 'Prenez-vous en compte le règlement européen sur la déforestation (RDUE) ?',
          r: "Oui, pour le cacao, le café et le bois destinés à l'Union européenne : géolocalisation des parcelles, traçabilité des lots et documentation. La sous-fonction T8.6 du référentiel et la division AGROVITA traitent ce volet.",
          lien: { label: 'Conformité RDUE (AGROVITA)', href: 'https://agrovita.xp-nova.com/rdue' },
        },
      ],
    },
    {
      theme: 'Avec les autres divisions',
      fonction: "Quand Technologie travaille seule, quand elle appuie AGROVITA, ODT ou Formation.",
      questions: [
        {
          q: 'Quelle différence entre Technologie et AGROVITA ?',
          r: "AGROVITA accompagne un projet agricole ou agro-industriel de l'idée à la première vente, en 13 étapes. Technologie instruit le volet équipements de ces projets, ou intervient seule quand votre besoin est purement technique : une unité existante, un bailleur, une coopérative, une collectivité.",
          lien: { label: 'AGROVITA', href: 'https://agrovita.xp-nova.com' },
        },
        {
          q: 'Formez-vous les opérateurs ?',
          r: "Nous remettons les supports de transfert à la réception (TS-09) et nous décrivons les compétences requises par équipement. Les dispositifs de formation complets sont conçus par la division Formation et animés par des organismes partenaires.",
          lien: { label: 'Ingénierie de la formation', href: 'https://ingenierie-formation.xp-nova.com' },
        },
        {
          q: 'Pouvez-vous dimensionner un équipement collectif pour une commune ?',
          r: "Oui, en appui à la division ODT : magasin de collecte, mini-réseau solaire, forage équipé, abattoir communal. ODT conduit l'opération territoriale ; Technologie en assure l'ingénierie des équipements.",
          lien: { label: 'ODT', href: 'https://odt.xp-nova.com' },
        },
      ],
    },
  ],
  en: [
    {
      theme: 'XP-NOVA’s role',
      fonction: "What we do, and above all what we do not do.",
      questions: [
        {
          q: 'Do you sell or install equipment?',
          r: 'No. XP-NOVA TECHNOLOGY does engineering: needs analysis, options comparison, sizing, specifications, bid analysis, testing and acceptance. Supply, installation and maintenance go to contractors you select on the basis of our specifications. We receive no commission.',
          lien: { label: 'Our services', href: '/en/services' },
        },
        {
          q: 'Why use an engineering consultancy rather than ask a supplier for a quote?',
          r: 'A supplier sizes on its catalogue; we size on your reality: available raw material, reliable energy, local skills, spare parts. The specifications we write make bids comparable and protect you from oversizing as much as undersizing.',
        },
        {
          q: 'Do you recommend brands?',
          r: 'No. The reference classifies equipment by technical function, never by brand. Our specifications set performances, operating conditions and selection criteria weighted in advance; the supplier is chosen afterwards, bids in hand.',
          lien: { label: 'The reference', href: '/en/referentiel' },
        },
        {
          q: 'Do you issue certifications?',
          r: 'No. An XP-NOVA performance verification establishes that equipment reaches the contractual thresholds; it replaces neither an ANOR certification, nor a CNHPCAT registration, nor a sanitary approval. We tell you which ones are required and when.',
        },
      ],
    },
    {
      theme: 'Request, lead times and costs',
      fonction: "How a mission starts, how long it takes, when the quote arrives.",
      questions: [
        {
          q: 'What does a first request cost?',
          r: 'Nothing. Submitting a request is free and without commitment. You receive a first reply within 48 working hours. The mission quote, in FCFA, is issued only after the file is officially opened, once the need is framed.',
          lien: { label: 'Submit a request', href: '/en/contact' },
        },
        {
          q: 'How long does a mission take?',
          r: 'Each service carries a published indicative duration: 2 to 5 days for acceptance support, 10 to 20 days for a technical architecture. A full chain, from needs analysis to specifications, most often takes four to eight weeks depending on the availability of site data.',
          lien: { label: 'Durations by service', href: '/en/services' },
        },
        {
          q: 'Can you step into a project already under way, or an existing plant?',
          r: 'Yes. Services are ordered separately: an audit of the existing situation (TS-01), an analysis of bids already received (TS-06), tests before acceptance (TS-07 and TS-08) or a maintenance plan derived from the life-cycle grid.',
        },
        {
          q: 'Do you work outside Yaoundé?',
          r: 'Yes, throughout Cameroon and Central Africa. Site mission expenses are shown separately in the quote. Part of the work (options, sizing, specifications) is done remotely from the data you provide.',
        },
      ],
    },
    {
      theme: 'The RT-TECH reference',
      fonction: "Reading the codes, types and notes of the equipment reference.",
      questions: [
        {
          q: 'What is the equipment reference for?',
          r: 'To name a need unambiguously. Its 50 sub-functions (T1.1 to T8.7) cover production, processing, storage, energy, logistics and digital. Each sheet gives typical equipment, sizing parameters, risks in Cameroon and the regulatory framework.',
          lien: { label: 'Explore the reference', href: '/en/referentiel' },
        },
        {
          q: 'What does a code like T2.2·TS-04 mean?',
          r: 'T2 is the domain (Irrigation and water), T2.2 the sub-function (Pumping), TS-04 the service (Sizing). The code therefore designates the sizing of a pumping system. From a reference sheet, this code is pre-filled in the contact form.',
        },
        {
          q: 'Physical, digital, hybrid: what is the difference?',
          r: 'Physical equipment works without software (an oil press). Digital equipment is software or a data service (an ERP). Hybrid equipment is a physical device driven or measured by digital control (a regulated solar pump, a monitored cold room).',
        },
        {
          q: 'Why are some standards marked "framework being confirmed"?',
          r: 'Because we cite a standard or authority as mandatory only after reading the text. International references (ISO, IEC, Codex) are used to write specifications; whether they are mandatory in Cameroon depends on the list of standards made compulsory by ANOR, which we check domain by domain.',
        },
      ],
    },
    {
      theme: 'Cameroonian context',
      fonction: "Electricity, parts, customs and export regulation: what our studies include by default.",
      questions: [
        {
          q: 'Do you take power cuts into account?',
          r: 'Systematically. Every study of sensitive equipment (cold chain, hatchery, processing) includes a continuity budget costed in FCFA: backup energy, automatic switchover, critical stock. At acceptance we require a loaded continuity test, with the grid deliberately cut.',
          lien: { label: 'Energy and utilities', href: '/en/domaines#energy-utilities' },
        },
        {
          q: 'How do you handle spare parts and maintenance?',
          r: 'Through the CV1 to CV9 life-cycle grid applied to every option. Local availability, parts lead time, maintenance skills and operating cost are scored before the purchase price. A machine with no parts or repairer in your region is ruled out even if it is the cheapest.',
          lien: { label: 'Equipment life cycle', href: '/en/cycle-de-vie' },
        },
        {
          q: 'Must imported equipment go through PECAE?',
          r: 'In most cases, yes: ANOR requires a certificate of conformity to clear regulated imported products, with an exemption threshold for small shipments. We include it in the procurement schedule and cost (CV2) of each option.',
        },
        {
          q: 'Do you consider the EU deforestation regulation (EUDR)?',
          r: 'Yes, for cocoa, coffee and timber bound for the European Union: plot geolocation, batch traceability and documentation. Sub-function T8.6 of the reference and the AGROVITA division handle this aspect.',
          lien: { label: 'EUDR compliance (AGROVITA)', href: 'https://agrovita.xp-nova.com/en/rdue' },
        },
      ],
    },
    {
      theme: 'With the other divisions',
      fonction: "When Technology works alone, when it supports AGROVITA, ODT or Training.",
      questions: [
        {
          q: 'What is the difference between Technology and AGROVITA?',
          r: 'AGROVITA supports an agricultural or agro-industrial project from idea to first sale, in 13 steps. Technology handles the equipment side of those projects, or works alone when your need is purely technical: an existing plant, a donor, a cooperative, a local authority.',
          lien: { label: 'AGROVITA', href: 'https://agrovita.xp-nova.com/en' },
        },
        {
          q: 'Do you train operators?',
          r: 'We hand over transfer materials at acceptance (TS-09) and describe the skills required per equipment. Full training schemes are designed by the Training division and delivered by partner organisations.',
          lien: { label: 'Training engineering', href: 'https://ingenierie-formation.xp-nova.com' },
        },
        {
          q: 'Can you size community equipment for a municipality?',
          r: 'Yes, in support of the ODT division: collection warehouse, solar mini-grid, equipped borehole, municipal slaughterhouse. ODT leads the territorial operation; Technology provides the equipment engineering.',
          lien: { label: 'ODT', href: 'https://odt.xp-nova.com' },
        },
      ],
    },
  ],
};
