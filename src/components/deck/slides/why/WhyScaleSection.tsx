"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLeasingContent, getLeasingStats } from "@/lib/data-service";
import { TICKER_FACTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const blurbs: Record<string, string> = {
  "Specialty Stores":
    "Retail depth that supports discovery, repeat visits, and category dominance.",
  "Hotels Nearby":
    "A hospitality halo that turns shoppers into multi-day guests.",
  "Minutes from MSP":
    "Fast arrival from gates to storefronts with minimal friction.",
  "Outside 150 Miles":
    "A true destination audience, not just a neighborhood mall customer.",
  "Age Reach":
    "Family, tourist, teen, and luxury audiences coexist in one place.",
  Acres:
    "Prime land scale that supports retail, dining, attractions, and future growth.",
};

export default function WhyScaleSection({
  scrollerRef,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stats = getLeasingStats();
  const content = getLeasingContent().why;
  const countRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current || !scrollerRef.current) return;

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: scrollerRef.current,
            start: "top 65%",
            once: true,
          },
        });

        tl.fromTo(
          videoRef.current,
          { scale: 1.1, opacity: 0.4 },
          { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" },
        ).from(
          ".scale-stat",
          {
            scale: 2.5,
            opacity: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=1.4",
        );
      }

      if (dividerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: dividerRef.current,
            scroller: scrollerRef.current,
            start: "top 80%",
          },
        });

        tl.from(dividerRef.current, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power2.out",
        }).to(dividerRef.current, {
          filter: "drop-shadow(0 0 6px #C9A84C)",
          duration: 0.25,
          yoyo: true,
          repeat: 1,
        });
      }

      gsap.from(".scale-section-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollerRef.current,
          start: "top 70%",
        },
      });

      stats.forEach((stat, index) => {
        const target = countRefs.current[index];
        if (!target || typeof stat.countTo !== "number") return;

        const state = { value: 0 };
        gsap.to(state, {
          value: stat.countTo,
          duration: 0.8,
          ease: "power4.out",
          snap: { value: 1 },
          scrollTrigger: {
            trigger: target,
            scroller: scrollerRef.current,
            start: "top 82%",
          },
          onUpdate: () => {
            target.textContent = `${stat.prefix ?? ""}${Math.round(state.value).toLocaleString()}${stat.suffix ?? ""}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollerRef, stats]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dots = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.0018 + 0.0004,
      drift: (Math.random() - 0.5) * 0.0008,
    }));

    let frame = 0;
    let animationId = 0;

    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    };

    const render = () => {
      frame += 1;
      context.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.y -= dot.speed;
        dot.x += dot.drift;
        if (dot.y < -0.05) dot.y = 1.05;
        if (dot.x < -0.05) dot.x = 1.05;
        if (dot.x > 1.05) dot.x = -0.05;

        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${0.05 + Math.sin(frame * 0.01 + dot.x * 6) * 0.03 + 0.1})`;
        context.arc(
          dot.x * canvas.width,
          dot.y * canvas.height,
          dot.size,
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      animationId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full snap-start overflow-hidden bg-[var(--moa-black)] text-white"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        src="/videos/inside_mall.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.82),rgba(0,21,58,0.72)_45%,rgba(0,0,0,0.9))]" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-15" />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0.6px, transparent 0.8px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.25) 0.6px, transparent 0.8px)",
          backgroundSize: "160px 160px, 120px 120px",
          animation: "grain-drift 9s steps(8) infinite",
        }}
      />
      <div className="scale-section-line section-line absolute left-0 right-0 top-0 z-20 h-[2px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1480px] flex-col justify-center px-8 py-14 lg:px-16">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
        >
          {content.eyebrow}
        </motion.p>
        <motion.h2
          className="section-title max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          {content.title}
        </motion.h2>
        <div
          ref={dividerRef}
          className="divider mt-6 h-[2px] w-full max-w-[640px] origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent"
        />

        <div className="mt-10 grid auto-rows-fr grid-cols-12 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const featured = index === 0;
            const className = featured
              ? "col-span-12 lg:col-span-7 min-h-[260px] lg:min-h-[320px]"
              : index === 1
                ? "col-span-12 md:col-span-6 lg:col-span-5 min-h-[180px]"
                : "col-span-12 md:col-span-6 lg:col-span-3 min-h-[170px]";

            return (
              <motion.div
                key={stat.label}
                className={`why-stat-card scale-stat group relative overflow-hidden rounded-[8px] border border-white/10 border-t-[1px] border-t-[#C9A84C] bg-[rgba(255,255,255,0.04)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-[20px] lg:p-8 ${className}`}
                whileHover={{ scale: 1.04, borderColor: "#C9A84C" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,61,165,0.22),transparent_42%)] opacity-80" />
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] translate-x-[-100%] transition-transform duration-[1400ms] group-hover:translate-x-[100%]" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <p
                      className={
                        featured
                          ? "text-gold-gradient text-[clamp(4.5rem,11vw,9rem)] font-semibold leading-[0.88] tracking-[-0.05em]"
                          : "text-[var(--moa-white)] text-[clamp(2.9rem,7vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]"
                      }
                    >
                      <span
                        ref={(node) => {
                          countRefs.current[index] = node;
                        }}
                      >
                        {typeof stat.countTo === "number"
                          ? `${stat.prefix ?? ""}0${stat.suffix ?? ""}`
                          : stat.value}
                      </span>
                    </p>
                    <p className="mt-3 text-[0.8rem] uppercase tracking-[0.28em] text-white/82 lg:text-[0.95rem]">
                      {stat.label}
                    </p>
                    <p className="mt-3 max-w-[30ch] text-[0.62rem] uppercase tracking-[0.22em] text-[var(--gold)]/0 transition-colors duration-300 group-hover:text-[var(--gold)]/90">
                      {blurbs[stat.label]}
                    </p>
                  </div>

                  {stat.sub && (
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px w-8 bg-[var(--gold)]/70" />
                      <p className="text-[0.62rem] uppercase tracking-[0.36em] text-[var(--gold)]/90">
                        {stat.sub}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-[var(--gold)]/20 bg-black/90 py-3">
          <div className="ticker-track flex gap-8 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--gold)]">
            {[...TICKER_FACTS, ...TICKER_FACTS].map((fact, index) => (
              <span key={`${fact}-${index}`} className="whitespace-nowrap">
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
