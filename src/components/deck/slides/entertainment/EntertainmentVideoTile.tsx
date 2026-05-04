"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export interface EntertainmentTileStat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export interface EntertainmentTileData {
  readonly id: "nick" | "sealife" | "crayola" | "flyover";
  readonly name: string;
  readonly tagline: string;
  readonly poster: string;
  readonly video: string;
  readonly expandedVideo?: string;
  readonly accent: string;
  readonly headline: string;
  readonly stats: ReadonlyArray<EntertainmentTileStat>;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

interface EntertainmentVideoTileProps {
  readonly attraction: EntertainmentTileData;
  readonly isExpanded: boolean;
  readonly isDimmed: boolean;
  readonly shouldPlay: boolean;
  readonly onOpen: (id: EntertainmentTileData["id"]) => void;
  readonly setTileRef: (
    id: EntertainmentTileData["id"],
    el: HTMLButtonElement | null,
  ) => void;
}

function EntertainmentVideoTile({
  attraction,
  isExpanded,
  isDimmed,
  shouldPlay,
  onOpen,
  setTileRef,
}: EntertainmentVideoTileProps) {
  const tileRef = useRef<HTMLButtonElement | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inViewport, setInViewport] = useState(true);

  const overlayStyle = useMemo(
    () => ({
      background: `linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.82) 100%), linear-gradient(140deg, ${attraction.accent}44 0%, transparent 44%)`,
    }),
    [attraction.accent],
  );

  useEffect(() => {
    setTileRef(attraction.id, tileRef.current);
    return () => setTileRef(attraction.id, null);
  }, [attraction.id, setTileRef]);

  useEffect(() => {
    if (!tileRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(tileRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!posterRef.current) return;
    const tween = gsap.to(posterRef.current, {
      scale: 1.06,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldBeActive = shouldPlay && inViewport && !isExpanded;
    if (shouldBeActive) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inViewport, isExpanded, shouldPlay]);

  const handleEnter = () => {
    if (!overlayRef.current || !titleRef.current || !ctaRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0.48,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!overlayRef.current || !titleRef.current || !ctaRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0.68,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, { scale: 1, duration: 0.35, ease: "power2.out" });
    gsap.to(ctaRef.current, {
      y: 15,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={() => onOpen(attraction.id)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      data-entertainment-tile={attraction.id}
      aria-label={
        isDimmed ? `Switch to ${attraction.name}` : `Open ${attraction.name}`
      }
      className="relative h-full w-full overflow-hidden border border-white/10 text-left"
      style={{
        // Dimmed tiles stay fully interactive — they act as direct navigation targets
        opacity: isDimmed ? 0.06 : 1,
        cursor: isDimmed ? "pointer" : "default",
      }}
    >
      {/* Poster with Ken Burns */}
      <div ref={posterRef} className="absolute inset-0">
        <Image
          src={attraction.poster}
          alt={attraction.name}
          fill
          priority={false}
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Looping tile video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={attraction.video}
        poster={attraction.poster}
        muted
        loop
        playsInline
        preload="none"
      />

      {/* Gradient + accent overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ ...overlayStyle, opacity: 0.68 }}
      />

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <h2
          ref={titleRef}
          className="text-2xl font-black leading-none text-white md:text-4xl"
        >
          {attraction.name}
        </h2>
        <p className="mt-2 max-w-[18rem] text-xs text-white/80 md:text-sm">
          {attraction.tagline}
        </p>

        <div
          ref={ctaRef}
          className="mt-4 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_28px_rgba(255,255,255,0.22)] md:text-xs"
          style={{ opacity: 0, transform: "translateY(15px)" }}
        >
          Explore
        </div>
      </div>
    </button>
  );
}

export default EntertainmentVideoTile;
