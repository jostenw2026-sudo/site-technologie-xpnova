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
 * Bandeau utilitaire - Barre supérieure avec liens vers les divisions
 * Compatible Next.js 14 et 16
 */
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
    <div className={`xpnova-utility-bar ${className}`} style={{
      backgroundColor: '#0D1F5C',
      color: '#FFFFFF',
      padding: '8px 24px',
      fontSize: '0.875rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* Gauche : Divisions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8 }}>
          Nos divisions
        </span>
        {divisions.map((division) => (
          <a
            key={division.key}
            href={division.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: division.accentColor,
              color: '#0D1F5C',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {division.name}
          </a>
        ))}
      </div>

      {/* Droite : E-mail, Portail, Langue */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {showEmail && (
          <a
            href="mailto:hello@xp-nova.com"
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.875rem' }}
          >
            hello@xp-nova.com
          </a>
        )}
        {showPortal && (
          <a
            href={`${siteUrl}/portail`}
            style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '0.875rem' }}
          >
            Portail
          </a>
        )}
        {showLanguageToggle && onLanguageChange && (
          <button
            onClick={() => onLanguageChange(currentLang === 'fr' ? 'en' : 'fr')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#FFFFFF',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            {currentLang === 'fr' ? 'EN' : 'FR'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UtilityBar;
