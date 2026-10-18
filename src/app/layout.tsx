import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import { ConditionalFrenchLayout } from "@/components/ConditionalFrenchLayout";
import "./globals.css";
import { URL_SITES } from "@/lib/sites";
import BandeauRecette from "@/components/BandeauRecette";

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
    accentColor: '#22C55E',
  },
  {
    key: 'odt',
    name: 'ODT',
    url: URL_SITES.odt,
    accentColor: '#00289A',
  },
  {
    key: 'technologie',
    name: 'Technologie',
    url: URL_SITES.technologie,
    accentColor: '#D4A017',
  },
  {
    key: 'formation',
    name: 'Formation',
    url: URL_SITES.formation,
    accentColor: '#F97316',
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
    <html lang="fr">
      <body className="min-h-full flex flex-col">
        {/* Recette locale : bandeau rendu seulement si SITE_ENV=recette */}
        <BandeauRecette />
        <ConditionalFrenchLayout>
          {/* Bandeau + navigation collés en haut de l'écran au scroll */}
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
        <main className="flex-1">{children}</main>
        <ConditionalFrenchLayout>
          <Footer />
        </ConditionalFrenchLayout>
      </body>
    </html>
  );
}
