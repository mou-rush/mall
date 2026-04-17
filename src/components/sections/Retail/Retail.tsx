"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { RETAIL_FEATURES } from "@/lib/constants";
import { useScrollTo } from "@/hooks/useScrollTo";
import RetailCard from "./RetailCard";
import FlagshipBanner from "./FlagshipBanner";
import FloorPlanSection from "./FloorPlanSection";

export default function Retail() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const scrollTo = useScrollTo();

  return (
    <SectionWrapper id="retail" dark>
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-16"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Retail Leasing
            </motion.p>
            <AnimatedText
              text="Your Brand. America's Stage."
              el="h2"
              className="section-title"
              variant="words"
            />
          </div>

          <div className="flex flex-col justify-end">
            <motion.p
              className="text-[var(--moa-muted)] leading-loose max-w-lg"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              From 200 sq ft kiosks to 60,000 sq ft anchor tenancies, Mall of
              America offers every format your brand needs — and the captive
              audience to make it matter. Leasing velocity here is 3× the US
              national average.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button onClick={() => scrollTo("cta")} className="btn-primary">
                Request Leasing Info
              </button>
              <a
                href="/docs/MoA_Leasing_Pitch_Deck_April2026.pdf"
                download
                className="btn-outline"
              >
                Download Deck
              </a>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RETAIL_FEATURES.map((feat, i) => (
            <RetailCard key={feat.title} {...feat} index={i} />
          ))}
        </div>

        <FlagshipBanner />

        <FloorPlanSection />
      </div>
    </SectionWrapper>
  );
}
