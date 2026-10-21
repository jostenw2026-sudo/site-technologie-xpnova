/**
 * Alerte WhatsApp à l'équipe XP-NOVA via Green API (green-api.com).
 * Module commun aux cinq sites du groupe, copié à l'identique (décision DG du 20/10/2026).
 *
 * Une demande reçue (contact, candidature…) envoie un court message à un groupe
 * ou à un numéro WhatsApp de l'équipe, en plus du CRM. Jamais à un prospect.
 *
 * Variables (côté serveur uniquement ; toutes absentes = aucune alerte, rien ne change) :
 *   GREENAPI_URL          apiUrl de l'instance (console Green API), ex. https://1234.api.greenapi.com
 *   GREENAPI_ID_INSTANCE  idInstance
 *   GREENAPI_TOKEN        apiTokenInstance (secret : Coolify seulement, jamais dans le dépôt)
 *   WHATSAPP_ALERTE_CHAT  destinataire : 2376XXXXXXXX@c.us (numéro) ou …@g.us (groupe)
 *
 * Garde-fou de recette : si SITE_ENV est posée et différente de « production »,
 * l'envoi n'est permis que vers un faux service local (127.0.0.1 / localhost).
 * Une recette ou une préproduction ne peut donc pas écrire sur un vrai WhatsApp.
 *
 * Module pur (aucun import Next) : les vérificateurs l'appellent hors serveur.
 */

export interface ConfigWhatsapp {
  url: string;
  idInstance: string;
  token: string;
  chat: string;
  siteEnv: string;
}

const propre = (v: string | undefined) => (v ?? "").trim().replace(/^["']|["']$/g, "");

export function lireConfig(env: Record<string, string | undefined> = process.env): ConfigWhatsapp {
  return {
    url: propre(env.GREENAPI_URL).replace(/\/+$/, ""),
    idInstance: propre(env.GREENAPI_ID_INSTANCE),
    token: propre(env.GREENAPI_TOKEN),
    chat: propre(env.WHATSAPP_ALERTE_CHAT),
    siteEnv: propre(env.SITE_ENV).toLowerCase(),
  };
}

export function whatsappConfigure(cfg: ConfigWhatsapp): boolean {
  return Boolean(cfg.url && cfg.idInstance && cfg.token && cfg.chat);
}

/** Destinataire Green API : chiffres seuls suivis de @c.us (numéro) ou chiffres-tirets @g.us (groupe). */
export function chatValide(chat: string): boolean {
  return /^\d{8,15}@c\.us$/.test(chat) || /^\d{8,15}-\d{6,13}@g\.us$/.test(chat) || /^\d{15,25}@g\.us$/.test(chat);
}

function hoteLocal(url: string): boolean {
  try {
    const h = new URL(url).hostname;
    return h === "127.0.0.1" || h === "localhost" || h === "[::1]" || h === "::1";
  } catch {
    return false;
  }
}

/** Raison du refus, ou null si l'envoi est permis. */
export function refusEnvoi(cfg: ConfigWhatsapp): string | null {
  if (!whatsappConfigure(cfg)) return "non configuré";
  if (!/^https?:\/\//.test(cfg.url)) return "GREENAPI_URL invalide";
  if (!/^\d+$/.test(cfg.idInstance)) return "GREENAPI_ID_INSTANCE invalide";
  if (!chatValide(cfg.chat)) return "WHATSAPP_ALERTE_CHAT invalide";
  const recette = cfg.siteEnv !== "" && cfg.siteEnv !== "production";
  if (recette && !hoteLocal(cfg.url)) return `SITE_ENV=${cfg.siteEnv} : envoi réel interdit hors production`;
  return null;
}

export function urlEnvoi(cfg: ConfigWhatsapp): string {
  return `${cfg.url}/waInstance${cfg.idInstance}/sendMessage/${cfg.token}`;
}

/** Message borné et sans caractères de contrôle. */
export function texteAlerte(texte: string): string {
  return texte.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, 1500);
}

/** Envoie l'alerte. Lève une erreur en cas de refus ou d'échec : voir alerterEquipe pour la version silencieuse. */
export async function envoyerAlerte(
  texte: string,
  cfg: ConfigWhatsapp = lireConfig(),
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const refus = refusEnvoi(cfg);
  if (refus) throw new Error(`WhatsApp : ${refus}`);
  const res = await fetchImpl(urlEnvoi(cfg), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId: cfg.chat, message: texteAlerte(texte), linkPreview: false }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Green API ${res.status}`);
  const corps = (await res.json().catch(() => ({}))) as { idMessage?: string };
  return corps.idMessage ?? "";
}

/**
 * Version non bloquante, à appeler après l'enregistrement de la demande :
 * ne lève jamais, ne retarde pas le visiteur au-delà de 8 s, ne journalise
 * jamais le jeton. Sans configuration, ne fait rien.
 */
export async function alerterEquipe(texte: string, origine: string): Promise<void> {
  const cfg = lireConfig();
  if (!whatsappConfigure(cfg)) return;
  try {
    await envoyerAlerte(texte, cfg);
  } catch (err) {
    console.warn(`[${origine}] alerte WhatsApp non envoyée : ${(err as Error).message}`);
  }
}
