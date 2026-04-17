"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { EVENTS_CATEGORIES } from "@/lib/constants";
import EventCategoryCard from "./EventCategoryCard";
import EventTimeline from "./EventTimeline";

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
