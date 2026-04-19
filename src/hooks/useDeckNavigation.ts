"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface DeckNavigationReturn {
  readonly current: number;
  readonly direction: number;
  readonly total: number;
  readonly goTo: (idx: number) => void;
  readonly next: () => void;
  readonly prev: () => void;
}

/**
 * Full-screen deck navigation with keyboard, wheel, and touch support.
 * Debounces rapid input via a 700 ms lock to allow transitions to finish.
 */
export function useDeckNavigation(
  total: number,
  enabled = true,
): DeckNavigationReturn {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const lockRef = useRef(false);
  const currentRef = useRef(0);
  const touchY = useRef<number | null>(null);

  // keep ref in sync so callbacks always read the latest slide index
  currentRef.current = current;

  const navigate = useCallback(
    (idx: number) => {
      if (lockRef.current) return;
      const clamped = Math.max(0, Math.min(total - 1, idx));
      if (clamped === currentRef.current) return;
      lockRef.current = true;
      setDirection(clamped > currentRef.current ? 1 : -1);
      setCurrent(clamped);
      setTimeout(() => {
        lockRef.current = false;
      }, 700);
    },
    [total],
  );

  const next = useCallback(() => navigate(currentRef.current + 1), [navigate]);
  const prev = useCallback(() => navigate(currentRef.current - 1), [navigate]);
  const goTo = useCallback((idx: number) => navigate(idx), [navigate]);

  useEffect(() => {
    if (!enabled) return;

    const handleKey = (e: KeyboardEvent) => {
      // Don't hijack keys when user is typing in a form field
      const el = e.target as HTMLElement;
      if (
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 15) return;
      if (e.deltaY > 0) next();
      else prev();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchY.current === null) return;
      const dy = touchY.current - e.changedTouches[0].clientY;
      touchY.current = null;
      if (Math.abs(dy) < 50) return;
      if (dy > 0) next();
      else prev();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev, enabled]);

  return { current, direction, total, goTo, next, prev };
}
