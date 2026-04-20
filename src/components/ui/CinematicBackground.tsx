"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import VideoBackground from "@/components/ui/VideoBackground";

type BackdropVariant = "noir" | "gold";

interface CinematicBackgroundProps {
  readonly isActive: boolean;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly imagePosition?: string;
  readonly videoSrc?: string;
  readonly overlayOpacity?: number;
  readonly variant?: BackdropVariant;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function CinematicBackground({
  isActive,
  imageSrc,
  imageAlt = "",
  imagePosition = "50% 50%",
  videoSrc,
  overlayOpacity = 0.16,
  variant = "noir",
}: Readonly<CinematicBackgroundProps>) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: EASE }}
      aria-hidden
    >
      {videoSrc ? (
        <VideoBackground
          src={videoSrc}
          overlayOpacity={overlayOpacity}
          overlayColor="6,6,8"
        />
      ) : null}

      {imageSrc ? (
        <motion.div
          className="absolute inset-0"
          animate={
            isActive
              ? { scale: [1.02, 1.07, 1.02], x: [0, -14, 0], y: [0, 10, 0] }
              : { scale: 1.02, x: 0, y: 0 }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={100}
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </motion.div>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <motion.div
        className="absolute -inset-24 opacity-70 pointer-events-none"
        animate={isActive ? { x: [0, 22, 0], y: [0, -14, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            variant === "gold"
              ? "radial-gradient(45% 55% at 18% 25%, rgba(201,168,76,0.18), transparent 62%), radial-gradient(55% 60% at 78% 35%, rgba(201,168,76,0.10), transparent 66%), radial-gradient(70% 70% at 50% 90%, rgba(255,255,255,0.05), transparent 60%)"
              : "radial-gradient(55% 60% at 18% 25%, rgba(255,255,255,0.06), transparent 62%), radial-gradient(60% 60% at 78% 35%, rgba(201,168,76,0.12), transparent 66%), radial-gradient(70% 70% at 50% 90%, rgba(255,255,255,0.04), transparent 60%)",
          filter: "blur(2px)",
        }}
      />

      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[url('/images/why/bg-texture.png')] bg-cover" />
    </motion.div>
  );
}
