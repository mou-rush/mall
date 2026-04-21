"use client";
import { motion } from "framer-motion";
import VideoBackground from "@/components/ui/VideoBackground";
import { VIDEOS } from "@/lib/constants";

interface EntryScreenProps {
  readonly onEnter: () => void;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--moa-black)] overflow-hidden">
      <VideoBackground
        src="/videos/mall_2.mp4"
        overlayOpacity={0.1}
        overlayColor="6,6,8"
      />

      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[rgba(6,6,8,0.85)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="absolute top-0 inset-x-0 bg-[var(--moa-black)] z-20 pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ delay: 0.1, duration: 1.1, ease: EASE }}
      />
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-[var(--moa-black)] z-20 pointer-events-none"
        initial={{ height: "50vh" }}
        animate={{ height: 0 }}
        transition={{ delay: 0.1, duration: 1.1, ease: EASE }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="overflow-hidden">
            <motion.h1
              className="font-extralight tracking-[-0.03em] leading-[0.9] text-[var(--moa-white)]"
              style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 1.0, duration: 1.0, ease: EASE }}
            >
              Mall of
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="text-gold-gradient font-thin leading-[0.9]"
              style={{
                fontSize: "clamp(4rem, 12vw, 11rem)",
                letterSpacing: "-0.03em",
                paddingBottom: "0.14em",
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 1.18, duration: 1.0, ease: EASE }}
            >
              America
            </motion.h1>
          </div>
        </div>

        <motion.div
          className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{ width: "clamp(120px, 20vw, 260px)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.9, ease: EASE }}
        />
      </div>

      <div className="absolute bottom-10 inset-x-0 z-30 flex flex-col items-center gap-3">
        <motion.button
          onClick={onEnter}
          className="group relative inline-flex items-center gap-3 px-10 py-4
                     border border-[var(--gold)] rounded-[2px] text-[var(--gold)]
                     text-sm font-semibold tracking-[0.2em] uppercase
                     overflow-hidden transition-colors duration-500
                     hover:text-[var(--moa-black)] cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 bg-[var(--gold)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10">Enter</span>
        </motion.button>
      </div>
    </div>
  );
}
