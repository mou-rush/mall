import { useEffect } from "react";

export function useEventVideos(
  isActive: boolean,
  rootRef: React.RefObject<HTMLDivElement | null>,
  thumbVideoRef: React.RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    if (!rootRef.current) return;
    const videos =
      rootRef.current.querySelectorAll<HTMLVideoElement>(
        "video[data-monitor-video]",
      ) ?? [];

    const pauseAll = () => {
      videos.forEach((v) => v.pause());
      if (thumbVideoRef.current) thumbVideoRef.current.pause();
    };

    const playAll = () => {
      videos.forEach((v) => {
        void v.play().catch(() => undefined);
      });
      if (thumbVideoRef.current) {
        void thumbVideoRef.current.play().catch(() => undefined);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isActive) playAll();
        else pauseAll();
      },
      { threshold: 0.22 },
    );

    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      pauseAll();
    };
  }, [isActive, rootRef, thumbVideoRef]);
}
