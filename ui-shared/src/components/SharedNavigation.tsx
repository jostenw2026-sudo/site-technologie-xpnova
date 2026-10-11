import React, { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}

export interface SharedNavigationProps {
  items: NavItem[];
  mobileBreakpoint?: number;
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
}

/**
 * Navigation partagée - Compatible Next.js 14 et 16
 * Menu principal avec version mobile responsive
 */
export const SharedNavigation: React.FC<SharedNavigationProps> = ({
  items,
  mobileBreakpoint = 1024,
  className = '',
  logoSrc = '/brand/logo_xpnova_color.png',
  logoAlt = 'XP-NOVA',
  logoHref = '/',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`xpnova-shared-navigation ${className}`} style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E5EC',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <a href={logoHref} style={{ textDecoration: 'none' }}>
          <img
            src={logoSrc}
            alt={logoAlt}
            style={{ height: '40px', width: 'auto' }}
          />
        </a>

        {/* Menu desktop */}
        <ul style={{
          display: 'none',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '32px',
          [`@media (min-width: ${mobileBreakpoint}px)`]: {
            display: 'flex',
          },
        } as any}>
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                style={{
                  color: item.active ? '#0D1F5C' : '#5A6072',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: item.active ? 600 : 400,
                  position: 'relative',
                  padding: '8px 0',
                }}
              >
                {item.label}
                {item.active && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#D4A017',
                  }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'block',
            [`@media (min-width: ${mobileBreakpoint}px)`]: {
              display: 'none',
            },
            backgroundColor: 'transparent',
            border: 'none',
            color: '#0D1F5C',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '8px',
          } as any}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div style={{
          display: 'block',
          [`@media (min-width: ${mobileBreakpoint}px)`]: {
            display: 'none',
          },
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E5EC',
          padding: '16px 24px',
        } as any}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: item.active ? '#0D1F5C' : '#5A6072',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: item.active ? 600 : 400,
                    display: 'block',
                    padding: '8px 0',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default SharedNavigation;
