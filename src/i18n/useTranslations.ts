import { usePathname } from 'next/navigation';
import type { Locale } from './config';
import frTranslations from './locales/fr.json';
import enTranslations from './locales/en.json';

const translations = {
  fr: frTranslations,
  en: enTranslations,
} as const;

export function useTranslations() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'fr';
  
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value: any = translations[locale];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return typeof value === 'string' ? value : key;
    },
    locale,
  };
}
