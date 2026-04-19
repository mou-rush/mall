"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SLIDE_LABELS = [
  "Home",
  "Why MoA",
  "Retail",
  "Luxury",
  "Dining",
  "Entertainment",
  "Events",
  "Partner",
] as const;

interface DeckNavProps {
  readonly current: number;
  readonly total: number;
  readonly goTo: (idx: number) => void;
  readonly next: () => void;
  readonly prev: () => void;
}

export default function DeckNav({
  current,
  total,
  goTo,
  next,
  prev,
}: DeckNavProps) {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const progress = ((current + 1) / total) * 100;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>

      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-4 items-end"
        aria-label="Slide navigation"
      >
        {SLIDE_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => goTo(i)}
            onMouseEnter={() => setHoveredDot(i)}
            onMouseLeave={() => setHoveredDot(null)}
            className="group flex items-center gap-3 py-1"
            aria-label={`Go to ${label}`}
          >
            <AnimatePresence>
              {hoveredDot === i && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-[var(--moa-muted)]"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            <span
              className={`block rounded-full transition-all duration-300 ${
                current === i
                  ? "w-2.5 h-2.5 bg-[var(--gold)] shadow-[0_0_8px_rgba(201,168,76,0.6)]"
                  : "w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </nav>

      <div className="fixed bottom-0 inset-x-0 z-[60] h-12 flex items-center justify-between px-8 bg-[rgba(6,6,8,0.7)] backdrop-blur-md border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="text-gold-gradient font-black text-sm tracking-[0.12em]">
            MOA
          </span>
          <span className="text-white/20 text-xs">|</span>
          <span className="text-[var(--moa-muted)] text-xs tracking-wider uppercase hidden sm:inline">
            Enterprise Sales Deck
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--moa-white)] text-xs font-medium tracking-wider uppercase min-w-[100px] text-right hidden sm:inline-block"
            >
              {SLIDE_LABELS[current]}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/20 text-xs mx-2 hidden sm:inline">|</span>
          <span className="text-[var(--moa-muted)] text-xs tabular-nums">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <button
        className="fixed left-0 top-0 bottom-12 w-16 z-[55] cursor-w-resize
                   opacity-0 hover:opacity-100 transition-opacity duration-300
                   hidden lg:flex items-center bg-transparent border-none"
        onClick={prev}
        aria-label="Previous slide"
      >
        <div className="ml-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 4L6 8l4 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <button
        className="fixed right-20 top-0 bottom-12 w-16 z-[55] cursor-e-resize
                   opacity-0 hover:opacity-100 transition-opacity duration-300
                   hidden lg:flex items-center justify-end bg-transparent border-none"
        onClick={next}
        aria-label="Next slide"
      >
        <div className="mr-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4l4 4-4 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </>
  );
}
