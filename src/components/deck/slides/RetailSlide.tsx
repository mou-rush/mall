"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { getLeasingContent } from "@/lib/data-service";

interface RetailSlideProps {
  readonly isActive: boolean;
}

export default function RetailSlide({ isActive }: RetailSlideProps) {
  const scenes = getLeasingContent().retail.scenes;

  const [sceneIndex, setSceneIndex] = useState(0);
  const safeSceneIndex = sceneIndex >= scenes.length ? 0 : sceneIndex;
  const scene = scenes[safeSceneIndex] ?? scenes[0];

  const goNextScene = () => {
    setSceneIndex((current) => {
      const base = current >= scenes.length ? 0 : current;
      const next = base + 1;
      return next >= scenes.length ? 0 : next;
    });
  };

  const nextScene = scenes.length
    ? scenes[(safeSceneIndex + 1) % scenes.length]
    : undefined;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <Image
          src="/images/retail/flagship.png"
          alt="Retail flagship opportunity at Mall of America"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover"
          style={{ objectPosition: scene?.imagePosition ?? "50% 45%" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black/75 to-transparent" />
      </motion.div>

      <div className="absolute left-10 md:left-14 top-24 bottom-20 z-20 flex items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="pointer-events-auto glass-card rounded-[22px] border border-white/10 bg-black/25 backdrop-blur-xl px-4 py-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
          aria-label="Retail sub-slides"
        >
          <div className="mb-5 px-2">
            <p className="text-[0.55rem] uppercase tracking-[0.45em] text-[var(--gold)]/80">
              Retail
            </p>
            <p className="text-white/90 text-[0.7rem] uppercase tracking-[0.35em]">
              Scenes
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {scenes.map((s, i) => {
              const active = i === safeSceneIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSceneIndex(i)}
                  className={
                    "group flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-500 " +
                    (active
                      ? "bg-white/[0.06] border border-white/10"
                      : "hover:bg-white/[0.05] border border-transparent")
                  }
                >
                  <span
                    className={
                      "h-2 w-2 rounded-full transition-all duration-500 " +
                      (active
                        ? "bg-[var(--gold)] shadow-[0_0_16px_rgba(201,168,76,0.55)]"
                        : "bg-white/20 group-hover:bg-white/35")
                    }
                    aria-hidden="true"
                  />

                  <span className="text-left">
                    <span
                      className={
                        "block text-[0.55rem] uppercase tracking-[0.32em] transition-colors duration-500 " +
                        (active
                          ? "text-[var(--gold)]/90"
                          : "text-white/50 group-hover:text-white/70")
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        "block text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-500 " +
                        (active
                          ? "text-white/95"
                          : "text-white/65 group-hover:text-white/85")
                      }
                    >
                      {s.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

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
                    {scene?.eyebrow ?? "Leasing + Development"}
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
                      src="/images/retail/flagship.png"
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

        <div className="absolute left-10 md:left-14 bottom-16 z-20 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="flex items-center gap-3"
          >
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
              Scene
            </span>
            <span className="text-white/70 text-[0.7rem] tabular-nums tracking-[0.25em]">
              {String(scenes.length ? safeSceneIndex + 1 : 0).padStart(2, "0")}{" "}
              / {String(scenes.length).padStart(2, "0")}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute right-8 md:right-14 bottom-16 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.75, duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.button
          type="button"
          onClick={goNextScene}
          disabled={!isActive}
          className={
            "group relative overflow-hidden rounded-full border border-white/15 bg-black/25 backdrop-blur-xl px-5 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.35)] transition-opacity " +
            (isActive ? "opacity-100" : "opacity-0 pointer-events-none")
          }
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          aria-label="Next scene"
        >
          {/* sweep */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <span className="absolute -left-1/2 top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.span>

          <span className="relative flex items-center gap-4">
            <span className="flex flex-col text-left">
              <span className="text-[0.55rem] uppercase tracking-[0.38em] text-white/45">
                Next Scene
              </span>
              <span className="text-[0.75rem] uppercase tracking-[0.22em] text-white/90">
                {nextScene?.label ?? ""}
              </span>
            </span>

            <span
              className="relative grid place-items-center h-9 w-9 rounded-full border border-[var(--gold)]/35 bg-black/30"
              aria-hidden="true"
            >
              <motion.span
                className="absolute inset-[-2px] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(201,168,76,0.0), rgba(201,168,76,0.45), rgba(201,168,76,0.0))",
                }}
              />
              <span className="relative text-[var(--gold)] text-sm leading-none">
                →
              </span>
            </span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
