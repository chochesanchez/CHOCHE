"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { NAV_LOGO, SECTIONS, type SectionId } from "@/lib/brand";
import {
  usePrefersReducedMotion,
  useScrollProgress,
} from "@/lib/useScrollProgress";
import LanguageSwitcher from "./LanguageSwitcher";

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a || 1));
  return t * t * (3 - 2 * t);
};

/** Two solid dots — the CHOCHE logo. Mirrors the canvas eye geometry. */
function LogoDots() {
  return (
    <span
      className="relative inline-block"
      style={{ width: NAV_LOGO.gap + NAV_LOGO.dot * 2, height: NAV_LOGO.dot * 2 }}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-full bg-black"
        style={{ width: NAV_LOGO.dot * 2, height: NAV_LOGO.dot * 2, left: 0, top: 0 }}
      />
      <span
        className="absolute rounded-full bg-black"
        style={{
          width: NAV_LOGO.dot * 2,
          height: NAV_LOGO.dot * 2,
          right: 0,
          top: 0,
        }}
      />
    </span>
  );
}

export default function NavBar() {
  const { t } = useLanguage();
  const progress = useScrollProgress();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Nav is revealed as the face collapses; with reduced motion it's always on.
  const shown = reduced ? 1 : smoothstep(0.35, 0.8, progress);

  // Active-section indicator.
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const goTo = (id: SectionId) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const labels: Record<SectionId, string> = {
    myself: t.nav.myself,
    work: t.nav.work,
    projects: t.nav.projects,
    map: t.nav.map,
    info: t.nav.info,
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-40"
      style={{
        opacity: shown,
        transform: `translateY(${(1 - shown) * -12}px)`,
        pointerEvents: shown < 0.05 ? "none" : "auto",
      }}
    >
      <nav className="flex items-center justify-between px-6 py-6 sm:px-10 md:px-12">
        {/* Logo — the collapsed face. Click returns home and re-expands it. */}
        <button
          type="button"
          onClick={goTop}
          aria-label={t.nav.backToTop}
          className="flex items-center"
          style={{ marginLeft: NAV_LOGO.x - NAV_LOGO.dot - 24 }}
        >
          <LogoDots />
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 sm:flex">
          <ul className="flex items-center gap-6 text-[11px] uppercase tracking-label">
            {SECTIONS.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => goTo(id)}
                  className={`transition-opacity duration-200 hover:opacity-100 ${
                    active === id ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <span
                    className={
                      active === id
                        ? "border-b border-black pb-1"
                        : "border-b border-transparent pb-1"
                    }
                  >
                    {labels[id]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <span className="h-3 w-px bg-hairline" />
          <LanguageSwitcher />
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="flex h-6 w-6 flex-col items-end justify-center gap-[5px] sm:hidden"
        >
          <span
            className="h-px w-6 bg-black transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="h-px w-6 bg-black transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center gap-8 bg-white px-10 sm:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      >
        <ul className="flex flex-col gap-6 text-2xl">
          {SECTIONS.map((id) => (
            <li key={id}>
              <button type="button" onClick={() => goTo(id)} className="uppercase tracking-wide2">
                {labels[id]}
              </button>
            </li>
          ))}
        </ul>
        <LanguageSwitcher className="mt-4 text-xs" />
      </div>
    </header>
  );
}
