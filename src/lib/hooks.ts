"use client";

import { useEffect, useState } from "react";

const LOADER_FALLBACK_MS = 5000;

/**
 * Hook that returns true once the loading screen has finished.
 * Listens for the "loader-finished" custom event with a fallback timeout.
 */
export function useLoaderComplete(): boolean {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleComplete = () => setIsComplete(true);

    window.addEventListener("loader-finished", handleComplete);
    const fallback = setTimeout(handleComplete, LOADER_FALLBACK_MS);

    return () => {
      window.removeEventListener("loader-finished", handleComplete);
      clearTimeout(fallback);
    };
  }, []);

  return isComplete;
}

