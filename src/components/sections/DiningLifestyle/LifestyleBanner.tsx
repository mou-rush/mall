"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LIFESTYLE_METRICS } from "@/lib/constants";

export default function LifestyleBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const metrics = LIFESTYLE_METRICS;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.9 }}
      className="mt-16 glass-card rounded-[2px] p-8 lg:p-12 
                 bg-gradient-to-br from-[var(--moa-surface)] to-[var(--moa-card)]"
    >
      <p className="eyebrow mb-8 text-center">Engagement Metrics</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            className="text-center"
          >
            <p
              className="text-gold-gradient font-thin mb-2"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {m.value}
            </p>
            <p className="text-[var(--moa-muted)] text-xs tracking-wider uppercase">
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
