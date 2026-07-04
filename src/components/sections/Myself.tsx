"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { BIO, FACTS, PHILOSOPHY } from "@/data/myself";
import { pick } from "@/i18n/types";
import ImageFrame from "@/components/ui/ImageFrame";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Myself() {
  const { locale, t } = useLanguage();
  return (
    <section
      id="myself"
      className="relative z-20 mx-auto w-full max-w-editorial scroll-mt-24 bg-white px-6 py-24 sm:px-10 md:py-32"
    >
      <SectionHeading eyebrow={t.myself.eyebrow} title={t.myself.title} index="01" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <ImageFrame
            src="/portrait-placeholder.svg"
            alt="José Manuel Sánchez Pérez — CHOCHE"
            ratio="3 / 4"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </Reveal>

        <div className="flex flex-col justify-between gap-12">
          <Reveal delay={80}>
            <div className="space-y-6 text-lg leading-relaxed md:text-xl">
              {BIO.map((para, i) => (
                <p key={i}>{pick(para, locale)}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <blockquote className="border-l border-black pl-6 text-xl italic leading-snug md:text-2xl">
              <span className="mb-3 block text-[10px] uppercase not-italic tracking-label text-black/40">
                {t.myself.philosophyLabel}
              </span>
              {pick(PHILOSOPHY, locale)}
            </blockquote>
          </Reveal>

          <Reveal delay={200}>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-2">
              {FACTS.map((f, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <dt className="text-[10px] uppercase tracking-label text-black/40">
                    {pick(f.label, locale)}
                  </dt>
                  <dd className="text-sm leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
