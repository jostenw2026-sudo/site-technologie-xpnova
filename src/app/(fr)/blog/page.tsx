import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { BLOG_DIVISION } from '@/content/blog';
import PageBlog from '@/components/PageBlog';

// Tant que la division n'a publié aucun article : noindex (liens suivis) et hors
// sitemap, comme /references (src/content/blog.ts).
export const metadata: Metadata = {
  alternates: alternatesPour('/blog'),
  title: "Blog — TECHNOLOGIE XP-NOVA",
  description: "Le blog de TECHNOLOGIE, division d’XP-NOVA : analyses et retours d’expérience sur les équipements et systèmes techniques de l’agrosystème : mécanisation, irrigation, froid, énergie.",
  ...(BLOG_DIVISION.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function Page() {
  return <PageBlog lang="fr" />;
}
