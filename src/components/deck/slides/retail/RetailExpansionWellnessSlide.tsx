"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import Image from "next/image";
import { motion } from "framer-motion";
import { getRetailScene } from "@/lib/data-service";
import SectionNav from "@/components/deck/SectionNav";
import type { SlideComponentProps } from "@/types";
import type { SlideId } from "@/lib/slide-registry";

const RETAIL_SLIDES = [
  { id: "retail-leasing" as SlideId, label: "Leasing" },
  { id: "retail-phase-ii" as SlideId, label: "Phase II" },
  { id: "retail-expansion-hospitality" as SlideId, label: "Hospitality" },
  { id: "retail-expansion-wellness" as SlideId, label: "Wellness" },
];

interface SlideProps extends SlideComponentProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function RetailExpansionWellnessSlide({
  isActive,
  onNavigateToSlide,
  currentSection,
}: SlideProps) {
  const scene = getRetailScene("expansion-2");
  const getStatDelay = (label: string): number => {
    if (label === "Programming") return 0.22;
    if (label === "Services") return 0.33;
    return 0.44;
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-[#060608]">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/retail/aquatic.png"
        variant="gold"
        overlayOpacity={0.32}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(59,130,246,0.18),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(201,168,76,0.12),transparent_26%)]" />

      <div className="relative z-10 h-full w-full flex items-center">
        <div className="max-w-[1540px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={
                isActive
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, filter: "blur(6px)" }
              }
              transition={{ duration: 0.95, ease: EASE }}
              className="xl:max-w-[520px]"
            >
              <p className="eyebrow mb-5">{scene.eyebrow}</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6 whitespace-pre-line">
                {scene.headline}
              </h1>
              <p className="text-lg md:text-xl text-white/72 leading-relaxed mb-10">
                {scene.body}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {scene.stats.map((stat) => (
                  <motion.div
                    key={stat.lab}
                    initial={{ opacity: 0, y: 18 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: getStatDelay(stat.lab),
                      duration: 0.7,
                      ease: EASE,
                    }}
                    className="rounded-[26px] border border-white/10 bg-black/25 backdrop-blur-xl px-4 py-6 text-center"
                  >
                    <div className="text-xl md:text-2xl font-extralight text-[var(--gold)] mb-2">
                      {stat.val}
                    </div>
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-white/55">
                      {stat.lab}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="relative min-h-[520px] lg:min-h-[620px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: EASE }}
                className="absolute inset-0 rounded-[34px] overflow-hidden border border-white/10 shadow-[0_35px_120px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src="/images/retail/wellness.png"
                  alt="Placeholder immersive water and wellness concept image"
                  fill
                  sizes="(min-width: 1280px) 56vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24, x: 20 }}
                animate={isActive ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ delay: 0.34, duration: 0.9, ease: EASE }}
                className="absolute right-6 bottom-6 h-[180px] w-[230px] rounded-[30px] overflow-hidden border border-white/10 shadow-[0_25px_90px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src="/images/retail/spa.png"
                  alt="Placeholder wellness lounge detail image"
                  fill
                  sizes="(min-width: 1280px) 18vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24, y: -8 }}
                animate={
                  isActive
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: 24, y: -8 }
                }
                transition={{ delay: 0.42, duration: 0.9, ease: EASE }}
                className="absolute right-0 top-[15%] z-20"
              >
                <motion.div
                  className="h-px w-28 bg-gradient-to-r from-white/10 via-[var(--gold)] to-transparent opacity-80"
                  animate={
                    isActive ? { scaleX: [0.94, 1, 0.94] } : { scaleX: 1 }
                  }
                  transition={{
                    duration: 5,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {onNavigateToSlide && currentSection && (
        <SectionNav
          currentSlideId="retail-expansion-wellness"
          slides={RETAIL_SLIDES}
          onNavigate={(slideId) => onNavigateToSlide(slideId, currentSection)}
          accentColor="#FFC72C"
        />
      )}
    </div>
  );
}
