"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import AnimatedText from "@/components/ui/AnimatedText";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  getBrandNames,
  getBrandLogoMap,
  getLuxuryContent,
} from "@/lib/data-service";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

const brands = getBrandNames();
const brandMarquee = [
  ...brands.map((name) => ({ name, run: 0 as const })),
  ...brands.map((name) => ({ name, run: 1 as const })),
];

export default function LuxurySignatureSlide({ isActive }: SlideProps) {
  const content = getLuxuryContent();
  const storesCount = Math.round(useCountUp(520, 1800, isActive));
  const departmentCount = Math.round(useCountUp(2, 1600, isActive));

  const getStatDelay = (label: string): number => {
    if (label === "Specialty Stores") return 0.55;
    if (label === "Department Stores") return 0.68;
    return 0.81;
  };

  const getStatDisplay = (label: string, value: string): string => {
    if (label === "Specialty Stores") return `${storesCount}+`;
    if (label === "Department Stores") return String(departmentCount);
    return value;
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-[var(--moa-black)]">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/retail/leasing_opportunity.jpg"
        variant="gold"
        overlayOpacity={0.24}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          isActive
            ? {
                background: [
                  "radial-gradient(circle at 50% 45%, rgba(255,199,44,0.06), transparent 28%)",
                  "radial-gradient(circle at 52% 43%, rgba(255,199,44,0.09), transparent 30%)",
                  "radial-gradient(circle at 50% 45%, rgba(255,199,44,0.06), transparent 28%)",
                ],
              }
            : {}
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 h-full w-full">
        <div className="h-full w-full max-w-[1500px] mx-auto px-8 lg:px-16 flex flex-col justify-center items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={
              isActive
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 16, filter: "blur(4px)" }
            }
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[0.68rem] uppercase tracking-[0.55em] text-white/58 mb-8"
          >
            {content.eyebrow}
          </motion.p>

          <AnimatedText
            text={content.title}
            el="h1"
            className="text-5xl md:text-7xl lg:text-[6.4rem] font-extralight tracking-tight leading-[0.92] text-white max-w-5xl mx-auto"
            variant="words"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
            className="mt-8 text-lg md:text-xl text-white/68 max-w-3xl leading-relaxed"
          >
            {content.subtitle}
          </motion.p>

          <div className="mt-12 flex flex-wrap justify-center gap-5 md:gap-8">
            {content.stats.map((stat) => (
              <motion.div
                key={stat.lab}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.96 }
                }
                transition={{
                  delay: getStatDelay(stat.lab),
                  duration: 0.9,
                  ease: EASE,
                }}
                className="min-w-[170px] rounded-[28px] border border-white/10 bg-black/20 px-6 py-6 backdrop-blur-xl"
              >
                <div className="text-4xl md:text-5xl font-extralight text-[var(--gold)] tracking-tight mb-2 tabular-nums">
                  {getStatDisplay(stat.lab, stat.val)}
                </div>
                <div className="text-[0.62rem] uppercase tracking-[0.24em] text-white/50">
                  {stat.lab}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[min(88vw,1200px)] overflow-hidden py-4"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10" />
            <motion.div
              className="flex items-center gap-16 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            >
              {brandMarquee.map(({ name, run }) => {
                const logo = getBrandLogoMap()[name];
                return logo ? (
                  <div
                    key={`${name}-${run}`}
                    className="relative h-8 w-28 flex-shrink-0"
                  >
                    <Image
                      src={logo}
                      alt={name}
                      fill
                      className="object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-90 transition-all duration-500"
                      sizes="112px"
                    />
                  </div>
                ) : (
                  <span
                    key={`${name}-${run}`}
                    className="text-white/35 text-[0.62rem] tracking-[0.14em] uppercase flex-shrink-0"
                  >
                    {name}
                  </span>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
