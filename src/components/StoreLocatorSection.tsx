import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Copy, Check, Car, Compass, ExternalLink } from 'lucide-react';
import { STORE_INFO, NEIGHBORHOOD_ROUTES } from '../data/furnitureData';

export const StoreLocatorSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  // Compute live open/closed status (9:00 AM to 9:00 PM IST)
  useEffect(() => {
    const checkOpenStatus = () => {
      // Get current hours in India Standard Time
      const now = new Date();
      // Using UTC offset +5.5 for IST
      const istHours = (now.getUTCHours() + 5.5) % 24;
      const isOpen = istHours >= 9 && istHours < 21;
      setIsOpenNow(isOpen);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-12 sm:py-16 bg-[#F3ECE1]/40 border-b border-[#E6D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
              Factory Showroom & Retail Outlet
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#38210B]">
              Visit JJ Homekart in Ramamurthy Nagar
            </h2>
            <p className="text-xs sm:text-sm text-[#523315]/85 max-w-xl">
              Experience the density of seasoned wood, explore our finish swatches, and meet our master carpenters in person.
            </p>
          </div>

          {/* Real-time status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E6D9C5] text-xs font-medium self-start md:self-auto">
            <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-600' : 'bg-amber-600'}`} />
            <span className="text-[#38210B]">
              {isOpenNow ? "Open Today: 9:00 AM – 9:00 PM" : "Closed Now · Opens at 9:00 AM"}
            </span>
          </div>
        </div>

        {/* Store Detail Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Address & Action Card */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E6D9C5] shadow-xs space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5A2B] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#8B5A2B]" />
                <span>Store Address</span>
              </div>

              <div className="font-serif text-xl sm:text-2xl font-bold text-[#38210B] leading-snug">
                34, 35, Old UCO Bank Rd, Nagappa Reddy Layout
              </div>

              <div className="text-sm text-[#523315] font-medium">
                Ramamurthy Nagar, Bengaluru, Karnataka 560016
              </div>

              {/* Landmark Highlight */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6D9C5] text-xs text-[#523315] space-y-1">
                <div className="font-bold text-[#38210B] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Key Visual Landmarks:</span>
                </div>
                <p className="text-[#523315]/90 font-medium">
                  Directly <strong>Opposite Lenskart</strong> & just 50 meters from <strong>Best Bakery</strong> on Old UCO Bank Road.
                </p>
              </div>
            </div>

            {/* Timings & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F3ECE1] text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#8B5A2B] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Operating Hours</span>
                </div>
                <div className="font-bold text-[#38210B]">Monday to Sunday</div>
                <div className="text-[#523315]">9:00 AM – 9:00 PM (All 7 Days)</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#8B5A2B] font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone & WhatsApp</span>
                </div>
                <div className="font-bold text-[#38210B]">+91 99005 60985</div>
                <div className="text-[#523315]">Call or chat for instant assistance</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs whitespace-nowrap"
              >
                <Navigation className="w-4 h-4 text-[#CBB496]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#CBB496]/70" />
              </a>

              <button
                onClick={copyAddress}
                className="py-2.5 px-3.5 text-xs font-medium text-[#523315] bg-[#FAF7F2] hover:bg-[#E6D9C5] border border-[#E6D9C5] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#8B5A2B]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${STORE_INFO.rawPhone}`}
                className="py-2.5 px-3.5 text-xs font-medium text-[#523315] bg-[#FAF7F2] hover:bg-[#E6D9C5] border border-[#E6D9C5] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#8B5A2B]" />
                <span>Call Store</span>
              </a>
            </div>

            {/* Parking & Transport Notice */}
            <div className="flex items-start gap-2.5 text-[11px] text-[#523315]/80 pt-2 border-t border-[#F3ECE1]">
              <Car className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
              <span>Easy roadside two-wheeler and four-wheeler parking available. Direct cargo loading bay for wholesale furniture pickup.</span>
            </div>

          </div>

          {/* Interactive Route Helper from Nearby Neighborhoods */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E6D9C5] shadow-xs space-y-5">
            
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
                Commute Directions
              </div>
              <h3 className="font-serif text-xl font-bold text-[#38210B]">
                How to Reach Us from Your Area
              </h3>
              <p className="text-xs text-[#523315]/80">
                Easily accessible from major East and North Bengaluru hubs:
              </p>
            </div>

            {/* Neighborhood Tabs */}
            <div className="space-y-2.5">
              {NEIGHBORHOOD_ROUTES.map((route, idx) => {
                const isActive = activeRouteIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveRouteIndex(idx)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isActive
                        ? 'border-[#6D441F] bg-[#FAF7F2] shadow-xs'
                        : 'border-[#E6D9C5] hover:bg-[#FAF7F2]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-[#38210B]">
                      <span>{route.from}</span>
                      <span className="text-[#8B5A2B] font-mono tabular-nums">
                        {route.distance} · {route.travelTime}
                      </span>
                    </div>
                    {isActive && (
                      <p className="text-[#523315]/90 mt-2 pt-2 border-t border-[#E6D9C5] leading-relaxed">
                        {route.routeHint}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick WhatsApp directions request */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#523315]">
              <span>Need live location on WhatsApp?</span>
              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(
                  "Hello JJ Homekart! Please send your exact Google Maps location pin on WhatsApp."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5A2B] hover:text-[#523315] font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get WhatsApp Location Pin</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
