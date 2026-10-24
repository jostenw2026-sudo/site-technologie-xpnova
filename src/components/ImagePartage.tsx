import { ImageResponse } from "next/og";
import G from "@/content/donnees-groupe.json";
import { HOTE_PRODUCTION } from "@/lib/indexation";
import type { Langue } from "@/lib/pages-miroir";

// Image de partage (Open Graph, reprise par Twitter/X), PNG 1200 × 630 générée au build
// par src/app/(fr)/opengraph-image.tsx et src/app/(en)/en/opengraph-image.tsx, sur le
// modèle du portail (src/app/opengraph-image.tsx du dépôt portail-xp-nova). Facebook,
// LinkedIn et WhatsApp ignorent les images SVG.
// Charte du site : fond #22364A (héros de l'accueil), or #D4A017 / #E9C25A sur fond foncé.
// Textes : nom et intitulé de la division (donnees-groupe.json), signature du groupe.
// Police : celle de next/og par défaut (les WOFF2 variables du site ne sont pas lues par satori).

export const TAILLE_IMAGE_PARTAGE = { width: 1200, height: 630 };

const DIVISION = G.divisions.find((d) => d.cle === "technologie")!;

const TEXTES = {
  fr: { nom: DIVISION.nom, intitule: DIVISION.tagline, signature: G.groupe.signature },
  en: { nom: DIVISION.nomEn, intitule: DIVISION.taglineEn, signature: "From idea to impact." },
};

export function imagePartage(lang: Langue) {
  const t = TEXTES[lang];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#22364A",
          color: "#FFFFFF",
          padding: "64px 72px",
          borderBottom: "14px solid #D4A017",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: 3 }}>{G.groupe.nom}</div>
          <div style={{ display: "flex", height: 8, width: 160, background: "#D4A017" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{t.nom}</div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 46, color: "#E9C25A" }}>{t.intitule}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <span style={{ color: "#E9C25A" }}>{t.signature}</span>
          <span>{HOTE_PRODUCTION}</span>
        </div>
      </div>
    ),
    { ...TAILLE_IMAGE_PARTAGE },
  );
}
