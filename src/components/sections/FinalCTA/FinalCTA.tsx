"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedText from "@/components/ui/AnimatedText";
import VideoBackground from "@/components/ui/VideoBackground";
import { VIDEOS, CTA_PATHS } from "@/lib/constants";
import CTACard from "./CTACard";
import ContactForm from "./ContactForm";
import Signoff from "./Signoff";

export default function FinalCTA() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const [activeForm, setActiveForm] = useState<string | null>(null);

  return (
    <SectionWrapper
      id="cta"
      dark={false}
      className="bg-[var(--moa-black)] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <VideoBackground
          src={VIDEOS.events}
          overlayOpacity={0.9}
          overlayColor="6,6,8"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] 
                        bg-[var(--gold-glow)] rounded-full blur-[200px] opacity-30"
        />

        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern
              id="cta-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16"
        style={{ paddingBlock: "var(--section-pad)" }}
      >
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ready to Close the Deal?
          </motion.p>

          <AnimatedText
            text="Let's Build Together"
            el="h2"
            className="section-title mx-auto"
            variant="words"
          />

          <motion.p
            className="text-[var(--moa-muted)] max-w-xl mx-auto leading-loose mt-6"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            40 million people walked through our doors last year. The question
            isn&rsquo;t whether your brand belongs here. It&rsquo;s what
            you&rsquo;re waiting for.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {CTA_PATHS.map((path, i) => (
            <CTACard
              key={path.id}
              {...path}
              index={i}
              isActive={activeForm === path.id}
              onSelect={() =>
                setActiveForm(activeForm === path.id ? null : path.id)
              }
            />
          ))}
        </div>

        {activeForm && (
          <motion.div
            key={activeForm}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="glass-card rounded-[2px] p-8 lg:p-12 mb-16 overflow-hidden"
          >
            <ContactForm
              type={activeForm}
              onClose={() => setActiveForm(null)}
            />
          </motion.div>
        )}

        <Signoff />
      </div>
    </SectionWrapper>
  );
}
