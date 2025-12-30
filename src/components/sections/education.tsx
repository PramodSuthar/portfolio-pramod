"use client";

import { motion } from "framer-motion";
import { Education } from "@/data/content";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20 text-white selection:bg-white selection:text-black md:py-28 lg:py-36">
      {/* Background grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-1/4 h-px w-full bg-white/20" />
        <div className="absolute top-2/4 h-px w-full bg-white/20" />
        <div className="absolute top-3/4 h-px w-full bg-white/20" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-neutral-900 to-transparent" />
      </div>

      <div className="container relative z-content mx-auto flex flex-col gap-24 px-4 md:flex-row md:px-12">
        {/* Left column - STICKY */}
        <div className="md:w-1/3">
          <div className="sticky top-32">
            <motion.div
              className="mb-8 h-1 w-12 origin-left bg-white"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <h2 className="mb-8 text-5xl font-bold tracking-tighter md:text-7xl">
              Education
            </h2>
            <p className="text-lg leading-relaxed text-neutral-400">
              Academic background and certifications in computer science and
              software engineering.
            </p>
          </div>
        </div>

        {/* Right column - scrollable */}
        <div className="space-y-16 md:w-2/3">
          {Education.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.05 * index, duration: 0.5 }}
              className="group flex cursor-none items-start justify-between border-b border-white/20 pb-8 transition-all duration-300 ease-out hover:px-8"
            >
              <div>
                <span className="mb-2 block text-xs font-mono text-neutral-400">
                  {item.year}
                </span>
                <h3 className="mb-2 text-3xl font-medium transition-colors duration-300 group-hover:text-neutral-300">
                  {item.title}
                </h3>
                <p className="text-neutral-400 transition-colors duration-300 group-hover:text-white">
                  {item.org}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-white opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:rotate-0 rotate-180" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

