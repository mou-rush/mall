// Main slide component
export { default } from "./EventsSlide";

// Types
export type { EventFeed, EventFeedId, EventFeedStat } from "./types";

// Constants
export {
  FEEDS,
  TICKER_ITEMS,
  FEED_GRID_AREAS,
  GRID_TEMPLATE_AREAS,
} from "./constants";

export { EventMonitor } from "./EventMonitor";
export { EventTicker } from "./EventTicker";
export { EventStatBox } from "./EventStatBox";
export { EventDetailPanel } from "./EventDetailPanel";
export { EventCurrentBroadcast } from "./EventCurrentBroadcast";
export { EventExpandedOverlay } from "./EventExpandedOverlay";

export { useEventVideos } from "./hooks/useEventVideos";
export { useEventCycling } from "./hooks/useEventCycling";
export { useEventEntrance } from "./hooks/useEventEntrance";
export { useMonitorInteractions } from "./hooks/useMonitorInteractions";
export { useExpandedOverlay } from "./hooks/useExpandedOverlay";

export * from "./animations";
