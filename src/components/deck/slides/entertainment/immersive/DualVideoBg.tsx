"use client";

import { useEffect, useRef, useState } from "react";

interface DualVideoBgProps {
  readonly videoA: string;
  readonly videoB: string;
  readonly poster: string;
}

export default function DualVideoBg({
  videoA,
  videoB,
  poster,
}: DualVideoBgProps) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const vA = refA.current;
    const vB = refB.current;
    if (!vA || !vB) return;
    void vA.play().catch(() => undefined);
    void vB.play().catch(() => undefined);
    timerRef.current = setInterval(() => {
      setActiveSlot((prev) => (prev === "a" ? "b" : "a"));
    }, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      vA.pause();
      vB.pause();
    };
  }, [videoA, videoB]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={refA}
        key={`a-${videoA}`}
        src={videoA}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
        style={{ opacity: activeSlot === "a" ? 1 : 0 }}
      />
      <video
        ref={refB}
        key={`b-${videoB}`}
        src={videoB}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
        style={{ opacity: activeSlot === "b" ? 1 : 0 }}
      />
    </div>
  );
}
