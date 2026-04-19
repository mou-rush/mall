"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CTA_PATHS, CTA_FORM_LABELS } from "@/lib/constants";
import ArrowIcon from "@/components/ui/ArrowIcon";

interface CTASlideProps {
  readonly isActive: boolean;
}

export default function CTASlide({ isActive }: CTASlideProps) {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-black)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--gold-glow)] rounded-full blur-[180px] opacity-20" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern
              id="deck-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#deck-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 lg:px-16 w-full">
        <div className="text-center mb-10">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ready to Close the Deal?
          </motion.p>
          <motion.h2
            className="section-title mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.15,
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            Let&rsquo;s Build Together
          </motion.h2>
          <motion.p
            className="text-[var(--moa-muted)] max-w-lg mx-auto mt-4 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            40 million people walked through our doors last year. The question
            isn&rsquo;t whether your brand belongs here.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {CTA_PATHS.map((path, i) => {
            const Icon = path.icon;
            const selected = activeForm === path.id;
            return (
              <motion.button
                key={path.id}
                onClick={() => setActiveForm(selected ? null : path.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.35 + i * 0.1,
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={`glass-card p-6 rounded-[2px] text-left transition-all
                           duration-500 relative overflow-hidden ${
                             selected
                               ? "border-opacity-60"
                               : "hover:border-opacity-30"
                           }`}
                style={{
                  borderColor: selected ? path.color : undefined,
                }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${path.color}, transparent)`,
                    opacity: selected ? 1 : 0,
                  }}
                />
                <Icon
                  size={24}
                  className="mb-4"
                  style={{ color: path.color }}
                />
                <h3 className="text-[var(--moa-white)] font-medium mb-2">
                  {path.title}
                </h3>
                <p className="text-[var(--moa-muted)] text-xs leading-relaxed mb-4">
                  {path.desc}
                </p>
                <span
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                  style={{ color: path.color }}
                >
                  {selected ? "Close ✕" : path.cta}
                  {!selected && <ArrowIcon size={12} />}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {activeForm && (
            <motion.div
              key={activeForm}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-[2px] p-6 lg:p-8 mb-4">
                <div className="max-w-xl mx-auto">
                  <p className="eyebrow mb-5">{CTA_FORM_LABELS[activeForm]}</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(
                        "Form submitted! Connect to CRM API in production.",
                      );
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="First Name *"
                        required
                        className="deck-input"
                      />
                      <input
                        placeholder="Last Name *"
                        required
                        className="deck-input"
                      />
                    </div>
                    <input
                      placeholder="Company *"
                      required
                      className="deck-input"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      className="deck-input"
                    />
                    <textarea
                      rows={2}
                      placeholder="Tell us about your project…"
                      className="deck-input resize-none"
                    />
                    <button
                      type="submit"
                      className="btn-primary w-full justify-center"
                    >
                      Send Inquiry <ArrowIcon />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-gold-gradient font-black text-sm tracking-[0.12em] uppercase mb-1">
            Mall of America
          </p>
          <p className="text-[var(--moa-muted)] text-xs">
            60 E Broadway · Bloomington, MN 55425
          </p>
        </motion.div>
      </div>
    </div>
  );
}
