"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, type NavId } from "@/lib/constants";

export default function FloatingNav() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [activeId, setActiveId] = useState<NavId>("hero");
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setAtTop(y < 60);
    setHidden(y > lastY.current && y > 120);
    lastY.current = y;
  });
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const ob = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      ob.observe(el);
      observers.push(ob);
    });

    return () => observers.forEach((ob) => ob.disconnect());
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          atTop
            ? "bg-transparent"
            : "bg-[rgba(6,6,8,0.85)] backdrop-blur-xl border-b border-[var(--moa-border)]"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => handleClick("hero")}
            className="font-bold tracking-[0.12em] text-sm text-[var(--moa-white)] 
                       uppercase hover:text-[var(--gold)] transition-colors duration-300"
            aria-label="Back to top"
          >
            <span className="text-gold-gradient font-black text-base">MOA</span>
            <span className="ml-2 text-[var(--moa-muted)] font-light hidden sm:inline">
              Mall of America
            </span>
          </button>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`relative px-4 py-2 text-[0.7rem] font-semibold tracking-[0.18em] 
                           uppercase transition-all duration-300 rounded-[2px]
                           ${
                             activeId === item.id
                               ? "text-[var(--gold-light)]"
                               : "text-[var(--moa-muted)] hover:text-[var(--moa-white)]"
                           }`}
              >
                {item.label}
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 inset-x-4 h-[1px] bg-[var(--gold)]"
                  initial={false}
                  animate={{ opacity: activeId === item.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleClick("cta")}
            className="btn-primary text-[0.65rem] py-2 px-5 hidden md:inline-flex"
          >
            Partner With Us
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {!atTop && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 
                       hidden xl:flex flex-col gap-4 items-end"
            aria-label="Section navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                title={item.label}
                aria-label={`Go to ${item.label}`}
                className="group flex items-center gap-2"
              >
                <span
                  className={`text-[0.62rem] font-semibold tracking-[0.15em] uppercase 
                             transition-all duration-300 opacity-0 group-hover:opacity-100 
                             translate-x-2 group-hover:translate-x-0
                             ${activeId === item.id ? "text-[var(--gold)]" : "text-[var(--moa-muted)]"}`}
                >
                  {item.label}
                </span>

                <span
                  className={`block rounded-full transition-all duration-300 
                             ${
                               activeId === item.id
                                 ? "w-2 h-2 bg-[var(--gold)] shadow-[0_0_6px_var(--gold-glow)]"
                                 : "w-1.5 h-1.5 bg-[var(--moa-muted)] group-hover:bg-[var(--moa-white)]"
                             }`}
                />
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
