'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
 * Navigation partagée - Style XP-NOVA
 * Compatible Next.js 14 et 16
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
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E2E5EC] ${className}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <a href={logoHref} className="flex items-center" aria-label="XP-NOVA">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={350}
            height={80}
            priority
            className="h-[70px] w-auto"
          />
        </a>

        {/* Menu desktop */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5" aria-label="Navigation principale">
          {items.map((item) => {
            const active = item.active !== undefined ? item.active : isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`text-[0.88rem] xl:text-[0.95rem] font-semibold whitespace-nowrap no-underline ${
                  active
                    ? 'text-[#D4A017]'
                    : 'text-[#1A1A2E] hover:text-[#00289A]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bouton menu mobile */}
        <button
          className="lg:hidden inline-flex flex-col gap-1.5 p-2"
          aria-label="Ouvrir le menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-[#0D1F5C]" />
          <span className="block h-0.5 w-6 bg-[#0D1F5C]" />
          <span className="block h-0.5 w-6 bg-[#0D1F5C]" />
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden border-t border-[#E2E5EC] bg-white" aria-label="Navigation mobile">
          <div className="max-w-6xl mx-auto py-3 px-6 flex flex-col">
            {items.map((item) => {
              const active = item.active !== undefined ? item.active : isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`py-2.5 font-semibold border-b border-[#E2E5EC] no-underline ${
                    active ? 'text-[#D4A017]' : 'text-[#1A1A2E]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default SharedNavigation;
