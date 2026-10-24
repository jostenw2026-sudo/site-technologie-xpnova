import BoutonWhatsApp from '@/components/BoutonWhatsApp';
import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import "../../globals.css";
import { URL_SITES } from "@/lib/sites";
import BandeauRecette from "@/components/BandeauRecette";
import { Analytics } from "@/components/Analytics";
import { JsonLd, organisationLd } from "@/components/JsonLd";
import { URL_PRODUCTION } from "@/lib/indexation";
import { PAIRES_FICHES } from "@/lib/alternates";
import { sourceSans, playfair } from "@/lib/polices";

// Layout racine des pages anglaises (groupe (en), sans effet sur les URL : /en/…).
// <html lang="en"> rendu au serveur ; reprend ce que l'ancien layout racine unique
// apportait aux pages /en : polices, bandeau de recette, <body>, mesure GA4.

// Indexation : gérée par src/proxy.ts (en-tête X-Robots-Tag hors production).

export const metadata: Metadata = {
  metadataBase: new URL(URL_PRODUCTION),
  title: "Technology — Equipment & Technical Systems Engineering — XP-NOVA",
  description: "Engineering for mechanization, irrigation, processing, storage, cold chain, energy, handling and digital equipment for agro-systemic projects in Cameroon and Central Africa.",
  // Partage social : voir src/app/(fr)/layout.tsx (image : opengraph-image.tsx de ce dossier).
  openGraph: { type: "website", url: "./", locale: "en_GB", alternateLocale: "fr_FR" },
};

const divisions = [
  {
    key: 'agrovita',
    name: 'AGROVITA',
    url: URL_SITES.agrovita,
    accentColor: '#2E7D32',
  },
  {
    key: 'odt',
    name: 'ODT',
    url: URL_SITES.odt,
    accentColor: '#0E4C5A',
  },
  {
    key: 'technologie',
    name: 'Technology',
    url: URL_SITES.technologie,
    accentColor: '#3D5A73',
  },
  {
    key: 'formation',
    name: 'Training',
    url: URL_SITES.formation,
    accentColor: '#B4470F',
  },
];

const navItems = [
  { label: 'Home', href: '/en' },
  { label: 'Domains', href: '/en/domaines' },
  { label: 'Services', href: '/en/services' },
  { label: 'Reference', href: '/en/referentiel' },
  { label: 'Life Cycle', href: '/en/cycle-de-vie' },
  { label: 'References', href: '/en/references' },
  { label: 'FAQ', href: '/en/faq' },
  { label: 'About', href: '/en/a-propos' },
  { label: 'Contact', href: '/en/contact' },
];

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">
        {/* Données structurées : la division, rattachée à l'organisation du groupe */}
        <JsonLd data={organisationLd('en')} />
        {/* Recette locale : bandeau rendu seulement si SITE_ENV=recette */}
        <BandeauRecette />
        {/* Barre du groupe + navigation : un seul bloc collant (demande du DG, 20/10/2026) */}
        <div className="sticky top-0 z-50">
          <UtilityBar
            divisions={divisions}
            siteUrl={URL_SITES.portail}
            currentKey="technologie"
            currentLang="en"
            fiches={PAIRES_FICHES}
          />
          <SharedNavigation
            items={navItems}
            logoSrc="/brand/logo_xpnova_color.png"
            logoAlt="XP-NOVA"
            logoHref="/en"
          />
        </div>
        <DivisionBadge divisionName="Technology" lang="en" />
        <main className="flex-1">{children}</main>
        <BoutonWhatsApp lang="en" />
        <Footer lang="en" />
        {/* Mesure d'audience GA4 (EN) : inactive sans NEXT_PUBLIC_GA_MEASUREMENT_ID, hors production. */}
        <Analytics />
      </body>
    </html>
  );
}
