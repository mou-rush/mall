"use client";

import type { EventFeed, EventFeedId } from "./types";

interface EventExpandedOverlayProps {
  readonly expandedOverlayRef: React.RefObject<HTMLDivElement | null>;
  readonly expandedOnAirRef: React.RefObject<HTMLDivElement | null>;
  readonly selectedId: EventFeedId | null;
  readonly feeds: ReadonlyArray<EventFeed>;
  readonly onClose: () => void;
  readonly onSwitchFeed: (id: EventFeedId) => void;
}

export function EventExpandedOverlay({
  expandedOverlayRef,
  expandedOnAirRef,
  selectedId,
  feeds,
  onClose,
  onSwitchFeed,
}: EventExpandedOverlayProps) {
  return (
    <div
      ref={expandedOverlayRef}
      className="pointer-events-none absolute inset-4 overflow-hidden rounded-2xl border border-white/20 bg-black/60"
      style={{ opacity: 0 }}
    >
      <video
        data-expanded-video
        data-monitor-video
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.72)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 2px, transparent 5px)",
        }}
      />

      <div
        ref={expandedOnAirRef}
        className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-red-500/40 bg-black/45 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-red-400 opacity-0"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
        <span>ON AIR</span>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/10"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 3l10 10M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className="absolute bottom-4 left-4 right-4 flex items-center gap-3"
        style={{
          opacity: selectedId ? 1 : 0,
          transform: selectedId ? "translateY(0px)" : "translateY(12px)",
          transition: "opacity 260ms ease, transform 260ms ease",
        }}
      >
        {feeds
          .filter((f) => f.id !== selectedId)
          .map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onSwitchFeed(f.id)}
              className="relative h-14 flex-1 overflow-hidden rounded-lg border border-white/20 bg-black/60"
              aria-label={`Switch to ${f.title}`}
            >
              <video
                data-monitor-video
                src={f.videoSrc}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-white/70">
                {f.title}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
