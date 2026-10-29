import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { PageReferentiel } from '@/components/ReferentielPages';

export const metadata: Metadata = {
  alternates: alternatesPour('/referentiel'),
  title: 'Référentiel des équipements — TECHNOLOGIE XP-NOVA',
  description:
    'Référentiel RT-TECH : 8 domaines, 50 sous-fonctions et 154 équipements types, avec grandeurs à dimensionner, risques au Cameroun et normes.',
};

export default function ReferentielPage() {
  return <PageReferentiel lang="fr" />;
}
