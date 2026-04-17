"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { BRAND_LOGO_MAP } from "@/lib/constants";
import BrandMarquee from "./BrandMarquee";
import LuxurySplitBlock from "./LuxurySplitBlock";

export default function Luxury() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper id="luxury" dark={false} className="bg-[var(--moa-black)]">
      <div style={{ paddingBlock: "var(--section-pad)" }}>
        <div
          ref={headerRef}
          className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <motion.p
                className="eyebrow mb-5"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                Luxury & Premium
              </motion.p>
              <AnimatedText
                text="Where Prestige Finds an Audience"
                el="h2"
                className="section-title max-w-2xl"
                variant="words"
              />
            </div>

            <motion.p
              className="text-[var(--moa-muted)] max-w-sm leading-loose text-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Our luxury tier delivers an affluent audience with an average
              household income of $110K+ and a documented willingness to spend
              on premium experiences.
            </motion.p>
          </div>
        </div>

        <BrandMarquee brands={Object.keys(BRAND_LOGO_MAP)} />
        <BrandMarquee brands={Object.keys(BRAND_LOGO_MAP).reverse()} reverse />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mt-20">
          <LuxurySplitBlock />
        </div>
      </div>
    </SectionWrapper>
  );
}
