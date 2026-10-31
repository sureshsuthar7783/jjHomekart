import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check for custom cursor attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const hoverEl = target.closest('[data-cursor]');
        if (hoverEl) {
          const text = hoverEl.getAttribute('data-cursor') || '';
          setCursorText(text);
          setIsHovered(true);
        } else if (target.closest('button, a, input, select, [role="button"]')) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth trailing animation loop
    let animId: number;
    const animateTrail = () => {
      setTrailingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      animId = requestAnimationFrame(animateTrail);
    };
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (isTouch) return null;

  return (
    <>
      {/* Tiny sharp center point */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#8B5A2B] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          opacity: position.x < 0 ? 0 : isHovered ? 0 : 0.8,
        }}
      />

      {/* Outer fluid trailing ring with contextual label */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 ${
          isHovered
            ? cursorText
              ? 'w-20 h-20 bg-[#38210B]/90 text-[#F3ECE1] text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg backdrop-blur-xs'
              : 'w-10 h-10 border-2 border-[#8B5A2B] bg-[#8B5A2B]/10 rounded-full scale-110'
            : 'w-7 h-7 border border-[#8B5A2B]/40 rounded-full'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
          opacity: trailingPos.x < 0 ? 0 : 1,
        }}
      >
        {cursorText && <span className="select-none text-center px-1 leading-tight">{cursorText}</span>}
      </div>
    </>
  );
};
