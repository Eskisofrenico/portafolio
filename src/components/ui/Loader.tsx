'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    const text = textRef.current;
    const progressBar = progressRef.current;
    
    if (!loader || !text || !progressBar) return;

    // Animate progress
    const progressTween = gsap.to({}, {
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        const newProgress = Math.round(this.progress() * 100);
        setProgress(newProgress);
        gsap.set(progressBar, { width: `${newProgress}%` });
      }
    });

    // Animate text reveal
    const letters = text.textContent?.split('') || [];
    text.innerHTML = '';
    
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(50px) rotateX(-90deg)';
      text.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      });
    });

    // Exit animation
    gsap.delayedCall(3.5, () => {
      gsap.to(text, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      });
      
      gsap.to(progressBar, {
        scaleX: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      
      gsap.to(loader, {
        y: '-100%',
        duration: 1.2,
        delay: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        }
      });
    });

    return () => {
      progressTween.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 bg-obsidian z-[9999] flex flex-col items-center justify-center"
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Main Text */}
      <div 
        ref={textRef}
        className="font-luxury text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.2em] text-gold-gradient mb-16"
      >
        PORTFOLIO
      </div>

      {/* Progress Container */}
      <div className="w-64 md:w-96 h-[1px] bg-charcoal-light relative overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-gold-primary to-gold-light origin-left"
          style={{ width: '0%' }}
        />
      </div>

      {/* Progress Text */}
      <div className="mt-8 font-mono text-sm tracking-[0.3em] text-platinum/70">
        {progress}%
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-primary animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gold-primary animate-pulse delay-500" />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gold-primary animate-pulse delay-1000" />
    </div>
  );
};

export default Loader;
