/** The three content panels reachable from the footer nav. */
export const SECTIONS = ["about", "timeline", "map"] as const;
export type SectionId = (typeof SECTIONS)[number];

/** App mode: the interactive logo home, or one dissolved-in panel. */
export type Mode = "home" | SectionId;

/** Uppercase footer-nav labels. */
export const NAV_LABEL: Record<SectionId, string> = {
  about: "About",
  timeline: "Timeline",
  map: "Map",
};
