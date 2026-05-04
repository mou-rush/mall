"use client";
import {
  BaseSlide,
  ContentContainer,
  AnimatedHeadline,
  AnimatedText,
  Overlay,
} from "@/components/shared/SlideComponents";
import { AnimatedVideoBackground } from "@/components/shared/VideoComponents";
import { TEXT_STYLES } from "@/lib/animations";

interface SceneReachProps {
  readonly isActive: boolean;
}

export default function SceneReach({ isActive }: SceneReachProps) {
  return (
    <BaseSlide>
      <AnimatedVideoBackground
        src="/videos/why/visitors.mp4"
        isActive={isActive}
        entranceDirection="bottom"
        duration={1.8}
        continuousZoom
        continuousZoomDuration={25}
        continuousZoomDelay={2.5}
      />

      <Overlay
        variant="gradientVertical"
        isAnimated
        isActive={isActive}
        delay={1.4}
      />

      <ContentContainer>
        <AnimatedHeadline
          isActive={isActive}
          className={`${TEXT_STYLES.heroNumber.className} text-[#FFC72C]`}
          style={{ fontSize: TEXT_STYLES.heroNumber.fontSize }}
          delay={2}
          duration={1.5}
          initial={{ opacity: 0, scale: 0.85 }}
        >
          60%
        </AnimatedHeadline>

        <AnimatedText
          isActive={isActive}
          className="text-white font-light uppercase tracking-[0.3em]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", marginTop: "2.5rem" }}
          delay={3.2}
          duration={1.2}
        >
          Visitors from outside Minnesota
        </AnimatedText>
      </ContentContainer>
    </BaseSlide>
  );
}
