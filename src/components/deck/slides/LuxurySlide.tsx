"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  getBrandNames,
  getBrandLogoMap,
  getLuxuryContent,
} from "@/lib/data-service";

interface LuxurySlideProps {
  readonly isActive: boolean;
}

const brands = getBrandNames();
const brandMarquee = [
  ...brands.map((name) => ({ name, run: 0 as const })),
  ...brands.map((name) => ({ name, run: 1 as const })),
];

type SceneId = "hero" | "pillars" | "future";

const scenes: Array<{
  id: SceneId;
  label: string;
  kicker: string;
  objectPosition: string;
}> = [
  {
    id: "hero",
    label: "Signature",
    kicker: "Luxury & Premium",
    objectPosition: "50% 45%",
  },
  {
    id: "pillars",
    label: "Proposition",
    kicker: "Leasing + Development",
    objectPosition: "40% 50%",
  },
  {
    id: "future",
    label: "Future",
    kicker: "Future Expansions",
    objectPosition: "60% 50%",
  },
];

export default function LuxurySlide({ isActive }: LuxurySlideProps) {
  const content = getLuxuryContent();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  const safeSceneIndex = sceneIndex >= scenes.length ? 0 : sceneIndex;
  const activeScene = scenes[safeSceneIndex];
  const nextScene = scenes[(safeSceneIndex + 1) % scenes.length];

  const goNextScene = () => {
    setSceneIndex((current) => (current + 1) % scenes.length);
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-[var(--moa-black)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScene.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 2.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              isActive
                ? { scale: [1.02, 1.06, 1.02], x: [0, -12, 0], y: [0, 8, 0] }
                : { scale: 1.02, x: 0, y: 0 }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/luxury/ambience.png"
              alt="MoA luxury environment"
              fill
              priority
              sizes="100vw"
              quality={100}
              className="object-cover"
              style={{ objectPosition: activeScene.objectPosition }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <motion.div
            className="absolute -inset-24 opacity-70 pointer-events-none"
            animate={
              isActive ? { x: [0, 22, 0], y: [0, -14, 0] } : { x: 0, y: 0 }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(45% 55% at 20% 25%, rgba(201,168,76,0.16), transparent 60%), radial-gradient(55% 60% at 78% 35%, rgba(59,130,246,0.10), transparent 65%), radial-gradient(70% 70% at 50% 90%, rgba(255,255,255,0.05), transparent 60%)",
              filter: "blur(2px)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[url('/images/why/bg-texture.png')] bg-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full w-full">
        <div className="absolute top-0 inset-x-0 pt-10">
          <div className="max-w-[1320px] mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="h-[10px] w-[10px] rounded-full bg-[var(--gold)] shadow-[0_0_24px_rgba(201,168,76,0.45)]" />
                <p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/60">
                  {activeScene.kicker}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-3">
                {scenes.map((s, idx) => {
                  const selected = idx === safeSceneIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSceneIndex(idx)}
                      className={
                        "rounded-full px-4 py-2 border text-[0.6rem] uppercase tracking-[0.28em] transition-all duration-500 " +
                        (selected
                          ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,168,76,0.10)]"
                          : "border-white/10 text-white/55 hover:border-white/25 hover:text-white/75")
                      }
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="mt-6 overflow-hidden border-y border-white/10 py-3 relative"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.18, duration: 1.2 }}
            >
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10" />
              <motion.div
                className="flex items-center gap-16 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                {brandMarquee.map(({ name, run }) => {
                  const logo = getBrandLogoMap()[name];
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
            <AnimatePresence mode="wait">
              {activeScene.id === "hero" ? (
                <motion.div
                  key="lux-hero"
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  <motion.p
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06, duration: 0.7 }}
                  >
                    {content.eyebrow}
                  </motion.p>

                  <motion.h2
                    className="mt-5 text-[var(--moa-white)] font-extralight tracking-[-0.05em] leading-[0.95]"
                    style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)" }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.18,
                      duration: 1.2,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    {content.title}
                  </motion.h2>

                  <motion.p
                    className="mt-6 text-white/65 max-w-[60ch] leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 1.35vw, 1.2rem)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.34, duration: 1.2 }}
                  >
                    {content.subtitle}
                  </motion.p>

                  <motion.div
                    className="mt-10 flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 1.05 }}
                  >
                    {content.stats.map((s) => (
                      <div
                        key={s.lab}
                        className="glass-card rounded-full px-5 py-3 border border-white/10 bg-black/20"
                      >
                        <p className="text-gold-gradient font-light tracking-[-0.03em] text-xl leading-none">
                          {s.val}
                        </p>
                        <p className="mt-1 text-white/45 text-[0.6rem] uppercase tracking-[0.32em]">
                          {s.lab}
                        </p>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="mt-10 flex items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42, duration: 0.8 }}
                  >
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-70" />
                    <p className="text-white/40 text-[0.6rem] uppercase tracking-[0.45em]">
                      One scene at a time
                    </p>
                  </motion.div>
                </motion.div>
              ) : activeScene.id === "pillars" ? (
                <motion.div
                  key="lux-pillars"
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start"
                >
                  <div>
                    <motion.p
                      className="eyebrow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06, duration: 0.7 }}
                    >
                      {activeScene.kicker}
                    </motion.p>

                    <motion.h3
                      className="mt-5 text-[var(--moa-white)] font-extralight tracking-[-0.05em] leading-[0.98]"
                      style={{ fontSize: "clamp(2.2rem, 4.7vw, 4rem)" }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12,
                        duration: 0.9,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                    >
                      The Luxury Proposition
                    </motion.h3>

                    <motion.div
                      className="mt-7 flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      {content.pillars.map((p, i) => {
                        const selected = activePillar === i;
                        return (
                          <button
                            key={p.title}
                            type="button"
                            onClick={() => setActivePillar(i)}
                            className={
                              "rounded-full px-4 py-2 border text-[0.6rem] uppercase tracking-[0.28em] transition-all duration-500 " +
                              (selected
                                ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,168,76,0.10)]"
                                : "border-white/10 text-white/55 hover:border-white/25 hover:text-white/75")
                            }
                          >
                            {p.title}
                          </button>
                        );
                      })}
                    </motion.div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={content.pillars[activePillar]?.title ?? "pillar"}
                        initial={{ opacity: 0, x: 12, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.35,
                          ease: [0.19, 1, 0.22, 1],
                        }}
                        className="mt-8 glass-card rounded-[2px] p-7 relative overflow-hidden"
                      >
                        <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--gold-glow)] rounded-full blur-[100px] opacity-50 pointer-events-none" />
                        <p className="text-white/85 font-medium mb-2">
                          {content.pillars[activePillar]?.title}
                        </p>
                        <p className="text-[var(--moa-muted)] text-sm leading-loose max-w-[58ch]">
                          {content.pillars[activePillar]?.desc}
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                          <span className="h-px flex-1 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-60" />
                          <span className="text-white/35 text-[0.55rem] uppercase tracking-[0.4em]">
                            Tap pills to explore
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.div
                    className="glass-card rounded-[2px] overflow-hidden relative aspect-[4/5]"
                    initial={{ opacity: 0, x: 24 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.18,
                      duration: 1.0,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    <Image
                      src="/images/luxury/ambience.png"
                      alt="Luxury detail"
                      fill
                      sizes="(min-width: 1024px) 32vw, 0vw"
                      className="object-cover"
                      style={{ objectPosition: "55% 45%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-[var(--gold)]/10" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[var(--gold)] rounded-tr-[2px]" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[var(--gold)] rounded-bl-[2px]" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="lux-future"
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center"
                >
                  <div>
                    <motion.p
                      className="eyebrow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06, duration: 0.7 }}
                    >
                      {activeScene.kicker}
                    </motion.p>
                    <motion.h3
                      className="mt-5 text-[var(--moa-white)] font-extralight tracking-[-0.05em] leading-[0.98]"
                      style={{ fontSize: "clamp(2.2rem, 4.7vw, 4rem)" }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12,
                        duration: 0.9,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                    >
                      {content.pillars[2]?.title}
                    </motion.h3>
                    <motion.p
                      className="mt-6 text-white/65 max-w-[60ch] leading-relaxed"
                      style={{ fontSize: "clamp(1rem, 1.35vw, 1.15rem)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.24, duration: 0.9 }}
                    >
                      {content.pillars[2]?.desc}
                    </motion.p>

                    <motion.div
                      className="mt-8 grid grid-cols-3 gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32, duration: 0.8 }}
                    >
                      {content.stats.map((s) => (
                        <div
                          key={s.lab}
                          className="glass-card rounded-[2px] p-4 border border-white/10 bg-black/15"
                        >
                          <p className="text-gold-gradient font-light tracking-[-0.03em] text-xl leading-none">
                            {s.val}
                          </p>
                          <p className="mt-2 text-white/45 text-[0.55rem] uppercase tracking-[0.32em]">
                            {s.lab}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div
                    className="glass-card rounded-[2px] overflow-hidden relative aspect-[16/11]"
                    initial={{ opacity: 0, x: 24 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.18,
                      duration: 1.0,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    <Image
                      src="/images/luxury/ambience.png"
                      alt="Future expansion mood"
                      fill
                      sizes="(min-width: 1024px) 55vw, 0vw"
                      className="object-cover"
                      style={{ objectPosition: "60% 40%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />
                    <div className="absolute inset-0 ring-1 ring-[var(--gold)]/10" />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <p className="text-white/80 text-[0.6rem] uppercase tracking-[0.42em]">
                        Phase II vision
                      </p>
                      <div className="mt-3 h-px bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-70" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="absolute right-8 md:right-14 bottom-16 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.4, duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
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
                  {nextScene.label}
                </span>
              </span>

              <span
                className="relative grid place-items-center h-9 w-9 rounded-full border border-[var(--gold)]/35 bg-black/30"
                aria-hidden="true"
              >
                <motion.span
                  className="absolute inset-[-2px] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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

        <div className="absolute left-8 md:left-14 bottom-16 z-20 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.9 }}
            className="flex items-center gap-3"
          >
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
              Scene
            </span>
            <span className="text-white/70 text-[0.7rem] tabular-nums tracking-[0.25em]">
              {String(safeSceneIndex + 1).padStart(2, "0")} /{" "}
              {String(scenes.length).padStart(2, "0")}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
