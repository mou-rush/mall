"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MENU_STRUCTURE,
  type MenuItem,
  type SlideId,
} from "@/lib/slide-registry";

interface SideMenuProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly currentSlideId: SlideId;
  readonly onNavigate: (slideId: SlideId) => void;
}

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function SideMenu({
  isOpen,
  onToggle,
  currentSlideId,
  onNavigate,
}: SideMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

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

    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      <motion.button
        onClick={onToggle}
        className="fixed top-6 left-6 z-[80] flex items-center gap-2 px-4 py-2.5
                   rounded-full border border-white/10 bg-black/30 backdrop-blur-xl
                   text-white/80 hover:text-white transition-colors duration-200
                   shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
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
        <span className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
          Menu
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 bottom-0 z-[80] w-[min(420px,85vw)]
                       bg-[rgba(6,6,8,0.95)] backdrop-blur-2xl
                       border-r border-white/10 shadow-[20px_0_80px_rgba(0,0,0,0.5)]
                       overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="p-8 pt-24">
              <div className="mb-8">
                <h2 className="text-white/90 text-lg font-light tracking-[0.08em] uppercase mb-1">
                  Navigation
                </h2>
                <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
              </div>

              <nav className="space-y-1">
                {MENU_STRUCTURE.map((item) => (
                  <MenuItemComponent
                    key={item.id}
                    item={item}
                    currentSlideId={currentSlideId}
                    isExpanded={expandedItems.has(item.id)}
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
  const isActive = currentSlideId === item.slideId;

  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={() =>
            hasSubItems ? onToggleExpand() : onNavigate(item.slideId)
          }
          className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg
                     transition-all duration-200 text-left
                     ${
                       isActive
                         ? "bg-white/10 text-white"
                         : "text-white/60 hover:bg-white/5 hover:text-white/90"
                     }`}
        >
          <span className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase">
            {item.label}
          </span>

          {hasSubItems && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-auto transition-transform duration-200"
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
          )}
        </button>
      </div>

      {/* Sub-items */}
      {hasSubItems && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pl-6 pt-1 pb-2 space-y-1">
                {item.subItems!.map((subItem) => {
                  const isSubActive = currentSlideId === subItem.slideId;
                  return (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate(subItem.slideId)}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg
                                 text-left transition-all duration-200
                                 ${
                                   isSubActive
                                     ? "bg-white/8 text-white/95 border-l-2 border-white/40"
                                     : "text-white/50 hover:bg-white/4 hover:text-white/80 border-l-2 border-transparent"
                                 }`}
                    >
                      <span className="text-[0.7rem] font-medium tracking-[0.08em]">
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
