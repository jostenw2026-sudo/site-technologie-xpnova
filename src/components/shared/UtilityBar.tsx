'use client';

import React from 'react';
import Link from 'next/link';
import { URL_SITES } from "@/lib/sites";

export interface Division {
  key: string;
  name: string;
  url: string;
  accentColor: string;
}

export interface UtilityBarProps {
  divisions: Division[];
  siteUrl?: string;
  showEmail?: boolean;
  showPortal?: boolean;
  showLanguageToggle?: boolean;
  currentLang?: 'fr' | 'en';
  onLanguageChange?: (lang: 'fr' | 'en') => void;
  className?: string;
  /** Clé de la division courante : rendue en badge non-cliquable. */
  currentKey?: string;
}

/**
 * Barre du groupe — charte A (lot 6 de la recette, 19/10/2026), commune aux cinq sites.
 * - Navy du groupe ; XP-NOVA (lien vers le portail), « Nos divisions », quatre badges
 *   aux accents de division de la charte (texte blanc ≥ 5,13:1) ; la division courante
 *   est un badge non cliquable (aria-current) à anneau blanc.
 * - Sous 768 px : une seule ligne, les badges passent dans « Nos divisions ▾ ».
 * - N'est plus collante : seul l'en-tête du site l'est (avant : 227 px collants sur téléphone).
 */
export const UtilityBar: React.FC<UtilityBarProps> = ({
  divisions,
  siteUrl = URL_SITES.portail,
  showEmail = true,
  showLanguageToggle = true,
  currentLang = 'fr',
  onLanguageChange,
  className = '',
  currentKey,
}) => {
  const fr = currentLang === 'fr';
  const libelleDivisions = fr ? 'Nos divisions' : 'Our divisions';

  const badge = (division: Division, grand = false) => {
    const classe = `inline-flex items-center gap-1 rounded-full font-extrabold text-white no-underline hover:no-underline ${
      grand ? 'rounded-md px-3.5 py-2.5 text-sm' : 'px-2.5 py-0.5 text-xs'
    }`;
    if (division.key === currentKey) {
      return (
        <strong key={division.key} aria-current="true" className={classe} style={{ background: division.accentColor, boxShadow: '0 0 0 2px #fff inset' }}>
          {division.name}
        </strong>
      );
    }
    return (
      <a key={division.key} href={division.url} target="_blank" rel="noopener noreferrer" className={classe} style={{ background: division.accentColor }}>
        {division.name} <span aria-hidden>↗</span>
      </a>
    );
  };

  return (
    <div className={`bg-[#0D1F5C] text-white text-[13px] ${className}`}>
      <div className="max-w-6xl mx-auto flex items-center gap-3 min-h-10 px-6">
        <a href={siteUrl} className="rounded px-2 py-0.5 font-extrabold tracking-wide text-white no-underline hover:no-underline" aria-label={fr ? 'XP-NOVA — site principal' : 'XP-NOVA — main website'}>
          XP-NOVA
        </a>
        <nav className="flex items-center gap-2" aria-label={fr ? 'Sites des divisions' : 'Division websites'}>
          <span className="hidden md:inline font-semibold">{libelleDivisions}</span>
          <span className="hidden md:flex flex-wrap items-center gap-1.5">{divisions.map((d) => badge(d))}</span>
          <details className="relative md:hidden">
            <summary className="flex min-h-10 cursor-pointer list-none items-center gap-1 font-bold [&::-webkit-details-marker]:hidden">
              {libelleDivisions} <span aria-hidden>▾</span>
            </summary>
            <div className="absolute left-0 top-full z-[60] grid min-w-[230px] gap-2 rounded-b-md bg-[#0D1F5C] p-3 shadow-lg">
              {divisions.map((d) => badge(d, true))}
            </div>
          </details>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {showEmail && (
            <a href="mailto:hello@xp-nova.com" className="hidden text-white/90 hover:text-white sm:inline font-medium no-underline">
              hello@xp-nova.com
            </a>
          )}
          {showLanguageToggle && (
            onLanguageChange ? (
              <button
                onClick={() => onLanguageChange(fr ? 'en' : 'fr')}
                className="rounded border border-white/50 px-2 py-0.5 text-xs font-bold text-white hover:border-[#E9C25A] hover:text-[#E9C25A]"
                aria-label={fr ? 'Version anglaise' : 'Version française'}
              >
                {fr ? 'EN' : 'FR'}
              </button>
            ) : (
              <Link
                href={fr ? '/en' : '/'}
                className="rounded border border-white/50 px-2 py-0.5 text-xs font-bold text-white no-underline hover:border-[#E9C25A] hover:text-[#E9C25A]"
                aria-label={fr ? 'Version anglaise' : 'Version française'}
              >
                {fr ? 'EN' : 'FR'}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
