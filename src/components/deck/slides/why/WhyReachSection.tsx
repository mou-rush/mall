"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 40, suffix: "M+", label: "annual visitors" },
  { value: 10, suffix: "", label: "top 10 U.S. tourist destination" },
  { value: 3, suffix: "+", label: "avg. dwell time hours" },
] as const;

const markers = [8, 18, 35, 55, 82] as const;

const originSegments = [
  { label: "Local (Twin Cities)", value: 40 },
  { label: "Regional (150+ miles)", value: 60 },
  { label: "International", value: 35 },
] as const;

const audienceIcons = [
  "child",
  "teen",
  "couple",
  "family",
  "senior",
  "tourist",
] as const;

function AudienceIcon({ type }: { type: (typeof audienceIcons)[number] }) {
  switch (type) {
    case "child":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8">
          <circle
            cx="24"
            cy="12"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 18v16M16 24l8 4 8-4M18 40l6-10 6 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "teen":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8">
          <circle
            cx="24"
            cy="12"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 18v18M16 23h16M18 40l6-10 6 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "couple":
      return (
        <svg viewBox="0 0 56 48" className="h-9 w-9">
          <circle
            cx="18"
            cy="12"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="38"
            cy="12"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M18 18v14M38 18v14M10 40l8-10 8 10M30 40l8-10 8 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "family":
      return (
        <svg viewBox="0 0 62 48" className="h-9 w-9">
          <circle
            cx="18"
            cy="12"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="44"
            cy="12"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="31"
            cy="18"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M18 18v14M44 18v14M31 22v10M10 40l8-10 8 10M36 40l8-10 8 10M24 40l7-8 7 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "senior":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8">
          <circle
            cx="24"
            cy="12"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 18v16M18 24h10M18 40l6-10 6 10M33 22v16M33 38h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 56 48" className="h-9 w-9">
          <circle
            cx="22"
            cy="12"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M22 18v14M14 24h16M16 40l6-10 6 10M35 22l7 5-7 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export default function WhyReachSection({
  scrollerRef,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!rootRef.current || !scrollerRef.current) return;

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.05,
          duration: 25,
          ease: "none",
        });
      }

      gsap.from(".audience-icon", {
        y: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scrollerRef.current,
          start: "top 62%",
        },
      });

      gsap.from(".reach-section-line", {
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

      gsap.from(".bar-fill", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scrollerRef.current,
          start: "top 62%",
        },
      });

      gsap.from(".age-marker", {
        scale: 0,
        opacity: 0,
        stagger: 0.09,
        duration: 0.45,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scrollerRef.current,
          start: "top 62%",
        },
      });

      stats.forEach((stat, index) => {
        const target = valueRefs.current[index];
        if (!target) return;

        const state = { value: 0 };
        gsap.to(state, {
          value: stat.value,
          duration: 1.6,
          ease: "power2.out",
          snap: { value: 1 },
          scrollTrigger: {
            trigger: target,
            scroller: scrollerRef.current,
            start: "top 82%",
          },
          onUpdate: () => {
            target.textContent = `${Math.round(state.value)}${stat.suffix}`;
          },
        });
      });

      originSegments.forEach((segment, index) => {
        gsap.fromTo(
          `.origin-bar-${index}`,
          { width: 0 },
          {
            width: `${segment.value}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              scroller: scrollerRef.current,
              start: "top 60%",
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full snap-start overflow-hidden bg-[#1a0d15] text-white"
    >
      <div className="section-line reach-section-line absolute left-0 right-0 top-0 z-20 h-[2px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        src="/videos/inside_mall.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,9,0.18),rgba(7,6,9,0.75)),radial-gradient(circle_at_18%_22%,rgba(201,168,76,0.16),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(91,33,182,0.24),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1480px] flex-col px-8 py-14 lg:flex-row lg:items-center lg:px-16">
        <div className="flex-1 lg:pr-14">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
          >
            Reach
          </motion.p>
          <motion.h2
            className="max-w-3xl text-[clamp(2.7rem,5.8vw,5.2rem)] font-extralight leading-[0.94] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {"From age 8 to 82,".split(" ").map((word, index) => (
              <motion.span
                key={word + index}
                className="mr-3 inline-block"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
            <span className="mr-3 inline-block">the</span>
            <span className="mr-3 inline-block">audience</span>
            <span className="mr-3 inline-block">doesn&apos;t</span>
            <span className="mr-3 inline-block">narrow.</span>
            <motion.span
              className="inline-block text-gold-gradient"
              animate={{ color: ["#ffffff", "#C9A84C", "#ffffff"] }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              It expands.
            </motion.span>
          </motion.h2>

          <div className="mt-8 flex flex-wrap gap-4">
            {audienceIcons.map((icon, index) => (
              <motion.div
                key={`${icon}-${index}`}
                className="audience-icon flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-[var(--gold)] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.4 + index * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.12,
                }}
              >
                <AudienceIcon type={icon} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.24em] text-white/45">
              <span>Age 8</span>
              <span className="text-[var(--gold)]/85">Age Reach Spectrum</span>
              <span>Age 82</span>
            </div>

            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                {markers.map((marker) => (
                  <motion.div
                    key={marker}
                    className="age-marker rounded-full border border-[var(--gold)]/35 bg-black/25 px-2 py-1 text-[0.58rem] font-mono text-[var(--gold)]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                  >
                    {marker}
                  </motion.div>
                ))}
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                <div className="bar-fill absolute inset-y-0 left-0 right-0 mx-auto h-full w-full rounded-full bg-[linear-gradient(90deg,#C9A84C_0%,#ffffff_50%,#C9A84C_100%)] shadow-[0_0_20px_rgba(201,168,76,0.5)]" />
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-[22px] border border-white/10 bg-black/15 p-4 font-mono"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.7, delay: 0.18 + index * 0.08 }}
                >
                  <p className="text-[2rem] font-semibold leading-none text-[var(--gold)]">
                    <span
                      ref={(node) => {
                        valueRefs.current[index] = node;
                      }}
                    >
                      0{stat.suffix}
                    </span>
                  </p>
                  <p className="mt-3 text-[0.62rem] uppercase tracking-[0.24em] text-white/55">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex w-full max-w-[430px] flex-col items-center lg:mt-0">
          <motion.div
            className="w-full rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, delay: 0.15 }}
          >
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[var(--gold)]/80">
              Visitor Origin Breakdown
            </p>
            <div className="mt-6 space-y-5 font-mono">
              {originSegments.map((segment, index) => (
                <motion.div
                  key={segment.label}
                  className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.7, delay: 0.18 + index * 0.08 }}
                >
                  <div className="flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.18em] text-white/65">
                    <span>{segment.label}</span>
                    <span className="text-[var(--gold)]">{segment.value}%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/35">
                    <div
                      className={`origin-bar-${index} h-full rounded-full bg-[linear-gradient(90deg,#C9A84C_0%,#f0d080_100%)]`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
