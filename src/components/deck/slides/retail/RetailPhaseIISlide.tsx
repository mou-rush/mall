"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import Image from "next/image";
import { motion } from "framer-motion";
import { getLeasingContent } from "@/lib/data-service";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function RetailPhaseIISlide({ isActive }: SlideProps) {
  const scene = getLeasingContent().retail.scenes[1];

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-black">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/retail/Leasing_image.png"
        variant="noir"
        overlayOpacity={0.28}
      />

      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:90px_90px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full w-full">
        <div className="max-w-[1500px] mx-auto px-8 lg:px-16 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={
                isActive
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 28, filter: "blur(6px)" }
              }
              transition={{ duration: 0.9, ease: EASE }}
            >
              <motion.p
                className="eyebrow mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08, duration: 0.6 }}
              >
                {scene.eyebrow}
              </motion.p>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.94] font-extralight tracking-tight text-white whitespace-pre-line mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.14, duration: 0.85, ease: EASE }}
              >
                {scene.headline}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/72 max-w-xl leading-relaxed mb-10"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : {}}
                transition={{ delay: 0.24, duration: 0.8 }}
              >
                {scene.body}
              </motion.p>

              <motion.div
                className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-black/25 backdrop-blur-xl px-5 py-3"
                initial={{ opacity: 0, y: 12 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)] shadow-[0_0_18px_rgba(201,168,76,0.6)]" />
                <span className="text-[0.62rem] uppercase tracking-[0.32em] text-white/60">
                  Projected scale and statewide reach
                </span>
              </motion.div>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 1, ease: EASE }}
                className="relative rounded-[34px] border border-white/12 bg-black/20 backdrop-blur-xl p-4 lg:p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
              >
                <div className="relative h-[250px] md:h-[320px] rounded-[24px] overflow-hidden border border-white/10">
                  <Image
                    src="/images/retail/leasing_development-future-expansion.jpg"
                    alt="Leasing development future expansion"
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scene.stats.map((stat) => (
                    <motion.div
                      key={stat.lab}
                      initial={{ opacity: 0, y: 22 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        delay:
                          stat.lab === "Visitors"
                            ? 0.45
                            : stat.lab === "Outside 150 Miles"
                              ? 0.57
                              : 0.69,
                        duration: 0.75,
                        ease: EASE,
                      }}
                      className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="text-[2.25rem] md:text-[2.8rem] font-extralight tracking-tight text-[var(--gold)] mb-2">
                        {stat.val}
                      </div>
                      <div className="text-[0.66rem] uppercase tracking-[0.24em] text-white/55">
                        {stat.lab}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
