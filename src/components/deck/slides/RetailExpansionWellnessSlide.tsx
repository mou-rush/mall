"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { motion } from "framer-motion";
import { LEASING_DEVELOPMENT } from "@/lib/moa-website-content";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function RetailExpansionWellnessSlide({ isActive }: SlideProps) {
  const scene = LEASING_DEVELOPMENT.retail.scenes[3];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/retail/flagship.png"
        variant="noir"
        overlayOpacity={0.2}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="eyebrow mb-5">{scene.eyebrow}</p>
          <h1 className="section-title mb-6 whitespace-pre-line">
            {scene.headline}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
            {scene.body}
          </p>

          <div className="flex flex-wrap gap-6">
            {scene.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-light text-[var(--gold)] mb-2">
                  {stat.val}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">
                  {stat.lab}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
