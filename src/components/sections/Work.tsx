"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { WORK } from "@/data/work";
import { pick } from "@/i18n/types";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Work() {
  const { locale, t } = useLanguage();
  return (
    <section
      id="work"
      className="relative z-20 mx-auto w-full max-w-editorial scroll-mt-24 bg-white px-6 py-24 sm:px-10 md:py-32"
    >
      <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} index="02" />

      <ul>
        {WORK.map((w, i) => (
          <Reveal as="li" key={i} delay={i * 60}>
            <div className="grid grid-cols-1 gap-4 border-t border-hairline py-8 md:grid-cols-[1fr_1.2fr_auto] md:items-baseline md:gap-10">
              <h3 className="text-xl md:text-2xl">{pick(w.role, locale)}</h3>
              <div className="flex flex-col gap-2">
                <p className="text-base text-black/70">{w.org}</p>
                <p className="max-w-xl text-sm leading-relaxed text-black/55">
                  {pick(w.description, locale)}
                </p>
              </div>
              <p className="whitespace-nowrap text-[11px] uppercase tracking-label text-black/40 md:text-right">
                {w.period}
                {w.present ? ` — ${t.work.present}` : ""}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
