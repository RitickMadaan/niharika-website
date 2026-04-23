import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BrandHook from '@/components/BrandHook';
import About from '@/components/About';
import ChaosToClarity from '@/components/ChaosToClarity';
import HowIThink from '@/components/HowIThink';
import AllProjects from '@/components/AllProjects';
import NoGatekeeping from '@/components/NoGatekeeping';
import Testimonials from '@/components/Testimonials';
import ContactFooter from '@/components/ContactFooter';
import { interstitialQuotes } from '@/data/mock';

const QuoteDivider = ({ quote }) => {
  const text = typeof quote === 'string' ? quote : quote.text;
  const author = typeof quote === 'string' ? null : quote.author;

  return (
    <div className="py-16 md:py-20 px-6 md:px-12 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-playfair text-xl md:text-2xl text-[#B8977E] leading-relaxed">
          "{text}"
        </p>
        {author ? (
          <p className="mt-4 font-lato text-sm md:text-base tracking-[0.15em] uppercase text-[#9C7B62]">
            {author}
          </p>
        ) : null}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <main className="bg-[#FAF8F5]">
      <Header />
      <Hero />
      <BrandHook />
      <About />
      <ChaosToClarity />
      <QuoteDivider quote={interstitialQuotes[0]} />
      <HowIThink />
      <AllProjects />
      <QuoteDivider quote={interstitialQuotes[1]} />
      <NoGatekeeping />
      <Testimonials />
      <ContactFooter />
    </main>
  );
};

export default HomePage;
