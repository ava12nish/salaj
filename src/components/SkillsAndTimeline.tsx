'use client';

import React from 'react';
import { milestones } from '@/data/projects';
import { Briefcase, GraduationCap, ChevronRight, CheckCircle2, ShieldCheck, Languages, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SkillsAndTimeline() {
  const skillCategories = [
    {
      title: 'Technical & Analytical',
      icon: <ShieldCheck className="h-4 w-4 text-fintech-cyan" />,
      skills: [
        'Data Interpretation & Analysis',
        'Financial Reporting',
        'Marketing Analytics',
        'Python (Data Science, NumPy, Pandas)',
        'SQL Queries & Joins',
        'Microsoft Office & Excel',
        'Google Suite'
      ]
    },
    {
      title: 'Advisory & Soft Skills',
      icon: <CheckCircle2 className="h-4 w-4 text-fintech-blue-glow" />,
      skills: [
        'Organization and Planning',
        'Strategic Thinking',
        'Clear Financial Communication',
        'Teamwork & Collaboration',
        'Initiative & Process Ownership',
        'Problem Solving'
      ]
    },
    {
      title: 'Languages & Background',
      icon: <Languages className="h-4 w-4 text-fintech-rose" />,
      skills: [
        'English (Fluent)',
        'Hindi (Fluent)',
        'Marathi (Conversational)',
        'Rutgers Venture Capital Member',
        'Bhakti Club Rutgers Treasurer'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
      
      {/* LEFT COLUMN: Skill Directory */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fintech-cyan"></span>
            Professional Skill Directory
          </h3>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Data science foundation and operational capabilities mapped from academic and internship history.
          </p>
        </div>

        {/* Skill Card Grid */}
        <div className="space-y-4">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="border border-zinc-900 bg-zinc-950 p-5 rounded-xl space-y-3 hover:border-zinc-800 transition-all"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
                <span className="p-1 rounded bg-zinc-900 border border-zinc-800">
                  {cat.icon}
                </span>
                <h4 className="text-xs font-bold font-mono tracking-wider text-zinc-100 uppercase">
                  {cat.title}
                </h4>
              </div>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded-lg bg-zinc-900/50 border border-zinc-850 px-2.5 py-1 text-xs font-sans text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
            Historical overview of education, internships, and collegiate leadership roles.
          </p>
        </div>

        {/* Timeline visualization */}
        <div className="relative border-l border-zinc-800 ml-4 pl-6 space-y-8 py-2">
          {milestones.map((m) => {
            const isEdu = m.type === 'education';
            const isCol = m.type === 'collegiate';
            return (
              <div key={m.id} className="relative group">
                
                {/* Connector Dot */}
                <div className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border bg-zinc-950 transition-all group-hover:scale-125 ${
                  isEdu 
                    ? 'border-fintech-blue text-fintech-blue-glow' 
                    : isCol
                    ? 'border-fintech-rose text-fintech-rose'
                    : 'border-fintech-cyan text-fintech-cyan'
                }`}>
                  {isEdu ? <GraduationCap className="h-2 w-2" /> : <Briefcase className="h-2 w-2" />}
                </div>

                {/* Content Box */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-semibold text-zinc-500">
                      {m.year}
                    </span>
                    <span className={`text-[9px] font-mono border px-2 py-0.5 rounded capitalize ${
                      isEdu 
                        ? 'border-zinc-800 text-zinc-400 bg-zinc-900/30' 
                        : isCol 
                        ? 'border-fintech-rose/20 text-fintech-rose/80 bg-fintech-rose/5'
                        : 'border-zinc-800 text-zinc-300 bg-zinc-900/40'
                    }`}>
                      {m.type}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight">
                    {m.title}
                  </h4>
                  <div className="text-xs font-semibold text-fintech-cyan font-mono">
                    {m.organization}
                  </div>

                  <ul className="mt-2 space-y-1.5">
                    {m.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-zinc-400 leading-relaxed flex items-start gap-1.5">
                        <ChevronRight className="h-3 w-3 mt-0.5 text-zinc-650 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
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
