"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CinematicTileData {
  id: string;
  label: string;
  tagline: string;
  stat: string;
  image: string;
  accentColor: string;
}

interface CinematicTileProps {
  readonly data: CinematicTileData;
  readonly onClick: () => void;
  readonly delayIndex?: number;
  readonly className?: string;
}

export default function CinematicTile({
  data,
  onClick,
  delayIndex = 0,
  className = "",
}: CinematicTileProps) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const tileRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = tileRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const bgX = (mousePos.x - 0.5) * -12;
  const bgY = (mousePos.y - 0.5) * -10;

  return (
    <motion.button
      ref={tileRef}
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.6 + delayIndex * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${data.image})` }}
        animate={{
          x: hovered ? bgX : 0,
          y: hovered ? bgY : 0,
          scale: hovered ? 1.12 : 1.08,
          filter: hovered ? "brightness(0.45)" : "brightness(0.28)",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${data.accentColor}00 0%, ${data.accentColor}18 100%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "150%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(105deg, transparent 20%, ${data.accentColor}20 50%, transparent 80%)`,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: data.accentColor }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
        <motion.div
          className="mb-3"
          animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-sm"
            style={{
              background: `${data.accentColor}25`,
              color: data.accentColor,
              border: `1px solid ${data.accentColor}50`,
            }}
          >
            {data.stat}
          </span>
        </motion.div>

        <motion.h3
          className="text-white font-black uppercase tracking-tight leading-none"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
          animate={{ y: hovered ? 0 : 4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {data.label}
        </motion.h3>

        <AnimatePresence>
          {hovered && (
            <motion.p
              className="text-white/70 text-sm mt-2 font-light"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {data.tagline}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          className="flex items-center gap-2 mt-3"
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-xs uppercase tracking-[0.2em] font-medium"
            style={{
              color: hovered ? data.accentColor : "rgba(255,255,255,0.6)",
            }}
          >
            Explore
          </span>
          <motion.svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke={hovered ? data.accentColor : "rgba(255,255,255,0.5)"}
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.button>
  );
}
