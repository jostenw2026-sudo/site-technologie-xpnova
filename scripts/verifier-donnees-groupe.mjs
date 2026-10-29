// Contrôle de la copie des données du groupe (CDC-RECETTE-XPNOVA v1.1 §8).
// La source est portail-xp-nova/src/content/donnees-groupe.json ; ce dépôt en garde
// une copie à l'identique. Empreinte attendue : contenu normalisé (LF), SHA-256, 16 car.
// Usage : npm run verifier:groupe
import fs from "node:fs";
import crypto from "node:crypto";

const EMPREINTE_ATTENDUE = "fc747e2d797befe3";
const FICHIER = "src/content/donnees-groupe.json";
let ko = 0;
const ok = (c, m) => { console.log(c ? `  ok   ${m}` : `  ECHEC : ${m}`); if (!c) ko++; };

const brut = fs.readFileSync(FICHIER, "utf8");
const empreinte = crypto.createHash("sha256").update(brut.replace(/\r\n/g, "\n")).digest("hex").slice(0, 16);
ok(empreinte === EMPREINTE_ATTENDUE, `copie identique à la référence du portail (${empreinte})`);
const G = JSON.parse(brut);
const site = fs.readFileSync("src/components/Footer.tsx", "utf8");
ok(site.includes("import G from \"@/content/donnees-groupe.json\""), "le pied de page lit la référence");
for (const v of [G.coordonnees.courriel, G.coordonnees.telephone, G.identiteLegale.niu, G.identiteLegale.rccm]) {
  ok(!site.includes(`"${v}"`), `le pied de page ne recopie pas « ${v} » en dur`);
}
if (ko) { console.log(`\n${ko} CONTROLE(S) EN ECHEC`); process.exit(1); }
console.log("\nTOUS LES CONTROLES PASSENT");
