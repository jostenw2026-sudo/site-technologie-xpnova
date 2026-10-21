import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import "../globals.css";
import { URL_SITES } from "@/lib/sites";

// Indexation : gérée par src/proxy.ts (en-tête X-Robots-Tag hors production).

export const metadata: Metadata = {
  title: "Technology — Equipment & Technical Systems Engineering — XP-NOVA",
  description: "Engineering for mechanization, irrigation, processing, storage, cold chain, energy, handling and digital equipment for agro-systemic projects in Cameroon and Central Africa.",
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
  { label: 'About', href: '/en/a-propos' },
  { label: 'Contact', href: '/en/contact' },
];

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        {/* Barre du groupe + navigation : un seul bloc collant (demande du DG, 20/10/2026) */}
        <div className="sticky top-0 z-50">
          <UtilityBar
              divisions={divisions}
              siteUrl={URL_SITES.portail}
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
    </>
  );
}
