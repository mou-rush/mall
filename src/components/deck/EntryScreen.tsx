"use client";
import { motion } from "framer-motion";
import VideoBackground from "@/components/ui/VideoBackground";
import { VIDEOS } from "@/lib/constants";

interface EntryScreenProps {
  readonly onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--moa-black)] flex items-center justify-center overflow-hidden">
      <VideoBackground
        src={VIDEOS.hero}
        overlayOpacity={0.75}
        overlayColor="6,6,8"
      />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,6,8,0.8)_100%)]" />

      <div className="noise-overlay absolute inset-0 z-10 pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--gold-glow)] blur-[150px] opacity-20 z-10 pointer-events-none" />

      <div className="relative z-20 text-center px-8 max-w-3xl">
        <motion.div
          className="w-16 h-[1px] bg-[var(--gold)] mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        />

        <motion.p
          className="eyebrow mb-6 text-[var(--gold)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Enterprise Sales Presentation
        </motion.p>

        <motion.h1
          className="font-extralight tracking-[-0.04em] leading-[0.92] mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="text-[var(--moa-white)] block">Mall of</span>
          <span className="text-gold-gradient font-thin block pb-[0.12em]">
            America
          </span>
        </motion.h1>

        <motion.p
          className="text-[var(--moa-muted)] font-light max-w-lg mx-auto leading-relaxed mb-12"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          40 million visitors. 500+ world-class brands. The most powerful
          brick-and-mortar address in North America.
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="group relative inline-flex items-center gap-3 px-10 py-4
                     border border-[var(--gold)] rounded-[2px] text-[var(--gold)]
                     text-sm font-semibold tracking-[0.2em] uppercase
                     overflow-hidden transition-colors duration-500
                     hover:text-[var(--moa-black)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 bg-[var(--gold)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10">Enter</span>
          <svg
            className="relative z-10 w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.p
          className="mt-8 text-white/20 text-xs tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Press Enter or click to begin
        </motion.p>
      </div>

      <motion.div
        className="absolute top-0 inset-x-0 bg-[var(--moa-black)] z-30 pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 48 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      />
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-[var(--moa-black)] z-30 pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 48 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      />
    </div>
  );
}
