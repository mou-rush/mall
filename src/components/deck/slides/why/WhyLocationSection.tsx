"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const callouts = [
  {
    title: "12 min from MSP Airport",
    detail: "Light Rail direct from Terminal 1 & 2",
  },
  {
    title: "60% travel 150+ miles",
    detail: "Regional draw built into every visit pattern",
  },
  {
    title: "Direct access from I-494 & I-35W",
    detail: "Fast arrival from the Twin Cities and beyond",
  },
] as const;

const PIN_X = 456;
const PIN_Y = 144;

const usPath =
  "M70,207 L89,185 L123,176 L159,165 L214,150 L268,136 L330,126 L387,118 L455,116 L528,121 L588,122 L640,115 L690,101 L730,94 L761,103 L786,121 L803,150 L809,189 L801,219 L791,244 L771,267 L744,286 L714,301 L693,306 L672,300 L646,289 L621,287 L600,297 L580,315 L561,333 L533,347 L501,346 L475,335 L447,320 L414,312 L374,314 L343,321 L311,334 L283,345 L255,345 L232,333 L211,319 L186,303 L160,294 L136,296 L113,311 L95,330 L82,350 L78,329 L74,300 L71,264 Z";

export default function WhyLocationSection({
  scrollerRef,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapStageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !mapStageRef.current ||
      !pinRef.current ||
      !ringRef.current ||
      !cardsRef.current
    ) {
      return;
    }

    const ringLength = ringRef.current.getTotalLength();
    gsap.set(ringRef.current, {
      strokeDasharray: ringLength,
      strokeDashoffset: ringLength,
    });
    gsap.set(pinRef.current, { y: -60, opacity: 0, scale: 0.7 });
    const cardNodes = Array.from(cardsRef.current.children);
    gsap.set(cardNodes, { x: 80, opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollerRef.current ?? undefined,
          start: "top 65%",
          once: true,
        },
      });

      tl.from(".location-section-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6,
        ease: "power2.out",
      })

        .fromTo(
          mapStageRef.current,
          {
            scale: 0.82,
            xPercent: -18,
            yPercent: 4,
            opacity: 0.55,
            filter: "blur(4px)",
            transformOrigin: "50% 50%",
          },
          {
            scale: 1.14,
            xPercent: 4,
            yPercent: -2,
            opacity: 1,
            filter: "blur(0px)",
            duration: 3,
            ease: "power3.inOut",
          },
        )
        .to(
          pinRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.8)",
          },
          "-=0.25",
        )
        .to(
          ringRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.12",
        )
        .to(
          cardNodes,
          {
            x: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full snap-start overflow-hidden bg-[#061120] text-white"
    >
      <div className="section-line location-section-line absolute left-0 right-0 top-0 z-20 h-[2px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,23,0.08),rgba(5,10,23,0.72))]" />
        <div className="absolute inset-[-10%] bg-[radial-gradient(circle_at_30%_40%,rgba(201,168,76,0.12),transparent_22%),radial-gradient(circle_at_68%_30%,rgba(13,72,151,0.26),transparent_30%),linear-gradient(180deg,#07111e,#050c16)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(25deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "110px 110px, 140px 140px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,transparent_0%,transparent_16%,rgba(255,199,44,0.06)_18%,transparent_26%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col px-8 py-14 lg:flex-row lg:items-center lg:px-16">
        <div className="flex-1 lg:pr-12">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7 }}
          >
            Location
          </motion.p>
          <motion.h2
            className="max-w-3xl text-[clamp(2.7rem,6vw,5.6rem)] font-extralight leading-[0.92] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            Built for access.{" "}
            <span className="text-gold-gradient">Positioned for reach.</span>
          </motion.h2>

          <motion.p
            className="mt-5 max-w-2xl text-sm uppercase tracking-[0.26em] text-white/55 lg:text-[0.8rem]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.85, delay: 0.16 }}
          >
            Bloomington, Minnesota — connected by airport, rail, interstate, and
            destination intent.
          </motion.p>

          <div className="relative mt-8 min-h-[320px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl lg:mt-10 lg:min-h-[420px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,199,44,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
            <div
              ref={mapStageRef}
              className="relative h-full min-h-[280px] will-change-transform lg:min-h-[360px]"
            >
              <svg
                viewBox="0 0 860 420"
                className="h-full w-full overflow-visible"
                aria-label="United States location map"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <radialGradient id="moa-pin-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffc72c" stopOpacity="0.62" />
                    <stop offset="100%" stopColor="#ffc72c" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path
                  d={usPath}
                  fill="rgba(8,18,33,0.92)"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="2.5"
                />
                <path
                  d="M428 132 L445 144 L472 152 L505 166"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M450 146 L465 180 L482 220"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1.6"
                  fill="none"
                />
                <path
                  d="M408 140 L384 126 L354 120"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1.6"
                  fill="none"
                />

                <path
                  d={usPath}
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="2"
                />

                <circle
                  ref={ringRef}
                  cx={PIN_X}
                  cy={PIN_Y}
                  r="108"
                  fill="none"
                  stroke="rgba(201,168,76,0.4)"
                  strokeDasharray="8 4"
                  strokeWidth="1.5"
                />

                <circle
                  cx={PIN_X}
                  cy={PIN_Y}
                  r="28"
                  fill="url(#moa-pin-glow)"
                />

                {[0, 0.85].map((delay) => (
                  <motion.circle
                    key={delay}
                    cx={PIN_X}
                    cy={PIN_Y}
                    r="8"
                    fill="none"
                    stroke="rgba(255,199,44,0.6)"
                    strokeWidth="2"
                    animate={{ r: [8, 36], opacity: [0.7, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay,
                    }}
                  />
                ))}

                <foreignObject
                  x={PIN_X - 30}
                  y={PIN_Y - 84}
                  width="60"
                  height="90"
                >
                  <div
                    ref={pinRef}
                    className="flex h-full w-full items-end justify-center"
                  >
                    <div className="relative flex h-14 w-10 items-end justify-center">
                      <span className="absolute bottom-0 h-8 w-[2px] bg-[var(--gold)]/65" />
                      <span className="absolute bottom-5 h-6 w-6 rounded-full border border-[var(--gold)]/75 bg-[var(--gold)] shadow-[0_0_25px_rgba(201,168,76,0.5)]" />
                    </div>
                  </div>
                </foreignObject>

                <text
                  x={PIN_X + 16}
                  y={PIN_Y - 10}
                  fill="#ffc72c"
                  fontSize="14"
                  letterSpacing="3.5"
                >
                  BLOOMINGTON, MN
                </text>
                <text
                  x={PIN_X + 16}
                  y={PIN_Y + 14}
                  fill="rgba(255,255,255,0.48)"
                  fontSize="10"
                  letterSpacing="2.8"
                >
                  MALL OF AMERICA
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex w-full max-w-[420px] flex-col gap-4 lg:mt-0"
          ref={cardsRef}
        >
          <motion.div
            className="ml-auto overflow-hidden rounded-[12px] border border-[var(--gold)]/50 bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="group relative aspect-video w-[220px] sm:w-[280px]">
              <video
                className="h-full w-full object-cover"
                src="/videos/mall_2.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,8,12,0.5))]" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
                <span className="translate-y-2 opacity-0 text-[0.56rem] uppercase tracking-[0.28em] text-white transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Watch Aerial
                </span>
              </div>
              <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[0.48rem] uppercase tracking-[0.28em] text-[var(--gold)] backdrop-blur-md">
                Aerial View
              </div>
            </div>
          </motion.div>

          {callouts.map((callout, index) => (
            <motion.div
              key={callout.title}
              className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: 0.75,
                delay: 0.16 + index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              whileHover={{ x: -6, borderColor: "rgba(201,168,76,0.55)" }}
            >
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[var(--gold)] via-[var(--gold-light)] to-transparent" />
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--gold)]/88">
                Access Advantage {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
                {callout.title}
              </h3>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-white/45">
                {callout.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
