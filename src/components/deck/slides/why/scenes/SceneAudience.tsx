"use client";
import {
  BaseSlide,
  StaticImageBackground,
  Overlay,
  ContentContainer,
  AnimatedHeadline,
  AnimatedText,
} from "@/components/shared/SlideComponents";
import { TEXT_STYLES } from "@/lib/animations";

interface SceneAudienceProps {
  readonly isActive: boolean;
}

export default function SceneAudience({ isActive }: SceneAudienceProps) {
  return (
    <BaseSlide>
      <StaticImageBackground src="/images/Home/Home_Hero.jpg" opacity={0.45} />
      <Overlay variant="solidMedium" />

      <ContentContainer>
        <AnimatedHeadline
          isActive={isActive}
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: "clamp(8rem, 18vw, 22rem)" }}
          delay={0.3}
          duration={1}
        >
          <span className="text-white">8</span>
          <span
            className="text-white/20 font-light"
            style={{ fontSize: "0.4em", margin: "0 0.3em" }}
          >
            —
          </span>
          <span className="text-[#FFC72C]">82</span>
        </AnimatedHeadline>

        <AnimatedText
          isActive={isActive}
          className={TEXT_STYLES.supporting.className}
          style={{
            fontSize: TEXT_STYLES.supporting.fontSize,
            marginTop: "2.5rem",
          }}
          delay={1}
          duration={0.8}
          yOffset={0}
        >
          Universal appeal
        </AnimatedText>
      </ContentContainer>
    </BaseSlide>
  );
}
