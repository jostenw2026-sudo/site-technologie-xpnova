"use client";

import { useRef, useState } from "react";
import { URL_SITES } from "@/lib/sites";
import { generateLead } from "@/lib/analytics";

// Formulaire de candidature de la division (29/10/2026) → /api/candidature → Odoo.
// CV obligatoire ; case de consentement obligatoire, texte complet FR + EN publié sur
// le portail (/confidentialite/candidats) ; même version que le portail et AGROVITA.
// Mesure : generate_lead { form_id: "candidature", status } — aucune donnée saisie.

const VERSION_CONSENTEMENT = "2026-10-29";
const MAX_FILES = 6;
const MAX_TOTAL = 15 * 1024 * 1024;
const COURRIEL = "hello@xp-nova.com";

const TEXTES = {
  fr: {
    nom: "Nom et prénom",
    email: "E-mail",
    telephone: "Téléphone (facultatif)",
    profil: "Poste actuel ou spécialité (facultatif)",
    poste: "Profil visé",
    spontanee: "Candidature spontanée",
    lien: "Lien vers un CV en ligne ou un portfolio (facultatif)",
    docs: "CV et pièces jointes",
    docsAide: "CV obligatoire. PDF, Word, JPG ou PNG ; 6 fichiers et 15 Mo au maximum.",
    message: "Votre message",
    consentement:
      "J’accepte qu’XP-NOVA conserve mon CV et mes données dans sa base de candidats et d’experts (Odoo) et me recontacte pour des postes ou missions dans toutes ses divisions : AGROVITA, ODT, TECHNOLOGIE, FORMATION.",
    lireConsentement: "Lire le consentement",
    envoyer: "Envoyer ma candidature",
    envoi: "Envoi…",
    trop: "Trop de fichiers ou fichiers trop volumineux (6 fichiers, 15 Mo au total).",
    erreur: "L’envoi a échoué. Réessayez, ou écrivez-nous à",
    merci: "Candidature reçue. Nous accusons réception sous 48 heures ouvrées.",
    journal: "Candidature reçue, mais elle n’a pas pu entrer dans notre base. Pour être sûr qu’elle nous parvienne, envoyez aussi votre CV à",
  },
  en: {
    nom: "Full name",
    email: "E-mail",
    telephone: "Phone (optional)",
    profil: "Current position or specialty (optional)",
    poste: "Profile",
    spontanee: "Open application",
    lien: "Link to an online CV or portfolio (optional)",
    docs: "CV and attachments",
    docsAide: "CV required. PDF, Word, JPG or PNG; up to 6 files and 15 MB.",
    message: "Your message",
    consentement:
      "I agree that XP-NOVA may keep my CV and data in its applicant and expert database (Odoo) and contact me about positions or assignments in all its divisions: AGROVITA, ODT, TECHNOLOGY, TRAINING.",
    lireConsentement: "Read the consent",
    envoyer: "Send my application",
    envoi: "Sending…",
    trop: "Too many or too large files (6 files, 15 MB in total).",
    erreur: "Sending failed. Please try again, or write to us at",
    merci: "Application received. We acknowledge receipt within 48 working hours.",
    journal: "Application received, but it could not enter our database. To make sure it reaches us, please also send your CV to",
  },
} as const;

export default function FormulaireCandidature({ lang, profils }: { lang: "fr" | "en"; profils: string[] }) {
  const t = TEXTES[lang];
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "journal" | "erreur">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fichiers = fd.getAll("documents").filter((f): f is File => f instanceof File && f.size > 0);
    const total = fichiers.reduce((s, f) => s + f.size, 0);
    if (fichiers.length > MAX_FILES || total > MAX_TOTAL) {
      setEtat("erreur");
      setMessage(t.trop);
      return;
    }
    setEtat("envoi");
    setMessage("");
    try {
      const res = await fetch("/api/candidature", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; enregistrement?: "crm" | "journal"; error?: string };
      if (!res.ok || !data.ok) {
        setEtat("erreur");
        setMessage(data.error ?? "");
        return;
      }
      const statut = data.enregistrement === "journal" ? "journal" : "crm";
      generateLead("candidature", statut);
      setEtat(statut === "journal" ? "journal" : "ok");
      form.reset();
    } catch {
      setEtat("erreur");
    }
  }

  const champ = "w-full rounded-md border border-[#E2E5EC] bg-white px-4 py-3 text-[#1c1c22] focus:border-[#0D1F5C] focus:outline-none";
  const etiquette = "mb-1 block text-sm font-semibold text-[#0D1F5C]";

  if (etat === "ok") {
    return <p className="rounded-md border-l-4 border-[#D4A017] bg-[#F4F5F8] p-5 text-[#0D1F5C]">{t.merci}</p>;
  }

  return (
    <form ref={formRef} onSubmit={envoyer} className="grid gap-5 sm:grid-cols-2" encType="multipart/form-data">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input type="hidden" name="consentementVersion" value={VERSION_CONSENTEMENT} />
      <div>
        <label className={etiquette} htmlFor="cand-nom">{t.nom} *</label>
        <input id="cand-nom" name="nom" required autoComplete="name" className={champ} />
      </div>
      <div>
        <label className={etiquette} htmlFor="cand-email">{t.email} *</label>
        <input id="cand-email" name="email" type="email" required autoComplete="email" className={champ} />
      </div>
      <div>
        <label className={etiquette} htmlFor="cand-tel">{t.telephone}</label>
        <input id="cand-tel" name="telephone" type="tel" autoComplete="tel" className={champ} />
      </div>
      <div>
        <label className={etiquette} htmlFor="cand-profil">{t.profil}</label>
        <input id="cand-profil" name="profil" className={champ} />
      </div>
      <div className="sm:col-span-2">
        <label className={etiquette} htmlFor="cand-poste">{t.poste}</label>
        <select id="cand-poste" name="poste" className={champ} defaultValue="">
          <option value="">{t.spontanee}</option>
          {profils.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={etiquette} htmlFor="cand-lien">{t.lien}</label>
        <input id="cand-lien" name="lien" type="url" className={champ} />
      </div>
      <div className="sm:col-span-2">
        <label className={etiquette} htmlFor="cand-docs">{t.docs} *</label>
        <input
          id="cand-docs"
          name="documents"
          type="file"
          multiple
          required
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="w-full rounded-md border border-[#E2E5EC] bg-white px-4 py-3 text-[#1c1c22] file:mr-3 file:rounded-md file:border-0 file:bg-[#0D1F5C] file:px-4 file:py-2 file:font-semibold file:text-white"
        />
        <p className="mt-1 text-xs text-[#5A6072]">{t.docsAide}</p>
      </div>
      <div className="sm:col-span-2">
        <label className={etiquette} htmlFor="cand-message">{t.message} *</label>
        <textarea id="cand-message" name="message" required rows={5} className={champ} />
      </div>
      <div className="flex items-start gap-3 sm:col-span-2">
        <input id="cand-consentement" name="consentement" type="checkbox" value="oui" required className="mt-1 h-4 w-4 shrink-0" />
        <label htmlFor="cand-consentement" className="text-sm text-[#5A6072]">
          {t.consentement}{" "}
          <a
            href={`${URL_SITES.portail}/confidentialite/candidats#${lang}`}
            target="_blank"
            rel="noopener"
            className="font-semibold text-[#0D1F5C] underline"
          >
            {t.lireConsentement}
          </a>{" "}
          *
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="rounded-md bg-[#D4A017] px-6 py-3 font-semibold text-[#0D1F5C] hover:bg-[#E9C25A] disabled:opacity-60"
        >
          {etat === "envoi" ? t.envoi : t.envoyer}
        </button>
        {etat === "erreur" && (
          <p className="text-sm text-[#B42318]">
            {message || (
              <>
                {t.erreur} <a href={`mailto:${COURRIEL}`} className="underline">{COURRIEL}</a>.
              </>
            )}
          </p>
        )}
        {etat === "journal" && (
          <p className="text-sm text-[#0D1F5C]">
            {t.journal} <a href={`mailto:${COURRIEL}`} className="underline">{COURRIEL}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
