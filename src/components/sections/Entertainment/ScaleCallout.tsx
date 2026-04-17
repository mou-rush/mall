"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScaleCallout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.9 }}
      className="mt-20 text-center"
    >
      <motion.p
        className="text-gold-gradient font-thin leading-none mb-4"
        style={{
          fontSize: "clamp(5rem, 15vw, 14rem)",
          letterSpacing: "-0.06em",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.9 }}
      >
        20M+
      </motion.p>
      <p className="text-[var(--moa-muted)] text-sm tracking-[0.2em] uppercase font-medium mb-2">
        Entertainment-Specific Visits Annually
      </p>
      <p className="text-[var(--moa-muted)] text-xs max-w-xs mx-auto opacity-60">
        Guests who visit exclusively for our attractions — not counting general
        shoppers
      </p>
    </motion.div>
  );
}
