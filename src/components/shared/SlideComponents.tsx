/**
 * Shared slide components for consistent structure and behavior
 * across all deck slides.
 */

"use client";
import { type ReactNode } from "react";
import {
  motion,
  type MotionStyle,
  type Transition,
  type TargetAndTransition,
} from "framer-motion";
import { OVERLAYS } from "@/lib/animations";

interface BaseSlideProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function BaseSlide({ children, className = "" }: BaseSlideProps) {
  return (
    <section
      className={`relative h-screen w-full flex items-center justify-center overflow-hidden bg-black ${className}`}
    >
      {children}
    </section>
  );
}

interface StaticImageBackgroundProps {
  readonly src: string;
  readonly opacity?: number;
  readonly position?: string;
}

export function StaticImageBackground({
  src,
  opacity = 0.45,
  position = "center",
}: StaticImageBackgroundProps) {
  return (
    <div
      className="absolute inset-0 w-full h-full bg-cover"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
        opacity,
      }}
    />
  );
}

interface AnimatedImageBackgroundProps extends StaticImageBackgroundProps {
  readonly isActive: boolean;
  readonly initialScale?: number;
  readonly animateScale?: number;
  readonly initialOpacity?: number;
  readonly animateOpacity?: number;
  readonly transition?: Transition;
}

export function AnimatedImageBackground({
  src,
  isActive,
  position = "center",
  initialScale = 1.0,
  animateScale = 1.15,
  initialOpacity = 0,
  animateOpacity = 0.55,
  transition = { duration: 15, ease: "easeOut" },
}: AnimatedImageBackgroundProps) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-cover"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
      }}
      initial={{ scale: initialScale, opacity: initialOpacity }}
      animate={
        isActive
          ? { scale: animateScale, opacity: animateOpacity }
          : { scale: initialScale, opacity: initialOpacity }
      }
      transition={{
        scale:
          typeof transition.duration === "number"
            ? {
                duration: transition.duration,
                ease: transition.ease ?? "easeOut",
              }
            : transition,
        opacity: { duration: 2, ease: "easeOut" },
      }}
    />
  );
}

interface OverlayProps {
  readonly variant?: string;
  readonly isAnimated?: boolean;
  readonly isActive?: boolean;
  readonly delay?: number;
}

export function Overlay({
  variant = "solidMedium",
  isAnimated = false,
  isActive = true,
  delay = 0,
}: OverlayProps) {
  const className =
    variant in OVERLAYS
      ? `absolute inset-0 ${OVERLAYS[variant as keyof typeof OVERLAYS]}`
      : `absolute inset-0 ${variant}`;

  if (isAnimated) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay }}
      />
    );
  }

  return <div className={className} />;
}

interface ContentContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function ContentContainer({
  children,
  className = "",
}: ContentContainerProps) {
  return (
    <div className={`relative z-10 text-center px-6 ${className}`}>
      {children}
    </div>
  );
}

interface AnimatedHeadlineProps {
  readonly children: ReactNode;
  readonly isActive: boolean;
  readonly className?: string;
  readonly style?: MotionStyle;
  readonly delay?: number;
  readonly duration?: number;
  readonly ease?: Transition["ease"];
  readonly initial?: TargetAndTransition;
  readonly animate?: TargetAndTransition;
}

export function AnimatedHeadline({
  children,
  isActive,
  className = "",
  style,
  delay = 0.3,
  duration = 1,
  ease = [0.22, 1, 0.36, 1],
  initial = { opacity: 0, scale: 0.9 },
  animate = { opacity: 1, scale: 1 },
}: AnimatedHeadlineProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      animate={isActive ? animate : initial}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedTextProps {
  readonly children: ReactNode;
  readonly isActive: boolean;
  readonly className?: string;
  readonly style?: MotionStyle;
  readonly delay?: number;
  readonly duration?: number;
  readonly yOffset?: number;
}

export function AnimatedText({
  children,
  isActive,
  className = "",
  style,
  delay = 1,
  duration = 0.8,
  yOffset = 15,
}: AnimatedTextProps) {
  return (
    <motion.p
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.p>
  );
}

interface RadialGlowProps {
  readonly isActive: boolean;
  readonly color?: string;
  readonly delay?: number;
  readonly size?: string;
}

export function RadialGlow({
  isActive,
  color = "rgba(255,199,44,0.10)",
  delay = 2.4,
  size = "50% 40%",
}: RadialGlowProps) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 2.5, delay, ease: "easeOut" }}
      style={{
        background: `radial-gradient(ellipse ${size} at 50% 52%, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}

interface LightSweepProps {
  readonly isActive: boolean;
  readonly delay?: number;
  readonly duration?: number;
}

export function LightSweep({
  isActive,
  delay = 0.8,
  duration = 2.5,
}: LightSweepProps) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ x: "-100%", opacity: 0 }}
      animate={isActive ? { x: "100%", opacity: [0, 0.4, 0] } : {}}
      transition={{ duration, delay, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(110deg, transparent 30%, rgba(255,199,44,0.15) 50%, transparent 70%)",
        transform: "skewX(-15deg)",
      }}
    />
  );
}
