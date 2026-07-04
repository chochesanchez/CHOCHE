# CHOCHE — Portfolio

Personal portfolio of **José Manuel Sánchez Pérez — CHOCHE**. A minimal, editorial,
black-and-white site in Times New Roman, with one unforgettable signature: a face
made of dots that assembles, watches your cursor, and — on scroll — collapses so its
two eyes become the two dots of the CHOCHE logo.

The site is the proof of work.

---

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS 3** — theme locked to pure black & white
- **HTML5 Canvas** for the hero (`DotFace.tsx`) — no animation libraries
- **react-simple-maps** + **world-atlas** topojson for the world map
- **next/font** (Tinos) as the self-hosted serif fallback for Times New Roman
- Deploys on **Vercel**, 100% static / front-end only

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Node 18+ recommended.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, LanguageProvider, base B/W
│   ├── page.tsx          # single page: NavBar + Hero + sections
│   └── globals.css       # Tailwind + base styles, custom cursor, focus rings
├── components/
│   ├── hero/
│   │   ├── DotFace.tsx    # canvas physics + the scroll→logo brand reveal
│   │   ├── HeroLabels.tsx # corner labels + scroll hint
│   │   └── Hero.tsx       # wires the canvas + the 100vh scroll spacer
│   ├── nav/
│   │   ├── NavBar.tsx     # sticky nav; logo = the collapsed face
│   │   └── LanguageSwitcher.tsx
│   ├── sections/         # Myself · Work · Projects · WorldMap · Info
│   └── ui/               # ImageFrame (grayscale→color), Reveal, SectionHeading
├── data/                # projects · work · places · contact · myself  ← edit here
├── i18n/                # LanguageProvider + EN/ES/FR dictionaries
└── lib/                 # useScrollProgress, brand geometry constants
```

---

## Editing content

All copy and data live in **`src/data/`** — no need to touch components.

- **`projects.ts`** — projects + the "coming soon" slots (CASHINO, apparel)
- **`work.ts`** — work history
- **`places.ts`** — visited countries & cities for the map
- **`contact.ts`** — email + social links
- **`myself.ts`** — bio, philosophy, quick facts

Translatable prose is stored as `{ en, es, fr }` objects. Add or change a language
string in all three (English is the fallback). UI chrome strings (nav, buttons,
section titles) live in **`src/i18n/dictionaries.ts`**.

### Languages

The site is **English-first** with a global **EN / ES / FR** switcher (top-right of
the nav). The choice persists in `localStorage` and, on a first visit, is inferred
from the browser language.

### Replacing the placeholder images

Every image currently points at a placeholder SVG in `/public`:

- `public/portrait-placeholder.svg` — used in **Myself** and **Info**
- `public/projects/placeholder.svg` — used by every project card

Drop the real photos into `/public` (JPG/PNG is fine) and update the `src` /
`image` fields in `Myself.tsx`, `Info.tsx`, and `projects.ts`. Images render through
`ImageFrame`, which applies the grayscale → color-on-hover treatment and a fixed
aspect ratio to avoid layout shift.

### Still to fill in (see `// TODO(choche)`)

- **Contact email** — `EMAIL` in `src/data/contact.ts`. Set `EMAIL_IS_PLACEHOLDER`
  to `false` once real, and the mailto CTA + copy-email button light up.
- **Project links** for BALANCE, FARO, KafeCam (App Store / demo / GitHub).
- **Real images** as above.

---

## How the dot face works

`DotFace.tsx` is a client component driving an HTML5 canvas in three phases:

1. **Assembly** — ~900 dots (fewer on mobile) fly in from random positions and
   spring into face regions (eyes, nose, mouth, jaw, hair…) over ~2.2s.
2. **Idle** — the face holds still and breathes (micro-drift); only the **pupils**
   track the cursor; dots collide without overlapping (spatial-grid collisions) and
   repel away from the pointer like a force field.
3. **Scroll → logo (brand reveal)** — as you scroll the first viewport, the whole
   face scales down and travels to the top-left nav slot; non-eye dots migrate into
   the two eyes and fade, and the eyes tighten into **two solid dots — the logo.**
   The canvas dots fade out right as the crisp DOM logo in the nav takes over, so
   the handoff is seamless. Clicking the logo returns to the top and re-expands the
   face.

Geometry shared between the canvas and the DOM logo lives in `src/lib/brand.ts`, so
the eyes always land exactly on the nav logo.

**Accessibility.** With `prefers-reduced-motion: reduce`, the face is drawn once,
already assembled and static — no physics, no hidden cursor, no scroll transition —
and the nav is shown immediately. All content and contact remain reachable, every
image has `alt` text, focus is visible, and the palette is pure black & white.

**Performance.** `devicePixelRatio` is capped at 2, mobile renders ~half the dots,
and the animation loop skips work once the hero is scrolled out of view.

---

## Deploy (Vercel)

The repo (`chochesanchez/CHOCHE`) is connected to Vercel. Every push to `main`
triggers a production deploy — no configuration needed (Next.js is auto-detected).
For manual deploys: `npx vercel` / `npx vercel --prod`.

---

*created by CHOCHE — ●●*
