/**
 * Mesure d'audience GA4 du site — conventions du groupe XP-NOVA.
 *
 * Modèle : le module du site AGROVITA (xpnova-architecture, lib/analytics.ts),
 * mêmes noms d'événements, mêmes paramètres, même marquage du trafic interne.
 * Ce module est la SEULE porte vers `gtag` : aucun composant ne l'appelle.
 *
 * Ce que la mesure ne fait JAMAIS :
 *  - se charger sans identifiant (variable de build NEXT_PUBLIC_GA_MEASUREMENT_ID
 *    absente = aucune balise, aucun script) ;
 *  - se charger ailleurs que sur l'hôte de production (`HOTE_MESURE`) : ni en
 *    local, ni en recette, ni sur un hôte d'aperçu ;
 *  - transmettre un nom, un e-mail, un téléphone, un contenu de formulaire, ni
 *    une URL brute : `page_location` ne garde que le chemin et les utm_*.
 *
 * Les gardes sont des fonctions pures, rejouées par `npm run verifier:analytics`.
 */

export const HOTE_MESURE = "technologie.xp-nova.com";
export const SITE_MESURE = "technologie.xp-nova.com";

/**
 * Identifiant de mesure du flux GA4 de ce site. Inliné par `next build` : la
 * variable doit exister au build (ARG du Dockerfile, « Build Variable » dans
 * Coolify). Pas de valeur par défaut : sans elle, la mesure est inactive.
 */
export const GA4_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "").trim();

/** Paramètres d'URL qui portent un secret, une référence ou une signature : page jamais mesurée. */
export const PARAMS_EXCLUS = /(^|[?&])(t|key|token|sig|ref|or|commande)=/;

/** Seuls paramètres conservés dans `page_location` : l'attribution de campagne. */
export const PARAMS_CONSERVES = /^utm_(source|medium|campaign|term|content)$/;

/** Valeur admise pour un utm_* : un identifiant, jamais un texte libre (e-mail, nom…). */
export const VALEUR_UTM = /^[A-Za-z0-9_.-]{1,64}$/;

export function urlMesurable(search: string): boolean {
  return !PARAMS_EXCLUS.test(search || "");
}

/** `page_location` sans rien d'autre que le chemin et les paramètres utm_* valides. */
export function pageLocationSure(origin: string, pathname: string, search: string): string {
  const garde: string[] = [];
  const brut = (search || "").replace(/^\?/, "");
  for (const morceau of brut ? brut.split("&") : []) {
    const [nom, ...reste] = morceau.split("=");
    const valeur = reste.join("=");
    if (PARAMS_CONSERVES.test(nom) && VALEUR_UTM.test(valeur)) garde.push(`${nom}=${valeur}`);
  }
  return `${origin}${pathname}${garde.length ? `?${garde.join("&")}` : ""}`;
}

// ── Événements (noms et paramètres du groupe) ────────────────────────────────

export type NomEvenement =
  | "generate_lead"
  | "click_whatsapp"
  | "click_phone"
  | "click_email"
  | "click_outbound"
  | "file_download";

export type Parametres = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __xpnGa4?: { pageView: () => void; derniere?: string };
  }
}

function langue(): string {
  if (typeof document === "undefined") return "fr";
  return (document.documentElement.lang || "fr").slice(0, 2);
}

/**
 * Envoie un événement si GA4 est chargé, sur l'hôte de production et une URL
 * mesurable. Ailleurs : silence, jamais d'erreur. AUCUNE donnée personnelle
 * dans `params`.
 */
export function suivre(nom: NomEvenement, params: Parametres = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (window.location.hostname !== HOTE_MESURE) return;
  if (!urlMesurable(window.location.search)) return;
  const propres: Parametres = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") propres[k] = v;
  window.gtag("event", nom, { site: SITE_MESURE, lang: langue(), ...propres });
}

/** Statut de la piste : `crm` si elle est dans Odoo (convention du groupe). */
export const generateLead = (form_id: string, status: "crm" | "journal") =>
  suivre("generate_lead", { form_id, status });

export function hote(url: string): string {
  try {
    return new URL(url, `https://${HOTE_MESURE}`).hostname;
  } catch {
    return url;
  }
}

/**
 * Qualifie un lien cliqué (mesure par délégation dans Analytics.tsx). Fonction
 * pure. `destination` = hôte seul, jamais l'URL complète.
 */
export function evenementPourLien(href: string): { nom: NomEvenement; params: Parametres } | null {
  if (!href) return null;
  if (/^tel:/i.test(href)) return { nom: "click_phone", params: {} };
  if (/^mailto:/i.test(href)) return { nom: "click_email", params: {} };
  let url: URL;
  try {
    url = new URL(href, `https://${HOTE_MESURE}`);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  const h = url.hostname.toLowerCase();
  if (h === "wa.me" || h === "api.whatsapp.com" || h.endsWith(".whatsapp.com")) {
    return { nom: "click_whatsapp", params: {} };
  }
  if (/\.(pdf|docx?|xlsx?|pptx?|zip)$/i.test(url.pathname)) {
    return { nom: "file_download", params: { file_name: url.pathname.split("/").pop() || "" } };
  }
  if (h !== HOTE_MESURE) return { nom: "click_outbound", params: { destination: h } };
  return null;
}

// ── Trafic interne et chargeur ───────────────────────────────────────────────

/**
 * Trafic interne : ouvrir une fois le site avec ?xpn_interne=1 marque ce
 * navigateur (localStorage) ; ?xpn_interne=0 l'efface. Chaque envoi porte alors
 * traffic_type=internal, que le filtre « Internal Traffic » de GA4 exclut.
 * Exécuté après la définition de gtag et AVANT gtag('config').
 */
export const CLE_TRAFIC_INTERNE = "xpn_interne";
export const SCRIPT_TRAFIC_INTERNE =
  `var I=${JSON.stringify(CLE_TRAFIC_INTERNE)},q=null,m=false;try{q=new URLSearchParams(location.search).get(I);}catch(e){}` +
  `try{if(q==='1')localStorage.setItem(I,'1');else if(q==='0')localStorage.removeItem(I);}catch(e){}` +
  `try{m=q==='1'||(q!=='0'&&localStorage.getItem(I)==='1');}catch(e){m=q==='1';}` +
  `if(m)gtag('set',{traffic_type:'internal'});`;

/**
 * Chargeur inliné par `components/Analytics.tsx`. Gardes appliquées à
 * l'exécution : hôte de production, URL sans jeton. `send_page_view: false`
 * puis `page_view` envoyé à la main avec une `page_location` épurée — le
 * routeur de Next 16 navigue sans que gtag.js voie les changements
 * d'historique : la mesure améliorée « changements de page basés sur
 * l'historique » doit rester DÉSACTIVÉE sur le flux (sinon double compte).
 */
export function scriptGa4(id: string): string {
  return [
    "/*XPN-GA4*/(function(){",
    `var H=${JSON.stringify(HOTE_MESURE)},ID=${JSON.stringify(id)},S=${JSON.stringify(SITE_MESURE)};`,
    `var PQ=new RegExp(${JSON.stringify(PARAMS_EXCLUS.source)}),PK=new RegExp(${JSON.stringify(PARAMS_CONSERVES.source)}),VU=new RegExp(${JSON.stringify(VALEUR_UTM.source)});`,
    "function ok(q){return !PQ.test(q||'');}",
    "function loc(){var q=(location.search||'').replace(/^[?]/,''),g=[];if(q){q.split('&').forEach(function(m){var i=m.indexOf('='),n=i<0?m:m.slice(0,i),v=i<0?'':m.slice(i+1);if(PK.test(n)&&VU.test(v))g.push(n+'='+v);});}return location.origin+location.pathname+(g.length?'?'+g.join('&'):'');}",
    "function lang(){return (document.documentElement.lang||'fr').slice(0,2);}",
    "function charger(){if(window.__xpnGa4)return true;if(location.hostname!==H||!ID)return false;",
    "window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};",
    `gtag('js',new Date());${SCRIPT_TRAFIC_INTERNE}gtag('config',ID,{send_page_view:false});`,
    "var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(s);",
    "window.__xpnGa4={pageView:function(){if(!ok(location.search))return;if(window.__xpnGa4.derniere===location.pathname)return;window.__xpnGa4.derniere=location.pathname;gtag('event','page_view',{page_location:loc(),page_title:document.title,site:S,lang:lang()});}};",
    "return true;}",
    "if(!ok(location.search))return;if(!charger())return;window.__xpnGa4.pageView();",
    "})();",
  ].join("\n");
}
