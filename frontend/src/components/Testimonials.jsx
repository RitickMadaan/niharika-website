import React from 'react';
import { useInView } from '@/hooks/useInView';

const testimonials = [
  {
    id: 1,
    name: 'Kushal Anil Menghrajani',
    title: 'Creative Director & Co-Founder, Backyard Collective',
    subtitle:
      'Building content IPs and brand stories for culture-forward brands',
    paragraphs: [
      'As someone who resides at the cusp of two generations - Millennials and Gen Z, Niharika was the most apt resource in the team to bridge the communication between us and a pan-audience. With a rare skill-set where a creative is thoroughly organised, she scaled the ladder within to play a managerial role effortlessly even amongst peers. Defying hierarchy and building relationships on behalf of the leadership that led to efficient work processes and systems within the team.',
      'She also possesses a knack of picking on cultures that eventually become trends in the digital storytelling world. As a senior resource, she believes in radical candour and does not shy away from fighting for what\'s best for the company and is receptive to feedback whenever there is a window for growth.',
      'And lastly, she understands the importance of scaling a company and doing it strategically over just monetarily.',
    ],
  },
  {
    id: 2,
    name: 'Abhishek Sharma',
    title: 'Writer, Director, Voice Artiste, Podcast Host',
    subtitle: 'Founder @bhopuwala',
    paragraphs: [
      'Niharika excelled in content development, researching and producing high-quality shows that resonated with our target audience. She effectively managed program coordination, scheduling guests, and ensuring smooth live broadcasts. Her technical expertise enabled her to enhance the quality of our programs using digital production tools and social media platforms.',
      'Additionally, Niharika actively engaged with our audience, fostering a sense of community and loyalty. She consistently met deadlines, demonstrated attention to detail, and effectively managed multiple projects.',
    ],
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-[#FAF8F5] rounded-lg p-8 md:p-10 border border-[#E0D8CE] transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="font-playfair text-6xl text-[#D4C5B5] leading-none select-none mb-4">
        &ldquo;
      </div>

      <div className="space-y-4 mb-8">
        {testimonial.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-lato text-[#5A4E42] leading-[1.8] text-sm"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="border-t border-[#E0D8CE] pt-6">
        <p className="font-playfair text-lg text-[#2C2C2C]">
          {testimonial.name}
        </p>
        <p className="font-lato text-sm text-[#8A7968] mt-1">
          {testimonial.title}
        </p>
        {testimonial.subtitle && (
          <p className="font-lato text-xs text-[#B8977E] mt-1">
            {testimonial.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F0EBE3]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
          Kind Words
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] mb-16 leading-tight">
          What they say
        </h2>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
