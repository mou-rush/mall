"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { ENTERTAINMENT_ITEMS } from "@/lib/constants";
import AttractionCard from "./AttractionCard";
import ScaleCallout from "./ScaleCallout";

export default function Entertainment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [activeCard, setActiveCard] = useState(0);

  return (
    <SectionWrapper
      id="entertainment"
      dark={false}
      className="bg-[var(--moa-black)]"
    >
      <div
        className="relative z-10"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div ref={ref} className="mb-20 text-center">
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Entertainment Ecosystem
            </motion.p>

            <AnimatedText
              text="No Screen Can Replace This"
              el="h2"
              className="section-title mx-auto"
              variant="words"
            />

            <motion.p
              className="text-[var(--moa-muted)] max-w-2xl mx-auto leading-loose mt-6"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Mall of America isn&rsquo;t a backdrop for entertainment — it IS
              the entertainment. Our attractions draw 20M+ visits independently.
              Your brand belongs inside that energy.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ENTERTAINMENT_ITEMS.map((item, i) => (
              <AttractionCard
                key={item.name}
                {...item}
                index={i}
                isActive={activeCard === i}
                onHover={() => setActiveCard(i)}
              />
            ))}
          </div>

          <ScaleCallout />
        </div>
      </div>
    </SectionWrapper>
  );
}
