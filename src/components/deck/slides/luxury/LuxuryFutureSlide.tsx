"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { motion } from "framer-motion";
import { getLuxuryContent } from "@/lib/data-service";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function LuxuryFutureSlide({ isActive }: SlideProps) {
  const content = getLuxuryContent();
  const futurePillar = content.pillars[2];

  const getStatDelay = (label: string): number => {
    if (label === "Specialty Stores") return 0.5;
    if (label === "Department Stores") return 0.62;
    return 0.74;
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-black">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/luxury/ambience.png"
        variant="gold"
        overlayOpacity={0.28}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          isActive
            ? {
                background: [
                  "radial-gradient(circle at 72% 38%, rgba(255,199,44,0.06), transparent 20%), radial-gradient(circle at 28% 72%, rgba(0,61,165,0.12), transparent 26%)",
                  "radial-gradient(circle at 68% 34%, rgba(255,199,44,0.09), transparent 24%), radial-gradient(circle at 24% 76%, rgba(0,61,165,0.16), transparent 28%)",
                  "radial-gradient(circle at 72% 38%, rgba(255,199,44,0.06), transparent 20%), radial-gradient(circle at 28% 72%, rgba(0,61,165,0.12), transparent 26%)",
                ],
              }
            : {}
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/70" />

      <div className="relative z-10 h-full w-full flex items-end">
        <div className="max-w-[1500px] mx-auto px-8 lg:px-16 w-full pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={
              isActive
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 30, filter: "blur(8px)" }
            }
            transition={{ duration: 0.95, ease: EASE }}
          >
            <p className="eyebrow mb-5">Future Expansions</p>
            <h1 className="text-6xl md:text-7xl lg:text-[6.2rem] leading-[0.92] font-extralight tracking-tight text-white mb-6 max-w-5xl">
              Phase II luxury vision
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
              className="text-lg md:text-xl text-white/72 max-w-3xl leading-relaxed mb-10"
            >
              {futurePillar.desc}
            </motion.p>

            <div className="flex flex-wrap gap-5">
              {content.stats.map((stat) => (
                <motion.div
                  key={stat.lab}
                  initial={{ opacity: 0, y: 18 }}
                  animate={
                    isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                  }
                  transition={{
                    delay: getStatDelay(stat.lab),
                    duration: 0.8,
                    ease: EASE,
                  }}
                  className="min-w-[170px] rounded-[28px] border border-white/10 bg-black/22 px-6 py-6 backdrop-blur-xl"
                >
                  <div className="text-4xl md:text-5xl font-extralight text-[var(--gold)] mb-2 tracking-tight">
                    {stat.val}
                  </div>
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-white/55">
                    {stat.lab}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
