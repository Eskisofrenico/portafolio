'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  number: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { number: 150, label: 'Proyectos Completados', suffix: '+' },
  { number: 98, label: 'Satisfacción del Cliente', suffix: '%' },
  { number: 5, label: 'Años de Experiencia', suffix: '+' },
  { number: 25, label: 'Premios Ganados', suffix: '+' }
];

const AnimatedCounter = ({ stat, index }: { stat: Stat; index: number }) => {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const number = numberRef.current;
    if (!number) return;

    ScrollTrigger.create({
      trigger: number,
      start: "top 80%",
      onEnter: () => {
        gsap.to({ count: 0 }, {
          count: stat.number,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.out",
          onUpdate: function() {
            setCount(Math.round(this.targets()[0].count));
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [stat.number, index]);

  return (
    <div className="text-center group">
      <div className="mb-4">
        <span 
          ref={numberRef}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-gold-gradient block"
        >
          {count}
        </span>
        <span className="font-display text-2xl md:text-3xl text-gold-primary">
          {stat.suffix}
        </span>
      </div>
      <p className="font-light text-platinum/80 text-sm md:text-base tracking-wide">
        {stat.label}
      </p>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (!section || !title || !text || !image) return;

    // Title animation
    ScrollTrigger.create({
      trigger: title,
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

    // Text animation
    ScrollTrigger.create({
      trigger: text,
      start: "top 85%",
      onEnter: () => {
        gsap.to(text.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
    });

    // Image parallax
    ScrollTrigger.create({
      trigger: image,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(image, {
          y: -progress * 100
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="mb-24">
        <h2 
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-center mb-8 opacity-0 translate-y-16"
        >
          <span className="text-outline">CREATIVE</span>
          <br />
          <span className="text-gold-gradient">STUDIO</span>
        </h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
        {/* Text Content */}
        <div ref={textRef} className="space-y-8">
          <div className="opacity-0 translate-y-8">
            <h3 className="font-luxury text-3xl md:text-4xl font-light text-platinum mb-6">
              Transformando ideas en experiencias digitales extraordinarias
            </h3>
            <p className="text-lg text-platinum/80 leading-relaxed">
              Somos un estudio boutique especializado en crear experiencias digitales de ultra lujo. 
              Combinamos diseño vanguardista con tecnología de élite para materializar visiones que 
              trascienden lo convencional.
            </p>
          </div>

          <div className="opacity-0 translate-y-8">
            <p className="text-platinum/70 leading-relaxed">
              Nuestro enfoque meticuloso y obsesión por el detalle nos permite entregar productos 
              que no solo cumplen expectativas, sino que redefinen estándares de excelencia en la 
              industria digital.
            </p>
          </div>

          <div className="opacity-0 translate-y-8">
            <h4 className="font-medium text-gold-primary mb-4 tracking-wide">
              ESPECIALIDADES
            </h4>
            <ul className="space-y-2 text-platinum/80">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold-primary rounded-full mr-4"></span>
                Experiencias Web Inmersivas
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold-primary rounded-full mr-4"></span>
                Desarrollo 3D y WebGL
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold-primary rounded-full mr-4"></span>
                Interfaces de Usuario Premium
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gold-primary rounded-full mr-4"></span>
                Animaciones Cinematográficas
              </li>
            </ul>
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="/api/placeholder/600/750"
              alt="Studio workspace"
              fill
              className="object-cover"
            />
            
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            
            {/* Decorative border */}
            <div className="absolute inset-0 border border-gold-primary/20 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {stats.map((stat, index) => (
          <AnimatedCounter key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Awards Section */}
      <div className="text-center space-y-16">
        <h3 className="font-luxury text-3xl md:text-4xl font-light text-platinum">
          Reconocimientos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { year: '2024', award: 'Awwwards Site of the Day', project: 'Luxury E-commerce' },
            { year: '2023', award: 'CSS Design Awards', project: 'Art Gallery Experience' },
            { year: '2023', award: 'FWA of the Day', project: 'Interactive Dashboard' }
          ].map((award, index) => (
            <div key={index} className="text-center space-y-4 group">
              <div className="w-16 h-16 mx-auto border border-gold-primary/30 rounded-full flex items-center justify-center group-hover:border-gold-primary transition-colors duration-300">
                <span className="font-display text-xl font-bold text-gold-primary">
                  {award.year.slice(-2)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gold-primary text-sm tracking-wide">
                  {award.award}
                </h4>
                <p className="text-platinum/60 text-sm">
                  {award.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
