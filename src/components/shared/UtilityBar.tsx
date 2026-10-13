'use client';

import React from 'react';

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
}

/**
 * Bandeau utilitaire - Style XP-NOVA
 * Compatible Next.js 14 et 16
 */
export const UtilityBar: React.FC<UtilityBarProps> = ({
  divisions,
  siteUrl = 'https://xp-nova.com',
  showEmail = true,
  showPortal = false, // Default false (Portal link removed)
  showLanguageToggle = true,
  currentLang = 'fr',
  onLanguageChange,
  className = '',
}) => {
  return (
    <div className={`bg-[#0D1F5C] text-white/90 text-sm ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2 px-6">
        {/* Left: XP-NOVA button + "Nos divisions" + Division badges */}
        <nav className="flex flex-wrap items-center gap-3" aria-label="Sites des divisions">
          {/* XP-NOVA premium button */}
          <a
            href={siteUrl}
            className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] px-3 py-1.5 text-[0.85rem] font-bold tracking-wide text-white no-underline shadow-md transition-transform hover:scale-105 hover:shadow-lg"
            aria-label="Retour au site principal XP-NOVA"
          >
            XP-NOVA
          </a>

          {/* "Nos divisions" label */}
          <span className="text-[0.8rem] font-semibold uppercase tracking-wider text-white">
            Nos divisions
          </span>

          {/* Division badges */}
          {divisions.map((division) => (
            <a
              key={division.key}
              href={division.url}
              target="_blank"
              rel="noopener"
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.8rem] font-extrabold tracking-wide text-white no-underline transition-[filter] hover:brightness-110 ${
                division.key === 'agrovita' ? 'bg-[#22C55E]' : division.key === 'odt' ? 'bg-[#00289A]' : division.key === 'technologie' ? 'bg-[#D4A017]' : 'bg-[#F97316]'
              }`}
            >
              {division.name} <span aria-hidden>↗</span>
            </a>
          ))}
        </nav>

        {/* Right: Email + Language toggle */}
        <div className="flex items-center gap-4">
          {showEmail && (
            <a href="mailto:hello@xp-nova.com" className="hidden text-white/90 hover:text-white sm:inline font-medium">
              hello@xp-nova.com
            </a>
          )}
          {showLanguageToggle && onLanguageChange && (
            <button
              onClick={() => onLanguageChange(currentLang === 'fr' ? 'en' : 'fr')}
              className="rounded border border-white/30 px-2 py-0.5 text-xs font-bold text-white no-underline hover:border-[#D4A017] hover:text-[#D4A017]"
              aria-label={currentLang === 'fr' ? 'Version anglaise' : 'Version française'}
            >
              {currentLang === 'fr' ? 'EN' : 'FR'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
