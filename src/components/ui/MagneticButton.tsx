"use client";
import { useRef, useCallback } from "react";
import gsap from "gsap";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly strength?: number;
  readonly onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      gsap.to(btn, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "elastic.out(1.2, 0.5)",
      overwrite: "auto",
    });
  }, []);

  return (
    <button
      ref={btnRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ willChange: "transform" }}
    >
      {children}
    </button>
  );
}
