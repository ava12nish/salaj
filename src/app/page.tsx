'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import FinancialFlowVisual from '@/components/FinancialFlowVisual';
import RecruiterConsole from '@/components/RecruiterConsole';
import PortfolioCard from '@/components/PortfolioCard';
import SkillsAndTimeline from '@/components/SkillsAndTimeline';
import { projects } from '@/data/projects';
import { 
  Terminal, Shield, FileText, Mail, Calendar, 
  ArrowRight, Activity, Cpu, Database, BarChart3, Users, Landmark, 
  Layers, ChevronRight, MessageSquare 
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import { motion } from 'framer-motion';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Intersection Observer for navigation
  useEffect(() => {
    const sections = ['home', 'about', 'portfolio', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsConsoleOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('salaj.kumbhare@gmail.com');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-fintech-blue selection:text-white terminal-grid pb-20">
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Hero / Landing Section */}
      <section id="home" className="relative pt-8 md:pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-350">
              <span className="h-2 w-2 rounded-full bg-fintech-blue animate-pulse"></span>
              <span>Wealth Management // Investment Banking // Equity Research</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Analyzing Economics and <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintech-blue-glow to-fintech-cyan">
                Data Science.
              </span>
            </h1>

            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans max-w-xl">
              Highly analytical Economics and Data Science candidate at Rutgers University. Experienced in supporting corporate financial analysis, workflow process audits, and quantitative portfolio simulation modeling to guide data-driven decisions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 rounded-lg bg-fintech-blue hover:bg-fintech-blue-glow px-5 py-2.5 text-xs font-mono text-white transition-all shadow-lg shadow-fintech-blue/20"
              >
                <span>View Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => setIsConsoleOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-750 px-5 py-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-all"
              >
                <span>Recruiter Console</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-700 bg-zinc-950 px-1.5 py-0.5 text-[9px] text-zinc-400">
                  <span className="text-[10px]">⌘</span>K
                </kbd>
              </button>
            </div>
          </div>

          {/* Interactive Financial Visualizer */}
          <div className="lg:col-span-6">
            <FinancialFlowVisual />
          </div>

        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="border-y border-zinc-900 bg-zinc-950/40 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '15 hrs', label: 'Monthly Process Savings', desc: 'Optimized AFD financial audit' },
            { value: '$25k', label: 'Operations Budget', desc: 'ICNJ event allocation & metrics' },
            { value: '3.7', label: 'High School GPA', desc: 'Bridgewater Raritan Regional' },
            { value: '50+', label: 'Students Mentored', desc: 'Classical musical instruments' }
          ].map((stat, idx) => (
            <div key={idx} className="border-l border-zinc-900 pl-6 first:border-none">
              <div className="text-3xl font-bold font-mono tracking-tight text-white">{stat.value}</div>
              <div className="text-xs font-semibold text-zinc-200 mt-1 font-mono">{stat.label}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiter Showcase: Why Work With Me */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-fintech-blue-glow uppercase bg-fintech-blue/5 border border-fintech-blue/20 px-3 py-1 rounded-full">
            recruiter summary
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Why Work With Me
          </h2>
          <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">
            Translating mathematical algorithms and high-frequency trade flows into clean, distributed systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Cpu className="h-5 w-5 text-fintech-cyan" />,
              title: "Data Science & Economics",
              desc: "Deep core capability in econometric modeling, time-series forecasting, quantitative data analysis, and multivariate statistics."
            },
            {
              icon: <Database className="h-5 w-5 text-fintech-blue-glow" />,
              title: "Corporate Audit & Finance",
              desc: "Skilled in general ledger reconciliation, department budget tracking, and process improvement to eliminate workflow waste."
            },
            {
              icon: <Activity className="h-5 w-5 text-emerald-400" />,
              title: "Investment Acumen",
              desc: "Actively evaluating startup investment pitches and return metrics (IRR/ROI) inside the Rutgers Venture Capital Club."
            },
            {
              icon: <Users className="h-5 w-5 text-fintech-rose" />,
              title: "Logistics & Team Leadership",
              desc: "Directing event budgets up to $25,000, leading youth education groups (50+ students), and managing cross-departmental operations."
            }
          ].map((pillar, idx) => (
            <div key={idx} className="border border-zinc-900 bg-zinc-950 p-6 rounded-xl hover:border-zinc-800 transition-all space-y-4">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-850 w-fit">
                {pillar.icon}
              </div>
              <h3 className="text-sm font-bold text-zinc-100">{pillar.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio / Featured Work */}
      <section id="portfolio" className="py-20 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-fintech-cyan uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              product showcase
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Featured Work
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Quantitative modeling, corporate process optimizations, and financial analytics case studies.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span>TELEMETRY_LOGS: ACTIVE</span>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* About & Skill Console */}
      <section id="about" className="py-20 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-fintech-rose uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
            executive profile
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Who I Am
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Economics and Data Science candidate at Rutgers University with hands-on finance operations experience.
          </p>
        </div>

        {/* Executive Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 text-sm text-zinc-350 leading-relaxed font-sans">
            <p>
              I am an Economics and Data Science candidate at Rutgers University with a rigorous, detail-oriented approach to financial analysis, process optimization, and database auditing. My experience bridges corporate reporting internships and large-scale event budget coordination.
            </p>
            <p>
              My professional and collegiate activities focus on translating multi-dimensional datasets into strategic financial decisions. From saving 15 manual man-hours monthly through reports automation to pitching investment cases and tracking expenditures, I thrive in analytical and collaborative environments.
            </p>
            
            {/* Core strengths lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-zinc-900 bg-zinc-950 p-4 rounded-lg">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-fintech-cyan"></span>
                  Core Strengths
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-zinc-450 font-mono">
                  <li className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-650" />
                    Data Interpretation & Analysis
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-650" />
                    Financial Reporting & Auditing
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-650" />
                    Marketing Analytics & Forecasting
                  </li>
                </ul>
              </div>

              <div className="border border-zinc-900 bg-zinc-950 p-4 rounded-lg">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-fintech-blue-glow"></span>
                  Career Focus
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-zinc-450 font-mono">
                  <li className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-650" />
                    Wealth Management Advising
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-650" />
                    Investment Banking Analyst
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-650" />
                    Equity Research Associate
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick stats panel */}
          <div className="lg:col-span-4 glass-panel border border-zinc-800 rounded-xl p-6 space-y-6">
            <h3 className="text-xs font-mono font-bold text-zinc-350 tracking-wider uppercase border-b border-zinc-850 pb-2">
              System Parameters
            </h3>
            
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">OPERATOR:</span>
                <span className="text-zinc-200">S_KUMBHARE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">DISPATCH_LOC:</span>
                <span className="text-zinc-200">NEW_JERSEY_EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CLEARANCE:</span>
                <span className="text-zinc-200">ECON_DS_RUTGERS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">TOOLS_STACK:</span>
                <span className="text-zinc-200">PYTHON / EXCEL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ORGANIZATION:</span>
                <span className="text-zinc-200">RUTGERS_VC_CLUB</span>
              </div>
            </div>

            <button 
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-700 py-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{copiedText ? 'Copied address!' : 'Copy Contact Email'}</span>
            </button>
          </div>
        </div>

        {/* Skills and Timeline Component */}
        <SkillsAndTimeline />
      </section>

      {/* Financial Domains Grid */}
      <section className="py-20 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-fintech-cyan uppercase bg-zinc-900 border border-zinc-850 px-3 py-1 rounded-full">
            industry domains
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Financial Industry Alignment
          </h2>
          <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">
            Focus areas matching institutional investments, corporate finance, and equity valuation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Wealth Management",
              desc: "Constructing risk-balanced portfolios using Modern Portfolio Theory (MPT), calculating asset covariances, and tailoring allocations for long-term yields.",
              icon: <Landmark className="h-5 w-5 text-fintech-cyan" />
            },
            {
              title: "Investment Banking",
              desc: "Evaluating corporate pitches, building comparable company analysis, and applying DCF models to forecast capital return profiles.",
              icon: <Layers className="h-5 w-5 text-fintech-blue-glow" />
            },
            {
              title: "Equity Research",
              desc: "Analyzing income statements, tracking macro economic indicators, and utilizing Python data visualization to identify equity trends.",
              icon: <BarChart3 className="h-5 w-5 text-emerald-400" />
            }
          ].map((domain, idx) => (
            <div key={idx} className="border border-zinc-900 bg-zinc-950 p-6 rounded-xl hover:border-zinc-800 transition-all space-y-4">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-850 w-fit">
                {domain.icon}
              </div>
              <h3 className="text-sm font-bold text-zinc-100">{domain.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{domain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-fintech-blue-glow uppercase bg-zinc-900 border border-zinc-850 px-3 py-1 rounded-full">
            secure link
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Inquire Collaboration
          </h2>
          <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">
            Hiring managers and teams can submit requests for technical conversations directly.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-panel border border-zinc-800 rounded-xl p-6 space-y-6">
              <h4 className="text-xs font-mono font-bold text-zinc-350 tracking-wider uppercase border-b border-zinc-850 pb-2 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-fintech-cyan" />
                Connection Telemetry
              </h4>

              <div className="space-y-4">
                <a 
                  href="mailto:salaj.kumbhare@gmail.com"
                  className="flex items-center gap-3 text-xs text-zinc-450 hover:text-zinc-200 transition-colors font-mono"
                >
                  <Mail className="h-4 w-4 text-fintech-blue-glow" />
                  <span>salaj.kumbhare@gmail.com</span>
                </a>

                <a 
                  href="https://github.com/SalajPortfolio"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-xs text-zinc-450 hover:text-zinc-200 transition-colors font-mono"
                >
                  <Github className="h-4 w-4 text-zinc-300" />
                  <span>github.com/SalajPortfolio</span>
                </a>

                <a 
                  href="https://linkedin.com/in/salaj-kumbhare"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-xs text-zinc-450 hover:text-zinc-200 transition-colors font-mono"
                >
                  <Linkedin className="h-4 w-4 text-fintech-cyan" />
                  <span>linkedin.com/in/salaj-kumbhare</span>
                </a>
              </div>
            </div>

            <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-xl space-y-3">
              <h5 className="text-xs font-mono font-bold text-zinc-300">Recruiter Quick Action</h5>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Pressing <kbd className="bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-[10px] text-zinc-300 font-mono">⌘K</kbd> opens a global action panel to copy all contact credentials, download a PDF resume, or jump straight to system case studies instantly.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted successfully. Salaj Kumbhare will review your request.');
              (e.target as HTMLFormElement).reset();
            }}
            className="md:col-span-7 glass-panel border border-zinc-800 p-6 rounded-xl space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono text-zinc-400 uppercase">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alexis Carter"
                  className="mt-1 w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-3 py-2 rounded text-xs text-zinc-250 placeholder-zinc-650 outline-none"
                />
              </div>
              <div>
                <label htmlFor="firm" className="block text-[10px] font-mono text-zinc-400 uppercase">Firm / Institution</label>
                <input
                  id="firm"
                  type="text"
                  required
                  placeholder="e.g. Goldman Sachs"
                  className="mt-1 w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-3 py-2 rounded text-xs text-zinc-250 placeholder-zinc-650 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-mono text-zinc-400 uppercase">Email Address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="e.g. alexis.carter@gs.com"
                className="mt-1 w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-3 py-2 rounded text-xs text-zinc-250 placeholder-zinc-650 outline-none"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-[10px] font-mono text-zinc-400 uppercase">Role Focus</label>
              <select
                id="role"
                className="mt-1 w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-3 py-2 rounded text-xs text-zinc-450 placeholder-zinc-650 outline-none"
              >
                <option value="wealth">Wealth Management</option>
                <option value="ib">Investment Banking</option>
                <option value="equity">Equity Research</option>
                <option value="other">General Financial Discussion</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-mono text-zinc-400 uppercase">Message</label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Detail role requirements, tech stack focus, or meeting availability..."
                className="mt-1 w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-3 py-2 rounded text-xs text-zinc-250 placeholder-zinc-650 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-fintech-blue hover:bg-fintech-blue-glow py-2.5 text-xs font-mono text-white transition-all font-semibold"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Submit Collaboration Request</span>
            </button>
          </form>

        </div>
      </section>

      {/* Floating Recruiter Console / Resume Trigger */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        {/* Cmd+K reminder bubble */}
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800/80 px-3 py-1 text-[9px] font-mono text-zinc-400 shadow-md">
          <span>Search with</span>
          <kbd className="bg-zinc-950 border border-zinc-750 px-1 py-0.5 rounded text-[8px] text-zinc-200">⌘K</kbd>
        </div>

        {/* Floating action button */}
        <button
          onClick={() => setIsConsoleOpen(true)}
          className="flex h-12 items-center gap-2 rounded-full bg-fintech-blue hover:bg-fintech-blue-glow px-4 text-xs font-mono text-white shadow-lg shadow-fintech-blue/30 transition-all hover:scale-105"
          aria-label="Open Recruiter Console"
        >
          <FileText className="h-4 w-4" />
          <span>Resume & Console</span>
        </button>
      </div>

      {/* Recruiter Console Modal */}
      <RecruiterConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />

    </div>
  );
}
