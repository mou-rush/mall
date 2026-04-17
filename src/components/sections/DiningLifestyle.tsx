"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { DINING_CATEGORIES, LIFESTYLE_METRICS } from "@/lib/constants";
import type { IconComponent } from "@/lib/types";

export default function DiningLifestyle() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper id="dining" dark>
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-16"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div ref={headerRef} className="mb-16">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Dining & Lifestyle
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8 justify-between">
            <AnimatedText
              text="Stay Longer. Spend More."
              el="h2"
              className="section-title"
              variant="words"
            />

            <motion.p
              className="text-[var(--moa-muted)] max-w-md leading-loose text-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Dining and lifestyle experiences are the engine behind our
              industry-leading dwell time. Guests don&rsquo;t come to shop —
              they come to live. Retail benefits from being inside that
              experience.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DINING_CATEGORIES.map((cat, i) => (
            <DiningCard key={cat.title} {...cat} index={i} />
          ))}
        </div>

        <LifestyleBanner />
      </div>
    </SectionWrapper>
  );
}

interface DiningCardProps {
  icon: IconComponent;
  title: string;
  count: string;
  desc: string;
  index: number;
}

function DiningCard({
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

function LifestyleBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const metrics = LIFESTYLE_METRICS;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.9 }}
      className="mt-16 glass-card rounded-[2px] p-8 lg:p-12 
                 bg-gradient-to-br from-[var(--moa-surface)] to-[var(--moa-card)]"
    >
      <p className="eyebrow mb-8 text-center">Engagement Metrics</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            className="text-center"
          >
            <p
              className="text-gold-gradient font-thin mb-2"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {m.value}
            </p>
            <p className="text-[var(--moa-muted)] text-xs tracking-wider uppercase">
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
