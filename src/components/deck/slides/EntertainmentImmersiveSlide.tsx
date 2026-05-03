"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { VideoHTMLAttributes } from "react";
import gsap from "gsap";
import type { EntertainmentTileData } from "./EntertainmentVideoTile";

interface EntertainmentImmersiveSlideProps {
  readonly isActive: boolean;
  readonly initialAttraction?: EntertainmentTileData["id"];
}

const EntertainmentVideoTile = dynamic(
  () => import("./EntertainmentVideoTile"),
  { ssr: false },
);

const lazyVideoProps = {
  loading: "lazy",
} as unknown as VideoHTMLAttributes<HTMLVideoElement>;

export default function EntertainmentImmersiveSlide({
  isActive,
  initialAttraction,
}: EntertainmentImmersiveSlideProps) {
  const [expandedId, setExpandedId] = useState<
    EntertainmentTileData["id"] | null
  >(initialAttraction ?? null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLHeadingElement | null>(null);
  const tileRefs = useRef<
    Record<EntertainmentTileData["id"], HTMLButtonElement | null>
  >({
    nick: null,
    sealife: null,
    crayola: null,
    flyover: null,
  });

  const attractions = useMemo<ReadonlyArray<EntertainmentTileData>>(
    () => [
      {
        id: "nick",
        name: "Nickelodeon Universe",
        tagline: "High-energy thrills in warm orange light.",
        poster: "/images/entertainment/nickelodeon_1.jpg",
        video: "/videos/entertainment/nickelodeon.mp4",
        expandedVideo: "/videos/entertainment/nickelodeon_2.mp4",
        accent: "#ff8a00",
        headline:
          "A full-throttle family magnet at the center of the property.",
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
    ],
    [],
  );

  const activeAttraction = useMemo(
    () => attractions.find((item) => item.id === expandedId) ?? null,
    [attractions, expandedId],
  );

  useEffect(() => {
    setExpandedId(initialAttraction ?? null);
  }, [initialAttraction]);

  useEffect(() => {
    if (!isActive || !closingRef.current) return;
    const words = closingRef.current.querySelectorAll(".closing-word");
    gsap.set(words, { opacity: 0, y: 22 });
    const tween = gsap.to(words, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: "power3.out",
      delay: 0.2,
    });

    return () => {
      tween.kill();
    };
  }, [isActive]);

  useEffect(() => {
    if (!expandedId || !panelRef.current) return;
    const counters =
      panelRef.current.querySelectorAll<HTMLElement>("[data-count-to]");
    counters.forEach((counter) => {
      const total = Number(counter.dataset.countTo ?? 0);
      const suffix = counter.dataset.suffix ?? "";
      const value = { current: 0 };
      gsap.to(value, {
        current: total,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = `${Math.round(value.current).toLocaleString()}${suffix}`;
        },
      });
    });
  }, [expandedId]);

  const setTileRef = (
    id: EntertainmentTileData["id"],
    el: HTMLButtonElement | null,
  ) => {
    tileRefs.current[id] = el;
  };

  const openAttraction = (id: EntertainmentTileData["id"]) => {
    if (isAnimating || !containerRef.current || !expandedRef.current) return;
    const tileEl = tileRefs.current[id];
    if (!tileEl) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tileRect = tileEl.getBoundingClientRect();

    setIsAnimating(true);
    setExpandedId(id);

    const top = tileRect.top - containerRect.top;
    const left = tileRect.left - containerRect.left;
    const right = containerRect.right - tileRect.right;
    const bottom = containerRect.bottom - tileRect.bottom;

    gsap.set(expandedRef.current, {
      opacity: 1,
      clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`,
      pointerEvents: "auto",
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        if (panelRef.current) {
          gsap.fromTo(
            panelRef.current,
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          );
        }
        setIsAnimating(false);
      },
    });

    timeline
      .to("[data-entertainment-tile]", {
        opacity: (_index, target) =>
          target.getAttribute("data-entertainment-tile") === id ? 1 : 0,
        scale: (_index, target) =>
          target.getAttribute("data-entertainment-tile") === id ? 1 : 0.92,
        duration: 0.45,
        ease: "power2.out",
      })
      .to(
        expandedRef.current,
        {
          clipPath: "inset(0px 0px 0px 0px)",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0,
      );
  };

  return (
    <section className="min-h-screen w-full bg-black text-white">
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="grid h-full grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1">
          {attractions.map((attraction) => (
            <EntertainmentVideoTile
              key={attraction.id}
              attraction={attraction}
              isExpanded={Boolean(expandedId)}
              isDimmed={Boolean(expandedId && expandedId !== attraction.id)}
              shouldPlay={isActive && !isAnimating}
              onOpen={openAttraction}
              setTileRef={setTileRef}
            />
          ))}
        </div>

        <div
          ref={expandedRef}
          className="pointer-events-none absolute inset-0 z-30 opacity-0"
        >
          {activeAttraction && (
            <>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={activeAttraction.video}
                poster={activeAttraction.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                {...lazyVideoProps}
              />
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-0"
                src={activeAttraction.expandedVideo ?? activeAttraction.video}
                poster={activeAttraction.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                {...lazyVideoProps}
                onCanPlay={(event) => {
                  gsap.to(event.currentTarget, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                }}
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.24)_40%,rgba(0,0,0,0.92)_100%)]" />

              <div
                ref={panelRef}
                className="absolute right-0 top-0 z-40 flex h-full w-full max-w-[560px] flex-col justify-end bg-gradient-to-l from-black/90 via-black/72 to-transparent p-6 md:p-10"
                style={{ opacity: 0, transform: "translateX(120px)" }}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                  Attractions + Entertainment
                </p>
                <h2 className="mt-3 text-4xl font-black leading-[0.98] md:text-5xl">
                  {activeAttraction.name}
                </h2>
                <p className="mt-4 max-w-md text-base text-white/78 md:text-lg">
                  {activeAttraction.headline}
                </p>

                <div className="mt-8 grid gap-3">
                  {activeAttraction.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4"
                    >
                      <div
                        data-count-to={stat.value}
                        data-suffix={stat.suffix}
                        className="text-3xl font-black text-[#FFC72C]"
                      >
                        0{stat.suffix}
                      </div>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/68">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={activeAttraction.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFC72C] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110"
                >
                  {activeAttraction.ctaLabel}
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-[#06080f] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h3
            ref={closingRef}
            className="text-balance text-center text-4xl font-black leading-tight md:text-6xl"
          >
            {"Four world-class experiences. One address."
              .split(" ")
              .map((word) => (
                <span key={word} className="closing-word mr-3 inline-block">
                  {word}
                </span>
              ))}
          </h3>

          <div className="mx-auto mt-10 max-w-4xl space-y-3 text-center text-sm leading-relaxed text-white/72 md:text-lg">
            <p>
              A tenant sees traffic with emotional pull, not just pass-through.
            </p>
            <p>
              A sponsor sees four distinct audience energies under one roof.
            </p>
            <p>
              An event partner sees a place that already feels impossible to
              ignore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
