"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Projects } from "@/data/content";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-surface-warm py-20 transition-colors md:py-28 lg:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
      <div className="mx-auto max-w-[95rem] px-4 md:px-8 lg:px-12">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              (Selected Work)
            </span>
            <h2 className="text-6xl font-bold tracking-tight text-foreground md:text-8xl lg:text-9xl">
              Side
              <br />
              <span className="text-text-muted">Projects.</span>
            </h2>
          </div>
          <div className="hidden flex-col items-end text-xs font-mono uppercase tracking-[0.3em] text-text-secondary md:flex">
            <span>Personal & Open Source</span>
            <ArrowUpRight className="mt-4 h-10 w-10 text-text-muted" />
          </div>
        </div>
      </div>

      <div className="border-y border-border-warm">
        {Projects.map((project, index) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

type ProjectItem = (typeof Projects)[number];

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.05 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group border-b border-border-warm bg-card py-10 transition-colors hover:bg-surface-warm-hover"
    >
      <div className="mx-auto flex max-w-[95rem] flex-col gap-8 px-4 text-left md:flex-row md:items-start md:gap-8 md:px-8 lg:px-12">
        <div className="w-full md:w-1/3 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl font-semibold tracking-tighter text-foreground md:text-4xl">
                {project.title}
              </h3>
            </div>
            <Link
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all hover:-rotate-6 hover:bg-foreground hover:text-background"
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-text-emphasis"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg leading-relaxed text-text-secondary">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

