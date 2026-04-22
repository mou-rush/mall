# Mall of America — Interactive Sales Deck

This is a cinematic, interactive presentation deck for Mall of America—designed to pitch leasing, sponsorship, and event partnerships to prospective brands. Built as a full-screen, slide-based experience inspired by premium presentation tools like Digideck, with video-rich storytelling, non-linear navigation, and luxury brand aesthetics.

---

## Tech Stack

| Layer     | Technology                                                         |
| --------- | ------------------------------------------------------------------ |
| Framework | [Next.js 15+](https://nextjs.org/) (App Router)                    |
| Language  | [TypeScript](https://www.typescriptlang.org/)                      |
| Styling   | [Tailwind CSS](https://tailwindcss.com/)                           |
| Animation | [Framer Motion](https://www.framer.com/motion/)                    |
| Icons     | [React Icons (Lucide)](https://react-icons.github.io/react-icons/) |
| Runtime   | [React 18+](https://react.dev/)                                    |
| Linting   | ESLint with `eslint-config-next`                                   |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd mall

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/                        # Next.js App Router (layout, page, globals)
├── components/
│   ├── deck/                   # Core presentation deck system
│   │   ├── DeckExperience.tsx  # Main deck orchestrator
│   │   ├── DeckNav.tsx         # Navigation state management
│   │   ├── EntryScreen.tsx     # Initial load screen
│   │   ├── IntroScreen.tsx     # Animated intro sequence
│   │   ├── SideMenu.tsx        # Collapsible slide navigation menu
│   │   ├── NavigationArrows.tsx # Left/right navigation controls
│   │   ├── SlideWrapper.tsx    # Individual slide container
│   │   └── slides/             # Individual slide components
│   │       ├── CoverSlide.tsx
│   │       ├── HeroSlide.tsx
│   │       ├── WhySlide.tsx
│   │       ├── RetailSlide.tsx
│   │       ├── EntertainmentSlide.tsx
│   │       ├── DiningSlide.tsx
│   │       ├── EventsSlide.tsx
│   │       ├── LuxurySlide.tsx
│   │       ├── CTASlide.tsx
│   │       └── [...20+ more slides]
│   ├── sections/               # Legacy section components (still used)
│   ├── navigation/             # Additional navigation utilities
│   └── ui/                     # Shared UI primitives
├── Core Philosophy
```
 Key principles:

- **One idea per slide** — Each screen communicates a single concept
- **Video-first storytelling** — Background video is primary, text is minimal
- **Cinematic transitions** — Film-style cuts between slides, not page scrolls
- **Non-linear navigation** — Jump to any slide via menu, keyboard, or arrows
- **Premium aesthetics** — Inspired by Apple, Tesla, Disney presentations

### Architecture

- **Slide-based deck system** — 20-40 individual slide components orchestrated by `DeckExperience.tsx`. Each slide occupies full viewport (100vh).
- **Centralized slide registry** — `slide-registry.ts` defines all slides, their metadata, parent/child relationships, and menu structure. Single source of truth for navigation.
- **Cinematic timing** — All animations are deliberately slowed (1.4x baseline) for premium feel. Slide transitions: 0.9-2.1s delays, 1.0-1.5s durations.
- **Framer Motion throughout** — Slide entrance animations, staggered text reveals, parallax effects, infinite marquees, and layout transitions.
- **Shared easing constants** — Custom exponential ease-out curve (`EASE_OUT_EXPO`) defined in `lib/motion.ts` and reused across all animated components.
- **`AnimatePresence` for slide transitions** — Smooth enter/exit animations between slides without layout shift. Side menu and overlays use exit animations.
- **Pause controls** — Complex animated slides (e.g., `LuxuryPropositionSlide`) include pause/resume UI for user control.

### TypeScript

- **Strict typing** — All component props use named interfaces with `Readonly<>` wrappers. No `any` types allowed.
- **Shared types** — `SlideId`, `SlideMetadata`, `MenuStructure` types in `lib/types.ts` ensure type-safe navigation and registration.

### Navigation Features

- **Multi-modal input** — Keyboard (Arrow keys, Space, Enter), mouse wheel, touch gestures all supported.
- **Debounced navigation lock** — 700ms cooldown prevents accidental double-navigation.
- **Scrollable content detection** — Navigation system checks `scrollHeight`, `scrollTop`, and DOM tree for scrollable ancestors before hijacking wheel events.
- **Entry/intro sequences** — `EntryScreen` (loading) → `IntroScreen` (animated reveal) → Deck navigation.
- **Menu with hierarchy** — `SideMenu` displays parent sections with expandable child slides for quick jump
---

## Design Decisions

### Architecture

- **Folder-per-section pattern** — Every section (Hero, Retail, Events, etc.) lives in its own folder with subcomponents split into individual files. Barrel exports keep consumer imports clean while maintaining a flat dependency graph.
- **Lazy loading via `next/dynamic`** — All sections below the fold are dynamically imported through a centralized `lazy-sections.ts` module, keeping the initial JS bundle small and the first paint fast.
- **Shared constants file** — All data arrays (stats, categories, timelines, brand logos) are defined once in `lib/constants.ts` and imported by the components that need them. No inline data duplication.

### Styling

- **CSS custom properties for theming** — Core palette (gold, surface, muted, border) is expressed as CSS variables, making global theme changes trivial.
- **Tailwind v4 utility-first approach** — All layout and visual styling uses Tailwind classes directly. No separate CSS modules or styled-components.
- **Dark cinematic aesthetic** — Near-black backgrounds with gold gradients and glass-morphism cards create a premium, editorial feel appropriate for a luxury retail pitch.

### Animation
Key Features

- **20-40 discrete slides** — Each communicates one idea with video/image backdrop and minimal text
- **Video-rich backgrounds** — Full-bleed video support via Next/Image or YouTube embeds
- **Non-linear navigation** — Jump to any slide via side menu, arrow navigation, or keyboard shortcuts
- **Scroll-safe wheel navigation** — Respects input fields, scrollable overlays, and menu interactions
- **Cinematic transitions** — Film-style cuts with staggered animations and motion blur
- **Responsive touch gestures** — Swipe navigation on mobile with 180ms accumulator reset
- **Entry/intro sequences** — Branded loading screen and animated reveal before deck access
- **Pause controls** — User can pause auto-rotating content (e.g., luxury proposition pillars)
- **Social media dock** — Floating Instagram/X/LinkedIn links with gold gradient styling
- **Premium brand aesthetics** — Dark backgrounds, gold accents, glass-morphism, backdrop blur


- **Strict typing** — All component props use named interfaces with `Readonly<>` wrappers. Shared types (`IconComponent`, `NavId`, `FloorId`) live in dedicated type files.
- **No `any` types** — The codebase enforces explicit typing throughout.


---

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new):

```bash
npm run build
```

Or connect the repository directly to Vercel for automatic deployments on push.
