'use client';

import React from 'react';
import Link from 'next/link';

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
  /** Clé de la division courante : rendue en badge non-cliquable (référence AGROVITA). */
  currentKey?: string;
}

/**
 * Bandeau utilitaire — identique au bandeau AGROVITA :
 * - XP-NOVA (bouton premium) à gauche, puis « NOS DIVISIONS », puis les badges.
 * - La division courante (`currentKey`) est un badge NON-cliquable (aria-current),
 *   avec un anneau blanc pour marquer le site actif.
 * - Les autres divisions sont des liens atténués (opacité) avec « ↗ », pleins au survol.
 * - À droite : email + sélecteur de langue FR/EN.
 * Compatible Next.js 14 et 16.
 */
export const UtilityBar: React.FC<UtilityBarProps> = ({
  divisions,
  siteUrl = 'https://xp-nova.com',
  showEmail = true,
  showLanguageToggle = true,
  currentLang = 'fr',
  onLanguageChange,
  className = '',
  currentKey,
}) => {
  const labels = {
    nosDivisions: currentLang === 'fr' ? 'NOS DIVISIONS' : 'OUR DIVISIONS',
    retourAria: currentLang === 'fr' ? 'Retour au site principal XP-NOVA' : 'Back to the main XP-NOVA site',
  };

  const renderBadge = (division: Division) => {
    const isCurrent = division.key === currentKey;
    if (isCurrent) {
      return (
        <strong
          key={division.key}
          aria-current="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            borderRadius: 9999,
            padding: '2px 10px',
            fontSize: 12,
            fontWeight: 800,
            color: '#fff',
            background: division.accentColor,
            boxShadow: '0 0 0 2px #fff',
          }}
        >
          {division.name}
        </strong>
      );
    }
    return (
      <a
        key={division.key}
        href={division.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          borderRadius: 9999,
          padding: '2px 10px',
          fontSize: 12,
          fontWeight: 800,
          color: '#fff',
          textDecoration: 'none',
          background: division.accentColor,
          opacity: 0.85,
          transition: 'opacity 150ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; }}
      >
        {division.name} <span aria-hidden>↗</span>
      </a>
    );
  };

  return (
    <div style={{ background: '#0d1f5c' }} className={className}>
      <div
        className="max-w-6xl mx-auto"
        style={{
          minHeight: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px 16px',
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <nav aria-label={currentLang === 'fr' ? 'Sites des divisions' : 'Division websites'} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <a
            href={siteUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 6,
              padding: '4px 14px',
              fontSize: 13,
              fontWeight: 800,
              color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}
            aria-label={labels.retourAria}
          >
            XP-NOVA
          </a>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', marginLeft: 8 }}>
            {labels.nosDivisions}
          </span>
          {divisions.map(renderBadge)}
        </nav>

        <div className="flex items-center gap-4">
          {showEmail && (
            <a href="mailto:hello@xp-nova.com" className="hidden text-white/90 hover:text-white sm:inline font-medium">
              hello@xp-nova.com
            </a>
          )}
          {showLanguageToggle && (
            onLanguageChange ? (
              <button
                onClick={() => onLanguageChange(currentLang === 'fr' ? 'en' : 'fr')}
                className="rounded border border-white/30 px-2 py-0.5 text-xs font-bold text-white no-underline hover:border-[#D4A017] hover:text-[#D4A017]"
                aria-label={currentLang === 'fr' ? 'Version anglaise' : 'Version française'}
              >
                {currentLang === 'fr' ? 'EN' : 'FR'}
              </button>
            ) : (
              <Link
                href={currentLang === 'fr' ? '/en' : '/'}
                className="rounded border border-white/30 px-2 py-0.5 text-xs font-bold text-white no-underline hover:border-[#D4A017] hover:text-[#D4A017]"
                aria-label={currentLang === 'fr' ? 'Version anglaise' : 'Version française'}
              >
                {currentLang === 'fr' ? 'EN' : 'FR'}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
