'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
  message: string;
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;

    if (!section || !title || !form) return;

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

    // Form animation
    ScrollTrigger.create({
      trigger: form,
      start: "top 85%",
      onEnter: () => {
        gsap.to(form.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        message: ''
      });
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="mb-24">
        <h2 
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-center mb-8 opacity-0 translate-y-16"
        >
          <span className="text-outline">LET'S</span>
          <br />
          <span className="text-gold-gradient">CONNECT</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="opacity-0 translate-y-8">
            <h3 className="font-luxury text-3xl md:text-4xl font-light text-platinum mb-6">
              Construyamos algo extraordinario juntos
            </h3>
            <p className="text-lg text-platinum/80 leading-relaxed">
              ¿Tienes una visión ambiciosa? Hablemos sobre cómo podemos transformar 
              tu idea en una experiencia digital memorable que supere todas las expectativas.
            </p>
          </div>

          <div className="space-y-8 opacity-0 translate-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-gold-primary/20 rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-gold-primary mb-2">Email</h4>
                <a 
                  href="mailto:hello@creativestudio.com" 
                  className="text-platinum/80 hover:text-gold-primary transition-colors duration-300"
                  data-cursor="pointer"
                >
                  hello@creativestudio.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-gold-primary/20 rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-gold-primary mb-2">Teléfono</h4>
                <a 
                  href="tel:+1234567890" 
                  className="text-platinum/80 hover:text-gold-primary transition-colors duration-300"
                  data-cursor="pointer"
                >
                  +1 (234) 567-8900
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-gold-primary/20 rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-gold-primary mb-2">Ubicación</h4>
                <p className="text-platinum/80">
                  Barcelona, España
                  <br />
                  Disponible globalmente
                </p>
              </div>
            </div>
          </div>

          <div className="opacity-0 translate-y-8">
            <h4 className="font-medium text-gold-primary mb-4 tracking-wide">
              SÍGUENOS
            </h4>
            <div className="flex space-x-6">
              {['Instagram', 'Behance', 'LinkedIn', 'Twitter'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-platinum/60 hover:text-gold-primary transition-colors duration-300 magnetic"
                  data-cursor="pointer"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass rounded-2xl p-8 lg:p-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 translate-y-8">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-platinum/20 py-4 px-2 text-platinum placeholder-transparent focus:border-gold-primary focus:outline-none transition-colors duration-300"
                  placeholder="Tu nombre"
                />
                <label className="absolute left-2 -top-6 text-sm text-platinum/60 transition-all duration-300">
                  Nombre *
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-platinum/20 py-4 px-2 text-platinum placeholder-transparent focus:border-gold-primary focus:outline-none transition-colors duration-300"
                  placeholder="Tu email"
                />
                <label className="absolute left-2 -top-6 text-sm text-platinum/60 transition-all duration-300">
                  Email *
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 translate-y-8">
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-platinum/20 py-4 px-2 text-platinum placeholder-transparent focus:border-gold-primary focus:outline-none transition-colors duration-300"
                  placeholder="Tu empresa"
                />
                <label className="absolute left-2 -top-6 text-sm text-platinum/60 transition-all duration-300">
                  Empresa
                </label>
              </div>

              <div className="relative">
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-platinum/20 py-4 px-2 text-platinum focus:border-gold-primary focus:outline-none transition-colors duration-300"
                >
                  <option value="">Tipo de proyecto</option>
                  <option value="web-design">Diseño Web</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="web-app">Aplicación Web</option>
                  <option value="3d-experience">Experiencia 3D</option>
                  <option value="other">Otro</option>
                </select>
                <label className="absolute left-2 -top-6 text-sm text-platinum/60 transition-all duration-300">
                  Tipo de Proyecto
                </label>
              </div>
            </div>

            <div className="relative opacity-0 translate-y-8">
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-platinum/20 py-4 px-2 text-platinum focus:border-gold-primary focus:outline-none transition-colors duration-300"
              >
                <option value="">Presupuesto estimado</option>
                <option value="10k-25k">€10K - €25K</option>
                <option value="25k-50k">€25K - €50K</option>
                <option value="50k-100k">€50K - €100K</option>
                <option value="100k+">€100K+</option>
              </select>
              <label className="absolute left-2 -top-6 text-sm text-platinum/60 transition-all duration-300">
                Presupuesto
              </label>
            </div>

            <div className="relative opacity-0 translate-y-8">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-transparent border-b border-platinum/20 py-4 px-2 text-platinum placeholder-transparent focus:border-gold-primary focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              />
              <label className="absolute left-2 -top-6 text-sm text-platinum/60 transition-all duration-300">
                Mensaje *
              </label>
            </div>

            <div className="opacity-0 translate-y-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-luxury magnetic transition-all duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                } ${isSuccess ? 'bg-green-600' : ''}`}
                data-cursor="pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : isSuccess ? (
                  '¡Mensaje Enviado!'
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
