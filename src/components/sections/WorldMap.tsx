"use client";

import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";
import worldTopo from "world-atlas/countries-110m.json";
import Panel from "@/components/ui/Panel";
import {
  PLACE_BY_GEO,
  TOTAL_CITIES,
  TOTAL_COUNTRIES,
  type Place,
} from "@/data/places";

interface Tip {
  place: Place;
  x: number;
  y: number;
}

export default function WorldMap({ show }: { show: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showTip = (place: Place, clientX: number, clientY: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ place, x: clientX - rect.left, y: clientY - rect.top });
  };

  return (
    <Panel show={show} eyebrow="03 — Map" title="Map">
      <div className="mb-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <p className="text-[clamp(22px,4.4vw,42px)]">
          {TOTAL_COUNTRIES} <span className="text-base text-black/50">countries</span>
          <span className="mx-3 text-black/25">·</span>
          {TOTAL_CITIES}+ <span className="text-base text-black/50">cities</span>
        </p>
        <p className="text-[11px] uppercase tracking-label text-black/40 sm:ml-auto">
          Hover or tap a country to see the cities.
        </p>
      </div>

      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden border border-hairline"
        style={{ aspectRatio: "980 / 500" }}
        onMouseLeave={() => setTip(null)}
      >
        {mounted && (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 165 }}
            width={980}
            height={500}
            style={{ width: "100%", height: "auto" }}
          >
            <Sphere
              id="sphere"
              fill="#fff"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth={0.5}
            />
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
                        place && showTip(place, e.clientX, e.clientY)
                      }
                      onMouseMove={(e) =>
                        place && showTip(place, e.clientX, e.clientY)
                      }
                      onClick={(e) => place && showTip(place, e.clientX, e.clientY)}
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
            className="pointer-events-none absolute z-30 max-w-[220px] border border-black bg-white px-4 py-3"
            style={{
              left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth ?? 0) - 230),
              top: tip.y + 14,
            }}
          >
            <p className="mb-1 text-base">
              {tip.place.country}
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
    </Panel>
  );
}
