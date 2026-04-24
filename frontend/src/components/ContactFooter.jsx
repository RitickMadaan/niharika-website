import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/data/mock';
import { useInView } from '@/hooks/useInView';

const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`;

const openGmailCompose = (event) => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

  if (!isMobile) {
    return;
  }

  event.preventDefault();

  if (/android/i.test(userAgent)) {
    const androidIntent = `intent://co?to=${encodeURIComponent(siteConfig.email)}#Intent;scheme=googlegmail;package=com.google.android.gm;S.browser_fallback_url=${encodeURIComponent(gmailComposeUrl)};end`;
    window.location.href = androidIntent;
    return;
  }

  const fallbackTimeout = window.setTimeout(() => {
    window.location.href = gmailComposeUrl;
  }, 600);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      window.clearTimeout(fallbackTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.location.href = `googlegmail:///co?to=${encodeURIComponent(siteConfig.email)}`;
};

const ContactFooter = () => {
  const [ref, isInView] = useInView();

  return (
    <>
      {/* Connect Section */}
      <section
        id="connect"
        className="py-24 md:py-32 px-6 md:px-12 bg-[#2C2C2C]"
      >
        <div
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-lato text-sm tracking-[0.3em] uppercase text-[#B8977E] mb-4">
            Connect
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#FAF8F5] mb-6 leading-tight">
            If you're building something meaningful, I'd love to be part of it.
          </h2>
          <p className="font-lato text-[#A89F93] text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            Whether it's a brand that needs finding its voice, a story waiting to
            be told, or a strategy that needs heart — let's talk.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <a
              href={gmailComposeUrl}
              onClick={openGmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-lato text-base text-[#FAF8F5] hover:text-[#B8977E] transition-colors duration-300 border border-[#B8977E] hover:border-[#A6856C] px-6 py-3 rounded-full"
            >
              <Mail size={18} />
              Get in Touch
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-lato text-base text-[#A89F93] hover:text-[#B8977E] transition-colors duration-300"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 bg-[#242424] border-t border-[#333]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-playfair text-lg text-[#FAF8F5] mb-1">
              {siteConfig.name}
            </p>
            <p className="font-lato text-[13px] text-[#6A6A6A] tracking-wide">
              Brand Strategist & Content Storyteller
            </p>
          </div>

          <p className="font-lato text-[11px] text-[#4A4A4A] tracking-wide">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;
