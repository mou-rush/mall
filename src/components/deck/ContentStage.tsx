"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { type SlideId } from "@/lib/slide-registry";
import { ScrollProgressBar } from "@/components/ui/ScrollAnimations";
import type { SlideComponent } from "@/types";

interface ContentStageProps {
  readonly currentSlideId: SlideId;
  readonly explorationPath: ReadonlyArray<{
    readonly slideId: SlideId;
    readonly timestamp: number;
    readonly section: string;
  }>;
  readonly onNavigateToSlide: (id: SlideId, section: string) => void;
  readonly onGoToHub: () => void;
  readonly progress: { readonly visited: number; readonly total: number };
  readonly Component: SlideComponent | null;
}

function ContentStage({
  currentSlideId,
  explorationPath,
  onNavigateToSlide,
  onGoToHub,
  progress,
  Component,
}: ContentStageProps) {
  if (!Component) return null;

  const progressPercent = Math.round((progress.visited / progress.total) * 100);
  const currentSection =
    explorationPath.length > 0
      ? explorationPath[explorationPath.length - 1].section
      : "";

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <ScrollProgressBar />

      <div className="fixed top-0 left-0 right-0 z-[80] pointer-events-none">
        <div className="max-w-screen-2xl mx-auto px-6 py-6 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center  group" />

          <motion.button
            onClick={onGoToHub}
            className="flex  items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--gold)]/10 backdrop-blur-xl border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4 text-[var(--gold)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="text-[var(--gold)] text-sm font-medium">Hub</span>
          </motion.button>
        </div>
      </div>

      <div className="fixed top-6 left-6 z-[80] pointer-events-none">
        <div className="px-5 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-xs uppercase tracking-wider">
              Explored
            </span>
            <span className="text-[var(--gold)] text-lg font-bold tabular-nums">
              {progressPercent}%
            </span>
            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--gold)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full overflow-y-auto">
        <motion.div
          key={currentSlideId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Component
            isActive
            onNext={() => {}}
            goTo={() => {}}
            currentSlide={0}
            onGoToHub={onGoToHub}
            onNavigateToSlide={onNavigateToSlide}
            currentSection={currentSection}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default memo(ContentStage);
