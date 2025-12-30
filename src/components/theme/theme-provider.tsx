"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";

// ============================================
// Types
// ============================================

type Theme = "light" | "dark";

interface TransitionState {
  isActive: boolean;
  origin: { x: number; y: number };
  targetTheme: Theme;
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
  transition: TransitionState | null;
  completeTransition: () => void;
  applyTheme: () => void;
}

// ============================================
// Context
// ============================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================
// Storage Keys
// ============================================

const THEME_STORAGE_KEY = "portfolio-theme";

// ============================================
// Helper Functions
// ============================================

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ============================================
// Provider Component
// ============================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [mounted, setMounted] = useState(false);
  const pendingThemeRef = useRef<Theme | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme ?? getSystemTheme();
    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = getStoredTheme();
      if (!storedTheme) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Called when overlay has fully expanded - now safe to change theme
  const applyTheme = useCallback(() => {
    if (pendingThemeRef.current) {
      setThemeState(pendingThemeRef.current);
      pendingThemeRef.current = null;
    }
  }, []);

  // Called when transition animation is complete
  const completeTransition = useCallback(() => {
    setTransition(null);
    pendingThemeRef.current = null;
  }, []);

  const toggleTheme = useCallback(
    (event?: MouseEvent) => {
      // If already transitioning, ignore
      if (transition?.isActive) return;

      const newTheme = theme === "light" ? "dark" : "light";

      // Store the pending theme (will be applied when overlay covers screen)
      pendingThemeRef.current = newTheme;

      // Get click origin or default to top-right corner
      let origin = { x: window.innerWidth - 40, y: 40 };
      if (event) {
        origin = {
          x: event.clientX,
          y: event.clientY,
        };
      }

      // Start transition - theme will change when overlay is fully expanded
      setTransition({
        isActive: true,
        origin,
        targetTheme: newTheme,
      });
    },
    [theme, transition]
  );

  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
    transition,
    completeTransition,
    applyTheme,
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// Hooks
// ============================================

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useThemeToggle() {
  const { theme, toggleTheme, transition } = useTheme();

  return {
    theme,
    toggle: toggleTheme,
    isTransitioning: transition?.isActive ?? false,
  };
}
