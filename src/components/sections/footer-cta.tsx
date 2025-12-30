"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, type LucideIcon } from "lucide-react";
import { AnimatedText } from "@/components/hero/animated-text";
import { contact } from "@/data/content";

// Custom X (Twitter) icon component matching Lucide's interface
const XIcon: LucideIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
  </svg>
);
XIcon.displayName = "XIcon";

// Map platform names to icons
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  X: XIcon,
};

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: contact.timezone,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function FooterCTA() {
  const localTime = useLocalTime();

  return (
    <footer className="relative overflow-hidden bg-secondary px-4 py-12 text-foreground md:px-12 md:py-20">
      <div className="absolute inset-x-0 top-0 border-t border-dashed border-border" />
      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.03] select-none">
        <p className="whitespace-nowrap text-center text-[20vw] font-bold uppercase leading-none tracking-tighter">
          Create Inspire Build
        </p>
      </div>

      <div className="relative z-content flex flex-col gap-16 md:gap-24">
        {/* Headline */}
        <div className="pt-8 md:pt-16">
          {/* Line 1: Let's Build - PRIMARY text */}
          <AnimatedText
            text="Let's Build"
            delay={0}
            className="text-[clamp(5.5rem,18vw,16rem)] font-bold uppercase leading-[0.78] tracking-tighter text-foreground"
            triggerOnView
          />
          <br />
          {/* Line 2: The Future. - MUTED text */}
          <AnimatedText
            text="The Future."
            delay={0.15}
            className="text-[clamp(5.5rem,18vw,16rem)] font-bold uppercase leading-[0.78] tracking-tighter text-text-muted"
            triggerOnView
          />
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col gap-12 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-10">
            <p className="text-2xl font-light leading-relaxed text-text-secondary md:text-3xl">
              Currently open for new opportunities. Whether you have a question
              or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
              <Link
                href={`mailto:${contact.email}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium uppercase tracking-wider text-background transition-all duration-300 hover:scale-105 hover:opacity-90 sm:w-auto"
              >
                <ArrowUpRight className="h-4 w-4" />
                {contact.email}
              </Link>
              <div className="flex justify-center gap-2">
                {contact.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform];
                  if (!Icon) return null;
                  return (
                    <Link
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      aria-label={social.platform}
                      className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      <Icon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-right text-sm uppercase tracking-widest text-text-secondary">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] opacity-50">Location</span>
              <p>{contact.location}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] opacity-50">Local Time</span>
              <p>{localTime ?? "--:-- --"}</p>
            </div>
            <div className="my-4 ml-auto h-px w-24 bg-border" />
            <p>© {new Date().getFullYear()} Pramod</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

