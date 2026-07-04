"use client";

import { useEffect, useRef } from "react";
import { NAV_LOGO } from "@/lib/brand";

/**
 * The signature. Black dots assemble into a face on white, the pupils track the
 * cursor, the dots repel and drift — and on scroll the whole face collapses so
 * the two eyes become the two dots of the CHOCHE logo (Phase 3 brand reveal).
 *
 * Physics ported from the reference canvas; Phase 3 is the new work.
 */

interface Particle {
  nx: number;
  ny: number;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  tx: number;
  ty: number;
  eye: 0 | -1 | 1; // 0 = not an eye, -1 = left eye, +1 = right eye
}

interface Seed {
  nx: number;
  ny: number;
  r: number;
  eye: 0 | -1 | 1;
}

const LEFT_EYE_N = { nx: -0.3, ny: -0.18 };
const RIGHT_EYE_N = { nx: 0.3, ny: -0.18 };

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a || 1));
  return t * t * (3 - 2 * t);
};

function buildSeeds(density: number): Seed[] {
  const s: Seed[] = [];

  function add(
    bx: number,
    by: number,
    n: number,
    sx: number,
    sy: number,
    r0: number,
    r1: number,
    eye: 0 | -1 | 1 = 0
  ) {
    const count = Math.max(1, Math.round(n * density));
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.pow(Math.random(), 0.42);
      s.push({
        nx: bx + Math.cos(a) * d * sx,
        ny: by + Math.sin(a) * d * sy,
        r: r0 + Math.random() * (r1 - r0),
        eye,
      });
    }
  }

  // HEAD MASS
  add(0, 0.0, 200, 0.7, 0.88, 2.0, 7.0);
  add(0, 0.0, 80, 0.52, 0.65, 1.8, 5.5);
  add(0, -0.08, 60, 0.6, 0.75, 1.8, 5.5);
  add(0, 0.15, 50, 0.55, 0.6, 1.8, 5.5);

  // FOREHEAD
  add(0, -0.5, 30, 0.4, 0.2, 1.8, 5.5);
  add(0, -0.36, 22, 0.48, 0.12, 1.8, 5.0);

  // EYEBROWS
  add(-0.33, -0.37, 26, 0.23, 0.07, 3.5, 9.5);
  add(0.33, -0.37, 26, 0.23, 0.07, 3.5, 9.5);
  add(-0.38, -0.34, 10, 0.1, 0.05, 3.0, 8.0);
  add(0.38, -0.34, 10, 0.1, 0.05, 3.0, 8.0);

  // EYE SOCKETS — tagged as eyes so Phase 3 keeps them as the logo dots
  add(-0.3, -0.18, 28, 0.19, 0.12, 6.0, 13.0, -1);
  add(0.3, -0.18, 28, 0.19, 0.12, 6.0, 13.0, 1);
  add(-0.3, -0.18, 16, 0.13, 0.08, 3.5, 7.0, -1);
  add(0.3, -0.18, 16, 0.13, 0.08, 3.5, 7.0, 1);

  // NOSE
  add(0, 0.06, 16, 0.06, 0.2, 5.0, 11.0);
  add(0, 0.23, 20, 0.17, 0.09, 5.5, 12.0);
  add(-0.14, 0.27, 10, 0.07, 0.07, 4.0, 9.0);
  add(0.14, 0.27, 10, 0.07, 0.07, 4.0, 9.0);
  add(-0.09, 0.16, 8, 0.05, 0.1, 3.5, 8.0);
  add(0.09, 0.16, 8, 0.05, 0.1, 3.5, 8.0);

  // UNDER-EYE / CHEEKBONE
  add(-0.28, -0.04, 12, 0.12, 0.08, 2.5, 6.5);
  add(0.28, -0.04, 12, 0.12, 0.08, 2.5, 6.5);

  // MOUTH
  add(0, 0.41, 10, 0.19, 0.05, 3.0, 7.5);
  add(0, 0.48, 24, 0.27, 0.09, 3.5, 9.0);
  add(0, 0.56, 8, 0.16, 0.05, 2.5, 6.5);

  // PHILTRUM
  add(0, 0.33, 7, 0.05, 0.07, 3.0, 7.5);

  // CHIN
  add(0, 0.68, 22, 0.28, 0.16, 2.2, 8.0);
  add(0, 0.81, 12, 0.2, 0.09, 2.0, 6.5);

  // CHEEKS
  add(-0.44, 0.13, 20, 0.16, 0.2, 2.0, 7.0);
  add(0.44, 0.13, 20, 0.16, 0.2, 2.0, 7.0);
  add(-0.4, 0.3, 16, 0.14, 0.18, 2.0, 6.5);
  add(0.4, 0.3, 16, 0.14, 0.18, 2.0, 6.5);

  // JAWLINE
  add(-0.4, 0.49, 18, 0.13, 0.17, 2.0, 7.0);
  add(0.4, 0.49, 18, 0.13, 0.17, 2.0, 7.0);
  add(-0.26, 0.63, 12, 0.11, 0.11, 2.0, 6.5);
  add(0.26, 0.63, 12, 0.11, 0.11, 2.0, 6.5);

  // TEMPLES / SIDES
  add(-0.6, -0.26, 16, 0.12, 0.18, 2.0, 6.5);
  add(0.6, -0.26, 16, 0.12, 0.18, 2.0, 6.5);
  add(-0.62, 0.06, 14, 0.1, 0.16, 2.0, 6.0);
  add(0.62, 0.06, 14, 0.1, 0.16, 2.0, 6.0);

  // HAIR
  add(0, -0.77, 20, 0.38, 0.12, 2.0, 6.0);
  add(-0.22, -0.73, 14, 0.22, 0.1, 1.8, 5.5);
  add(0.22, -0.73, 14, 0.22, 0.1, 1.8, 5.5);
  add(-0.42, -0.61, 10, 0.15, 0.1, 1.8, 5.0);
  add(0.42, -0.61, 10, 0.15, 0.1, 1.8, 5.0);

  // NECK
  add(0, 0.91, 16, 0.16, 0.12, 2.0, 7.0);
  add(0, 1.02, 10, 0.14, 0.08, 2.0, 6.0);

  // DEAD-ZONE FILLERS
  add(-0.16, -0.08, 14, 0.09, 0.14, 1.8, 5.5);
  add(0.16, -0.08, 14, 0.09, 0.14, 1.8, 5.5);
  add(0, -0.12, 12, 0.07, 0.1, 1.8, 5.0);
  add(-0.5, -0.08, 12, 0.09, 0.2, 1.8, 6.0);
  add(0.5, -0.08, 12, 0.09, 0.2, 1.8, 6.0);
  add(0, 0.78, 8, 0.22, 0.08, 2.0, 6.0);
  add(-0.2, 0.72, 8, 0.1, 0.1, 2.0, 6.0);
  add(0.2, 0.72, 8, 0.1, 0.1, 2.0, 6.0);

  return s;
}

export default function DotFace({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const density = isMobile ? 0.5 : 1;

    let W = 0;
    let H = 0;
    let CX = 0;
    let CY = 0;
    let SC = 0;

    const mouse = { x: 0, y: 0, active: false };
    let particles: Particle[] = [];

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H / 2;
      SC = Math.min(W, H) * 0.37;
    }

    function init() {
      const seeds = buildSeeds(density);
      particles = seeds.map((s) => ({
        nx: s.nx,
        ny: s.ny,
        r: s.r,
        eye: s.eye,
        x: reducedMotion ? CX + s.nx * SC : Math.random() * W,
        y: reducedMotion ? CY + s.ny * SC : Math.random() * H,
        vx: reducedMotion ? 0 : (Math.random() - 0.5) * 5,
        vy: reducedMotion ? 0 : (Math.random() - 0.5) * 5,
        phase: Math.random() * Math.PI * 2,
        tx: 0,
        ty: 0,
      }));
    }

    resize();
    init();

    // ── Reduced motion: draw the assembled face once, statically, and stop.
    if (reducedMotion) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(0,0,0,0.93)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      const onResizeStatic = () => {
        resize();
        init();
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgba(0,0,0,0.93)";
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    // ── Interaction
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    };
    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    // ── Spatial grid for single-layer collisions
    const CELL = 20;
    let grid = new Map<number, number[]>();
    function buildGrid() {
      grid.clear();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const k = (Math.floor(p.x / CELL) * 100000 + Math.floor(p.y / CELL)) | 0;
        const cell = grid.get(k);
        if (cell) cell.push(i);
        else grid.set(k, [i]);
      }
    }
    function neighbors(x: number, y: number): number[] {
      const gx = Math.floor(x / CELL) | 0;
      const gy = Math.floor(y / CELL) | 0;
      const out: number[] = [];
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++) {
          const cell = grid.get((gx + dx) * 100000 + (gy + dy));
          if (cell) for (const n of cell) out.push(n);
        }
      return out;
    }

    // Pupils
    const lp = { x: 0, y: 0 };
    const rp = { x: 0, y: 0 };
    let pupilInit = false;

    let t0: number | null = null;
    const DELAY = 350;
    const DUR = 2200;
    let assembled = false;
    let raf = 0;

    function frame(ts: number) {
      if (t0 === null) t0 = ts;
      const el = ts - t0;
      let assembly = 0;
      if (el > DELAY) assembly = easeOutCubic(Math.min((el - DELAY) / DUR, 1));
      if (assembly >= 1) assembled = true;

      // Skip heavy work once scrolled well past the hero (canvas is covered).
      const scrollY = window.scrollY;
      if (scrollY > H * 1.5) {
        raf = requestAnimationFrame(frame);
        return;
      }

      // Phase 3 progress: hero → logo collapse.
      const rawP = clamp01(scrollY / (H * 0.9));
      const p = easeInOutCubic(rawP);
      const collapsing = rawP > 0.001;

      // Interpolated face frame: full center → logo slot.
      const curSC = SC + (NAV_LOGO.gap / 0.6 - SC) * p; // eyes land gap apart
      const curCX = CX + (NAV_LOGO.x - CX) * p;
      const curCY = CY + (NAV_LOGO.y - CY) * p;

      // Eye world targets at the current frame.
      const leX = curCX + LEFT_EYE_N.nx * curSC;
      const leY = curCY + LEFT_EYE_N.ny * curSC;
      const reX = curCX + RIGHT_EYE_N.nx * curSC;
      const reY = curCY + RIGHT_EYE_N.ny * curSC;

      // Targets per particle.
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        let tx = curCX + pt.nx * curSC;
        let ty = curCY + pt.ny * curSC;
        // As we collapse, non-eye dots migrate into their nearest eye; eye dots
        // tighten onto the eye center so each cluster becomes one solid dot.
        const home = pt.eye !== 0 ? pt.eye : pt.nx < 0 ? -1 : 1;
        const ex = home < 0 ? leX : reX;
        const ey = home < 0 ? leY : reY;
        const pull = pt.eye !== 0 ? p * p : p;
        tx += (ex - tx) * pull;
        ty += (ey - ty) * pull;
        pt.tx = tx;
        pt.ty = ty;
      }

      if (!pupilInit) {
        lp.x = leX;
        lp.y = leY;
        rp.x = reX;
        rp.y = reY;
        pupilInit = true;
      }

      // Gaze — pupils track the cursor, damped, and fade out as we collapse.
      const gaze = 1 - smoothstep(0.02, 0.25, rawP);
      const eyeTravel = curSC * 0.07;
      if (mouse.active && assembled) {
        const ldx = mouse.x - leX;
        const ldy = mouse.y - leY;
        const ld = Math.hypot(ldx, ldy) || 1;
        const lt = (Math.min(ld, eyeTravel) / ld) * gaze;
        lp.x += (leX + ldx * lt - lp.x) * 0.08;
        lp.y += (leY + ldy * lt - lp.y) * 0.08;
        const rdx = mouse.x - reX;
        const rdy = mouse.y - reY;
        const rd = Math.hypot(rdx, rdy) || 1;
        const rt = (Math.min(rd, eyeTravel) / rd) * gaze;
        rp.x += (reX + rdx * rt - rp.x) * 0.08;
        rp.y += (reY + rdy * rt - rp.y) * 0.08;
      } else {
        lp.x += (leX - lp.x) * 0.04;
        lp.y += (leY - lp.y) * 0.04;
        rp.x += (reX - rp.x) * 0.04;
        rp.y += (reY - rp.y) * 0.04;
      }

      // Physics
      buildGrid();
      const CR = 62;
      const CF = 310;
      const interact = 1 - p; // repulsion, drift & collisions ease off on collapse

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        const k = assembled ? 0.03 : 0.052;
        pt.vx += (pt.tx - pt.x) * (collapsing ? 0.14 : k);
        pt.vy += (pt.ty - pt.y) * (collapsing ? 0.14 : k);

        if (mouse.active && interact > 0.02) {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const cr = CR + pt.r;
          if (d2 < cr * cr && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (CF * (1 - d / cr)) / d;
            pt.vx += dx * f * 0.016 * interact;
            pt.vy += dy * f * 0.016 * interact;
          }
        }

        if (interact > 0.05) {
          const nb = neighbors(pt.x, pt.y);
          for (let j = 0; j < nb.length; j++) {
            const ni = nb[j];
            if (ni <= i) continue;
            const q = particles[ni];
            const dx = pt.x - q.x;
            const dy = pt.y - q.y;
            const d2 = dx * dx + dy * dy;
            const md = pt.r + q.r + 0.6;
            if (d2 < md * md && d2 > 0.001) {
              const d = Math.sqrt(d2);
              const ov = md - d;
              const nx = dx / d;
              const ny = dy / d;
              const mr = (q.r * q.r) / (pt.r * pt.r + q.r * q.r);
              const push = ov * 0.42 * interact;
              pt.vx += nx * push * mr;
              pt.vy += ny * push * mr;
              q.vx -= nx * push * (1 - mr);
              q.vy -= ny * push * (1 - mr);
              const dvx = pt.vx - q.vx;
              const dvy = pt.vy - q.vy;
              const dot = dvx * nx + dvy * ny;
              if (dot < 0) {
                const imp = dot * 0.24;
                pt.vx -= imp * nx * mr;
                pt.vy -= imp * ny * mr;
                q.vx += imp * nx * (1 - mr);
                q.vy += imp * ny * (1 - mr);
              }
            }
          }
        }

        if (assembled && interact > 0.05) {
          pt.vx += Math.sin(ts * 0.00055 + pt.phase) * 0.04 * interact;
          pt.vy += Math.cos(ts * 0.00068 + pt.phase * 1.6) * 0.04 * interact;
        }

        pt.vx *= assembled ? 0.88 : 0.8;
        pt.vy *= assembled ? 0.88 : 0.8;
        pt.x += pt.vx;
        pt.y += pt.vy;
      }

      // ── Draw
      ctx!.clearRect(0, 0, W, H);
      const appear = assembly < 0.06 ? 0 : Math.min((assembly - 0.06) / 0.28, 1);
      // Fade the cloud out before the content settles so the crisp DOM logo —
      // not the converging canvas dots — is what rests in the nav slot.
      const eyeFade = 1 - smoothstep(0.7, 0.9, rawP);
      const bodyFade = 1 - smoothstep(0.45, 0.72, rawP);

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        const a = appear * 0.93 * (pt.eye !== 0 ? eyeFade : bodyFade);
        if (a <= 0.01) continue;
        ctx!.fillStyle = `rgba(0,0,0,${a.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Pupils — only while the face is open.
      if (assembled && appear > 0.9 && gaze > 0.05) {
        const pR = curSC * 0.03;
        ctx!.fillStyle = `rgba(0,0,0,${(0.98 * gaze).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(lp.x, lp.y, pR, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(rp.x, rp.y, pR, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Custom cursor visibility — hero only, fine pointers.
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          mouse.active && !isMobile && rawP < 0.5 ? "1" : "0";
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10"
      />
      {!reducedMotion && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none fixed z-[60] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-0 transition-opacity duration-300"
        />
      )}
    </>
  );
}
