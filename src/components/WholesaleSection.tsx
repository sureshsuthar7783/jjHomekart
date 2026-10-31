import React, { useState } from 'react';
import { Building2, Layers, CheckCircle2, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { STORE_INFO, WHOLESALE_BENEFITS } from '../data/furnitureData';

interface WholesaleSectionProps {
  onOpenMeasurement: () => void;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({ onOpenMeasurement }) => {
  const [projectType, setProjectType] = useState('2BHK Apartment Interior');
  const [unitCount, setUnitCount] = useState('3 - 5 Units');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWholesaleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const waMsg = `Hello JJ Homekart! I am inquiring about Wholesale / Bulk Furniture:
*Project Type:* ${projectType}
*Unit Quantity:* ${unitCount}
*Client Name:* ${contactName}
*Phone:* ${contactPhone}
${notes ? `*Project Details:* ${notes}` : ''}

Please share your latest B2B wholesale rate card & catalogue.`;

    window.open(`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(waMsg)}`, '_blank');
  };

  return (
    <section id="wholesale" className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E6D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
              B2B & Bulk Supply Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#38210B]">
              Wholesale Furniture for Builders, Architects & Designers
            </h2>
            <p className="text-xs sm:text-sm text-[#523315]/85 max-w-2xl">
              Equipping residential apartments, villas, and co-living spaces across Bengaluru. Order directly from our Ramamurthy Nagar workshop with volume pricing and standardized kiln-dried timber.
            </p>
          </div>

          <a
            href={`tel:${STORE_INFO.rawPhone}`}
            className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-[#523315] bg-[#F3ECE1] hover:bg-[#E6D9C5] border border-[#E6D9C5] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Direct B2B Desk: +91 99005 60985</span>
          </a>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHOLESALE_BENEFITS.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E6D9C5] shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#F3ECE1] flex items-center justify-center text-[#8B5A2B]">
                <CheckCircle2 className="w-5 h-5 text-[#8B5A2B]" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#38210B]">{item.title}</h4>
              <p className="text-xs text-[#523315]/85 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Pre-packaged Turnkey Apartment Bundles */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
            Curated Turnkey Packages (Direct Factory Rates)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1BHK */}
            <div className="bg-white p-6 rounded-xl border border-[#E6D9C5] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#8B5A2B]">Starter Living & Bed</div>
                <h3 className="font-serif text-xl font-bold text-[#38210B]">1BHK Complete Package</h3>
                <div className="text-2xl font-serif font-bold text-[#38210B] tabular-nums">
                  ₹68,000 <span className="text-xs font-sans font-normal text-[#6D441F]">net factory rate</span>
                </div>
                <ul className="text-xs text-[#523315] space-y-1.5 pt-2 border-t border-[#F3ECE1]">
                  <li>• Queen Teak Bed with Headboard</li>
                  <li>• 2-Door Wardrobe with internal shelves</li>
                  <li>• 55" LED TV Console with wire slots</li>
                  <li>• Ventilated 18-pair Shoe Rack</li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent("Hello JJ Homekart, I would like more details and catalogue for the 1BHK Complete Furniture Package (₹68,000).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2 text-center text-xs font-semibold bg-[#F3ECE1] hover:bg-[#E6D9C5] text-[#523315] rounded-lg transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* 2BHK */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#8B5A2B] shadow-sm space-y-4 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 bg-[#6D441F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                Most Popular
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#8B5A2B]">Full Home Solution</div>
                <h3 className="font-serif text-xl font-bold text-[#38210B]">2BHK Premium Package</h3>
                <div className="text-2xl font-serif font-bold text-[#38210B] tabular-nums">
                  ₹1,24,000 <span className="text-xs font-sans font-normal text-[#6D441F]">net factory rate</span>
                </div>
                <ul className="text-xs text-[#523315] space-y-1.5 pt-2 border-t border-[#F3ECE1]">
                  <li>• 1 King Size Hydraulic Storage Teak Cot</li>
                  <li>• 1 Queen Bed for Guest Bedroom</li>
                  <li>• 2 Customized 3-Door Wardrobes (8ft height)</li>
                  <li>• 3-Seater Solid Wood Sofa + Divan Suite</li>
                  <li>• Fluted 72" LED TV Wall Console</li>
                  <li>• Ventilated Slatted Shoe Bench</li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent("Hello JJ Homekart, I would like more details and catalogue for the 2BHK Premium Package (₹1,24,000).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 text-center text-xs font-semibold bg-[#6D441F] hover:bg-[#523315] text-white rounded-lg transition-colors shadow-2xs"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* 3BHK */}
            <div className="bg-white p-6 rounded-xl border border-[#E6D9C5] space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#8B5A2B]">Luxury Teak & Modular</div>
                <h3 className="font-serif text-xl font-bold text-[#38210B]">3BHK Luxury Master</h3>
                <div className="text-2xl font-serif font-bold text-[#38210B] tabular-nums">
                  ₹1,95,000 <span className="text-xs font-sans font-normal text-[#6D441F]">net factory rate</span>
                </div>
                <ul className="text-xs text-[#523315] space-y-1.5 pt-2 border-t border-[#F3ECE1]">
                  <li>• 2 King Storage Beds + 1 Queen Bed</li>
                  <li>• 3 Custom Floor-to-Ceiling Wardrobes</li>
                  <li>• 3+1+1 Solid Teak Living Room Sofa Suite</li>
                  <li>• 6-Seater Solid Wood Dining Table & Chairs</li>
                  <li>• Architectural LED TV Unit with backlighting</li>
                  <li>• Dual Dressing Tables with full-length vanity</li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent("Hello JJ Homekart, I would like more details and catalogue for the 3BHK Luxury Master Package (₹1,95,000).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2 text-center text-xs font-semibold bg-[#F3ECE1] hover:bg-[#E6D9C5] text-[#523315] rounded-lg transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>

          </div>
        </div>

        {/* Wholesale Inquiry Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6D9C5] shadow-xs">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-xl font-bold text-[#38210B]">
                Request Dedicated Wholesale Rate Sheet
              </h3>
              <p className="text-xs text-[#523315]/80">
                Share your commercial requirements. We deliver and install across Bengaluru with GST invoicing.
              </p>
            </div>

            <form onSubmit={handleWholesaleInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#38210B]">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                >
                  <option>Apartment Builder / Project Fitout</option>
                  <option>Interior Designer / Studio Client</option>
                  <option>New Home / Villa Furnishing</option>
                  <option>PG / Co-Living Space</option>
                  <option>Commercial Office Workstations</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#38210B]">Approximate Quantity</label>
                <select
                  value={unitCount}
                  onChange={(e) => setUnitCount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                >
                  <option>3 - 5 Units (Apartment / Flat)</option>
                  <option>6 - 15 Units (Multiple Units)</option>
                  <option>16 - 50 Units (Residential Floor / PG)</option>
                  <option>50+ Units (Builder Scale Project)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#38210B]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh / Ananya Interior Design"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#38210B]">WhatsApp / Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#38210B]">Specific Furniture List / Floor Plan Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Need 8 wardrobes in Burma Teak finish + 4 LED TV cabinets for our project in Kasturi Nagar..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#CBB496]" />
                  <span>Submit & Connect with Wholesale Manager on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
