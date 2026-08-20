import { useState, useEffect, useRef, useCallback } from 'react';
import { TOTAL_FRAMES } from './data/milestones';
import { HeroCanvas } from './components/HeroCanvas';
import { Navbar } from './components/Navbar';
import { ArabicHeroOverlay } from './components/ArabicHeroOverlay';
import { ServicesSection } from './components/ServicesSection';

export function App() {
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [heroExitProgress, setHeroExitProgress] = useState<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  // Preload all 240 high-resolution 4K frames with async decoding
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
      };

      img.onerror = () => {
        count++;
        setLoadedCount(count);
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Map scroll progress specifically within the hero container
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = heroContainerRef.current;
      if (!heroEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const heroHeight = heroEl.scrollHeight;
      const windowHeight = window.innerHeight;
      const heroScrollable = heroHeight - windowHeight;

      if (heroScrollable <= 0) return;

      const scrollOffset = -heroRect.top;
      const progress = Math.min(1, Math.max(0, scrollOffset / heroScrollable));

      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)
      );

      setCurrentFrame(frameIndex);

      // Transition curve when approaching the bottom of hero track (from 88% to 100%)
      if (progress > 0.88) {
        const exitNorm = (progress - 0.88) / 0.12; // 0 to 1
        setHeroExitProgress(exitNorm);
      } else {
        setHeroExitProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to target section
  const handleNavigateToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleSelectServiceForBooking = useCallback((serviceTitle: string) => {
    const text = encodeURIComponent(`مرحباً لافيجيو، أود الاستفسار وحجز خدمة: ${serviceTitle}`);
    window.open(`https://wa.me/97444556677?text=${text}`, '_blank');
  }, []);

  // 3D Parallax transition transforms as Hero exits
  const canvasScale = 1 - heroExitProgress * 0.08; // 1.0 -> 0.92
  const canvasOpacity = 1 - heroExitProgress * 0.35; // 1.0 -> 0.65
  const canvasBlur = heroExitProgress * 6; // 0px -> 6px
  const canvasBorderRadius = heroExitProgress * 28; // 0px -> 28px

  return (
    <div className="relative w-full bg-[#050505] text-[#f5f5f7] font-yamama selection:bg-[#F5D033] selection:text-black">
      {/* Navigation Bar: Pure Minimalist Centered Links (الرئيسية • الخدمات) */}
      <Navbar onNavigateToSection={handleNavigateToSection} />

      {/* SECTION 1: Hero Dissection Track (الرئيسية - 450vh) */}
      <div id="hero" ref={heroContainerRef} className="relative w-full min-h-[450vh]">
        {/* Sticky Viewport */}
        <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#050505] flex items-center justify-center">
          {/* Transforming Canvas Container with 3D Parallax Transition */}
          <div
            className="relative w-full h-full overflow-hidden transition-all duration-150 ease-out"
            style={{
              transform: `scale(${canvasScale}) translateY(${heroExitProgress * -20}px)`,
              opacity: canvasOpacity,
              filter: `blur(${canvasBlur}px)`,
              borderRadius: `${canvasBorderRadius}px`,
            }}
          >
            {/* 4K Canvas Rendering */}
            <HeroCanvas
              currentFrame={currentFrame}
              images={imagesRef.current}
              isLoaded={loadedCount > 0}
            />

            {/* Continuous Scroll-Interpolated 2-Text Hero Typography with Light Glass Overlay */}
            <ArabicHeroOverlay currentFrame={currentFrame} />
          </div>
        </div>
      </div>

      {/* SECTION 2: Services Section (الخدمات - FullScreenScrollFX + Interactive Grid) */}
      <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />
    </div>
  );
}

export default App;
