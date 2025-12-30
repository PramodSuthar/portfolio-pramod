"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

export function SkillsTicker() {
  const marqueeItems = [...skills, ...skills];

  return (
    <div className="relative z-decoration overflow-hidden border-y border-border-warm bg-secondary py-4">
      <motion.div
        className="flex whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.4em] text-muted-foreground"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {marqueeItems.map((item, index) => (
          <span key={`${item}-${index}`} className="mr-16 flex items-center gap-4">
            <span>{item}</span>
            <span className="h-[2px] w-[2px] rounded-full bg-border" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

