"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { EASE_OUT_EXPO } from "@/lib/utils";

// ============================================
// Theme Toggle Button
// ============================================

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, transition } = useTheme();
  const isTransitioning = transition?.isActive ?? false;
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={(e) => toggleTheme(e)}
      disabled={isTransitioning}
      className={`
        group relative flex h-11 w-11 items-center justify-center 
        rounded-full border transition-all duration-300
        border-border bg-background
        hover:border-foreground/30 hover:bg-secondary
        disabled:pointer-events-none
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon - visible in dark mode */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Sun className="h-5 w-5 text-foreground" />
      </motion.div>

      {/* Moon icon - visible in light mode */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Moon className="h-5 w-5 text-foreground" />
      </motion.div>

      {/* Ripple effect on click */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 rounded-full bg-foreground/10"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        />
      )}
    </motion.button>
  );
}

// ============================================
// Floating Theme Toggle (Fixed Position)
// ============================================

export function FloatingThemeToggle() {
  const { theme, toggleTheme, transition } = useTheme();
  const isTransitioning = transition?.isActive ?? false;
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={(e) => toggleTheme(e)}
      disabled={isTransitioning}
      className="
        fixed top-6 right-6 z-sticky
        flex h-12 w-12 items-center justify-center
        rounded-full border shadow-lg backdrop-blur-sm
        border-border/50 bg-background/80
        transition-colors duration-300
        hover:bg-secondary hover:border-foreground/20
        disabled:pointer-events-none
        md:top-8 md:right-8
      "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: EASE_OUT_EXPO }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Sun className="h-5 w-5 text-foreground" />
      </motion.div>

      {/* Moon icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Moon className="h-5 w-5 text-foreground" />
      </motion.div>
    </motion.button>
  );
}
