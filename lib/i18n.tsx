'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'fr';
interface LanguageValue { lang: Language; setLang: (lang: Language) => void }
const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem('tkd-site-language');
      if (saved === 'fr' || saved === 'en') setLangState(saved);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const value = useMemo(() => ({
    lang,
    setLang: (next: Language) => {
      setLangState(next);
      localStorage.setItem('tkd-site-language', next);
      document.documentElement.lang = next;
    },
  }), [lang]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
