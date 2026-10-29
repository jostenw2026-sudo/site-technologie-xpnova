import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { BLOG_DIVISION } from '@/content/blog';
import PageBlog from '@/components/PageBlog';

// Tant que la division n'a publié aucun article : noindex (liens suivis) et hors
// sitemap, comme /references (src/content/blog.ts).
export const metadata: Metadata = {
  alternates: alternatesPour('/en/blog'),
  title: "Blog — TECHNOLOGY XP-NOVA",
  description: "The blog of TECHNOLOGY, an XP-NOVA division: analyses and lessons learned on the equipment and technical systems of the agrosystem: mechanisation, irrigation, cold chain, energy.",
  ...(BLOG_DIVISION.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function Page() {
  return <PageBlog lang="en" />;
}
