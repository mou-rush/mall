"use client";

import { TICKER_ITEMS } from "./constants";

interface EventTickerProps {
  readonly tickerTrackRef: React.RefObject<HTMLDivElement | null>;
}

export function EventTicker({ tickerTrackRef }: EventTickerProps) {
  return (
    <div className="min-h-0 flex-1 rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/60">
        LIVE TICKER
      </div>
      <div className="relative min-h-0 overflow-hidden pl-4">
        <div className="absolute left-0 top-0 h-full w-px bg-[#FFC72C]/35" />
        <div
          ref={tickerTrackRef}
          className="will-change-transform"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {TICKER_ITEMS.map((item) => (
            <div
              key={item}
              className="py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/60"
            >
              {item}
            </div>
          ))}
          {TICKER_ITEMS.map((item) => (
            <div
              key={`${item}-dup`}
              className="py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/60"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
