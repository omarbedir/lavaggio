import React from 'react';
import { MILESTONES, Milestone } from '../data/milestones';
import { SlidersHorizontal, MousePointer } from 'lucide-react';

interface ControlBarProps {
  currentFrame: number;
  totalFrames: number;
  scrollProgress: number;
  currentMilestone: Milestone;
  onSeekFrame: (targetFrame: number) => void;
  onJumpToMilestone: (milestone: Milestone) => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  currentFrame,
  totalFrames,
  scrollProgress,
  currentMilestone,
  onSeekFrame,
  onJumpToMilestone,
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frame = parseInt(e.target.value, 10);
    onSeekFrame(frame);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-3xl flex flex-col items-center gap-1.5 pointer-events-auto">
      {/* Interactive Floating Dock */}
      <div className="w-full glass-panel-glow px-3 sm:px-4 py-2 rounded-2xl flex items-center justify-between gap-3 border border-white/10 shadow-2xl backdrop-blur-2xl">
        {/* Phase Jump Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
          {MILESTONES.map((m) => {
            const isActive = currentMilestone.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onJumpToMilestone(m)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono text-[10px] sm:text-[11px] font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-red-500 text-white shadow-glow-red font-bold scale-102'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.04]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white animate-pulse' : 'bg-zinc-600'
                  }`}
                />
                <span>{m.phaseNumber}</span>
                <span className="hidden sm:inline uppercase text-[9px]">
                  {m.badge.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Scrub Slider */}
        <div className="flex items-center gap-2.5 w-36 sm:w-56 md:w-64 shrink-0">
          <SlidersHorizontal className="w-3 h-3 text-zinc-500 hidden sm:block shrink-0" />
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={1}
              max={totalFrames}
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none transition-all hover:bg-zinc-700"
            />
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] text-zinc-300 w-8 text-right shrink-0">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
        <MousePointer className="w-2.5 h-2.5 text-red-500 animate-bounce" />
        <span>SCROLL DOWN TO DISASSEMBLE</span>
      </div>
    </div>
  );
};
