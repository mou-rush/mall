"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import type { EntertainmentTileData } from "./EntertainmentVideoTile";
import DualVideoBg from "./immersive/DualVideoBg";
import FloatingGallery from "./immersive/FloatingGallery";
import AttractionStrip from "./immersive/AttractionStrip";
import { ATTRACTIONS } from "./immersive/attractions-data";

interface EntertainmentImmersiveSlideProps {
  readonly isActive: boolean;
  readonly initialAttraction?: EntertainmentTileData["id"];
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
      <div className="absolute left-0 right-0 top-0 z-20 flex w-full flex-col items-center justify-center pt-10">
        <p
          className="text-center text-[13px] font-black uppercase tracking-[0.32em] text-white"
          style={{
            letterSpacing: "0.32em",
            fontSize: "1.1rem",
            color: "#90EE90",
            textShadow: "0 2px 16px #003DA5cc, 0 1px 0 #0008",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          Attractions + Entertainment
        </p>
        <p
          className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-white/80"
          style={{
            color: "#fff",
            textShadow: "0 1px 8px #003DA599",
            letterSpacing: "0.28em",
            fontSize: "0.95rem",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          4 World-Class Experiences
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

            {activeAttraction.galleryImages && (
              <FloatingGallery
                images={activeAttraction.galleryImages}
                accent={activeAttraction.accent}
                attractionId={activeAttraction.id}
              />
            )}

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
