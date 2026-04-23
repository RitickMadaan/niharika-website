import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { thinkingPieces } from '@/data/mock';
import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';

const ThinkingCard = ({ piece }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border border-[#E0D8CE] rounded-lg p-6 md:p-8 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] hover:shadow-sm transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <Badge
          variant="outline"
          className="text-[10px] tracking-[0.15em] uppercase text-[#B8977E] border-[#D4C5B5] font-lato font-normal"
        >
          {piece.category}
        </Badge>
        <button className="text-[#8A7968] hover:text-[#B8977E] transition-colors shrink-0">
          {expanded ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>

      <h3 className="font-playfair text-xl md:text-2xl text-[#2C2C2C] mb-3 leading-snug">
        {piece.title}
      </h3>

      <p className="font-lato text-[#5A4E42] leading-relaxed text-sm">
        {piece.excerpt}
      </p>

      {expanded && (
        <div className="mt-6 pt-6 border-t border-[#E0D8CE]">
          <p className="font-lato text-[#5A4E42] leading-[1.8] text-sm">
            {piece.fullText}
          </p>
        </div>
      )}
    </div>
  );
};

const HowIThink = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="thinking" className="py-24 md:py-32 px-6 md:px-12 bg-[#FAF8F5]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          How I Think
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-4 leading-tight">
          A strategist's journal
        </h2>
        <p className="font-lato text-[#8A7968] text-base md:text-lg max-w-2xl mb-14 leading-relaxed">
          Short reflections on brands, culture, travel, and the quiet patterns
          behind good marketing.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {thinkingPieces.map((piece) => (
            <ThinkingCard key={piece.id} piece={piece} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIThink;
