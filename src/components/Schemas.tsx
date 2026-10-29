// Schémas explicatifs en SVG, aux couleurs de la charte (navy #0D1F5C, or #D4A017).
// Composants serveur, sans dépendance ; chaque schéma est bilingue et lisible sur mobile
// (viewBox 760 de large, hauteur libre). Un texte alternatif résume le schéma.

type L = 'fr' | 'en';
const NAVY = '#0D1F5C';
const GOLD = '#D4A017';
const GREY = '#5A6072';
const LINE = '#C9CED8';
const TINT = '#F4F5F8';

const Fleche = ({ id }: { id: string }) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill={GREY} />
    </marker>
  </defs>
);

function Boite({ x, y, w, h, titre, lignes = [], fort = false, tint = false }: { x: number; y: number; w: number; h: number; titre: string; lignes?: string[]; fort?: boolean; tint?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fort ? GOLD : tint ? TINT : 'white'} fillOpacity={fort ? 0.15 : 1} stroke={fort ? GOLD : LINE} strokeWidth={fort ? 2 : 1.25} />
      <text x={x + 14} y={y + 24} fontSize="13" fontWeight="600" fill={NAVY}>
        {titre}
      </text>
      {lignes.map((l, i) => (
        <text key={l} x={x + 14} y={y + 42 + i * 16} fontSize="11.5" fill={GREY}>
          {l}
        </text>
      ))}
    </g>
  );
}

/** Accueil : XP-NOVA conçoit et vérifie ; les prestataires fournissent et installent ; le client exploite. */
export function SchemaRole({ lang = 'fr' }: { lang?: L }) {
  const t =
    lang === 'en'
      ? { titre: 'XP-NOVA engineers; others supply, install and operate', a: 'XP-NOVA TECHNOLOGY', a1: 'Analyses, sizes, specifies', a2: 'Compares bids, tests, accepts', b: 'Selected contractors', b1: 'Supply the equipment', b2: 'Install and maintain', c: 'You', c1: 'Decide and buy', c2: 'Operate and produce', f1: 'specifications', f2: 'acceptance report' }
      : { titre: 'XP-NOVA conçoit et vérifie ; d’autres fournissent, installent et exploitent', a: 'XP-NOVA TECHNOLOGIE', a1: 'Analyse, dimensionne, spécifie', a2: 'Compare les offres, essaie, réceptionne', b: 'Prestataires retenus', b1: "Fournissent l'équipement", b2: 'Installent et maintiennent', c: 'Vous', c1: 'Décidez et achetez', c2: 'Exploitez et produisez', f1: 'cahier des charges', f2: 'PV de réception' };
  return (
    <svg viewBox="0 0 760 200" role="img" aria-label={t.titre} className="w-full h-auto" fontFamily="inherit">
      <Fleche id="role-arrow" />
      <text x="16" y="24" fontSize="14" fontWeight="600" fill={NAVY}>
        {t.titre}
      </text>
      <Boite x={16} y={52} w={232} h={80} titre={t.a} lignes={[t.a1, t.a2]} fort />
      <Boite x={296} y={52} w={200} h={80} titre={t.b} lignes={[t.b1, t.b2]} />
      <Boite x={544} y={52} w={200} h={80} titre={t.c} lignes={[t.c1, t.c2]} tint />
      <g fill="none" stroke={GREY} strokeWidth="1.25" markerEnd="url(#role-arrow)">
        <path d="M248 92H296" />
        <path d="M496 92H544" />
      </g>
      <text x="272" y="82" fontSize="10.5" fill={GREY} textAnchor="middle">
        {t.f1}
      </text>
      <path d="M396 132V164H116V132" fill="none" stroke={GREY} strokeWidth="1.25" strokeDasharray="4 3" markerEnd="url(#role-arrow)" />
      <text x="256" y="178" fontSize="10.5" fill={GREY} textAnchor="middle">
        {t.f2}
      </text>
    </svg>
  );
}

/** Domaines : six domaines sur le flux Produire → Transformer → Acheminer → Conquérir, deux transversaux. */
export function SchemaFlux({ lang = 'fr' }: { lang?: L }) {
  const t =
    lang === 'en'
      ? { titre: 'Six domains follow the flow; energy and digital cut across', s: ['Produce', 'Process', 'Convey', 'Conquer'], d: [['T1 Mechanisation', 'T2 Irrigation and water', 'T3 Controlled environments'], ['T4 Processing and plants'], ['T5 Storage and cold chain', 'T7 Handling and logistics'], ['T4.8 Packaging', 'T7.4 Export grading', 'T8.6 Traceability']], tr: ['T6 Energy and utilities', 'T8 Digital equipment'], note: 'Cross-cutting: serve all four stages' }
      : { titre: 'Six domaines suivent le flux ; énergie et numérique le traversent', s: ['Produire', 'Transformer', 'Acheminer', 'Conquérir'], d: [['T1 Mécanisation', 'T2 Irrigation et eau', 'T3 Environnements contrôlés'], ['T4 Transformation et usines'], ['T5 Stockage et froid', 'T7 Manutention et logistique'], ['T4.8 Conditionnement', 'T7.4 Calibrage export', 'T8.6 Traçabilité']], tr: ['T6 Énergie et utilités', 'T8 Équipements numériques'], note: 'Transversaux : servent les quatre temps' };
  return (
    <svg viewBox="0 0 760 300" role="img" aria-label={t.titre} className="w-full h-auto">
      <Fleche id="flux-arrow" />
      <text x="16" y="24" fontSize="14" fontWeight="600" fill={NAVY}>
        {t.titre}
      </text>
      {t.s.map((s, i) => {
        const x = 16 + i * 184;
        return (
          <g key={s}>
            <rect x={x} y={44} width={168} height={34} rx="8" fill={NAVY} />
            <text x={x + 84} y={66} fontSize="13" fontWeight="600" fill="white" textAnchor="middle">
              {s}
            </text>
            {i < 3 && <path d={`M${x + 168} 61H${x + 184}`} stroke={GREY} strokeWidth="1.25" markerEnd="url(#flux-arrow)" />}
            {t.d[i].map((d, j) => (
              <g key={d}>
                <rect x={x} y={92 + j * 38} width={168} height={30} rx="6" fill="white" stroke={i === 3 ? GOLD : LINE} strokeWidth="1.25" strokeDasharray={i === 3 ? '4 3' : undefined} />
                <text x={x + 10} y={111 + j * 38} fontSize="11.5" fill={NAVY}>
                  {d}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      <text x="16" y="226" fontSize="10.5" fill={GREY}>
        {t.note}
      </text>
      {t.tr.map((d, i) => (
        <g key={d}>
          <rect x={16 + i * 368} y={236} width={360} height={40} rx="8" fill={GOLD} fillOpacity="0.15" stroke={GOLD} strokeWidth="2" />
          <text x={32 + i * 368} y={261} fontSize="13" fontWeight="600" fill={NAVY}>
            {d}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Services : dix services sur quatre phases de la méthode XP-NOVA. */
export function SchemaParcours({ lang = 'fr' }: { lang?: L }) {
  const t =
    lang === 'en'
      ? { titre: 'Ten services, from understanding to sustaining', ph: ['Understand', 'Design', 'Deliver', 'Sustain'], s: [['TS-01 Needs analysis'], ['TS-02 Options', 'TS-03 Architecture', 'TS-04 Sizing', 'TS-05 Specifications'], ['TS-06 Bid analysis', 'TS-07 Testing', 'TS-08 Performance', 'TS-10 Integration'], ['TS-09 Acceptance']], j: ['purchase decision', 'acceptance report'] }
      : { titre: 'Dix services, de la compréhension à la pérennisation', ph: ['Comprendre', 'Concevoir', 'Réaliser', 'Pérenniser'], s: [['TS-01 Analyse du besoin'], ['TS-02 Variantes', 'TS-03 Architecture', 'TS-04 Dimensionnement', 'TS-05 Cahiers des charges'], ['TS-06 Analyse d’offres', 'TS-07 Essais', 'TS-08 Performance', 'TS-10 Intégration'], ['TS-09 Réception']], j: ['décision d’achat', 'PV de réception'] };
  const w = [120, 232, 232, 120];
  const xs = [16, 152, 400, 648];
  return (
    <svg viewBox="0 0 760 236" role="img" aria-label={t.titre} className="w-full h-auto">
      <Fleche id="parc-arrow" />
      <text x="16" y="24" fontSize="14" fontWeight="600" fill={NAVY}>
        {t.titre}
      </text>
      <line x1="16" y1="60" x2="744" y2="60" stroke={LINE} strokeWidth="1.25" />
      {t.ph.map((p, i) => (
        <g key={p}>
          <circle cx={xs[i] + w[i] / 2} cy={60} r="6" fill={GOLD} />
          <text x={xs[i] + w[i] / 2} y={46} fontSize="12" fontWeight="600" fill={NAVY} textAnchor="middle">
            {p}
          </text>
          {t.s[i].map((s, j) => (
            <g key={s}>
              <rect x={xs[i]} y={80 + j * 34} width={w[i]} height={28} rx="6" fill={i === 1 || i === 2 ? 'white' : TINT} stroke={LINE} strokeWidth="1.25" />
              <text x={xs[i] + 10} y={98 + j * 34} fontSize="11.5" fill={NAVY}>
                {s}
              </text>
            </g>
          ))}
        </g>
      ))}
      <path d="M384 64 V222" stroke={GOLD} strokeWidth="1.25" strokeDasharray="4 3" />
      <text x="384" y="232" fontSize="10.5" fill={GREY} textAnchor="middle">
        {t.j[0]}
      </text>
      <path d="M632 64 V222" stroke={GOLD} strokeWidth="1.25" strokeDasharray="4 3" />
      <text x="632" y="232" fontSize="10.5" fill={GREY} textAnchor="middle">
        {t.j[1]}
      </text>
    </svg>
  );
}

/** Référentiel : anatomie d'un code de prestation Tx.y·TS-nn. */
export function SchemaCode({ lang = 'fr' }: { lang?: L }) {
  const t =
    lang === 'en'
      ? { titre: 'Reading a service code', ex: 'T2.2 · TS-04', a: 'Domain', a1: 'T2 Irrigation and water', b: 'Sub-function', b1: 'T2.2 Pumping', c: 'Service', c1: 'TS-04 Sizing', r: 'Sizing of a pumping system: flow, head, hours of operation' }
      : { titre: 'Lire un code de prestation', ex: 'T2.2 · TS-04', a: 'Domaine', a1: 'T2 Irrigation et eau', b: 'Sous-fonction', b1: 'T2.2 Pompage', c: 'Service', c1: 'TS-04 Dimensionnement', r: "Dimensionnement d'un pompage : débit, hauteur manométrique, heures de fonctionnement" };
  return (
    <svg viewBox="0 0 760 190" role="img" aria-label={t.titre} className="w-full h-auto">
      <text x="16" y="24" fontSize="14" fontWeight="600" fill={NAVY}>
        {t.titre}
      </text>
      <text x="380" y="72" fontSize="34" fontWeight="700" fill={NAVY} textAnchor="middle" fontFamily="ui-monospace, monospace">
        {t.ex}
      </text>
      <g stroke={GOLD} strokeWidth="1.25" fill="none">
        <path d="M300 84 V104 H140 V120" />
        <path d="M352 84 V104 H380 V120" />
        <path d="M472 84 V104 H620 V120" />
      </g>
      <Boite x={40} y={120} w={200} h={52} titre={t.a} lignes={[t.a1]} tint />
      <Boite x={280} y={120} w={200} h={52} titre={t.b} lignes={[t.b1]} fort />
      <Boite x={520} y={120} w={200} h={52} titre={t.c} lignes={[t.c1]} tint />
      <text x="380" y="186" fontSize="10.5" fill={GREY} textAnchor="middle">
        {t.r}
      </text>
    </svg>
  );
}

/** Cycle de vie : neuf étapes en trois temps. */
export function SchemaCycle({ lang = 'fr' }: { lang?: L }) {
  const t =
    lang === 'en'
      ? { titre: 'Nine steps, three moments of an equipment’s life', g: ['Before purchase', 'Start-up', 'Operation'], s: [['CV1 Local availability', 'CV2 Procurement'], ['CV3 Installation', 'CV4 Commissioning', 'CV5 Safety'], ['CV6 Spare parts', 'CV7 Maintenance', 'CV8 Operating costs', 'CV9 Renewal']], note: 'A cheap machine without parts or skills fails CV6 and CV7: it is ruled out.' }
      : { titre: "Neuf étapes, trois temps de la vie d'un équipement", g: ["Avant l'achat", 'Mise en route', 'Exploitation'], s: [['CV1 Disponibilité locale', 'CV2 Approvisionnement'], ['CV3 Installation', 'CV4 Mise en service', 'CV5 Sécurité'], ['CV6 Pièces de rechange', 'CV7 Maintenance', "CV8 Coûts d'exploitation", 'CV9 Renouvellement']], note: 'Une machine bon marché sans pièces ni compétences échoue à CV6 et CV7 : elle est écartée.' };
  const xs = [16, 264, 512];
  return (
    <svg viewBox="0 0 760 248" role="img" aria-label={t.titre} className="w-full h-auto">
      <Fleche id="cv-arrow" />
      <text x="16" y="24" fontSize="14" fontWeight="600" fill={NAVY}>
        {t.titre}
      </text>
      {t.g.map((g, i) => (
        <g key={g}>
          <rect x={xs[i]} y={44} width={232} height={34} rx="8" fill={i === 2 ? GOLD : NAVY} fillOpacity={i === 2 ? 0.15 : 1} stroke={i === 2 ? GOLD : NAVY} strokeWidth="1.5" />
          <text x={xs[i] + 116} y={66} fontSize="13" fontWeight="600" fill={i === 2 ? NAVY : 'white'} textAnchor="middle">
            {g}
          </text>
          {i < 2 && <path d={`M${xs[i] + 232} 61H${xs[i] + 248}`} stroke={GREY} strokeWidth="1.25" markerEnd="url(#cv-arrow)" />}
          {t.s[i].map((s, j) => (
            <g key={s}>
              <rect x={xs[i]} y={92 + j * 32} width={232} height={26} rx="6" fill="white" stroke={LINE} strokeWidth="1.25" />
              <text x={xs[i] + 10} y={109 + j * 32} fontSize="11.5" fill={NAVY}>
                {s}
              </text>
            </g>
          ))}
        </g>
      ))}
      <text x="16" y="240" fontSize="10.5" fill={GREY}>
        {t.note}
      </text>
    </svg>
  );
}

/** Contact : trois étapes d'une demande. */
export function SchemaDemande({ lang = 'fr' }: { lang?: L }) {
  const t =
    lang === 'en'
      ? { titre: 'From your request to the quote', s: [['1. Your request', 'Form or WhatsApp', 'free, no commitment'], ['2. First reply', 'within 48 working hours', 'an engineer frames the need'], ['3. File opening', 'quote in FCFA', 'then the mission starts']] }
      : { titre: 'De votre demande au devis', s: [['1. Votre demande', 'Formulaire ou WhatsApp', 'gratuite, sans engagement'], ['2. Premier retour', 'sous 48 h ouvrées', 'un ingénieur cadre le besoin'], ['3. Ouverture du dossier', 'devis en FCFA', 'puis la mission démarre']] };
  return (
    <svg viewBox="0 0 760 132" role="img" aria-label={t.titre} className="w-full h-auto">
      <Fleche id="dem-arrow" />
      <text x="16" y="24" fontSize="14" fontWeight="600" fill={NAVY}>
        {t.titre}
      </text>
      {t.s.map((s, i) => (
        <g key={s[0]}>
          <Boite x={16 + i * 256} y={44} w={224} h={76} titre={s[0]} lignes={[s[1], s[2]]} fort={i === 1} tint={i !== 1} />
          {i < 2 && <path d={`M${240 + i * 256} 82H${272 + i * 256}`} stroke={GREY} strokeWidth="1.25" markerEnd="url(#dem-arrow)" />}
        </g>
      ))}
    </svg>
  );
}
