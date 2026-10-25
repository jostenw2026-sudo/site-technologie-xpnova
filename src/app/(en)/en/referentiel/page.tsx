import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { PageReferentiel } from '@/components/ReferentielPages';

export const metadata: Metadata = {
  alternates: alternatesPour('/en/referentiel'),
  title: 'Equipment reference — Technology XP-NOVA',
  // Traduction de la description française validée le 24/10/2026.
  description:
    'RT-TECH reference: 8 domains, 50 sub-functions and 154 typical equipment items, with sizing parameters, risks in Cameroon and standards.',
};

export default function ReferentielPage() {
  return <PageReferentiel lang="en" />;
}
