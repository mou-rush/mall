"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "hover" | "click";

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 38, mass: 0.5 };
  const ringConfig = { stiffness: 220, damping: 32, mass: 0.8 };

  const dotX = useSpring(rawX, springConfig);
  const dotY = useSpring(rawY, springConfig);
  const ringX = useSpring(rawX, ringConfig);
  const ringY = useSpring(rawY, ringConfig);

  const prevVariantRef = useRef<CursorVariant>("default");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setVariant("click");
    const onUp = () => setVariant(prevVariantRef.current);

    const onOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a,button,[role='button'],[tabindex],.hub-node",
      );
      const next: CursorVariant = isInteractive ? "hover" : "default";
      prevVariantRef.current = next;
      setVariant(next);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOverInteractive);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOverInteractive);
    };
  }, [rawX, rawY, visible]);

  if (!visible) return null;

  const isHover = variant === "hover";
  const isClick = variant === "click";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHover ? 6 : isClick ? 4 : 6,
          height: isHover ? 6 : isClick ? 4 : 6,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full"
          style={{
            width: "100%",
            height: "100%",
            background: isHover ? "var(--gold)" : "var(--moa-white)",
            boxShadow: isHover ? "0 0 12px rgba(201,168,76,0.8)" : undefined,
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHover
            ? "rgba(201,168,76,0.7)"
            : "rgba(255,255,255,0.35)",
        }}
        animate={{
          width: isHover ? 44 : isClick ? 22 : 28,
          height: isHover ? 44 : isClick ? 22 : 28,
          opacity: isClick ? 0.5 : 1,
        }}
        transition={{ duration: 0.22 }}
      />
    </>
  );
}
