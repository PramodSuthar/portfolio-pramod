"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/utils";

// Check if this is a return visit (session-based)
const getLoaderDuration = () => {
  if (typeof window === "undefined") return 2000;
  const hasVisited = sessionStorage.getItem("loader-shown");
  return hasVisited ? 1200 : 2000; // Shorter on return visits
};

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [counter, setCounter] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Preload the Almarena font and scroll restoration
  useEffect(() => {
    // Mark session as visited
    if (typeof window !== "undefined") {
      sessionStorage.setItem("loader-shown", "true");
    }

    // Force scroll to top on load and prevent browser scroll restoration
    const prevRestoration =
      typeof window !== "undefined" && "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : undefined;
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    let timeout: NodeJS.Timeout | undefined;

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        setFontLoaded(true);
      });

      timeout = setTimeout(() => {
        setFontLoaded(true);
      }, 300); // Reduced from 500ms
    } else {
      // Use microtask to avoid synchronous setState in effect body
      timeout = setTimeout(() => {
        setFontLoaded(true);
      }, 0);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (
        typeof window !== "undefined" &&
        prevRestoration !== undefined &&
        "scrollRestoration" in window.history
      ) {
        window.history.scrollRestoration = prevRestoration;
      }
    };
  }, []);

  // Counter animation using requestAnimationFrame for smooth, reliable timing
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const startDelay = 300; // Reduced from 500ms
    const duration = getLoaderDuration();

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * 100);

      setCounter(currentCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCounter(100);
        // Short delay before exit animation
        setTimeout(() => {
          setIsExiting(true);
          setIsLoading(false);
        }, 150); // Reduced from 200ms
      }
    };

    // Start after brief delay for font to load
    const starter = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(starter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleExitComplete = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setTimeout(() => setShouldRender(false), 100);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("loader-finished"));
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-overlay overflow-visible"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Main loader panel */}
          <div className="loading-screen absolute inset-0 flex items-center justify-center bg-loader-bg">
            {/* Loading content */}
            <div className="relative flex flex-col items-center justify-center">
              <motion.div
                className="loading-text relative text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: fontLoaded ? 1 : 0,
                  y: fontLoaded ? 0 : 20,
                }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              >
                <p className="flex flex-col items-center gap-4 md:flex-row md:gap-[1.4vw]">
                  {/* Mobile: use mobile classes, Desktop: use desktop classes */}
                  <span className="loader-main-text-mobile md:hidden">
                    this is the loader
                  </span>
                  <span className="loader-main-text hidden md:inline">
                    this is the loader
                  </span>
                  <span className="loader-counter-mobile md:hidden">
                    {counter.toString().padStart(2, "0")}
                  </span>
                  <span className="loader-counter hidden md:inline">
                    {counter.toString().padStart(2, "0")}
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-loader-text/30"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {isExiting && (
            <>
              {/*
                Convex mask (ONLY during exit): page background bites upward into the loader
                to form a ∩ curve (center higher, edges lower).
              */}
              <svg
                aria-hidden="true"
                className="absolute left-0 right-0"
                style={{
                  bottom: "-1px",
                  width: "100%",
                  height: "120px",
                }}
                preserveAspectRatio="none"
                viewBox="0 0 100 20"
              >
                <path
                  d="M0,20 L0,10 Q50,0 100,10 L100,20 Z"
                  className="fill-background"
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
