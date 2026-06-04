'use client';

import React, { useState } from 'react';
import { Project } from '@/data/projects';
import { Globe, X, ArrowRight, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Github } from '@/components/BrandIcons';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioCardProps {
  project: Project;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Project Card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-700/80"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fintech-blue/5 to-fintech-cyan/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider text-fintech-cyan uppercase">
              {project.category}
            </span>
            <Server className="h-4 w-4 text-zinc-600 group-hover:text-fintech-blue-glow transition-colors" />
          </div>

          {/* Title */}
          <h3 className="mt-3 text-lg font-bold text-zinc-100 group-hover:text-white">
            {project.title}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-400 font-mono">
            {project.tagline}
          </p>

          {/* Core Metric Grid */}
          <div className="mt-5 grid grid-cols-2 gap-3 border-y border-zinc-800/80 py-4">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx}>
                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{m.label}</div>
                <div className="text-sm font-semibold text-zinc-200 font-mono mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] font-mono text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] font-mono text-zinc-500">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-xs font-mono text-fintech-blue-glow group-hover:text-white transition-colors"
          >
            <span>View Case Study</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 hover:text-zinc-200 transition-colors"
              aria-label={`View code for ${project.title}`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-6 overflow-y-auto backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 p-1 bg-zinc-900 border border-zinc-800 rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Tag and Title */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-fintech-cyan uppercase bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                  {project.category}
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-zinc-100">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400 font-mono">
                  {project.tagline}
                </p>
              </div>

              {/* Metrics Bar */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-zinc-800/80 py-4 bg-zinc-900/10 px-2 rounded-lg">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="border-r border-zinc-850 last:border-none pr-2">
                    <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">{m.label}</div>
                    <div className="text-sm md:text-base font-bold text-zinc-200 font-mono mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Case Study Details Grid */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* Text Content */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-fintech-rose" />
                      The Challenge (Problem)
                    </h4>
                    <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-sans">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      The Engineering Solution
                    </h4>
                    <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-sans">
                      {project.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                      Key Architectural Takeaways
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {project.learnings.map((l, idx) => (
                        <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2 leading-relaxed">
                          <span className="text-fintech-blue-glow select-none">▪</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack and System Architecture */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                      Complete Technology Stack
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.architectureDiagram && (
                    <div>
                      <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                        System Architecture Topology
                      </h4>
                      <pre className="mt-2 w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-[10px] font-mono text-zinc-400 leading-normal scrollbar-thin">
                        {project.architectureDiagram.trim()}
                      </pre>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-2 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                    >
                      <Github className="h-4 w-4" />
                      <span>Explore Source Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-fintech-blue hover:bg-fintech-blue-glow px-4 py-2 text-xs font-mono text-white transition-all"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
                >
                  Close case study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
