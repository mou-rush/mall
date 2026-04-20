"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { motion } from "framer-motion";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function EntertainmentSealifeSlide({ isActive }: SlideProps) {
  const content = DECK_WEBSITE_CONTENT.entertainment;
  const attraction = content.items[1];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <CinematicBackground
        isActive={isActive}
        imageSrc={attraction.image}
        variant="noir"
        overlayOpacity={0.22}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="eyebrow mb-5">{content.eyebrow}</p>
          <h1 className="section-title mb-6">{attraction.name}</h1>
          <p className="text-2xl text-[var(--gold)] font-light mb-6">
            {attraction.headline}
          </p>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            {attraction.desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
