"use client";
import { motion } from "framer-motion";
import {
  BaseSlide,
  AnimatedImageBackground,
  Overlay,
  ContentContainer,
  RadialGlow,
  LightSweep,
} from "@/components/shared/SlideComponents";
import { EASING, TRANSITIONS } from "@/lib/animations";

interface SceneScaleLandProps {
  readonly isActive: boolean;
}

export default function SceneScaleLand({ isActive }: SceneScaleLandProps) {
  return (
    <BaseSlide>
      <AnimatedImageBackground
        src="/images/why/Why_MOA_Cover.jpg"
        isActive={isActive}
        initialScale={1.0}
        animateScale={1.15}
        initialOpacity={0}
        animateOpacity={0.55}
        transition={TRANSITIONS.kenBurns}
      />
      <Overlay variant="bg-black/60" />

      <RadialGlow
        isActive={isActive}
        delay={1.5}
        size="60% 50%"
        color="rgba(255,199,44,0.12)"
      />

      <LightSweep isActive={isActive} delay={0.8} duration={2.5} />

      <ContentContainer>
        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.div
              className="font-black text-white leading-none tracking-tighter"
              style={{
                fontSize: "clamp(10rem, 22vw, 26rem)",
                paddingRight: "0.1em",
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={isActive ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: EASING.reveal,
              }}
            >
              78
              <span
                className="text-[#FFC72C] font-light"
                style={{ fontSize: "0.4em", marginLeft: "0.25em" }}
              >
                acres
              </span>
            </motion.div>
          </div>
        </div>

        <motion.p
          className="text-white/45 font-light uppercase tracking-[0.45em]"
          style={{
            fontSize: "clamp(0.75rem, 1.3vw, 1.1rem)",
            letterSpacing: "0.45em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 1.8, ease: EASING.easeOut }}
        >
          Built for discovery
        </motion.p>
      </ContentContainer>
    </BaseSlide>
  );
}
