"use client";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { parseNumeric } from "@/lib/utils";

interface WhySlideProps {
  readonly isActive: boolean;
}

function AnimatedStat({
  value,
  label,
  sub,
  index,
  active,
}: Readonly<{
  value: string;
  label: string;
  sub?: string;
  index: number;
  active: boolean;
}>) {
  const { num, prefix, suffix } = parseNumeric(value);
  const count = useCountUp(num, 2000, active);
  const display =
    num % 1 === 0 ? Math.round(count).toString() : count.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="glass-card p-6 rounded-[2px] hover:border-[var(--gold)]
                 transition-all duration-500 group cursor-default"
    >
      <p className="stat-num text-gold-gradient mb-2 !text-[clamp(2rem,4.5vw,4.5rem)]">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="text-[var(--moa-white)] font-medium text-sm mb-1">
        {label}
      </p>
      {sub && (
        <p className="text-[var(--moa-muted)] text-xs leading-relaxed">{sub}</p>
      )}
    </motion.div>
  );
}

export default function WhySlide({ isActive }: WhySlideProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[var(--moa-black)]">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/images/why/bg-texture.png')] bg-cover" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="mb-10">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Numbers Don&rsquo;t Lie
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              className="section-title max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              Why This Property
            </motion.h2>

            <motion.p
              className="text-[var(--moa-muted)] leading-relaxed max-w-md lg:text-right text-sm"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              No other property delivers this concentration of foot traffic,
              brand diversity, and repeat visitation.
            </motion.p>
          </div>

          <motion.div
            className="mt-6 h-[1px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isActive ? { scaleX: 1 } : {}}
            transition={{
              delay: 0.4,
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
            }}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              {...stat}
              index={i}
              active={isActive}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 glass-card rounded-[2px] p-6 lg:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--gold-glow)] rounded-full blur-[80px] pointer-events-none" />
          <blockquote
            className="font-extralight text-[var(--moa-white)] leading-snug relative z-10"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.4rem)" }}
          >
            &ldquo;Mall of America draws more visitors annually than Walt Disney
            World, Disneyland, and the Grand Canyon{" "}
            <span className="text-gold-gradient">combined</span>.&rdquo;
          </blockquote>
          <p className="mt-3 text-[var(--moa-muted)] text-xs tracking-wider relative z-10">
            — Retail Market Intelligence, 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}
