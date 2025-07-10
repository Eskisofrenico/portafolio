'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });
const Navigation = dynamic(() => import('@/components/layout/Navigation'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), { ssr: false });

// Hooks
import useSmoothScroll from '@/hooks/useSmoothScroll';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Initialize smooth scroll
  useSmoothScroll();

  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      '/api/placeholder/800/600',
      '/api/placeholder/600/750',
    ];

    const imagePromises = preloadImages.map((src) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsReady(true);
    });
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loader */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-gold-primary/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Logo and Description */}
              <div className="md:col-span-2">
                <h3 className="font-luxury text-3xl font-bold text-gold-gradient mb-4">
                  CREATIVE STUDIO
                </h3>
                <p className="text-platinum/70 leading-relaxed max-w-md">
                  Transformamos ideas en experiencias digitales extraordinarias. 
                  Cada proyecto es una oportunidad para superar los límites de la creatividad.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-medium text-gold-primary mb-4 tracking-wide">
                  NAVEGACIÓN
                </h4>
                <ul className="space-y-2">
                  {['Inicio', 'Proyectos', 'Estudio', 'Contacto'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`}
                        className="text-platinum/60 hover:text-gold-primary transition-colors duration-300"
                        data-cursor="pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-medium text-gold-primary mb-4 tracking-wide">
                  SÍGUENOS
                </h4>
                <ul className="space-y-2">
                  {['Instagram', 'Behance', 'LinkedIn', 'Twitter'].map((item) => (
                    <li key={item}>
                      <a 
                        href="#"
                        className="text-platinum/60 hover:text-gold-primary transition-colors duration-300"
                        data-cursor="pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gold-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-platinum/50 text-sm">
                © 2024 Creative Studio. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a 
                  href="#" 
                  className="text-platinum/50 hover:text-gold-primary transition-colors duration-300 text-sm"
                  data-cursor="pointer"
                >
                  Política de Privacidad
                </a>
                <a 
                  href="#" 
                  className="text-platinum/50 hover:text-gold-primary transition-colors duration-300 text-sm"
                  data-cursor="pointer"
                >
                  Términos de Servicio
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
