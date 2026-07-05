"use client";

import { useEffect, useRef } from "react";
import type { Mode } from "@/lib/brand";

/**
 * The signature: many black dots assemble into the two circles of the CHOCHE
 * logo — horizontal at every size. They are never static (perpetual micro-drift
 * + collision jitter) and always interactive (cursor repels, finger drags).
 * Leaving home disperses them slowly and fades them out so a panel can dissolve
 * in; returning home reassembles them slowly. All timings are deliberately slow.
 */

interface Particle {
  tx: number;
  ty: number;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ph: number;
}

export default function DotFace({
  mode,
  reducedMotion,
}: {
  mode: Mode;
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>(mode);
  const burstRef = useRef<() => void>(() => {});

  useEffect(() => {
    const prev = modeRef.current;
    modeRef.current = mode;
    if (mode !== "home" && prev === "home") burstRef.current();
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const RM = reducedMotion;

    let W = 0;
    let H = 0;
    let CX = 0;
    let CY = 0;
    let S = 0;
    let narrow = false;
    let DPR = 1;
    let P: Particle[] = [];
    let dotsAlpha = RM ? 1 : 0;
    let t0: number | null = null;
    const ptr = { x: 0, y: 0, on: false };

    function measure() {
      const r = canvas!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      CX = W / 2;
      CY = H / 2;
      S = Math.min(W, H);
      narrow = W < 560;
    }

    // Two filled circles = the CHOCHE logo. ALWAYS side-by-side (horizontal),
    // desktop and mobile alike — just smaller on narrow screens.
    function seeds() {
      const out: { tx: number; ty: number; r: number }[] = [];
      const R = S * 0.155;
      const sep = R * 2.62;
      const per = narrow ? 300 : 440; // dense
      const rMin = S * 0.004;
      const rMax = S * 0.011;
      const c1 = { x: CX - sep / 2, y: CY };
      const c2 = { x: CX + sep / 2, y: CY };
      for (const c of [c1, c2]) {
        for (let i = 0; i < per; i++) {
          const a = Math.random() * Math.PI * 2;
          const rr = Math.sqrt(Math.random()) * R;
          out.push({
            tx: c.x + Math.cos(a) * rr,
            ty: c.y + Math.sin(a) * rr,
            r: rMin + Math.pow(Math.random(), 1.5) * (rMax - rMin),
          });
        }
      }
      return out;
    }

    function init(scatter: boolean) {
      P = seeds().map((s) => ({
        tx: s.tx,
        ty: s.ty,
        r: s.r,
        x: scatter ? Math.random() * W : s.tx + (Math.random() - 0.5) * 24,
        y: scatter ? Math.random() * H : s.ty + (Math.random() - 0.5) * 24,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        ph: Math.random() * 6.28,
      }));
    }

    // Spatial grid for single-layer collisions.
    function buildGrid(cell: number) {
      const g = new Map<string, number[]>();
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const k = Math.floor(p.x / cell) + "_" + Math.floor(p.y / cell);
        const arr = g.get(k);
        if (arr) arr.push(i);
        else g.set(k, [i]);
      }
      return g;
    }
    function near(g: Map<string, number[]>, x: number, y: number, cell: number) {
      const gx = Math.floor(x / cell);
      const gy = Math.floor(y / cell);
      const o: number[] = [];
      for (let dx = -1; dx < 2; dx++)
        for (let dy = -1; dy < 2; dy++) {
          const a = g.get(gx + dx + "_" + (gy + dy));
          if (a) for (const n of a) o.push(n);
        }
      return o;
    }

    // Gentle, SLOW scatter when leaving home — a low-velocity drift, not a blast.
    burstRef.current = () => {
      for (const p of P) {
        p.vx += (p.x - CX) * 0.02 + (Math.random() - 0.5) * 1.6;
        p.vy += (p.y - CY) * 0.02 + (Math.random() - 0.5) * 1.6;
      }
    };

    let raf = 0;
    function loop(ts: number) {
      if (t0 === null) t0 = ts;
      const el = ts - t0;
      const assembleA = RM ? 1 : Math.min(el / 1400, 1); // slow fade-in on load
      const home = modeRef.current === "home";
      // Slow alpha crossfade (~2s) between home and section.
      dotsAlpha += ((home ? 1 : 0) - dotsAlpha) * 0.02;

      if ((home || dotsAlpha > 0.03) && !RM) {
        const cell = Math.max(14, S * 0.02);
        const g = home ? buildGrid(cell) : null;
        for (let i = 0; i < P.length; i++) {
          const p = P[i];
          if (home) {
            // Calm spring — keeps the logo loose and alive, reassembles slowly.
            const k = 0.035;
            p.vx += (p.tx - p.x) * k;
            p.vy += (p.ty - p.y) * k;
            if (ptr.on) {
              const dx = p.x - ptr.x;
              const dy = p.y - ptr.y;
              const d2 = dx * dx + dy * dy;
              const rad = 80 + p.r;
              if (d2 < rad * rad && d2 > 0.01) {
                const d = Math.sqrt(d2);
                const f = (340 * (1 - d / rad)) / d;
                p.vx += dx * f * 0.016;
                p.vy += dy * f * 0.016;
              }
            }
            const nb = near(g!, p.x, p.y, cell);
            for (const ni of nb) {
              if (ni <= i) continue;
              const q = P[ni];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              const md = p.r + q.r + 0.5;
              if (d2 < md * md && d2 > 0.001) {
                const d = Math.sqrt(d2);
                const ov = md - d;
                const nx = dx / d;
                const ny = dy / d;
                const pu = ov * 0.38;
                p.vx += nx * pu;
                p.vy += ny * pu;
                q.vx -= nx * pu;
                q.vy -= ny * pu;
              }
            }
            // Perpetual micro-drift — the logo breathes, never freezes.
            p.vx += Math.sin(ts * 0.0006 + p.ph) * 0.05;
            p.vy += Math.cos(ts * 0.00072 + p.ph * 1.5) * 0.05;
          }
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      ctx!.clearRect(0, 0, W, H);
      const A = assembleA * dotsAlpha;
      if (A > 0.02) {
        ctx!.fillStyle = "rgba(0,0,0," + (A * 0.92).toFixed(3) + ")";
        for (let i = 0; i < P.length; i++) {
          const p = P[i];
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, 6.2832);
          ctx!.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    }

    // Pointer play — cursor pushes; finger drags on mobile.
    const rect = () => canvas!.getBoundingClientRect();
    const onMouseMove = (e: MouseEvent) => {
      const r = rect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
      ptr.on = modeRef.current === "home";
    };
    const onMouseLeave = () => (ptr.on = false);
    const onTouchStart = (e: TouchEvent) => {
      if (modeRef.current !== "home" || !e.touches[0]) return;
      const r = rect();
      ptr.x = e.touches[0].clientX - r.left;
      ptr.y = e.touches[0].clientY - r.top;
      ptr.on = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (modeRef.current !== "home" || !e.touches[0]) return;
      e.preventDefault();
      const r = rect();
      ptr.x = e.touches[0].clientX - r.left;
      ptr.y = e.touches[0].clientY - r.top;
      ptr.on = true;
    };
    const onTouchEnd = () => (ptr.on = false);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    measure();
    init(!RM);
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      measure();
      init(false);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 block h-full w-full"
      style={{ touchAction: "none" }}
    />
  );
}
