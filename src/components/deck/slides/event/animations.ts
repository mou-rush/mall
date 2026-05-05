import gsap from "gsap";

export interface EntranceSequenceResult {
  readonly timeline: gsap.core.Timeline;
  readonly tickerTween: gsap.core.Tween | null;
  readonly liveDotTweens: ReadonlyArray<gsap.core.Tween>;
}

export function addHeadlineReveal(
  tl: gsap.core.Timeline,
  wordEls: ReadonlyArray<HTMLElement>,
) {
  tl.set(wordEls, { y: 20, opacity: 0 });
  tl.to(wordEls, {
    y: 0,
    opacity: 1,
    duration: 0.65,
    ease: "power3.out",
    stagger: 0.07,
  });
}

export function addMonitorPowerOn(
  tl: gsap.core.Timeline,
  monitors: ReadonlyArray<HTMLElement>,
) {
  tl.set(monitors, { opacity: 0, filter: "brightness(0.6)" }, "<0.05");

  for (let index = 0; index < monitors.length; index += 1) {
    const monitor = monitors[index];
    const startPos = `>+${index === 0 ? 0.15 : 0.12}`;

    tl.to(monitor, { opacity: 1, duration: 0.08, ease: "none" }, startPos);
    tl.to(monitor, { opacity: 0.3, duration: 0.05, ease: "none" }, ">");
    tl.to(
      monitor,
      {
        opacity: 1,
        filter: "brightness(1)",
        duration: 0.11,
        ease: "none",
      },
      ">",
    );
  }
}

export function addSidebarCountUp(
  tl: gsap.core.Timeline,
  statValue: HTMLSpanElement | null,
) {
  tl.add(() => {
    if (!statValue) return;
    const val = { n: 0 };
    gsap.to(val, {
      n: 400,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        statValue.textContent = `${Math.round(val.n)}+`;
      },
    });
  }, ">+0.2");
}

export function addTickerStart(
  tl: gsap.core.Timeline,
  tickerTrack: HTMLDivElement | null,
): gsap.core.Tween | null {
  if (!tickerTrack) return null;

  const tickerTween = gsap.to(tickerTrack, {
    yPercent: -50,
    duration: 18,
    ease: "none",
    repeat: -1,
    paused: true,
  });

  tl.add(() => {
    gsap.set(tickerTrack, { yPercent: 0 });
    tickerTween.play(0);
  }, ">+0.05");

  return tickerTween;
}

export function createLiveDotTweens(liveDots: ReadonlyArray<HTMLElement>) {
  const tweens: gsap.core.Tween[] = [];
  for (let index = 0; index < liveDots.length; index += 1) {
    const dot = liveDots[index];
    tweens.push(
      gsap.to(dot, {
        scale: 1.3,
        duration: 0.8,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        delay: index * 0.08,
      }),
    );
  }
  return tweens;
}

export function buildEntranceSequence(params: {
  root: HTMLDivElement;
  headline: HTMLDivElement | null;
  statValue: HTMLSpanElement | null;
  tickerTrack: HTMLDivElement | null;
}): EntranceSequenceResult {
  const { root, headline, statValue, tickerTrack } = params;

  const wordEls = headline
    ? Array.from(headline.querySelectorAll<HTMLElement>("[data-hword]"))
    : [];
  const monitors = Array.from(
    root.querySelectorAll<HTMLElement>("[data-monitor]"),
  );
  const liveDots = Array.from(
    root.querySelectorAll<HTMLElement>("[data-live-dot]"),
  );

  const tl = gsap.timeline();

  tl.set(root, { opacity: 0 });
  tl.to(root, { opacity: 1, duration: 0.5, ease: "power2.out" });

  addHeadlineReveal(tl, wordEls);

  addMonitorPowerOn(tl, monitors);

  addSidebarCountUp(tl, statValue);

  const tickerTween = addTickerStart(tl, tickerTrack);

  const liveDotTweens = createLiveDotTweens(liveDots);

  return { timeline: tl, tickerTween, liveDotTweens };
}

export function animateMonitorHover(
  element: HTMLElement,
  label: HTMLElement | null,
  isEnter: boolean,
) {
  gsap.killTweensOf(element);

  if (isEnter) {
    gsap.to(element, {
      filter: "brightness(1.12)",
      duration: 0.25,
      ease: "power2.out",
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.22), 0 0 28px rgba(255,199,44,0.35)",
    });

    if (label) {
      gsap.killTweensOf(label);
      gsap.to(label, { opacity: 1, duration: 0.2, ease: "power2.out" });
    }
  } else {
    gsap.to(element, {
      filter: "brightness(1)",
      duration: 0.25,
      ease: "power2.out",
      boxShadow: "none",
    });

    if (label) {
      gsap.killTweensOf(label);
      gsap.to(label, { opacity: 0, duration: 0.2, ease: "power2.in" });
    }
  }
}

export function animateStatCountUp(counters: NodeListOf<HTMLElement>) {
  counters.forEach((el) => {
    const total = Number(el.dataset.countTo ?? 0);
    const suffix = el.dataset.suffix ?? "";
    const val = { v: 0 };
    gsap.to(val, {
      v: total,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(val.v).toLocaleString()}${suffix}`;
      },
    });
  });
}
