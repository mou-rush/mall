"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { LUXURY_PILLARS, BRAND_LOGO_MAP } from "@/lib/constants";

interface LuxurySlideProps {
  readonly isActive: boolean;
}

const brands = Object.keys(BRAND_LOGO_MAP);

export default function LuxurySlide({ isActive }: LuxurySlideProps) {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-black)]">
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Luxury &amp; Premium
        </motion.p>

        <motion.h2
          className="section-title mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.15,
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          Where Prestige Finds an Audience
        </motion.h2>
        <motion.div
          className="overflow-hidden py-4 border-y border-white/10 mb-10 relative"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10" />

          <motion.div
            className="flex items-center gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((b, i) => {
              const logo = BRAND_LOGO_MAP[b];
              return logo ? (
                <div
                  key={`${b}-${i}`}
                  className="relative h-8 w-24 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={logo}
                    alt={b}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              ) : (
                <span
                  key={`${b}-${i}`}
                  className="text-[var(--moa-muted)] text-xs tracking-[0.12em] uppercase flex-shrink-0"
                >
                  {b}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-card rounded-[2px] aspect-[4/3] relative overflow-hidden"
          >
            <Image
              src="/images/luxury/ambience.png"
              alt="MoA luxury environment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[var(--gold)] rounded-tr-[2px]" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[var(--gold)] rounded-bl-[2px]" />
          </motion.div>

          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              The Luxury Proposition
            </motion.p>

            <div className="flex gap-2 mb-6">
              {LUXURY_PILLARS.map((p, i) => (
                <motion.button
                  key={p.title}
                  onClick={() => setActivePillar(i)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.5 }}
                  className={`text-[0.6rem] tracking-[0.12em] uppercase font-semibold
                             px-3 py-1.5 rounded-[2px] border transition-all duration-300 ${
                               activePillar === i
                                 ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,168,76,0.1)]"
                                 : "border-white/10 text-[var(--moa-muted)] hover:border-white/30"
                             }`}
                >
                  {p.title}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activePillar}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-5 border-l-2 border-[var(--gold)]"
            >
              <h4 className="text-[var(--moa-white)] font-medium mb-2">
                {LUXURY_PILLARS[activePillar].title}
              </h4>
              <p className="text-[var(--moa-muted)] text-sm leading-loose">
                {LUXURY_PILLARS[activePillar].desc}
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex gap-6"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              {[
                { val: "$110K+", lab: "Avg HH Income" },
                { val: "12", lab: "Luxury Brands" },
                { val: "3.5h", lab: "Avg Visit Duration" },
              ].map((s) => (
                <div key={s.lab}>
                  <p className="text-gold-gradient font-thin text-xl tracking-tight">
                    {s.val}
                  </p>
                  <p className="text-[var(--moa-muted)] text-[0.55rem] tracking-wider uppercase">
                    {s.lab}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
