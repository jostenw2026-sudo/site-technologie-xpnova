import type { Metadata } from "next";
import localFont from "next/font/local";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import { ConditionalFrenchLayout } from "@/components/ConditionalFrenchLayout";
import "./globals.css";
import { URL_SITES } from "@/lib/sites";
import BandeauRecette from "@/components/BandeauRecette";
import { ZonePrincipale } from "@/components/ZonePrincipale";

// Polices de la charte A, auto-hébergées (mêmes fichiers WOFF2 que le portail) : Arial abandonné.
const sourceSans = localFont({ src: "./fonts/SourceSans3.woff2", weight: "200 900", display: "swap", variable: "--font-source-sans" });
const playfair = localFont({ src: "./fonts/PlayfairDisplay.woff2", weight: "400 900", display: "swap", variable: "--font-playfair" });

// Indexation : gérée par src/proxy.ts (en-tête X-Robots-Tag hors production).

export const metadata: Metadata = {
  title: "Technologie — Ingénierie des équipements et systèmes techniques — XP-NOVA",
  description: "Ingénierie mécanisation, irrigation, transformation, stockage, froid, énergie, manutention et équipements numériques pour projets agro-systémiques au Cameroun et en Afrique centrale.",
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
    name: 'Technologie',
    url: URL_SITES.technologie,
    accentColor: '#3D5A73',
  },
  {
    key: 'formation',
    name: 'Formation',
    url: URL_SITES.formation,
    accentColor: '#B4470F',
  },
];

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Domaines', href: '/domaines' },
  { label: 'Services', href: '/services' },
  { label: 'Cycle de vie', href: '/cycle-de-vie' },
  { label: 'Références', href: '/references' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">
        {/* Recette locale : bandeau rendu seulement si SITE_ENV=recette */}
        <BandeauRecette />
        <ConditionalFrenchLayout>
          {/* Barre du groupe + navigation : un seul bloc collant (demande du DG, 20/10/2026) */}
          <div className="sticky top-0 z-50">
            <UtilityBar divisions={divisions} siteUrl={URL_SITES.portail} currentKey="technologie" />
            <SharedNavigation
              items={navItems}
              logoSrc="/brand/logo_xpnova_color.png"
              logoAlt="XP-NOVA"
              logoHref="/"
            />
          </div>
          <DivisionBadge divisionName="Technologie" />
        </ConditionalFrenchLayout>
        <ZonePrincipale>{children}</ZonePrincipale>
        <ConditionalFrenchLayout>
          <Footer />
        </ConditionalFrenchLayout>
      </body>
    </html>
  );
}
