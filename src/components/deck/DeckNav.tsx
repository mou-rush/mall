"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [uiVisible, setUiVisible] = useState(true);
  const hideTimer = useRef<number | null>(null);

  const progress = ((current + 1) / total) * 100;
  const activeLabel = SLIDE_LABELS[current] ?? "";

  const showUI = useMemo(
    () => () => {
      setUiVisible(true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setUiVisible(false), 1800);
    },
    [],
  );

  useEffect(() => {
    hideTimer.current = window.setTimeout(() => setUiVisible(false), 2200);
    return () => {
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const onMove = () => showUI();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("keydown", onMove);
    window.addEventListener("wheel", onMove, { passive: true });
    window.addEventListener("touchstart", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("keydown", onMove);
      window.removeEventListener("wheel", onMove);
      window.removeEventListener("touchstart", onMove);
    };
  }, [showUI]);

  return (
    <>
      <AnimatePresence>
        {uiVisible && (
          <motion.div
            className="fixed top-6 left-8 right-8 z-[70] flex items-start justify-between pointer-events-none"
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/10 bg-[rgba(var(--moa-blue-rgb),0.30)] backdrop-blur-xl px-4 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <span className="font-black text-[0.7rem] tracking-[0.18em] bg-gradient-to-r from-[var(--moa-yellow)] to-yellow-300 text-transparent bg-clip-text">
                MOA
              </span>
              <span className="h-4 w-px bg-white/10" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeLabel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/80 text-[0.62rem] uppercase tracking-[0.32em]"
                >
                  {activeLabel}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(var(--moa-blue-rgb),0.30)] backdrop-blur-xl px-4 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <span className="text-white/55 text-[0.6rem] tabular-nums tracking-[0.25em]">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <span className="h-4 w-px bg-white/10" />
              <div className="h-[2px] w-28 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--moa-yellow)] via-yellow-300 to-[var(--moa-yellow)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uiVisible && (
          <motion.nav
            className="fixed right-8 top-1/2 -translate-y-1/2 z-[70] hidden md:flex flex-col items-end gap-3 pointer-events-auto"
            aria-label="Slide navigation"
            initial={{ opacity: 0, x: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="rounded-[24px] border border-white/10 bg-[rgba(var(--moa-blue-rgb),0.25)] backdrop-blur-xl px-3 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-3 items-end">
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
                          transition={{ duration: 0.18 }}
                          className="text-[0.55rem] font-semibold tracking-[0.22em] uppercase text-white/55"
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        current === i
                          ? "w-2.5 h-2.5 bg-[var(--moa-yellow)] shadow-[0_0_20px_rgba(var(--moa-yellow-rgb),0.65)]"
                          : "w-1.5 h-1.5 bg-white/35 group-hover:bg-white/75"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uiVisible && (
          <motion.div
            className="fixed bottom-10 inset-x-0 z-[70] flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="rounded-full border border-white/10 bg-[rgba(var(--moa-blue-rgb),0.30)] backdrop-blur-xl px-5 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <span className="text-white/55 text-[0.55rem] uppercase tracking-[0.42em]">
                Scroll / Arrow Keys / Swipe
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="fixed left-0 top-0 bottom-0 w-[18vw] z-[65] cursor-w-resize
                   opacity-0 hover:opacity-100 transition-opacity duration-300
                   hidden lg:flex items-center bg-transparent border-none"
        onClick={prev}
        aria-label="Previous slide"
      >
        <div className="ml-8 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center bg-[rgba(var(--moa-blue-rgb),0.30)] backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.35)] hover:border-[var(--moa-yellow)] transition-all duration-300">
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
        className="fixed right-0 top-0 bottom-0 w-[18vw] z-[65] cursor-e-resize
                   opacity-0 hover:opacity-100 transition-opacity duration-300
                   hidden lg:flex items-center justify-end bg-transparent border-none"
        onClick={next}
        aria-label="Next slide"
      >
        <div className="mr-8 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center bg-[rgba(var(--moa-blue-rgb),0.30)] backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.35)] hover:border-[var(--moa-yellow)] transition-all duration-300">
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
