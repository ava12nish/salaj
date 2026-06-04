'use client';

import React, { useState } from 'react';
import { milestones } from '@/data/projects';
import { Briefcase, GraduationCap, ChevronRight, Award, Zap, Code, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: string; // e.g. "Expert", "Proficient"
  detail: string; // e.g. "Low-latency systems, SIMD"
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function SkillsAndTimeline() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: <Code className="h-4 w-4 text-fintech-cyan" />,
      skills: [
        { name: 'C++', level: 'Expert', detail: 'Lock-free queues, cache alignment, off-heap allocators' },
        { name: 'Go', level: 'Expert', detail: 'Concurrency pipelines, gRPC nodes, Raft implementation' },
        { name: 'Java', level: 'Expert', detail: 'LMAX Disruptor, ZGC tuning, memory pre-allocation' },
        { name: 'Python', level: 'Proficient', detail: 'NumPy, Pandas, Black-Litterman risk models' },
        { name: 'Rust', level: 'Proficient', detail: 'SIMD float processing, safe thread execution' },
        { name: 'TypeScript', level: 'Proficient', detail: 'Type-safe web dashboards, Next.js routers' },
        { name: 'SQL', level: 'Expert', detail: 'ClickHouse indexing, CTEs, custom window functions' },
      ],
    },
    {
      title: 'Financial Technology',
      icon: <Shield className="h-4 w-4 text-fintech-rose" />,
      skills: [
        { name: 'FIX Protocol', level: 'Expert', detail: 'QuickFAST engine integrations, session handling' },
        { name: 'NASDAQ ITCH/OUCH', level: 'Expert', detail: 'Binary parsing, multicast UDP decoders' },
        { name: 'LMAX Disruptor', level: 'Expert', detail: 'Lock-free ring buffer intra-thread pipelines' },
        { name: 'Risk Analytics', level: 'Proficient', detail: 'Monte Carlo simulations, Value-at-Risk (VaR)' },
        { name: 'Double-Entry Ledgers', level: 'Expert', detail: 'Transaction isolation, balance linearizability' },
      ],
    },
    {
      title: 'Infrastructure & Cloud',
      icon: <Zap className="h-4 w-4 text-fintech-blue-glow" />,
      skills: [
        { name: 'AWS (ECS/EC2)', level: 'Proficient', detail: 'Distributed Spark clusters, IAM policy setups' },
        { name: 'Docker / K8s', level: 'Proficient', detail: 'Microservice containerization, scale orchestration' },
        { name: 'Apache Kafka', level: 'Expert', detail: 'Dynamic consumer partitioning, backpressure' },
        { name: 'Redis', level: 'Expert', detail: 'Pub/Sub queues, multi-region cache layers' },
        { name: 'ClickHouse', level: 'Expert', detail: 'Columnar storage layout, high-rate tick ingestion' },
        { name: 'Terraform', level: 'Proficient', detail: 'Infrastructure as code for AWS pipelines' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
      
      {/* LEFT COLUMN: Skill Console */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fintech-cyan"></span>
            Technical Competency Console
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Interactive skill categories showing domain proficiency & system architectures.
          </p>
        </div>

        {/* Category selection */}
        <div className="flex gap-2 border-b border-zinc-800 pb-3 overflow-x-auto scrollbar-none">
          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs font-mono transition-all shrink-0 ${
                activeCategory === idx
                  ? 'bg-zinc-900 border border-zinc-750 text-zinc-100 font-semibold'
                  : 'text-zinc-500 hover:text-zinc-350'
              }`}
            >
              {cat.icon}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Active skills rendering */}
        <div className="glass-panel rounded-xl p-6 border border-zinc-800/80">
          <div className="space-y-3">
            {skillCategories[activeCategory].skills.map((skill, sIdx) => {
              const isHovered = hoveredSkill === skill.name;
              return (
                <div
                  key={sIdx}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative flex flex-col justify-between rounded-lg border border-zinc-850 hover:border-zinc-750 bg-zinc-950/40 p-3.5 transition-all cursor-crosshair"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className={`text-[9px] font-mono border px-2 py-0.5 rounded ${
                      skill.level === 'Expert' 
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' 
                        : 'border-fintech-blue/30 text-fintech-blue-glow bg-fintech-blue/5'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  
                  {/* Expand details on hover */}
                  <div className="mt-2 text-xs text-zinc-400 leading-relaxed font-mono">
                    {skill.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Console Output Footer */}
          <div className="mt-6 border-t border-zinc-850 pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
            <span>SYS_SKILL_LOG: ACTIVE</span>
            <span>Hover items for telemetry data</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Milestones Timeline */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fintech-rose"></span>
            Professional & Academic Milestones
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            System engineer history, educations, and accomplishments.
          </p>
        </div>

        {/* Timeline visualization */}
        <div className="relative border-l border-zinc-800 ml-4 pl-6 space-y-8 py-2">
          {milestones.map((m, idx) => {
            const isEdu = m.type === 'education';
            return (
              <div key={m.id} className="relative group">
                
                {/* Connector Dot */}
                <div className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border bg-zinc-950 transition-all group-hover:scale-125 ${
                  isEdu 
                    ? 'border-fintech-blue text-fintech-blue-glow' 
                    : 'border-fintech-cyan text-fintech-cyan'
                }`}>
                  {isEdu ? <GraduationCap className="h-2 w-2" /> : <Briefcase className="h-2 w-2" />}
                </div>

                {/* Content Box */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-semibold text-zinc-500">
                      {m.year}
                    </span>
                    <span className={`text-[10px] font-mono border px-2 py-0.5 rounded capitalize ${
                      isEdu ? 'border-zinc-800 text-zinc-400 bg-zinc-900/30' : 'border-zinc-800 text-zinc-300 bg-zinc-900/40'
                    }`}>
                      {m.type}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {m.title}
                  </h4>
                  <div className="text-xs font-semibold text-fintech-cyan font-mono">
                    {m.organization}
                  </div>

                  <ul className="mt-2 space-y-1.5">
                    {m.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-zinc-450 leading-relaxed flex items-start gap-2">
                        <ChevronRight className="h-3 w-3 mt-0.5 text-zinc-650 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {m.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded border border-zinc-850 bg-zinc-950 px-1.5 py-0.5 text-[8px] font-mono text-zinc-450 hover:text-zinc-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
