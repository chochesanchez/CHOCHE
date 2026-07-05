export interface Place {
  /** Must match the `name` property in world-atlas countries-110m.json. */
  geoName: string;
  country: string;
  home?: boolean;
  cities: string[];
}

/**
 * Visited countries. `geoName` is the join key to the topojson feature.
 * Monaco and Vatican are sovereign but too small to render at 110m, so they're
 * folded into France / Italy as cities.
 */
export const PLACES: Place[] = [
  {
    geoName: "Mexico",
    home: true,
    country: "México",
    cities: [
      "Monterrey", "Mexico City", "Cancún", "Tulum", "Puerto Vallarta",
      "Mérida", "Chiapas", "Puerto Escondido", "Mazatlán", "Holbox",
      "Isla Mujeres", "San Miguel de Allende", "Morelia", "Pátzcuaro",
      "Valle de Bravo", "Parras",
    ],
  },
  {
    geoName: "United States of America",
    country: "United States",
    cities: [
      "Los Angeles", "Las Vegas", "New York", "Orlando",
      "Dallas", "Houston", "Washington",
    ],
  },
  { geoName: "Canada", country: "Canada", cities: ["Montreal", "Quebec"] },
  { geoName: "Costa Rica", country: "Costa Rica", cities: [] },
  { geoName: "Guatemala", country: "Guatemala", cities: [] },
  { geoName: "Spain", country: "Spain", cities: ["Madrid", "Barcelona"] },
  {
    geoName: "France",
    country: "France",
    cities: ["Paris", "Nice", "Cannes", "Menton", "Monaco"],
  },
  {
    geoName: "Italy",
    country: "Italy",
    cities: [
      "Milan", "Rome", "Florence", "Venice",
      "Amalfi", "Capri", "Bergamo", "Vatican City",
    ],
  },
  {
    geoName: "Croatia",
    country: "Croatia",
    cities: ["Split", "Dubrovnik", "Zagreb"],
  },
  { geoName: "Greece", country: "Greece", cities: ["Athens", "Mykonos"] },
  { geoName: "Turkey", country: "Türkiye", cities: ["Istanbul"] },
  {
    geoName: "Switzerland",
    country: "Switzerland",
    cities: ["Zürich", "Crans-Montana", "Zinal"],
  },
  { geoName: "Netherlands", country: "Netherlands", cities: ["Amsterdam"] },
  { geoName: "United Kingdom", country: "United Kingdom", cities: ["London"] },
];

/** Fast lookup by topojson feature name. */
export const PLACE_BY_GEO: Record<string, Place> = Object.fromEntries(
  PLACES.map((p) => [p.geoName, p])
);

export const TOTAL_COUNTRIES = PLACES.length;
export const TOTAL_CITIES = PLACES.reduce((n, p) => n + p.cities.length, 0);
