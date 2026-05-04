"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { motion, type Transition } from "framer-motion";

export function useVideoPlayback(
  isActive: boolean,
  videoRef: React.RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, videoRef]);
}

interface StaticVideoBackgroundProps {
  readonly src: string;
  readonly isActive: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
}

export function StaticVideoBackground({
  src,
  isActive,
  className = "absolute inset-0 w-full h-full object-cover",
  style,
}: StaticVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoPlayback(isActive, videoRef);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}

interface AnimatedVideoBackgroundProps {
  readonly src: string;
  readonly isActive: boolean;
  readonly entranceDirection?: "right" | "bottom" | "left" | "top" | "none";
  readonly initialScale?: number;
  readonly scaleSequence?: number[];
  readonly duration?: number;
  readonly ease?: Transition["ease"];
  readonly continuousZoom?: boolean;
  readonly continuousZoomDuration?: number;
  readonly continuousZoomDelay?: number;
}

export function AnimatedVideoBackground({
  src,
  isActive,
  entranceDirection = "bottom",
  initialScale = 1.1,
  scaleSequence = [1.1, 1, 1.05],
  duration = 1.8,
  ease = [0.22, 1, 0.36, 1],
  continuousZoom = false,
  continuousZoomDuration = 25,
  continuousZoomDelay = 2.5,
}: AnimatedVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoPlayback(isActive, videoRef);

  const getInitialPosition = () => {
    switch (entranceDirection) {
      case "right":
        return { x: "100%", y: 0 };
      case "bottom":
        return { x: 0, y: "100%" };
      case "left":
        return { x: "-100%", y: 0 };
      case "top":
        return { x: 0, y: "-100%" };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPosition = getInitialPosition();
  const hasEntrance = entranceDirection !== "none";

  return (
    <>
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{
          ...initialPosition,
          scale: hasEntrance ? initialScale : 1,
        }}
        animate={
          isActive
            ? {
                x: 0,
                y: 0,
                scale: hasEntrance ? scaleSequence : 1,
              }
            : {
                ...initialPosition,
                scale: hasEntrance ? initialScale : 1,
              }
        }
        transition={{
          x: { duration, ease },
          y: { duration, ease },
          scale: {
            duration,
            ease,
            times: hasEntrance ? [0, 0.5, 1] : undefined,
          },
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={src}
          loop
          muted
          playsInline
          preload="auto"
        />
      </motion.div>

      {continuousZoom && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={isActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{
            duration: continuousZoomDuration,
            delay: continuousZoomDelay,
            ease: "linear",
          }}
          style={{ pointerEvents: "none" }}
        />
      )}
    </>
  );
}

interface FullScreenVideoProps {
  readonly src: string;
  readonly isActive: boolean;
}

export function FullScreenVideo({ src, isActive }: FullScreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      src={src}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
