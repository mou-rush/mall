"use client";
import { TICKER_FACTS } from "@/lib/constants";

const SEPARATOR = "·";
const ITEMS = Array.from({ length: 2 }, () => TICKER_FACTS).flat();

export default function LiveTicker() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[65] h-7 overflow-hidden
                 border-t border-white/5 bg-[var(--moa-black)]/80 backdrop-blur-xl"
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--moa-black)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--moa-black)] to-transparent z-10 pointer-events-none" />

      <div className="ticker-track h-full flex items-center">
        {ITEMS.map((fact, i) => (
          <span
            key={`${fact}-${i}`}
            className="flex items-center gap-5 px-5 whitespace-nowrap"
          >
            <span className="text-[0.6rem] tracking-[0.24em] uppercase text-white/55 font-medium">
              {fact}
            </span>
            <span className="text-[var(--gold)]/50 text-[0.5rem]">
              {SEPARATOR}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
