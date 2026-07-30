# Kushal Chordia — Portfolio

A single-page, pixel-native portfolio. Dark, quiet, and generated rather than
illustrated: the night landscape behind the page is geometry, not an image.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind v4,
GSAP ScrollTrigger, Lenis and Framer Motion. No UI library.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint
```

Node 18.18+ required.

---

## Structure

```
src/
├─ app/            layout, page, globals.css, fonts, sitemap, robots
├─ sections/       Home · Experience · Competitions · Contact
├─ components/
│  ├─ layout/      Navbar, MobileMenu, SmoothScrollProvider
│  ├─ background/  PixelWorld, StarField, CloudBank, Ridge, TreeLine
│  ├─ character/   Character
│  └─ ui/          PixelCard, PixelButton, PixelBadge, PixelIcon,
│                  SectionHeading, TypeOnce, Reveal, CompetitionMark
├─ animations/     motion tokens, gsap setup, idle recipes, scroll choreography
├─ hooks/          useSmoothScroll, useActiveSection, usePrefersReducedMotion, …
├─ constants/      site.ts (nav, sprite registry) · content.ts (all copy)
├─ utils/          cn, accents, rng, pixelArt
└─ types/
```

Animation logic lives in `animations/`, never inside a component. Components
import timing tokens; they don't invent their own.

All page copy lives in `constants/content.ts`. Editing text never means
touching a component.

---

## Design system

Tokens are declared once, in the `@theme` block at the top of
`src/app/globals.css`. Nothing in the codebase hard-codes a hex value.

| Token             | Value     | Use                        |
| ----------------- | --------- | -------------------------- |
| `--color-void`    | `#070B1A` | page background            |
| `--color-surface` | `#0D1226` | cards                      |
| `--color-primary` | `#FFC72C` | primary accent             |
| `--color-secondary` | `#A970FF` | secondary accent         |
| `--color-accent`  | `#44D17A` | success / present          |
| `--color-azure`   | `#4FA9FF` | blue accent                |
| `--color-chalk`   | `#F4F4F4` | headings                   |
| `--color-muted`   | `#B8BDD0` | body copy                  |

Never pure black.

**Type.** Silkscreen (bitmap) for headings, navigation, badges and buttons
only. JetBrains Mono for all body copy. Both self-hosted and subset to the
characters this site uses — about 37 KB for all three files, and no
third-party request on the critical path. Licences are in `src/app/fonts/`.

**Accents** resolve through the lookup maps in `utils/accents.ts` rather than
string interpolation, because Tailwind needs literal class names at build
time. It also means no colour outside the palette can reach the page.

---

## Motion

One language, declared in `animations/motion.ts`:

| Gesture            | Duration | Easing       |
| ------------------ | -------- | ------------ |
| Entrance           | 600ms    | `power3.out` |
| Hover              | 250ms    | `power3.out` |
| Press              | 150ms    | `power3.out` |
| Section transition | 800ms    | `power3.out` |

Hover ceilings: scale 1.03, translate 8px, rotate 5°. No bounce, no elastic,
no overshoot, no glow.

**Lenis and GSAP share one ticker.** Lenis drives `gsap.ticker`, and
`lagSmoothing` is off. Two independent rAF loops would drift apart and make
the pinned Experience header judder.

**The Experience slide-behind is scrubbed, not played.** `position: sticky`
plus z-index does the occlusion — that part works with JavaScript disabled. A
scrubbed GSAP tween adds the depth cue on top. Because it's tied to scroll
position rather than played as a timeline, scrolling back up retraces the
identical frames in reverse.

---

## The background

`components/background/PixelWorld.tsx` composes a single fixed layer:

- **Stars** — 150, on one canvas. Whole-pixel squares, independent twinkle
  phase and speed, loop paused when the tab is hidden.
- **Clouds** — pure CSS drift, per-cloud duration and negative delay, so the
  sky is already in motion on first paint.
- **Ridges and treeline** — generated as staircase SVG paths from a fixed
  seed (`utils/pixelArt.ts`), so server and client agree exactly and there's
  no hydration mismatch. Three bands parallax at different rates.
- **Scrim** — a gradient above the art and below the content. Card contrast is
  guaranteed by the scrim, not by luck.

Two things worth knowing if you edit `globals.css`:

- `body` has **no** `background-color`. `html` carries it, and CSS propagates
  that to the canvas. If `body` painted a background too, it would sit above
  negative z-index children in paint order and hide the entire world layer.
- `body` uses `overflow-x: clip`, not `hidden`. `hidden` would turn the body
  into a scroll container and silently break the sticky Experience header.

---

## The character

The four sprites in `public/sprites/` are **final artwork**. Nothing in the
codebase redraws, recolours, resamples or smooths them. `image-rendering:
pixelated` keeps every source pixel square, aspect ratio is locked to the
sprite's own dimensions, and every movement is a CSS transform on the
untouched image.

Idle motion lives in `animations/idle.ts` — one recipe per pose (wave, typing,
writing, folded), all well under the brief's amplitude ceilings.

**A note on the blink.** The character wears glasses, so painting an eyelid
over the eyes would erase the frame and read as a glitch. Instead the strip of
pixels immediately above the eyes — brow and skin — is cloned from the sprite
itself and slid down over them for 110ms. The blink is made entirely of the
character's own pixels.

`eyeBandTop` and `eyeBandHeight` in `constants/site.ts` are the only two
numbers that describe where the eyes are. If you swap a sprite, adjust those
two and nothing else. Blinking can also be turned off per instance with
`<Character blink={false} />`.

### Replacing a sprite

The sprites currently in `public/sprites/` were cut out of the supplied
reference artwork. If you have cleaner originals, drop them in and update the
`width`/`height`/`eyeBand*` entries in `constants/site.ts` to match. Nothing
else needs to change.

---

## Responsive

Four breakpoints, each designed rather than scaled:

| Width  | Behaviour                                                        |
| ------ | ---------------------------------------------------------------- |
| 1440+  | Full two-column hero, four-across features                        |
| 1024+  | Same structure, tighter measure                                   |
| 768+   | Character rejoins the Experience and Competitions headers         |
| 360+   | Character takes the top ~34svh of the hero and the heading stacks below it; features become a snap carousel; timeline goes vertical; competition cards stack; contact becomes character-then-card |

---

## Accessibility

- Skip link to `#content` as the first tab stop.
- Semantic landmarks, one `h1`, ordered headings.
- The typed heading exposes its full text via `aria-label` from the first
  paint — a screen reader never hears partial words.
- Every interactive element is a real `button` or `a` with a visible focus
  ring. Escape closes the mobile menu.
- `prefers-reduced-motion` is honoured everywhere and tracked live: Lenis
  never starts, parallax and idle loops don't run, stars hold still, and the
  heading is simply present.
- All sprites carry descriptive alt text; decorative layers are `aria-hidden`.

---

## Performance notes

- Fully static — every route prerenders.
- Fonts self-hosted, subset, `display: swap`.
- Hero sprite is `priority`; every other sprite is lazy.
- Typed heading reserves its finished box with an invisible ghost, so
  cumulative layout shift stays at zero while it types.
- Icons are run-length encoded into horizontal spans — a handful of `<rect>`
  nodes each instead of 256.
- Star field is one canvas, not 150 DOM nodes, and stops when the tab is
  hidden.

Before going live, set `SITE.url` in `src/constants/site.ts` and add an
`opengraph-image` to `src/app/`.
