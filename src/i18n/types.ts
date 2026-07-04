export type Locale = "en" | "es" | "fr";

export const LOCALES: Locale[] = ["en", "es", "fr"];

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
};

/** A string translated into every supported language. */
export type Localized = Record<Locale, string>;

/** Pick the active-locale string, falling back to English. */
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}
