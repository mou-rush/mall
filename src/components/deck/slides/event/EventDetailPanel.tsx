"use client";

import type { EventFeed, EventFeedId } from "./types";

interface EventDetailPanelProps {
  readonly detailPanelRef: React.RefObject<HTMLDivElement | null>;
  readonly selectedId: EventFeedId | null;
  readonly selectedFeed: EventFeed | null;
}

export function EventDetailPanel({
  detailPanelRef,
  selectedId,
  selectedFeed,
}: EventDetailPanelProps) {
  return (
    <div
      ref={detailPanelRef}
      className="relative z-20 mt-5 rounded-2xl border border-white/10 bg-black/35 p-5 pointer-events-auto"
      style={{ opacity: selectedId ? 1 : 0.95 }}
    >
      {!selectedFeed ? (
        <>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60">
            <span className="inline-block h-2 w-2 rounded-full bg-white/30" />
            <span>STANDBY</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-red-400">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            <span>ON AIR</span>
          </div>
          <p className="mt-3 text-2xl font-black text-white">
            {selectedFeed.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            {selectedFeed.description}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {selectedFeed.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-black/40 p-3"
              >
                <div
                  className="text-xl font-black text-[#FFC72C]"
                  data-count-to={s.value}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/55">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://www.mallofamerica.com/entertainment/events/all"
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="relative z-50 mt-5 inline-flex w-fit items-center gap-3 rounded-full bg-[#FFC72C] px-6 py-3 font-mono text-[11px] font-black uppercase tracking-widest text-black shadow-[0_0_28px_rgba(255,199,44,0.28)] transition-transform hover:scale-[1.03] pointer-events-auto cursor-pointer"
          >
            See All Events
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 4l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </>
      )}
    </div>
  );
}
