import { useEffect, useRef } from "react";
import gsap from "gsap";
import { buildEntranceSequence } from "../animations";

export function useEventEntrance(
  isActive: boolean,
  rootRef: React.RefObject<HTMLDivElement | null>,
  headlineRef: React.RefObject<HTMLDivElement | null>,
  statValueRef: React.RefObject<HTMLSpanElement | null>,
  tickerTrackRef: React.RefObject<HTMLDivElement | null>,
) {
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);
  const tickerTweenRef = useRef<gsap.core.Tween | null>(null);
  const liveDotTweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    entranceTlRef.current?.kill();
    tickerTweenRef.current?.kill();
    liveDotTweensRef.current.forEach((t: gsap.core.Tween) => {
      t.kill();
    });
    liveDotTweensRef.current = [];

    if (!isActive) {
      gsap.set(root, { opacity: 1 });
      return;
    }

    const { timeline, tickerTween, liveDotTweens } = buildEntranceSequence({
      root,
      headline: headlineRef.current,
      statValue: statValueRef.current,
      tickerTrack: tickerTrackRef.current,
    });

    entranceTlRef.current = timeline;
    tickerTweenRef.current = tickerTween;
    liveDotTweensRef.current = [...liveDotTweens];

    return () => {
      entranceTlRef.current?.kill();
      tickerTweenRef.current?.kill();
      liveDotTweensRef.current.forEach((t: gsap.core.Tween) => {
        t.kill();
      });
      liveDotTweensRef.current = [];
    };
  }, [isActive, rootRef, headlineRef, statValueRef, tickerTrackRef]);
}
