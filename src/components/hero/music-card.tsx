"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play, SkipBack, SkipForward, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "./animated-text";
import { useLoaderComplete } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/utils";

// ============================================
// Constants
// ============================================

const HERO_TRACK = {
  title: "Icon",
  artist: "Jaden Smith",
  cover: "https://i1.sndcdn.com/artworks-KVZORDnTDZq1-0-t500x500.jpg",
  audioSrc: "/audio/icon.mp3",
  externalUrl: "https://soundcloud.com/jadensmithofficial/icon",
} as const;

// ============================================
// Custom Hook: useAudioPlayer
// ============================================

interface AudioPlayerState {
  isReady: boolean;
  isPlaying: boolean;
  duration: number;
  position: number;
  progressPercent: number;
}

interface AudioPlayerActions {
  toggle: () => void;
  skip: (direction: "forward" | "backward") => void;
  seekToPercent: (percent: number) => void;
  formatTime: (value: number) => string;
}

function useAudioPlayer(audioRef: React.RefObject<HTMLAudioElement | null>): AudioPlayerState & AudioPlayerActions {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let isActive = true;

    const tick = () => {
      if (!isActive || !audio || audio.paused) return;

      const now = performance.now();
      if (now - lastUpdateRef.current >= 100) {
        const currentPos = Math.floor(audio.currentTime);
        setPosition((prev) => (prev !== currentPos ? currentPos : prev));
        lastUpdateRef.current = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastUpdateRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audio.duration));
      setIsReady(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setPosition(Math.floor(audio.duration));
      stopLoop();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      startLoop();
    };

    const handlePause = () => {
      setIsPlaying(false);
      stopLoop();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    if (audio.readyState >= 1) handleLoadedMetadata();
    if (!audio.paused) startLoop();

    return () => {
      isActive = false;
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      stopLoop();
    };
  }, [audioRef]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;
    isPlaying ? audio.pause() : audio.play();
  }, [audioRef, isReady, isPlaying]);

  const skip = useCallback(
    (direction: "forward" | "backward") => {
      const audio = audioRef.current;
      if (!audio) return;
      const delta = direction === "forward" ? 10 : -10;
      const newTime = Math.max(0, Math.min(audio.currentTime + delta, duration));
      audio.currentTime = newTime;
      setPosition(Math.floor(newTime));
    },
    [audioRef, duration]
  );

  const seekToPercent = useCallback(
    (percent: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const bounded = Math.max(0, Math.min(1, percent));
      const newTime = bounded * duration;
      audio.currentTime = newTime;
      setPosition(Math.floor(newTime));
    },
    [audioRef, duration]
  );

  const formatTime = useCallback((value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, []);

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  return {
    isReady,
    isPlaying,
    duration,
    position,
    progressPercent,
    toggle,
    skip,
    seekToPercent,
    formatTime,
  };
}

// ============================================
// Sub-Components
// ============================================

function AudioVisualizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = [0.6, 1, 0.7, 0.9, 0.5, 0.8, 0.6, 1, 0.7];

  return (
    <div className="flex items-end gap-[2px] h-4">
      {bars.map((maxHeight, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-white/70"
          animate={
            isPlaying
              ? {
                  height: [
                    `${maxHeight * 30}%`,
                    `${maxHeight * 100}%`,
                    `${maxHeight * 50}%`,
                    `${maxHeight * 80}%`,
                    `${maxHeight * 30}%`,
                  ],
                }
              : { height: "12%" }
          }
          transition={
            isPlaying
              ? { duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

interface PlayPauseButtonProps {
  isPlaying: boolean;
  isReady: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}

function PlayPauseButton({ isPlaying, isReady, onToggle, size = "md" }: PlayPauseButtonProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "p-3",
    lg: "h-12 w-12",
  };

  const iconSize = size === "sm" ? "h-5 w-5" : "h-5 w-5";

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!isReady}
      className={`flex items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 disabled:opacity-40 ${sizeClasses[size]}`}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? (
        <Pause className={iconSize} />
      ) : (
        <Play className={`${iconSize} ml-0.5`} />
      )}
    </button>
  );
}

interface SkipButtonProps {
  direction: "forward" | "backward";
  onSkip: (direction: "forward" | "backward") => void;
}

function SkipButton({ direction, onSkip }: SkipButtonProps) {
  const Icon = direction === "backward" ? SkipBack : SkipForward;
  const label = direction === "backward" ? "Rewind 10 seconds" : "Forward 10 seconds";

  return (
    <button
      type="button"
      onClick={() => onSkip(direction)}
      className="rounded-full border border-white/20 p-2 transition-colors hover:border-white/40 hover:bg-white/10"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

interface ProgressBarProps {
  progressPercent: number;
  position: number;
  duration: number;
  formatTime: (value: number) => string;
  onSeek: (percent: number) => void;
  showThumb?: boolean;
  height?: string;
}

function ProgressBar({
  progressPercent,
  position,
  duration,
  formatTime,
  onSeek,
  showThumb = true,
  height = "h-1",
}: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent);
  };

  return (
    <div className="space-y-2">
      <div
        ref={progressRef}
        className={`relative ${height} w-full cursor-pointer rounded-full bg-white/20`}
        onClick={handleClick}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-white transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
        {showThumb && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md transition-transform hover:scale-125"
            style={{ left: `calc(${progressPercent}% - 6px)` }}
          />
        )}
      </div>
      <div className="flex items-center justify-between text-[10px] text-neutral-400">
        <span>{formatTime(position)}</span>
        <span>{duration ? formatTime(duration) : "0:00"}</span>
      </div>
    </div>
  );
}

interface PlaybackControlsProps {
  isPlaying: boolean;
  isReady: boolean;
  onToggle: () => void;
  onSkip: (direction: "forward" | "backward") => void;
  buttonSize?: "sm" | "md" | "lg";
  showVisualizer?: boolean;
}

function PlaybackControls({
  isPlaying,
  isReady,
  onToggle,
  onSkip,
  buttonSize = "md",
  showVisualizer = false,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <SkipButton direction="backward" onSkip={onSkip} />
      <PlayPauseButton isPlaying={isPlaying} isReady={isReady} onToggle={onToggle} size={buttonSize} />
      <SkipButton direction="forward" onSkip={onSkip} />
      {showVisualizer && <AudioVisualizer isPlaying={isPlaying} />}
    </div>
  );
}

// ============================================
// Desktop Widget Component
// ============================================

interface DesktopWidgetProps {
  loaderDone: boolean;
  player: AudioPlayerState & AudioPlayerActions;
}

function DesktopWidget({ loaderDone, player }: DesktopWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: 0.25, duration: 0.9, ease: EASE_OUT_EXPO }}
      className="pointer-events-auto absolute right-4 top-12 z-widget hidden w-[260px] flex-col gap-4 rounded-[32px] bg-black/95 p-6 text-white shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85)] xl:flex 2xl:right-16 2xl:top-6"
    >
      {/* Cover Art */}
      <Link
        href={HERO_TRACK.externalUrl}
        target="_blank"
        className="relative aspect-square w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={HERO_TRACK.cover}
          alt={`${HERO_TRACK.title} cover art`}
          fill
          sizes="260px"
          className="object-cover"
          priority
        />
      </Link>

      {/* Title, Artist & Visualizer */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 flex flex-col">
          <AnimatedText
            text={HERO_TRACK.title}
            className="block text-sm font-semibold leading-tight truncate"
            delay={0.2}
            triggerOnView
          />
          <AnimatedText
            text={HERO_TRACK.artist}
            className="block text-xs text-neutral-400 leading-tight truncate"
            delay={0.35}
            triggerOnView
          />
        </div>
        <AudioVisualizer isPlaying={player.isPlaying} />
      </div>

      {/* Progress Bar */}
      <ProgressBar
        progressPercent={player.progressPercent}
        position={player.position}
        duration={player.duration}
        formatTime={player.formatTime}
        onSeek={player.seekToPercent}
      />

      {/* Playback Controls */}
      <PlaybackControls
        isPlaying={player.isPlaying}
        isReady={player.isReady}
        onToggle={player.toggle}
        onSkip={player.skip}
      />
    </motion.div>
  );
}

// ============================================
// Mobile Mini Pill Component
// ============================================

interface MobilePillProps {
  player: AudioPlayerState & AudioPlayerActions;
  onExpand: () => void;
}

function MobilePill({ player, onExpand }: MobilePillProps) {
  return (
    <div className="pointer-events-auto fixed inset-x-4 bottom-4 z-sticky flex items-center gap-3 rounded-full bg-black/90 px-4 py-3 text-white shadow-[0_14px_40px_-20px_rgba(0,0,0,0.8)] xl:hidden">
      <Image
        src={HERO_TRACK.cover}
        alt={`${HERO_TRACK.title} cover art`}
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{HERO_TRACK.title}</p>
        <p className="truncate text-[11px] text-neutral-400">{HERO_TRACK.artist}</p>
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${player.progressPercent}%` }}
          />
        </div>
      </div>
      <PlayPauseButton
        isPlaying={player.isPlaying}
        isReady={player.isReady}
        onToggle={player.toggle}
        size="sm"
      />
      <button
        type="button"
        onClick={onExpand}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors active:scale-95"
        aria-label="Expand player"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
}

// ============================================
// Mobile Bottom Sheet Component
// ============================================

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  player: AudioPlayerState & AudioPlayerActions;
}

function MobileSheet({ isOpen, onClose, player }: MobileSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-modal flex items-end justify-center bg-black/40 backdrop-blur-sm xl:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="pointer-events-auto relative w-full rounded-t-3xl bg-neutral-950 px-5 py-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-lg font-medium leading-snug">{HERO_TRACK.title}</p>
                <p className="text-sm text-neutral-400">{HERO_TRACK.artist}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40"
                aria-label="Close player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex items-center gap-4">
              <Image
                src={HERO_TRACK.cover}
                alt={`${HERO_TRACK.title} cover art`}
                width={120}
                height={120}
                className="rounded-2xl object-cover"
              />
              <div className="flex-1 space-y-3">
                <ProgressBar
                  progressPercent={player.progressPercent}
                  position={player.position}
                  duration={player.duration}
                  formatTime={player.formatTime}
                  onSeek={player.seekToPercent}
                  showThumb={false}
                  height="h-2"
                />
                <PlaybackControls
                  isPlaying={player.isPlaying}
                  isReady={player.isReady}
                  onToggle={player.toggle}
                  onSkip={player.skip}
                  buttonSize="lg"
                  showVisualizer
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// Main Export Component
// ============================================

export function HeroMusicCard() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loaderDone = useLoaderComplete();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const player = useAudioPlayer(audioRef);

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src={HERO_TRACK.audioSrc} preload="metadata" className="hidden" />

      {/* Desktop Widget */}
      <DesktopWidget loaderDone={loaderDone} player={player} />

      {/* Mobile Mini Pill */}
      <MobilePill player={player} onExpand={() => setIsSheetOpen(true)} />

      {/* Mobile Bottom Sheet */}
      <MobileSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} player={player} />
    </>
  );
}
