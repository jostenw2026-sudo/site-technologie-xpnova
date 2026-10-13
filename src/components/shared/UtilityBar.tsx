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

export const UtilityBar: React.FC<UtilityBarProps> = ({
  divisions,
  siteUrl = 'https://xp-nova.com',
  showEmail = true,
  showPortal = true,
  showLanguageToggle = true,
  currentLang = 'fr',
  onLanguageChange,
  className = '',
}) => {
  return (
    <div className={`bg-[#0D1F5C] text-white/90 text-sm ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-1.5 px-6">
        <nav className="flex flex-wrap items-center gap-2" aria-label="Sites des divisions">
          <span className="hidden text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/50 sm:inline">Nos divisions</span>
          {divisions.map((division) => (
            <a key={division.key} href={division.url} target="_blank" rel="noopener" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.8rem] font-extrabold tracking-wide text-white no-underline transition-[filter] hover:brightness-110 ${division.key === 'agrovita' ? 'bg-[#22C55E]' : division.key === 'odt' ? 'bg-[#00289A]' : division.key === 'technologie' ? 'bg-[#D4A017]' : 'bg-[#F97316]'}`}>
              {division.name} <span aria-hidden>↗</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {showEmail && (
            <a href="mailto:hello@xp-nova.com" className="hidden text-white/80 hover:text-white sm:inline">hello@xp-nova.com</a>
          )}
          {showPortal && (
            <a href={`${siteUrl}/portail`} className="font-semibold text-white/80 no-underline hover:text-[#D4A017]">Portail</a>
          )}
          {showLanguageToggle && onLanguageChange && (
            <button onClick={() => onLanguageChange(currentLang === 'fr' ? 'en' : 'fr')} className="rounded border border-white/30 px-2 py-0.5 text-xs font-bold text-white no-underline hover:border-[#D4A017] hover:text-[#D4A017]" aria-label={currentLang === 'fr' ? 'Version anglaise' : 'Version française'}>
              {currentLang === 'fr' ? 'EN' : 'FR'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
