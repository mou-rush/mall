"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { EntertainmentTileData } from "../EntertainmentVideoTile";

interface AttractionStripProps {
  readonly attraction: EntertainmentTileData;
  readonly isActive: boolean;
  readonly isHovered: boolean;
  readonly isAnyHovered: boolean;
  readonly isExpanded: boolean;
  readonly onOpen: (id: EntertainmentTileData["id"]) => void;
  readonly onHover: (id: EntertainmentTileData["id"]) => void;
  readonly onLeave: () => void;
}

export default function AttractionStrip({
  attraction,
  isActive,
  isHovered,
  isAnyHovered,
  isExpanded,
  onOpen,
  onHover,
  onLeave,
}: AttractionStripProps) {
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"a" | "b">("a");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB) return;

    if (isActive && !isExpanded) {
      void vA.play().catch(() => undefined);
      void vB.play().catch(() => undefined);

      timerRef.current = setInterval(() => {
        setActiveVideo((prev) => (prev === "a" ? "b" : "a"));
      }, 5000);
    } else {
      vA.pause();
      vB.pause();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isExpanded]);

  let flexGrow = 1;
  if (isHovered) flexGrow = 3.5;
  else if (isAnyHovered) flexGrow = 0.55;

  let labelOpacity = 1;
  if (isHovered) labelOpacity = 0;
  else if (isAnyHovered) labelOpacity = 0.5;

  return (
    <button
      type="button"
      onClick={() => onOpen(attraction.id)}
      onMouseEnter={() => onHover(attraction.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(attraction.id)}
      onBlur={onLeave}
      aria-label={`Open ${attraction.name}`}
      className="relative h-full overflow-hidden border-r border-white/10 text-left outline-none"
      style={{
        flex: flexGrow,
        transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        minWidth: 0,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRefA}
          src={attraction.video}
          poster={attraction.poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{
            transform: isHovered ? "scale(1.04)" : "scale(1)",
            transition:
              "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease-in-out",
            opacity: activeVideo === "a" ? 1 : 0,
          }}
        />
        <video
          ref={videoRefB}
          src={attraction.expandedVideo ?? attraction.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{
            transform: isHovered ? "scale(1.04)" : "scale(1)",
            transition:
              "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease-in-out",
            opacity: activeVideo === "b" ? 1 : 0,
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <Image
          src={attraction.poster}
          alt={attraction.name}
          fill
          sizes="25vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.88) 100%)",
          opacity: isHovered ? 0.75 : 1,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: attraction.accent,
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-2 p-5 md:p-7">
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "0px" : "200px",
            opacity: labelOpacity,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            {attraction.name}
          </p>
        </div>
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "300px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">
            {attraction.name}
          </h2>
          <p className="mt-2 text-xs text-white/70 md:text-sm">
            {attraction.tagline}
          </p>
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em]"
            style={{ background: attraction.accent, color: "#000" }}
          >
            <span>Explore</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
