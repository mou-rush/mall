"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import { BRAND_LOGO_MAP } from "@/lib/constants";

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

function BrandMarquee({
  brands,
  reverse = false,
}: Readonly<{
  brands: string[];
  reverse?: boolean;
}>) {
  const dir = reverse ? "r" : "f";
  const items = [
    ...brands.map((b) => ({ id: `${dir}-a-${b}`, label: b })),
    ...brands.map((b) => ({ id: `${dir}-b-${b}`, label: b })),
  ];

  return (
    <div className="overflow-hidden py-5 border-y border-[var(--moa-border)] mb-3 relative">
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-32 
                      bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10"
      />
      <div
        className="absolute inset-y-0 right-0 w-32 
                      bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10"
      />

      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item) => {
          const logo = BRAND_LOGO_MAP[item.label];
          return logo ? (
            <div
              key={item.id}
              className="relative h-9 w-28 flex-shrink-0 opacity-75 hover:opacity-100
                         transition-opacity duration-300"
            >
              <Image
                src={logo}
                alt={item.label}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ) : (
            <span
              key={item.id}
              className="text-[var(--moa-muted)] font-light tracking-[0.12em]
                         text-sm uppercase hover:text-[var(--gold-light)]
                         transition-colors duration-300 cursor-default flex-shrink-0"
            >
              {item.label}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

function LuxurySplitBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const pillars = [
    {
      title: "Curated Environment",
      desc: "Luxury brands don't exist in isolation here. Your neighbors define your brand's company — and ours are the best in the business.",
    },
    {
      title: "Dwell Time",
      desc: "Average visit duration at MoA: 3.5 hours. Guests explore, they linger, they return. That creates multiple conversion touchpoints per visit.",
    },
    {
      title: "Destination Mindset",
      desc: "60% of our visitors travel 150+ miles to be here. They arrive with intention and budget — the perfect customer for premium and luxury.",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="glass-card rounded-[2px] aspect-[4/3] relative overflow-hidden"
      >
        <Image
          src="/images/luxury/ambience.png"
          alt="MoA luxury retail environment"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />

        <div
          className="absolute top-0 right-0 w-16 h-16 
                        border-t border-r border-[var(--gold)] rounded-tr-[2px]"
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16 
                        border-b border-l border-[var(--gold)] rounded-bl-[2px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        <p className="eyebrow mb-6">The Luxury Proposition</p>
        <div className="space-y-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
              className="pl-6 border-l border-[var(--gold)] border-opacity-30 
                         hover:border-opacity-100 transition-all duration-300"
            >
              <h4 className="text-[var(--moa-white)] font-medium mb-2">
                {p.title}
              </h4>
              <p className="text-[var(--moa-muted)] text-sm leading-loose">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
