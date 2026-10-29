import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import PageFaq from '@/components/PageFaq';

export const metadata: Metadata = {
  alternates: alternatesPour('/faq'),
  title: 'Questions fréquentes — TECHNOLOGIE XP-NOVA',
  description: 'Rôle de XP-NOVA, coût d’une demande, délais, RT-TECH, coupures d’électricité, pièces de rechange, PECAE, RDUE : les réponses de la division TECHNOLOGIE.',
};

export default function FaqPage() {
  return <PageFaq lang="fr" />;
}
