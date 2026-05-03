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

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const [enterClicked, setEnterClicked] = useState(false);
  const stat0 = useRef<HTMLSpanElement>(null);
  const stat1 = useRef<HTMLSpanElement>(null);
  const stat2 = useRef<HTMLSpanElement>(null);
  const statRefs = [stat0, stat1, stat2];

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
    setTimeout(onEnter, 520);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--moa-black)] overflow-hidden">
      <VideoBackground
        src="/videos/moa_logo_video_reveal.mp4"
        overlayOpacity={0.1}
        overlayColor="6,6,8"
        loop={false}
      />

      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[rgba(6,6,8,0.85)] to-transparent z-10 pointer-events-none" />

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

      <div className="absolute bottom-10 inset-x-0 z-30 flex flex-col items-center gap-3">
        <motion.button
          onClick={handleEnter}
          disabled={enterClicked}
          className="group relative inline-flex items-center gap-3 px-10 py-4
               bg-[var(--gold)] rounded-[2px] text-[var(--moa-black)]
               text-sm font-semibold tracking-[0.2em] uppercase
               overflow-hidden transition-colors duration-300
               disabled:opacity-50 disabled:cursor-not-allowed
               enabled:hover:text-white enabled:cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
          whileHover={!enterClicked ? { scale: 1.02 } : {}}
          whileTap={!enterClicked ? { scale: 0.98 } : {}}
        >
          <span className="relative z-10">Enter</span>
        </motion.button>
      </div>
    </div>
  );
}
