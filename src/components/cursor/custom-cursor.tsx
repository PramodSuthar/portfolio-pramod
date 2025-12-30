"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [visible, x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-overlay hidden h-5 w-5 rounded-full bg-white mix-blend-difference md:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      aria-hidden
    />
  );
}

