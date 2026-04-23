import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getWorkSampleBySlug, workSamples } from '@/data/workSamples';

const DetailItem = ({ label, text }) => (
  <div className="border-b border-[#E2D7CA] pb-6">
    <p className="font-lato text-xs tracking-[0.2em] uppercase text-[#B8977E] mb-3">
      {label}
    </p>
    <p className="font-lato text-[#4F463C] leading-[1.8] text-base">{text}</p>
  </div>
);

const WorkSamplePage = () => {
  const { slug } = useParams();
  const sample = getWorkSampleBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!sample) {
    return <Navigate to="/" replace />;
  }

  const sampleIndex = workSamples.findIndex((item) => item.slug === slug);
  const previousSample = sampleIndex > 0 ? workSamples[sampleIndex - 1] : null;
  const nextSample =
    sampleIndex < workSamples.length - 1 ? workSamples[sampleIndex + 1] : null;

  return (
    <main className="min-h-screen bg-[#F7F3ED]">
      <section className="px-6 md:px-12 pt-8 md:pt-10 pb-6 border-b border-[#E5DBCF] bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <Link
            to={{ pathname: '/', hash: '#work' }}
            className="inline-flex items-center gap-2 font-lato text-sm text-[#7B6858] hover:text-[#B8977E] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Work Samples
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,1.1fr] gap-10 md:gap-14 items-start">
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-[#E6DBCE]" />
            <div className="relative overflow-hidden rounded-2xl border border-[#DCCFC1] bg-[#F3ECE3]">
              <img
                src={sample.image}
                alt={sample.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="font-lato text-xs tracking-[0.28em] uppercase text-[#B8977E] mb-4">
              Work Sample
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2C2C2C] leading-tight mb-6">
              {sample.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-lato text-[11px] tracking-[0.16em] uppercase text-[#7F6E5E] border border-[#D8CABC] px-4 py-2 rounded-full">
                {sample.category}
              </span>
              <span className="font-lato text-[11px] tracking-[0.16em] uppercase text-[#7F6E5E] border border-[#D8CABC] px-4 py-2 rounded-full">
                {sample.year}
              </span>
            </div>

            <div className="space-y-6">
              <DetailItem label="Brand Description" text={sample.brandDescription} />
              <DetailItem label="Challenge" text={sample.challenge} />
              <DetailItem label="Role" text={sample.role} />
              <DetailItem label="Impact" text={sample.impact} />
            </div>

            {sample.projectUrl ? (
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href={sample.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-lato text-sm text-[#FAF8F5] bg-[#8E6F59] hover:bg-[#7C604D] transition-colors px-5 py-2.5 rounded-full"
                >
                  {sample.projectUrlLabel || 'View Project'}
                  <ExternalLink size={14} />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto border-t border-[#E2D7CA] pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {previousSample ? (
            <Link
              to={`/work/${previousSample.slug}`}
              className="font-lato text-sm text-[#7B6858] hover:text-[#B8977E] transition-colors"
            >
              Previous: {previousSample.title}
            </Link>
          ) : (
            <span className="font-lato text-sm text-[#B8A897]">Start of portfolio</span>
          )}

          {nextSample ? (
            <Link
              to={`/work/${nextSample.slug}`}
              className="font-lato text-sm text-[#7B6858] hover:text-[#B8977E] transition-colors"
            >
              Next: {nextSample.title}
            </Link>
          ) : (
            <span className="font-lato text-sm text-[#B8A897]">End of portfolio</span>
          )}
        </div>
      </section>
    </main>
  );
};

export default WorkSamplePage;
