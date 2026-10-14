'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');

  // Build the alternate path
  const alternatePath = isEnglish
    ? pathname.replace('/en', '') || '/'
    : `/en${pathname}`;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={isEnglish ? alternatePath : pathname}
        className={`${
          !isEnglish
            ? 'text-white font-semibold'
            : 'text-white/70 hover:text-white'
        } transition-colors`}
      >
        FR
      </Link>
      <span className="text-white/50">|</span>
      <Link
        href={isEnglish ? pathname : alternatePath}
        className={`${
          isEnglish
            ? 'text-white font-semibold'
            : 'text-white/70 hover:text-white'
        } transition-colors`}
      >
        EN
      </Link>
    </div>
  );
}
