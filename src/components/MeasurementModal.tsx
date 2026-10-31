import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, MessageSquare, Phone, Calendar } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeasurementModal: React.FC<MeasurementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('');
  const [furnitureType, setFurnitureType] = useState('Custom Wardrobe & Storage');
  const [preferredSlot, setPreferredSlot] = useState('Tomorrow Morning (10 AM - 1 PM)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const msg = `Hello JJ Homekart! I would like to book a Free On-Site Measurement Visit:
*Name:* ${name}
*Phone:* ${phone}
*Bengaluru Locality / Address:* ${locality}
*Furniture Needed:* ${furnitureType}
*Preferred Time Slot:* ${preferredSlot}

Please confirm carpenter visit schedule.`;

    window.open(`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E6D9C5] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#8B5A2B]" />
              <span>Complimentary Service</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#38210B]">
              Book Free Site Measurement
            </h3>
            <p className="text-xs text-[#523315]/85">
              Our carpentry specialist will visit your Bengaluru residence with laser measuring tools and wood finish swatches. Zero obligation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#523315] hover:bg-[#F3ECE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="font-serif text-xl font-bold text-[#38210B]">
              Measurement Request Received!
            </div>
            <p className="text-xs text-[#523315] max-w-sm mx-auto">
              We have forwarded your details to our Ramamurthy Nagar workshop. We will call you at <strong>{phone}</strong> to confirm the exact carpenter arrival time.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold bg-[#6D441F] text-white rounded-lg hover:bg-[#523315]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#38210B]">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#38210B]">WhatsApp / Mobile Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 99005 60985"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#38210B]">Bengaluru Locality & Apartment</label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Nagappa Reddy Layout, Ramamurthy Nagar / Kasturi Nagar"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#38210B]">Primary Furniture Needed</label>
                <select
                  value={furnitureType}
                  onChange={(e) => setFurnitureType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                >
                  <option>Custom Wardrobe & Storage</option>
                  <option>Wooden Sofa Set & Divan</option>
                  <option>Modular Kitchen Cabinets</option>
                  <option>LED TV Unit & Wall Slats</option>
                  <option>Shoe Rack & Entryway Bench</option>
                  <option>Full Home Wooden Package</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#38210B]">Preferred Visit Slot</label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B]"
                >
                  <option>Today (Within 3 Hours)</option>
                  <option>Tomorrow Morning (10 AM - 1 PM)</option>
                  <option>Tomorrow Evening (4 PM - 7 PM)</option>
                  <option>This Upcoming Weekend (Sat/Sun)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#CBB496]" />
                <span>Confirm & Send via WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6D441F]">
                <span>Prefer to call directly?</span>
                <a href={`tel:${STORE_INFO.rawPhone}`} className="font-semibold text-[#38210B] underline">
                  +91 99005 60985
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
