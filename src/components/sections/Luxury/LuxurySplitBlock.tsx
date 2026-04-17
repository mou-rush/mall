"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { LUXURY_PILLARS } from "@/lib/constants";

export default function LuxurySplitBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const pillars = LUXURY_PILLARS;

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="glass-card rounded-[2px] aspect-[4/3] relative overflow-hidden"
      >
        <Image
          src="/images/luxury/ambience.png"
          alt="MoA luxury retail environment"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />

        <div
          className="absolute top-0 right-0 w-16 h-16 
                        border-t border-r border-[var(--gold)] rounded-tr-[2px]"
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16 
                        border-b border-l border-[var(--gold)] rounded-bl-[2px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        <p className="eyebrow mb-6">The Luxury Proposition</p>
        <div className="space-y-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
              className="pl-6 border-l border-[var(--gold)] border-opacity-30 
                         hover:border-opacity-100 transition-all duration-300"
            >
              <h4 className="text-[var(--moa-white)] font-medium mb-2">
                {p.title}
              </h4>
              <p className="text-[var(--moa-muted)] text-sm leading-loose">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
