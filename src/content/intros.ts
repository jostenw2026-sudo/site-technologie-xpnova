// Chapeaux pédagogiques de chaque page (décision DG du 21/10/2026 : un texte introductif
// par page, et un schéma quand il aide à comprendre). Textes seulement : les schémas sont
// dans src/components/Schemas.tsx.

export type CleIntro =
  | 'accueil'
  | 'domaines'
  | 'services'
  | 'referentiel'
  | 'fiche'
  | 'cycleDeVie'
  | 'references'
  | 'aPropos'
  | 'contact';

export interface Intro {
  titre: string;
  texte: string;
  points: string[];
}

export const INTROS: Record<'fr' | 'en', Record<CleIntro, Intro>> = {
  fr: {
    accueil: {
      titre: 'Ce que vous trouverez sur ce site',
      texte:
        "La division Technologie répond à une question simple : quel équipement, de quelle capacité, à quel coût d'exploitation, pour votre projet et votre site ? Elle instruit cette question en ingénieur indépendant, sans vendre ni installer.",
      points: [
        '8 domaines techniques, de la mécanisation aux équipements numériques.',
        "10 services, de l'analyse du besoin à la réception des équipements.",
        'Un référentiel de 50 sous-fonctions pour nommer précisément ce dont vous avez besoin.',
      ],
    },
    domaines: {
      titre: 'Comment lire cette page',
      texte:
        "Chaque domaine regroupe des équipements qui remplissent la même fonction technique dans votre projet, quelle que soit la filière. Six domaines suivent le flux de la production au marché ; l'énergie et le numérique traversent tous les autres.",
      points: [
        "Le code T1 à T8 identifie le domaine ; les pastilles T1.1, T1.2… sont ses sous-fonctions, chacune avec sa fiche.",
        "« Périmètre d'ingénierie » dit ce que XP-NOVA fait ; « Livrables » ce que vous recevez.",
        'Les services applicables renvoient aux dix services décrits sur la page Services.',
      ],
    },
    services: {
      titre: 'Comment lire cette page',
      texte:
        "Les dix services se commandent séparément ou en chaîne. Les cinq premiers préparent une décision d'achat ; les cinq suivants sécurisent la réalisation, de l'analyse des offres à la réception et à l'intégration.",
      points: [
        'Chaque service a un code TS-01 à TS-10, des livrables nommés et une durée indicative.',
        "Un service se combine avec une sous-fonction du référentiel : « T2.2·TS-04 » = dimensionnement d'un pompage.",
        "Le devis n'est établi qu'après ouverture du dossier, en FCFA, sur la base du besoin réellement cadré.",
      ],
    },
    referentiel: {
      titre: 'Comment lire cette page',
      texte:
        "Le référentiel RT-TECH classe les équipements par fonction technique, jamais par marque ni par filière. Il sert à nommer un besoin sans ambiguïté, à rédiger un cahier des charges comparable et à dialoguer avec les fournisseurs sur des bases neutres.",
      points: [
        'Filtrez par domaine, par type (physique, numérique, hybride), par maillon de la chaîne de valeur ou par besoin.',
        'Chaque fiche donne les équipements types, les grandeurs à dimensionner, les risques au Cameroun et le cadre normatif.',
        "Depuis une fiche, demandez une expertise : le code de prestation est pré-rempli dans le formulaire.",
      ],
    },
    fiche: {
      titre: 'Comment lire cette fiche',
      texte:
        "La fiche décrit une fonction technique, pas un produit : les équipements cités sont des types, pas des marques. Les grandeurs à dimensionner sont celles que XP-NOVA calcule avant tout achat.",
      points: [
        'P = physique, N = numérique, H = hybride (organe physique piloté par du numérique).',
        "« Cadre en cours de confirmation » signale une norme ou une autorité que nous vérifions encore.",
        'Les services clés sont ceux que cette sous-fonction mobilise le plus souvent.',
      ],
    },
    cycleDeVie: {
      titre: 'Comment lire cette page',
      texte:
        "Un équipement ne se juge pas à son prix d'achat mais à ce qu'il coûte et produit sur toute sa vie. Les neuf étapes CV1 à CV9 servent de grille à chaque étude de variantes et à chaque cahier des charges : une machine indisponible localement, sans pièces ni compétences, est écartée même si elle est la moins chère.",
      points: [
        "CV1 et CV2 se jouent avant l'achat ; CV3 à CV5 à la mise en route ; CV6 à CV9 pendant l'exploitation.",
        "La grille alimente le « budget de continuité » du CAPEX : énergie de secours, stock critique, pièces de rechange.",
        'Les coûts sont exprimés en FCFA sur la durée de vie réelle, pas sur la durée théorique du catalogue.',
      ],
    },
    references: {
      titre: 'Ce que vous trouverez ici',
      texte:
        "Nous ne publions une référence que lorsque le rôle exact de XP-NOVA, le client, le lieu et la période sont documentés. Une référence sans ces quatre éléments n'en est pas une.",
      points: [
        'Chaque référence précise le domaine, les services rendus et le livrable remis.',
        'Les projets sous confidentialité sont décrits sans nom de client, avec son accord.',
        'Les réalisations des autres divisions sont publiées sur leurs sites respectifs.',
      ],
    },
    aPropos: {
      titre: 'Ce que vous trouverez ici',
      texte:
        "Cette page explique qui nous sommes, ce que nous faisons et, surtout, ce que nous ne faisons pas. Notre valeur tient à cette frontière : nous ne vendons rien d'autre que de l'ingénierie.",
      points: [
        "Une division du bureau d'ingénierie conseil XP-NOVA, aux côtés d'AGROVITA, ODT et Formation.",
        'Un rôle de conseil indépendant : aucune commission, aucun lien avec un fournisseur.',
        "Un ancrage camerounais : disponibilité locale, maintenance et énergie sont dans chaque étude.",
      ],
    },
    contact: {
      titre: 'Comment se passe une demande',
      texte:
        "Le dépôt d'une demande est gratuit et sans engagement. Décrivez votre projet et votre site ; un ingénieur vous répond sous 48 h ouvrées pour cadrer le besoin. Le devis, en FCFA, ne vient qu'après cette première lecture.",
      points: [
        'Plus votre description est concrète (surface, volumes, énergie disponible, site), plus la première réponse est utile.',
        'Vous pouvez aussi écrire directement sur WhatsApp ; le formulaire garde une trace pour vous et pour nous.',
        "Un code de prestation pré-rempli signifie que vous venez d'une fiche du référentiel : laissez-le, il nous oriente.",
      ],
    },
  },
  en: {
    accueil: {
      titre: 'What you will find on this site',
      texte:
        'The Technology division answers a simple question: which equipment, at what capacity, at what operating cost, for your project and your site? It investigates it as an independent engineer, without selling or installing anything.',
      points: [
        '8 technical domains, from mechanisation to digital equipment.',
        '10 services, from needs analysis to equipment acceptance.',
        'A reference of 50 sub-functions to name precisely what you need.',
      ],
    },
    domaines: {
      titre: 'How to read this page',
      texte:
        'Each domain groups equipment that fulfils the same technical function in your project, whatever the value chain. Six domains follow the flow from production to market; energy and digital cut across all the others.',
      points: [
        'The T1 to T8 code identifies the domain; the T1.1, T1.2… chips are its sub-functions, each with its own sheet.',
        '"Engineering scope" says what XP-NOVA does; "Deliverables" what you receive.',
        'Applicable services refer to the ten services described on the Services page.',
      ],
    },
    services: {
      titre: 'How to read this page',
      texte:
        'The ten services can be ordered separately or as a chain. The first five prepare a purchasing decision; the next five secure delivery, from bid analysis to acceptance and integration.',
      points: [
        'Each service has a code TS-01 to TS-10, named deliverables and an indicative duration.',
        'A service combines with a reference sub-function: "T2.2·TS-04" = sizing of a pumping system.',
        'The quote is issued only after the file is opened, in FCFA, based on the need as actually framed.',
      ],
    },
    referentiel: {
      titre: 'How to read this page',
      texte:
        'The RT-TECH reference classifies equipment by technical function, never by brand or value chain. It is used to name a need unambiguously, to write comparable specifications and to talk to suppliers on neutral ground.',
      points: [
        'Filter by domain, by type (physical, digital, hybrid), by value-chain link or by need.',
        'Each sheet gives typical equipment, sizing parameters, risks in Cameroon and the regulatory framework.',
        'From a sheet, request an expertise: the service code is pre-filled in the form.',
      ],
    },
    fiche: {
      titre: 'How to read this sheet',
      texte:
        'The sheet describes a technical function, not a product: the equipment listed are types, not brands. The sizing parameters are those XP-NOVA calculates before any purchase.',
      points: [
        'P = physical, N = digital, H = hybrid (physical device driven by digital control).',
        '"Framework being confirmed" flags a standard or authority we are still verifying.',
        'Key services are those this sub-function mobilises most often.',
      ],
    },
    cycleDeVie: {
      titre: 'How to read this page',
      texte:
        'Equipment is not judged by its purchase price but by what it costs and produces over its whole life. The nine steps CV1 to CV9 are the grid for every options study and every specification: a machine unavailable locally, without parts or skills, is ruled out even if it is the cheapest.',
      points: [
        'CV1 and CV2 are decided before purchase; CV3 to CV5 at start-up; CV6 to CV9 during operation.',
        'The grid feeds the CAPEX "continuity budget": backup energy, critical stock, spare parts.',
        'Costs are expressed in FCFA over the real service life, not the catalogue life.',
      ],
    },
    references: {
      titre: 'What you will find here',
      texte:
        "We publish a reference only when XP-NOVA's exact role, the client, the location and the period are documented. A reference without these four elements is not one.",
      points: [
        'Each reference states the domain, the services delivered and the deliverable handed over.',
        'Confidential projects are described without the client name, with their consent.',
        'The other divisions publish their achievements on their own sites.',
      ],
    },
    aPropos: {
      titre: 'What you will find here',
      texte:
        'This page explains who we are, what we do and, above all, what we do not do. Our value lies in that boundary: we sell nothing but engineering.',
      points: [
        'A division of the XP-NOVA engineering consultancy, alongside AGROVITA, ODT and Training.',
        'An independent advisory role: no commission, no link with any supplier.',
        'Rooted in Cameroon: local availability, maintenance and energy are in every study.',
      ],
    },
    contact: {
      titre: 'How a request works',
      texte:
        'Submitting a request is free and without commitment. Describe your project and your site; an engineer replies within 48 working hours to frame the need. The quote, in FCFA, comes only after this first reading.',
      points: [
        'The more concrete your description (area, volumes, available energy, site), the more useful the first reply.',
        'You can also write directly on WhatsApp; the form keeps a record for you and for us.',
        'A pre-filled service code means you came from a reference sheet: leave it, it guides us.',
      ],
    },
  },
};
