import React from 'react';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

const CHAOS_IMAGE =
  'https://customer-assets.emergentagent.com/job_niharika-stories/artifacts/z94ky97x_Screenshot%202026-04-14%20at%201.10.41%E2%80%AFPM.png';

const ChaosToClarity = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F0EBE3] overflow-hidden">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Chaos side */}
          <div className="relative">
            <div className="w-full max-w-md mx-auto relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-[#E4D9CC]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#D8CCBF] shadow-[0_10px_35px_rgba(44,44,44,0.08)]">
                <img
                  src={CHAOS_IMAGE}
                  alt="Storytelling chaos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Clarity side */}
          <div className="text-center md:text-left">
            <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
              From Chaos to Clarity
            </p>
            <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-[#2C2C2C] mb-6 leading-tight">
              This is what happens when strategy meets storytelling.
            </h3>
            <p className="font-lato text-[#5A4E42] leading-[1.8] text-base mb-8">
              I take the tangle of ideas, insights, and intentions — and weave
              them into a narrative your audience actually wants to follow.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-[1px] bg-[#B8977E] w-12" />
              <ArrowRight size={18} className="text-[#B8977E]" />
              <span className="font-playfair text-[#B8977E] italic text-lg">
                clarity
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChaosToClarity;
