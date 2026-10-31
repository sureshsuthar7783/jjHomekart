import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';

interface FooterProps {
  onOpenMeasurement: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMeasurement, onScrollTo }) => {
  return (
    <footer className="bg-[#38210B] text-[#F3ECE1] pt-14 pb-10 border-t border-[#523315]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Factory Summary */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="font-serif text-2xl font-bold text-white tracking-tight">
              JJ Homekart
            </a>
            <p className="text-xs text-[#CBB496] leading-relaxed max-w-sm">
              Direct home furniture manufacturer and wholesaler in Ramamurthy Nagar, Bengaluru. Specializing in handcrafted solid teakwood sofas, modular wardrobes, acoustic LED TV consoles, ventilated shoe racks, and custom carpentry.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#6D441F] hover:bg-[#8B5A2B] text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#CBB496]" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href={`tel:${STORE_INFO.rawPhone}`}
                className="px-3.5 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#CBB496]" />
                <span>+91 99005 60985</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#CBB496]">
              Furniture Categories
            </div>
            <ul className="space-y-2 text-xs text-[#F3ECE1]/80">
              <li>
                <button onClick={() => onScrollTo('catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Wooden Sofas & Divans
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Bedroom Wardrobes
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Fluted LED TV Consoles
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Ventilated Shoe Racks
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('catalogue')} className="hover:text-white transition-colors cursor-pointer">
                  Modular Kitchen Cabinets
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Wholesale */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#CBB496]">
              Customer Services
            </div>
            <ul className="space-y-2 text-xs text-[#F3ECE1]/80">
              <li>
                <button onClick={onOpenMeasurement} className="hover:text-white transition-colors cursor-pointer">
                  Free Site Measurement Visit
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('configurator')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Dimension Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('wholesale')} className="hover:text-white transition-colors cursor-pointer">
                  Wholesale & Builder Orders
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('reviews')} className="hover:text-white transition-colors cursor-pointer">
                  Verified Reviews (4.6★)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('location')} className="hover:text-white transition-colors cursor-pointer">
                  Store Route & Parking Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Store Location & Timings */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#CBB496]">
              Store & Showroom
            </div>
            <div className="space-y-2 text-xs text-[#F3ECE1]/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CBB496] shrink-0 mt-0.5" />
                <span>34, 35, Old UCO Bank Rd, Nagappa Reddy Layout, Ramamurthy Nagar, Bengaluru, Karnataka 560016</span>
              </div>
              <div className="text-[11px] text-[#CBB496] pl-6 font-medium">
                (Opposite Lenskart & near Best Bakery)
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#CBB496] shrink-0" />
                <span>Mon – Sun: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-strip */}
        <div className="pt-8 border-t border-[#523315] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBB496]/80">
          <div>
            © {new Date().getFullYear()} JJ Homekart. All rights reserved. Handcrafted in Bengaluru, Karnataka.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Seasoned Hardwood</span>
            <span aria-hidden="true">·</span>
            <span>Anti-Termite Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Wholesale & Retail</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
