import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const site = {
    signature: 'De l\'idée à l\'impact.',
    baseline: 'Bureau d\'Ingénierie Conseil',
    address: '134, Rue 1813, Vallée Bastos — B.P. 5603, Nlongkak, Yaoundé, Cameroun',
    phone: '+237 6700 34 000',
    email: 'hello@xp-nova.com',
    responsePromise: '48 h',
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
      tagline: 'Produire pour la Demande',
    },
    {
      key: 'odt',
      name: 'ODT',
      href: '/odt',
      url: 'https://odt.xp-nova.com',
      tagline: 'Ingénierie territoriale',
    },
    {
      key: 'technologie',
      name: 'Technologie',
      href: '/technologie',
      url: 'https://technologie.xp-nova.com',
      tagline: 'Ingénierie technique',
    },
    {
      key: 'formation',
      name: 'Formation',
      href: '/formation',
      url: 'https://ingenierie-formation.xp-nova.com',
      tagline: 'Ingénierie pédagogique',
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
            Un expert vous répond sous {site.responsePromise}.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#D4A017]">
            Navigation
          </p>
          <ul className="space-y-[0.42rem] text-[0.9rem] leading-snug">
            <li>
              <Link href="/" className="text-white/70 hover:text-[#D4A017] no-underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/domaines" className="text-white/70 hover:text-[#D4A017] no-underline">
                Domaines
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-white/70 hover:text-[#D4A017] no-underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/cycle-de-vie" className="text-white/70 hover:text-[#D4A017] no-underline">
                Cycle de vie
              </Link>
            </li>
            <li>
              <Link href="/references" className="text-white/70 hover:text-[#D4A017] no-underline">
                Références
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-white/70 hover:text-[#D4A017] no-underline">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white/70 hover:text-[#D4A017] no-underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Le portail */}
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#D4A017]">
            Le portail
          </p>
          <ul className="space-y-[0.42rem] text-[0.9rem] leading-snug">
            <li>
              <Link href="https://xp-nova.com" className="text-white/70 hover:text-[#D4A017] no-underline">
                XP-NOVA
              </Link>
            </li>
            <li>
              <Link href="https://xp-nova.com/cabinet" className="text-white/70 hover:text-[#D4A017] no-underline">
                Le cabinet
              </Link>
            </li>
            <li>
              <Link href="https://xp-nova.com/metiers" className="text-white/70 hover:text-[#D4A017] no-underline">
                Métiers
              </Link>
            </li>
            <li>
              <Link href="https://xp-nova.com/portail" className="text-white/70 hover:text-[#D4A017] no-underline">
                Portail interne
              </Link>
            </li>
          </ul>
        </div>

        {/* Nos divisions */}
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#D4A017]">
            Nos divisions
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
              Mentions légales
            </Link>
            <Link href="https://xp-nova.com/confidentialite" className="text-white/50 hover:text-[#D4A017] no-underline">
              Confidentialité
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
