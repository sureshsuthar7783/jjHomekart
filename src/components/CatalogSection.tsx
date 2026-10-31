import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, Check } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { FURNITURE_PRODUCTS, Product } from '../data/furnitureData';

interface CatalogSectionProps {
  onSelectProduct: (product: Product) => void;
  shortlist: Product[];
  onToggleShortlist: (product: Product) => void;
  onOpenCustomConfigurator: () => void;
}

const CATEGORIES = [
  'All Furniture',
  'Living Room',
  'Bedroom',
  'Storage & Accents',
  'Study & Office',
  'Kitchen & Dining',
] as const;

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectProduct,
  shortlist,
  onToggleShortlist,
  onOpenCustomConfigurator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Furniture');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWholesaleView, setIsWholesaleView] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return FURNITURE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Furniture' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.woodType.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const shortlistIds = useMemo(() => new Set(shortlist.map((p) => p.id)), [shortlist]);

  return (
    <section id="catalogue" className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E6D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
              Factory Showroom Catalogue
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#38210B]">
              Handcrafted Solid Wood Furniture
            </h2>
            <p className="text-sm text-[#523315]/80 max-w-xl">
              Manufactured with seasoned Teakwood, Indian Sheesham, and BWP Marine Plywood. Need specific sizes? We customize all dimensions.
            </p>
          </div>

          {/* Pricing Mode Toggle: Retail vs Wholesale */}
          <div className="flex items-center gap-2 p-1 bg-[#F3ECE1] rounded-lg border border-[#E6D9C5] self-start md:self-auto">
            <button
              onClick={() => setIsWholesaleView(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                !isWholesaleView
                  ? 'bg-white text-[#38210B] shadow-xs'
                  : 'text-[#6D441F] hover:text-[#38210B]'
              }`}
            >
              Retail Showroom
            </button>
            <button
              onClick={() => setIsWholesaleView(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                isWholesaleView
                  ? 'bg-[#6D441F] text-white shadow-xs'
                  : 'text-[#6D441F] hover:text-[#38210B]'
              }`}
            >
              <span>Wholesale (3+ Units)</span>
              <span className="text-[10px] text-[#CBB496] font-normal">Save 20-30%</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Category Tabs + Search Input */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#6D441F] text-white border-[#6D441F]'
                        : 'bg-white text-[#523315] border-[#E6D9C5] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sofa, wardrobe, shoe rack..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E6D9C5] rounded-lg text-[#38210B] placeholder-[#8B5A2B]/50 focus:outline-none focus:border-[#8B5A2B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B5A2B] hover:text-[#38210B] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Active filter count and custom banner */}
          <div className="flex items-center justify-between text-xs text-[#6D441F] pt-1">
            <span>
              Showing <strong className="text-[#38210B]">{filteredProducts.length}</strong> handcrafted designs
              {selectedCategory !== 'All Furniture' && ` in ${selectedCategory}`}
            </span>
            <button
              onClick={onOpenCustomConfigurator}
              className="text-[#8B5A2B] hover:text-[#523315] underline underline-offset-2 font-medium cursor-pointer flex items-center gap-1"
            >
              <span>Can't find exact size? Calculate custom price</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWholesaleView={isWholesaleView}
                isInShortlist={shortlistIds.has(product.id)}
                onToggleShortlist={onToggleShortlist}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E6D9C5] p-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F3ECE1] flex items-center justify-center text-[#8B5A2B]">
              <Search className="w-6 h-6" />
            </div>
            <div className="font-serif text-lg font-bold text-[#38210B]">
              No exact furniture match for "{searchQuery}"
            </div>
            <p className="text-xs text-[#523315]/80 max-w-md mx-auto">
              As direct manufacturers, we build custom furniture to your exact design and measurements. Tell us what you need!
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Furniture');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#F3ECE1] text-[#38210B] rounded-lg hover:bg-[#E6D9C5] cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenCustomConfigurator}
                className="px-4 py-2 text-xs font-semibold bg-[#6D441F] text-white rounded-lg hover:bg-[#523315] cursor-pointer"
              >
                Open Custom Sizing Tool
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
