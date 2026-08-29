// Infeworks — cursor-tracking spotlight for cards (pairs with the .iw-spotlight utility).
import { useCallback, type MouseEvent } from "react";

export function useSpotlight() {
  return useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--iw-mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--iw-my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
}
