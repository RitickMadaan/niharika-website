import React from 'react';
import { useInView } from '@/hooks/useInView';

const BrandHook = () => {
  const [ref, isInView] = useInView();

  const questions = [
    'Is it the storytelling?',
    'The strategy?',
    'The legacy it creates?',
    'Or the cult following it builds?',
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F0EBE3]">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-12 leading-tight">
          What Makes a Brand Unforgettable?
        </h2>

        <div className="space-y-3 mb-12">
          {questions.map((q, i) => (
            <p
              key={i}
              className={`font-lato text-lg md:text-xl text-[#5A4E42] transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              {q}
            </p>
          ))}
        </div>

        <div className="border-t border-[#D4C5B5] pt-8">
          <p className="font-playfair text-lg md:text-xl text-[#2C2C2C] italic leading-relaxed">
            By the end of this portfolio, you'll have the answer.
          </p>
          <p className="font-lato text-[#B8977E] text-base mt-3">
            And if you don't — we should work together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandHook;
