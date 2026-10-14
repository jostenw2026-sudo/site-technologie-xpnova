'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function ConditionalFrenchLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEnglishRoute = pathname?.startsWith('/en');

  if (isEnglishRoute) {
    return null;
  }

  return <>{children}</>;
}
