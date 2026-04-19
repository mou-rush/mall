"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { parseNumeric } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { LEASING_DEVELOPMENT } from "@/lib/moa-website-content";

interface WhySlideProps {
  readonly isActive: boolean;
}

function FeaturedStat({
  value,
  label,
  sub,
  active,
}: Readonly<{
  value: string;
  label: string;
  sub?: string;
  active: boolean;
}>) {
  const { num, prefix, suffix } = parseNumeric(value);
  const count = useCountUp(num, 1600, active);
  const display =
    num % 1 === 0 ? Math.round(count).toString() : count.toFixed(1);

  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
      className="relative glass-card rounded-[2px] p-6 lg:p-7 overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[var(--gold-glow)] rounded-full blur-[90px] opacity-80 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[var(--gold-glow)] rounded-full blur-[110px] opacity-40 pointer-events-none" />

      <p className="eyebrow text-[var(--gold)]/80 mb-4">Featured Proof</p>
      <p className="stat-num text-gold-gradient mb-2 !text-[clamp(2.4rem,5vw,4.8rem)]">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="text-[var(--moa-white)] font-medium text-sm mb-2">
        {label}
      </p>
      {sub && (
        <p className="text-[var(--moa-muted)] text-xs leading-relaxed max-w-[36ch]">
          {sub}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-60" />
        <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
          Click stats to explore
        </span>
      </div>
    </motion.div>
  );
}

function AnimatedStat({
  value,
  label,
  sub,
  index,
  active,
  selected,
  onSelect,
}: Readonly<{
  value: string;
  label: string;
  sub?: string;
  index: number;
  active: boolean;
  selected: boolean;
  onSelect: () => void;
}>) {
  const { num, prefix, suffix } = parseNumeric(value);
  const count = useCountUp(num, 2000, active);
  const display =
    num % 1 === 0 ? Math.round(count).toString() : count.toFixed(1);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={
        "relative text-left glass-card p-6 rounded-[2px] transition-all duration-500 group cursor-pointer overflow-hidden " +
        (selected
          ? "border-[var(--gold)] shadow-[0_0_40px_rgba(201,168,76,0.18)]"
          : "hover:border-[var(--gold)]")
      }
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_15%,rgba(201,168,76,0.18),transparent_45%)]" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--gold-glow)] rounded-full blur-[70px] opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />

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
      <div className="mt-4 flex items-center gap-3">
        <span
          className={
            "h-px flex-1 transition-all duration-700 " +
            (selected
              ? "bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent opacity-80"
              : "bg-white/10 group-hover:bg-white/20")
          }
        />
        <span
          className={
            "text-[0.55rem] uppercase tracking-[0.28em] transition-colors duration-500 " +
            (selected
              ? "text-[var(--gold)]/90"
              : "text-white/30 group-hover:text-white/45")
          }
        >
          {selected ? "Selected" : "Explore"}
        </span>
      </div>
    </motion.button>
  );
}

export default function WhySlide({ isActive }: WhySlideProps) {
  const stats = LEASING_DEVELOPMENT.why.stats;

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (stats.length === 0) return;
    setSelectedIndex((current) => (current >= stats.length ? 0 : current));
  }, [stats.length]);
  const selected = useMemo(
    () => stats[selectedIndex] ?? stats[0],
    [selectedIndex, stats],
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[var(--moa-black)]">
      <motion.div
        className="absolute -inset-24 opacity-60 pointer-events-none"
        animate={isActive ? { x: [0, 28, 0], y: [0, -18, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 60% at 20% 20%, rgba(201,168,76,0.14), transparent 55%), radial-gradient(55% 55% at 80% 40%, rgba(201,168,76,0.10), transparent 60%), radial-gradient(70% 70% at 50% 85%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 opacity-6 pointer-events-none bg-[url('/images/why/bg-texture.png')] bg-cover" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="mb-10">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {LEASING_DEVELOPMENT.why.eyebrow}
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
              {LEASING_DEVELOPMENT.why.title}
            </motion.h2>

            <motion.p
              className="text-[var(--moa-muted)] leading-relaxed max-w-md lg:text-right text-sm"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {LEASING_DEVELOPMENT.why.subtitle}
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-8 items-start">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                {...stat}
                index={i}
                active={isActive}
                selected={i === selectedIndex}
                onSelect={() => setSelectedIndex(i)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selected && (
              <FeaturedStat
                key={selected.label}
                {...selected}
                active={isActive}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 glass-card rounded-[2px] p-6 lg:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--gold-glow)] rounded-full blur-[80px] pointer-events-none" />
          <p
            className="font-extralight text-[var(--moa-white)] leading-snug relative z-10"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.4rem)" }}
          >
            {LEASING_DEVELOPMENT.why.contact.line}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 relative z-10">
            {LEASING_DEVELOPMENT.why.contact.phone && (
              <a
                className="text-[0.7rem] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors"
                href={`tel:${LEASING_DEVELOPMENT.why.contact.phone.replace(/\./g, "")}`}
              >
                {LEASING_DEVELOPMENT.why.contact.phone}
              </a>
            )}
            {LEASING_DEVELOPMENT.why.contact.email && (
              <a
                className="text-[0.7rem] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors"
                href={`mailto:${LEASING_DEVELOPMENT.why.contact.email}`}
              >
                {LEASING_DEVELOPMENT.why.contact.email}
              </a>
            )}
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[var(--gold)]/70">
              Source: mallofamerica.com
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
