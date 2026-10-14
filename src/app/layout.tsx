import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import { ConditionalFrenchLayout } from "@/components/ConditionalFrenchLayout";
import "./globals.css";

const isProd = process.env.SITE_ENV === "production";

export const metadata: Metadata = {
  title: "Technologie — Ingénierie des équipements et systèmes techniques — XP-NOVA",
  description: "Ingénierie mécanisation, irrigation, transformation, stockage, froid, énergie, manutention et équipements numériques pour projets agro-systémiques au Cameroun et en Afrique centrale.",
  ...(!isProd && { robots: { index: false, follow: false } }),
};

const divisions = [
  {
    key: 'agrovita',
    name: 'AGROVITA',
    url: 'https://agrovita.xp-nova.com',
    accentColor: '#22C55E',
  },
  {
    key: 'odt',
    name: 'ODT',
    url: 'https://odt.xp-nova.com',
    accentColor: '#00289A',
  },
  {
    key: 'technologie',
    name: 'Technologie',
    url: 'https://technologie.xp-nova.com',
    accentColor: '#D4A017',
  },
  {
    key: 'formation',
    name: 'Formation',
    url: 'https://ingenierie-formation.xp-nova.com',
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
        <ConditionalFrenchLayout>
          {/* Bandeau + navigation collés en haut de l'écran au scroll */}
          <div className="sticky top-0 z-50">
            <UtilityBar divisions={divisions} siteUrl="https://xp-nova.com" currentKey="technologie" />
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
