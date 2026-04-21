"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function LuxuryPropositionSlide({ isActive }: SlideProps) {
  const content = DECK_WEBSITE_CONTENT.luxury;
  const [activeIndex, setActiveIndex] = useState(0);

  const pillars = content.pillars;
  const visuals = useMemo(
    () => [
      {
        src: "/images/luxury/pillar_1.jpg",
        position: "50% 42%",
        accent: "from-[#003DA5]/35 via-transparent to-black/20",
        panelLabel: "Luxury audience",
        panelType: "image" as const,
        panelSrc: "/images/luxury/pillar_1.jpg",
        panelPosition: "50% 32%",
      },
      {
        src: "/images/luxury/pillar_2.png",
        position: "50% 50%",
        accent: "from-black/20 via-transparent to-[#FFC72C]/12",
        panelLabel: "Retail environment",
        panelType: "image" as const,
        panelSrc: "/images/luxury/pillar_2.png",
        panelPosition: "50% 50%",
      },
      {
        src: "/images/luxury/pillar_3.jpg",
        position: "50% 42%",
        accent: "from-black/25 via-transparent to-[#003DA5]/20",
        panelLabel: "Brand mix",
        panelType: "image" as const,
        panelSrc: "/images/luxury/pillar_3.jpg",
        panelPosition: "50% 42%",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % pillars.length);
    }, 4200);

    return () => window.clearInterval(id);
  }, [isActive, pillars.length]);

  const activePillar = pillars[activeIndex];
  const activeVisual = visuals[activeIndex] ?? visuals[0];

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <CinematicBackground
        isActive={isActive}
        imageSrc={activeVisual.src}
        imagePosition={activeVisual.position}
        variant="gold"
        overlayOpacity={0.24}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-r ${activeVisual.accent}`}
      />
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="max-w-[1500px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-[0.82fr_1.18fr] gap-8 xl:gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: -24, filter: "blur(6px)" }
              }
              transition={{ duration: 0.9, ease: EASE }}
              className="max-w-[400px]"
            >
              <p className="eyebrow mb-6">{content.eyebrow}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[0.95] mb-8">
                Why premium brands belong here
              </h1>

              <div className="flex items-center gap-3">
                {pillars.map((pillar, index) => (
                  <button
                    key={pillar.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={
                      "h-[3px] rounded-full transition-all duration-500 " +
                      (index === activeIndex
                        ? "w-16 bg-[var(--gold)]"
                        : "w-8 bg-white/20 hover:bg-white/35")
                    }
                    aria-label={`Show ${pillar.title}`}
                  />
                ))}
              </div>
            </motion.div>

            <div className="relative min-h-[520px] lg:min-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.title}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
                    className="w-full max-w-[420px] md:max-w-[560px] lg:max-w-[680px] rounded-[32px] border border-white/10 bg-black/22 p-4 md:p-5 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.38)]"
                  >
                    <div className="mb-4 text-[0.56rem] uppercase tracking-[0.28em] text-white/48">
                      {activeVisual.panelLabel}
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden rounded-[26px]">
                      <Image
                        src={activeVisual.panelSrc}
                        alt={activeVisual.panelLabel}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: activeVisual.panelPosition,
                        }}
                        sizes="(max-width: 768px) 420px, (max-width: 1280px) 560px, 680px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  </motion.div>

                  <div className="w-full max-w-[420px] md:max-w-[560px] lg:max-w-[680px]">
                    <motion.h2
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.75, ease: EASE }}
                      className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-[0.96] mb-5"
                    >
                      {activePillar.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.16, duration: 0.8, ease: EASE }}
                      className="text-lg md:text-xl text-white/70 leading-relaxed"
                    >
                      {activePillar.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
