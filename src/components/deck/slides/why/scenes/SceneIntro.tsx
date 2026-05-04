"use client";
import { useEffect, useRef } from "react";

interface SceneIntroProps {
  readonly isActive: boolean;
}

export default function SceneIntro({ isActive }: SceneIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src="/videos/why/why_moa_intro_scene.mp4"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}
