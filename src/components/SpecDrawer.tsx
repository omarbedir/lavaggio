import React from 'react';
import { X, Cpu, Gauge, Zap, Wrench, Shield, Compass, ArrowUpRight } from 'lucide-react';
import { MILESTONES, Milestone } from '../data/milestones';

interface SpecDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMilestone: (milestone: Milestone) => void;
}

export const SpecDrawer: React.FC<SpecDrawerProps> = ({
  isOpen,
  onClose,
  onSelectMilestone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-glow-red" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white uppercase">
                MERCEDES-AMG G 63 | ENGINEERING DOSSIER
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                TECHNICAL BLUEPRINT & EXPLODED COMPONENT MATRIX
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-red-500 hover:text-white text-zinc-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">HORSEPOWER</span>
              </div>
              <span className="text-2xl font-black font-display text-white">577 HP</span>
              <p className="text-[10px] text-zinc-500 font-mono">@ 6,000 RPM</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Gauge className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">TORQUE</span>
              </div>
              <span className="text-2xl font-black font-display text-white">850 NM</span>
              <p className="text-[10px] text-zinc-500 font-mono">2,500 - 3,500 RPM</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">0 - 100 KM/H</span>
              </div>
              <span className="text-2xl font-black font-display text-white">4.5 SEC</span>
              <p className="text-[10px] text-zinc-500 font-mono">RACE START Launch</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">FRAME</span>
              </div>
              <span className="text-2xl font-black font-display text-white">LADDER</span>
              <p className="text-[10px] text-zinc-500 font-mono">Box-section Steel</p>
            </div>
          </div>

          {/* Exploded Dissection Chapters */}
          <div>
            <h3 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-red-500" />
              EXPLODED DISSECTION PHASES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MILESTONES.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    onSelectMilestone(m);
                    onClose();
                  }}
                  className="group relative p-5 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-red-500/50 hover:bg-zinc-900 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono text-xs font-bold border border-red-500/20">
                        PHASE {m.phaseNumber}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 uppercase">
                        FRAMES {m.frameRange[0]} - {m.frameRange[1]}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h4 className="text-base font-bold text-white font-display mb-1 group-hover:text-red-400 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Deep Dive Specs */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-mono tracking-widest text-white uppercase mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-red-500" />
              FULL POWERTRAIN & MECHANICAL ARCHITECTURE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Engine Displacement</span>
                <span className="text-white font-semibold">3,982 cc (4.0L)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Configuration</span>
                <span className="text-white font-semibold">90° V8 Biturbo ("Hot Inside V")</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Transmission</span>
                <span className="text-white font-semibold">AMG SPEEDSHIFT TCT 9-Speed</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Drivetrain</span>
                <span className="text-white font-semibold">AMG Performance 4MATIC (40:60)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Braking System</span>
                <span className="text-white font-semibold">Front: 400mm / Rear: 370mm Ventilated</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Differential Locks</span>
                <span className="text-white font-semibold">3 Independent 100% Electromechanical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-zinc-950/60 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            LAVAGGIO MOTORSPORT ENGINEERING DATABASE
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-red-500 hover:text-white transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
