"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { usePrefersReducedMotion } from "@/lib/useScrollProgress";
import DotFace from "./DotFace";
import HeroLabels from "./HeroLabels";

/** Full-viewport hero: the canvas face, corner labels, and the scroll spacer. */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const { t } = useLanguage();

  return (
    <>
      <DotFace reducedMotion={reduced} />
      <HeroLabels />
      <section
        id="hero"
        className="hero-zone relative h-[100svh] w-full"
        aria-label="CHOCHE"
      >
        {/* Accessible heading + alt text for the canvas signature. */}
        <h1 className="sr-only">CHOCHE — {t.hero.role}</h1>
        <p className="sr-only">{t.hero.reducedMotionAlt}</p>
      </section>
    </>
  );
}
