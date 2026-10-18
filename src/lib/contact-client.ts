// Envoi du formulaire de contact depuis le navigateur (voir src/app/api/contact/route.ts).

export type EtatEnvoi =
  | { phase: "repos" }
  | { phase: "envoi" }
  | { phase: "crm" }
  | { phase: "courriel"; mailto: string }
  | { phase: "erreur"; message: string };

export const EMAIL_CONTACT = "hello@xp-nova.com";

function construireMailto(donnees: Record<string, string>, lang: "fr" | "en"): string {
  const sujet = lang === "en" ? "Request — Technology division (XP-NOVA)" : "Demande — division Technologie (XP-NOVA)";
  const corps = Object.entries(donnees)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k} : ${v.trim()}`)
    .join("\n")
    .slice(0, 1800);
  return `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
}

export async function envoyerDemande(donnees: Record<string, string>, lang: "fr" | "en"): Promise<EtatEnvoi> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donnees),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; enregistrement?: string; error?: string };
    if (res.status === 400 && json.error) {
      return { phase: "erreur", message: lang === "en" ? "Please check your email address." : "Vérifiez votre adresse e-mail." };
    }
    if (res.ok && json.ok && json.enregistrement === "crm") return { phase: "crm" };
  } catch {
    // réseau indisponible : repli sur l'e-mail ci-dessous
  }
  return { phase: "courriel", mailto: construireMailto(donnees, lang) };
}
