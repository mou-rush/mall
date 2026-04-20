"use client";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  LuChefHat,
  LuCoffee,
  LuSparkles,
  LuUtensilsCrossed,
} from "react-icons/lu";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { VIDEOS } from "@/lib/constants";

interface DiningSlideProps {
  readonly isActive: boolean;
}

export default function DiningSlide({ isActive }: DiningSlideProps) {
  const content = DECK_WEBSITE_CONTENT.dining;

  const iconById: Record<string, ComponentType<{ className?: string }>> = {
    "full-service": LuChefHat,
    "food-court": LuUtensilsCrossed,
    "coffee-tea": LuCoffee,
    sweets: LuSparkles,
    "fast-casual": LuUtensilsCrossed,
    breakfast: LuCoffee,
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-dark)]">
      <CinematicBackground
        isActive={isActive}
        videoSrc={VIDEOS.hero}
        variant="gold"
      />
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {content.eyebrow}
            </motion.p>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              {content.title}
            </motion.h2>
          </div>
          <motion.p
            className="text-[var(--moa-muted)] max-w-sm text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {content.categories.map((cat, i) => {
            const Icon = iconById[cat.id] ?? LuUtensilsCrossed;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="glass-card group p-5 rounded-[2px]
                           hover:border-[rgba(201,168,76,0.4)] transition-all
                           duration-500 cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                  <h3 className="text-[var(--moa-white)] font-medium text-sm">
                    {cat.title}
                  </h3>
                  {cat.tag ? (
                    <span className="eyebrow text-[0.5rem] text-[var(--moa-muted)] ml-auto">
                      {cat.tag}
                    </span>
                  ) : null}
                </div>
                <p className="text-[var(--moa-muted)] text-xs leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-card rounded-[2px] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <p className="eyebrow text-[0.55rem] mb-2">Featured Restaurant</p>
            <p className="text-[var(--moa-white)] text-lg font-light tracking-tight">
              {content.featured.name}
            </p>
            <p className="text-[var(--moa-muted)] text-xs tracking-[0.12em] uppercase mt-1">
              {content.featured.location}
            </p>
          </div>

          <a
            href={content.featured.link.href}
            className="btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            {content.featured.link.label}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
