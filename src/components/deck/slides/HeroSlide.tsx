"use client";
import { motion } from "framer-motion";
import VideoBackground from "@/components/ui/VideoBackground";
import { VIDEOS, TICKER_FACTS } from "@/lib/constants";

interface HeroSlideProps {
  readonly isActive: boolean;
}

export default function HeroSlide({ isActive }: HeroSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[var(--moa-black)]">
      <VideoBackground
        src={VIDEOS.hero}
        overlayOpacity={0.6}
        overlayColor="6,6,8"
      />

      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[var(--moa-black)] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--moa-black)] to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          Bloomington, Minnesota · Est. 1992
        </motion.p>

        <motion.h1
          className="font-extralight tracking-[-0.04em] leading-[0.92] mb-8"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="block text-[var(--moa-white)]">America&rsquo;s</span>
          <span className="block text-gold-gradient font-thin pb-[0.12em]">
            Stage
          </span>
        </motion.h1>

        <motion.p
          className="text-[var(--moa-muted)] font-light max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          40 million visitors. 500+ world-class brands. Every category. Every
          experience. One address that changes what retail can be.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-8 text-[var(--moa-muted)]"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {["40M+ Visitors", "$2B+ Sales", "500+ Brands"].map((stat, i) => (
            <span key={stat} className="flex items-center gap-3">
              {i > 0 && (
                <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-60" />
              )}
              <span className="text-xs tracking-[0.15em] uppercase font-medium">
                {stat}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 inset-x-0 z-20 flex items-center h-10 overflow-hidden border-t border-white/5"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="flex items-center gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_FACTS, ...TICKER_FACTS].map((fact, i) => (
            <span key={`${fact}-${i}`} className="flex items-center gap-10">
              <span className="eyebrow text-[0.6rem] text-[var(--moa-muted)]">
                {fact}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-40" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
