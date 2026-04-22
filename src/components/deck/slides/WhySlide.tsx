"use client";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { getLeasingStats, getLeasingContent } from "@/lib/data-service";

type SlideStat = ReturnType<typeof getLeasingStats>[number];

interface WhySlideProps {
  readonly isActive: boolean;
}

function formatMetricValue(stat: SlideStat, count: number) {
  if (typeof stat.countTo !== "number") {
    return stat.value;
  }

  const rounded = Math.round(count).toLocaleString();
  return `${stat.prefix ?? ""}${rounded}${stat.suffix ?? ""}`;
}

function MetricPanel({
  stat,
  index,
  active,
  className,
  featured = false,
}: Readonly<{
  stat: SlideStat;
  index: number;
  active: boolean;
  className?: string;
  featured?: boolean;
}>) {
  const count = useCountUp(stat.countTo ?? 0, featured ? 2200 : 1700, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.35 + index * 0.12,
        duration: featured ? 1.25 : 1.05,
        ease: [0.19, 1, 0.22, 1],
      }}
      whileHover={{ y: -10, scale: 1.01 }}
      className={
        "relative overflow-hidden rounded-[2px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 lg:p-8 transition-all duration-500 group " +
        (featured
          ? "min-h-[260px] lg:min-h-[320px]"
          : "min-h-[145px] lg:min-h-[180px]") +
        (className ? ` ${className}` : "")
      }
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,61,165,0.22),transparent_42%)] opacity-80" />
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1400ms]" />
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--gold)] via-white/20 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <motion.p
            className={
              featured
                ? "text-gold-gradient font-semibold leading-[0.88] tracking-[-0.05em] text-[clamp(4.5rem,11vw,9rem)]"
                : "text-[var(--moa-white)] font-semibold leading-[0.9] tracking-[-0.04em] text-[clamp(2.9rem,7vw,5.5rem)]"
            }
          >
            {formatMetricValue(stat, count)}
          </motion.p>
          <p className="mt-3 text-[0.8rem] lg:text-[0.95rem] uppercase tracking-[0.28em] text-white/82">
            {stat.label}
          </p>
        </div>

        {stat.sub && (
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--gold)]/70" />
            <p className="text-[0.62rem] uppercase tracking-[0.36em] text-[var(--gold)]/90">
              {stat.sub}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function WhySlide({ isActive }: WhySlideProps) {
  const stats = getLeasingStats();
  const content = getLeasingContent().why;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[var(--moa-black)]">
      <motion.div
        className="absolute inset-0 bg-[url('/images/why/Why_MOA_Cover.jpg')] bg-cover bg-center"
        animate={
          isActive ? { scale: [1, 1.04, 1], x: [0, -18, 0] } : { scale: 1 }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.82),rgba(0,21,58,0.72)_45%,rgba(0,0,0,0.88))]" />
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={isActive ? { x: [0, 16, 0], y: [0, -10, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 78%)",
        }}
      />
      <motion.div
        className="absolute -inset-24 opacity-60 pointer-events-none"
        animate={isActive ? { x: [0, 28, 0], y: [0, -18, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 60% at 20% 20%, rgba(201,168,76,0.14), transparent 55%), radial-gradient(55% 55% at 80% 40%, rgba(201,168,76,0.10), transparent 60%), radial-gradient(70% 70% at 50% 85%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 opacity-8 pointer-events-none bg-[url('/images/why/bg-texture.png')] bg-cover" />

      <div className="relative z-10 max-w-[1450px] mx-auto px-8 lg:px-16 w-full">
        <div className="mb-10 lg:mb-12">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            {content.eyebrow}
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              className="section-title max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 1.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              {content.title}
            </motion.h2>

            <motion.div
              className="inline-flex items-center gap-3 self-start lg:self-auto rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md"
              initial={{ opacity: 0, x: 12 }}
              animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.42, duration: 1.1 }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_18px_rgba(255,199,44,0.8)]" />
              <span className="text-[0.68rem] uppercase tracking-[0.34em] text-white/80">
                {content.subtitle}
              </span>
            </motion.div>
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

        <div className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-fr">
          <MetricPanel
            stat={stats[0]}
            index={0}
            active={isActive}
            featured
            className="col-span-12 lg:col-span-7"
          />
          <MetricPanel
            stat={stats[1]}
            index={1}
            active={isActive}
            className="col-span-12 md:col-span-6 lg:col-span-5"
          />
          <MetricPanel
            stat={stats[2]}
            index={2}
            active={isActive}
            className="col-span-12 md:col-span-6 lg:col-span-3"
          />
          <MetricPanel
            stat={stats[3]}
            index={3}
            active={isActive}
            className="col-span-12 md:col-span-6 lg:col-span-3"
          />
          <MetricPanel
            stat={stats[4]}
            index={4}
            active={isActive}
            className="col-span-12 md:col-span-6 lg:col-span-3"
          />
          <MetricPanel
            stat={stats[5]}
            index={5}
            active={isActive}
            className="col-span-12 md:col-span-6 lg:col-span-3"
          />
        </div>
      </div>
    </div>
  );
}
