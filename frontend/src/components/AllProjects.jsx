import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { workSamples } from '@/data/workSamples';
import { useInView } from '@/hooks/useInView';

const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8DFD3]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#FAF8F5]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-playfair text-xl text-[#2C2C2C] group-hover:text-[#B8977E] transition-colors duration-300 flex-1">
            {project.title}
          </h3>
          <ExternalLink
            size={16}
            className="text-[#8A7968] group-hover:text-[#B8977E] transition-colors shrink-0 mt-1"
          />
        </div>
        <p className="font-lato text-[11px] tracking-[0.2em] uppercase text-[#8A7968]">
          {project.category}
        </p>
      </div>
    </Link>
  );
};

const AllProjects = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 bg-[#F0EBE3]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          Portfolio
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-4 leading-tight">
          Work Samples
        </h2>
        <p className="font-lato text-[#8A7968] text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
          A collection of brands, stories, and strategies I've had the privilege
          to shape.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {workSamples.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-lato text-[#8A7968] text-sm">
            Open any card to view its full case study on this website.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
