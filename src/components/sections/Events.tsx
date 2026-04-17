"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { EVENTS_CATEGORIES, EVENTS_TIMELINE } from "@/lib/constants";
import type { IconComponent } from "@/lib/types";

export default function Events() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper id="events" dark={false} className="bg-[var(--moa-black)]">
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div ref={headerRef} className="mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Events & Activations
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <AnimatedText
              text="America's Most Powerful Event Platform"
              el="h2"
              className="section-title max-w-2xl"
              variant="words"
            />

            <motion.div
              className="max-w-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-[var(--moa-muted)] leading-loose text-sm mb-5">
                400+ events annually. Zero dark days. Our venues accommodate
                intimate influencer dinners and 50,000-person brand spectacles —
                all under one roof, all monetizable.
              </p>
              <div className="flex gap-4">
                <div className="glass-card px-4 py-3 rounded-[2px] text-center">
                  <p className="text-gold-gradient font-thin text-2xl tracking-tight">
                    400+
                  </p>
                  <p className="text-[var(--moa-muted)] text-[0.65rem] tracking-wider uppercase">
                    Events / Year
                  </p>
                </div>
                <div className="glass-card px-4 py-3 rounded-[2px] text-center">
                  <p className="text-gold-gradient font-thin text-2xl tracking-tight">
                    50K
                  </p>
                  <p className="text-[var(--moa-muted)] text-[0.65rem] tracking-wider uppercase">
                    Max Capacity
                  </p>
                </div>
                <div className="glass-card px-4 py-3 rounded-[2px] text-center">
                  <p className="text-gold-gradient font-thin text-2xl tracking-tight">
                    8
                  </p>
                  <p className="text-[var(--moa-muted)] text-[0.65rem] tracking-wider uppercase">
                    Venues
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full h-48 md:h-72 rounded-[2px] overflow-hidden mb-20"
        >
          <Image
            src="/images/events/crowd.png"
            alt="MoA large-scale event with crowd energy"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--moa-black)] via-transparent to-[var(--moa-black)] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--moa-black)] via-transparent to-[var(--moa-black)] opacity-40" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {EVENTS_CATEGORIES.map((cat, i) => (
            <EventCategoryCard key={cat.title} {...cat} index={i} />
          ))}
        </div>
        <EventTimeline />
      </div>
    </SectionWrapper>
  );
}

interface EventCategoryCardProps {
  icon: IconComponent;
  title: string;
  scale: string;
  examples: string[];
  index: number;
}

function EventCategoryCard({
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

function EventTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const phases = EVENTS_TIMELINE;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      <p className="eyebrow mb-10 text-center">How It Works</p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">
        <div
          className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] 
                        bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
        />

        {phases.map((ph, i) => (
          <motion.div
            key={ph.step}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
            className="relative flex flex-col items-center text-center px-3 pt-4"
          >
            <div
              className="w-16 h-16 rounded-full border border-[var(--gold)] 
                            flex items-center justify-center mb-4 relative z-10
                            bg-[var(--moa-black)] group-hover:bg-[var(--gold-glow)]
                            transition-colors duration-300"
            >
              <span className="eyebrow text-[var(--gold)]">{ph.step}</span>
            </div>

            <h4 className="text-[var(--moa-white)] font-medium text-sm mb-2">
              {ph.title}
            </h4>
            <p className="text-[var(--moa-muted)] text-xs leading-loose">
              {ph.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
