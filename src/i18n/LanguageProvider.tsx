"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DICTIONARIES, type Dict } from "./dictionaries";
import { LOCALES, type Locale } from "./types";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "choche.locale";

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as string[]).includes(value);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore a saved choice, otherwise infer from the browser once on mount.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) {
      setLocaleState(saved);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (isLocale(nav)) setLocaleState(nav);
  }, []);

  // Keep <html lang> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
