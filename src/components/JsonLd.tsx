import G from "@/content/donnees-groupe.json";
import { URL_PRODUCTION } from "@/lib/indexation";
import { urlAbsolue } from "@/lib/alternates";
import type { Langue } from "@/lib/pages-miroir";

// Données structurées JSON-LD (schema.org), rendues dans un <script> au serveur.
// `<` est remplacé par \u003c (recommandation de la doc Next, guide JSON-LD) : une
// chaîne contenant « </script> » ne peut pas refermer la balise.

export function serialiserJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialiserJsonLd(data) }} />;
}

const DIVISION = G.divisions.find((d) => d.cle === "technologie")!;

/** Identifiant de l'organisation du portail xp-nova.com (src/components/JsonLd.tsx du portail). */
export const ID_GROUPE = "https://xp-nova.com/#organisation";
// Fiche Google Business Profile de XP-NOVA (lien public communiqué par la direction le
// 25/10/2026), portée par l'organisation du groupe que référence parentOrganization.
const FICHE_GOOGLE = "https://maps.app.goo.gl/xaTfVMgpvk4sHu5W9";

/**
 * La division Technologie, rattachée à l'organisation du groupe. Nom, adresse,
 * téléphone et e-mail : fichier de référence du groupe (donnees-groupe.json).
 */
export function organisationLd(lang: Langue) {
  const nomFr = `${DIVISION.nom} — ${DIVISION.tagline}`;
  const nomEn = `${DIVISION.nomEn} — ${DIVISION.taglineEn}`;
  const adresse = lang === "en" ? G.coordonnees.adresseEn : G.coordonnees.adresse;
  const [rue, boite] = adresse.split(" — ");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${URL_PRODUCTION}/#organisation`,
    name: lang === "en" ? nomEn : nomFr,
    alternateName: lang === "en" ? nomFr : nomEn,
    url: URL_PRODUCTION,
    logo: `${URL_PRODUCTION}/brand/logo_xpnova_color.png`,
    email: G.coordonnees.courriel,
    telephone: G.coordonnees.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: rue,
      postOfficeBoxNumber: boite.split(",")[0],
      addressLocality: G.groupe.ville,
      addressCountry: "CM",
    },
    parentOrganization: { "@id": ID_GROUPE, sameAs: [FICHE_GOOGLE] },
  };
}

/** Fil d'Ariane : libellés des pages existants, chemins du site (URL absolues de production). */
export function filArianeLd(items: { nom: string; chemin: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nom,
      item: urlAbsolue(it.chemin),
    })),
  };
}
