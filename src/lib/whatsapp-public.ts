// Canal WhatsApp côté visiteur (décision DG du 21/10/2026 : WhatsApp systématique).
// Distinct de src/lib/whatsapp.ts, qui alerte l'équipe via Green API côté serveur.
//
// Numéro affiché et utilisé dans wa.me : NEXT_PUBLIC_WHATSAPP_NUMERO (chiffres seuls, indicatif
// compris), à défaut le numéro du site. Changer de numéro = une variable Coolify, aucun code.

export const NUMERO_WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? "237670034000").replace(/\D/g, "");

export const NUMERO_WHATSAPP_AFFICHE = `+${NUMERO_WHATSAPP.slice(0, 3)} ${NUMERO_WHATSAPP.slice(3, 6)} ${NUMERO_WHATSAPP.slice(6, 9)} ${NUMERO_WHATSAPP.slice(9)}`.trim();

/** Lien wa.me avec message pré-rédigé (le visiteur peut le modifier avant d'envoyer). */
export function lienWhatsapp(message: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// Le premier mot de chaque message est le mot-clé de la division (TECHNOLOGIE / TECHNOLOGY) : le chatbot
// du numéro public le reconnaît et propose directement les besoins de la division (volet 1, 21/10/2026).
export const MESSAGES = {
  fr: {
    defaut: "TECHNOLOGIE — Bonjour XP-NOVA Technologie, je souhaite échanger sur un projet d'équipement.",
    prestation: (code: string) => `TECHNOLOGIE — Bonjour XP-NOVA Technologie, je souhaite échanger sur la prestation ${code} du référentiel.`,
    page: (titre: string) => `TECHNOLOGIE — Bonjour XP-NOVA Technologie, je vous écris depuis la page « ${titre} ».`,
    bouton: "Échanger sur WhatsApp",
    boutonCourt: "WhatsApp",
    aria: "Ouvrir une conversation WhatsApp avec XP-NOVA Technologie",
    reponse: "Un expert vous répond sous 48 h ouvrées.",
  },
  en: {
    defaut: "TECHNOLOGY — Hello XP-NOVA Technology, I would like to discuss an equipment project.",
    prestation: (code: string) => `TECHNOLOGY — Hello XP-NOVA Technology, I would like to discuss service ${code} from the reference.`,
    page: (titre: string) => `TECHNOLOGY — Hello XP-NOVA Technology, I am writing from the page "${titre}".`,
    bouton: "Chat on WhatsApp",
    boutonCourt: "WhatsApp",
    aria: "Open a WhatsApp conversation with XP-NOVA Technology",
    reponse: "An expert replies within 48 working hours.",
  },
} as const;
