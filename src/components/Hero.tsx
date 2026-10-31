import React, { useState } from 'react';
import { ShieldCheck, Ruler, Truck, ArrowRight, MessageSquare, Star, Phone, Box, Image as ImageIcon } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';
import { ThreeFurnitureStudio } from './ThreeFurnitureStudio';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenMeasurement: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenMeasurement }) => {
  const [heroMode, setHeroMode] = useState<'3d' | 'photo'>('3d');

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#E6D9C5]">
      
      {/* Kinetic Workshop Ticker Strip */}
      <div className="overflow-hidden whitespace-nowrap border-b border-[#E6D9C5] bg-[#F3ECE1]/60 py-2 mb-8">
        <div className="inline-flex items-center gap-8 text-[11px] font-semibold text-[#6D441F] uppercase tracking-wider animate-marquee">
          <span>Kiln-Dried Seasoned Nilambur Teak & Sheesham</span>
          <span aria-hidden="true" className="text-[#8B5A2B]">✦</span>
          <span>Factory Showroom in Ramamurthy Nagar, Bengaluru</span>
          <span aria-hidden="true" className="text-[#8B5A2B]">✦</span>
          <span>Opposite Lenskart & Near Best Bakery</span>
          <span aria-hidden="true" className="text-[#8B5A2B]">✦</span>
          <span>4.6 ★ Rated by 10+ Verified Homeowners</span>
          <span aria-hidden="true" className="text-[#8B5A2B]">✦</span>
          <span>Direct Factory Wholesale Pricing (Save 35%)</span>
          <span aria-hidden="true" className="text-[#8B5A2B]">✦</span>
          <span>Custom Millimeter Dimensions For Your Floorplan</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Split: Bold Editorial Narrative + Interactive Mode Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Proof kicker */}
            <div className="flex items-center gap-2 text-xs text-[#6D441F] font-medium tracking-wide uppercase">
              <span className="flex items-center gap-1 font-semibold text-[#8B5A2B]">
                <Star className="w-3.5 h-3.5 fill-[#8B5A2B] text-[#8B5A2B]" />
                <span>4.6 Star Rating</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>10+ Google Reviews</span>
              <span aria-hidden="true">·</span>
              <span>Ramamurthy Nagar, Bengaluru</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#38210B] leading-[1.12] tracking-tight [text-wrap:balance]">
              The Craft of Solid Wood. Direct from the Bangalore Atelier.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#523315]/90 leading-relaxed max-w-xl">
              We bridge traditional mortise-and-tenon woodcraft with contemporary Bengaluru living. Experience kiln-dried teak sofas, acoustic LED TV wall units, custom floor-to-ceiling wardrobes, and ventilated shoe benches without showroom markups.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreCatalog}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                data-cursor="EXPLORE"
              >
                <span>Browse Furniture Archive</span>
                <ArrowRight className="w-4 h-4 text-[#CBB496]" />
              </button>

              <button
                onClick={onOpenMeasurement}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#523315] bg-[#F3ECE1] hover:bg-[#E6D9C5] rounded-xl transition-colors flex items-center gap-2 cursor-pointer border border-[#E6D9C5]"
                data-cursor="FREE VISIT"
              >
                <Ruler className="w-4 h-4 text-[#8B5A2B]" />
                <span>Book Laser Measurement</span>
              </button>

              <a
                href={`tel:${STORE_INFO.rawPhone}`}
                className="p-3 text-[#523315] hover:text-[#38210B] bg-white border border-[#E6D9C5] hover:border-[#8B5A2B] rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                title="Call JJ Homekart"
              >
                <Phone className="w-4 h-4 text-[#8B5A2B]" />
              </a>
            </div>

            {/* Key trust indicators */}
            <div className="pt-4 border-t border-[#E6D9C5]/80 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#523315]">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#8B5A2B]" />
                <span>10-Year Hardwood Warranty</span>
              </div>
              <span aria-hidden="true" className="text-[#CBB496]">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#8B5A2B]" />
                <span>Bengaluru Delivery & Assembly</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Column: 3D Three.js Studio OR Architectural Photo */}
          <div className="lg:col-span-7 space-y-3">
            
            {/* Viewport Mode Switcher */}
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold text-[#8B5A2B] uppercase tracking-wider">
                Interactive Showcase
              </div>

              <div className="flex items-center gap-1 bg-[#F3ECE1] p-1 rounded-lg border border-[#E6D9C5]">
                <button
                  onClick={() => setHeroMode('3d')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    heroMode === '3d'
                      ? 'bg-white text-[#38210B] shadow-2xs'
                      : 'text-[#6D441F] hover:text-[#38210B]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>3D Digital Atelier</span>
                </button>

                <button
                  onClick={() => setHeroMode('photo')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    heroMode === 'photo'
                      ? 'bg-white text-[#38210B] shadow-2xs'
                      : 'text-[#6D441F] hover:text-[#38210B]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Showroom Photography</span>
                </button>
              </div>
            </div>

            {/* Display Viewport */}
            {heroMode === '3d' ? (
              <ThreeFurnitureStudio />
            ) : (
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E6D9C5] bg-[#F3ECE1] group h-[520px] sm:h-[620px]">
                <img
                  src="/src/assets/images/hero_teak_living_showroom_1793469477466.jpg"
                  alt="JJ Homekart Handcrafted Teakwood Living Room Showcase Bengaluru"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="text-xs uppercase tracking-wider text-[#CBB496] font-semibold mb-1">
                    Bangalore Showroom · 34, 35 Old UCO Bank Rd
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-bold">
                    Natural Teak & Belgian Linen Living Suite
                  </div>
                  <div className="text-xs text-white/80 mt-1 flex items-center justify-between">
                    <span>Opposite Lenskart · Open Mon–Sun 9 AM – 9 PM</span>
                    <button
                      onClick={onExploreCatalog}
                      className="text-[#CBB496] underline underline-offset-4 hover:text-white"
                    >
                      View in Catalog &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 4-Column Feature & Assurance Strip */}
        <div className="pt-8 border-t border-[#E6D9C5] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">Direct Manufacturer</div>
            <div className="text-base font-serif font-bold text-[#38210B]">Save 30% – 40%</div>
            <p className="text-xs text-[#523315]/80">Zero mall leasing markup. We manufacture directly in our workshop.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">Seasoned Woods</div>
            <div className="text-base font-serif font-bold text-[#38210B]">Teak & Sheesham</div>
            <p className="text-xs text-[#523315]/80">Kiln-dried hardwoods with anti-termite chemical vacuum pressure.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">Tailored Fit</div>
            <div className="text-base font-serif font-bold text-[#38210B]">Millimeter Precision</div>
            <p className="text-xs text-[#523315]/80">Custom wardrobes, shoe racks & TV units built for your exact floor plan.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">B2B Wholesaler</div>
            <div className="text-base font-serif font-bold text-[#38210B]">Bulk Order Rates</div>
            <p className="text-xs text-[#523315]/80">Special tiers for apartment builders, interior designers, and PGs.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
