"use client";
import { motion } from "framer-motion";
import { TICKER_FACTS } from "@/lib/constants";

const TICKER_ITEMS = [
  ...TICKER_FACTS.map((fact) => ({ key: `a:${fact}`, fact })),
  ...TICKER_FACTS.map((fact) => ({ key: `b:${fact}`, fact })),
];

export default function TickerStrip() {
  return (
    <div className="flex items-center gap-0 overflow-hidden w-full">
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {TICKER_ITEMS.map(({ key, fact }) => (
          <span key={key} className="flex items-center gap-10">
            <span className="eyebrow text-[0.65rem] text-[var(--moa-muted)]">
              {fact}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--gold)] opacity-60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
