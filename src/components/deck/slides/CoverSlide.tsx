"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { EASING } from "@/lib/animations";

interface CoverSlideProps {
  readonly isActive: boolean;
  readonly title: string;
  readonly imageSrc: string;
}

export default memo(function CoverSlide({
  isActive,
  title,
  imageSrc,
}: CoverSlideProps) {
  return (
    <div className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden">
      <CinematicBackground
        isActive={isActive}
        imageSrc={imageSrc}
        variant="noir"
        overlayOpacity={0.45}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={
            isActive
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.9 }
          }
          transition={{ duration: 1, ease: EASING.reveal }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white mb-6">
            {title}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASING.reveal }}
            className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--gold)]/5 blur-[120px]"
        animate={
          isActive
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {}
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--gold)]/5 blur-[120px]"
        animate={
          isActive
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }
            : {}
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
});
