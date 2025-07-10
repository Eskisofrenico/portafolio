'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'about', label: 'Estudio' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Scroll effect
    ScrollTrigger.create({
      start: 100,
      end: "bottom bottom",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      }
    });

    // Section tracking
    navItems.forEach(item => {
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: element,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass backdrop-blur-xl bg-obsidian/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-luxury text-2xl font-bold tracking-wider">
            <span className="text-gold-gradient">PORTFOLIO</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative group font-medium tracking-wide transition-all duration-300 magnetic ${
                  activeSection === item.id 
                    ? 'text-gold-primary' 
                    : 'text-platinum hover:text-gold-primary'
                }`}
                data-cursor="pointer"
              >
                {item.label}
                
                {/* Underline effect */}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold-primary transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => scrollToSection('contact')}
            className="hidden md:block btn-luxury magnetic"
            data-cursor="pointer"
          >
            Hablemos
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group magnetic"
            data-cursor="pointer"
          >
            <span className="w-6 h-0.5 bg-gold-primary transition-all duration-300 group-hover:bg-gold-light" />
            <span className="w-6 h-0.5 bg-gold-primary mt-1.5 transition-all duration-300 group-hover:bg-gold-light" />
            <span className="w-6 h-0.5 bg-gold-primary mt-1.5 transition-all duration-300 group-hover:bg-gold-light" />
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gold-primary/30 w-full">
        <div 
          className="h-full bg-gold-primary transition-all duration-100"
          style={{ 
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` 
          }}
        />
      </div>
    </nav>
  );
};

export default Navigation;
