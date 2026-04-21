"use client";

import CinematicBackground from "@/components/ui/CinematicBackground";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { getEntertainmentContent } from "@/lib/data-service";
import { motion } from "framer-motion";
import Image from "next/image";

interface SlideProps {
  readonly isActive: boolean;
}

export default function EntertainmentNickelodeonSlide({
  isActive,
}: SlideProps) {
  const content = getEntertainmentContent();
  const attraction = content.items[0];

  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[#06060a]">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/entertainment/nickelodeon_1.jpg"
        variant="noir"
        overlayOpacity={0.3}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_34%,rgba(255,199,44,0.28),transparent_24%),radial-gradient(circle_at_72%_22%,rgba(0,214,255,0.18),transparent_22%),linear-gradient(100deg,rgba(4,6,12,0.92)_12%,rgba(4,6,12,0.36)_50%,rgba(4,6,12,0.88)_100%)]" />

      <motion.div
        className="absolute left-[7%] bottom-[10%] h-[14rem] w-[14rem] rounded-full bg-[radial-gradient(circle,rgba(255,199,44,0.22),rgba(255,199,44,0.04)_52%,transparent_72%)] blur-3xl"
        animate={
          isActive ? { scale: [1, 1.08, 1], x: [0, 18, 0] } : { scale: 1, x: 0 }
        }
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(460px,0.96fr)] lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -54, y: 26, filter: "blur(10px)" }}
            animate={
              isActive
                ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                : { opacity: 0, x: -54, y: 26, filter: "blur(10px)" }
            }
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="relative max-w-2xl"
          >
            <motion.div
              className="absolute -left-4 top-14 h-20 w-20 rounded-full border border-[#ffc72c]/35 bg-[#ffc72c]/8"
              animate={
                isActive
                  ? { y: [0, -12, 0], scale: [1, 1.04, 1] }
                  : { y: 0, scale: 1 }
              }
              transition={{
                duration: 4.2,
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
              transition={{ duration: 0.86, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="mt-7 text-2xl font-light text-[#ffd35c] md:text-[2rem]"
            >
              {attraction.headline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/72 md:text-xl"
            >
              {attraction.desc}
            </motion.p>
          </motion.div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: -4, y: 34 }}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, rotate: -2, y: 0 }
                  : { opacity: 0, scale: 0.88, rotate: -4, y: 34 }
              }
              transition={{ duration: 1.05, delay: 0.16, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.025, rotate: -1, y: -8 }}
              className="group relative h-[58vh] min-h-[380px] w-[min(76vw,760px)] max-w-[720px] overflow-hidden rounded-[2.4rem] border border-white/14 bg-black/30 shadow-[0_42px_130px_rgba(0,0,0,0.65)] backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 opacity-80"
                animate={
                  isActive
                    ? {
                        background: [
                          "linear-gradient(135deg, rgba(255,199,44,0.18), rgba(255,199,44,0.02) 35%, rgba(39,201,255,0.14) 100%)",
                          "linear-gradient(135deg, rgba(39,201,255,0.16), rgba(255,199,44,0.04) 35%, rgba(255,199,44,0.18) 100%)",
                          "linear-gradient(135deg, rgba(255,199,44,0.18), rgba(255,199,44,0.02) 35%, rgba(39,201,255,0.14) 100%)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.video
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                src="/videos/Nickel.mp4"
                poster={attraction.image}
                autoPlay
                muted
                loop
                playsInline
                animate={
                  isActive ? { scale: [1.01, 1.05, 1.01] } : { scale: 1.01 }
                }
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,199,44,0.04),transparent_28%,rgba(5,6,12,0.48)_66%,rgba(5,6,12,0.78)_100%)]" />

              <motion.div
                className="absolute inset-y-[8%] left-[6%] w-[18%] rounded-full border border-white/12 bg-white/6 backdrop-blur-md"
                animate={
                  isActive
                    ? { x: [0, 8, 0], opacity: [0.24, 0.38, 0.24] }
                    : { x: 0, opacity: 0.24 }
                }
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48, y: 28, rotate: 7 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, y: 0, rotate: 6 }
                  : { opacity: 0, x: 48, y: 28, rotate: 7 }
              }
              transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.04, rotate: 4, y: -8 }}
              className="absolute -bottom-2 left-[2%] h-[22vh] min-h-[150px] w-[34%] min-w-[220px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/25 shadow-[0_26px_70px_rgba(0,0,0,0.5)]"
            >
              <Image
                src={attraction.image}
                alt="Nickelodeon"
                fill
                sizes="(max-width: 1024px) 40vw, 250px"
                className="object-cover"
                quality={100}
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,199,44,0.24),transparent_45%,rgba(0,214,255,0.18)_100%)] mix-blend-screen" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
