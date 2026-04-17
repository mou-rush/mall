"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RetailCardProps {
  title: string;
  body: string;
  tag: string;
  index: number;
}

export default function RetailCard({
  title,
  body,
  tag,
  index,
}: Readonly<RetailCardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="glass-card group p-8 lg:p-10 rounded-[2px] 
                 hover:border-[var(--gold)] transition-all duration-500 
                 relative overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--gold-glow)] to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <div className="relative z-10">
        <span
          className="eyebrow text-[0.6rem] mb-4 inline-block px-3 py-1 
                         border border-[var(--gold)] rounded-full text-[var(--gold)]"
        >
          {tag}
        </span>
        <h3 className="text-[var(--moa-white)] font-medium text-xl mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-[var(--moa-muted)] leading-loose text-sm">{body}</p>
      </div>
    </motion.div>
  );
}
