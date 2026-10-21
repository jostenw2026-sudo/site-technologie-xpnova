/**
 * La mesure d'audience GA4 est-elle confinée là où elle doit l'être ?
 *
 *   npm run verifier:analytics
 *
 * Rejoue les gardes pures de src/lib/analytics.ts, puis relit le source :
 * une seule porte vers gtag, balise posée par le layout racine, identifiant
 * transmis au build par le Dockerfile, aucune donnée personnelle envoyée.
 */
import fs from "node:fs";
import path from "node:path";
import {
  HOTE_MESURE,
  evenementPourLien,
  pageLocationSure,
  scriptGa4,
  urlMesurable,
} from "../src/lib/analytics";

let echecs = 0;
const verifier = (libelle: string, ok: boolean, detail = "") => {
  console.log(ok ? `  ✓ ${libelle}` : `  ✗ ${libelle}${detail ? ` — ${detail}` : ""}`);
  if (!ok) echecs++;
};
const RACINE = path.join(__dirname, "..");
const lire = (f: string) => fs.readFileSync(path.join(RACINE, f), "utf8").replace(/\r\n/g, "\n");

console.log("\n── 1. URL et page_location ──");
verifier("URL ordinaire mesurable", urlMesurable("?utm_source=linkedin"));
verifier("URL à jeton non mesurée", !urlMesurable("?token=abc"));
const O = `https://${HOTE_MESURE}`;
verifier("page_location sans paramètre", pageLocationSure(O, "/faq", "") === `${O}/faq`);
verifier(
  "page_location : seuls les utm_* valides restent",
  pageLocationSure(O, "/", "?utm_source=lk&email=a@b.cm&utm_campaign=x y&gclid=1") === `${O}/?utm_source=lk`,
);

console.log("\n── 2. Liens cliqués ──");
const nom = (h: string) => evenementPourLien(h)?.nom ?? null;
verifier("tel: → click_phone", nom("tel:+237670034000") === "click_phone");
verifier("mailto: → click_email", nom("mailto:hello@xp-nova.com") === "click_email");
verifier("wa.me → click_whatsapp", nom("https://wa.me/237600000000?text=Bonjour") === "click_whatsapp");
verifier("site du groupe → click_outbound", nom("https://odt.xp-nova.com/") === "click_outbound");
verifier(
  "destination = hôte seul",
  evenementPourLien("https://www.linkedin.com/company/xp-nova?x=1")?.params.destination === "www.linkedin.com",
);
verifier("lien interne → rien", nom("/services") === null && nom(`https://${HOTE_MESURE}/faq`) === null);
verifier("document → file_download", nom("/docs/fiche.pdf") === "file_download");
verifier("javascript: → rien", nom("javascript:void(0)") === null);

console.log("\n── 3. Chargeur ──");
const js = scriptGa4("G-TEST123456");
verifier("garde d'hôte de production dans le chargeur", js.includes(JSON.stringify(HOTE_MESURE)));
verifier("send_page_view:false (pages comptées par le site)", js.includes("send_page_view:false"));
verifier("marquage du trafic interne avant config", js.indexOf("traffic_type") < js.indexOf("gtag('config'"));
verifier("chargeur syntaxiquement valide", (() => { try { new Function(js); return true; } catch { return false; } })());

console.log("\n── 4. Source ──");
const fichiers = (dir: string): string[] =>
  fs.readdirSync(path.join(RACINE, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? fichiers(path.join(dir, e.name)) : /\.(tsx?|jsx?)$/.test(e.name) ? [path.join(dir, e.name)] : [],
  );
const sources = fichiers("src");
const hors = sources.filter((f) => !f.endsWith(path.join("lib", "analytics.ts")) && /googletagmanager|gtag\(/.test(lire(f)));
verifier("une seule porte vers gtag (src/lib/analytics.ts)", hors.length === 0, hors.join(", "));
verifier("layout racine pose <Analytics />", /<Analytics\s*\/>/.test(lire("src/app/layout.tsx")));
verifier("identifiant lu dans NEXT_PUBLIC_GA_MEASUREMENT_ID", lire("src/lib/analytics.ts").includes("process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID"));
verifier("Dockerfile transmet l'identifiant au build", /ARG NEXT_PUBLIC_GA_MEASUREMENT_ID/.test(lire("Dockerfile")));
const appels = sources.flatMap((f) => lire(f).match(/(suivre|generateLead)\([^)]*\)/g) ?? []);
verifier(
  "aucune donnée personnelle dans un appel de mesure",
  !appels.some((a) => /formData|champs|email|telephone|organisation|message/i.test(a)),
  appels.join(" | "),
);

console.log(echecs ? `\n${echecs} échec(s).` : "\nTous les contrôles passent.");
process.exit(echecs ? 1 : 0);
