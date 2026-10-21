import { NextResponse } from "next/server";
import { odooConfigured, odooCreate } from "@/lib/odoo";
import { alerterEquipe } from "@/lib/whatsapp";

// Réception du formulaire de contact → CRM Odoo (crm.lead), source-taggé.
// Avant le 18/10/2026, le formulaire n'envoyait rien (console.log côté navigateur) :
// toutes les demandes étaient perdues.
//
// Réponse : { ok: true, enregistrement: "crm" | "journal" }. « journal » signifie
// que la demande n'a pas pu entrer dans le CRM (Odoo non configuré ou indisponible) :
// le formulaire propose alors au visiteur l'envoi par e-mail, déjà rédigé, pour
// qu'aucune demande ne se perde.

const SOURCE = "technologie.xp-nova.com";
const MAX = 5000;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  // Pot de miel anti-robots
  if (body.website) return NextResponse.json({ ok: true, enregistrement: "crm" });

  const champs: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === "string" && v.trim()) champs[k] = v.trim().slice(0, MAX);
  }
  const email = champs.email ?? "";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail invalide" }, { status: 400 });
  }

  const description = Object.entries(champs)
    .filter(([k]) => k !== "email" && k !== "telephone")
    .map(([k, v]) => `${k} : ${v}`)
    .join("\n");

  let enregistrement: "crm" | "journal" = "journal";
  if (odooConfigured()) {
    try {
      const leadId = await odooCreate("crm.lead", {
        name: `[${SOURCE}] ${champs.organisation ?? champs.type ?? email}`,
        email_from: email,
        ...(champs.telephone ? { phone: champs.telephone } : {}),
        ...(champs.organisation ? { partner_name: champs.organisation } : {}),
        description,
      });
      console.log(`[contact Technologie] lead Odoo créé (id=${leadId})`);
      enregistrement = "crm";
    } catch (err) {
      console.warn(`[contact Technologie] Odoo indisponible : ${(err as Error).message}`);
    }
  } else {
    console.warn("[contact Technologie] Odoo non configuré — demande journalisée :", { email, ...champs });
  }

  // Alerte WhatsApp à l'équipe (Green API) — non bloquante, inactive sans variables.
  await alerterEquipe(
    [
      `🔔 Nouvelle demande ${SOURCE}`,
      [champs.type, champs.organisation ?? champs.localisation].filter(Boolean).join(" · "),
      champs.filiere && `Filière : ${champs.filiere}`,
      `📧 ${email}`,
      champs.telephone && `📞 ${champs.telephone}`,
      (champs.whatsapp || champs.canal === "whatsapp") &&
        `💬 WhatsApp : ${champs.whatsapp ?? champs.telephone}${champs.canal === "whatsapp" ? " (canal préféré)" : ""}`,
      champs.prestation && `🔧 Prestation : ${champs.prestation}`,
      enregistrement === "crm" ? "CRM : piste créée" : "CRM : non enregistrée (voir le journal du site)",
    ]
      .filter(Boolean)
      .join("\n"),
    "contact Technologie",
  );

  return NextResponse.json({ ok: true, enregistrement });
}
