import { NextResponse } from "next/server";
import { odooConfigured, odooCreate } from "@/lib/odoo";
import { alerterEquipe } from "@/lib/whatsapp";

// Candidature (page Carrières, 29/10/2026) en multipart/form-data → CRM Odoo, comme le
// portail (xp-nova.com, /api/candidature) : piste crm.lead, puis CV et pièces jointes
// rattachés par ir.attachment. Non bloquant : si Odoo est indisponible ou non configuré,
// la candidature est tracée en log et le formulaire propose l'envoi par e-mail.
//
// Consentement des candidats et experts du groupe (texte FR + EN publié sur le portail,
// /confidentialite/candidats) : la version acceptée est consignée dans la piste. Une
// candidature n'est jamais refusée pour cette raison (la case est obligatoire côté
// formulaire).

const SOURCE = "technologie.xp-nova.com";
const MAX_FILES = 6;
const MAX_FILE = 5 * 1024 * 1024; // 5 Mo par fichier
const MAX_TOTAL = 15 * 1024 * 1024; // 15 Mo au total
const ALLOWED = /\.(pdf|docx?|jpe?g|png)$/i;
const MAX_CHAMP = 5000;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
  const val = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v.trim().slice(0, MAX_CHAMP) : "";
  };

  // Pot de miel anti-robots
  if (val("website")) return NextResponse.json({ ok: true, enregistrement: "crm" });

  for (const f of ["nom", "email", "message"]) {
    if (!val(f)) return NextResponse.json({ error: `Champ manquant : ${f}` }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val("email"))) {
    return NextResponse.json({ error: "E-mail invalide" }, { status: 400 });
  }

  const files = form.getAll("documents").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    return NextResponse.json({ error: "Au moins un document (CV) est requis." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Trop de fichiers (max ${MAX_FILES}).` }, { status: 400 });
  }
  let total = 0;
  for (const f of files) {
    if (!ALLOWED.test(f.name)) {
      return NextResponse.json({ error: `Format non autorisé : ${f.name}` }, { status: 400 });
    }
    if (f.size > MAX_FILE) {
      return NextResponse.json({ error: `Fichier trop volumineux (max 5 Mo) : ${f.name}` }, { status: 400 });
    }
    total += f.size;
  }
  if (total > MAX_TOTAL) {
    return NextResponse.json({ error: "Pièces jointes trop volumineuses (max 15 Mo au total)." }, { status: 400 });
  }

  const poste = val("poste") || "Candidature spontanée";
  const recap = [
    `Division : TECHNOLOGIE`,
    `Poste visé : ${poste}`,
    val("profil") && `Poste actuel / spécialité : ${val("profil")}`,
    val("telephone") && `Téléphone : ${val("telephone")}`,
    val("lien") && `CV / portfolio : ${val("lien")}`,
    `Pièces jointes : ${files.map((f) => f.name).join(", ")}`,
    val("consentement") === "oui"
      ? `Consentement base candidats et experts (version ${val("consentementVersion") || "inconnue"}) : accepté le ${new Date().toISOString().slice(0, 10)}`
      : "Consentement base candidats et experts : non recueilli — ne pas proposer ce CV à une autre division sans accord écrit",
  ]
    .filter(Boolean)
    .join("\n");

  // « crm » : piste créée dans Odoo ; « journal » : candidature tracée seulement.
  let enregistrement: "crm" | "journal" = "journal";
  if (odooConfigured()) {
    try {
      const leadId = await odooCreate("crm.lead", {
        name: `[${SOURCE}] Candidature — ${poste} — ${val("nom")}`,
        contact_name: val("nom"),
        email_from: val("email"),
        ...(val("telephone") ? { phone: val("telephone") } : {}),
        ...(val("profil") ? { partner_name: val("profil") } : {}),
        description: [recap, "", val("message")].join("\n"),
      });
      console.log(`[candidature TECHNOLOGIE] lead Odoo créé (id=${leadId})`);
      enregistrement = "crm";
      for (const f of files) {
        try {
          await odooCreate("ir.attachment", {
            name: f.name,
            datas: Buffer.from(await f.arrayBuffer()).toString("base64"),
            res_model: "crm.lead",
            res_id: leadId,
            ...(f.type ? { mimetype: f.type } : {}),
          });
        } catch (err) {
          console.warn(`[candidature TECHNOLOGIE] pièce jointe échouée (${f.name}) : ${(err as Error).message}`);
        }
      }
    } catch (err) {
      console.warn(`[candidature TECHNOLOGIE] Odoo indisponible (candidature tracée) : ${(err as Error).message}`);
    }
  } else {
    console.warn("[candidature TECHNOLOGIE] Odoo non configuré — candidature en log :", {
      nom: val("nom"),
      email: val("email"),
      poste,
      fichiers: files.map((f) => f.name),
    });
  }

  await alerterEquipe(
    [
      `🔔 Nouvelle candidature ${SOURCE}`,
      `${val("nom")} — ${poste}`,
      `📧 ${val("email")}`,
      val("telephone") && `📞 ${val("telephone")}`,
      `${files.length} pièce(s) jointe(s)`,
      enregistrement === "crm" ? "CRM : piste créée" : "CRM : non enregistrée (voir le journal du site)",
    ]
      .filter(Boolean)
      .join("\n"),
    "candidature TECHNOLOGIE",
  );

  return NextResponse.json({ ok: true, enregistrement });
}
