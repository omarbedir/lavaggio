import React, { useEffect, useRef, useCallback } from 'react';

interface HeroCanvasProps {
  currentFrame: number;
  images: HTMLImageElement[];
  isLoaded: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  currentFrame,
  images,
  isLoaded
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetFrameRef = useRef<number>(currentFrame);
  const renderedFrameRef = useRef<number>(currentFrame);
  const animFrameIdRef = useRef<number | null>(null);

  // Sync target frame with currentFrame prop
  useEffect(() => {
    targetFrameRef.current = currentFrame;
  }, [currentFrame]);

  // Draw frame with full-bleed cover mode at maximum resolution & quality
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      if (!ctx) return;

      const total = images.length;
      if (total === 0) return;

      const validIndex = Math.max(1, Math.min(total, Math.round(frameIndex)));
      let img = images[validIndex - 1];

      // If requested frame is still buffering, locate the nearest ready frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 40; offset++) {
          const prev = images[validIndex - 1 - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[validIndex - 1 + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      // Full-cover mode: Video takes up 100% of the screen with zero black bars
      const scale = Math.max(cw / nw, ch / nh);
      const drawWidth = Math.ceil(nw * scale);
      const drawHeight = Math.ceil(nh * scale);
      const dx = Math.floor((cw - drawWidth) / 2);
      const dy = Math.floor((ch - drawHeight) / 2);

      // Set highest image rendering quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw frame to fill entire screen
      ctx.drawImage(img, 0, 0, nw, nh, dx, dy, drawWidth, drawHeight);
    },
    [images]
  );

  // Resize handler targeting native device pixel density
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use full devicePixelRatio for maximum sharpness on all displays
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();

    const newWidth = Math.round(rect.width * dpr);
    const newHeight = Math.round(rect.height * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
    }

    drawFrame(renderedFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Smooth lerping animation loop for 60-120fps video playback
  useEffect(() => {
    if (!isLoaded) return;

    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = renderedFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.005) {
        renderedFrameRef.current += delta * 0.28;
        drawFrame(renderedFrameRef.current);
      } else if (renderedFrameRef.current !== target) {
        renderedFrameRef.current = target;
        drawFrame(target);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isLoaded, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover block"
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
};
