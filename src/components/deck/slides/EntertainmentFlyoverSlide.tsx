"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { getEntertainmentContent } from "@/lib/data-service";
import { motion } from "framer-motion";
import Image from "next/image";

interface SlideProps {
  readonly isActive: boolean;
}

export default function EntertainmentFlyoverSlide({ isActive }: SlideProps) {
  const content = getEntertainmentContent();
  const attraction = content.items[3];

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[#05060d]">
      <CinematicBackground
        isActive={isActive}
        imageSrc={attraction.image}
        variant="noir"
        overlayOpacity={0.34}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(117,84,255,0.30),transparent_26%),radial-gradient(circle_at_28%_70%,rgba(54,215,255,0.18),transparent_24%),linear-gradient(115deg,rgba(5,8,18,0.95)_10%,rgba(5,8,18,0.4)_46%,rgba(5,8,18,0.88)_100%)]" />

      <motion.div
        className="absolute left-[6%] top-[18%] h-[46vh] min-h-[300px] w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
        animate={
          isActive
            ? { scaleY: [0.82, 1, 0.82], opacity: [0.35, 0.85, 0.35] }
            : { scaleY: 0.82, opacity: 0.35 }
        }
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[12%] top-[10%] h-[12rem] w-[12rem] rounded-full border border-cyan-300/20"
        animate={
          isActive
            ? { scale: [1, 1.08, 1], rotate: [0, 10, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-[16%] rounded-full border border-violet-300/25" />
      </motion.div>

      <div className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-[minmax(420px,0.92fr)_minmax(0,0.88fr)] lg:px-16">
          <div className="relative order-2 flex items-center justify-start lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9, rotate: -6 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, scale: 1, rotate: -3 }
                  : { opacity: 0, x: -50, scale: 0.9, rotate: -6 }
              }
              transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.03, rotate: -1, y: -8 }}
              className="group relative h-[58vh] min-h-[380px] w-[min(72vw,720px)] max-w-[680px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/25 shadow-[0_38px_130px_rgba(0,0,0,0.62)]"
              style={{ clipPath: "polygon(0% 0%,86% 0%,100% 100%,14% 100%)" }}
            >
              <motion.div
                className="absolute inset-0"
                animate={
                  isActive
                    ? {
                        scale: [1.02, 1.08, 1.02],
                        x: [0, -10, 0],
                        y: [0, 8, 0],
                      }
                    : { scale: 1.02, x: 0, y: 0 }
                }
                transition={{
                  duration: 10.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/entertainment/flyover_1.png"
                  alt="flyover image"
                  fill
                  priority
                  sizes="(max-width: 1024px) 82vw, 680px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(94,234,255,0.16),transparent_32%,transparent_65%,rgba(139,92,246,0.24)_100%)]" />
              <div className="absolute inset-y-0 left-[11%] w-[1px] bg-gradient-to-b from-transparent via-cyan-300/90 to-transparent shadow-[0_0_20px_rgba(103,232,249,0.75)]" />
              <div className="absolute inset-y-0 right-[10%] w-[1px] bg-gradient-to-b from-transparent via-violet-300/80 to-transparent shadow-[0_0_20px_rgba(167,139,250,0.7)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, y: 40, rotate: 8 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, y: 0, rotate: 8 }
                  : { opacity: 0, x: 60, y: 40, rotate: 8 }
              }
              transition={{ duration: 0.95, delay: 0.32, ease: EASE_OUT_EXPO }}
              whileHover={{ rotate: 5, scale: 1.04, y: -8 }}
              className="absolute bottom-[5%] right-[2%] h-[22vh] min-h-[140px] w-[36%] min-w-[220px] overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/25 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <Image
                src="/images/entertainment/flyover_2.png"
                alt="flyover closeup image"
                fill
                sizes="(max-width: 1024px) 42vw, 260px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,224,255,0.22),transparent_38%,rgba(139,92,246,0.26)_100%)] mix-blend-screen" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 64, y: 24, filter: "blur(10px)" }}
            animate={
              isActive
                ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                : { opacity: 0, x: 64, y: 24, filter: "blur(10px)" }
            }
            transition={{ duration: 1, delay: 0.14, ease: EASE_OUT_EXPO }}
            className="relative order-1 max-w-2xl justify-self-end lg:order-2"
          >
            <motion.div
              className="absolute -left-10 top-10 h-24 w-24 rounded-full border border-cyan-300/25 bg-cyan-300/8 blur-[1px]"
              animate={
                isActive
                  ? { y: [0, -12, 0], scale: [1, 1.04, 1] }
                  : { y: 0, scale: 1 }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <p className="eyebrow mb-6">{content.eyebrow}</p>
            <h1 className="section-title max-w-[10ch] text-balance text-white">
              {attraction.name}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.86, delay: 0.24, ease: EASE_OUT_EXPO }}
              className="mt-7 text-2xl font-light text-cyan-200 md:text-[2rem]"
            >
              {attraction.headline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.34, ease: EASE_OUT_EXPO }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/72 md:text-xl"
            >
              {attraction.desc}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
