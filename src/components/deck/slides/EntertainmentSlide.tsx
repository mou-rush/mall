"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { DECK_WEBSITE_CONTENT } from "@/lib/moa-website-content";

interface EntertainmentSlideProps {
  readonly isActive: boolean;
}

export default function EntertainmentSlide({
  isActive,
}: EntertainmentSlideProps) {
  const content = DECK_WEBSITE_CONTENT.entertainment;
  const [activeTab, setActiveTab] = useState(0);
  const item = content.items[activeTab];

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-[var(--moa-black)]">
      {content.items.map((ent, i) => (
        <motion.div
          key={ent.name}
          className="absolute inset-0"
          animate={{ opacity: activeTab === i ? 0.2 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={ent.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--moa-black)] via-[rgba(6,6,8,0.85)] to-[rgba(6,6,8,0.6)]" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 lg:px-16 w-full">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {content.eyebrow}
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
          {content.title}
        </motion.h2>

        <motion.p
          className="text-[var(--moa-muted)] max-w-xl text-sm leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          {content.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          <div className="space-y-2">
            {content.items.map((ent, i) => (
              <motion.button
                key={ent.name}
                onClick={() => setActiveTab(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                className={`w-full text-left p-4 rounded-[2px] border transition-all duration-300 ${
                  activeTab === i
                    ? "bg-white/5"
                    : "border-transparent hover:bg-white/[0.03]"
                }`}
                style={{
                  borderColor: activeTab === i ? ent.color : "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeTab === i ? "scale-125" : "scale-75 opacity-40"
                    }`}
                    style={{ background: ent.color }}
                  />
                  <span
                    className={`font-medium text-sm transition-colors ${
                      activeTab === i
                        ? "text-[var(--moa-white)]"
                        : "text-[var(--moa-muted)]"
                    }`}
                  >
                    {ent.name}
                  </span>
                  <span className="eyebrow text-[0.5rem] text-[var(--moa-muted)] ml-auto">
                    {ent.type}
                  </span>
                </div>
              </motion.button>
            ))}

            <motion.div
              className="pt-6 text-center"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <a
                href={content.cta.href}
                className="btn-primary justify-center w-full"
                target="_blank"
                rel="noreferrer"
              >
                {content.cta.label}
              </a>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="glass-card p-8 rounded-[2px] relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: `linear-gradient(90deg, ${item.color}, transparent)`,
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
              />

              <span
                className="eyebrow text-[0.55rem] inline-block px-3 py-1 rounded-full border mb-4"
                style={{
                  borderColor: item.color,
                  color: item.color,
                }}
              >
                {item.type}
              </span>

              <h3 className="text-[var(--moa-white)] font-light text-2xl tracking-tight mb-2">
                {item.name}
              </h3>
              <p className="font-medium mb-3" style={{ color: item.color }}>
                {item.headline}
              </p>
              <p className="text-[var(--moa-muted)] text-sm leading-loose">
                {item.desc}
              </p>

              <div className="mt-6 rounded-[2px] overflow-hidden relative h-36">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
