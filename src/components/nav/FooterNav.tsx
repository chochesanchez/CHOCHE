"use client";

import { NAV_LABEL, SECTIONS, type Mode, type SectionId } from "@/lib/brand";

/** Big, uppercase footer nav — ABOUT · TIMELINE · MAP. A design element, not a note. */
export default function FooterNav({
  mode,
  onSelect,
}: {
  mode: Mode;
  onSelect: (id: SectionId) => void;
}) {
  return (
    <nav className="absolute inset-x-0 bottom-[22px] z-20 flex flex-wrap items-center justify-center gap-x-[clamp(20px,6vw,56px)] gap-y-3 px-4 sm:bottom-[34px]">
      {SECTIONS.map((id) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-current={active ? "page" : undefined}
            className={`relative py-1 text-[clamp(18px,4.6vw,26px)] uppercase tracking-[0.18em] transition-colors duration-500 ${
              active ? "text-black" : "text-black/55 hover:text-black"
            }`}
          >
            {NAV_LABEL[id]}
            <span
              className="absolute -bottom-[3px] left-0 h-px bg-black transition-all duration-500"
              style={{ width: active ? "100%" : "0%" }}
            />
          </button>
        );
      })}
    </nav>
  );
}
