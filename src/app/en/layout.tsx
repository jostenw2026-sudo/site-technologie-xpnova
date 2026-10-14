import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import "../globals.css";

const isProd = process.env.SITE_ENV === "production";

export const metadata: Metadata = {
  title: "Technology — Equipment & Technical Systems Engineering — XP-NOVA",
  description: "Engineering for mechanization, irrigation, processing, storage, cold chain, energy, handling and digital equipment for agro-systemic projects in Cameroon and Central Africa.",
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
    name: 'Technology',
    url: 'https://technologie.xp-nova.com',
    accentColor: '#D4A017',
  },
  {
    key: 'formation',
    name: 'Training',
    url: 'https://ingenierie-formation.xp-nova.com',
    accentColor: '#F97316',
  },
];

const navItems = [
  { label: 'Home', href: '/en' },
  { label: 'Domains', href: '/en/domaines' },
  { label: 'Services', href: '/en/services' },
  { label: 'Life Cycle', href: '/en/cycle-de-vie' },
  { label: 'References', href: '/en/references' },
  { label: 'About', href: '/en/a-propos' },
  { label: 'Contact', href: '/en/contact' },
];

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {/* Bandeau + navigation collés en haut de l'écran au scroll */}
        <div className="sticky top-0 z-50">
          <UtilityBar
            divisions={divisions}
            siteUrl="https://xp-nova.com"
            currentKey="technologie"
            currentLang="en"
          />
          <SharedNavigation
            items={navItems}
            logoSrc="/brand/logo_xpnova_color.png"
            logoAlt="XP-NOVA"
            logoHref="/en"
          />
        </div>
        <DivisionBadge divisionName="Technology" />
        <main className="flex-1">{children}</main>
        <Footer lang="en" />
      </body>
    </html>
  );
}
