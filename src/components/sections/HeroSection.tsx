'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import { Mesh } from 'three';

gsap.registerPlugin(ScrollTrigger);

const GoldenSphere = () => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    
    gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={[2, 2, 2]}>
        <MeshDistortMaterial
          color="#D4AF37"
          attach="material"
          distort={0.3}
          speed={1.5}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !subtitle || !cta) return;

    // Create timeline
    const tl = gsap.timeline();

    // Animate title letters
    const titleText = title.textContent || '';
    title.innerHTML = '';
    
    titleText.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100px) rotateX(-90deg)';
      title.appendChild(span);
    });

    // Animate elements
    tl.to(title.children, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.5
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.3")
    .to(cta, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Parallax effect
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(section, {
          y: -progress * 100
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: projectsSection,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <GoldenSphere />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="font-display text-[8rem] md:text-[12rem] lg:text-[16rem] font-black leading-none tracking-tight mb-8"
        >
          <span className="text-outline">CREATIVE</span>
          <br />
          <span className="text-gold-gradient">STUDIO</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="font-luxury text-2xl md:text-3xl lg:text-4xl font-light text-platinum/80 mb-12 max-w-4xl mx-auto leading-relaxed opacity-0 translate-y-8"
        >
          Experiencias digitales de lujo que transforman ideas en arte interactivo
        </p>

        {/* CTA Button */}
        <button 
          ref={ctaRef}
          onClick={scrollToProjects}
          className="btn-luxury magnetic opacity-0 translate-y-8 scale-90"
          data-cursor="pointer"
        >
          Descubrir Trabajo
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-primary to-transparent opacity-50" />
      <div className="absolute bottom-1/4 right-10 w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-primary to-transparent opacity-50" />
      
      {/* Floating particles */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-gold-primary rounded-full animate-pulse" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-gold-primary rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gold-primary rounded-full animate-pulse delay-2000" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-primary to-transparent mb-4" />
        <span className="font-mono text-xs tracking-[0.3em] text-platinum/60 rotate-90 origin-center">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
