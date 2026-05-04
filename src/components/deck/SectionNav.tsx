"use client";

import { motion } from "framer-motion";
import type { SlideId } from "@/lib/slide-registry";

interface SectionNavProps {
  readonly currentSlideId: SlideId;
  readonly slides: ReadonlyArray<{ id: SlideId; label: string }>;
  readonly onNavigate: (slideId: SlideId) => void;
  readonly accentColor: string;
}

export default function SectionNav({
  currentSlideId,
  slides,
  onNavigate,
  accentColor,
}: SectionNavProps) {
  const currentIndex = slides.findIndex((s) => s.id === currentSlideId);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
        {slides.map((slide, index) => {
          const isActive = slide.id === currentSlideId;
          const isVisited = index < currentIndex;

          return (
            <motion.button
              key={slide.id}
              type="button"
              onClick={() => onNavigate(slide.id)}
              className="group relative flex flex-col items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Dot indicator */}
              <div className="relative flex h-2 w-2">
                {isActive && (
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: accentColor }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                <span
                  className="relative inline-flex h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    background: isActive
                      ? accentColor
                      : isVisited
                        ? `${accentColor}80`
                        : "rgba(255,255,255,0.25)",
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
              </div>

              {/* Label */}
              <span
                className="text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
                style={{
                  color: isActive
                    ? accentColor
                    : isVisited
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.35)",
                  opacity: isActive || isVisited ? 1 : 0.5,
                }}
              >
                {slide.label}
              </span>

              <motion.div
                className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full"
                style={{ background: accentColor }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
