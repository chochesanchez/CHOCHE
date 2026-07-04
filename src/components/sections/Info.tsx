"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  CONTACT_LINKS,
  EMAIL,
  EMAIL_IS_PLACEHOLDER,
  LOCATION,
} from "@/data/contact";
import ImageFrame from "@/components/ui/ImageFrame";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Info() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <section
      id="info"
      className="relative z-20 mx-auto w-full max-w-editorial scroll-mt-24 bg-white px-6 py-24 sm:px-10 md:py-32"
    >
      <SectionHeading eyebrow={t.info.eyebrow} title={t.info.title} index="05" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <div className="flex flex-col justify-between gap-12">
          <Reveal>
            <p className="max-w-xl text-xl leading-relaxed md:text-2xl">
              {t.info.lead}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-col gap-4">
              {EMAIL_IS_PLACEHOLDER ? (
                <p className="text-sm text-black/45">{t.info.emailPlaceholder}</p>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="border border-black px-6 py-3 text-sm uppercase tracking-wide2 transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    {t.info.cta} — {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="text-[11px] uppercase tracking-label text-black/50 underline-offset-4 hover:underline"
                  >
                    {copied ? t.info.copied : t.info.copyEmail}
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-hairline pt-8 sm:grid-cols-2">
              {CONTACT_LINKS.map((c) => (
                <li key={c.label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-label text-black/40">
                    {c.label}
                  </span>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {c.value} ↗
                  </a>
                </li>
              ))}
              <li className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-label text-black/40">
                  {t.info.locationLabel}
                </span>
                <span className="text-sm">{LOCATION}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <ImageFrame
            src="/portrait-placeholder.svg"
            alt="CHOCHE"
            ratio="3 / 4"
            sizes="(max-width: 768px) 100vw, 32vw"
          />
        </Reveal>
      </div>

      {/* Signature */}
      <Reveal>
        <footer className="mt-24 flex items-center justify-between border-t border-hairline pt-8">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-label text-black/45">
            <span className="inline-flex gap-[6px]">
              <span className="h-[7px] w-[7px] rounded-full bg-black" />
              <span className="h-[7px] w-[7px] rounded-full bg-black" />
            </span>
            {t.footer.signature}
          </span>
          <span className="text-[11px] uppercase tracking-label text-black/30">
            © 2026
          </span>
        </footer>
      </Reveal>
    </section>
  );
}
