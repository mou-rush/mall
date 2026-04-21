"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { LEASING_DEVELOPMENT } from "@/lib/moa-website-content";

interface RetailSlideProps {
  readonly isActive: boolean;
}

export default function RetailSlide({ isActive }: RetailSlideProps) {
  const scenes = useMemo(() => LEASING_DEVELOPMENT.retail.scenes, []);

  const scene = scenes[0];

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black/75 to-transparent" />
      </motion.div>

      <div className="relative z-10 h-full w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1320px] mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene?.id ?? "scene"}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                >
                  <motion.p
                    className="eyebrow mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.6 }}
                  >
                    Leasing Opportunity
                  </motion.p>

                  <motion.h2
                    className="section-title mb-6 whitespace-pre-line"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12,
                      duration: 0.8,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    {scene?.headline ?? ""}
                  </motion.h2>

                  <motion.p
                    className="text-[var(--moa-muted)] leading-relaxed max-w-[58ch]"
                    style={{ fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.22, duration: 0.8 }}
                  >
                    {scene?.body ?? ""}
                  </motion.p>

                  <motion.div
                    className="mt-8 flex gap-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {(scene?.stats ?? []).map((s) => (
                      <div key={s.lab}>
                        <p className="text-gold-gradient font-thin text-3xl tracking-tight">
                          {s.val}
                        </p>
                        <p className="text-white/40 text-[0.6rem] tracking-wider uppercase">
                          {s.lab}
                        </p>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="mt-8 flex items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42, duration: 0.8 }}
                  >
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-70" />
                    <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
                      Select a scene
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.55,
                    duration: 1.0,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="relative"
                >
                  <motion.div
                    className="relative h-[340px] rounded-[2px] overflow-hidden border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <Image
                      src="/images/retail/leasing_opportunity_1.jpg"
                      alt="Retail scene"
                      fill
                      sizes="(min-width: 1024px) 40vw, 0vw"
                      className="object-cover"
                      style={{
                        objectPosition: scene?.imagePosition ?? "50% 45%",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-10 -left-12 w-[70%] h-[210px] rounded-[2px] overflow-hidden border border-white/10 bg-black/20 shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 0.85,
                      duration: 1.0,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    whileHover={{ y: -6, x: 4 }}
                  >
                    <Image
                      src="/images/retail/flagship.png"
                      alt="Retail detail"
                      fill
                      sizes="(min-width: 1024px) 28vw, 0vw"
                      className="object-cover"
                      style={{ objectPosition: "25% 65%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />
                    <div className="absolute inset-0 ring-1 ring-[var(--gold)]/10" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
