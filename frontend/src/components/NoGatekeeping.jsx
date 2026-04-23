import React from 'react';
import { marketingInsights } from '@/data/mock';
import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';

const InsightCard = ({ insight, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`border border-[#E0D8CE] rounded-lg p-6 md:p-8 bg-white/60 hover:bg-white hover:shadow-sm transition-all duration-500 group ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="mb-5">
        <Badge
          variant="outline"
          className="text-[10px] tracking-[0.15em] uppercase text-[#B8977E] border-[#D4C5B5] font-lato font-normal"
        >
          {insight.category}
        </Badge>
      </div>

      <h3 className="font-playfair text-lg md:text-xl text-[#2C2C2C] mb-4 leading-snug">
        {insight.title}
      </h3>

      <p className="font-lato text-[#5A4E42] leading-[1.7] text-sm mb-6">
        {insight.excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {insight.tags.map((tag) => (
          <span
            key={tag}
            className="font-lato text-[10px] tracking-[0.1em] uppercase text-[#8A7968] bg-[#F0EBE3] px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const NoGatekeeping = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      id="insights"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#FAF8F5]"
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          No Gatekeeping Marketing
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-4 leading-tight">
          What I'm learning in public
        </h2>
        <p className="font-lato text-[#8A7968] text-base md:text-lg max-w-2xl mb-14 leading-relaxed">
          Frameworks, observations, and the occasional unpopular opinion.
          Because the best ideas grow when they're shared.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {marketingInsights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoGatekeeping;
