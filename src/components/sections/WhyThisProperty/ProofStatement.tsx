"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProofStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="mt-20 glass-card rounded-[2px] p-10 lg:p-16 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-glow)] 
                      rounded-full blur-[100px] pointer-events-none"
      />

      <p className="eyebrow mb-6">The Competitive Moat</p>
      <blockquote
        className="font-extralight leading-tight tracking-[-0.02em] 
                   text-[var(--moa-white)] max-w-4xl"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}
      >
        &ldquo;Mall of America draws more visitors annually than Walt Disney
        World, Disneyland, and the Grand Canyon{" "}
        <span className="text-gold-gradient">combined</span> — making it the
        single most powerful brick-and-mortar address in the United
        States.&rdquo;
      </blockquote>
      <p className="mt-6 text-[var(--moa-muted)] text-sm tracking-wider">
        — Retail Market Intelligence, 2024
      </p>
    </motion.div>
  );
}
