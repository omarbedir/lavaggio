import React, { useState, useEffect, useRef } from 'react';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';

interface NavbarProps {
  onNavigateToSection?: (sectionId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  targetId: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToSection
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const lastScrollYRef = useRef(0);

  const navItems: NavItem[] = [
    { id: 'hero', label: 'الرئيسية', targetId: 'hero' },
    { id: 'services', label: 'الخدمات', targetId: 'services' },
  ];

  // Smart Auto-Hide on Scroll Down & Reveal on Scroll Up + Active Section Tracker
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollYRef.current;

          // Auto-hide logic: stay visible near top or when scrolling up
          if (currentScrollY <= 40) {
            setIsVisible(true);
          } else if (delta > 6 && currentScrollY > 100) {
            setIsVisible(false);
          } else if (delta < -6) {
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;

          // Accurate active section tracking based on hero height
          const heroEl = document.getElementById('hero');
          if (heroEl) {
            const heroHeight = heroEl.offsetHeight;
            if (currentScrollY >= heroHeight * 0.7) {
              setActiveSection('services');
            } else {
              setActiveSection('hero');
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (targetId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(targetId);
    } else {
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetId === 'services') {
        const heroEl = document.getElementById('hero');
        const targetY = heroEl ? heroEl.offsetHeight : 0;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-5 sm:top-7 left-0 right-0 z-50 flex items-center justify-center font-yamama px-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      {/* Pure Centered Text Navigation with RandomLetterSwap Spring Animation */}
      <nav className="relative flex items-center justify-center gap-7 sm:gap-10 md:gap-14 px-6 py-2 select-none">
        {navItems.map((item) => {
          const isActive = activeSection === item.targetId;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <RandomLetterSwap
                label={item.label}
                onClick={() => handleItemClick(item.targetId)}
                staggerDuration={0.03}
                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 22 }}
                className={`text-base sm:text-lg md:text-xl font-bold tracking-normal transition-all duration-300 ${
                  isActive
                    ? 'text-[#F5D033] drop-shadow-[0_0_14px_rgba(245,208,51,0.7)] scale-105'
                    : 'text-zinc-400 hover:text-white'
                }`}
              />

              {/* Golden Laser Underline for active section */}
              {isActive && (
                <span className="absolute -bottom-2 w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#F5D033] to-transparent rounded-full shadow-[0_0_12px_rgba(245,208,51,0.9)] animate-pulse" />
              )}
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;
