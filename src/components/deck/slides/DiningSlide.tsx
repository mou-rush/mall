"use client";
import { motion } from "framer-motion";
import { DINING_CATEGORIES, LIFESTYLE_METRICS } from "@/lib/constants";

interface DiningSlideProps {
  readonly isActive: boolean;
}

export default function DiningSlide({ isActive }: DiningSlideProps) {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-dark)]">
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Dining &amp; Lifestyle
            </motion.p>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              Stay Longer. Spend More.
            </motion.h2>
          </div>
          <motion.p
            className="text-[var(--moa-muted)] max-w-sm text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dining and lifestyle experiences drive our industry-leading dwell
            time. Retail benefits from being inside that experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {DINING_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="glass-card group p-5 rounded-[2px]
                           hover:border-[rgba(201,168,76,0.4)] transition-all
                           duration-500 cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                  <h3 className="text-[var(--moa-white)] font-medium text-sm">
                    {cat.title}
                  </h3>
                  <span className="eyebrow text-[0.5rem] px-2 py-0.5 bg-[var(--gold-glow)] border border-[var(--gold)] rounded-full ml-auto">
                    {cat.count}
                  </span>
                </div>
                <p className="text-[var(--moa-muted)] text-xs leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-card rounded-[2px] p-6"
        >
          <p className="eyebrow mb-6 text-center text-[0.55rem]">
            Engagement Metrics
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {LIFESTYLE_METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <p
                  className="text-gold-gradient font-thin mb-1"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {m.value}
                </p>
                <p className="text-[var(--moa-muted)] text-[0.6rem] tracking-wider uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
