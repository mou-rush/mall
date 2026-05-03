"use client";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  overlayColor?: string;
  loop?: boolean;
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
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop={loop}
        playsInline
      />
      <div
        className="absolute inset-0 z-10"
        style={{ background: `rgba(${overlayColor},${overlayOpacity})` }}
      />
    </div>
  );
}
