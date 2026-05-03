"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import Image from "next/image";
import { motion } from "framer-motion";
import { getRetailScene } from "@/lib/data-service";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function RetailExpansionHospitalitySlide({
  isActive,
}: SlideProps) {
  const scene = getRetailScene("expansion-1");
  const getStatDelay = (label: string): number => {
    if (label === "Planned") return 0.2;
    if (label === "Concepts") return 0.32;
    return 0.44;
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-black">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/retail/retail_background.png"
        variant="gold"
        overlayOpacity={0.26}
      />

      <div className="relative z-10 h-full w-full">
        <div className="max-w-[1520px] mx-auto px-8 lg:px-16 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center w-full">
            <div className="relative h-[540px] lg:h-[620px] order-2 lg:order-1 perspective-[1800px]">
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={
                  isActive
                    ? { y: [0, -8, 0], rotate: [0, 0.5, 0] }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -40,
                    y: 20,
                    rotate: -4,
                    scale: 0.96,
                  }}
                  animate={
                    isActive
                      ? { opacity: 1, x: 0, y: 0, rotate: -3.2, scale: 1 }
                      : { opacity: 0, x: -40, y: 20, rotate: -4, scale: 0.96 }
                  }
                  transition={{ duration: 1.05, ease: EASE }}
                  className="absolute left-0 top-14 h-[58%] w-[54%] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_45px_130px_rgba(0,0,0,0.55)] origin-bottom-right"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ y: -6, rotate: -2.4, scale: 1.01 }}
                >
                  <Image
                    src="/images/retail/boutique_stay.png"
                    alt=" boutique stay"
                    fill
                    sizes="(min-width: 1024px) 25vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[0.58rem] uppercase tracking-[0.28em] text-white/55 backdrop-blur-xl">
                    Boutique stay
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 42, rotate: 2.5, scale: 0.95 }}
                  animate={
                    isActive
                      ? { opacity: 1, y: 0, rotate: 1.5, scale: 1 }
                      : { opacity: 0, y: 42, rotate: 2.5, scale: 0.95 }
                  }
                  transition={{ delay: 0.18, duration: 1.05, ease: EASE }}
                  className="absolute right-0 top-0 h-[72%] w-[56%] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_50px_140px_rgba(0,0,0,0.58)] z-10 origin-bottom-left"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ y: -8, rotate: 0.8, scale: 1.01 }}
                >
                  <Image
                    src="/images/retail/guest_energy.png"
                    alt="Placeholder boutique stay concept image"
                    fill
                    sizes="(min-width: 1024px) 30vw, 70vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/10" />
                  <div className="absolute inset-0 ring-1 ring-white/10" />
                  <div className="absolute right-5 top-5 rounded-full border border-[var(--gold)]/15 bg-black/35 px-4 py-2 text-[0.58rem] uppercase tracking-[0.28em] text-white/55 backdrop-blur-xl">
                    Guest energy
                  </div>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 24,
                    y: 26,
                    rotate: -1.8,
                    scale: 0.94,
                  }}
                  animate={
                    isActive
                      ? { opacity: 1, x: 0, y: 0, rotate: -1, scale: 1 }
                      : { opacity: 0, x: 24, y: 26, rotate: -1.8, scale: 0.94 }
                  }
                  transition={{ delay: 0.48, duration: 1.3, ease: EASE }}
                  className="absolute right-[8%] bottom-0 h-[32%] w-[42%] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] z-20 origin-top-left"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ y: -7, x: 2, rotate: -0.4, scale: 1.015 }}
                >
                  <Image
                    src="/images/retail/hotel_arrival.png"
                    alt="Placeholder family stay destination image"
                    fill
                    sizes="(min-width: 1024px) 22vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-white/10" />
                  <div className="absolute left-4 bottom-4 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[0.58rem] uppercase tracking-[0.28em] text-white/55 backdrop-blur-xl">
                    Arrival moment
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -18, y: 10 }}
                  animate={
                    isActive
                      ? { opacity: 1, x: 0, y: 0 }
                      : { opacity: 0, x: -18, y: 10 }
                  }
                  transition={{ delay: 0.67, duration: 1.3, ease: EASE }}
                  className="absolute left-[8%] top-[8%] z-30 flex items-center gap-4"
                >
                  <motion.div
                    className="h-px w-24 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-80"
                    animate={
                      isActive ? { scaleX: [0.92, 1, 0.92] } : { scaleX: 1 }
                    }
                    transition={{
                      duration: 5,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 26, filter: "blur(6px)" }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: 26, filter: "blur(6px)" }
              }
              transition={{ duration: 1.3, ease: EASE }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow mb-5">{scene.eyebrow}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6 whitespace-pre-line">
                {scene.headline}
              </h1>
              <p className="text-lg md:text-xl text-white/72 max-w-xl mb-10 leading-relaxed">
                {scene.body}
              </p>

              <div className="space-y-3 max-w-md">
                {scene.stats.map((stat) => (
                  <motion.div
                    key={stat.lab}
                    initial={{ opacity: 0, x: 18 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: getStatDelay(stat.lab),
                      duration: 0.7,
                      ease: EASE,
                    }}
                    className="flex items-center justify-between rounded-full border border-white/10 bg-black/25 backdrop-blur-xl px-5 py-4"
                  >
                    <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/55">
                      {stat.lab}
                    </span>
                    <span className="text-2xl md:text-3xl font-extralight text-[var(--gold)] tracking-tight">
                      {stat.val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
