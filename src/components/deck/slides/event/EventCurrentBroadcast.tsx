"use client";

import type { EventFeed, EventFeedId } from "./types";
import { EventDetailPanel } from "./EventDetailPanel";

interface EventCurrentBroadcastProps {
  readonly thumbVideoRef: React.RefObject<HTMLVideoElement | null>;
  readonly detailPanelRef: React.RefObject<HTMLDivElement | null>;
  readonly thumbFeed: EventFeed;
  readonly selectedId: EventFeedId | null;
  readonly selectedFeed: EventFeed | null;
}

export function EventCurrentBroadcast({
  thumbVideoRef,
  detailPanelRef,
  thumbFeed,
  selectedId,
  selectedFeed,
}: EventCurrentBroadcastProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/60">
        CURRENTLY BROADCASTING
      </div>
      <div className="relative overflow-hidden rounded-xl border border-white/20">
        <video
          ref={thumbVideoRef}
          src={thumbFeed.videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                LIVE
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
              GLOBAL FEED
            </span>
          </div>
          <div className="mt-10 font-mono text-[11px] uppercase tracking-widest text-white/70">
            {thumbFeed.title}
          </div>
        </div>
      </div>

      <EventDetailPanel
        detailPanelRef={detailPanelRef}
        selectedId={selectedId}
        selectedFeed={selectedFeed}
      />
    </div>
  );
}
