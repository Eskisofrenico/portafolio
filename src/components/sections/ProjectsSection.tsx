'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 'luxury-ecommerce',
    title: 'Luxury E-commerce Platform',
    category: 'E-commerce / UX Design',
    description: 'Plataforma de comercio electrónico premium con experiencia de compra inmersiva y checkout simplificado.',
    image: '/api/placeholder/800/600',
    year: '2024',
    technologies: ['Next.js', 'Three.js', 'Stripe', 'Framer Motion']
  },
  {
    id: 'finance-dashboard',
    title: 'Financial Dashboard',
    category: 'Dashboard / Data Visualization',
    description: 'Dashboard intuitivo para análisis financiero con visualizaciones en tiempo real y métricas avanzadas.',
    image: '/api/placeholder/800/600',
    year: '2024',
    technologies: ['React', 'D3.js', 'WebGL', 'Node.js']
  },
  {
    id: 'art-gallery',
    title: 'Interactive Art Gallery',
    category: 'WebGL / Creative Coding',
    description: 'Galería de arte virtual con experiencias 3D inmersivas y navegación espacial innovadora.',
    image: '/api/placeholder/800/600',
    year: '2023',
    technologies: ['Three.js', 'GSAP', 'WebGL', 'Blender']
  },
  {
    id: 'real-estate',
    title: 'Premium Real Estate',
    category: 'Real Estate / Virtual Tours',
    description: 'Plataforma inmobiliaria de lujo con tours virtuales 360° y configurador de propiedades.',
    image: '/api/placeholder/800/600',
    year: '2023',
    technologies: ['React', 'Three.js', 'Mapbox', 'Firebase']
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const number = numberRef.current;

    if (!card || !image || !number) return;

    // Entrance animation
    gsap.set(card, { opacity: 0, y: 100 });
    gsap.set(number, { opacity: 0, scale: 0.5 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        });
        gsap.to(number, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.7)"
        });
      }
    });

    // Parallax effect
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(image, {
          y: -progress * 50
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-32 ${
        index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
      }`}
    >
      {/* Project Number */}
      <div 
        ref={numberRef}
        className="absolute -top-16 -left-8 lg:-left-16 z-10"
      >
        <span className="font-display text-[8rem] lg:text-[12rem] font-black text-charcoal-light leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Project Image */}
      <div 
        ref={imageRef}
        className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}
      >
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            data-cursor="view"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Golden pattern overlay */}
          <div className="absolute inset-0 bg-gold-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}
          />
        </div>
      </div>

      {/* Project Info */}
      <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="space-y-2">
          <p className="font-mono text-sm tracking-[0.3em] text-gold-primary uppercase">
            {project.category}
          </p>
          <h3 className="font-luxury text-4xl lg:text-5xl font-light text-platinum">
            {project.title}
          </h3>
        </div>

        <p className="text-lg text-platinum/80 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-4 py-2 bg-charcoal-light border border-gold-primary/20 rounded-full text-sm text-platinum/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="font-mono text-sm text-gold-primary">
            {project.year}
          </span>
          
          <button 
            className="group flex items-center space-x-2 text-platinum hover:text-gold-primary transition-colors duration-300 magnetic"
            data-cursor="pointer"
          >
            <span className="font-medium">Ver Proyecto</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <h2 
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-center mb-8 opacity-0 translate-y-16"
        >
          <span className="text-outline">SELECTED</span>
          <br />
          <span className="text-gold-gradient">WORKS</span>
        </h2>
      </div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View All Projects Button */}
      <div className="text-center mt-24">
        <button 
          className="btn-luxury magnetic"
          data-cursor="pointer"
        >
          Ver Todos los Proyectos
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
