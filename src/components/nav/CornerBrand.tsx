"use client";

import type { Mode } from "@/lib/brand";

/**
 * Corner chrome. Home: only the CHOCHE wordmark (top-right) — the dots are the
 * logo. Inside a section: a small two-dot logo (top-left, always horizontal)
 * that returns home. No language switcher — the site is English only.
 */
export default function CornerBrand({
  mode,
  onHome,
}: {
  mode: Mode;
  onHome: () => void;
}) {
  const inSection = mode !== "home";
  return (
    <>
      <button
        type="button"
        onClick={onHome}
        aria-label="Back to home"
        className="absolute left-[22px] top-[22px] z-20 flex flex-row items-center gap-[9px] p-1.5 transition-opacity duration-700 sm:left-[30px] sm:top-[28px] sm:gap-[10px]"
        style={{
          opacity: inSection ? 1 : 0,
          pointerEvents: inSection ? "auto" : "none",
        }}
      >
        <span className="block h-[11px] w-[11px] rounded-full bg-black sm:h-3 sm:w-3" />
        <span className="block h-[11px] w-[11px] rounded-full bg-black sm:h-3 sm:w-3" />
      </button>

      <button
        type="button"
        onClick={onHome}
        aria-label="Home"
        className="absolute right-[22px] top-[24px] z-20 text-[12px] tracking-[0.4em] text-black/55 transition-colors hover:text-black sm:right-[32px] sm:top-[28px] sm:text-[14px] sm:tracking-[0.46em]"
      >
        CHOCHE
      </button>
    </>
  );
}
