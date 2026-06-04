'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Search, FileText, Mail, Phone, Calendar, ArrowRight, X, Sparkles, Code, Globe, User } from 'lucide-react';

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  action: () => void;
  icon: React.ReactNode;
}

interface RecruiterConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterConsole({ isOpen, onClose }: RecruiterConsoleProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard.`);
    onClose();
  };

  const jumpToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      onClose();
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'download-resume',
      category: 'Resume & Summary',
      title: 'Download Resume (PDF)',
      subtitle: 'Printable executive resume detailing systems experience.',
      icon: <FileText className="h-4 w-4 text-fintech-cyan" />,
      action: () => {
        window.open('#', '_blank');
        alert('Downloading Salaj Kumbhare Resume...');
        onClose();
      }
    },
    {
      id: 'copy-email',
      category: 'Contact Info',
      title: 'Copy Email Address',
      subtitle: 'salaj.kumbhare@gmail.com',
      icon: <Mail className="h-4 w-4 text-fintech-blue-glow" />,
      action: () => copyToClipboard('salaj.kumbhare@gmail.com', 'Email address')
    },
    {
      id: 'copy-phone',
      category: 'Contact Info',
      title: 'Copy Phone Number',
      subtitle: '(908) 304-2092',
      icon: <Phone className="h-4 w-4 text-zinc-400" />,
      action: () => copyToClipboard('9083042092', 'Phone number')
    },
    {
      id: 'book-call',
      category: 'Contact Info',
      title: 'Book a 15-Minute Intro Call',
      subtitle: 'Opens calendar invite scheduling modal.',
      icon: <Calendar className="h-4 w-4 text-emerald-400" />,
      action: () => {
        jumpToSection('contact');
      }
    },
    {
      id: 'project-afd',
      category: 'Portfolio Case Studies',
      title: 'View AFD Finance Pipeline Case Study',
      subtitle: 'Corporate automation saving 15 hrs/month.',
      icon: <Code className="h-4 w-4 text-purple-400" />,
      action: () => jumpToSection('portfolio')
    },
    {
      id: 'project-vc',
      category: 'Portfolio Case Studies',
      title: 'View VC Valuation Engine Details',
      subtitle: 'Startup comparable & DCF model in Python.',
      icon: <Code className="h-4 w-4 text-rose-400" />,
      action: () => jumpToSection('portfolio')
    },
    {
      id: 'project-icnj',
      category: 'Portfolio Case Studies',
      title: 'View ICNJ Budget System Ledger',
      subtitle: 'Event logistics tracking with $25k event cap.',
      icon: <Code className="h-4 w-4 text-amber-400" />,
      action: () => jumpToSection('portfolio')
    },
    {
      id: 'tech-skills',
      category: 'Background',
      title: 'Jump to Technical Expertise',
      subtitle: 'Languages, Databases, Cloud & Quantitative domains.',
      icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
      action: () => jumpToSection('about')
    },
    {
      id: 'milestones',
      category: 'Background',
      title: 'Jump to Career Timeline',
      subtitle: 'Explore professional history and degrees.',
      icon: <User className="h-4 w-4 text-zinc-200" />,
      action: () => jumpToSection('about')
    }
  ];

  // Filter based on search input
  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle arrow keys and enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  // Group commands by category for display
  const categories = Array.from(new Set(filteredCommands.map(c => c.category)));

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 pt-[10vh] px-4 backdrop-blur-sm">
      <div 
        ref={containerRef}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black"
      >
        {/* Search header */}
        <div className="relative flex items-center border-b border-zinc-850 px-4">
          <Search className="h-5 w-5 text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search (e.g., resume, email, Rust, Go)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          />
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No results found for &ldquo;<span className="text-zinc-300">{search}</span>&rdquo;.
            </div>
          ) : (
            categories.map(cat => {
              const catCmds = filteredCommands.filter(c => c.category === cat);
              return (
                <div key={cat} className="mb-2">
                  <div className="px-3 py-1.5 text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                    {cat}
                  </div>
                  <div className="space-y-0.5">
                    {catCmds.map(cmd => {
                      const currentFlatIndex = flatIndex;
                      flatIndex++;
                      const isSelected = currentFlatIndex === selectedIndex;

                      return (
                        <button
                          key={cmd.id}
                          onClick={() => cmd.action()}
                          onMouseEnter={() => setSelectedIndex(currentFlatIndex)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                            isSelected 
                              ? 'bg-zinc-900 text-zinc-100 border border-zinc-850' 
                              : 'text-zinc-400 hover:bg-zinc-900/40 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`p-1.5 rounded-md ${isSelected ? 'bg-zinc-950 border border-zinc-800' : 'bg-zinc-900/60'}`}>
                              {cmd.icon}
                            </span>
                            <div>
                              <div className="text-xs font-semibold text-zinc-200">{cmd.title}</div>
                              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{cmd.subtitle}</div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                              <span>Execute</span>
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-zinc-850 bg-zinc-900/20 px-4 py-2 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>↑↓ to navigate</span>
            <span className="text-zinc-700">|</span>
            <span>↵ to select</span>
            <span className="text-zinc-700">|</span>
            <span>ESC to close</span>
          </div>
          <div>
            <span className="text-zinc-400">Recruiter Console v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
