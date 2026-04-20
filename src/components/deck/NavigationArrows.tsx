"use client";

import { motion } from "framer-motion";

interface NavigationArrowsProps {
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly canGoPrev: boolean;
  readonly canGoNext: boolean;
}

export default function NavigationArrows({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: NavigationArrowsProps) {
  return (
    <>
      {canGoPrev && (
        <motion.button
          onClick={onPrev}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-[70]
                     w-12 h-12 flex items-center justify-center
                     rounded-full border border-white/15 bg-black/25 backdrop-blur-xl
                     text-white/70 hover:text-white hover:border-white/30
                     transition-all duration-200
                     shadow-[0_20px_70px_rgba(0,0,0,0.35)]
                     hidden lg:flex"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 4L6 8l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}

      {canGoNext && (
        <motion.button
          onClick={onNext}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[70]
                     w-12 h-12 flex items-center justify-center
                     rounded-full border border-white/15 bg-black/25 backdrop-blur-xl
                     text-white/70 hover:text-white hover:border-white/30
                     transition-all duration-200
                     shadow-[0_20px_70px_rgba(0,0,0,0.35)]
                     hidden lg:flex"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}

      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] lg:hidden
                   flex items-center gap-4 px-5 py-3
                   rounded-full border border-white/10 bg-black/25 backdrop-blur-xl
                   shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {canGoPrev && (
          <button
            onClick={onPrev}
            className="w-8 h-8 flex items-center justify-center
                       text-white/60 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 4L6 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <span className="text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">
          Swipe / Arrows
        </span>

        {canGoNext && (
          <button
            onClick={onNext}
            className="w-8 h-8 flex items-center justify-center
                       text-white/60 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </motion.div>
    </>
  );
}
