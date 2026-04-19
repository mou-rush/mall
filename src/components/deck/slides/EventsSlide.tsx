"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EVENTS_CATEGORIES, EVENTS_TIMELINE } from "@/lib/constants";

interface EventsSlideProps {
  readonly isActive: boolean;
}

type View = "categories" | "process";

export default function EventsSlide({ isActive }: EventsSlideProps) {
  const [view, setView] = useState<View>("categories");

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-black)]">
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Events &amp; Activations
            </motion.p>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              America&rsquo;s Most Powerful
              <br className="hidden lg:block" />
              Event Platform
            </motion.h2>
          </div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {[
              { val: "400+", lab: "Events / Year" },
              { val: "50K", lab: "Max Capacity" },
              { val: "8", lab: "Venues" },
            ].map((s) => (
              <div
                key={s.lab}
                className="glass-card px-4 py-3 rounded-[2px] text-center"
              >
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

        <motion.div
          className="flex gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {(["categories", "process"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`text-[0.65rem] font-semibold tracking-[0.15em] uppercase
                         px-4 py-2 rounded-[2px] border transition-all duration-300 ${
                           view === v
                             ? "border-[var(--gold)] text-[var(--gold)] bg-[rgba(201,168,76,0.1)]"
                             : "border-white/10 text-[var(--moa-muted)] hover:border-white/30"
                         }`}
            >
              {v === "categories" ? "Event Types" : "How It Works"}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "categories" ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {EVENTS_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="glass-card group p-5 rounded-[2px]
                               hover:border-[var(--gold)] transition-all
                               duration-500 cursor-default"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="w-5 h-5 text-[var(--gold)]" />
                      <span className="eyebrow text-[0.5rem] text-[var(--moa-muted)] text-right leading-tight max-w-[100px]">
                        {cat.scale}
                      </span>
                    </div>
                    <h3 className="text-[var(--moa-white)] font-medium text-sm mb-3">
                      {cat.title}
                    </h3>
                    <ul className="space-y-1">
                      {cat.examples.map((ex) => (
                        <li
                          key={ex}
                          className="flex items-center gap-2 text-[var(--moa-muted)] text-xs"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--gold)] flex-shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">
                <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                {EVENTS_TIMELINE.map((ph, i) => (
                  <motion.div
                    key={ph.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center text-center px-3"
                  >
                    <div className="w-14 h-14 rounded-full border border-[var(--gold)] flex items-center justify-center mb-4 bg-[var(--moa-black)] relative z-10">
                      <span className="eyebrow text-[var(--gold)] text-sm">
                        {ph.step}
                      </span>
                    </div>
                    <h4 className="text-[var(--moa-white)] font-medium text-xs mb-2">
                      {ph.title}
                    </h4>
                    <p className="text-[var(--moa-muted)] text-[0.65rem] leading-relaxed">
                      {ph.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
