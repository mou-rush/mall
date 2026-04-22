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

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;

  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable
  );
}

function canElementScroll(el: HTMLElement, deltaY: number): boolean {
  const style = window.getComputedStyle(el);
  const overflowY = style.overflowY;
  const overflowX = style.overflowX;
  const isScrollable =
    /(auto|scroll)/.test(overflowY) || /(auto|scroll)/.test(overflowX);

  if (!isScrollable) return false;

  const hasVerticalOverflow = el.scrollHeight > el.clientHeight + 1;
  const hasHorizontalOverflow = el.scrollWidth > el.clientWidth + 1;

  if (!hasVerticalOverflow && !hasHorizontalOverflow) return false;
  if (deltaY === 0) return true;

  if (deltaY > 0) {
    return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
  }

  return el.scrollTop > 1;
}

function isScrollableContent(
  target: EventTarget | null,
  deltaY: number,
): boolean {
  let el = target as HTMLElement | null;

  while (el && el !== document.body) {
    if (canElementScroll(el, deltaY)) {
      return true;
    }

    el = el.parentElement;
  }

  return false;
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
  const touchTargetRef = useRef<EventTarget | null>(null);
  const wheelAccumRef = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

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

  const resetWheelAccumulator = useCallback(() => {
    wheelAccumRef.current = 0;

    if (wheelResetTimer.current) {
      window.clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = null;
    }
  }, []);

  const scheduleWheelReset = useCallback(() => {
    if (wheelResetTimer.current) {
      window.clearTimeout(wheelResetTimer.current);
    }

    wheelResetTimer.current = window.setTimeout(() => {
      wheelAccumRef.current = 0;
    }, 180);
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    },
    [next, prev],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.ctrlKey || e.metaKey) return;

      const dy = e.deltaY;
      if (Math.abs(dy) < 2) return;
      if (isScrollableContent(e.target, dy)) {
        resetWheelAccumulator();
        return;
      }

      e.preventDefault();
      wheelAccumRef.current += dy;
      scheduleWheelReset();

      const threshold = 120;
      if (Math.abs(wheelAccumRef.current) < threshold) return;

      const dir = wheelAccumRef.current > 0 ? 1 : -1;
      resetWheelAccumulator();

      if (dir > 0) next();
      else prev();
    },
    [next, prev, resetWheelAccumulator, scheduleWheelReset],
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchY.current = e.touches[0].clientY;
    touchTargetRef.current = e.target;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchY.current === null) return;

      const dy = touchY.current - e.changedTouches[0].clientY;
      const touchTarget = touchTargetRef.current;

      touchY.current = null;
      touchTargetRef.current = null;

      if (Math.abs(dy) < 50) return;
      if (isScrollableContent(touchTarget, dy)) return;

      if (dy > 0) next();
      else prev();
    },
    [next, prev],
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);

      resetWheelAccumulator();
    };
  }, [
    enabled,
    handleKey,
    handleTouchEnd,
    handleTouchStart,
    handleWheel,
    resetWheelAccumulator,
  ]);

  return { current, direction, total, goTo, next, prev };
}
