'use client';

import { useEffect, useState } from 'react';
import { lienWhatsapp, MESSAGES } from '@/lib/whatsapp-public';

// Bouton flottant WhatsApp, présent sur toutes les pages (décision DG du 21/10/2026).
// Le message pré-rédigé cite la page d'où écrit le visiteur ; sur /contact il est masqué,
// le formulaire portant déjà son propre bouton.

export default function BoutonWhatsApp({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = MESSAGES[lang];
  const [href, setHref] = useState(lienWhatsapp(t.defaut));
  const [masque, setMasque] = useState(false);

  useEffect(() => {
    const chemin = window.location.pathname;
    setMasque(/\/contact\/?$/.test(chemin));
    const titre = document.title.split('—')[0].trim();
    setHref(lienWhatsapp(titre ? t.page(titre) : t.defaut));
  }, [t]);

  if (masque) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.aria}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#1ebe5b] focus:outline-none focus:ring-2 focus:ring-[#D4A017] print:hidden"
    >
      <IconeWhatsApp />
      <span className="hidden sm:inline">{t.bouton}</span>
      <span className="sm:hidden">{t.boutonCourt}</span>
    </a>
  );
}

export function IconeWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.5L3 29l6.7-1.7c1.9 1 4.1 1.6 6.3 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.7c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1 1-3.9-.3-.4A10.6 10.6 0 0 1 5.3 16C5.3 10.1 10.1 5.3 16 5.3S26.7 10.1 26.7 16 21.9 26.7 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  );
}
