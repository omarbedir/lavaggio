import React from 'react';
import { Milestone } from '../data/milestones';
import { ChevronRight, Sparkles, Activity, Layers } from 'lucide-react';

interface ScrollyOverlayProps {
  currentMilestone: Milestone;
  currentFrame: number;
  totalFrames: number;
  scrollProgress: number;
  onOpenSpecs: () => void;
}

export const ScrollyOverlay: React.FC<ScrollyOverlayProps> = ({
  currentMilestone,
  currentFrame,
  totalFrames,
  scrollProgress,
  onOpenSpecs,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 md:p-10 overflow-hidden">
      {/* Top telemetry HUD Bar */}
      <div className="flex items-start justify-between w-full pt-14 sm:pt-16">
        {/* Left Phase Badge & Title */}
        <div className="flex flex-col max-w-md sm:max-w-lg transition-all duration-500 ease-out">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold">
              {currentMilestone.phaseNumber}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-red-400" />
              <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase">
                {currentMilestone.badge}
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white font-display uppercase leading-tight drop-shadow-md">
            {currentMilestone.title}
          </h2>
          <p className="text-[11px] sm:text-xs font-mono tracking-wider text-red-400/90 uppercase font-medium mt-0.5">
            {currentMilestone.subtitle}
          </p>
        </div>

        {/* Right HUD Technical telemetry card */}
        <div className="hidden md:flex flex-col items-end gap-1.5">
          <div className="glass-panel px-3.5 py-2.5 rounded-xl flex flex-col items-end border border-white/10 text-right">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-[9px] tracking-widest uppercase">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              LIVE TELEMETRY FEED
            </div>
            <div className="font-mono text-base font-bold text-white tracking-widest mt-0.5">
              {Math.round(scrollProgress * 100)}% DISSECTION
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              FRAME {String(currentFrame).padStart(3, '0')} / {totalFrames}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Description, Specs Grid & Action with safe bottom spacing */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-24 sm:pb-28">
        {/* Left description and quick highlights */}
        <div className="max-w-md lg:max-w-lg flex flex-col gap-2.5">
          <p className="text-xs sm:text-sm text-zinc-300/90 font-sans leading-relaxed glass-panel p-3.5 sm:p-4 rounded-xl border border-white/10 shadow-glass">
            {currentMilestone.description}
          </p>

          {/* Quick specs pill row */}
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {currentMilestone.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-[10px] sm:text-[11px] font-mono text-zinc-300 hover:border-red-500/40 hover:text-white transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-red-500" />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Right dynamic live specs grid */}
        <div className="flex flex-col gap-2.5 pointer-events-auto shrink-0">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {currentMilestone.specs.map((spec, index) => (
              <div
                key={index}
                className="glass-panel p-2.5 sm:p-3 rounded-xl border border-white/10 flex flex-col min-w-[120px] sm:min-w-[135px] transition-transform duration-300 hover:-translate-y-0.5 hover:border-red-500/30"
              >
                <span className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase">
                  {spec.label}
                </span>
                <span className="font-display font-black text-sm sm:text-lg text-white mt-0.5 tracking-tight">
                  {spec.value}
                </span>
                {spec.sub && (
                  <span className="text-[9px] text-red-400/80 font-mono">
                    {spec.sub}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Blueprint button */}
          <button
            onClick={onOpenSpecs}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-red-500 hover:text-white border border-white/10 hover:border-red-500 text-zinc-200 transition-all duration-300 group shadow-lg active:scale-98"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-400 group-hover:text-white transition-colors" />
              <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">
                DISSECTION BLUEPRINT
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
