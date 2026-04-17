"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import StatCard from "@/components/ui/StatCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { STATS } from "@/lib/constants";

export default function WhyThisProperty() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper
      id="why"
      dark={false}
      className="bg-[var(--moa-black)] relative overflow-hidden"
    >
      <Image
        src="/images/why/bg-texture.png"
        alt=""
        fill
        className="object-cover opacity-10 pointer-events-none select-none"
        priority={false}
      />
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-16"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div ref={headerRef} className="mb-20">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            The Numbers Don&rsquo;t Lie
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <AnimatedText
              text="Why This Property"
              el="h2"
              className="section-title max-w-xl"
              variant="words"
            />

            <motion.p
              className="text-[var(--moa-muted)] leading-relaxed max-w-md lg:text-right"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              No other property in North America delivers this concentration of
              foot traffic, brand diversity, and repeat visitation. Each metric
              represents a category-defining advantage for your brand.
            </motion.p>
          </div>

          <motion.div
            className="mt-12 h-[1px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              sub={stat.sub}
              index={i}
            />
          ))}
        </div>

        <ProofStatement />
      </div>
    </SectionWrapper>
  );
}

function ProofStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="mt-20 glass-card rounded-[2px] p-10 lg:p-16 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-glow)] 
                      rounded-full blur-[100px] pointer-events-none"
      />

      <p className="eyebrow mb-6">The Competitive Moat</p>
      <blockquote
        className="font-extralight leading-tight tracking-[-0.02em] 
                   text-[var(--moa-white)] max-w-4xl"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}
      >
        &ldquo;Mall of America draws more visitors annually than Walt Disney
        World, Disneyland, and the Grand Canyon{" "}
        <span className="text-gold-gradient">combined</span> — making it the
        single most powerful brick-and-mortar address in the United
        States.&rdquo;
      </blockquote>
      <p className="mt-6 text-[var(--moa-muted)] text-sm tracking-wider">
        — Retail Market Intelligence, 2024
      </p>
    </motion.div>
  );
}
