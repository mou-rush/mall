"use client";
import { useCallback } from "react";

/**
 * Returns a stable function that smoothly scrolls to any section by its DOM id.
 * Works safely on the client — will no-op if the element isn't found.
 */
export function useScrollTo() {
  return useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);
}
