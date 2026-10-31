import React, { useState, useMemo } from 'react';
import { Calculator, Send, MessageSquare, Ruler, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';

interface ConfiguratorProps {
  onOpenMeasurement: () => void;
}

const FURNITURE_TYPES = [
  { id: 'wardrobe', name: 'Custom Wardrobe', defaultW: 6, defaultH: 7.5, defaultD: 22, unit: 'ft', baseRate: 1450 },
  { id: 'sofa_divan', name: 'Wooden Sofa & Divan', defaultW: 6.5, defaultH: 3, defaultD: 32, unit: 'ft', baseRate: 2400 },
  { id: 'tv_cabinet', name: 'LED TV Wall Console', defaultW: 6, defaultH: 1.5, defaultD: 15, unit: 'ft', baseRate: 1800 },
  { id: 'shoe_rack', name: 'Ventilated Shoe Rack Bench', defaultW: 4, defaultH: 2.2, defaultD: 16, unit: 'ft', baseRate: 1350 },
  { id: 'kitchen', name: 'Modular Kitchen Run', defaultW: 10, defaultH: 7, defaultD: 24, unit: 'ft', baseRate: 1750 },
  { id: 'computer_table', name: 'Computer Desk & Workstation', defaultW: 4, defaultH: 2.5, defaultD: 24, unit: 'ft', baseRate: 1400 },
  { id: 'dressing_table', name: 'Dressing Table with Vanity Mirror', defaultW: 3.5, defaultH: 6.5, defaultD: 18, unit: 'ft', baseRate: 1550 },
  { id: 'bookshelf', name: 'Solid Wood Book Shelf', defaultW: 3.5, defaultH: 6.5, defaultD: 14, unit: 'ft', baseRate: 1300 }
];

const WOOD_OPTIONS = [
  { id: 'burma_teak', name: '100% Solid Seasoned Teak', multiplier: 1.45, desc: 'Highest durability, golden luster, natural oils resistant to moisture & termites' },
  { id: 'sheesham', name: 'Seasoned Indian Sheesham (Rosewood)', multiplier: 1.25, desc: 'Rich contrasting grain, dense hardwood, classic heirloom finish' },
  { id: 'bwp_ply_veneer', name: 'BWP Marine Ply (IS 710) + Natural Teak Veneer', multiplier: 1.15, desc: 'Zero warping, boiling waterproof, authentic natural wood veneer exterior' },
  { id: 'hd_laminate', name: 'High-Density Hardwood Core + Anti-Scratch Laminate', multiplier: 1.0, desc: 'Sleek modern textures, highly cost-effective, easy maintenance' }
];

const FINISHES = [
  'Natural Honey Matte',
  'Rich Dark Walnut',
  'Royal Antique Teak',
  'Nordic Ash Polish',
  'Smoked Ebony'
];

export const CustomConfigurator: React.FC<ConfiguratorProps> = ({ onOpenMeasurement }) => {
  const [selectedType, setSelectedType] = useState(FURNITURE_TYPES[0]);
  const [width, setWidth] = useState(FURNITURE_TYPES[0].defaultW);
  const [height, setHeight] = useState(FURNITURE_TYPES[0].defaultH);
  const [selectedWood, setSelectedWood] = useState(WOOD_OPTIONS[0]);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  
  // Add-ons
  const [hasSoftClose, setHasSoftClose] = useState(true);
  const [hasLedLights, setHasLedLights] = useState(true);
  const [hasFlutedSlats, setHasFlutedSlats] = useState(false);
  const [hasSecretLocker, setHasSecretLocker] = useState(false);
  const [locality, setLocality] = useState('');

  // Calculate price
  const calculation = useMemo(() => {
    // Area in sq ft approx
    const sqFt = width * height;
    const baseWoodCost = sqFt * selectedType.baseRate * selectedWood.multiplier;
    
    let addOnsCost = 0;
    if (hasSoftClose) addOnsCost += 2200;
    if (hasLedLights) addOnsCost += 1800;
    if (hasFlutedSlats) addOnsCost += 3200;
    if (hasSecretLocker) addOnsCost += 2500;

    const estimatedFactoryPrice = Math.round((baseWoodCost + addOnsCost) / 100) * 100;
    const estimatedShowroomPrice = Math.round(estimatedFactoryPrice * 1.42 / 100) * 100;
    const customerSavings = estimatedShowroomPrice - estimatedFactoryPrice;

    return {
      sqFt: Math.round(sqFt * 10) / 10,
      estimatedFactoryPrice,
      estimatedShowroomPrice,
      customerSavings
    };
  }, [selectedType, width, height, selectedWood, hasSoftClose, hasLedLights, hasFlutedSlats, hasSecretLocker]);

  const handleTypeChange = (type: typeof FURNITURE_TYPES[0]) => {
    setSelectedType(type);
    setWidth(type.defaultW);
    setHeight(type.defaultH);
  };

  const waEstimateMessage = `Hello JJ Homekart! I calculated an estimate on your website for a custom piece:
*Furniture:* ${selectedType.name}
*Dimensions:* Width: ${width} ft x Height: ${height} ft
*Wood Selection:* ${selectedWood.name}
*Preferred Polish:* ${selectedFinish}
*Selected Features:* ${hasSoftClose ? 'Soft-Close Hardware, ' : ''}${hasLedLights ? 'Concealed LED, ' : ''}${hasFlutedSlats ? 'Fluted Slats, ' : ''}${hasSecretLocker ? 'Internal Security Locker' : ''}
${locality ? `*My Bengaluru Locality:* ${locality}` : ''}
*Estimated Factory Price:* ₹${calculation.estimatedFactoryPrice.toLocaleString('en-IN')}

Can you review these dimensions and schedule a measurement visit?`;

  return (
    <section id="configurator" className="py-12 sm:py-16 bg-[#F3ECE1]/60 border-b border-[#E6D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
            Interactive Dimension & Wood Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#38210B]">
            Calculate Your Custom Furniture Estimate
          </h2>
          <p className="text-xs sm:text-sm text-[#523315]/85">
            Every home in Bengaluru has unique floor layouts. Pick your exact room dimensions and wood species for an instant direct-factory estimate.
          </p>
        </div>

        {/* 2-Column Configurator Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E6D9C5] shadow-xs space-y-6">
            
            {/* Step 1: Furniture Type */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#38210B] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#6D441F] text-white inline-flex items-center justify-center text-[11px]">1</span>
                <span>Select Furniture Type</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FURNITURE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`p-2.5 text-xs text-center rounded-lg transition-all cursor-pointer border ${
                      selectedType.id === type.id
                        ? 'border-[#6D441F] bg-[#6D441F] text-white font-semibold shadow-xs'
                        : 'border-[#E6D9C5] bg-[#FAF7F2] text-[#523315] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions Sliders */}
            <div className="space-y-4 pt-3 border-t border-[#F3ECE1]">
              <label className="text-xs font-bold text-[#38210B] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#6D441F] text-white inline-flex items-center justify-center text-[11px]">2</span>
                <span>Adjust Room Dimensions (in Feet)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Width */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E6D9C5] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#523315]">Width / Length:</span>
                    <strong className="text-[#38210B] font-serif text-sm tabular-nums">{width} ft</strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="14"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    className="w-full accent-[#6D441F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#6D441F]">
                    <span>Compact (2 ft)</span>
                    <span>Wide (14 ft)</span>
                  </div>
                </div>

                {/* Height */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E6D9C5] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#523315]">Height:</span>
                    <strong className="text-[#38210B] font-serif text-sm tabular-nums">{height} ft</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9.5"
                    step="0.5"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    className="w-full accent-[#6D441F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#6D441F]">
                    <span>Low profile (1 ft)</span>
                    <span>Ceiling height (9.5 ft)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Wood Species */}
            <div className="space-y-3 pt-3 border-t border-[#F3ECE1]">
              <label className="text-xs font-bold text-[#38210B] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#6D441F] text-white inline-flex items-center justify-center text-[11px]">3</span>
                <span>Select Hardwood & Core Material</span>
              </label>

              <div className="space-y-2">
                {WOOD_OPTIONS.map((wood) => (
                  <div
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between ${
                      selectedWood.id === wood.id
                        ? 'border-[#6D441F] bg-[#6D441F]/5 shadow-xs'
                        : 'border-[#E6D9C5] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-[#38210B]">{wood.name}</div>
                      <div className="text-[11px] text-[#523315]/80">{wood.desc}</div>
                    </div>
                    {selectedWood.id === wood.id && (
                      <Check className="w-4 h-4 text-[#6D441F] shrink-0 mt-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Finish & Hardware */}
            <div className="space-y-3 pt-3 border-t border-[#F3ECE1]">
              <label className="text-xs font-bold text-[#38210B] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#6D441F] text-white inline-flex items-center justify-center text-[11px]">4</span>
                <span>Polish Shade & Hardware Add-ons</span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {FINISHES.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFinish(f)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer border ${
                      selectedFinish === f
                        ? 'bg-[#523315] text-white border-[#523315]'
                        : 'bg-[#FAF7F2] text-[#523315] border-[#E6D9C5] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Checkbox Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6D9C5] text-xs cursor-pointer hover:bg-[#FAF7F2]">
                  <input
                    type="checkbox"
                    checked={hasSoftClose}
                    onChange={(e) => setHasSoftClose(e.target.checked)}
                    className="accent-[#6D441F]"
                  />
                  <span>German Soft-Close Hinges (+₹2,200)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6D9C5] text-xs cursor-pointer hover:bg-[#FAF7F2]">
                  <input
                    type="checkbox"
                    checked={hasLedLights}
                    onChange={(e) => setHasLedLights(e.target.checked)}
                    className="accent-[#6D441F]"
                  />
                  <span>Concealed Warm LED Strip (+₹1,800)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6D9C5] text-xs cursor-pointer hover:bg-[#FAF7F2]">
                  <input
                    type="checkbox"
                    checked={hasFlutedSlats}
                    onChange={(e) => setHasFlutedSlats(e.target.checked)}
                    className="accent-[#6D441F]"
                  />
                  <span>Architectural Fluted Slats (+₹3,200)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6D9C5] text-xs cursor-pointer hover:bg-[#FAF7F2]">
                  <input
                    type="checkbox"
                    checked={hasSecretLocker}
                    onChange={(e) => setHasSecretLocker(e.target.checked)}
                    className="accent-[#6D441F]"
                  />
                  <span>Internal Document Locker (+₹2,500)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Quotation Summary Card (Sticky) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#8B5A2B]/40 shadow-md space-y-6 lg:sticky lg:top-24">
            <div className="border-b border-[#F3ECE1] pb-4 space-y-1">
              <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
                Instant Factory Quote Summary
              </div>
              <h3 className="font-serif text-xl font-bold text-[#38210B]">
                {selectedType.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#6D441F]">
                <span>{width} ft × {height} ft ({calculation.sqFt} sq.ft)</span>
                <span aria-hidden="true">·</span>
                <span>{selectedFinish}</span>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E6D9C5] space-y-3">
              <div>
                <div className="text-xs text-[#8B5A2B] uppercase tracking-wider font-semibold">
                  JJ Homekart Direct Factory Price
                </div>
                <div className="text-3xl font-serif font-bold text-[#38210B] tabular-nums mt-0.5">
                  ₹{calculation.estimatedFactoryPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-[#6D441F] mt-1">
                  Includes seasoned timber, CNC cutting, hand polish, and assembly in Bengaluru.
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6D9C5] flex items-center justify-between text-xs">
                <span className="text-[#6D441F]">Typical Showroom Retail:</span>
                <span className="line-through text-[#6D441F]/80 tabular-nums">
                  ₹{calculation.estimatedShowroomPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between">
                <span>Your Direct Factory Savings:</span>
                <span className="tabular-nums">₹{calculation.customerSavings.toLocaleString('en-IN')} (Save ~30%)</span>
              </div>
            </div>

            {/* Optional Locality Input for delivery accuracy */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#523315]">
                Your Bengaluru Locality (Optional):
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Ramamurthy Nagar, Whitefield, Kasturi Nagar..."
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E6D9C5] rounded-lg text-[#38210B] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(waEstimateMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#CBB496]" />
                <span>Send Configuration to WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onOpenMeasurement}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#523315] bg-[#F3ECE1] hover:bg-[#E6D9C5] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#E6D9C5]"
              >
                <Ruler className="w-4 h-4 text-[#8B5A2B]" />
                <span>Book Free Measurement Visit First</span>
              </button>
            </div>

            <div className="text-[11px] text-center text-[#6D441F]/80">
              *Estimates are calculated on standard high-durability joinery. Final quotation confirmed after on-site measurement.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
