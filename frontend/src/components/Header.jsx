import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Thinking', href: '#thinking' },
  { label: 'Work', href: '#work' },
  { label: 'Insights', href: '#insights' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E0D8CE]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-playfair text-xl tracking-wide text-[#2C2C2C] hover:text-[#B8977E] transition-colors duration-300"
        >
          Niharika
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[13px] tracking-[0.2em] uppercase text-[#5A4E42] hover:text-[#B8977E] transition-colors duration-300 relative group font-lato"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B8977E] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button aria-label="Open menu">
              <Menu size={22} className="text-[#2C2C2C]" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#FAF8F5] border-l border-[#E0D8CE] w-[280px]"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-8 mt-16">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-base tracking-[0.2em] uppercase text-[#5A4E42] hover:text-[#B8977E] transition-colors duration-300 font-lato"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
