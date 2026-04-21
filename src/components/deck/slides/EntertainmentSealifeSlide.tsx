"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { getEntertainmentContent } from "@/lib/data-service";
import { motion } from "framer-motion";
import Image from "next/image";

interface SlideProps {
  readonly isActive: boolean;
}

export default function EntertainmentSealifeSlide({ isActive }: SlideProps) {
  const content = getEntertainmentContent();
  const attraction = content.items[1];

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[#04070b]">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/entertainment/sealife_4.jpg"
        variant="noir"
        overlayOpacity={0.32}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(29,203,255,0.18),transparent_26%),radial-gradient(circle_at_82%_68%,rgba(11,117,255,0.22),transparent_24%),linear-gradient(100deg,rgba(3,7,14,0.95)_12%,rgba(3,7,14,0.42)_48%,rgba(3,7,14,0.9)_100%)]" />

      <motion.div
        className="absolute left-[10%] top-[18%] h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(165,243,252,0.95)]"
        animate={
          isActive
            ? { y: [0, -22, 0], opacity: [0.35, 0.95, 0.35] }
            : { y: 0, opacity: 0.35 }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[14%] bottom-[16%] h-5 w-5 rounded-full border border-cyan-200/45 bg-cyan-200/10"
        animate={
          isActive
            ? { y: [0, -30, 0], x: [0, 8, 0], opacity: [0.25, 0.75, 0.25] }
            : { y: 0, x: 0, opacity: 0.25 }
        }
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(430px,0.94fr)] lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -54, y: 24, filter: "blur(10px)" }}
            animate={
              isActive
                ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -54, y: 24, filter: "blur(10px)" }
            }
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="relative max-w-2xl"
          >
            <motion.div
              className="absolute -left-6 top-8 h-24 w-24 rounded-full border border-cyan-200/20 bg-cyan-200/5 backdrop-blur-md"
              animate={
                isActive ? { y: [0, -10, 0], x: [0, 8, 0] } : { y: 0, x: 0 }
              }
              transition={{
                duration: 5.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <p className="eyebrow mb-6">{content.eyebrow}</p>
            <h1 className="section-title max-w-[11ch] text-balance text-white">
              {attraction.name}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.84, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="mt-7 text-2xl font-light text-cyan-100 md:text-[2rem]"
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
              initial={{ opacity: 0, scale: 0.88, y: 34 }}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.88, y: 34 }
              }
              transition={{ duration: 1.05, delay: 0.14, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.025, y: -8 }}
              className="group relative h-[56vh] min-h-[380px] w-[min(70vw,700px)] max-w-[640px] overflow-hidden rounded-[50%_50%_44%_44%/42%_42%_58%_58%] border border-cyan-200/20 bg-black/25 shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
            >
              <motion.div
                className="absolute inset-0"
                animate={
                  isActive
                    ? { scale: [1.03, 1.09, 1.03], y: [0, -10, 0] }
                    : { scale: 1.03, y: 0 }
                }
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/entertainment/sealife_closeup.jpg"
                  alt={attraction.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 640px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(96,232,255,0.12),transparent_38%,rgba(3,7,14,0.62)_100%)]" />
              <div className="absolute inset-[6%] rounded-[50%_50%_44%_44%/42%_42%_58%_58%] border border-cyan-100/18" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 42, y: -16 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, y: 0 }
                  : { opacity: 0, x: 42, y: -16 }
              }
              transition={{ duration: 0.9, delay: 0.38, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="absolute right-[4%] top-[8%] h-[24vh] min-h-[170px] w-[34%] min-w-[220px] overflow-hidden rounded-full border border-cyan-100/16 bg-black/25 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <Image
                src={attraction.image}
                alt={attraction.name}
                fill
                sizes="(max-width: 1024px) 40vw, 260px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(165,243,252,0.24),transparent_38%),linear-gradient(140deg,transparent_40%,rgba(56,189,248,0.22)_100%)] mix-blend-screen" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
