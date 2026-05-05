"use client";

import { useMemo, useRef, useState } from "react";
import type { EventFeedId } from "./types";
import { FEEDS, FEED_GRID_AREAS, GRID_TEMPLATE_AREAS } from "./constants";
import { EventMonitor } from "./EventMonitor";
import { EventExpandedOverlay } from "./EventExpandedOverlay";
import { EventStatBox } from "./EventStatBox";
import { EventTicker } from "./EventTicker";
import { EventCurrentBroadcast } from "./EventCurrentBroadcast";
import { useEventVideos } from "./hooks/useEventVideos";
import { useEventCycling } from "./hooks/useEventCycling";
import { useEventEntrance } from "./hooks/useEventEntrance";
import { useMonitorInteractions } from "./hooks/useMonitorInteractions";
import { useExpandedOverlay } from "./hooks/useExpandedOverlay";

interface EventsSlideProps {
  readonly isActive: boolean;
}

export default function EventsSlide({ isActive }: EventsSlideProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftZoneRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statValueRef = useRef<HTMLSpanElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const expandedOverlayRef = useRef<HTMLDivElement>(null);
  const expandedOnAirRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const thumbVideoRef = useRef<HTMLVideoElement>(null);

  const [selectedId, setSelectedId] = useState<EventFeedId | null>(null);

  const cycleId = useEventCycling(selectedId);
  const thumbId = selectedId ?? cycleId;

  const selectedFeed = useMemo(() => {
    if (!selectedId) return null;
    return FEEDS.find((f) => f.id === selectedId) ?? null;
  }, [selectedId]);

  const thumbFeed = useMemo(
    () => FEEDS.find((f) => f.id === thumbId) ?? FEEDS[0],
    [thumbId],
  );

  useEventVideos(isActive, rootRef, thumbVideoRef);
  useEventEntrance(
    isActive,
    rootRef,
    headlineRef,
    statValueRef,
    tickerTrackRef,
  );
  const { handleMonitorEnter, handleMonitorLeave } = useMonitorInteractions(
    rootRef,
    selectedId,
  );
  const { handleMonitorClick, closeOnAir } = useExpandedOverlay({
    leftZoneRef,
    rootRef,
    expandedOverlayRef,
    expandedOnAirRef,
    detailPanelRef,
    selectedId,
    setSelectedId,
    selectedFeed,
  });

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      style={{ opacity: 1 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,199,44,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,198,255,0.08),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(255,0,128,0.07),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col px-6 py-8 md:px-10 lg:px-14">
        <div className="mb-6 flex flex-col items-center text-center">
          <div
            ref={headlineRef}
            className="flex flex-wrap justify-center gap-x-3 gap-y-1"
            aria-label="Over 400 Events Every Year"
          >
            {["Over", "400", "Events", "Every", "Year"].map((w) => (
              <span
                key={w}
                data-hword
                className="inline-block text-4xl font-black tracking-[-0.03em] text-white opacity-0 md:text-5xl lg:text-6xl"
              >
                {w}
              </span>
            ))}
          </div>
          <p className="mt-2 max-w-2xl text-sm text-white/50 md:text-base">
            MOA® is a nationally recognized live event platform — always on,
            always drawing.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 lg:flex-row">
          <div
            ref={leftZoneRef}
            className="relative min-h-0 flex-1 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm lg:basis-[60%]"
          >
            <div
              className="relative h-full"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gridTemplateRows: "repeat(3, minmax(0, 1fr))",
                gridTemplateAreas: GRID_TEMPLATE_AREAS,
                gap: "12px",
                opacity: selectedId ? 0.0 : 1,
                pointerEvents: selectedId ? "none" : "auto",
                transition: "opacity 280ms ease",
              }}
            >
              {FEEDS.map((feed) => (
                <EventMonitor
                  key={feed.id}
                  feed={feed}
                  gridArea={FEED_GRID_AREAS[feed.id]}
                  onEnter={() => handleMonitorEnter(feed.id)}
                  onLeave={() => handleMonitorLeave(feed.id)}
                  onClick={() => handleMonitorClick(feed.id)}
                />
              ))}
            </div>

            <EventExpandedOverlay
              expandedOverlayRef={expandedOverlayRef}
              expandedOnAirRef={expandedOnAirRef}
              selectedId={selectedId}
              feeds={FEEDS}
              onClose={closeOnAir}
              onSwitchFeed={handleMonitorClick}
            />
          </div>

          <aside className="flex min-h-0 flex-col gap-5 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm lg:basis-[40%]">
            <EventStatBox statValueRef={statValueRef} />
            <EventTicker tickerTrackRef={tickerTrackRef} />
            <EventCurrentBroadcast
              thumbVideoRef={thumbVideoRef}
              detailPanelRef={detailPanelRef}
              thumbFeed={thumbFeed}
              selectedId={selectedId}
              selectedFeed={selectedFeed}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
