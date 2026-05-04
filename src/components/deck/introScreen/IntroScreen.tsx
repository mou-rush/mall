"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fmt } from "@/lib/utils";

interface IntroScreenProps {
  readonly onSkip: () => void;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

const IconPlay = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden
  >
    <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
  </svg>
);
const IconPause = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden
  >
    <rect x="3" y="2" width="4" height="12" rx="1" />
    <rect x="9" y="2" width="4" height="12" rx="1" />
  </svg>
);
const IconVolume = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M11 5L6 9H2v6h4l5 4V5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
const IconMute = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M11 5L6 9H2v6h4l5 4V5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="23"
      y1="9"
      x2="17"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <line
      x1="17"
      y1="9"
      x2="23"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
const IconChevron = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function IntroScreen({ onSkip }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setControlsVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!scrubbing) setCurrentTime(video.currentTime);
    };
    const onDurationChange = () => setDuration(video.duration);
    const onEnded = () => onSkip();
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("loadedmetadata", onDurationChange);
    video.addEventListener("ended", onEnded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("loadedmetadata", onDurationChange);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [scrubbing, onSkip]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const seekTo = useCallback(
    (t: number) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(t, duration));
      setCurrentTime(video.currentTime);
    },
    [duration],
  );

  const onScrubStart = useCallback((v: number) => {
    setScrubbing(true);
    setScrubValue(v);
  }, []);

  const onScrubMove = useCallback((v: number) => {
    setScrubValue(v);
  }, []);

  const onScrubEnd = useCallback(
    (v: number) => {
      setScrubbing(false);
      seekTo(v);
    },
    [seekTo],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSkip();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "m") toggleMute();
      if (e.key === "ArrowRight")
        seekTo((videoRef.current?.currentTime ?? 0) + 5);
      if (e.key === "ArrowLeft")
        seekTo((videoRef.current?.currentTime ?? 0) - 5);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSkip, togglePlay, toggleMute, seekTo]);

  const displayTime = scrubbing ? scrubValue : currentTime;
  const progress = duration > 0 ? (displayTime / duration) * 100 : 0;

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-[var(--moa-black)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/moa_intro.mp4"
        autoPlay
        muted
        playsInline
        style={{ opacity: 0.9 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(6,6,8,0.4)_100%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[rgba(6,6,8,0.65)] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[rgba(6,6,8,0.85)] to-transparent pointer-events-none" />

      <motion.div
        className="absolute top-7 left-8 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
      >
        <Image
          src="/images/moa-logo.png"
          alt="Mall of America"
          width={250}
          height={250}
          className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
          priority
        />
      </motion.div>

      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            className="absolute bottom-0 inset-x-0 z-10 px-8 pb-7 pt-3 flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-[0.6rem] font-mono tabular-nums w-8 text-right select-none">
                {fmt(displayTime)}
              </span>

              <div
                className="relative flex-1 h-[3px] group cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  seekTo(((e.clientX - rect.left) / rect.width) * duration);
                }}
              >
                <div className="absolute inset-0 rounded-full bg-white/15" />
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-[var(--gold)] transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={displayTime}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onMouseDown={(e) =>
                    onScrubStart(
                      parseFloat((e.target as HTMLInputElement).value),
                    )
                  }
                  onChange={(e) => onScrubMove(parseFloat(e.target.value))}
                  onMouseUp={(e) =>
                    onScrubEnd(parseFloat((e.target as HTMLInputElement).value))
                  }
                  onTouchEnd={(e) =>
                    onScrubEnd(parseFloat((e.target as HTMLInputElement).value))
                  }
                  aria-label="Seek"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold-glow)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>

              <span className="text-white/40 text-[0.6rem] font-mono tabular-nums w-8 select-none">
                {fmt(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="w-9 h-9 flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
                >
                  {playing ? <IconPause /> : <IconPlay />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="w-9 h-9 flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
                >
                  {muted ? <IconMute /> : <IconVolume />}
                </button>

                <span className="text-white/25 text-[0.55rem] tracking-widest uppercase select-none hidden sm:block">
                  Space · M · ← → · Esc
                </span>
              </div>

              <button
                onClick={onSkip}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-black/50 backdrop-blur-md text-white/70 text-[0.62rem] font-semibold tracking-[0.16em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200 group"
              >
                <span>Skip Intro</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <IconChevron />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
