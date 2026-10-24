import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import PageFaq from '@/components/PageFaq';

export const metadata: Metadata = {
  alternates: alternatesPour('/en/faq'),
  title: 'Frequently asked questions — Technology XP-NOVA',
  description: "XP-NOVA's role, cost of a request, lead times, RT-TECH reference, power cuts, spare parts, PECAE, EUDR: the Technology division's answers.",
};

export default function FaqPage() {
  return <PageFaq lang="en" />;
}
