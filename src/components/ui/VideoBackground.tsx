"use client";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  overlayColor?: string;
  loop?: boolean;
}

function isYouTubeId(src: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(src);
}

export default function VideoBackground({
  src,
  poster,
  overlayOpacity = 0.55,
  overlayColor = "0,0,0",
  loop = true,
}: Readonly<VideoBackgroundProps>) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {isYouTubeId(src) ? (
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`https://www.youtube-nocookie.com/embed/${src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${src}&playsinline=1&rel=0&enablejsapi=1`}
          allow="autoplay; encrypted-media; fullscreen"
          title="Background video"
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop={loop}
          playsInline
        />
      )}

      <div
        className="absolute inset-0 z-10"
        style={{ background: `rgba(${overlayColor},${overlayOpacity})` }}
      />
    </div>
  );
}
