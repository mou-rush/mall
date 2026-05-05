import { RefObject, useCallback } from "react";
import type { EventFeedId } from "../types";
import { animateMonitorHover } from "../animations";

export function useMonitorInteractions(
  rootRef: RefObject<HTMLDivElement | null>,
  selectedId: EventFeedId | null,
) {
  const handleMonitorEnter = useCallback(
    (id: EventFeedId) => {
      if (selectedId) return;
      const el = rootRef.current?.querySelector<HTMLElement>(
        `[data-monitor-id="${id}"]`,
      );
      const label = rootRef.current?.querySelector<HTMLElement>(
        `[data-broadcast-label-id="${id}"]`,
      );
      if (!el) return;
      animateMonitorHover(el, label ?? null, true);
    },
    [rootRef, selectedId],
  );

  const handleMonitorLeave = useCallback(
    (id: EventFeedId) => {
      if (selectedId) return;
      const el = rootRef.current?.querySelector<HTMLElement>(
        `[data-monitor-id="${id}"]`,
      );
      const label = rootRef.current?.querySelector<HTMLElement>(
        `[data-broadcast-label-id="${id}"]`,
      );
      if (!el) return;
      animateMonitorHover(el, label ?? null, false);
    },
    [rootRef, selectedId],
  );

  return { handleMonitorEnter, handleMonitorLeave };
}
