"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND_LOGO_MAP } from "@/lib/constants";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";

interface SlideProps {
  readonly isActive: boolean;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

const brands = Object.keys(BRAND_LOGO_MAP);
const brandMarquee = [
  ...brands.map((name) => ({ name, run: 0 as const })),
  ...brands.map((name) => ({ name, run: 1 as const })),
];

export default function LuxurySignatureSlide({ isActive }: SlideProps) {
  const content = DECK_WEBSITE_CONTENT.luxury;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--moa-black)]">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/luxury/ambience.png"
        variant="gold"
        overlayOpacity={0.16}
      />

      <div className="relative z-10 h-full w-full">
        <div className="absolute top-0 inset-x-0 pt-10">
          <div className="max-w-[1320px] mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-[10px] w-[10px] rounded-full bg-[var(--gold)] shadow-[0_0_24px_rgba(201,168,76,0.45)]" />
              <p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/60">
                {content.eyebrow}
              </p>
            </motion.div>

            <motion.div
              className="overflow-hidden border-y border-white/10 py-3 relative"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.9 }}
            >
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10" />
              <motion.div
                className="flex items-center gap-16 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                {brandMarquee.map(({ name, run }) => {
                  const logo = BRAND_LOGO_MAP[name];
                  return logo ? (
                    <div
                      key={`${name}-${run}`}
                      className="relative h-7 w-24 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={logo}
                        alt={name}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <span
                      key={`${name}-${run}`}
                      className="text-white/45 text-[0.65rem] tracking-[0.12em] uppercase flex-shrink-0"
                    >
                      {name}
                    </span>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1320px] mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={
                isActive ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <h1 className="section-title mb-6">{content.title}</h1>
              <p className="text-xl text-white/70 max-w-3xl mb-10 leading-relaxed">
                {content.subtitle}
              </p>

              <div className="flex flex-wrap gap-6">
                {content.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-light text-[var(--gold)] mb-2">
                      {stat.val}
                    </div>
                    <div className="text-sm text-white/60 uppercase tracking-wider">
                      {stat.lab}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
