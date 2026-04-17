"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import MallFloorPlan from "@/components/ui/MallFloorPlan";
import { RETAIL_FEATURES } from "@/lib/constants";

export default function Retail() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

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
              <button
                onClick={() =>
                  document
                    .getElementById("cta")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
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

interface RetailCardProps {
  title: string;
  body: string;
  tag: string;
  index: number;
}

function RetailCard({ title, body, tag, index }: Readonly<RetailCardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="glass-card group p-8 lg:p-10 rounded-[2px] 
                 hover:border-[var(--gold)] transition-all duration-500 
                 relative overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--gold-glow)] to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <div className="relative z-10">
        <span
          className="eyebrow text-[0.6rem] mb-4 inline-block px-3 py-1 
                         border border-[var(--gold)] rounded-full text-[var(--gold)]"
        >
          {tag}
        </span>
        <h3 className="text-[var(--moa-white)] font-medium text-xl mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-[var(--moa-muted)] leading-loose text-sm">{body}</p>
      </div>
    </motion.div>
  );
}

function FlagshipBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="relative mt-16 w-full h-56 md:h-80 rounded-[2px] overflow-hidden"
    >
      <Image
        src="/images/retail/flagship.png"
        alt="Modern retail flagship store interior at Mall of America"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--moa-surface)] via-transparent to-[var(--moa-surface)] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--moa-surface)] via-transparent to-[var(--moa-surface)] opacity-30" />

      <div className="absolute bottom-6 left-8">
        <p className="eyebrow text-[var(--gold)] mb-1">Available Now</p>
        <p className="text-[var(--moa-white)] text-lg font-light tracking-wide">
          Flagship &amp; Anchor Spaces
        </p>
      </div>
    </motion.div>
  );
}

function FloorPlanSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.9 }}
      className="mt-16 glass-card rounded-[2px] p-6 lg:p-8"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="eyebrow mb-1">Property Map</p>
          <p className="text-[var(--moa-muted)] text-sm">
            500+ stores across 4 retail levels
          </p>
        </div>
      </div>
      <MallFloorPlan />
    </motion.div>
  );
}
