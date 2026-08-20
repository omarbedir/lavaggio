import React from 'react';
import { ARABIC_MILESTONES } from '../data/milestones';

interface ArabicHeroOverlayProps {
  currentFrame: number;
}

export const ArabicHeroOverlay: React.FC<ArabicHeroOverlayProps> = ({
  currentFrame,
}) => {
  // Progress threshold between 1 and 240 (cross-over around frame 120)
  const crossProgress = (currentFrame - 120) / 45; // -1 to +1 transition zone around frame 120

  // Opacity & transform for Text 1
  const opacity1 = Math.min(1, Math.max(0, 0.5 - crossProgress * 0.5));
  const translateY1 = crossProgress > 0 ? -crossProgress * 30 : 0;
  const blur1 = Math.max(0, (1 - opacity1) * 10);
  const scale1 = 0.95 + opacity1 * 0.05;

  // Opacity & transform for Text 2
  const opacity2 = Math.min(1, Math.max(0, 0.5 + crossProgress * 0.5));
  const translateY2 = crossProgress < 0 ? -crossProgress * 30 : 0;
  const blur2 = Math.max(0, (1 - opacity2) * 10);
  const scale2 = 0.95 + opacity2 * 0.05;

  const item1 = ARABIC_MILESTONES[0];
  const item2 = ARABIC_MILESTONES[1];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center select-none overflow-hidden font-yamama text-center p-4 sm:p-8">
      {/* Extremely Soft Ambient Aura (Light & Transparent) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(5,5,5,0.18) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[280px]">
        {/* First Text (السيارة المتكاملة / فخامة الحماية المطلقة) */}
        {opacity1 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            style={{
              opacity: opacity1,
              transform: `translateY(${translateY1}px) scale(${scale1})`,
              filter: `blur(${blur1}px)`,
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Ultra-Light, Sleek Frosted Glass Capsule Overlay */}
            <div className="relative px-6 sm:px-12 py-6 sm:py-9 rounded-3xl sm:rounded-[2.2rem] bg-black/20 backdrop-blur-md border border-white/[0.06] shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(245,208,51,0.06)] flex flex-col items-center">
              {/* Subtle Golden Top Accent */}
              <div className="absolute top-0 left-1/3 right-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5D033]/60 to-transparent rounded-full shadow-[0_0_8px_rgba(245,208,51,0.6)]" />

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.18] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
                <span className="text-shimmer bg-clip-text">
                  {item1.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-zinc-200/95 mt-3 sm:mt-4 max-w-2xl leading-relaxed drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]">
                {item1.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Second Text (التشريح الهندسي / عناية بأدق التفاصيل) */}
        {opacity2 > 0.01 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            style={{
              opacity: opacity2,
              transform: `translateY(${translateY2}px) scale(${scale2})`,
              filter: `blur(${blur2}px)`,
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Ultra-Light, Sleek Frosted Glass Capsule Overlay */}
            <div className="relative px-6 sm:px-12 py-6 sm:py-9 rounded-3xl sm:rounded-[2.2rem] bg-black/20 backdrop-blur-md border border-white/[0.06] shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(245,208,51,0.06)] flex flex-col items-center">
              {/* Subtle Golden Top Accent */}
              <div className="absolute top-0 left-1/3 right-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5D033]/60 to-transparent rounded-full shadow-[0_0_8px_rgba(245,208,51,0.6)]" />

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.18] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
                <span className="text-shimmer bg-clip-text">
                  {item2.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-zinc-200/95 mt-3 sm:mt-4 max-w-2xl leading-relaxed drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]">
                {item2.subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArabicHeroOverlay;
