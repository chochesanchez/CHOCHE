export interface TimelineItem {
  year: string;
  /** One big uppercase word — a verb/keyword. No descriptive sentences. */
  word: string;
  /** Placeholder image until Choche adds the real one. */
  image: string;
  /** Reference / alt text — not shown as body copy. */
  caption: string;
}

/**
 * Newest at the top (2026) → oldest at the bottom (2003).
 * Do not invent dates or events — only what Choche provided. Images are
 * placeholders; Choche swaps them in and may add entries (e.g. KafeCam).
 */
export const TIMELINE: TimelineItem[] = [
  {
    year: "2026",
    word: "WIN",
    image: "/timeline-placeholder.svg", // TODO(choche): FARO image
    caption: "FARO — 1st place, Swift Challenge Fest",
  },
  {
    year: "2026",
    word: "LAUNCH",
    image: "/timeline-placeholder.svg", // TODO(choche): AFI image
    caption: "AFI — Warriors fan platform (Lumina)",
  },
  {
    year: "2026",
    word: "SORT",
    image: "/timeline-placeholder.svg", // TODO(choche): NEXO image
    caption: "NEXO — 2nd place, Enactus",
  },
  {
    year: "2025",
    word: "SHIP",
    image: "/timeline-placeholder.svg", // TODO(choche): BALANCE image
    caption: "BALANCE — WWDC25 Swift Student Challenge Winner",
  },
  {
    year: "2025",
    word: "LEAD",
    image: "/timeline-placeholder.svg", // TODO(choche): TransformArte image
    caption: "TransformArte — Technology Lead (Rotary)",
  },
  {
    year: "2022",
    word: "BEGIN",
    image: "/timeline-placeholder.svg", // TODO(choche): Tec image
    caption: "Tec de Monterrey — ITC",
  },
  {
    year: "2003",
    word: "BORN",
    image: "/timeline-placeholder.svg", // TODO(choche): Monterrey image
    caption: "Monterrey, México",
  },
];
