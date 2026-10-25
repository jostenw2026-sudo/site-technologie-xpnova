"use client";

import type { EtatEnvoi } from "@/lib/contact-client";
import { EMAIL_CONTACT } from "@/lib/contact-client";

const TEXTES = {
  fr: {
    crm: "Merci, votre demande est bien enregistrée. Nous vous répondons sous 48 h ouvrées.",
    courrielTitre: "Dernière étape : envoyez votre demande par e-mail",
    courriel: "Votre message est déjà rédigé. Cliquez sur le bouton : votre messagerie s'ouvre, il ne reste qu'à l'envoyer.",
    bouton: "Envoyer ma demande par e-mail",
    secours: `Si rien ne s'ouvre, écrivez-nous à ${EMAIL_CONTACT} ou appelez le +237 6700 34 000.`,
  },
  en: {
    crm: "Thank you, your request has been recorded. We will reply within 48 business hours.",
    courrielTitre: "Last step: send your request by email",
    courriel: "Your message is already written. Click the button: your mail app opens, you only need to press send.",
    bouton: "Send my request by email",
    secours: `If nothing opens, write to ${EMAIL_CONTACT} or call +237 6700 34 000.`,
  },
} as const;

export function EtatEnvoiPanneau({ etat, lang }: { etat: EtatEnvoi; lang: "fr" | "en" }) {
  const t = TEXTES[lang];
  if (etat.phase === "crm") {
    return (
      <div role="status" className="p-4 rounded border border-[#2E7D32] bg-[#EAF3EA] text-[#134021]">
        {t.crm}
      </div>
    );
  }
  if (etat.phase === "courriel") {
    return (
      <div role="status" className="p-4 rounded border border-[#0D1F5C] bg-white text-[#0D1F5C] space-y-3">
        <p className="font-semibold">{t.courrielTitre}</p>
        <p className="text-[#5A6072]">{t.courriel}</p>
        <a
          href={etat.mailto}
          className="inline-block px-6 py-3 bg-[#0D1F5C] text-white rounded font-semibold hover:bg-[#0A1850] no-underline"
        >
          {t.bouton}
        </a>
        <p className="text-sm text-[#5A6072]">{t.secours}</p>
      </div>
    );
  }
  if (etat.phase === "erreur") {
    return (
      <div role="alert" className="p-4 rounded border border-[#B42318] bg-[#FEF3F2] text-[#B42318]">
        {etat.message}
      </div>
    );
  }
  return null;
}
