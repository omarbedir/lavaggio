import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  badge?: string;
  rightLabel?: ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

export type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

export type Durations = Partial<{
  change: number; // section change animation speed (s)
  snap: number;   // programmatic snap scroll duration (ms)
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;

  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;

  showProgress?: boolean;
  debug?: boolean;

  durations?: Durations;
  reduceMotion?: boolean;

  parallaxAmount?: number;

  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;

  colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,

      fontFamily = '"Alyamama Variable"',
      header,
      footer,

      showProgress = false,
      debug = false,

      // Fast, snappy, cinematic timings
      durations = { change: 0.35, snap: 500 },
      reduceMotion = false,
      parallaxAmount = 3,

      currentIndex,
      onIndexChange,
      initialIndex = 0,

      colors = {
        text: "#ffffff",
        overlay: "rgba(0,0,0,0.3)",
        pageBg: "#050505",
        stageBg: "#050505",
      },

      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);
    const portalContainerRef = useRef<HTMLDivElement | null>(null);

    const bgRefs = useRef<HTMLDivElement[]>([]);
    const centerRefs = useRef<HTMLDivElement[]>([]);

    const leftTrackRef = useRef<HTMLDivElement | null>(null);
    const rightTrackRef = useRef<HTMLDivElement | null>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isSnappingRef = useRef(false);
    const rowHeightRef = useRef(46);

    // Fast Hardware-Accelerated Side List Centering with GSAP Spring
    const centerSideTracks = useCallback((toIndex: number, animate = true) => {
      const rowH = rowHeightRef.current;
      const targetY = -(toIndex * rowH) + (rowH * 2);
      const D = durations.change ?? 0.35;

      if (leftTrackRef.current) {
        if (animate) {
          gsap.to(leftTrackRef.current, {
            y: targetY,
            duration: D,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.set(leftTrackRef.current, { y: targetY });
        }
      }

      if (rightTrackRef.current) {
        if (animate) {
          gsap.to(rightTrackRef.current, {
            y: targetY,
            duration: D,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.set(rightTrackRef.current, { y: targetY });
        }
      }
    }, [durations.change]);

    // Fast, Snappy Cinematic Transition between services
    const changeSection = useCallback(
      (to: number) => {
        if (to === lastIndexRef.current) return;
        const from = lastIndexRef.current;
        const down = to > from;
        lastIndexRef.current = to;

        if (!isControlled) {
          setLocalIndex(to);
        }
        onIndexChange?.(to);

        const D = durations.change ?? 0.35;

        // 1. Snappy Kinetic Center Text Animation (Exit & Entrance)
        const prevCenter = centerRefs.current[from];
        const nextCenter = centerRefs.current[to];

        if (prevCenter) {
          gsap.killTweensOf(prevCenter);
          gsap.to(prevCenter, {
            opacity: 0,
            y: down ? -30 : 30,
            scale: 0.96,
            duration: D * 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              if (prevCenter) prevCenter.style.visibility = "hidden";
            },
          });
        }

        if (nextCenter) {
          gsap.killTweensOf(nextCenter);
          nextCenter.style.visibility = "visible";
          gsap.fromTo(
            nextCenter,
            {
              opacity: 0,
              y: down ? 30 : -30,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: D,
              ease: "power3.out",
            }
          );
        }

        // 2. Fast Cinematic Background Cross-Fade with Parallax
        const prevBg = bgRefs.current[from];
        const nextBg = bgRefs.current[to];

        if (nextBg) {
          gsap.killTweensOf(nextBg);
          gsap.fromTo(
            nextBg,
            {
              opacity: 0,
              scale: 1.04,
              yPercent: down ? 1.5 : -1.5,
            },
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              duration: D * 1.1,
              ease: "power2.out",
            }
          );
        }

        if (prevBg) {
          gsap.killTweensOf(prevBg);
          gsap.to(prevBg, {
            opacity: 0,
            yPercent: down ? -parallaxAmount : parallaxAmount,
            duration: D * 0.9,
            ease: "power2.out",
          });
        }

        // 3. Side List Tracks Movement & Active State
        centerSideTracks(to, true);

        leftItemRefs.current.forEach((el, i) => {
          if (el) {
            el.classList.toggle("active", i === to);
            gsap.to(el, {
              opacity: i === to ? 1 : 0.35,
              duration: D * 0.8,
              ease: "power2.out",
            });
          }
        });

        rightItemRefs.current.forEach((el, i) => {
          if (el) {
            el.classList.toggle("active", i === to);
            gsap.to(el, {
              opacity: i === to ? 1 : 0.35,
              duration: D * 0.8,
              ease: "power2.out",
            });
          }
        });
      },
      [centerSideTracks, durations.change, isControlled, onIndexChange, parallaxAmount]
    );

    // Initial Setup & ScrollTrigger Pinning with Entrance/Exit 3D Portal Morphing
    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      const portal = portalContainerRef.current;
      if (!fixed || !fs || total === 0) return;

      // Measure row height
      if (leftItemRefs.current[0]) {
        rowHeightRef.current = leftItemRefs.current[0].offsetHeight || 46;
      }

      // Initial center states
      centerRefs.current.forEach((el, i) => {
        if (el) {
          if (i === index) {
            gsap.set(el, { opacity: 1, y: 0, scale: 1 });
            el.style.visibility = "visible";
          } else {
            gsap.set(el, { opacity: 0, y: 30, scale: 0.96 });
            el.style.visibility = "hidden";
          }
        }
      });

      // Initial bg states
      bgRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, {
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.04,
            yPercent: 0,
          });
        }
      });

      centerSideTracks(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
          const prog = self.progress;

          // 3D Portal Entrance & Exit Transformations (Smooth GPU Morph)
          if (portal) {
            let scale = 1;
            let radius = 0;
            let translateY = 0;
            let opacity = 1;
            let filter = "none";

            // Entrance phase (first 8% of track)
            if (prog < 0.08) {
              const entNorm = prog / 0.08; // 0 to 1
              scale = 0.92 + entNorm * 0.08;
              radius = (1 - entNorm) * 28;
              translateY = (1 - entNorm) * 20;
              opacity = 0.7 + entNorm * 0.3;
            }
            // Exit phase (last 8% of track)
            else if (prog > 0.92) {
              const exitNorm = (prog - 0.92) / 0.08; // 0 to 1
              scale = 1 - exitNorm * 0.08;
              radius = exitNorm * 28;
              translateY = -exitNorm * 25;
              opacity = 1 - exitNorm * 0.3;
              filter = `blur(${exitNorm * 4}px)`;
            }

            portal.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            portal.style.borderRadius = `${radius}px`;
            portal.style.opacity = `${opacity}`;
            portal.style.filter = filter;
          }

          if (reduceMotion || isSnappingRef.current) return;
          const target = clamp(Math.floor(prog * total), 0, total - 1);
          if (target !== lastIndexRef.current) {
            changeSection(target);
          }
        },
      });

      stRef.current = st;

      return () => {
        st.kill();
        stRef.current = null;
      };
    }, [total, reduceMotion, changeSection, index, centerSideTracks]);

    // Fast Programmatic Click Jump
    const goTo = useCallback(
      (to: number, withScroll = true) => {
        const clamped = clamp(to, 0, total - 1);
        changeSection(clamped);

        if (withScroll && typeof window !== "undefined" && stRef.current) {
          isSnappingRef.current = true;
          const start = stRef.current.start;
          const end = stRef.current.end;
          const targetPos = start + ((end - start) * (clamped + 0.1)) / total;

          window.scrollTo({ top: targetPos, behavior: "smooth" });
          setTimeout(() => {
            isSnappingRef.current = false;
          }, durations.snap ?? 500);
        }
      },
      [changeSection, total, durations.snap]
    );

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    const cssVars: CSSProperties = {
      ["--fx-font" as any]: fontFamily,
      ["--fx-text" as any]: colors.text ?? "#ffffff",
      ["--fx-overlay" as any]: colors.overlay ?? "rgba(0,0,0,0.3)",
      ["--fx-page-bg" as any]: colors.pageBg ?? "#050505",
      ["--fx-stage-bg" as any]: colors.stageBg ?? "#050505",
    };

    return (
      <div
        ref={(node) => {
          (rootRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        {debug && <div className="fx-debug">Section: {index}</div>}

        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              {/* Outer Ambient Golden Portal Glow Aura */}
              <div className="fx-ambient-glow" aria-hidden="true" />

              {/* 3D Portal Morph Container (Handles Entrance & Exit Animation) */}
              <div
                ref={portalContainerRef}
                className="fx-portal-container"
              >
                {/* Top Golden Laser Energy Line */}
                <div className="fx-laser-line-top" />

                {/* Backgrounds (Fast Cinematic Hardware Accelerated Layers) */}
                <div className="fx-bgs" aria-hidden="true">
                  {sections.map((s, i) => (
                    <div
                      className="fx-bg"
                      key={s.id ?? i}
                      ref={(el) => el && (bgRefs.current[i] = el)}
                    >
                      {s.renderBackground ? (
                        s.renderBackground(index === i, lastIndexRef.current === i)
                      ) : (
                        <>
                          <img
                            src={s.background}
                            alt=""
                            className="fx-bg-img"
                            loading="eager"
                            decoding="async"
                          />
                          <div className="fx-bg-overlay" />
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Main Container Layout */}
                <div className="fx-container">
                  {/* Header (Top) */}
                  {header && <div className="fx-header">{header}</div>}

                  {/* Main Content Body */}
                  <div className="fx-body">
                    {/* Left List Track */}
                    <div className="fx-left-col" role="list">
                      <div className="fx-track" ref={leftTrackRef}>
                        {sections.map((s, i) => (
                          <div
                            key={`L-${s.id ?? i}`}
                            className={`fx-item fx-left-item ${i === index ? "active" : ""}`}
                            ref={(el) => el && (leftItemRefs.current[i] = el)}
                            onClick={() => goTo(i, true)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={i === index}
                          >
                            <span className="fx-item-text">{s.leftLabel}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Centered Service Presentation (Dynamic Kinetic GSAP Spring Animation) */}
                    <div className="fx-center-col">
                      {sections.map((s, sIdx) => (
                        <div
                          key={`C-${s.id ?? sIdx}`}
                          ref={(el) => el && (centerRefs.current[sIdx] = el)}
                          className="fx-featured-card"
                        >
                          <h3 className="fx-title">
                            {s.title}
                          </h3>

                          {s.subtitle && (
                            <p className="fx-subtitle">
                              {s.subtitle}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right List Track */}
                    <div className="fx-right-col" role="list">
                      <div className="fx-track" ref={rightTrackRef}>
                        {sections.map((s, i) => (
                          <div
                            key={`R-${s.id ?? i}`}
                            className={`fx-item fx-right-item ${i === index ? "active" : ""}`}
                            ref={(el) => el && (rightItemRefs.current[i] = el)}
                            onClick={() => goTo(i, true)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={i === index}
                          >
                            <span className="fx-item-text">{s.rightLabel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Optional Footer */}
                  {(footer || showProgress) && (
                    <div className="fx-footer">
                      {footer && <div className="fx-footer-title">{footer}</div>}
                    </div>
                  )}
                </div>

                {/* Bottom Golden Laser Energy Line */}
                <div className="fx-laser-line-bottom" />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: #fff;
            font-family: var(--fx-font);
            letter-spacing: -0.01em;
          }

          .fx-debug {
            position: fixed; bottom: 10px; right: 10px; z-index: 9999;
            background: rgba(0,0,0,0.8); color: #F5D033; padding: 6px 8px; font: 12px/1 monospace; border-radius: 4px;
          }

          .fx-fixed-section { height: ${Math.max(1, total + 1)}00vh; position: relative; }
          .fx-fixed {
            position: sticky;
            top: 0;
            height: 100vh;
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Ambient Glow Background for Portal Effect */
          .fx-ambient-glow {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 50%, rgba(245, 208, 51, 0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }

          /* 3D Portal Container for entrance/exit morphing */
          .fx-portal-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #050505;
            box-shadow: 0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(245, 208, 51, 0.12);
            will-change: transform, border-radius, opacity, filter;
            transition: transform 0.1s ease-out, border-radius 0.1s ease-out;
            z-index: 1;
          }

          /* Laser Energy Accent Lines at Boundaries */
          .fx-laser-line-top, .fx-laser-line-bottom {
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(245, 208, 51, 0.9) 50%, transparent 100%);
            box-shadow: 0 0 15px rgba(245, 208, 51, 0.9);
            z-index: 20;
            pointer-events: none;
          }
          .fx-laser-line-top { top: 0; }
          .fx-laser-line-bottom { bottom: 0; }

          /* Background GPU Compositing */
          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg {
            position: absolute;
            inset: 0;
            opacity: 0;
            will-change: transform, opacity;
            backface-visibility: hidden;
            pointer-events: none;
          }
          .fx-bg-img {
            position: absolute; inset: -2% 0 -2% 0;
            width: 100%; height: 104%; object-fit: cover;
            filter: brightness(0.92) contrast(1.06) saturate(1.15);
            transform: translate3d(0, 0, 0);
          }
          .fx-bg-overlay {
            position: absolute; inset: 0;
            background: radial-gradient(ellipse at center, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.6) 100%), linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 18%, transparent 82%, rgba(5,5,5,0.8) 100%);
          }

          /* Container layout */
          .fx-container {
            position: relative;
            z-index: 5;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 5rem 2rem 2rem;
            box-sizing: border-box;
          }

          .fx-header {
            width: 100%;
            text-align: center;
            flex-shrink: 0;
          }

          .fx-body {
            width: 100%;
            max-width: 1350px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 1;
            position: relative;
          }

          /* Side indicator columns */
          .fx-left-col, .fx-right-col {
            width: 250px;
            height: 240px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-shrink: 0;
            padding: 0 12px;
            box-sizing: border-box;
            mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
          }
          .fx-left-col { align-items: flex-start; text-align: right; }
          .fx-right-col { align-items: flex-end; text-align: left; }
          
          .fx-track {
            will-change: transform;
            width: 100%;
            overflow: visible;
            transform: translate3d(0, 0, 0);
          }

          .fx-item {
            color: rgba(245,245,247,0.6);
            font-weight: 700;
            line-height: 1.3;
            height: 46px;
            display: flex;
            align-items: center;
            opacity: 0.35;
            transition: color 0.25s ease;
            position: relative;
            font-size: clamp(0.95rem, 1.4vw, 1.25rem);
            user-select: none;
            cursor: pointer;
            white-space: nowrap;
          }
          .fx-left-item { justify-content: flex-start; }
          .fx-right-item { justify-content: flex-end; }

          .fx-item-text {
            display: inline-block;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .fx-left-item.active, .fx-right-item.active {
            opacity: 1;
            color: #F5D033;
          }
          .fx-left-item.active .fx-item-text {
            transform: scale(1.08);
            padding-left: 16px;
          }
          .fx-right-item.active .fx-item-text {
            transform: scale(1.08);
            padding-right: 16px;
          }

          .fx-left-item.active::before,
          .fx-right-item.active::after {
            content: "";
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 7px; height: 7px; background: #F5D033; border-radius: 50%;
            box-shadow: 0 0 12px rgba(245, 208, 51, 1);
          }
          .fx-left-item.active::before { left: 0; }
          .fx-right-item.active::after { right: 0; }

          /* Center Service Content */
          .fx-center-col {
            flex: 1;
            max-width: 780px;
            height: 260px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 1.5rem;
          }

          .fx-featured-card {
            position: absolute;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 1rem;
            box-sizing: border-box;
            will-change: transform, opacity;
            backface-visibility: hidden;
            pointer-events: none;
          }

          .fx-title {
            margin: 0 0 12px 0;
            color: #ffffff;
            font-weight: 900;
            font-size: clamp(2rem, 4vw, 3.8rem);
            line-height: 1.18;
            white-space: normal;
            word-break: keep-all;
            text-shadow: 0 10px 40px rgba(0,0,0,0.95), 0 0 25px rgba(245, 208, 51, 0.25);
          }

          .fx-subtitle {
            margin: 0;
            color: rgba(245, 245, 247, 0.95);
            font-size: clamp(0.95rem, 1.4vw, 1.3rem);
            max-width: 620px;
            line-height: 1.65;
            font-weight: 500;
            white-space: normal;
            text-shadow: 0 6px 20px rgba(0,0,0,0.95);
          }

          /* Footer */
          .fx-footer {
            width: 100%;
            text-align: center;
            flex-shrink: 0;
            padding-bottom: 0.5rem;
          }
          .fx-footer-title { color: var(--fx-text); font-size: clamp(0.85rem, 1.5vw, 1.1rem); font-weight: 600; }

          @media (max-width: 900px) {
            .fx-body {
              flex-direction: column;
              justify-content: center;
              gap: 1.5rem;
            }
            .fx-left-col, .fx-right-col {
              height: auto;
              width: 100%;
              align-items: center;
              text-align: center;
              mask-image: none;
              -webkit-mask-image: none;
            }
            .fx-center-col {
              height: auto;
              margin: 1rem 0;
            }
            .fx-featured-card {
              position: relative;
            }
            .fx-track { transform: none !important; }
          }
        `}</style>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";

export default FullScreenScrollFX;
