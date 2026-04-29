"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const zones = [
  {
    id: "north",
    name: "North Garden",
    stores: ["Nordstrom", "Zara", "Aritzia"],
    dining: ["Twin City Grill", "Cantina Laredo"],
    entertainment: ["Luxury promenade", "Event activations"],
    x: 160,
    y: 28,
    width: 240,
    height: 120,
  },
  {
    id: "east",
    name: "East Broadway",
    stores: ["SEA LIFE", "H&M", "Lululemon"],
    dining: ["CRAVE", "Shake Shack"],
    entertainment: ["Aquarium draw", "Tourist traffic"],
    x: 404,
    y: 148,
    width: 120,
    height: 220,
  },
  {
    id: "south",
    name: "South Avenue",
    stores: ["Macy's", "Coach", "Apple"],
    dining: ["Margaritaville", "Food hall access"],
    entertainment: ["Family visitation", "Main circulation"],
    x: 160,
    y: 272,
    width: 240,
    height: 120,
  },
  {
    id: "west",
    name: "West Market",
    stores: ["Nickelodeon Universe", "LEGO", "UNIQLO"],
    dining: ["Culinary hub", "Grab-and-go density"],
    entertainment: ["Theme park adjacency", "High dwell-time energy"],
    x: 36,
    y: 148,
    width: 120,
    height: 220,
  },
] as const;

const badges = [
  { value: "78", label: "Acres" },
  { value: "5.6M", label: "sq ft" },
  { value: "4", label: "Anchor Stores" },
  { value: "50+", label: "Dining Options" },
] as const;

const thumbnails = [
  { id: "nu", label: "Nickelodeon Universe", emoji: "🎢", color: "#7c3aed" },
  { id: "sea", label: "SEA LIFE", emoji: "🐠", color: "#0f766e" },
  { id: "chapel", label: "Wedding Chapel", emoji: "💍", color: "#be185d" },
  { id: "dine", label: "Dining", emoji: "🍽️", color: "#92400e" },
  { id: "lux", label: "Luxury", emoji: "💎", color: "#1d4ed8" },
] as const;

export default function WhyFootprintSection({
  scrollerRef,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeZone, setActiveZone] = useState<(typeof zones)[number] | null>(
    zones[0],
  );
  const [activeThumb, setActiveThumb] = useState<string | null>(null);
  const badgeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [stripPaused, setStripPaused] = useState(false);

  useEffect(() => {
    if (!rootRef.current || !scrollerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footprint-badge", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scrollerRef.current,
          start: "top 66%",
        },
      });

      gsap.from(".footprint-section-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scrollerRef.current,
          start: "top 70%",
        },
      });

      badges.forEach((badge, index) => {
        const node = badgeRefs.current[index];
        if (!node) return;
        const numeric = Number.parseFloat(badge.value.replace(/[^\d.]/g, ""));
        if (Number.isNaN(numeric)) return;
        const state = { value: 0 };
        gsap.to(state, {
          value: numeric,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            scroller: scrollerRef.current,
            start: "top 66%",
          },
          onUpdate: () => {
            node.textContent = badge.value.includes("M")
              ? `${state.value.toFixed(1)}M`
              : `${Math.round(state.value)}${badge.value.includes("+") ? "+" : ""}`;
          },
          onComplete: () => {
            gsap.fromTo(
              node,
              { color: "#fff7df" },
              { color: "#a07830", duration: 0.4 },
            );
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  const handleZoneEnter = (zoneId: string) => {
    gsap.to(`.zone-${zoneId}`, {
      fill: "#C9A84C",
      filter: "drop-shadow(0 0 12px #C9A84C)",
      duration: 0.3,
    });
  };

  const handleZoneLeave = (zoneId: string) => {
    gsap.to(`.zone-${zoneId}`, {
      fill: "rgba(201,168,76,0.18)",
      filter: "drop-shadow(0 0 0px transparent)",
      duration: 0.3,
    });
  };

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full snap-start overflow-hidden bg-[#f3eee6] text-[#201912]"
    >
      <div className="footprint-section-line section-line absolute left-0 right-0 top-0 z-20 h-[2px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(201,168,76,0.18),transparent_25%),radial-gradient(circle_at_84%_72%,rgba(0,61,165,0.08),transparent_28%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1480px] flex-col px-8 py-14 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
            >
              Footprint
            </motion.p>
            <motion.h2
              className="max-w-3xl text-[clamp(2.6rem,5.6vw,5rem)] font-extralight leading-[0.95] tracking-[-0.04em]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              78 acres, choreographed into{" "}
              <span className="text-[var(--gold-deep)]">
                four high-value zones.
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {badges.map((badge, index) => (
              <div
                key={badge.label}
                className="footprint-badge rounded-[22px] border border-black/8 bg-white/55 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)] backdrop-blur-md"
              >
                <p className="text-2xl font-semibold leading-none text-[var(--gold-deep)]">
                  <span
                    ref={(node) => {
                      badgeRefs.current[index] = node;
                    }}
                  >
                    0
                  </span>
                </p>
                <p className="mt-2 text-[0.62rem] uppercase tracking-[0.24em] text-black/50">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-[34px] border border-black/8 bg-white/55 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <svg viewBox="0 0 560 420" className="h-full w-full">
              <rect
                x="160"
                y="148"
                width="240"
                height="120"
                rx="22"
                fill="rgba(0,0,0,0.04)"
                stroke="rgba(0,0,0,0.08)"
              />
              <text
                x="280"
                y="216"
                textAnchor="middle"
                fontSize="18"
                letterSpacing="5"
                fill="rgba(0,0,0,0.22)"
              >
                ATRIUM
              </text>

              {zones.map((zone) => (
                <g key={zone.id}>
                  <motion.rect
                    className={`zone-${zone.id}`}
                    x={zone.x}
                    y={zone.y}
                    rx="20"
                    width={zone.width}
                    height={zone.height}
                    fill="rgba(201,168,76,0.18)"
                    stroke="rgba(201,168,76,0.65)"
                    strokeWidth="2"
                    onHoverStart={() => handleZoneEnter(zone.id)}
                    onHoverEnd={() => handleZoneLeave(zone.id)}
                    onClick={() => setActiveZone(zone)}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      transformOrigin: `${zone.x + zone.width / 2}px ${zone.y + zone.height / 2}px`,
                      cursor: "pointer",
                    }}
                  />
                  <text
                    x={zone.x + zone.width / 2}
                    y={zone.y + zone.height / 2}
                    textAnchor="middle"
                    fontSize="14"
                    letterSpacing="3"
                    fill="#2e2418"
                  >
                    {zone.name.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {activeZone && (
                <motion.div
                  key={activeZone.id}
                  className="rounded-[28px] border border-black/8 bg-white/65 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)] backdrop-blur-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--gold-deep)]">
                    Zone Detail
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {activeZone.name}
                  </h3>

                  {[
                    { label: "Anchor Stores", items: activeZone.stores },
                    { label: "Dining", items: activeZone.dining },
                    { label: "Entertainment", items: activeZone.entertainment },
                  ].map((group) => (
                    <div key={group.label} className="mt-5">
                      <p className="text-[0.58rem] uppercase tracking-[0.24em] text-black/45">
                        {group.label}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-2 text-[0.64rem] uppercase tracking-[0.14em] text-black/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-[28px] border border-black/8 bg-white/55 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.06)] backdrop-blur-md">
              <p className="text-[0.58rem] uppercase tracking-[0.24em] text-black/45">
                Signature Experiences
              </p>
              <div
                className="mt-4 overflow-hidden"
                onMouseEnter={() => setStripPaused(true)}
                onMouseLeave={() => setStripPaused(false)}
              >
                <motion.div
                  className="flex gap-3 pb-2"
                  animate={stripPaused ? { x: undefined } : { x: [0, -420] }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[...thumbnails, ...thumbnails].map((thumb, index) => (
                    <motion.button
                      key={`${thumb.id}-${index}`}
                      layoutId={`why-thumb-${thumb.id}`}
                      onClick={() => setActiveThumb(thumb.id)}
                      className="relative flex h-28 min-w-[156px] flex-col items-center justify-end overflow-hidden rounded-[20px] border border-black/8 text-white shadow-[0_16px_32px_rgba(0,0,0,0.12)]"
                      style={{ background: thumb.color }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <img
                        src={
                          thumb.id === "nu"
                            ? "/images/entertainment/nickelodeon_1.jpg"
                            : thumb.id === "sea"
                              ? "/images/entertainment/sealife_3.jpg"
                              : thumb.id === "chapel"
                                ? "/images/why/Why_MOA_Cover.jpg"
                                : thumb.id === "dine"
                                  ? "/images/entertainment/crayola_1.jpg"
                                  : "/images/entertainment/flyover_1.png"
                        }
                        alt={thumb.label}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.74))]" />
                      <span className="relative z-10 mb-3 px-3 text-[0.58rem] uppercase tracking-[0.2em]">
                        {thumb.label}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
              <AnimatePresence>
                {activeThumb && (
                  <motion.div
                    key={activeThumb}
                    className="fixed inset-0 z-[72] flex items-center justify-center bg-black/65 p-8 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveThumb(null)}
                  >
                    <motion.div
                      layoutId={`why-thumb-${activeThumb}`}
                      className="w-full max-w-[860px] overflow-hidden rounded-[28px] border border-white/10 bg-[#16120f] text-white shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img
                          src={
                            activeThumb === "nu"
                              ? "/images/entertainment/nickelodeon_1.jpg"
                              : activeThumb === "sea"
                                ? "/images/entertainment/sealife_3.jpg"
                                : activeThumb === "chapel"
                                  ? "/images/why/Why_MOA_Cover.jpg"
                                  : activeThumb === "dine"
                                    ? "/images/entertainment/crayola_1.jpg"
                                    : "/images/entertainment/flyover_1.png"
                          }
                          alt={
                            thumbnails.find((thumb) => thumb.id === activeThumb)
                              ?.label
                          }
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]" />
                      </div>
                      <div className="p-6">
                        <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[var(--gold)]/80">
                          Expanded experience
                        </p>
                        <h4 className="mt-3 text-2xl font-semibold">
                          {
                            thumbnails.find((thumb) => thumb.id === activeThumb)
                              ?.label
                          }
                        </h4>
                        <p className="mt-3 max-w-2xl text-sm uppercase tracking-[0.14em] text-white/65">
                          A signature magnet that turns visitation into memory,
                          dwell time into commerce, and adjacency into brand
                          desire.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
