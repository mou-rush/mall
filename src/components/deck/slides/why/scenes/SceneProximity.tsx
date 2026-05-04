"use client";
import { motion } from "framer-motion";
import {
  BaseSlide,
  StaticImageBackground,
  Overlay,
  ContentContainer,
  AnimatedHeadline,
  AnimatedText,
} from "@/components/shared/SlideComponents";
import { EASING } from "@/lib/animations";

interface SceneProximityProps {
  readonly isActive: boolean;
}

export default function SceneProximity({ isActive }: SceneProximityProps) {
  return (
    <BaseSlide>
      <StaticImageBackground
        src="/images/why/Why_MOA_Cover.jpg"
        opacity={0.5}
      />
      <Overlay variant="bg-black/65" />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 60, Q 30 45, 60 50, T 120 50"
          stroke="#FFC72C"
          strokeWidth="1.5"
          fill="none"
          opacity="0.35"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 0.35 } : {}}
          transition={{ duration: 2.2, delay: 0.3, ease: EASING.cinematic }}
        />
      </svg>

      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "55%", left: "0%" }}
        initial={{ x: "-10%", y: "-50%", rotate: 90 }}
        animate={isActive ? { x: "110vw", y: "-50%", rotate: 90 } : {}}
        transition={{ duration: 5, delay: 0.3, ease: EASING.smoothOut }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#FFC72C]"
        >
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      <ContentContainer>
        <AnimatedHeadline
          isActive={isActive}
          className="font-black text-white leading-none tracking-tighter"
          style={{ fontSize: "clamp(10rem, 22vw, 26rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          delay={2}
          duration={1.8}
          ease={EASING.reveal}
        >
          12
          <span
            className="text-[#FFC72C] font-light"
            style={{ fontSize: "0.35em", marginLeft: "0.3em" }}
          >
            min
          </span>
        </AnimatedHeadline>

        <AnimatedText
          isActive={isActive}
          className="text-white/80 font-light uppercase tracking-[0.45em]"
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
            marginTop: "2.5rem",
            letterSpacing: "0.45em",
          }}
          delay={2}
          duration={1.8}
          yOffset={0}
        >
          From MSP International Airport
        </AnimatedText>
      </ContentContainer>
    </BaseSlide>
  );
}
