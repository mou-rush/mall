"use client";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  LuCalendarDays,
  LuHandshake,
  LuMic,
  LuSparkles,
  LuStore,
  LuTrophy,
} from "react-icons/lu";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { VIDEOS } from "@/lib/constants";

interface EventsSlideProps {
  readonly isActive: boolean;
}

export default function EventsSlide({ isActive }: EventsSlideProps) {
  const content = DECK_WEBSITE_CONTENT.events;

  const iconById: Record<string, ComponentType<{ className?: string }>> = {
    celebrity: LuSparkles,
    music: LuMic,
    charity: LuTrophy,
    launch: LuStore,
    books: LuCalendarDays,
    premieres: LuHandshake,
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-black)]">
      <CinematicBackground
        isActive={isActive}
        videoSrc={VIDEOS.events}
        imageSrc="/images/events/crowd.png"
        imageAlt="Events at Mall of America"
        imagePosition="50% 45%"
      />
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
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
            <motion.p
              className="text-[var(--moa-muted)] max-w-xl text-sm leading-relaxed mt-4"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              {content.subtitle}
            </motion.p>
          </div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.stats.map((s) => (
              <div
                key={s.lab}
                className="glass-card px-4 py-3 rounded-[2px] text-center"
              >
                <p className="text-gold-gradient font-thin text-xl tracking-tight">
                  {s.val}
                </p>
                <p className="text-[var(--moa-muted)] text-[0.55rem] tracking-wider uppercase">
                  {s.lab}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {content.categories.map((cat, i) => {
            const Icon = iconById[cat.id] ?? LuSparkles;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.06, duration: 0.5 }}
                className="glass-card group p-5 rounded-[2px]
                           hover:border-[var(--gold)] transition-all
                           duration-500 cursor-default"
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                  <span className="eyebrow text-[0.5rem] text-[var(--moa-muted)] text-right leading-tight max-w-[120px]">
                    Event Type
                  </span>
                </div>
                <h3 className="text-[var(--moa-white)] font-medium text-sm mb-2">
                  {cat.title}
                </h3>
                <p className="text-[var(--moa-muted)] text-xs leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-6 flex flex-col sm:flex-row gap-3 justify-end"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <a
            href={content.partnerCta.href}
            className="btn-outline justify-center"
            target="_blank"
            rel="noreferrer"
          >
            {content.partnerCta.label}
          </a>
          <a
            href={content.cta.href}
            className="btn-primary justify-center"
            target="_blank"
            rel="noreferrer"
          >
            {content.cta.label}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
