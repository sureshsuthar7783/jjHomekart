import React, { useState } from 'react';
import { X, Check, Ruler, ShieldCheck, Truck, MessageSquare, Phone, Plus } from 'lucide-react';
import { Product, STORE_INFO } from '../data/furnitureData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isInShortlist: boolean;
  onToggleShortlist: (product: Product) => void;
  onOpenMeasurement: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isInShortlist,
  onToggleShortlist,
  onOpenMeasurement,
}) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState<string>(product.finishes[0] || 'Natural Teak');
  const [customNotes, setCustomNotes] = useState<string>('');

  const waMessage = `Hello JJ Homekart! I am inquiring about:
*Product:* ${product.name}
*Model ID:* ${product.id}
*Preferred Finish:* ${selectedFinish}
*Standard Dimensions:* ${product.dimensions}
${customNotes ? `*Custom Notes / My Room Dims:* ${customNotes}` : ''}
*Estimated Factory Price:* ₹${product.retailPrice.toLocaleString('en-IN')}

Please share current delivery timeline to my locality in Bengaluru.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-[#FAF7F2] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E6D9C5] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-[#E6D9C5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-xs text-[#8B5A2B] font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Factory Code: JJ-{product.id.substring(0, 6).toUpperCase()}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#523315] hover:bg-[#F3ECE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable split view */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Highlights */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F3ECE1] border border-[#E6D9C5]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded">
                Handcrafted at JJ Homekart Studio
              </div>
            </div>

            {/* Quick Specs Pill-free cards */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-[#E6D9C5]">
              <div>
                <span className="text-[#8B5A2B] block font-medium">Dimensions:</span>
                <span className="font-semibold text-[#38210B]">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-[#8B5A2B] block font-medium">Primary Wood:</span>
                <span className="font-semibold text-[#38210B]">{product.woodType}</span>
              </div>
              <div className="pt-2 border-t border-[#F3ECE1]">
                <span className="text-[#8B5A2B] block font-medium">Lead Time:</span>
                <span className="font-semibold text-[#38210B]">{product.leadTime}</span>
              </div>
              <div className="pt-2 border-t border-[#F3ECE1]">
                <span className="text-[#8B5A2B] block font-medium">Warranty:</span>
                <span className="font-semibold text-[#38210B]">{product.warranty}</span>
              </div>
            </div>

            {/* In-store inspection notice */}
            <div className="p-3 bg-[#F3ECE1]/70 rounded-lg text-xs text-[#523315] space-y-1">
              <div className="font-semibold text-[#38210B]">Visit Our Ramamurthy Nagar Showroom</div>
              <p>Touch the raw seasoned wood and inspect the joints before finishing. 34, 35, Old UCO Bank Rd (Opposite Lenskart).</p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Customization Module */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#38210B] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#523315]/85 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="p-4 bg-white rounded-xl border border-[#E6D9C5] space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8B5A2B] font-medium">
                    Direct Factory Rate (Single Unit)
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#38210B] tabular-nums">
                    ₹{product.retailPrice.toLocaleString('en-IN')}
                    <span className="text-xs font-sans font-normal text-[#6D441F] ml-1.5">
                      including taxes & polish
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-[#8B5A2B] font-medium">
                    Wholesale (3+ units)
                  </div>
                  <div className="text-base font-serif font-bold text-emerald-800 tabular-nums">
                    ₹{product.wholesalePrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Finish Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#38210B]">
                Choose Wood Polish & Finish:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.finishes.map((finish) => {
                  const isSelected = selectedFinish === finish;
                  return (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3 py-2 text-xs rounded-lg text-left transition-all cursor-pointer border flex items-center justify-between ${
                        isSelected
                          ? 'border-[#6D441F] bg-[#6D441F]/5 font-semibold text-[#38210B]'
                          : 'border-[#E6D9C5] bg-white text-[#523315] hover:bg-[#F3ECE1]'
                      }`}
                    >
                      <span>{finish}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#6D441F]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Notes input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#38210B]">
                Have Custom Dimensions or Questions? (Optional):
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g., need 6.5ft width instead of 6ft, or hydraulic lift"
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6D9C5] rounded-lg text-[#38210B] placeholder-[#8B5A2B]/50 focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            {/* Features List */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
                Craftsmanship & Build Details:
              </div>
              <ul className="space-y-1.5 text-xs text-[#523315]">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-4 space-y-2 border-t border-[#E6D9C5]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onToggleShortlist(product)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    isInShortlist
                      ? 'bg-[#E6D9C5] text-[#38210B] border-[#CBB496]'
                      : 'bg-white hover:bg-[#F3ECE1] text-[#523315] border-[#E6D9C5]'
                  }`}
                >
                  {isInShortlist ? (
                    <>
                      <Check className="w-4 h-4 text-[#8B5A2B]" />
                      <span>Added to Quote Shortlist</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#8B5A2B]" />
                      <span>Add to Quote Shortlist</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#CBB496]" />
                  <span>Send WhatsApp Inquiry</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenMeasurement();
                  }}
                  className="text-xs text-[#8B5A2B] hover:text-[#523315] font-medium underline underline-offset-2 cursor-pointer"
                >
                  Request Free Home Measurement Visit
                </button>
                <a
                  href={`tel:${STORE_INFO.rawPhone}`}
                  className="text-xs text-[#523315] hover:text-[#38210B] font-medium flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#8B5A2B]" />
                  <span>Call +91 99005 60985</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
