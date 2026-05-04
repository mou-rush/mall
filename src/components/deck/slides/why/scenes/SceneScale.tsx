"use client";
import { useEffect, useRef, useState } from "react";
import {
  BaseSlide,
  StaticImageBackground,
  Overlay,
  ContentContainer,
  AnimatedHeadline,
  AnimatedText,
} from "@/components/shared/SlideComponents";
import { TEXT_STYLES } from "@/lib/animations";

interface SceneScaleProps {
  readonly isActive: boolean;
}

export default function SceneScale({ isActive }: SceneScaleProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;

    let current = 0;
    const target = 520;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <BaseSlide>
      <StaticImageBackground
        src="/images/retail/Retail_Leasing_Cover.jpg"
        opacity={0.45}
      />
      <Overlay variant="solidMedium" />

      <ContentContainer>
        <AnimatedHeadline
          isActive={isActive}
          className={`${TEXT_STYLES.heroNumber.className} text-white tabular-nums`}
          style={{ fontSize: TEXT_STYLES.heroNumber.fontSize }}
          delay={0.2}
          duration={0.8}
        >
          {count}
          <span className="text-[#FFC72C]">+</span>
        </AnimatedHeadline>

        <AnimatedText
          isActive={isActive}
          className={TEXT_STYLES.supporting.className}
          style={{
            fontSize: TEXT_STYLES.supporting.fontSize,
            marginTop: "2.5rem",
          }}
          delay={1.2}
          duration={0.8}
          yOffset={0}
        >
          Stores &amp; restaurants
        </AnimatedText>
      </ContentContainer>
    </BaseSlide>
  );
}
