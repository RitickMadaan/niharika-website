import React from 'react';
import { aboutData } from '@/data/mock';
import { useInView } from '@/hooks/useInView';

const originParagraphs = [
  "At 14, I mailed a story to The Sunday Times. Didn't expect much. Maybe a polite rejection. But then—boom. It got published. Plot twist.",
  "That's when I realized—words have power. They make people feel things. They make people remember you. Or at the very least, they make your mom flex in the family WhatsApp group.",
  "And that one tiny moment? It sent me on a wild ride. From newsrooms to studios to digital campaigns. Somewhere along the way, I figured out one solid truth: brands work like stories. The unforgettable ones? They live rent-free in your mind.",
  "That's the magic I chase—I find the plot twist that makes people care.",
];

const About = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      id="about"
      className="scroll-mt-24 md:scroll-mt-28 py-24 md:py-32 px-6 md:px-12 bg-[#F0EBE3]"
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          About
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-16 leading-tight max-w-4xl">
          {aboutData.intro}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
          <div className="space-y-6">
            {aboutData.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-lato text-[#5A4E42] leading-[1.8] text-base"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <blockquote className="border-l-2 border-[#B8977E] pl-8 py-4 mb-10">
              <p className="font-playfair text-2xl md:text-3xl text-[#2C2C2C] italic leading-snug">
                "{aboutData.belief}"
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-3">
              {aboutData.specialties.map((s) => (
                <span
                  key={s}
                  className="font-lato text-[11px] tracking-[0.15em] uppercase px-4 py-2 border border-[#C4B5A5] text-[#8A7968] rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Origin Story */}
        <div className="border-t border-[#D4C5B5]/50 pt-20">
          <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
            The Origin Story
          </p>
          <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-[#2C2C2C] mb-10 leading-tight">
            Why I Do What I Do
          </h3>

          <div className="space-y-6 max-w-3xl">
            {originParagraphs.map((p, i) => (
              <p
                key={i}
                className="font-lato text-[#5A4E42] leading-[1.9] text-base md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
