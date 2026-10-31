import React, { useState } from 'react';
import { Volume2, ShieldCheck, Droplets, Sparkles, Check, Info } from 'lucide-react';

interface WoodSpec {
  id: string;
  name: string;
  botanical: string;
  origin: string;
  hardness: string;
  density: string;
  oilContent: string;
  termiteImmunity: string;
  grainDescription: string;
  colorSwatch: string;
  audioFrequency: number;
  highlight: string;
}

const WOOD_SPECS: WoodSpec[] = [
  {
    id: 'burma_teak',
    name: 'Seasoned Burma & Nilambur Teak',
    botanical: 'Tectona grandis',
    origin: 'Nilambur & Managed Forest Reserves',
    hardness: '1,155 lbf (Janka Scale)',
    density: '660 kg/m³',
    oilContent: 'High (Natural Tectoquione Oils)',
    termiteImmunity: '100% Naturally Resistant (Zero chemical dipping needed)',
    grainDescription: 'Tight, straight, and interlocked golden honey grain with subtle dark mineral streaks that age into a deep bronze luster.',
    colorSwatch: 'from-[#C48C46] to-[#8C521F]',
    audioFrequency: 240, // deep resonant acoustic pitch
    highlight: 'The Gold Standard for Bengaluru Heirloom Furniture',
  },
  {
    id: 'sheesham',
    name: 'Indian Rosewood (Sheesham)',
    botanical: 'Dalbergia sissoo',
    origin: 'Sub-Himalayan & Central Indian Hardwood Belts',
    hardness: '1,780 lbf (Janka Scale)',
    density: '770 kg/m³',
    oilContent: 'Medium-High',
    termiteImmunity: 'Exceptional (Kiln-treated vacuum pressure)',
    grainDescription: 'Dramatically bold, contrasting dark chocolate and warm amber ribbons with interlocking radial figures.',
    colorSwatch: 'from-[#7F381B] to-[#4A1E0D]',
    audioFrequency: 290,
    highlight: 'Heavyweight structural strength for dining tables & cots',
  },
  {
    id: 'bwp_plywood',
    name: 'Boiling Waterproof Marine Ply (IS 710)',
    botanical: 'Selected Hardwood Veneers + Phenol Formaldehyde Resin',
    origin: 'Certified Kerala Timber Mills',
    hardness: 'Multi-ply High Tensile Strength',
    density: '720 kg/m³',
    oilContent: 'Synthetic Poly-Bond (IS 710 Standard)',
    termiteImmunity: 'Treated with Boron & Termite Repellent',
    grainDescription: 'Uniform cross-bonded grain calibrated to 0.1mm tolerance, ideal core for custom modular kitchens and wardrobe carcasses.',
    colorSwatch: 'from-[#B8966E] to-[#7A5B35]',
    audioFrequency: 180,
    highlight: 'Impervious to Kitchen Steam & Monsoon Humidity',
  },
  {
    id: 'american_walnut',
    name: 'Smoked Walnut & Oak Veneers',
    botanical: 'Juglans nigra',
    origin: 'Sustainably Harvested Hardwood',
    hardness: '1,010 lbf (Janka Scale)',
    density: '610 kg/m³',
    oilContent: 'Medium',
    termiteImmunity: 'Vacuum Seasoned & UV Sealed',
    grainDescription: 'Muted architectural grain with silky matte undertones, perfect for modern fluted acoustic TV consoles.',
    colorSwatch: 'from-[#4D3627] to-[#2B1D15]',
    audioFrequency: 210,
    highlight: 'Contemporary Scandinavian & Minimalist Interiors',
  },
];

export const TactileWoodSelector: React.FC = () => {
  const [selectedWood, setSelectedWood] = useState<WoodSpec>(WOOD_SPECS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Play procedural acoustic tap sound using Web Audio API
  const playWoodTapSound = (freq: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      // Fast pitch decay to simulate wood resonance
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, audioCtx.currentTime + 0.12);

      gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 250);
    } catch {
      // AudioContext not allowed or disabled
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E6D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs uppercase tracking-widest text-[#8B5A2B] font-bold">
              02 · The Material Laboratory
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#38210B]">
              The Anatomy of Seasoned Hardwood
            </h2>
            <p className="text-xs sm:text-sm text-[#523315]/85 max-w-xl">
              Unlike fast-furniture made of cheap particleboard, JJ Homekart works exclusively with seasoned, kiln-dried structural hardwoods guaranteed to outlast decades.
            </p>
          </div>

          <button
            onClick={() => playWoodTapSound(selectedWood.audioFrequency)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto ${
              isPlayingAudio
                ? 'bg-[#6D441F] text-white border-[#6D441F] scale-98'
                : 'bg-white text-[#523315] border-[#E6D9C5] hover:bg-[#F3ECE1]'
            }`}
            title="Acoustic Density Resonance Test"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-[#CBB496]' : 'text-[#8B5A2B]'}`} />
            <span>Hear Timber Density (Acoustic Tap)</span>
          </button>
        </div>

        {/* Interactive Wood Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WOOD_SPECS.map((wood) => {
            const isSelected = selectedWood.id === wood.id;
            return (
              <div
                key={wood.id}
                onClick={() => {
                  setSelectedWood(wood);
                  playWoodTapSound(wood.audioFrequency);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#6D441F] bg-white shadow-md ring-1 ring-[#6D441F]/30'
                    : 'border-[#E6D9C5] bg-[#FAF7F2] hover:bg-[#F3ECE1]'
                }`}
                data-cursor="INSPECT"
              >
                <div className="space-y-2">
                  <div
                    className={`h-12 rounded-lg bg-gradient-to-br ${wood.colorSwatch} shadow-inner flex items-center justify-end p-2`}
                  >
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white text-[#6D441F] flex items-center justify-center text-xs shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#38210B] leading-tight">
                      {wood.name.split('(')[0]}
                    </h3>
                    <div className="text-[11px] text-[#8B5A2B] italic">{wood.botanical}</div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#6D441F] tabular-nums pt-1 border-t border-[#F3ECE1]">
                  {wood.density}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Wood Deep Dive Panel */}
        <div className="bg-white rounded-2xl border border-[#E6D9C5] p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Grain Description & Highlight */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B5A2B]">
                Selected Timber Grade
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#38210B]">
                {selectedWood.name}
              </h3>
              <div className="text-xs text-[#523315]">
                Harvest Source: <strong>{selectedWood.origin}</strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#523315]/90 leading-relaxed">
              {selectedWood.grainDescription}
            </p>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6D9C5] text-xs text-[#523315] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5A2B] shrink-0" />
              <span><strong>Atelier Recommendation:</strong> {selectedWood.highlight}</span>
            </div>
          </div>

          {/* Right Technical Specs Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3.5 text-xs">
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E6D9C5] space-y-1">
              <div className="text-[#8B5A2B] font-semibold text-[11px] uppercase tracking-wider">
                Janka Hardness
              </div>
              <div className="font-serif text-base font-bold text-[#38210B] tabular-nums">
                {selectedWood.hardness}
              </div>
              <div className="text-[10px] text-[#523315]/80">Resistance to dents and wear</div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E6D9C5] space-y-1">
              <div className="text-[#8B5A2B] font-semibold text-[11px] uppercase tracking-wider">
                Kiln-Dried Density
              </div>
              <div className="font-serif text-base font-bold text-[#38210B] tabular-nums">
                {selectedWood.density}
              </div>
              <div className="text-[10px] text-[#523315]/80">Heaviness & structural rigidity</div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E6D9C5] space-y-1">
              <div className="text-[#8B5A2B] font-semibold text-[11px] uppercase tracking-wider">
                Natural Oil Content
              </div>
              <div className="font-serif text-base font-bold text-[#38210B]">
                {selectedWood.oilContent}
              </div>
              <div className="text-[10px] text-[#523315]/80">Self-preserving moisture barrier</div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E6D9C5] space-y-1">
              <div className="text-[#8B5A2B] font-semibold text-[11px] uppercase tracking-wider">
                Termite Immunity
              </div>
              <div className="font-serif text-base font-bold text-emerald-800">
                10-Year Guarantee
              </div>
              <div className="text-[10px] text-[#523315]/80">Zero borer degradation</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
