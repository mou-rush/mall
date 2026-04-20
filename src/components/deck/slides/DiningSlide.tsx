"use client";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ComponentType } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LuChefHat,
  LuCoffee,
  LuPause,
  LuSparkles,
  LuUtensilsCrossed,
} from "react-icons/lu";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { VIDEOS } from "@/lib/constants";
import AnimatedText from "@/components/ui/AnimatedText";

interface DiningSlideProps {
  readonly isActive: boolean;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function DiningImageSlider({
  isActive,
  images,
}: {
  readonly isActive: boolean;
  readonly images: ReadonlyArray<string>;
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const lastWheelAt = useRef(0);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (safeImages.length === 0) return;
      setIndex(mod(nextIndex, safeImages.length));
    },
    [safeImages.length],
  );

  const next = useCallback(() => {
    setDirection(1);
    goTo(index + 1);
  }, [goTo, index]);

  const prev = useCallback(() => {
    setDirection(-1);
    goTo(index - 1);
  }, [goTo, index]);

  useEffect(() => {
    if (!isActive) return;
    if (paused) return;
    if (safeImages.length <= 1) return;

    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((cur) => mod(cur + 1, safeImages.length));
    }, 3500);

    return () => window.clearInterval(id);
  }, [isActive, paused, safeImages.length]);

  const slideVariants: Variants = {
    enter: (dir: 1 | -1) => ({
      opacity: 0,
      x: dir * 20,
      scale: 1.01,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: 1 | -1) => ({
      opacity: 0,
      x: dir * -20,
      scale: 0.99,
    }),
  };

  const activeSrc = safeImages[index];

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation();
      const now = Date.now();
      if (now - lastWheelAt.current < 420) return;

      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;

      lastWheelAt.current = now;
      setPaused(true);
      if (delta > 0) next();
      else prev();
    },
    [next, prev],
  );

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: 28, filter: "blur(6px)" }}
        animate={
          isActive
            ? { opacity: 1, x: 0, filter: "blur(0px)" }
            : { opacity: 0, x: 28, filter: "blur(6px)" }
        }
        transition={{ delay: 0.45, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="glass-card rounded-3xl border-white/10 overflow-hidden"
        onWheel={onWheel}
        onMouseEnter={() => setPaused(true)}
      >
        <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
          <AnimatePresence mode="sync" initial={false} custom={direction}>
            <motion.div
              key={activeSrc}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              drag={safeImages.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (safeImages.length <= 1) return;
                const swipe = info.offset.x + info.velocity.x * 0.12;
                if (swipe < -90) next();
                else if (swipe > 90) prev();
              }}
            >
              {activeSrc ? (
                <Image
                  src={activeSrc}
                  alt="Dining slide"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover"
                  draggable={false}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10" />
            </motion.div>
          </AnimatePresence>

          {!paused ? (
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 backdrop-blur-xl px-3 py-2 text-xs text-white/80 hover:border-[rgba(201,168,76,0.35)] transition"
                onClick={() => setPaused(true)}
                aria-label="Pause slideshow"
              >
                <LuPause className="w-4 h-4 text-[var(--gold)]" />
              </button>
            </div>
          ) : null}

          {safeImages.length > 1 ? (
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {safeImages.slice(0, 8).map((src) => {
                    const dotIndex = safeImages.indexOf(src);
                    const active = dotIndex === index;
                    return (
                      <button
                        key={src}
                        type="button"
                        className={
                          "h-2.5 rounded-full transition-all " +
                          (active
                            ? "w-8 bg-[var(--gold)]"
                            : "w-2.5 bg-white/25 hover:bg-white/40")
                        }
                        onClick={() => {
                          setPaused(true);
                          setDirection(dotIndex > index ? 1 : -1);
                          goTo(dotIndex);
                        }}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    );
                  })}
                </div>

                <span className="text-[0.65rem] tracking-[0.18em] uppercase text-white/55 tabular-nums">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(safeImages.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export default function DiningSlide({ isActive }: DiningSlideProps) {
  const content = DECK_WEBSITE_CONTENT.dining;

  const iconById: Record<string, ComponentType<{ className?: string }>> = {
    "full-service": LuChefHat,
    "food-court": LuUtensilsCrossed,
    "coffee-tea": LuCoffee,
    sweets: LuSparkles,
    "fast-casual": LuUtensilsCrossed,
    breakfast: LuCoffee,
  };

  const galleryImages: ReadonlyArray<string> = [
    "/images/Dinning/dinning_JambaJuice.jpg",
    "/images/Dinning/dinning_a&w.png",
    "/images/Dinning/dinning_buffalo_wings.jpg",
    "/images/Dinning/dinning_cedarstone.jpg",
    "/images/Dinning/dinning_Chipotle.png",
    "/images/Dinning/dinning_firelakehero_.png",
    "/images/Dinning/dinning_OPA.jpg",
    "/images/Dinning/Dinning_surefit.png",
    "/images/Dinning/dunkin_donuts.jpg",
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <CinematicBackground
        isActive={isActive}
        imageSrc="/images/Dinning/Dinning_Cover.jpg"
        videoSrc={VIDEOS.hero}
        overlayOpacity={0.22}
        variant="gold"
      />

      <div className="relative z-10 h-full w-full">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 h-full items-center">
            <div className="relative">
              <motion.p
                className="eyebrow mb-6"
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 12, filter: "blur(4px)" }
                }
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              >
                {content.eyebrow}
              </motion.p>

              <AnimatedText
                text={content.title}
                el="h2"
                className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white leading-[1.02]"
                variant="words"
                delay={0.05}
              />

              <motion.p
                className="mt-6 text-white/70 max-w-xl text-lg md:text-xl font-light leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{
                  delay: 0.35,
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                {content.subtitle}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={
                  isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                transition={{
                  delay: 0.55,
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                {content.categories.slice(0, 6).map((cat, i) => {
                  const Icon = iconById[cat.id] ?? LuUtensilsCrossed;
                  return (
                    <motion.div
                      key={cat.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.6 }}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 backdrop-blur-xl px-4 py-2"
                    >
                      <Icon className="w-4 h-4 text-[var(--gold)]" />
                      <span className="text-xs text-white/80 tracking-wide">
                        {cat.title}
                      </span>
                      {cat.tag ? (
                        <span className="ml-1 text-[0.6rem] uppercase tracking-[0.22em] text-white/45">
                          {cat.tag}
                        </span>
                      ) : null}
                      <span className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-[var(--gold)]/20 via-transparent to-[var(--gold)]/20" />
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  delay: 1.05,
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="mt-12"
              >
                <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-white/10">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/50 mb-2">
                      Featured Restaurant
                    </p>
                    <p className="text-white text-2xl md:text-3xl font-extralight tracking-tight">
                      {content.featured.name}
                    </p>
                    <p className="text-white/55 text-xs tracking-[0.18em] uppercase mt-2">
                      {content.featured.location}
                    </p>
                  </div>
                  <a
                    href={content.featured.link.href}
                    className="btn-outline whitespace-nowrap"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.featured.link.label}
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <DiningImageSlider isActive={isActive} images={galleryImages} />

              <motion.div
                className="absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[var(--gold)]/6 blur-[120px] pointer-events-none"
                animate={
                  isActive
                    ? { scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }
                    : { scale: 1, opacity: 0.2 }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
