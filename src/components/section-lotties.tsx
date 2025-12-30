"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion } from "framer-motion";
import { FLOATING_VARIANTS } from "@/lib/utils";

type Position = {
  top: string;
  left?: string;
  right?: string;
  size: number;
};

interface SectionLottiesProps {
  positions: Position[];
  lottiePaths: readonly string[];
  opacity?: number;
}

export function SectionLotties({ positions, lottiePaths, opacity = 0.25 }: SectionLottiesProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-background overflow-visible"
      aria-hidden="true"
    >
      {positions.map((pos, index) => {
        const anim = FLOATING_VARIANTS[index % FLOATING_VARIANTS.length];
        const src = lottiePaths[index % lottiePaths.length];
        return (
          <motion.div
            key={index}
            className="lottie-decoration absolute"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              width: pos.size,
              height: pos.size,
              opacity,
            }}
            initial={{ scale: 0.8 }}
            animate={{
              scale: 1,
              ...anim.animate,
            }}
            transition={{
              scale: { delay: index * 0.05, duration: 0.8 },
              ...anim.transition,
            }}
          >
            <DotLottiePlayer
              src={src}
              loop
              autoplay
              className="h-full w-full"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

