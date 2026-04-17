"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { DINING_CATEGORIES } from "@/lib/constants";
import DiningCard from "./DiningCard";
import LifestyleBanner from "./LifestyleBanner";

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
