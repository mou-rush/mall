"use client";
import { BaseSlide } from "@/components/shared/SlideComponents";
import { FullScreenVideo } from "@/components/shared/VideoComponents";

interface SceneIntroProps {
  readonly isActive: boolean;
}

export default function SceneIntro({ isActive }: SceneIntroProps) {
  return (
    <BaseSlide>
      <FullScreenVideo
        src="/videos/why/why_moa_intro_scene.mp4"
        isActive={isActive}
      />
    </BaseSlide>
  );
}
