'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [timeUTC, setTimeUTC] = useState<string>('');
  const [timeLocal, setTimeLocal] = useState<string>('');
  const [marketOpen, setMarketOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // UTC Time
      const utcString = now.toUTCString().slice(17, 25) + ' UTC';
      setTimeUTC(utcString);

      // Local Time
      const localString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setTimeLocal(localString);

      // Check if market is open (NYSE: 9:30 AM - 4:00 PM EST, Monday-Friday)
      // Convert current time to EST (New York)
      const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const day = nyTime.getDay();
      const hours = nyTime.getHours();
      const minutes = nyTime.getMinutes();
      const timeAsMinutes = hours * 60 + minutes;

      const isWeekend = day === 0 || day === 6;
      const isOpenHour = timeAsMinutes >= 9 * 60 + 30 && timeAsMinutes < 16 * 60; // 9:30 AM - 4:00 PM
      setMarketOpen(!isWeekend && isOpenHour);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-fintech-cyan" />
          <span className="font-mono text-sm font-semibold tracking-wider text-zinc-100 uppercase">
            S.KUMBHARE <span className="text-zinc-600">//</span> <span className="text-zinc-500 font-normal">SYS.ENG</span>
          </span>
          <span className="relative flex h-2 w-2 ml-1">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${marketOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${marketOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={`text-sm font-medium transition-colors hover:text-zinc-100 ${
                activeSection === item.href.substring(1) ? 'text-zinc-100 border-b-2 border-fintech-blue py-4' : 'text-zinc-400 py-4'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Clocks and Market status */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 border-r border-zinc-800 pr-4">
            <span className="text-zinc-600">LCL:</span>
            <span className="text-zinc-200">{timeLocal}</span>
          </div>
          <div className="flex items-center gap-1.5 border-r border-zinc-800 pr-4">
            <span className="text-zinc-600">SYS:</span>
            <span className="text-zinc-200">{timeUTC}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded">
            <span className="text-zinc-600">NYSE:</span>
            <span className={marketOpen ? 'text-emerald-400 font-semibold' : 'text-amber-500 font-semibold'}>
              {marketOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden text-zinc-400 hover:text-zinc-100 p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'bg-zinc-900 text-zinc-100 border-l-4 border-fintech-blue'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="border-t border-zinc-850 pt-4 flex justify-between text-xs font-mono text-zinc-400 px-3">
            <div>
              <span className="text-zinc-600">SYS: </span>
              <span className="text-zinc-200">{timeUTC}</span>
            </div>
            <div>
              <span className="text-zinc-600">NYSE: </span>
              <span className={marketOpen ? 'text-emerald-400 font-semibold' : 'text-amber-500 font-semibold'}>
                {marketOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
