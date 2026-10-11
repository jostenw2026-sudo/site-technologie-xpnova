import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Technologie — Ingénierie des équipements et systèmes techniques — XP-NOVA",
  description: "Ingénierie mécanisation, irrigation, transformation, stockage, froid, énergie, manutention et équipements numériques pour projets agro-systémiques au Cameroun et en Afrique centrale.",
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
  { label: 'Accueil', href: '/', active: true },
  { label: 'Domaines', href: '/domaines', active: false },
  { label: 'Services', href: '/services', active: false },
  { label: 'Cycle de vie', href: '/cycle-de-vie', active: false },
  { label: 'Références', href: '/references', active: false },
  { label: 'À propos', href: '/a-propos', active: false },
  { label: 'Contact', href: '/contact', active: false },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col">
        <UtilityBar divisions={divisions} siteUrl="https://xp-nova.com" />
        <SharedNavigation
          items={navItems}
          logoSrc="/brand/logo_xpnova_color.png"
          logoAlt="XP-NOVA"
          logoHref="/"
        />
        <DivisionBadge divisionName="Technologie" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
