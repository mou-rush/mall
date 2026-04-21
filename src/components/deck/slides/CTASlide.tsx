"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentType, CSSProperties } from "react";
import { useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { LuCalendarDays, LuHandshake, LuStore } from "react-icons/lu";
import { getPartnerContent } from "@/lib/data-service";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { VIDEOS } from "@/lib/constants";
import { ContactForm as DynamicContactForm } from "@/lib/lazy-slides";

interface CTASlideProps {
  readonly isActive: boolean;
}

export default function CTASlide({ isActive }: CTASlideProps) {
  const content = getPartnerContent();
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const colorByAccent: Record<string, string> = {
    gold: "var(--gold)",
    blue: "var(--accent-blue)",
  };

  const iconById: Record<
    string,
    ComponentType<{ size?: number; className?: string; style?: CSSProperties }>
  > = {
    leasing: LuStore,
    events: LuCalendarDays,
    partnerships: LuHandshake,
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-black)]">
      <CinematicBackground isActive={isActive} videoSrc={VIDEOS.hero} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--gold-glow)] rounded-full blur-[180px] opacity-20" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern
              id="deck-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#deck-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 lg:px-16 w-full">
        <div className="text-center mb-10">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            className="section-title mx-auto"
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
            className="text-[var(--moa-muted)] max-w-lg mx-auto mt-4 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {content.cards.map((card, i) => {
            const Icon = iconById[card.id] ?? LuStore;
            const selected = activeForm === card.id;
            const accentColor = colorByAccent[card.accent ?? "gold"];
            return (
              <motion.button
                key={card.id}
                onClick={() => setActiveForm(selected ? null : card.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.35 + i * 0.1,
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={`glass-card p-6 rounded-[2px] text-left transition-all
                           duration-500 relative overflow-hidden ${
                             selected
                               ? "border-opacity-60"
                               : "hover:border-opacity-30"
                           }`}
                style={{
                  borderColor: selected ? accentColor : undefined,
                }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    opacity: selected ? 1 : 0,
                  }}
                />
                <Icon
                  size={24}
                  className="mb-4"
                  style={{ color: accentColor }}
                />
                <h3 className="text-[var(--moa-white)] font-medium mb-2">
                  {card.title}
                </h3>
                <p className="text-[var(--moa-muted)] text-xs leading-relaxed mb-4">
                  {card.desc}
                </p>
                <span
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                  style={{ color: accentColor }}
                >
                  {selected ? "Close ✕" : card.cta.label}
                  {!selected && <ArrowIcon size={12} />}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {activeForm && (
            <motion.div
              key={activeForm}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-[2px] p-6 lg:p-8 mb-4">
                <DynamicContactForm
                  type={activeForm}
                  onClose={() => setActiveForm(null)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-gold-gradient font-black text-sm tracking-[0.12em] uppercase mb-1">
            Mall of America
          </p>
          <p className="text-[var(--moa-muted)] text-xs">
            {content.addressLine}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
