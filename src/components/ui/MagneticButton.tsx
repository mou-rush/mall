"use client";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
