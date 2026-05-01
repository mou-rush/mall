"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import VideoBackground from "@/components/ui/VideoBackground";

interface EntryScreenProps {
  readonly onEnter: () => void;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

const ENTRY_STATS = [
  { end: 40, suffix: "M+", label: "Annual Visitors" },
  { end: 2, suffix: "B+", label: "Annual Sales" },
  { end: 1, suffix: "", label: "US Destination", prefix: "#" },
];

// 14 ambient particles
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${5 + i * 6.5}%`,
  dur: `${7 + (i % 4)}s`,
  delay: `${i * 0.45}s`,
  size: i % 3 === 0 ? 3 : 2,
}));

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const [enterClicked, setEnterClicked] = useState(false);
  const stat0 = useRef<HTMLSpanElement>(null);
  const stat1 = useRef<HTMLSpanElement>(null);
  const stat2 = useRef<HTMLSpanElement>(null);
  const statRefs = [stat0, stat1, stat2];

  // GSAP stat counters — start after curtain finishes (~2.2s)
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    ENTRY_STATS.forEach((s, i) => {
      const el = statRefs[i].current;
      if (!el) return;
      const obj = { val: 0 };
      const t = setTimeout(() => {
        gsap.to(obj, {
          val: s.end,
          duration: 1.8,
          delay: i * 0.2,
          ease: "power3.out",
          onUpdate() {
            const v = Math.round(obj.val);
            el.textContent = `${s.prefix ?? ""}${v}${s.suffix}`;
          },
        });
      }, 2200);
      timers.push(t);
    });
    return () => {
      timers.forEach(clearTimeout);
      gsap.globalTimeline.clear(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = () => {
    if (enterClicked) return;
    setEnterClicked(true);
    // Brief curtain then call onEnter
    setTimeout(onEnter, 520);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--moa-black)] overflow-hidden">
      <VideoBackground
        src="/videos/mall_2.mp4"
        overlayOpacity={0.1}
        overlayColor="6,6,8"
      />

      {/* Ambient particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: p.left,
              bottom: 0,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "var(--gold)",
              borderRadius: "50%",
              // CSS custom props used by @keyframes particle-rise / particle-drift
              ["--dur" as string]: p.dur,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[rgba(6,6,8,0.85)] to-transparent z-10 pointer-events-none" />

      {/* Vertical open curtains */}
      <motion.div
        className="absolute top-0 inset-x-0 bg-[var(--moa-black)] z-20 pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ delay: 0.1, duration: 1.4, ease: EASE }}
      />
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-[var(--moa-black)] z-20 pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ delay: 0.1, duration: 1.4, ease: EASE }}
      />

      {/* Horizontal exit curtain on click */}
      <AnimatePresence>
        {enterClicked && (
          <>
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-[var(--gold)] z-[90] pointer-events-none"
              initial={{ width: 0 }}
              animate={{ width: "50vw" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="absolute top-0 bottom-0 right-0 bg-[var(--gold)] z-[90] pointer-events-none"
              initial={{ width: 0 }}
              animate={{ width: "50vw" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="overflow-hidden">
            <motion.h1
              className="font-extralight tracking-[-0.03em] leading-[0.9] text-[var(--moa-white)]"
              style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 1.05, duration: 1.25, ease: EASE }}
            >
              Mall of
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="text-gold-gradient font-thin leading-[0.9]"
              style={{
                fontSize: "clamp(4rem, 12vw, 11rem)",
                letterSpacing: "-0.03em",
                paddingBottom: "0.14em",
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 1.28, duration: 1.25, ease: EASE }}
            >
              America
            </motion.h1>
          </div>
        </div>

        <motion.div
          className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{ width: "clamp(120px, 20vw, 260px)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.1, duration: 1.15, ease: EASE }}
        />

        {/* Stat counters */}
        <motion.div
          className="mt-12 flex gap-12 md:gap-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1.0, ease: EASE }}
        >
          {ENTRY_STATS.map((s, i) => (
            <div key={s.label} className="text-center">
              <div
                className="font-extralight text-[var(--gold)]"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span ref={statRefs[i]}>
                  {s.prefix ?? ""}0{s.suffix}
                </span>
              </div>
              <p className="mt-1 text-[0.55rem] tracking-[0.22em] uppercase text-white/45 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Enter button */}
      <div className="absolute bottom-10 inset-x-0 z-30 flex flex-col items-center gap-3">
        <motion.button
          onClick={handleEnter}
          disabled={enterClicked}
          className="group relative inline-flex items-center gap-3 px-10 py-4
                     border border-[var(--gold)] rounded-[2px] text-[var(--gold)]
                     text-sm font-semibold tracking-[0.2em] uppercase
                     overflow-hidden transition-colors duration-500
                     hover:text-[var(--moa-black)] cursor-pointer disabled:opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 bg-[var(--gold)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10">Enter</span>
        </motion.button>
      </div>
    </div>
  );
}
