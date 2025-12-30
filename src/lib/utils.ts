import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Easing } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// Animation Constants
// ============================================

/** Smooth exponential ease-out curve used throughout the app */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard fade-up animation for scroll reveals */
export const FADE_UP_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT_EXPO },
} as const;

/** Floating animation variants for Lottie decorations */
export const FLOATING_VARIANTS = [
  {
    animate: { y: [0, -6, 0, 6, 0], x: [0, 4, 0, -4, 0], rotate: [0, 2, 0, -2, 0] },
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" as Easing },
  },
  {
    animate: { y: [0, 8, 0, -8, 0], x: [0, -5, 0, 5, 0], rotate: [0, -3, 0, 3, 0] },
    transition: { duration: 15, repeat: Infinity, ease: "easeInOut" as Easing },
  },
  {
    animate: { y: [0, -10, 0, 10, 0], x: [0, 6, 0, -6, 0], rotate: [0, 4, 0, -4, 0] },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" as Easing },
  },
  {
    animate: { y: [0, 5, 0, -5, 0], x: [0, -7, 0, 7, 0], rotate: [0, -2, 0, 2, 0] },
    transition: { duration: 14, repeat: Infinity, ease: "easeInOut" as Easing },
  },
];

