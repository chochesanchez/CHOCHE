/**
 * Geometry of the two-dot logo, shared by the canvas (DotFace) and the DOM
 * NavBar so the hero's eyes land exactly on the sticky logo slot.
 * All values in CSS pixels, measured from the top-left of the viewport.
 */
export const NAV_LOGO = {
  x: 40, // horizontal center of the logo pair
  y: 38, // vertical center
  gap: 16, // distance between the two dot centers
  dot: 5, // radius of each logo dot
} as const;

/** Section ids used for anchored scrolling and the active-nav indicator. */
export const SECTIONS = ["myself", "work", "projects", "map", "info"] as const;
export type SectionId = (typeof SECTIONS)[number];
