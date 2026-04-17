"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EVENTS_TIMELINE } from "@/lib/constants";

export default function EventTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const phases = EVENTS_TIMELINE;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      <p className="eyebrow mb-10 text-center">How It Works</p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">
        <div
          className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] 
                        bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
        />

        {phases.map((ph, i) => (
          <motion.div
            key={ph.step}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
            className="relative flex flex-col items-center text-center px-3 pt-4"
          >
            <div
              className="w-16 h-16 rounded-full border border-[var(--gold)] 
                            flex items-center justify-center mb-4 relative z-10
                            bg-[var(--moa-black)] group-hover:bg-[var(--gold-glow)]
                            transition-colors duration-300"
            >
              <span className="eyebrow text-[var(--gold)]">{ph.step}</span>
            </div>

            <h4 className="text-[var(--moa-white)] font-medium text-sm mb-2">
              {ph.title}
            </h4>
            <p className="text-[var(--moa-muted)] text-xs leading-loose">
              {ph.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
