# CHOCHE — Portfolio

Personal portfolio of **José Manuel Sánchez Pérez — CHOCHE**. A maximally minimal,
editorial, black-and-white site in Times New Roman. It opens on one screen: hundreds
of black dots, always alive, assembled into the **CHOCHE logo** — two circles you can
push with your cursor or drag with your finger. The big footer nav navigates by
**slowly dissolving** the logo away and fading a panel in — no reloads, no scrolling.

The site is the proof of work.

---

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS 3** — theme locked to pure black & white
- **HTML5 Canvas** for the hero (`DotFace.tsx`) — no animation libraries
- **react-simple-maps** + **world-atlas** topojson for the world map
- **next/font** (Tinos) as the self-hosted serif fallback for Times New Roman
- English only — no i18n. Deploys on **Vercel**, 100% static / front-end.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Node 18+ recommended.

---

## How it works

One non-scrolling viewport (`App.tsx`) with a single `mode` state: `"home"` or one
of the three sections.

- **Home** — `DotFace` assembles ~880 dots into the two circles of the logo,
  **horizontal at every size** (smaller on mobile, never stacked). They're never
  static: perpetual micro-drift + collision jitter keep them breathing, the cursor
  repels them, and a finger drags them on touch.
- **Footer nav** — big, uppercase `ABOUT · TIMELINE · MAP`. Selecting one **slowly**
  disperses the dots and fades them out (~2s) while the panel **dissolves in** (~1.5s).
  No routing — it's all one page, all state.
- **Home button** — a small two-dot logo (top-left) appears only inside a section;
  on home the big dots already are the logo. It, and the `CHOCHE` wordmark (top-right),
  return home and slowly reassemble the dots.

All transitions are deliberately slow and eased — nothing abrupt.

**Sections**
- **About** — first-person bio, philosophy, what I do, quick facts, and contact.
- **Timeline** — image-led, newest (2026) at the top → oldest (2003) at the bottom.
  Each row is a big year + one big uppercase word + an image (placeholder for now).
- **Map** — the interactive world map: 14 visited countries filled black, cities on
  hover/tap.

**Accessibility.** With `prefers-reduced-motion: reduce`, the logo is drawn once,
static; panels still fade gently. All content and contact stay reachable, focus is
visible, palette is pure black & white.

**Performance.** `devicePixelRatio` capped at 2, fewer dots on mobile, and `rAF`
naturally pauses on hidden tabs.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, base B/W
│   ├── page.tsx              # renders <App />
│   └── globals.css           # single-viewport, no page scroll
├── components/
│   ├── App.tsx               # mode state + orchestration
│   ├── hero/DotFace.tsx      # canvas: dense dots → CHOCHE logo, alive + interactive
│   ├── nav/
│   │   ├── FooterNav.tsx      # big uppercase ABOUT · TIMELINE · MAP
│   │   └── CornerBrand.tsx    # CHOCHE wordmark + section home-button logo
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Timeline.tsx       # year + big word + image
│   │   └── WorldMap.tsx       # react-simple-maps world map
│   └── ui/
│       ├── Panel.tsx          # slow dissolve-in panel chrome
│       └── ImageFrame.tsx     # next/image grayscale → color on hover
├── data/                      # about · timeline · places · contact   ← edit here
└── lib/                       # hooks (reduced motion) + brand constants
```

---

## Editing content

All copy and data live in **`src/data/`** — plain English, no components to touch.

- **`about.ts`** — bio (first person), philosophy, interests, facts
- **`timeline.ts`** — timeline rows (`year`, `word`, `image`, `caption`)
- **`places.ts`** — visited countries & cities for the map
- **`contact.ts`** — email + social links (shown at the bottom of About)

### Still to fill in (see `// TODO(choche)`)

- **Contact email** — `EMAIL` in `src/data/contact.ts`; set `EMAIL_IS_PLACEHOLDER`
  to `false` to light up the mailto CTA + copy button in About.
- **Timeline images** — one per row; drop real files in `/public` and point each
  entry's `image` at it. You can also change any `word` or add entries (e.g. KafeCam)
  with their real year.
- **Portrait / project images** — the About and Timeline frames use `ImageFrame`
  (grayscale → color on hover); just swap the `src`.

---

## Deploy (Vercel)

The repo (`chochesanchez/CHOCHE`) is connected to Vercel — every push to `main`
triggers a production deploy (Next.js auto-detected). Manual: `npx vercel --prod`.

---

*created by CHOCHE — ●●*
