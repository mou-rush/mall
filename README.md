# Mall of America — Premium Sales Experience

A high-end, single-page marketing experience for Mall of America, designed to pitch leasing, sponsorship, and event partnerships to prospective brands. Built as a performant, animated web application with a cinematic dark aesthetic and gold accent palette.

---

## Tech Stack

| Layer     | Technology                                                         |
| --------- | ------------------------------------------------------------------ |
| Framework | [Next.js 16](https://nextjs.org/) (App Router)                     |
| Language  | [TypeScript](https://www.typescriptlang.org/)                      |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/)                        |
| Animation | [Framer Motion](https://www.framer.com/motion/)                    |
| Icons     | [React Icons (Lucide)](https://react-icons.github.io/react-icons/) |
| Runtime   | [React 19](https://react.dev/)                                     |
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
│   ├── navigation/             # Floating nav with scroll progress
│   ├── sections/               # Page sections (modular folder-per-section)
│   │   ├── Hero/
│   │   ├── WhyThisProperty/
│   │   ├── Retail/
│   │   ├── Entertainment/
│   │   ├── DiningLifestyle/
│   │   ├── Events/
│   │   ├── Luxury/
│   │   └── FinalCTA/
│   └── ui/                     # Shared UI primitives (StatCard, AnimatedText, etc.)
├── hooks/                      # Custom React hooks (useScrollTo, etc.)
├── lib/                        # Constants, types, motion utilities, lazy loaders
└── modules/                    # Domain modules (events, leasing, sponsorship)
```

Each section follows a **folder-per-component** pattern: a main section file, its subcomponents in sibling files, and a barrel `index.ts` for clean imports.

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

- **Framer Motion throughout** — Scroll-triggered entrance animations (`useInView`), parallax effects (`useScroll` / `useTransform`), infinite marquees, and layout transitions are all handled by Framer Motion for consistency.
- **Shared easing constants** — A custom exponential ease-out curve (`EASE_OUT_EXPO`) is defined in `lib/motion.ts` and reused across all animated components for a cohesive motion language.
- **`AnimatePresence` for mount/unmount** — Components that conditionally render (modals, info panels) use `AnimatePresence` for smooth enter/exit transitions without layout shift.

### TypeScript

- **Strict typing** — All component props use named interfaces with `Readonly<>` wrappers. Shared types (`IconComponent`, `NavId`, `FloorId`) live in dedicated type files.
- **No `any` types** — The codebase enforces explicit typing throughout.

### Interactive Floor Plan

- **SVG-based map** — The mall floor plan is rendered as an inline SVG with dynamic polygon data per floor, enabling hover highlights and click-to-select interactions without external mapping libraries.
- **Floor-scoped keys** — Each store polygon uses a `floor-storeName` composite key to prevent React reconciliation bugs across level switches.

---

## AI Tools Used

| Tool               | Purpose                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **GitHub Copilot** | Code generation, component scaffolding, refactoring, debugging, and architectural decisions throughout the entire development process |
| **Google Gemini**  | Image generation (hero backgrounds, section imagery) and logo generation for luxury brand assets used in the marquee                  |

---

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new):

```bash
npm run build
```

Or connect the repository directly to Vercel for automatic deployments on push.
