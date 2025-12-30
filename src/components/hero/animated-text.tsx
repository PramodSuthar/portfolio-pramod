"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  triggerOnView?: boolean;
  once?: boolean;
  play?: boolean; // externally controlled play state (default true)
};

const defaultLetterTransition = {
  duration: 0.8,
  ease: EASE_OUT_EXPO,
};

export function AnimatedText({
  text,
  delay = 0,
  stagger = 0.02,
  className,
  triggerOnView = false,
  once = true,
  play = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const words = text.split(" ");

  // Determine if animation should run
  const shouldAnimate = triggerOnView ? isInView : true;
  const active = shouldAnimate && play;

  return (
    <span
      ref={ref}
      className={cn("inline-block overflow-hidden leading-[0.85]", className)}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap mr-[0.2em]"
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${word}-${letter}-${letterIndex}`}
              initial={{ y: "100%" }}
              animate={active ? { y: 0 } : { y: "100%" }}
              transition={{
                ...defaultLetterTransition,
                delay: delay + wordIndex * stagger * 5 + letterIndex * stagger,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

