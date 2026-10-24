import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { PageReferentiel } from '@/components/ReferentielPages';

export const metadata: Metadata = {
  alternates: alternatesPour('/en/referentiel'),
  title: 'Equipment reference — Technology XP-NOVA',
  description:
    'RT-TECH reference: 8 domains, 50 sub-functions and 154 typical equipment items classified by technical function, with sizing parameters, Cameroon-specific risks and the regulatory framework.',
};

export default function ReferentielPage() {
  return <PageReferentiel lang="en" />;
}
