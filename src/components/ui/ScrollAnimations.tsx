"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollProgressBarProps {
  readonly color?: string;
  readonly height?: string;
  readonly className?: string;
}

export function ScrollProgressBar({
  color = "var(--gold)",
  height = "3px",
  className = "",
}: ScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] ${className}`}
      style={{ height }}
    >
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "100%",
          background: color,
        }}
      />
    </div>
  );
}
