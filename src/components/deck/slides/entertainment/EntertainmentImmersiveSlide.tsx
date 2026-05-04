"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import type { EntertainmentTileData } from "./EntertainmentVideoTile";

interface EntertainmentImmersiveSlideProps {
  readonly isActive: boolean;
  readonly initialAttraction?: EntertainmentTileData["id"];
}

const ATTRACTIONS: ReadonlyArray<EntertainmentTileData> = [
  {
    id: "nick",
    name: "Nickelodeon Universe",
    tagline: "High-energy thrills in warm orange light.",
    poster: "/images/entertainment/nickelodeon_1.jpg",
    video: "/videos/entertainment/nickelodeon.mp4",
    expandedVideo: "/videos/entertainment/nickelodeon_2.mp4",
    accent: "#ff8a00",
    headline: "A full-throttle family magnet at the center of the property.",
    stats: [
      { value: 27, suffix: "", label: "Rides + Attractions" },
      { value: 7, suffix: "ac", label: "Indoor Theme Park" },
      { value: 365, suffix: "d", label: "Year-Round Draw" },
    ],
    ctaLabel: "See Nickelodeon Universe",
    ctaHref: "https://www.mallofamerica.com/directory/nickelodeon-universe",
  },
  {
    id: "sealife",
    name: "SEA LIFE Aquarium",
    tagline: "Slow underwater wonder in blue light.",
    poster: "/images/entertainment/sealife_4.jpg",
    video: "/videos/entertainment/sealife.mp4",
    expandedVideo: "/videos/entertainment/sealife_1.mp4",
    accent: "#118dff",
    headline: "A calmer, longer-stay experience that deepens discovery.",
    stats: [
      { value: 1200, suffix: "+", label: "Sea Creatures" },
      { value: 300, suffix: "ft", label: "Tunnel Experience" },
      { value: 52, suffix: "w", label: "All-Season Appeal" },
    ],
    ctaLabel: "See SEA LIFE Aquarium",
    ctaHref:
      "https://www.mallofamerica.com/directory/sea-life-minnesota-aquarium",
  },
  {
    id: "crayola",
    name: "Crayola Experience",
    tagline: "Colorful, playful hands-on activity footage.",
    poster: "/images/entertainment/crayola_2.webp",
    video: "/videos/entertainment/crayola.mp4",
    expandedVideo: "/videos/entertainment/crayola_1.mp4",
    accent: "#ffd400",
    headline: "Creative family dwell time with bright repeat-visit energy.",
    stats: [
      { value: 25, suffix: "+", label: "Hands-On Activities" },
      { value: 2, suffix: "fl", label: "Immersive Floors" },
      { value: 1, suffix: "x", label: "All-Day Family Anchor" },
    ],
    ctaLabel: "See Crayola Experience",
    ctaHref: "https://www.mallofamerica.com/directory/crayola-experience",
  },
  {
    id: "flyover",
    name: "FlyOver America",
    tagline: "Aerial cinematic landscapes with premium motion.",
    poster: "/images/entertainment/flyover_1.png",
    video: "/videos/entertainment/flyover.mp4",
    expandedVideo: "/videos/entertainment/flyover_1.mp4",
    accent: "#68d3ff",
    headline:
      "A cinematic attraction that makes the whole destination feel larger.",
    stats: [
      { value: 8, suffix: "k", label: "Daily Capacity Potential" },
      { value: 360, suffix: "°", label: "Visual Immersion" },
      { value: 12, suffix: "mo", label: "Seasonless Demand" },
    ],
    ctaLabel: "See FlyOver America",
    ctaHref: "https://www.mallofamerica.com/directory/flyover-america",
  },
];

function DualVideoBg({
  videoA,
  videoB,
  poster,
}: {
  readonly videoA: string;
  readonly videoB: string;
  readonly poster: string;
}) {
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

function AttractionStrip({
  attraction,
  isActive,
  isHovered,
  isAnyHovered,
  isExpanded,
  onOpen,
  onHover,
  onLeave,
}: {
  readonly attraction: EntertainmentTileData;
  readonly isActive: boolean;
  readonly isHovered: boolean;
  readonly isAnyHovered: boolean;
  readonly isExpanded: boolean;
  readonly onOpen: (id: EntertainmentTileData["id"]) => void;
  readonly onHover: (id: EntertainmentTileData["id"]) => void;
  readonly onLeave: () => void;
}) {
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

export default function EntertainmentImmersiveSlide({
  isActive,
  initialAttraction,
}: EntertainmentImmersiveSlideProps) {
  const [expandedId, setExpandedId] = useState<
    EntertainmentTileData["id"] | null
  >(null);
  const [hoveredId, setHoveredId] = useState<
    EntertainmentTileData["id"] | null
  >(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const countersRan = useRef(false);

  const activeAttraction = useMemo(
    () => ATTRACTIONS.find((a) => a.id === expandedId) ?? null,
    [expandedId],
  );

  const openExpanded = useCallback(
    (id: EntertainmentTileData["id"], instant = false) => {
      if (!overlayRef.current) return;
      countersRan.current = false;
      setExpandedId(id);
      if (instant) {
        gsap.set(overlayRef.current, { opacity: 1, pointerEvents: "auto" });
        setTimeout(() => {
          if (panelRef.current)
            gsap.fromTo(
              panelRef.current,
              { x: 80, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            );
        }, 80);
      } else {
        gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "auto" });
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          onComplete: () => {
            if (panelRef.current)
              gsap.fromTo(
                panelRef.current,
                { x: 80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
              );
          },
        });
      }
    },
    [],
  );

  const closeExpanded = useCallback(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        setExpandedId(null);
        if (overlayRef.current)
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        countersRan.current = false;
      },
    });
  }, []);

  const switchAttraction = useCallback(
    (id: EntertainmentTileData["id"]) => {
      if (id === expandedId || !panelRef.current) return;
      countersRan.current = false;
      gsap.to(panelRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setExpandedId(id);
          if (panelRef.current)
            gsap.fromTo(
              panelRef.current,
              { x: -40, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
            );
        },
      });
    },
    [expandedId],
  );

  const handleOpen = useCallback(
    (id: EntertainmentTileData["id"]) => {
      if (expandedId !== null) {
        switchAttraction(id);
      } else {
        openExpanded(id, false);
      }
    },
    [expandedId, openExpanded, switchAttraction],
  );

  useEffect(() => {
    if (initialAttraction) {
      const t = setTimeout(() => openExpanded(initialAttraction, true), 150);
      return () => clearTimeout(t);
    }
  }, [initialAttraction, openExpanded]);

  useEffect(() => {
    if (!expandedId || countersRan.current || !panelRef.current) return;
    const t = setTimeout(() => {
      const counters =
        panelRef.current?.querySelectorAll<HTMLElement>("[data-count-to]") ??
        [];
      counters.forEach((el) => {
        const total = Number(el.dataset.countTo ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const val = { v: 0 };
        gsap.to(val, {
          v: total,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(val.v).toLocaleString()}${suffix}`;
          },
        });
      });
      countersRan.current = true;
    }, 400);
    return () => clearTimeout(t);
  }, [expandedId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedId) closeExpanded();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expandedId, closeExpanded]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-8 py-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Attractions + Entertainment
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          4 world-class experiences
        </p>
      </div>

      <div className="flex h-full w-full">
        {ATTRACTIONS.map((attraction) => (
          <AttractionStrip
            key={attraction.id}
            attraction={attraction}
            isActive={isActive}
            isHovered={hoveredId === attraction.id}
            isAnyHovered={hoveredId !== null}
            isExpanded={expandedId !== null}
            onOpen={handleOpen}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-40"
        style={{ opacity: 0 }}
      >
        {activeAttraction && (
          <>
            <DualVideoBg
              videoA={activeAttraction.video}
              videoB={activeAttraction.expandedVideo ?? activeAttraction.video}
              poster={activeAttraction.poster}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.35)_40%,rgba(0,0,0,0.88)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_35%,transparent_65%,rgba(0,0,0,0.55)_100%)]" />

            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <div
                className="rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] backdrop-blur-sm"
                style={{
                  background: `${activeAttraction.accent}30`,
                  border: `1px solid ${activeAttraction.accent}60`,
                  color: activeAttraction.accent,
                }}
              >
                <span className="relative inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: activeAttraction.accent }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: activeAttraction.accent }}
                    />
                  </span>
                  Live footage · Dual view
                </span>
              </div>
            </div>

            {/* Bottom navigation with labels */}
            <div className="absolute bottom-12 left-1/2 z-50 flex -translate-x-1/2 items-center gap-5">
              {ATTRACTIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => switchAttraction(a.id)}
                  aria-label={a.name}
                  className="group flex flex-col items-center gap-2 transition-all duration-300"
                >
                  <div
                    className="transition-all duration-300"
                    style={{
                      width: a.id === expandedId ? "2rem" : "0.5rem",
                      height: "0.5rem",
                      borderRadius: "9999px",
                      background:
                        a.id === expandedId
                          ? activeAttraction.accent
                          : "rgba(255,255,255,0.3)",
                      boxShadow:
                        a.id === expandedId
                          ? `0 0 12px ${activeAttraction.accent}80`
                          : "none",
                    }}
                  />
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      a.id === expandedId
                        ? "opacity-100"
                        : "opacity-50 group-hover:opacity-80"
                    }`}
                    style={{
                      color:
                        a.id === expandedId ? activeAttraction.accent : "#fff",
                    }}
                  >
                    {a.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            <div
              ref={panelRef}
              className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col justify-end px-8 pb-24 pt-20 md:px-12"
              style={{ opacity: 0, transform: "translateX(80px)" }}
            >
              <div
                className="mb-4 h-[3px] w-12 rounded-full"
                style={{ background: activeAttraction.accent }}
              />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                Attractions + Entertainment
              </p>
              <h2 className="mt-3 text-4xl font-black leading-[0.96] md:text-5xl">
                {activeAttraction.name}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                {activeAttraction.headline}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {activeAttraction.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-sm"
                  >
                    <div
                      data-count-to={stat.value}
                      data-suffix={stat.suffix}
                      className="text-2xl font-black md:text-3xl"
                      style={{ color: activeAttraction.accent }}
                    >
                      0{stat.suffix}
                    </div>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={activeAttraction.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-black transition hover:brightness-110"
                style={{ background: activeAttraction.accent }}
              >
                <span>{activeAttraction.ctaLabel}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
