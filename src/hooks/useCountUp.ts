"use client";
import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: number,
  duration = 2000,
  active = true,
): number {
  const [count, setCount] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(eased * end);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf.current);
  }, [active, end, duration]);

  return count;
}
