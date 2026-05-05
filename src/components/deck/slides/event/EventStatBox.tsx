"use client";

interface EventStatBoxProps {
  readonly statValueRef: React.RefObject<HTMLSpanElement | null>;
}

export function EventStatBox({ statValueRef }: EventStatBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="text-5xl font-black tracking-[-0.03em] text-[#FFC72C]">
        <span ref={statValueRef}>0+</span>
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/60">
        EVENTS / YEAR
      </div>
    </div>
  );
}
