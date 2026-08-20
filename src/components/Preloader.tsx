import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

interface PreloaderProps {
  progress: number;
  totalLoaded: number;
  totalFrames: number;
  isReady: boolean;
  onEnter: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  progress,
  totalLoaded,
  totalFrames,
  isReady,
  onEnter
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Brand Logo / Badge */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 mb-8 backdrop-blur-md">
          <Cpu className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="font-mono text-xs tracking-widest text-red-400 font-semibold uppercase">
            LAVAGGIO CINEMATIC ENGINE
          </span>
        </div>

        {/* Big Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-display">
          G 63 V8 BITURBO
        </h1>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase mb-8">
          Exploded View Dissection Experience
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-zinc-900/80 rounded-full h-2 overflow-hidden border border-zinc-800 p-0.5 mb-4 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-rose-400 rounded-full transition-all duration-200 ease-out shadow-glow-red"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry info */}
        <div className="flex justify-between w-full font-mono text-xs text-zinc-500 mb-8">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            BUFFERING ASSETS
          </span>
          <span className="text-zinc-300 font-medium">
            {totalLoaded} / {totalFrames} FRAMES ({Math.round(progress)}%)
          </span>
        </div>

        {/* Interactive prompt once critical frames are buffered */}
        {progress >= 30 ? (
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-glow-red active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ENTER EXPERIENCE</span>
            <div className="absolute inset-0 rounded-full border border-white/40 animate-pulse pointer-events-none" />
          </button>
        ) : (
          <div className="text-xs font-mono text-zinc-600 flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-zinc-700 border-t-red-500 rounded-full animate-spin" />
            INITIALIZING HIGH-PRECISION RENDER PIPELINE...
          </div>
        )}
      </div>

      {/* Footer watermark */}
      <div className="absolute bottom-6 font-mono text-[10px] tracking-widest text-zinc-700 uppercase">
        PRECISION 60FPS SCROLL ENGINE • REACT + TS + CANVAS 2D
      </div>
    </div>
  );
};
