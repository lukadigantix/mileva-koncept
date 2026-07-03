# Akaneya Japan — Technical Analysis

**URL analyzed:** https://akaneyajapan.com/en/
**Date:** 2026-07-01
**Method:** Live inspection in Chrome (DOM, computed styles, bundled JS source, visual scroll-through)

---

## 0. Stack overview (TL;DR)

| Concern | Technology |
|---|---|
| CMS / platform | **WordPress** (custom theme `akaneya`, page template `template-flexible`) |
| i18n | WPML (`sitepress-multilingual-cms`) — ES / JP / EN / FR / CAT |
| Performance | WP Rocket (minify + beacon), asset bundling |
| Page transitions | **Taxi.js** (`@unseenco/taxi` — `data-taxi` / `data-taxi-view` / `data-taxi-slug`) |
| Animation engine | **GSAP 3.15.0** + **ScrollTrigger** |
| Smooth scroll | **Lenis** (active — `<html class="lenis">`) |
| Text splitting | Word/line splitting (`.word` elements + `clip-path` line masks) |
| Font loading | **Web Font Loader** (`wf-active`, `wf-notoserifjp-n4-active` classes) |
| Analytics | Google Tag Manager / gtag (`G-GXKREP382C`) |

> **Note on bundles:** all animation code is compiled into two theme bundles — `vendor.min.js` (~204 KB, the libraries) and `app.min.js` (~68 KB, the site logic). None of the libraries are exposed on `window`; they are ES-module-scoped. Detection was done by signature-scanning the bundle source and reading DOM/CSS side-effects.

> **ScrollSmoother is bundled but NOT used** — `ScrollSmoother.create(...)` never appears in the code and there are zero `[data-speed]`/`[data-lag]` elements. Smooth scrolling is driven by **Lenis**; GSAP ScrollTrigger is synced to it for scroll-triggered animation and parallax.

---

## 1. Fonts

A single custom web font is used across the entire site.

### `@font-face`
```css
@font-face {
  font-family: "Noto Serif JP";
  font-weight: 400;
  font-style: normal;
  src: url(".../fonts/NotoSerifJP-Regular.woff2") format("woff2"),
       url(".../fonts/NotoSerifJP-Regular.woff")  format("woff"),
       url(".../fonts/NotoSerifJP-Regular.ttf")   format("truetype");
}
```
- **Family:** Noto Serif JP (self-hosted under `wp-content/themes/akaneya/fonts/`)
- **Weights loaded:** 400 (Regular) only — status `loaded`
- **Loader:** Web Font Loader adds `wf-notoserifjp-n4-active` + `wf-active` to `<html>` once ready (FOUT-controlled)

### Applied font stack (from `--font-primary`)
```
"Noto Serif JP", "Helvetica", "Arial", sans-serif
```
Every text element (body, headings, nav, paragraphs) computes to this single stack — the design relies entirely on Noto Serif JP with Helvetica/Arial as fallbacks. The decorative kanji marks (炭火燒 "sumibiyaki", 歴史 "history") also render in Noto Serif JP.

### Type scale (fluid, viewport-based — values measured at ~1568px viewport)
| Role | font-size | line-height | letter-spacing | weight |
|---|---|---|---|---|
| Brand / logo | 17.78px | 17.78px | -0.18px | 400 |
| Body paragraph | 17.78px | 30.22px (~1.7) | -0.18px | 400 |
| Nav link | 15.56px | 15.56px | -0.18px | 400 |

Sizes are fluid (computed values are non-integer, driven by `vw`/`clamp`-style math). All text uses a slight negative tracking (`-0.01em`).

---

## 2. CSS variables

82 custom properties on `:root`. The meaningful theme tokens:

### Colors
```css
--bg:              #fffcf9;   /* page background (warm off-white)      */
--white:           #fff;
--light:           #f8f5ef;
--sand:            #ded9d1;
--alternative:     #5e6985;   /* muted slate-blue accent               */
--dark:            #2c2a2b;   /* primary dark text / warm near-black    */
--black:           #000;
--main:            #ba693d;   /* brand terracotta / ember orange       */
--main-alpha:      rgba(117, 64, 2, .051);
--secondary:       #332d29;
--secondary-dark:  #121111;
--line:            #27292a;
--overlay:         #18181a;   /* dark section / image overlay          */
--hint:            rgba(44, 42, 43, .5);
--border:          rgba(44, 42, 43, .4);
--border2:         hsla(40, 39%, 95%, .4);
/* status */
--error:   #d30000;
--success: #10bb52;
--alert:   #ffd702;
```
The palette is a warm, restrained "sumibiyaki / charcoal fire" scheme: off-white paper background, warm near-black text, and a single **terracotta ember accent** (`--main #ba693d`, seen in the 歴史 label).

### Spacing & layout
```css
--space:      max(20px, min(1.323vw, 22.222px));   /* fluid base unit  */
--space-half: max(10px, min(0.661vw, 11.111px));
--radius:  10px;
--radius2: 15px;
--shadow:  0px 10px 10px 0px rgba(0,0,0,.2);
```
Spacing is fluid via `max(min())` clamping — floors on small screens, caps on large screens.

### Easing curves (the animation "vocabulary")
```css
--ease-out:  cubic-bezier(0.050, 0.760, 0.380, 1.015);  /* soft overshoot */
--p2In:      cubic-bezier(0.11, 0, 0.5, 0);      /* power2.in            */
--p2Out:     cubic-bezier(0.5, 1, 0.89, 1);      /* power2.out           */
--p2InOut:   cubic-bezier(0.45, 0, 0.55, 1);     /* power2.inOut         */
--expoIn:    cubic-bezier(0.7, 0, 0.84, 0);      /* expo.in              */
--expoOut:   cubic-bezier(0.16, 1, 0.3, 1);      /* expo.out ← signature */
--expoInOut: cubic-bezier(0.87, 0, 0.13, 1);     /* expo.inOut           */
```
These mirror GSAP's `power2`/`expo` eases exactly, so CSS transitions and GSAP tweens share one motion language. **`expo.out` is the site's signature ease.**

### Swiper tokens (present but unused on the home page)
```css
--swiper-navigation-size:  max(22px, min(1.455vw, 24.4442px));
--swiper-navigation-color: #2c2a2b;
--swiper-theme-color:      #2c2a2b;
```
> Swiper CSS variables exist in the stylesheet but **no `.swiper` instance renders on the home page** and no Swiper signature is present in the bundles. Likely used on other templates (menus/restaurant pages).

### Other
WordPress core preset variables (`--wp--preset--color--*`, `--wp--preset--aspect-ratio--*`) are also emitted by the block editor but are not part of the custom design system.

---

## 3. Animation libraries loaded

| Library | Version | Evidence | Role |
|---|---|---|---|
| **GSAP** | **3.15.0** | `version:"3.15.0"` ×5 in `vendor.min.js` | Core tween engine |
| **ScrollTrigger** | (GSAP 3.15.0) | signature in bundle | Scroll-driven reveals & parallax |
| **ScrollSmoother** | bundled | signature present | **Bundled but NOT initialized** (`.create` never called) |
| **Lenis** | active | `<html class="lenis">`, `wheelMultiplier:1`, `touchMultiplier:1` | Smooth scroll (drives ScrollTrigger) |
| **Taxi.js** | active | `data-taxi`, `data-taxi-view`, `data-taxi-slug`; `Renderer`/`Transition` in `app.min.js` | SPA-style page transitions |
| **Web Font Loader** | active | `wf-active` / `wf-notoserifjp-n4-active` on `<html>` | Async font load w/ FOUT control |

**Not present:** Framer Motion, Three.js, Barba, Locomotive Scroll, jQuery, AOS, imagesLoaded, Lottie, React/Next, Vue.

### GSAP usage profile (counted in `app.min.js`)
- `.to()` — 51 · `.set()` — 35 · `.timeline()` — 5 · `.fromTo()` — 5 · `.from()` — 2
- `gsap.matchMedia()` — 1 (responsive/breakpoint-aware animation)
- `ScrollTrigger` with `scrub: true` — 7 instances (parallax / scroll-linked)
- `clip-path` / `inset()` — 12 (line & image mask reveals)
- Word/char/line splitting present (`.word` × 243 elements in DOM)

---

## 4. Page structure (section-by-section)

The document is a single Taxi view: `body > #app[data-taxi] > div[data-taxi-view]`. Inside are **8 top-level components**, each marked `data-component="…"`.

| # | `data-component` | Height* | Description |
|---|---|---|---|
| 0 | `header` | 98px | Fixed top nav |
| 1 | `sidebar` | full | Off-canvas menu (hamburger) |
| 2 | `hero` | 100vh | Full-screen video hero |
| 3 | `dynamic` | ~1471px | "HISTORY" — two-image + text block |
| 4 | `dynamic` | ~1378px | Full-width video/media block |
| 5 | `restaurants` | 100vh | Three-location grid |
| 6 | `featured` | ~1100px | Split CTA (media + links) |
| 7 | `footer` | 139px | Legal links |

*Heights measured at ~1568×759 viewport.

### 0 — Header (`#header.header`)
Fixed bar. Left: hamburger toggle (opens sidebar). Center: `AKANEYA` wordmark (`a.brand`, text split into `.word` spans). Right: `Reservations`, `Gift`, `Menus` (each expands to Madrid / Barcelona / Paris sub-items). Far left: language switcher `ES | JP | EN | FR | CAT`. **The header text color inverts** (light → dark) as the page scrolls from the dark hero onto light sections — a scroll-triggered theme toggle applied via JS class switching.

### 1 — Sidebar (`#sidebar.sidebar[data-component=sidebar]`)
Off-canvas navigation panel. Content:
- Brand `AKANEYA`
- Label `RESTAURANTES — Sumibiyaki` → **PILAR AKANEYA** (Madrid), **CARLOTA AKANEYA** (Barcelona), **MARIE AKANEYA** (Paris)
- Label `JAPAN'S FINEST` → Ito Ranch, Matsusaka Beef, Kobe Beef, Crown Melon…

### 2 — Hero (`section.component--hero`)
Full-viewport background **`<video>`** (charcoal/binchōtan close-up). Overlaid: large kanji **炭火燒** (sumibiyaki), then the tagline *"Fire, tradition, and the most exclusive wagyū transport us to a small sumibiyaki in Kyoto."* plus Reservations links. Two media elements.

### 3 — Dynamic #1 — "HISTORY" (`section.component--dynamic`)
Centered eyebrow label 歴史 (terracotta `--main`) + heading **HISTORY**. Below: a **two-column image pair** (Matsusaka beef signboard 松阪牛 / a Kyoto street lantern), then a centered body paragraph (*"In 2009, Ignasi Elías discovers the tavern Akaneya Junshinken in Kyoto…"*). Images sit dark then lighten/reveal on scroll.

### 4 — Dynamic #2 — Media block (`section.component--dynamic`)
Full-width, centered dark **video/media** panel (16:9-ish, gutters left/right) on the `--bg` background. Scroll-scrubbed reveal (mask / scale).

### 5 — Restaurants (`section.component--restaurants`)
Dark (`--overlay`) full-viewport section. **Three-column grid**, each column a location card with kanji 炭火燒, name and city:
- **MARIE AKANEYA** — Paris
- **CARLOTA AKANEYA** — Barcelona
- **PILAR AKANEYA** — Madrid

Each card sits over a dark background image that brightens/reveals on hover & scroll.

### 6 — Featured (`section.component--featured`)
**Split layout.** Left: large media (ceramic bowl on wood, warm-lit) with a line-masked paragraph overlaid (*"A sensory journey where time dissolves between flavors and omotenashi. Experience the purest Japan without leaving Barcelona, Madrid, or Paris."*). Right: dark CTA panel with three stacked links, each with an animated underline: **Reservations · Gift · Menus**.

### 7 — Footer (`footer.component--footer`)
Minimal legal bar on `--bg`: `Cookies policy` · `Privacy policy` · `Legal notice` · `© 2026`.

---

## 5. Scroll-triggered animations — exact values

All values extracted from `app.min.js` (GSAP configs) and confirmed visually during scroll-through. GSAP named eases map to the CSS `cubic-bezier` tokens in §2.

### Timing values in use (frequency = how many tweens use each)
| Parameter | Values (× count) |
|---|---|
| **duration** | `0.8s` ×15 (primary), `0.6s` ×7, `1s` ×6, `0.4s` ×5, `1.4s` ×4, `2s` ×4, `0.9s` ×2, `0.2s` ×2, `0.1s` ×2, `4s` ×1 |
| **stagger** | `0.005s` ×2, `0.01s` ×1 (per-word/line offset) |
| **delay** | `0` (mostly); one grouped value of `25` (frame/index-scaled) |
| **ease** | `expo.out` ×20 (signature), `power2.out` ×14, `power2.inOut` ×6, `none` ×8 (scrubbed), `expo.inOut` ×5 |

### Easing → cubic-bezier reference
| GSAP ease | Equivalent cubic-bezier |
|---|---|
| `expo.out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `expo.inOut` | `cubic-bezier(0.87, 0, 0.13, 1)` |
| `power2.out` | `cubic-bezier(0.5, 1, 0.89, 1)` |
| `power2.inOut` | `cubic-bezier(0.45, 0, 0.55, 1)` |
| `none` (linear) | scrub-linked, follows scroll position |

### ScrollTrigger boundaries in use
| `start` | count | `end` | count |
|---|---|---|---|
| `top bottom` | 5 | `bottom top` | 8 |
| `top-=40px bottom` | 2 | | |
| `top 90%` | 1 | | |
| `top top` | 2 (pinned/parallax) | | |

`scrub: true` on **7** triggers → those tweens are linked directly to scroll position (parallax & mask fills), which is why they use `ease: none`.

### Animated properties observed
- **y (translate):** from `"100%"`/`"20%"`/`"10%"` (and negatives `-10%`/`-20%`) → `"0%"` — text and blocks rise into place; negatives create counter-parallax.
- **opacity:** `0 → 1` (41 settle-to-`1` calls); a muted `0.4` state for de-emphasized items.
- **scale:** image reveals from `1.3` / `1.1` → `1`; hover pop `1.05`; `0.96` press; `0.3` for small marks.
- **clip-path `inset()`:** 12 uses — the core reveal primitive.

### The signature text reveal (verified live)
Each heading/paragraph is split into `.word` spans (`word word--1`, `word--2`, …). Each word is a masked box:
```css
.word { display: inline-block; }         /* + clip-path mask + Y offset */
```
Measured mid-animation state of an incoming word:
```
clip-path: inset(0% 0% 21.82%)   →   inset(0% 0% ~0%)
transform: matrix(1,0,0,1, 0, 8) →   matrix(1,0,0,1, 0, 0)   (translateY 8px → 0)
```
So each word/line starts **clipped from the bottom and pushed down**, then wipes upward into view.
- **Per-word/line stagger:** `0.005–0.01s`
- **Duration:** `~0.8s`
- **Ease:** `expo.out`
- **Trigger:** `start: "top bottom"` (or `top-=40px bottom`) — fires as the block's top crosses the viewport bottom.

### Image / media reveals
- Media enters dark and **scales `1.3 → 1`** with a `clip-path: inset()` wipe.
- Duration `1–1.4s`, ease `expo.out` (or `expo.inOut` for symmetric wipes).
- Larger hero/media blocks additionally use **`scrub: true`** parallax (`start: top bottom`, `end: bottom top`, `ease: none`) so they drift/scale continuously with scroll rather than firing once.

### Header theme switch
As the viewport leaves the dark hero and enters light sections, the fixed header's link/logo color animates from light to dark (and back over the dark `restaurants` section). Driven by ScrollTrigger toggling a state class — a short `power2.out`/`~0.4s` color transition rather than a scrubbed one.

### Responsive behavior
A single `gsap.matchMedia()` guard means some animations are conditionally registered per breakpoint (desktop vs. touch), so mobile likely receives simplified/omitted parallax.

---

## Summary

Akaneya's site is a **WordPress theme wrapped in a Taxi.js SPA shell**, animated with a tightly-scoped **GSAP 3.15.0 + ScrollTrigger** stack and **Lenis** smooth scrolling. The design language is deliberately minimal: one serif typeface (**Noto Serif JP**), a warm charcoal-and-ember palette built on ~20 CSS custom properties, and a consistent motion vocabulary where **`expo.out` over ~0.8s** drives clip-path line-mask text reveals and image scale-ins, with a handful of scroll-scrubbed parallax blocks for depth.
