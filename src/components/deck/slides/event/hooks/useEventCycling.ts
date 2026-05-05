import { useEffect, useState } from "react";
import type { EventFeedId } from "../types";
import { FEEDS } from "../constants";

export function useEventCycling(selectedId: EventFeedId | null) {
  const [cycleId, setCycleId] = useState<EventFeedId>(FEEDS[0].id);

  useEffect(() => {
    if (selectedId) return;
    let idx = Math.max(
      0,
      FEEDS.findIndex((f) => f.id === cycleId),
    );
    const intervalId = window.setInterval(() => {
      idx = (idx + 1) % FEEDS.length;
      setCycleId(FEEDS[idx].id);
    }, 3200);
    return () => window.clearInterval(intervalId);
  }, [cycleId, selectedId]);

  return cycleId;
}
