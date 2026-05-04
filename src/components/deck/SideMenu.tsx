"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  MENU_STRUCTURE,
  type MenuItem,
  type SlideId,
} from "@/lib/slide-registry";

interface SideMenuProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly onClose: () => void;
  readonly currentSlideId: SlideId;
  readonly onNavigate: (slideId: SlideId) => void;
  readonly onGoToHub?: () => void;
}

import { EASING } from "@/lib/animations";

export default function SideMenu({
  isOpen,
  onToggle,
  onClose,
  currentSlideId,
  onNavigate,
  onGoToHub,
}: SideMenuProps) {
  const getParentSection = useMemo(
    () => (slideId: SlideId) =>
      MENU_STRUCTURE.find(
        (item) =>
          item.slideId === slideId ||
          item.subItems?.some((subItem) => subItem.slideId === slideId),
      )?.id,
    [],
  );

  const currentParent = getParentSection(currentSlideId);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    () => new Set(currentParent ? [currentParent] : []),
  );

  const visibleExpandedItems = useMemo(() => {
    const next = new Set(expandedItems);
    if (currentParent) {
      next.add(currentParent);
    }
    return next;
  }, [currentParent, expandedItems]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const handleNavigate = (slideId: SlideId) => {
    onNavigate(slideId);
    onClose();
  };

  return (
    <>
      <motion.button
        onClick={onToggle}
        className="fixed right-6 top-6 z-[80] flex items-center gap-3 rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(8,16,35,0.72),rgba(0,0,0,0.35))] px-4 py-3 text-white/88 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.38)] transition-all duration-300 hover:border-[var(--gold)]/45 hover:text-white md:right-8 md:top-8"
        initial={{ opacity: 0, x: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: EASING.reveal }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="hidden text-[0.56rem] uppercase tracking-[0.38em] text-[var(--gold)]/85 sm:block">
          Deck Map
        </span>
        <span className="hidden h-5 w-px bg-white/10 sm:block" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <path
            d="M2 4h12M2 8h12M2 12h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]">
          Menu
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[75] bg-[rgba(2,6,16,0.68)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[80] w-[min(460px,90vw)]
                       border-l border-white/10 bg-[linear-gradient(180deg,rgba(5,10,20,0.96),rgba(6,6,8,0.96))] backdrop-blur-2xl
                       shadow-[-20px_0_100px_rgba(0,0,0,0.55)]
                       overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASING.reveal }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,199,44,0.12),transparent_28%),radial-gradient(circle_at_76%_34%,rgba(0,163,255,0.12),transparent_24%)]" />

            <div className="relative p-7 pt-24 md:p-8 md:pt-28">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-[0.58rem] uppercase tracking-[0.42em] text-[var(--gold)]/88">
                    Interactive Outline
                  </p>
                  <h2 className="mb-2 text-lg font-light uppercase tracking-[0.12em] text-white/92">
                    Navigation
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/65 transition-colors duration-200 hover:border-white/20 hover:text-white"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-8 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_18px_rgba(255,199,44,0.7)]" />
                  <span className="text-[0.58rem] uppercase tracking-[0.34em] text-white/45">
                    Current Slide
                  </span>
                </div>
                <div className="mt-3 h-px bg-gradient-to-r from-white/14 to-transparent" />
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/82">
                  {MENU_STRUCTURE.find(
                    (item) =>
                      item.slideId === currentSlideId ||
                      item.subItems?.some(
                        (subItem) => subItem.slideId === currentSlideId,
                      ),
                  )?.label ?? "Presentation"}
                </p>
              </div>

              <div className="mb-6">
                <div className="h-px bg-gradient-to-r from-white/18 via-white/8 to-transparent" />
              </div>

              {onGoToHub && (
                <button
                  onClick={() => {
                    onGoToHub();
                    onClose();
                  }}
                  className="mb-4 w-full flex items-center gap-2 px-4 py-2.5 rounded-lg
                             border border-[var(--gold)]/20 text-[var(--gold)]/80
                             text-[0.62rem] tracking-[0.28em] uppercase font-medium
                             transition-all duration-300 hover:border-[var(--gold)]/60
                             hover:text-[var(--gold)] hover:bg-[var(--gold)]/5"
                >
                  <svg
                    viewBox="0 0 12 10"
                    className="w-3 h-3 fill-none stroke-current stroke-[1.5]"
                  >
                    <polyline points="5 1 1 5 5 9" />
                    <line x1="1" y1="5" x2="11" y2="5" />
                  </svg>
                  Back to Hub
                </button>
              )}

              <nav className="space-y-2">
                {MENU_STRUCTURE.map((item) => (
                  <MenuItemComponent
                    key={item.id}
                    item={item}
                    currentSlideId={currentSlideId}
                    isExpanded={visibleExpandedItems.has(item.id)}
                    onToggleExpand={() => toggleExpand(item.id)}
                    onNavigate={handleNavigate}
                  />
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface MenuItemComponentProps {
  readonly item: MenuItem;
  readonly currentSlideId: SlideId;
  readonly isExpanded: boolean;
  readonly onToggleExpand: () => void;
  readonly onNavigate: (slideId: SlideId) => void;
}

function MenuItemComponent({
  item,
  currentSlideId,
  isExpanded,
  onToggleExpand,
  onNavigate,
}: MenuItemComponentProps) {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isActive =
    currentSlideId === item.slideId ||
    item.subItems?.some((subItem) => subItem.slideId === currentSlideId);

  return (
    <div className="rounded-[26px] border border-white/8 bg-white/[0.02] p-2 backdrop-blur-xl transition-colors duration-300 hover:border-white/12">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate(item.slideId)}
          className={`flex flex-1 items-center gap-3 rounded-[20px] px-4 py-3.5 text-left transition-all duration-300 ${
            isActive
              ? "bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              : "text-white/62 hover:bg-white/[0.05] hover:text-white"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-[var(--gold)] shadow-[0_0_16px_rgba(255,199,44,0.8)]"
                : "bg-white/20"
            }`}
          />
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
            {item.label}
          </span>
        </button>

        {hasSubItems ? (
          <button
            onClick={onToggleExpand}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/60 transition-all duration-200 hover:border-white/16 hover:text-white"
            aria-label={
              isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`
            }
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-200"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>

      {hasSubItems && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASING.reveal }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 px-2 pb-2 pt-2">
                {item.subItems!.map((subItem) => {
                  const isSubActive = currentSlideId === subItem.slideId;
                  return (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate(subItem.slideId)}
                      className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left transition-all duration-200 ${
                        isSubActive
                          ? "bg-white/8 text-white shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                          : "text-white/52 hover:bg-white/[0.04] hover:text-white/82"
                      }`}
                    >
                      <span
                        className={`h-[5px] w-[5px] rounded-full ${
                          isSubActive ? "bg-[var(--gold)]" : "bg-white/20"
                        }`}
                      />
                      <span className="text-[0.68rem] font-medium tracking-[0.12em] uppercase">
                        {subItem.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
