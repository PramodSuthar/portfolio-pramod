"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/utils";

export function StickyProgress() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Progress bar height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const [clock, setClock] = useState({ time: "10:00", period: "AM" });
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateClock = useCallback((value: number) => {
    const minutes = 600 + 480 * value;
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const period = hours >= 12 ? "PM" : "AM";
    const normalizedHour = ((hours + 11) % 12) + 1;
    setClock({
      time: `${normalizedHour.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`,
      period,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) setHasScrolled(true);
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [hasScrolled]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", updateClock);
    return () => unsubscribe();
  }, [scrollYProgress, updateClock]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isExpanded = isHovered || isScrolling;

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none fixed right-4 top-1/2 z-modal hidden -translate-y-1/2 lg:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: hasScrolled ? 1 : 0, x: hasScrolled ? 0 : 20 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      {/* Single unified container - transforms between line and widget */}
      <motion.div
        className="pointer-events-auto relative flex flex-col items-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ borderRadius: 4 }}
        animate={{
          width: isExpanded ? 48 : 3,
          backgroundColor: isExpanded ? "rgba(10, 10, 10, 0.95)" : "rgba(229, 229, 229, 1)",
          paddingTop: isExpanded ? 16 : 0,
          paddingBottom: isExpanded ? 16 : 0,
          paddingLeft: isExpanded ? 12 : 0,
          paddingRight: isExpanded ? 12 : 0,
          borderRadius: isExpanded ? 32 : 4,
        }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        style={{
          boxShadow: isExpanded
            ? "0 24px 60px -20px rgba(0,0,0,0.8)"
            : "none",
        }}
      >
        {/* Chevron button - only visible when expanded */}
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="flex items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          animate={{
            width: isExpanded ? 32 : 0,
            height: isExpanded ? 32 : 0,
            opacity: isExpanded ? 1 : 0,
            marginBottom: isExpanded ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>

        {/* Progress bar - always present, transforms with container */}
        <motion.div
          className="relative overflow-hidden rounded-full"
          animate={{
            width: isExpanded ? 3 : 3,
            height: isExpanded ? 80 : 120,
            backgroundColor: isExpanded ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          <motion.div
            style={{ height: progressHeight }}
            className="absolute top-0 left-0 w-full rounded-full"
            animate={{
              backgroundColor: isExpanded ? "rgba(255,255,255,0.6)" : "rgba(23, 23, 23, 1)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Time display - only visible when expanded */}
        <motion.div
          className="flex flex-col items-center text-center"
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
            marginTop: isExpanded ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          <span className="text-[10px] font-mono font-medium tracking-wider text-white">
            {clock.time}
          </span>
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/50">
            {clock.period}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
