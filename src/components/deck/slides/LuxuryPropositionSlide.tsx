"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { motion } from "framer-motion";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function LuxuryPropositionSlide({ isActive }: SlideProps) {
  const content = DECK_WEBSITE_CONTENT.luxury;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/luxury/ambience.png"
        variant="gold"
        overlayOpacity={0.16}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="eyebrow mb-8">{content.eyebrow}</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-12">
            Value Proposition
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {content.pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: EASE }}
                className="glass-card rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl p-6"
              >
                <h3 className="text-lg font-semibold text-[var(--gold)] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
