import Image from 'next/image';

// Bandeau illustratif des pages sans photo de domaine (services, cycle de vie, FAQ).
// Images générées (Canva, 21/10/2026) : scènes types, non contractuelles — la légende le dit.

const LEGENDES = {
  fr: 'Illustration générée, non contractuelle.',
  en: 'Generated illustration, not contractual.',
};

export default function Illustration({ src, alt, lang = 'fr' }: { src: string; alt: string; lang?: 'fr' | 'en' }) {
  return (
    <figure className="mt-8">
      <Image
        src={src}
        alt={alt}
        className="w-full h-56 md:h-72 object-cover rounded border border-[#E2E5EC]"
        width={1680}
        height={944}
        sizes="(min-width: 1152px) 1104px, 100vw"
      />
      <figcaption className="mt-2 text-xs text-[#5A6072] italic">{LEGENDES[lang]}</figcaption>
    </figure>
  );
}
