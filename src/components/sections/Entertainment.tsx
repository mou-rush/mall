"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { ENTERTAINMENT_ITEMS } from "@/lib/constants";

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

interface AttractionCardProps {
  name: string;
  type: string;
  headline: string;
  desc: string;
  color: string;
  image: string;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

function AttractionCard({
  name,
  type,
  headline,
  desc,
  color,
  image,
  index,
  isActive,
  onHover,
}: Readonly<AttractionCardProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      }}
      onMouseEnter={onHover}
      className="group glass-card rounded-[2px] p-8 lg:p-10 relative overflow-hidden 
                 cursor-default transition-all duration-500
                 hover:border-opacity-50"
      style={{
        borderColor: isActive ? `${color}40` : undefined,
      }}
    >
      <div className="absolute inset-0 transition-opacity duration-700 opacity-20 group-hover:opacity-35">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center rounded-[2px]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--moa-card)] via-[var(--moa-card)]/60 to-transparent" />
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 
                   transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${color}15, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <span
          className="eyebrow text-[0.6rem] inline-block px-3 py-1 rounded-full 
                     border mb-5 transition-all duration-300"
          style={{ borderColor: `${color}60`, color }}
        >
          {type}
        </span>

        <h3
          className="text-[var(--moa-white)] font-light text-2xl lg:text-3xl 
                       mb-3 tracking-[-0.02em] leading-tight"
        >
          {name}
        </h3>

        <p className="mb-4 font-medium" style={{ color }}>
          {headline}
        </p>

        <p className="text-[var(--moa-muted)] text-sm leading-loose">{desc}</p>

        <motion.div
          className="mt-6 flex items-center gap-2 text-sm font-medium 
                     opacity-0 group-hover:opacity-100 transition-all duration-300 
                     translate-y-2 group-hover:translate-y-0"
          style={{ color }}
        >
          <span>Explore Sponsorship</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ScaleCallout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.9 }}
      className="mt-20 text-center"
    >
      <motion.p
        className="text-gold-gradient font-thin leading-none mb-4"
        style={{
          fontSize: "clamp(5rem, 15vw, 14rem)",
          letterSpacing: "-0.06em",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.9 }}
      >
        20M+
      </motion.p>
      <p className="text-[var(--moa-muted)] text-sm tracking-[0.2em] uppercase font-medium mb-2">
        Entertainment-Specific Visits Annually
      </p>
      <p className="text-[var(--moa-muted)] text-xs max-w-xs mx-auto opacity-60">
        Guests who visit exclusively for our attractions — not counting general
        shoppers
      </p>
    </motion.div>
  );
}
