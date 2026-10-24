import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { PageFilieres } from '@/components/FilierePages';

export const metadata: Metadata = { alternates: alternatesPour('/en/filieres'), title: 'Enter by value chain — Technology reference XP-NOVA', description: "AGROVITA's 29 value chains and the RT-TECH reference sub-functions each one mobilises." };

export default function FilieresPage() {
  return <PageFilieres lang="en" />;
}
