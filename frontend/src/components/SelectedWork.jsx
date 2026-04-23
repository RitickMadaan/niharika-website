import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { selectedProjects } from '@/data/mock';
import { useInView } from '@/hooks/useInView';

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border-b border-[#D4C5B5]/60 ${
        index === 0 ? 'border-t' : ''
      }`}
    >
      <div
        className="py-8 md:py-10 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <span className="font-lato text-[11px] tracking-[0.2em] uppercase text-[#B8977E]">
                {project.category}
              </span>
              <span className="text-[#D4C5B5]">/</span>
              <span className="font-lato text-[11px] tracking-[0.1em] text-[#8A7968]">
                {project.year}
              </span>
            </div>
            <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-[#2C2C2C] group-hover:text-[#B8977E] transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <button className="text-[#8A7968] group-hover:text-[#B8977E] transition-colors shrink-0 mt-2 md:mt-0">
            {expanded ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="pb-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-8">
              <div>
                <p className="font-lato text-[11px] tracking-[0.3em] uppercase text-[#B8977E] mb-3">
                  Context
                </p>
                <p className="font-lato text-[#5A4E42] leading-[1.8] text-[15px]">
                  {project.context}
                </p>
              </div>
              <div>
                <p className="font-lato text-[11px] tracking-[0.3em] uppercase text-[#B8977E] mb-3">
                  Insight
                </p>
                <p className="font-playfair text-lg md:text-xl text-[#2C2C2C] italic leading-relaxed">
                  {project.insight}
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-lato text-[11px] tracking-[0.3em] uppercase text-[#B8977E] mb-3">
                  Strategy
                </p>
                <p className="font-lato text-[#5A4E42] leading-[1.8] text-[15px]">
                  {project.strategy}
                </p>
              </div>
              <div>
                <p className="font-lato text-[11px] tracking-[0.3em] uppercase text-[#B8977E] mb-3">
                  Outcome
                </p>
                <p className="font-lato text-[#5A4E42] leading-[1.8] text-[15px]">
                  {project.outcome}
                </p>
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-lato text-sm text-[#B8977E] hover:text-[#A6856C] transition-colors duration-300 group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <ExternalLink
                    size={14}
                    className="group-hover/link:translate-x-0.5 transition-transform"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SelectedWork = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 bg-[#F0EBE3]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          Selected Work
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-4 leading-tight">
          Stories I've helped tell
        </h2>
        <p className="font-lato text-[#8A7968] text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
          Each project began with a question. Here's how the answers unfolded.
        </p>

        <div>
          {selectedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
