"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";
import { motion } from "framer-motion";
import Image from "next/image";

interface SlideProps {
  readonly isActive: boolean;
}

export default function EntertainmentCrayolaSlide({ isActive }: SlideProps) {
  const content = DECK_WEBSITE_CONTENT.entertainment;
  const attraction = content.items[2];

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[#07070c]">
      <CinematicBackground
        isActive={isActive}
        imageSrc={attraction.image}
        variant="noir"
        overlayOpacity={0.28}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_35%,rgba(255,199,44,0.24),transparent_0,transparent_28%),radial-gradient(circle_at_80%_28%,rgba(255,77,77,0.20),transparent_0,transparent_26%),linear-gradient(105deg,rgba(5,7,14,0.9)_8%,rgba(5,7,14,0.42)_48%,rgba(5,7,14,0.88)_100%)]" />

      <motion.div
        className="absolute -left-20 top-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,199,44,0.38),rgba(255,120,40,0.08)_54%,transparent_72%)] blur-3xl"
        animate={
          isActive
            ? { x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[10%] bottom-[12%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(255,60,108,0.34),rgba(122,40,255,0.10)_58%,transparent_74%)] blur-3xl"
        animate={
          isActive
            ? { x: [0, -18, 0], y: [0, 16, 0], scale: [1, 1.12, 1] }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.88fr)] lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -60, y: 30, filter: "blur(12px)" }}
            animate={
              isActive
                ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -60, y: 30, filter: "blur(12px)" }
            }
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="relative max-w-2xl"
          >
            <motion.div
              className="absolute -left-8 top-12 h-28 w-1 rounded-full bg-gradient-to-b from-[#ffc72c] via-[#ff7b38] to-transparent shadow-[0_0_35px_rgba(255,199,44,0.55)]"
              animate={
                isActive ? { scaleY: [0.85, 1.08, 0.9] } : { scaleY: 0.85 }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <p className="eyebrow mb-6">{content.eyebrow}</p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.95, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="section-title max-w-[10ch] text-balance text-white drop-shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
            >
              {attraction.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -18 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="mt-7 text-2xl font-light text-[#ffd35c] md:text-[2rem]"
            >
              {attraction.headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/72 md:text-xl"
            >
              {attraction.desc}
            </motion.p>
          </motion.div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotate: -10, y: 36 }}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, rotate: -4, y: 0 }
                  : { opacity: 0, scale: 0.86, rotate: -10, y: 36 }
              }
              transition={{ duration: 1.05, delay: 0.18, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.03, rotate: -2, y: -8 }}
              className="group relative h-[54vh] min-h-[360px] w-[min(68vw,720px)] max-w-[620px] overflow-hidden rounded-[2.25rem] border border-white/12 bg-black/20 shadow-[0_35px_120px_rgba(0,0,0,0.55)]"
              style={{ clipPath: "polygon(10% 0%,100% 0%,90% 100%,0% 100%)" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),transparent_24%,transparent_70%,rgba(255,199,44,0.18)_100%)] opacity-70" />
              <motion.div
                className="absolute inset-0"
                animate={
                  isActive
                    ? { scale: [1, 1.06, 1], y: [0, -10, 0] }
                    : { scale: 1, y: 0 }
                }
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  // src={attraction.image}
                  src="/images/entertainment/crayola_2.webp"
                  alt={attraction.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 620px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,173,51,0.08),transparent_34%,rgba(7,7,12,0.72)_100%)]" />
              <div className="absolute inset-y-[10%] right-[8%] w-px bg-gradient-to-b from-transparent via-[#ffd35c] to-transparent opacity-70" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, y: 28, rotate: 9 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, y: 0, rotate: 8 }
                  : { opacity: 0, x: 40, y: 28, rotate: 9 }
              }
              transition={{ duration: 0.95, delay: 0.42, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -8, rotate: 6, scale: 1.04 }}
              className="absolute -bottom-4 left-[8%] h-[22vh] min-h-[150px] w-[46%] min-w-[220px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/30 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-sm"
            >
              <Image
                src="/images/entertainment/crayola_1.jpg"
                alt="crayola closeup image"
                fill
                sizes="(max-width: 1024px) 45vw, 280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,199,44,0.28),transparent_46%,rgba(255,72,100,0.28)_100%)] mix-blend-screen" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
