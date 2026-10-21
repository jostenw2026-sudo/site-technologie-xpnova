// Contrôle des alertes WhatsApp à l'équipe (Green API) — recette du 20/10/2026.
// Rejoue le module src/lib/whatsapp.ts contre un faux Green API local (aucun réseau
// sortant), puis vérifie que les formulaires l'appellent et que .env.example le documente.
// Usage : npm run verifier:whatsapp  (Node ≥ 22.18 : lecture directe du TypeScript)
import fs from "node:fs";
import http from "node:http";
import crypto from "node:crypto";

// Empreinte du module commun (contenu normalisé LF, SHA-256, 16 car.) — la même dans les cinq dépôts.
const EMPREINTE_MODULE = "bd2846f33634976e";
// Formulaires qui doivent alerter l'équipe (propre à chaque dépôt).
const FORMULAIRES = ["src/app/api/contact/route.ts"];

const W = await import(new URL("../src/lib/whatsapp.ts", import.meta.url).href);
let ko = 0;
const ok = (c, m) => { console.log(c ? `  ok   ${m}` : `  ECHEC : ${m}`); if (!c) ko++; };

// ── Faux Green API ────────────────────────────────────────────────────────
const recus = [];
let panne = false;
const serveur = http.createServer((req, res) => {
  let b = "";
  req.on("data", (c) => (b += c));
  req.on("end", () => {
    if (panne) { res.writeHead(500); return res.end("panne"); }
    recus.push({ methode: req.method, chemin: req.url, corps: JSON.parse(b || "{}") });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ idMessage: `FAUX${recus.length}` }));
  });
});
await new Promise((r) => serveur.listen(0, "127.0.0.1", r));
const FAUX = `http://127.0.0.1:${serveur.address().port}`;

const base = { GREENAPI_URL: FAUX, GREENAPI_ID_INSTANCE: "1101000001", GREENAPI_TOKEN: "jeton-fictif-recette", WHATSAPP_ALERTE_CHAT: "237600000000@c.us", SITE_ENV: "recette" };

try {
  // 1. Sans variable : rien ne change.
  ok(!W.whatsappConfigure(W.lireConfig({})), "sans variable : alerte désactivée");
  for (const k of ["GREENAPI_URL", "GREENAPI_ID_INSTANCE", "GREENAPI_TOKEN", "WHATSAPP_ALERTE_CHAT", "SITE_ENV"]) delete process.env[k];
  await W.alerterEquipe("test", "verif");
  ok(recus.length === 0, "sans variable : aucun appel");

  // 2. Destinataires.
  ok(W.chatValide("237600000000@c.us"), "numéro @c.us accepté");
  ok(W.chatValide("237600000000-1581234048@g.us"), "groupe @g.us accepté");
  ok(!W.chatValide("+237 600 00 00 00"), "numéro brut refusé");
  ok(!W.chatValide("237600000000@s.whatsapp.net"), "suffixe inconnu refusé");

  // 3. Garde-fou de recette : pas d'envoi réel hors production.
  let appele = false;
  const espion = async () => { appele = true; return new Response("{}"); };
  const reel = W.lireConfig({ ...base, GREENAPI_URL: "https://1101.api.greenapi.com" });
  ok(/envoi réel interdit/.test(W.refusEnvoi(reel) ?? ""), "SITE_ENV=recette + vrai hôte : refusé");
  await W.envoyerAlerte("x", reel, espion).catch(() => {});
  ok(!appele, "SITE_ENV=recette + vrai hôte : aucun appel réseau");
  ok(W.refusEnvoi(W.lireConfig({ ...base, GREENAPI_URL: "https://1101.api.greenapi.com", SITE_ENV: "production" })) === null, "production + vrai hôte : permis");
  ok(W.refusEnvoi(W.lireConfig({ ...base, GREENAPI_URL: "https://1101.api.greenapi.com", SITE_ENV: "" })) === null, "SITE_ENV absente + vrai hôte : permis (comportement de production)");
  ok(W.refusEnvoi(W.lireConfig({ ...base, GREENAPI_ID_INSTANCE: "abc" })) !== null, "idInstance non numérique : refusé");

  // 4. Envoi vers le faux service.
  const id = await W.envoyerAlerte("🔔 Nouvelle demande\nNom : Test", W.lireConfig(base));
  const r = recus.at(-1);
  ok(id === "FAUX1", "réponse idMessage lue");
  ok(r?.methode === "POST" && r.chemin === "/waInstance1101000001/sendMessage/jeton-fictif-recette", "POST /waInstance{id}/sendMessage/{jeton}");
  ok(r?.corps.chatId === "237600000000@c.us" && r.corps.message.startsWith("🔔 Nouvelle demande"), "corps { chatId, message }");
  ok(W.texteAlerte("a".repeat(5000)).length === 1500, "message borné à 1 500 caractères");

  // 5. Panne : l'erreur remonte d'envoyerAlerte, jamais d'alerterEquipe, sans le jeton dans le journal.
  panne = true;
  let leve = false;
  await W.envoyerAlerte("x", W.lireConfig(base)).catch(() => (leve = true));
  ok(leve, "panne Green API : envoyerAlerte lève");
  Object.assign(process.env, base);
  const journal = [];
  const warn = console.warn;
  console.warn = (...a) => journal.push(a.join(" "));
  let silencieux = true;
  await W.alerterEquipe("x", "verif").catch(() => (silencieux = false));
  console.warn = warn;
  ok(silencieux && journal.length === 1, "panne Green API : alerterEquipe ne lève pas et journalise");
  ok(!journal.join("").includes(base.GREENAPI_TOKEN), "le jeton n'apparaît pas dans le journal");
  panne = false;
} finally {
  serveur.close();
}

// 6. Copie à l'identique, branchement et documentation.
const empreinte = crypto.createHash("sha256").update(fs.readFileSync("src/lib/whatsapp.ts", "utf8").replace(/\r\n/g, "\n")).digest("hex").slice(0, 16);
ok(empreinte === EMPREINTE_MODULE, `module identique aux quatre autres sites (${empreinte})`);
for (const f of FORMULAIRES) {
  const src = fs.readFileSync(f, "utf8");
  ok(src.includes('from "@/lib/whatsapp"') && src.includes("alerterEquipe("), `${f} alerte l'équipe`);
}
// Les dépôts Next 16 ignorent tout .env* (.gitignore) : les variables y sont documentées
// dans l'en-tête de src/lib/whatsapp.ts ; s'il existe un .env.example suivi, il doit les lister vides.
const entete = fs.readFileSync("src/lib/whatsapp.ts", "utf8");
const exemple = fs.existsSync(".env.example") ? fs.readFileSync(".env.example", "utf8") : null;
for (const v of ["GREENAPI_URL", "GREENAPI_ID_INSTANCE", "GREENAPI_TOKEN", "WHATSAPP_ALERTE_CHAT"]) {
  ok(entete.includes(` *   ${v} `), `variable ${v} documentée dans le module`);
  if (exemple !== null) ok(new RegExp(`^${v}=""`, "m").test(exemple), `.env.example documente ${v} (vide)`);
}
ok(!/NEXT_PUBLIC_GREENAPI/.test(fs.readFileSync("src/lib/whatsapp.ts", "utf8")), "aucune variable Green API exposée au navigateur");

if (ko) { console.log(`\n${ko} CONTROLE(S) EN ECHEC`); process.exit(1); }
console.log("\nTOUS LES CONTROLES PASSENT");
