"use client";

import type { EventFeed } from "./types";

interface EventMonitorProps {
  readonly feed: EventFeed;
  readonly gridArea: string;
  readonly onEnter: () => void;
  readonly onLeave: () => void;
  readonly onClick: () => void;
}

export function EventMonitor({
  feed,
  gridArea,
  onEnter,
  onLeave,
  onClick,
}: EventMonitorProps) {
  return (
    <button
      type="button"
      data-monitor
      data-monitor-id={feed.id}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative overflow-hidden rounded-xl border border-white/20 bg-black/50 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      style={{ gridArea }}
    >
      <video
        data-monitor-video
        src={feed.videoSrc}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 2px, transparent 5px)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span
          data-live-dot
          className="inline-block h-2.5 w-2.5 rounded-full bg-red-500"
          style={{ transformOrigin: "center" }}
        />
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
          LIVE
        </span>
      </div>

      <div
        data-broadcast-label-id={feed.id}
        className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75 opacity-0"
      >
        BROADCAST
      </div>

      <div className="absolute bottom-3 left-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/70">
          {feed.title}
        </p>
      </div>
    </button>
  );
}
