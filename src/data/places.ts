import type { Localized } from "@/i18n/types";

export interface Place {
  /** Must match the `name` property in world-atlas countries-110m.json. */
  geoName: string;
  country: Localized;
  home?: boolean;
  cities: string[];
}

/**
 * Visited countries. `geoName` is the join key to the topojson feature.
 * Monaco and Vatican are sovereign but too small to render at 110m, so per the
 * brief they're folded into France / Italy as cities.
 */
export const PLACES: Place[] = [
  {
    geoName: "Mexico",
    home: true,
    country: { en: "Mexico", es: "México", fr: "Mexique" },
    cities: [
      "Monterrey", "Torreón", "Veracruz", "Mérida", "Cancún",
      "Puerto Vallarta", "Puerto Escondido", "Chiapas", "Mexico City",
      "San Miguel de Allende", "Pátzcuaro", "Morelia", "Puerto Morelos",
      "Isla Mujeres", "Holbox", "Playa del Carmen", "Valle de Bravo",
      "Tulum", "Mazatlán", "Parras",
    ],
  },
  {
    geoName: "United States of America",
    country: { en: "United States", es: "Estados Unidos", fr: "États-Unis" },
    cities: [
      "Los Angeles", "Las Vegas", "New York", "Orlando",
      "Dallas", "Houston", "Washington (Texas)",
    ],
  },
  {
    geoName: "Canada",
    country: { en: "Canada", es: "Canadá", fr: "Canada" },
    cities: ["Montreal", "Quebec"],
  },
  {
    geoName: "Costa Rica",
    country: { en: "Costa Rica", es: "Costa Rica", fr: "Costa Rica" },
    cities: [],
  },
  {
    geoName: "Guatemala",
    country: { en: "Guatemala", es: "Guatemala", fr: "Guatemala" },
    cities: [],
  },
  {
    geoName: "Spain",
    country: { en: "Spain", es: "España", fr: "Espagne" },
    cities: ["Madrid", "Barcelona"],
  },
  {
    geoName: "France",
    country: { en: "France", es: "Francia", fr: "France" },
    cities: ["Paris", "Cannes", "Menton", "Nice", "Monaco"],
  },
  {
    geoName: "Italy",
    country: { en: "Italy", es: "Italia", fr: "Italie" },
    cities: [
      "Milan", "Rome", "Florence", "Amalfi",
      "Venice", "Bergamo", "Capri", "Vatican City",
    ],
  },
  {
    geoName: "Croatia",
    country: { en: "Croatia", es: "Croacia", fr: "Croatie" },
    cities: ["Split", "Dubrovnik", "Zagreb"],
  },
  {
    geoName: "Greece",
    country: { en: "Greece", es: "Grecia", fr: "Grèce" },
    cities: ["Athens", "Mykonos"],
  },
  {
    geoName: "Turkey",
    country: { en: "Turkey", es: "Turquía", fr: "Turquie" },
    cities: ["Istanbul"],
  },
  {
    geoName: "Switzerland",
    country: { en: "Switzerland", es: "Suiza", fr: "Suisse" },
    cities: ["Crans-Montana", "Zurich", "Zinal"],
  },
  {
    geoName: "Netherlands",
    country: { en: "Netherlands", es: "Países Bajos", fr: "Pays-Bas" },
    cities: ["Amsterdam"],
  },
  {
    geoName: "United Kingdom",
    country: { en: "United Kingdom", es: "Reino Unido", fr: "Royaume-Uni" },
    cities: ["London"],
  },
];

/** Fast lookup by topojson feature name. */
export const PLACE_BY_GEO: Record<string, Place> = Object.fromEntries(
  PLACES.map((p) => [p.geoName, p])
);

export const TOTAL_COUNTRIES = PLACES.length;
export const TOTAL_CITIES = PLACES.reduce((n, p) => n + p.cities.length, 0);
