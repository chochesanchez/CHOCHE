"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES, LOCALE_LABEL } from "@/i18n/types";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, setLocale } = useLanguage();
  return (
    <div
      className={`flex items-center gap-1 text-[10px] uppercase tracking-label ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-black/25">·</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`transition-opacity duration-200 hover:opacity-100 ${
              locale === l ? "opacity-100 underline underline-offset-4" : "opacity-40"
            }`}
          >
            {LOCALE_LABEL[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
