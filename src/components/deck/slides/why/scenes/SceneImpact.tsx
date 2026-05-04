"use client";
import { motion } from "framer-motion";
import {
  BaseSlide,
  Overlay,
  ContentContainer,
  RadialGlow,
} from "@/components/shared/SlideComponents";
import { EASING } from "@/lib/animations";

interface SceneImpactProps {
  readonly isActive: boolean;
}

const WORDS = ["Your", "Brand.", "Here."];
const WORD_COLORS = ["text-white", "text-white", "text-[#FFC72C]"];
const WORD_DELAYS = [0.4, 1.1, 1.9];

export default function SceneImpact({ isActive }: SceneImpactProps) {
  return (
    <BaseSlide>
      <motion.div
        className="absolute inset-[-8%] bg-cover"
        style={{
          backgroundImage: "url(/images/Partner/Partner_Cover.jpg)",
          backgroundPosition: "55% 50%",
        }}
        initial={{ scale: 1.0, opacity: 0 }}
        animate={isActive ? { scale: 1.18, opacity: 1 } : {}}
        transition={{
          scale: { duration: 16, ease: EASING.easeOut },
          opacity: { duration: 2.2, ease: EASING.easeOut },
        }}
      />

      <Overlay variant="bg-black/60" />

      <Overlay variant="bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

      <RadialGlow
        isActive={isActive}
        delay={2.4}
        size="50% 40%"
        color="rgba(255,199,44,0.10)"
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 h-px bg-[#FFC72C]"
        style={{
          top: "calc(50% - clamp(6rem, 13vw, 16rem))",
          width: "clamp(2rem, 5vw, 5rem)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive ? { scaleX: 1, opacity: 0.7 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASING.cinematic }}
      />

      <ContentContainer className="select-none">
        <div
          className="flex flex-col items-center"
          style={{ gap: "clamp(-1rem, -1vw, -0.5rem)" }}
        >
          {WORDS.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={isActive ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 1.05,
                  delay: WORD_DELAYS[i],
                  ease: EASING.smoothOut,
                }}
              >
                <span
                  className={`block font-black uppercase leading-[0.88] tracking-[-0.03em] ${WORD_COLORS[i]}`}
                  style={{
                    fontSize: "clamp(6rem, 14vw, 18rem)",
                    textShadow:
                      i === 2
                        ? "0 0 80px rgba(255,199,44,0.45), 0 0 200px rgba(255,199,44,0.2)"
                        : "0 0 120px rgba(0,0,0,0.9)",
                  }}
                >
                  {word}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p
          className="text-white/40 font-light uppercase tracking-[0.45em]"
          style={{
            fontSize: "clamp(0.65rem, 1.1vw, 1rem)",
            marginTop: "clamp(2rem, 4vh, 3.5rem)",
            letterSpacing: "0.45em",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 3.1, ease: EASING.easeOut }}
        >
          40 million visitors. One destination.
        </motion.p>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: [0, 1, 0.6] } : {}}
          transition={{ duration: 2, delay: 2.8, ease: EASING.easeOut }}
          style={{
            background:
              "radial-gradient(ellipse 40% 25% at 50% 75%, rgba(255,199,44,0.14) 0%, transparent 70%)",
          }}
        />
      </ContentContainer>
    </BaseSlide>
  );
}
