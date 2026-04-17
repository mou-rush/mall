"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { IconComponent } from "@/lib/types";

interface EventCategoryCardProps {
  icon: IconComponent;
  title: string;
  scale: string;
  examples: string[];
  index: number;
}

export default function EventCategoryCard({
  icon: Icon,
  title,
  scale,
  examples,
  index,
}: Readonly<EventCategoryCardProps>) {
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
      className="glass-card group p-7 rounded-[2px] hover:border-[var(--gold)] 
                 transition-all duration-500 relative overflow-hidden cursor-default"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--gold-glow)] to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-[var(--gold)]">
            <Icon className="w-6 h-6" />
          </span>
          <span className="eyebrow text-[0.58rem] text-[var(--moa-muted)] text-right leading-tight max-w-[120px]">
            {scale}
          </span>
        </div>

        <h3 className="text-[var(--moa-white)] font-medium mb-4">{title}</h3>

        <ul className="space-y-1">
          {examples.map((ex) => (
            <li
              key={ex}
              className="flex items-center gap-2 text-[var(--moa-muted)] text-xs"
            >
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] flex-shrink-0" />
              {ex}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
