import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  lang?: 'fr' | 'en';
}

export default function Footer({ lang = 'fr' }: FooterProps) {
  const translations = {
    fr: {
      signature: "De l'idée à l'impact.",
      baseline: "Bureau d'Ingénierie Conseil",
      responsePromise: "Un expert vous répond sous 48 h.",
      navigation: "Navigation",
      portal: "Le portail",
      divisions: "Nos divisions",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      navItems: [
        { href: '/', label: 'Accueil' },
        { href: '/domaines', label: 'Domaines' },
        { href: '/services', label: 'Services' },
        { href: '/cycle-de-vie', label: 'Cycle de vie' },
        { href: '/references', label: 'Références' },
        { href: '/a-propos', label: 'À propos' },
        { href: '/contact', label: 'Contact' },
      ],
      portalItems: [
        { href: 'https://xp-nova.com', label: 'XP-NOVA' },
        { href: 'https://xp-nova.com/cabinet', label: 'Le cabinet' },
        { href: 'https://xp-nova.com/metiers', label: 'Métiers' },
        { href: 'https://xp-nova.com/portail', label: 'Portail interne' },
      ],
    },
    en: {
      signature: "From idea to impact.",
      baseline: "Engineering Consulting Firm",
      responsePromise: "An expert answers within 48 hours.",
      navigation: "Navigation",
      portal: "The Portal",
      divisions: "Our Divisions",
      legal: "Legal Notice",
      privacy: "Privacy",
      navItems: [
        { href: '/en', label: 'Home' },
        { href: '/en/domaines', label: 'Domains' },
        { href: '/en/services', label: 'Services' },
        { href: '/en/cycle-de-vie', label: 'Life Cycle' },
        { href: '/en/references', label: 'References' },
        { href: '/en/a-propos', label: 'About' },
        { href: '/en/contact', label: 'Contact' },
      ],
      portalItems: [
        { href: 'https://xp-nova.com', label: 'XP-NOVA' },
        { href: 'https://xp-nova.com/cabinet', label: 'The Firm' },
        { href: 'https://xp-nova.com/metiers', label: 'Professions' },
        { href: 'https://xp-nova.com/portail', label: 'Internal Portal' },
      ],
    },
  };

  const t = translations[lang];

  const site = {
    signature: t.signature,
    baseline: t.baseline,
    address: '134, Rue 1813, Vallée Bastos — B.P. 5603, Nlongkak, Yaoundé, Cameroun',
    phone: '+237 6700 34 000',
    email: 'hello@xp-nova.com',
    responsePromise: t.responsePromise,
    legalName: 'XP-NOVA SARL',
    legal: {
      forme: 'SARL',
      capital: '10 000 000 FCFA',
      cnps: '321-0105061-A',
      rccm: 'RC/YAO/2006/B/945 (modif. RC/YAO/2026/M/354)',
      niu: 'M010600019838W',
    },
  };

  const ecosystem = [
    {
      key: 'agrovita',
      name: 'AGROVITA',
      href: '/agrovita',
      url: 'https://agrovita.xp-nova.com',
      tagline: lang === 'fr' ? 'Produire pour la Demande' : 'Produce for Demand',
    },
    {
      key: 'odt',
      name: 'ODT',
      href: '/odt',
      url: 'https://odt.xp-nova.com',
      tagline: lang === 'fr' ? 'Ingénierie territoriale' : 'Territorial Engineering',
    },
    {
      key: 'technologie',
      name: lang === 'fr' ? 'Technologie' : 'Technology',
      href: '/technologie',
      url: 'https://technologie.xp-nova.com',
      tagline: lang === 'fr' ? 'Ingénierie technique' : 'Technical Engineering',
    },
    {
      key: 'formation',
      name: lang === 'fr' ? 'Formation' : 'Training',
      href: '/formation',
      url: 'https://ingenierie-formation.xp-nova.com',
      tagline: lang === 'fr' ? 'Ingénierie pédagogique' : 'Training Engineering',
    },
  ];

  return (
    <footer className="bg-[#0D1F5C] text-white/80">
      <div className="h-1.5 bg-[#D4A017]" />

      <div className="max-w-6xl mx-auto grid gap-x-10 gap-y-9 py-10 px-6 sm:grid-cols-2 lg:grid-cols-[1.18fr_0.86fr_0.86fr_1.1fr] lg:gap-x-10">
        {/* Identité + contact */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src="/brand/logo_xpnova_white.png"
            alt="XP-NOVA — Bureau d'Ingénierie Conseil"
            width={350}
            height={80}
            className="h-[52px] w-auto"
          />
          <p className="mt-3.5 text-[1.2rem] font-bold italic leading-none text-[#D4A017]/80">
            {site.signature}
          </p>
          <p className="mt-2 max-w-[38ch] text-[0.86rem] leading-snug text-white/65">
            {site.baseline}
          </p>

          <div className="mt-5 h-px w-10 bg-[#D4A017]/50" />

          <address className="mt-4 not-italic text-[0.86rem] leading-snug text-white/70">
            <span className="block max-w-[38ch]">{site.address}</span>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-1.5 block text-white/70 hover:text-[#D4A017]"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block text-white/70 hover:text-[#D4A017]"
            >
              {site.email}
            </a>
          </address>
          <p className="mt-2.5 text-[0.86rem] font-semibold text-[#D4A017]/80">
            {site.responsePromise}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#D4A017]">
            {t.navigation}
          </p>
          <ul className="space-y-[0.42rem] text-[0.9rem] leading-snug">
            {t.navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/70 hover:text-[#D4A017] no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Le portail */}
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#D4A017]">
            {t.portal}
          </p>
          <ul className="space-y-[0.42rem] text-[0.9rem] leading-snug">
            {t.portalItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/70 hover:text-[#D4A017] no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Nos divisions */}
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#D4A017]">
            {t.divisions}
          </p>
          <ul className="space-y-4 text-[0.9rem] leading-snug">
            {ecosystem.map((e) => (
              <li key={e.key}>
                <Link
                  href={e.href}
                  className="font-bold text-white no-underline hover:text-[#D4A017]"
                >
                  {e.name}
                </Link>
                <span className="mt-0.5 block text-white/60">{e.tagline}</span>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-0.5 block text-[0.78rem] text-white/40 hover:text-[#D4A017]"
                >
                  {e.url.replace("https://", "")} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barre basse — mention légale et liens réglementaires */}
      <div className="border-t border-white/12">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-2 py-4 px-6 text-[0.72rem] leading-relaxed text-white/50 lg:flex-row">
          <p className="text-center lg:text-left">
            © 2026 {site.legalName} — {site.legal.forme} au capital de{" "}
            {site.legal.capital} · CNPS : {site.legal.cnps} · RCCM : {site.legal.rccm} · NIU :{" "}
            {site.legal.niu}
          </p>
          <p className="flex shrink-0 gap-5">
            <Link href="https://xp-nova.com/mentions-legales" className="text-white/50 hover:text-[#D4A017] no-underline">
              {t.legal}
            </Link>
            <Link href="https://xp-nova.com/confidentialite" className="text-white/50 hover:text-[#D4A017] no-underline">
              {t.privacy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
