import React from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/data/mock';

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen scroll-mt-24 md:scroll-mt-28 flex flex-col justify-center items-center px-6 md:px-12 bg-[#FAF8F5] relative"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-8 opacity-0 animate-fade-in">
          Brand Strategist & Storyteller
        </p>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] leading-[1.15] tracking-tight mb-8 opacity-0 animate-fade-in">
          {siteConfig.tagline}
        </h1>
        {siteConfig.subtitle && (
          <p className="font-lato text-lg md:text-xl text-[#8A7968] max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-delay">
            {siteConfig.subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <button
          onClick={scrollToAbout}
          className="text-[#B8977E] animate-gentle-bounce cursor-pointer hover:text-[#A6856C] transition-colors"
          aria-label="Scroll to about section"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
