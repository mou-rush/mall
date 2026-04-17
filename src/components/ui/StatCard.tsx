"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatCardProps {
  value: string;
  label: string;
  sub?: string;
  index?: number;
}

export default function StatCard({
  value,
  label,
  sub,
  index = 0,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="glass-card group relative p-8 rounded-[2px] cursor-default
                 hover:border-[var(--gold)] transition-all duration-500
                 hover:bg-[rgba(201,168,76,0.04)]"
    >
      <span
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent 
                   via-[var(--gold)] to-transparent opacity-0 group-hover:opacity-100 
                   transition-opacity duration-500"
      />

      <motion.p
        className="stat-num text-gold-gradient mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          delay: index * 0.1 + 0.2,
          duration: 0.6,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        {value}
      </motion.p>

      <p className="text-[var(--moa-white)] font-medium text-base mb-2 leading-snug">
        {label}
      </p>

      {sub && (
        <p className="text-[var(--moa-muted)] text-sm leading-relaxed">{sub}</p>
      )}
    </motion.div>
  );
}
