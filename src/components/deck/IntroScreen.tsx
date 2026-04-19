"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VIDEOS } from "@/lib/constants";
import { fmt } from "@/lib/utils";

interface IntroScreenProps {
  readonly onSkip: () => void;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

function IconPlay() {
  return (
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
}
function IconPause() {
  return (
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
}
function IconVolume() {
  return (
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
}
function IconMute() {
  return (
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
}
function IconChevron() {
  return (
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
}

interface YTInfo {
  currentTime?: number;
  duration?: number;
}
interface YTMessage {
  event?: string;
  info?: YTInfo;
}

export default function IntroScreen({ onSkip }: IntroScreenProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const post = useCallback((cmd: object) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(cmd), "*");
  }, []);

  const handleIframeLoad = useCallback(() => {
    post({ event: "listening" });
  }, [post]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data) return;
      let data: YTMessage;
      try {
        data =
          typeof e.data === "string"
            ? (JSON.parse(e.data) as YTMessage)
            : (e.data as YTMessage);
      } catch {
        return;
      }
      if (data.event === "infoDelivery" && data.info) {
        const { currentTime: ct, duration: dur, playerState } = data.info;
        if (typeof dur === "number" && dur > 0) setDuration(dur);
        if (typeof ct === "number" && !scrubbing) setCurrentTime(ct);
        if (typeof playerState === "number") {
          setPlaying(playerState === 1 || playerState === 3);

          if (playerState === 0) onSkip();
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [scrubbing, onSkip]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      post({
        event: "command",
        func: p ? "pauseVideo" : "playVideo",
        args: [],
      });
      return !p;
    });
  }, [post]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      post({ event: "command", func: m ? "unMute" : "mute", args: [] });
      return !m;
    });
  }, [post]);

  const seekTo = useCallback(
    (s: number) => {
      post({ event: "command", func: "seekTo", args: [s, true] });
    },
    [post],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSkip();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "m") toggleMute();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSkip, togglePlay, toggleMute]);

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
      setCurrentTime(v);
      seekTo(v);
    },
    [seekTo],
  );

  const displayTime = scrubbing ? scrubValue : currentTime;
  const progress = duration > 0 ? (displayTime / duration) * 100 : 0;

  const videoSrc = `https://www.youtube-nocookie.com/embed/${VIDEOS.hero}?autoplay=1&mute=1&controls=0&loop=0&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-[var(--moa-black)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <iframe
        ref={iframeRef}
        className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        src={videoSrc}
        allow="autoplay; encrypted-media; fullscreen"
        title="Mall of America introduction"
        onLoad={handleIframeLoad}
      />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(6,6,8,0.4)_100%)]" />

      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[rgba(6,6,8,0.65)] to-transparent pointer-events-none" />

      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[rgba(6,6,8,0.85)] to-transparent pointer-events-none" />

      <motion.div
        className="absolute top-7 left-8 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
      >
        <Image
          src="/images/moa-logo.png"
          alt="Mall of America"
          width={88}
          height={88}
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
                  const pct = (e.clientX - rect.left) / rect.width;
                  const t = pct * duration;
                  onScrubEnd(Math.max(0, Math.min(duration, t)));
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
                  className="w-9 h-9 flex items-center justify-center
                             border border-white/20 bg-black/50 backdrop-blur-md
                             text-white/80 hover:border-[var(--gold)] hover:text-[var(--gold)]
                             transition-all duration-200"
                >
                  {playing ? <IconPause /> : <IconPlay />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="w-9 h-9 flex items-center justify-center
                             border border-white/20 bg-black/50 backdrop-blur-md
                             text-white/80 hover:border-[var(--gold)] hover:text-[var(--gold)]
                             transition-all duration-200"
                >
                  {muted ? <IconMute /> : <IconVolume />}
                </button>

                <span className="text-white/25 text-[0.55rem] tracking-widest uppercase select-none hidden sm:block">
                  Space · M · Esc
                </span>
              </div>

              <button
                onClick={onSkip}
                className="flex items-center gap-2
                           px-4 py-2
                           border border-white/20 bg-black/50 backdrop-blur-md
                           text-white/70 text-[0.62rem] font-semibold tracking-[0.16em] uppercase
                           hover:border-[var(--gold)] hover:text-[var(--gold)]
                           transition-all duration-200 group"
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
