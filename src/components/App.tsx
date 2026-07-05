"use client";

import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { Mode, SectionId } from "@/lib/brand";
import DotFace from "@/components/hero/DotFace";
import CornerBrand from "@/components/nav/CornerBrand";
import FooterNav from "@/components/nav/FooterNav";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import WorldMap from "@/components/sections/WorldMap";

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode>("home");
  const inSection = mode !== "home";

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-white font-serif text-black">
      <DotFace mode={mode} reducedMotion={reduced} />

      <CornerBrand mode={mode} onHome={() => setMode("home")} />

      {/* Panels — dissolve in over the canvas, no routing */}
      <About show={mode === "about"} />
      <Timeline show={mode === "timeline"} />
      <WorldMap show={mode === "map"} />

      {/* Slow white edge fades so panel content masks under the top/bottom
          controls. Invisible on home (white over white). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[84px] bg-gradient-to-b from-white via-white/90 to-transparent sm:h-[100px]"
        style={{ opacity: inSection ? 1 : 0, transition: "opacity 1200ms" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[92px] bg-gradient-to-t from-white via-white/90 to-transparent sm:h-[108px]"
        style={{ opacity: inSection ? 1 : 0, transition: "opacity 1200ms" }}
      />

      <FooterNav mode={mode} onSelect={(id: SectionId) => setMode(id)} />
    </div>
  );
}
