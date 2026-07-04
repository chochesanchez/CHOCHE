"use client";

import { useEffect, useState } from "react";

/**
 * Progress of the hero → logo collapse, 0 at the top and 1 once the user has
 * scrolled ~90% of the first viewport. Drives the NavBar reveal; the canvas
 * reads scroll directly inside its animation loop for frame-accuracy.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const p = Math.min(Math.max(window.scrollY / (vh * 0.9), 0), 1);
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/** Matches `prefers-reduced-motion: reduce`, reactively. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
