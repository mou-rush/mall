"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RETAIL_FEATURES } from "@/lib/constants";

interface RetailSlideProps {
  readonly isActive: boolean;
}

export default function RetailSlide({ isActive }: RetailSlideProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = RETAIL_FEATURES[activeFeature];

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-dark)]">
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Retail Leasing
            </motion.p>

            <motion.h2
              className="section-title mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              Your Brand.
              <br />
              America&rsquo;s Stage.
            </motion.h2>

            <motion.p
              className="text-[var(--moa-muted)] leading-relaxed text-sm mb-8"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              From 200 sq ft kiosks to 60,000 sq ft anchor tenancies. Leasing
              velocity here is 3× the US national average.
            </motion.p>
            <motion.div
              className="flex gap-6 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              {[
                { val: "500+", lab: "Stores" },
                { val: "3×", lab: "Leasing Velocity" },
                { val: "96%", lab: "Occupancy" },
              ].map((s) => (
                <div key={s.lab}>
                  <p className="text-gold-gradient font-thin text-2xl tracking-tight">
                    {s.val}
                  </p>
                  <p className="text-[var(--moa-muted)] text-[0.6rem] tracking-wider uppercase">
                    {s.lab}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="/docs/MoA_Leasing_Pitch_Deck_April2026.pdf"
              download
              className="btn-outline inline-flex text-sm"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Download Full Deck
            </motion.a>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              {RETAIL_FEATURES.map((feat, i) => (
                <motion.button
                  key={feat.title}
                  onClick={() => setActiveFeature(i)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.7,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className={`glass-card p-5 rounded-[2px] text-left transition-all duration-300 ${
                    activeFeature === i
                      ? "border-[var(--gold)] bg-[rgba(201,168,76,0.06)]"
                      : "hover:border-white/20"
                  }`}
                >
                  <span
                    className={`eyebrow text-[0.55rem] mb-2 inline-block px-2 py-0.5
                               border rounded-full transition-colors ${
                                 activeFeature === i
                                   ? "border-[var(--gold)] text-[var(--gold)]"
                                   : "border-white/20 text-[var(--moa-muted)]"
                               }`}
                  >
                    {feat.tag}
                  </span>
                  <h4 className="text-[var(--moa-white)] font-medium text-sm mb-1">
                    {feat.title}
                  </h4>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 glass-card p-6 rounded-[2px] border-l-2 border-l-[var(--gold)]"
              >
                <h3 className="text-[var(--moa-white)] font-medium mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--moa-muted)] text-sm leading-relaxed">
                  {feature.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
