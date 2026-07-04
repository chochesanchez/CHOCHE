"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  usePrefersReducedMotion,
  useScrollProgress,
} from "@/lib/useScrollProgress";

/** The four corner labels + scroll hint that live over the hero canvas. */
export default function HeroLabels() {
  const { t } = useLanguage();
  const progress = useScrollProgress();
  const reduced = usePrefersReducedMotion();
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    if (reduced) {
      setAppeared(true);
      return;
    }
    const id = window.setTimeout(() => setAppeared(true), 2600);
    return () => window.clearTimeout(id);
  }, [reduced]);

  // Corners fade in after assembly, then fade out as the face collapses.
  const opacity = appeared ? Math.max(0, 1 - progress * 1.8) : 0;
  const label =
    "pointer-events-none fixed z-30 text-[10px] uppercase tracking-label text-black/30";
  const style = { opacity, transition: "opacity 1.2s ease" };

  return (
    <div aria-hidden="true">
      <span className={`${label} left-6 top-9 sm:left-12`} style={style}>
        CHOCHE
      </span>
      <span className={`${label} right-6 top-9 text-right sm:right-12`} style={style}>
        2026
      </span>
      <span className={`${label} bottom-9 left-6 sm:left-12`} style={style}>
        {t.hero.role}
      </span>
      <span
        className={`${label} bottom-9 right-6 text-right sm:right-12`}
        style={style}
      >
        {t.hero.signature}
      </span>

      {/* Scroll hint */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex flex-col items-center gap-2"
        style={{ opacity: appeared ? Math.max(0, 1 - progress * 3) : 0, transition: "opacity 1.2s ease" }}
      >
        <span className="text-[10px] uppercase tracking-label text-black/35">
          {t.hero.scrollHint}
        </span>
        <span className="h-5 w-px animate-pulse bg-black/25" />
      </div>
    </div>
  );
}
