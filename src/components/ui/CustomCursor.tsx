'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface CursorProps {
  isHovering?: boolean;
  cursorType?: 'default' | 'pointer' | 'text' | 'view';
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<CursorProps['cursorType']>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        setCursorType('pointer');
      } else if (target.matches('[data-cursor="view"]')) {
        setIsHovering(true);
        setCursorType('view');
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setIsHovering(true);
        setCursorType('text');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('default');
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className={`w-full h-full rounded-full border transition-all duration-300 ${
          isHovering 
            ? 'border-2 border-gold-primary bg-transparent' 
            : 'border border-gold-primary/50 bg-gold-primary/20'
        }`}>
          {cursorType === 'view' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gold-primary">VIEW</span>
            </div>
          )}
        </div>
      </div>

      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gold-primary rounded-full pointer-events-none z-[9999] transition-opacity duration-300"
        style={{ 
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;
