'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  value: string;
  symbol: string;
  opacity: number;
  pathIndex: number;
}

interface PriceTick {
  symbol: string;
  price: number;
  change: number;
}

export default function FinancialFlowVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ticks, setTicks] = useState<PriceTick[]>([
    { symbol: 'GS', price: 382.40, change: 2.15 },
    { symbol: 'JPM', price: 164.80, change: 0.85 },
    { symbol: 'MS', price: 88.50, change: 1.45 },
    { symbol: 'BLK', price: 720.10, change: -0.32 },
    { symbol: 'C', price: 48.90, change: 0.52 },
    { symbol: 'AMZN', price: 175.35, change: -1.12 },
    { symbol: 'AAPL', price: 182.20, change: 0.90 },
  ]);

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = containerRef.current?.clientWidth || 800);
    let height = (canvas.height = containerRef.current?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && containerRef.current) {
        width = canvas.width = containerRef.current.clientWidth;
        height = canvas.height = containerRef.current.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    // Initialize pipelines (Y-levels)
    const pipelineCount = 5;
    const pipelinesY: number[] = [];
    for (let i = 0; i < pipelineCount; i++) {
      pipelinesY.push(height * 0.2 + (height * 0.6 * (i / (pipelineCount - 1))));
    }

    // Initialize particles
    const particles: Particle[] = [];
    const maxParticles = 40;
    const colors = ['#2563eb', '#06b6d4', '#10b981', '#a1a1aa'];
    const symbols = ['AAPL', 'MSFT', 'GS', 'JPM', 'BLK', 'C', 'TSLA', 'NVDA', 'GOOGL', 'AMZN'];

    const spawnParticle = (pathIndex?: number) => {
      const pIndex = pathIndex !== undefined ? pathIndex : Math.floor(Math.random() * pipelineCount);
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const isUp = Math.random() > 0.4;
      const change = (Math.random() * 2).toFixed(2);
      const sign = isUp ? '+' : '-';
      const val = `${symbol} ${sign}${change}%`;

      return {
        x: 0,
        y: pipelinesY[pIndex],
        speed: 1.5 + Math.random() * 2.5,
        size: 2 + Math.random() * 3,
        color: isUp ? '#10b981' : '#f43f5e',
        value: val,
        symbol: symbol,
        opacity: 0.2 + Math.random() * 0.8,
        pathIndex: pIndex,
      };
    };

    for (let i = 0; i < maxParticles / 2; i++) {
      const p = spawnParticle();
      p.x = Math.random() * width;
      particles.push(p);
    }

    // Grid details
    const gridSize = 40;

    // Financial line chart data
    const chartPoints: { x: number; y: number }[] = [];
    const maxChartPoints = 60;
    let lastChartY = height * 0.75;
    for (let i = 0; i < maxChartPoints; i++) {
      chartPoints.push({
        x: (width * 0.05) + (width * 0.9 * (i / maxChartPoints)),
        y: lastChartY,
      });
    }

    // Real-time loop
    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Grid
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Horizontal Pipelines (Data channels)
      ctx.strokeStyle = 'rgba(63, 63, 70, 0.15)';
      ctx.lineWidth = 2;
      pipelinesY.forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Subtly label the channels like a terminal
        ctx.fillStyle = 'rgba(113, 113, 122, 0.3)';
        ctx.font = '8px monospace';
        ctx.fillText(`CHANNEL_0${pipelinesY.indexOf(y) + 1} // ACTIVE`, 10, y - 6);
      });

      // 3. Update & Draw Chart Line at the bottom
      if (frame % 8 === 0) {
        // Shift chart points left, add new point
        chartPoints.shift();
        const change = (Math.random() - 0.48) * 12;
        lastChartY = Math.max(height * 0.6, Math.min(height * 0.92, lastChartY + change));
        
        // Add new point at the end
        chartPoints.push({
          x: width, // will update below
          y: lastChartY,
        });

        // Re-scale X positions
        for (let i = 0; i < chartPoints.length; i++) {
          chartPoints[i].x = (width * 0.05) + (width * 0.9 * (i / maxChartPoints));
        }

        // Randomly update a stock price in our list
        setTicks((prev) => {
          const next = [...prev];
          const idx = Math.floor(Math.random() * next.length);
          const t = next[idx];
          const delta = (Math.random() - 0.49) * 0.8;
          const newPrice = Math.max(5.0, Number((t.price + delta).toFixed(2)));
          const newChange = Number((t.change + (delta / t.price) * 100).toFixed(2));
          next[idx] = { ...t, price: newPrice, change: newChange };
          return next;
        });
      }

      // Draw Chart line and gradient
      ctx.beginPath();
      ctx.moveTo(chartPoints[0].x, chartPoints[0].y);
      for (let i = 1; i < chartPoints.length; i++) {
        const xc = (chartPoints[i - 1].x + chartPoints[i].x) / 2;
        const yc = (chartPoints[i - 1].y + chartPoints[i].y) / 2;
        ctx.quadraticCurveTo(chartPoints[i - 1].x, chartPoints[i - 1].y, xc, yc);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chart area gradient
      const gradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(chartPoints[0].x, height);
      ctx.lineTo(chartPoints[0].x, chartPoints[0].y);
      for (let i = 1; i < chartPoints.length; i++) {
        const xc = (chartPoints[i - 1].x + chartPoints[i].x) / 2;
        const yc = (chartPoints[i - 1].y + chartPoints[i].y) / 2;
        ctx.quadraticCurveTo(chartPoints[i - 1].x, chartPoints[i - 1].y, xc, yc);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 4. Update and Draw Particles (Transactions/Ticks)
      if (particles.length < maxParticles && Math.random() < 0.1) {
        particles.push(spawnParticle());
      }

      particles.forEach((p, idx) => {
        p.x += p.speed;

        // Interaction with mouse
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            // Accelerate slightly and draw a tiny link
            p.x += p.speed * 0.2;
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle pulse glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Label some particles with financial info
        if (idx % 4 === 0 && p.x > 80 && p.x < width - 120) {
          ctx.fillStyle = 'rgba(228, 228, 231, 0.4)';
          ctx.font = '9px monospace';
          ctx.fillText(p.value, p.x - 20, p.y - 8);
        }

        // Recycle particles that move off screen
        if (p.x > width) {
          particles[idx] = spawnParticle(p.pathIndex);
        }
      });

      // 5. Draw mouse tracker circle
      if (mouseRef.current.active) {
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ring around mouse
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 40, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 6. Draw Legend / Status Box in bottom-right corner
      const boxW = 160;
      const boxH = 65;
      const bx = width - boxW - 20;
      const by = height - boxH - 20;
      
      // Draw glass frame
      ctx.fillStyle = 'rgba(9, 9, 11, 0.85)';
      ctx.strokeStyle = 'rgba(63, 63, 70, 0.4)';
      ctx.lineWidth = 1;
      ctx.fillRect(bx, by, boxW, boxH);
      ctx.strokeRect(bx, by, boxW, boxH);

      // Monospace text inside Box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '9px monospace';
      ctx.fillText(`ENGINE: ACTIVE`, bx + 10, by + 16);
      
      ctx.fillStyle = 'rgba(161, 161, 170, 0.7)';
      ctx.fillText(`INGEST: ${(120 + Math.sin(frame * 0.05) * 15).toFixed(0)} ticks/s`, bx + 10, by + 30);
      ctx.fillText(`LATENCY: ${(1.12 + Math.cos(frame * 0.03) * 0.08).toFixed(2)} ms`, bx + 10, by + 44);

      // Status indicator green dot in the box
      ctx.beginPath();
      ctx.arc(bx + 140, by + 13, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[320px] md:h-[450px] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/60">
      
      {/* Visual Ticker Header */}
      <div className="absolute top-0 left-0 w-full h-8 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between px-3 z-10 text-[10px] font-mono select-none">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>DATA_FLOW: CONNECTED</span>
        </div>
        <div className="flex items-center gap-4 overflow-hidden w-[70%] justify-end">
          {ticks.map((t, i) => (
            <div key={i} className="flex gap-1 shrink-0">
              <span className="text-zinc-200">{t.symbol}</span>
              <span className="text-zinc-400">${t.price.toFixed(2)}</span>
              <span className={t.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
