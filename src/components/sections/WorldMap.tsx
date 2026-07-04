"use client";

import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";
import worldTopo from "world-atlas/countries-110m.json";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pick } from "@/i18n/types";
import {
  PLACE_BY_GEO,
  TOTAL_CITIES,
  TOTAL_COUNTRIES,
  type Place,
} from "@/data/places";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Tip {
  place: Place;
  x: number;
  y: number;
}

export default function WorldMap() {
  const { locale, t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  // react-simple-maps parses topojson after mount; render only on the client to
  // avoid a hydration mismatch and to reserve the map's layout space up front.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const show = (place: Place, clientX: number, clientY: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ place, x: clientX - rect.left, y: clientY - rect.top });
  };

  return (
    <section
      id="map"
      className="relative z-20 mx-auto w-full max-w-editorial scroll-mt-24 bg-white px-6 py-24 sm:px-10 md:py-32"
    >
      <SectionHeading eyebrow={t.map.eyebrow} title={t.map.title} index="04" />

      <Reveal>
        <div className="mb-8 flex flex-wrap items-baseline gap-x-10 gap-y-2">
          <p className="text-5xl md:text-6xl">
            {TOTAL_COUNTRIES}{" "}
            <span className="text-lg text-black/50">{t.map.countries}</span>
          </p>
          <p className="text-5xl md:text-6xl">
            {TOTAL_CITIES}+{" "}
            <span className="text-lg text-black/50">{t.map.cities}</span>
          </p>
          <p className="ml-auto text-[11px] uppercase tracking-label text-black/40">
            {t.map.hint}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div
          ref={wrapRef}
          className="relative w-full border border-hairline"
          onMouseLeave={() => setTip(null)}
          style={{ aspectRatio: "980 / 500" }}
        >
          {!mounted ? null : (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 165 }}
            width={980}
            height={500}
            style={{ width: "100%", height: "auto" }}
          >
            <Sphere id="sphere" fill="#fff" stroke="rgba(0,0,0,0.12)" strokeWidth={0.5} />
            <Geographies geography={worldTopo}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const place = PLACE_BY_GEO[geo.properties.name as string];
                  const visited = Boolean(place);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) =>
                        place && show(place, e.clientX, e.clientY)
                      }
                      onMouseMove={(e) =>
                        place && show(place, e.clientX, e.clientY)
                      }
                      onClick={(e) => place && show(place, e.clientX, e.clientY)}
                      style={{
                        default: {
                          fill: visited ? "#000" : "#fff",
                          stroke: "rgba(0,0,0,0.14)",
                          strokeWidth: 0.5,
                          outline: "none",
                          transition: "fill 200ms ease",
                        },
                        hover: {
                          fill: visited ? "#000" : "rgba(0,0,0,0.06)",
                          stroke: "rgba(0,0,0,0.35)",
                          strokeWidth: 0.6,
                          outline: "none",
                          cursor: visited ? "pointer" : "default",
                        },
                        pressed: {
                          fill: visited ? "#000" : "rgba(0,0,0,0.06)",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          )}

          {tip && (
            <div
              className="pointer-events-none absolute z-30 max-w-[220px] border border-black bg-white px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
              style={{
                left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth ?? 0) - 230),
                top: tip.y + 14,
              }}
            >
              <p className="mb-1 text-base">
                {pick(tip.place.country, locale)}
                {tip.place.home && (
                  <span className="ml-2 text-[9px] uppercase tracking-label text-black/40">
                    home
                  </span>
                )}
              </p>
              {tip.place.cities.length > 0 ? (
                <p className="text-xs leading-relaxed text-black/60">
                  {tip.place.cities.join(" · ")}
                </p>
              ) : (
                <p className="text-xs text-black/40">—</p>
              )}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
