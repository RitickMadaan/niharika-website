import React from 'react';
import { useInView } from '@/hooks/useInView';

const paragraphs = [
  "At 14, I mailed a story to The Sunday Times. Didn't expect much. Maybe a polite rejection. But then—boom. It got published. Plot twist.",
  "That's when I realized—words have power. They make people feel things. They make people remember you. Or at the very least, they make your mom flex in the family WhatsApp group.",
  "And that one tiny moment? It sent me on a wild ride. From newsrooms to studios to digital campaigns. Somewhere along the way, I figured out one solid truth: brands work like stories. The unforgettable ones? They live rent-free in your mind.",
  "That's the magic I chase—I find the plot twist that makes people care.",
  "And if you're still reading this? Well... we might just be onto something.",
];

const WhyIDoThis = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FAF8F5]">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          The Origin Story
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-12 leading-tight">
          Why I Do What I Do
        </h2>

        <div className="space-y-6 max-w-3xl">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`font-lato text-[#5A4E42] leading-[1.9] text-base md:text-lg transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyIDoThis;
