"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import Link from "next/link";
import { AnimatedText } from "./animated-text";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { useLoaderComplete } from "@/lib/hooks";
import { contact } from "@/data/content";
import { HeroMusicCard } from "./music-card";

const HERO_LINES = [
  { label: "Pramod", color: "text-foreground" },
  { label: "Suthar", color: "text-text-muted" },
  { label: "Portfolio", color: "text-foreground" },
];

export function Hero() {
  const loaderDone = useLoaderComplete();

  return (
    <section className="relative overflow-hidden bg-background px-4 pb-16 pt-14 md:px-8 md:pb-22 md:pt-24 lg:px-12 lg:pb-28 lg:pt-32">
      <GridOverlay />
      <FloatingGlyph />
      <ScrollCue />
      <HeroMusicCard />
      <div className="relative z-content mx-auto flex max-w-[95rem] flex-col gap-12 md:gap-18 lg:gap-20">
        <HeaderLines />
        <div className="mt-2 flex flex-col gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-text-secondary md:text-xs">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={loaderDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: loaderDone ? 0.4 + 0.2 : 0, duration: 0.8 }}
          >
            (PORTFOLIO_V2)
          </motion.span>
          <motion.span
            className="text-text-muted"
            initial={{ opacity: 0, x: -20 }}
            animate={loaderDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: loaderDone ? 0.6 + 0.2 : 0, duration: 0.8 }}
          >
            Montréal ✦ Remote ✦ 2025
          </motion.span>
        </div>
        <div className="flex flex-col gap-8 md:gap-24 lg:gap-32">
          <NameStack loaderDone={loaderDone} />
          <HeroCTA loaderDone={loaderDone} />
        </div>
      </div>
    </section>
  );
}

function HeaderLines() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute top-1/2 w-full border-t border-dashed border-border/60" />
    </div>
  );
}

function NameStack({ loaderDone }: { loaderDone: boolean }) {
  return (
    <div className="relative flex flex-col leading-[0.78] text-left w-full overflow-hidden">
      {HERO_LINES.map((line, index) => (
        <div key={line.label} className="relative">
          <AnimatedText
            text={line.label}
            play={loaderDone}
            delay={loaderDone ? 0.2 + index * 0.15 : 0}
            className={cn(
              // Fluid text sizing with clamp to prevent overflow while maximizing width
              "text-[clamp(2.5rem,17vw,14rem)] font-bold uppercase tracking-tighter",
              line.color
            )}
          />
        </div>
      ))}
    </div>
  );
}

function HeroCTA({ loaderDone }: { loaderDone: boolean }) {
  // Base delay after loader finishes (after hero text animations complete)
  const baseDelay = loaderDone ? 0.7 : 0;

  return (
    <div className="grid gap-12 md:grid-cols-2 md:items-end">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: baseDelay, duration: 0.8, ease: EASE_OUT_EXPO }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="h-px bg-foreground"
            initial={{ width: 0 }}
            animate={loaderDone ? { width: 64 } : { width: 0 }}
            transition={{ delay: baseDelay + 0.15, duration: 0.8 }}
          />
          <motion.span
            className="text-sm font-mono uppercase tracking-[0.3em] text-text-secondary"
            initial={{ opacity: 0 }}
            animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: baseDelay + 0.2, duration: 0.6 }}
          >
            Full-stack + AI
          </motion.span>
        </div>
        <motion.p
          className="text-2xl leading-relaxed text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: baseDelay + 0.25, duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          Building calm, high-impact digital experiences that translate complex
          problems into{" "}
          <span className="relative font-medium text-text-emphasis">
            elegant solutions
            <motion.span
              className="absolute -bottom-2 left-0 h-[1px] w-full bg-text-muted origin-left"
              initial={{ scaleX: 0 }}
              animate={loaderDone ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: baseDelay + 0.5, duration: 0.8, ease: EASE_OUT_EXPO }}
            />
          </span>
          .
        </motion.p>
      </motion.div>
      <motion.div
        className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-end"
        initial={{ opacity: 0, y: 40 }}
        animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: baseDelay + 0.15, duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        <Link
          href={`mailto:${contact.email}`}
          className="group relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-button-dark px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:bg-button-dark-hover sm:w-auto"
        >
          <Mail className="h-4 w-4" />
          Contact Me
        </Link>
        <Link
          href="#experience"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-card px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-text-secondary shadow-[0_8px_24px_-18px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-surface-warm-hover sm:w-auto"
        >
          Explore Work
        </Link>
      </motion.div>
    </div>
  );
}

function GridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-background flex justify-between px-4 md:px-12">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={cn("h-full w-px bg-border/30", {
            "hidden md:block": index === 1 || index === 2,
          })}
        />
      ))}
    </div>
  );
}

function FloatingGlyph() {
  return (
    <motion.div
      className="pointer-events-none absolute right-[8%] top-[25%] hidden text-border lg:block"
      initial={{ opacity: 0, y: -20, rotate: -8 }}
      animate={{ opacity: 1, y: 0, rotate: 8 }}
      transition={{ delay: 1.2, duration: 1, ease: EASE_OUT_EXPO }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="rounded-full border border-dashed border-current/30 p-12"
      >
        <ArrowDownRight className="h-12 w-12 opacity-40" />
      </motion.div>
    </motion.div>
  );
}

function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-[15%] right-4 z-decoration hidden md:right-12 lg:block">
      <motion.div
        className="w-24 origin-center rounded-full border border-dashed border-border text-muted-foreground"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative flex w-full items-center justify-center py-6">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.div
            className="absolute -top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

