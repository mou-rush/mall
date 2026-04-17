"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { IconComponent } from "@/lib/types";

interface DiningCardProps {
  icon: IconComponent;
  title: string;
  count: string;
  desc: string;
  index: number;
}

export default function DiningCard({
  icon: Icon,
  title,
  count,
  desc,
  index,
}: Readonly<DiningCardProps>) {
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
      className="glass-card group p-8 rounded-[2px] relative overflow-hidden 
                 hover:border-[rgba(201,168,76,0.4)] transition-all duration-500 
                 cursor-default"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--gold-glow),transparent_70%)] 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <div className="relative z-10">
        <div
          className="mb-5 transform group-hover:scale-110 
                        transition-transform duration-300 origin-left"
        >
          <Icon className="w-7 h-7 text-[var(--gold)]" />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-[var(--moa-white)] font-medium">{title}</h3>
          <span
            className="eyebrow text-[0.58rem] px-2 py-0.5 
                           bg-[var(--gold-glow)] border border-[var(--gold)] rounded-full"
          >
            {count}
          </span>
        </div>

        <p className="text-[var(--moa-muted)] text-sm leading-loose">{desc}</p>
      </div>
    </motion.div>
  );
}
