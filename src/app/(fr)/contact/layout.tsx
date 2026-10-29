import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';

// La page est un composant client (formulaire) : ses liens canonical et hreflang vivent ici.
// Canonical sans paramètres : couvre aussi les liens du référentiel /contact?prestation=…
// Titre et description : tableau de référencement validé par la direction le 24/10/2026.
export const metadata: Metadata = {
  alternates: alternatesPour('/contact'),
  title: 'Contact — TECHNOLOGIE XP-NOVA',
  description:
    "Un projet d'équipements techniques ? Contactez la division TECHNOLOGIE de XP-NOVA à Yaoundé : formulaire, WhatsApp ou téléphone.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
