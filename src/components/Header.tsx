import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ShoppingBag, MapPin, Clock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';

interface HeaderProps {
  shortlistCount: number;
  onOpenShortlist: () => void;
  onOpenMeasurement: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  shortlistCount,
  onOpenShortlist,
  onOpenMeasurement,
  activeNav,
  setActiveNav,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Editorial Announcement Strip */}
      <div className="bg-[#38210B] text-[#E6D9C5] text-[11px] py-1.5 px-4 tracking-wide border-b border-[#523315]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#F3ECE1]">
              <MapPin className="w-3.5 h-3.5 text-[#CBB496]" />
              <span>Ramamurthy Nagar, Bengaluru</span>
            </span>
            <span aria-hidden="true" className="text-[#8B5A2B]">/</span>
            <span className="hidden sm:inline text-[#CBB496]">
              Opposite Lenskart & near Best Bakery
            </span>
            <span aria-hidden="true" className="hidden md:inline text-[#8B5A2B]">/</span>
            <span className="hidden md:flex items-center gap-1 text-[#F3ECE1]/90">
              <Clock className="w-3 h-3 text-[#CBB496]" />
              <span>Open 7 Days (9:00 AM – 9:00 PM)</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#F3ECE1]">
            <a
              href={`tel:${STORE_INFO.rawPhone}`}
              className="hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <Phone className="w-3 h-3 text-[#CBB496]" />
              <span className="tabular-nums">+91 99005 60985</span>
            </a>
            <span aria-hidden="true" className="text-[#8B5A2B]">|</span>
            <button
              onClick={onOpenMeasurement}
              className="hover:text-white transition-colors font-medium cursor-pointer flex items-center gap-1 text-[#CBB496] hover:underline"
            >
              <span>Free Site Measurement</span>
              <ArrowUpRight className="w-3 h-3 text-[#CBB496]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract: 3 zones separated by gap-8 */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(56,33,11,0.06)] border-b border-[#E6D9C5]' 
            : 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6D9C5]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand title, one line wordmark */}
          <a
            href="/"
            className="group flex items-center gap-2.5 whitespace-nowrap shrink-0"
            data-cursor="HOME"
          >
            {/* Bespoke Chisel Monogram Emblem */}
            <span className="w-8 h-8 rounded-lg bg-[#38210B] text-[#F3ECE1] flex items-center justify-center font-serif text-sm font-bold border border-[#8B5A2B]/40 shadow-xs group-hover:bg-[#523315] transition-colors">
              JJ
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#38210B] tracking-tight group-hover:text-[#6D441F] transition-colors">
              JJ Homekart
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#523315]">
            <button
              onClick={() => scrollTo('catalogue')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#8B5A2B] cursor-pointer group ${
                activeNav === 'catalogue' ? 'text-[#8B5A2B]' : ''
              }`}
            >
              <span>Catalogue</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#8B5A2B] transition-all duration-300 ${
                  activeNav === 'catalogue' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            <button
              onClick={() => scrollTo('configurator')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#8B5A2B] cursor-pointer group ${
                activeNav === 'configurator' ? 'text-[#8B5A2B]' : ''
              }`}
            >
              <span>Custom Sizing</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#8B5A2B] transition-all duration-300 ${
                  activeNav === 'configurator' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            <button
              onClick={() => scrollTo('wholesale')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#8B5A2B] cursor-pointer group ${
                activeNav === 'wholesale' ? 'text-[#8B5A2B]' : ''
              }`}
            >
              <span>Wholesale & B2B</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#8B5A2B] transition-all duration-300 ${
                  activeNav === 'wholesale' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            <button
              onClick={() => scrollTo('location')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#8B5A2B] cursor-pointer group ${
                activeNav === 'location' ? 'text-[#8B5A2B]' : ''
              }`}
            >
              <span>Showroom & Route</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#8B5A2B] transition-all duration-300 ${
                  activeNav === 'location' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            <button
              onClick={() => scrollTo('reviews')}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#8B5A2B] cursor-pointer group ${
                activeNav === 'reviews' ? 'text-[#8B5A2B]' : ''
              }`}
            >
              <span>Reviews (4.6★)</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#8B5A2B] transition-all duration-300 ${
                  activeNav === 'reviews' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          </nav>

          {/* Zone 3: 1 primary action area */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Shortlist / Quote Drawer Trigger */}
            <button
              onClick={onOpenShortlist}
              className="relative px-3.5 py-2 rounded-full bg-[#F3ECE1] hover:bg-[#E6D9C5] text-[#38210B] border border-[#E6D9C5] transition-all flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs group"
              title="View Quote Shortlist"
              data-cursor="QUOTE"
            >
              <ShoppingBag className="w-4 h-4 text-[#6D441F] group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold">Quote</span>
              {shortlistCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-[#8B5A2B] rounded-full shadow-2xs tabular-nums">
                  {shortlistCount}
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#CBB496] hidden sm:inline-block" />
              )}
            </button>

            {/* High-Impact Primary CTA: WhatsApp Atelier */}
            <a
              href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(
                "Hello JJ Homekart! I am exploring your furniture collection and would like an instant factory quotation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2 text-xs font-semibold text-[#F3ECE1] bg-[#38210B] hover:bg-[#523315] rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 border border-[#CBB496]/30 group"
              data-cursor="WHATSAPP"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#CBB496] group-hover:rotate-12 transition-transform" />
              <span>Get Factory Quote</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#38210B] hover:bg-[#F3ECE1] border border-[#E6D9C5] cursor-pointer transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E6D9C5] px-5 py-4 space-y-3 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-[#523315]">
            <button
              onClick={() => scrollTo('catalogue')}
              className="text-left py-2 hover:text-[#8B5A2B] border-b border-[#F3ECE1]"
            >
              Furniture Catalogue
            </button>
            <button
              onClick={() => scrollTo('configurator')}
              className="text-left py-2 hover:text-[#8B5A2B] border-b border-[#F3ECE1]"
            >
              Custom Sizing & Price
            </button>
            <button
              onClick={() => scrollTo('wholesale')}
              className="text-left py-2 hover:text-[#8B5A2B] border-b border-[#F3ECE1]"
            >
              Wholesale & Builders
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="text-left py-2 hover:text-[#8B5A2B] border-b border-[#F3ECE1]"
            >
              Store Route & Location
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="text-left py-2 hover:text-[#8B5A2B]"
            >
              Customer Reviews (4.6★)
            </button>
          </div>

          <div className="pt-2 border-t border-[#E6D9C5] flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMeasurement();
              }}
              className="text-[#8B5A2B] font-semibold underline underline-offset-2"
            >
              Book Free Site Measurement
            </button>
            <a
              href={`tel:${STORE_INFO.rawPhone}`}
              className="font-bold text-[#38210B] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
