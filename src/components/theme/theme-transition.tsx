"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

// ============================================
// Theme Transition Overlay - Clip-Path Radial Reveal
// ============================================

export function ThemeTransition() {
  const { transition, completeTransition, applyTheme } = useTheme();
  const [phase, setPhase] = useState<"idle" | "expanding" | "fading">("idle");

  // Derive stable values
  const isActive = transition?.isActive ?? false;
  const origin = transition?.origin ?? { x: 0, y: 0 };
  const targetTheme = transition?.targetTheme ?? "dark";

  // Reset phase when transition starts
  useEffect(() => {
    if (isActive) {
      setPhase("expanding");
    } else {
      setPhase("idle");
    }
  }, [isActive]);

  // Handle animation completion
  const handleExpandComplete = useCallback(() => {
    if (phase === "expanding") {
      // Overlay has covered the screen - now apply the theme
      applyTheme();
      // Small delay then start fading
      requestAnimationFrame(() => {
        setPhase("fading");
      });
    }
  }, [phase, applyTheme]);

  const handleFadeComplete = useCallback(() => {
    if (phase === "fading") {
      completeTransition();
      setPhase("idle");
    }
  }, [phase, completeTransition]);

  // Safety timeout
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      applyTheme();
      completeTransition();
      setPhase("idle");
    }, 1500);
    return () => clearTimeout(timer);
  }, [isActive, applyTheme, completeTransition]);

  if (!isActive) return null;

  // Color of the overlay (the theme we're transitioning TO)
  const overlayColor = targetTheme === "dark" ? "#050505" : "#f7f7f5";

  return (
    <AnimatePresence mode="wait">
      {phase !== "idle" && (
        <motion.div
          key="theme-overlay"
          data-theme-overlay
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 99999,
            backgroundColor: overlayColor,
          }}
          initial={{
            clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`,
            opacity: 1,
          }}
          animate={
            phase === "expanding"
              ? {
                  clipPath: `circle(150% at ${origin.x}px ${origin.y}px)`,
                  opacity: 1,
                }
              : {
                  clipPath: `circle(150% at ${origin.x}px ${origin.y}px)`,
                  opacity: 0,
                }
          }
          transition={
            phase === "expanding"
              ? {
                  clipPath: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1], // Material Design standard easing
                  },
                }
              : {
                  opacity: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }
          }
          onAnimationComplete={() => {
            if (phase === "expanding") {
              handleExpandComplete();
            } else if (phase === "fading") {
              handleFadeComplete();
            }
          }}
        />
      )}
    </AnimatePresence>
  );
}

// ============================================
// Alternative: Simple Crossfade Transition
// ============================================

export function ThemeTransitionFade() {
  const { transition, completeTransition, applyTheme } = useTheme();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");

  const isActive = transition?.isActive ?? false;
  const targetTheme = transition?.targetTheme ?? "dark";

  useEffect(() => {
    if (isActive && phase === "idle") {
      setPhase("in");
    }
  }, [isActive, phase]);

  if (!isActive && phase === "idle") return null;

  const overlayColor = targetTheme === "dark" ? "#050505" : "#f7f7f5";

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999, backgroundColor: overlayColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "in" ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      onAnimationComplete={() => {
        if (phase === "in") {
          applyTheme();
          setPhase("out");
        } else if (phase === "out") {
          completeTransition();
          setPhase("idle");
        }
      }}
    />
  );
}
