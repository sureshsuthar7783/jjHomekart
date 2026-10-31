import React from 'react';
import { Plus, Check, Eye, Ruler, Shield, MessageSquare } from 'lucide-react';
import { Product, STORE_INFO } from '../data/furnitureData';

interface ProductCardProps {
  product: Product;
  isWholesaleView: boolean;
  isInShortlist: boolean;
  onToggleShortlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWholesaleView,
  isInShortlist,
  onToggleShortlist,
  onSelectProduct,
}) => {
  const displayPrice = isWholesaleView ? product.wholesalePrice : product.retailPrice;

  return (
    <article className="group bg-white rounded-xl border border-[#E6D9C5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Container */}
      <div 
        className="relative aspect-[4/3] bg-[#F3ECE1] overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet in-stock / warranty micro tag (unboxed text style) */}
        <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-[#523315] border border-[#E6D9C5]/80">
          {product.warranty}
        </div>

        {/* Quick View Hover Affordance */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-3.5 py-1.5 bg-white/95 text-[#38210B] text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 hover:bg-white transition-all transform translate-y-1 group-hover:translate-y-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>View Details & Specs</span>
          </button>
        </div>
      </div>

      {/* Product Content & Typography */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Wood Type (clean unboxed metadata with separators) */}
          <div className="flex items-center gap-1.5 text-xs text-[#8B5A2B] font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-[#CBB496]">·</span>
            <span className="truncate">{product.woodType.split('&')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg font-bold text-[#38210B] hover:text-[#8B5A2B] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Standard Dimensions */}
          <div className="flex items-center gap-1 text-xs text-[#6D441F]/80">
            <Ruler className="w-3.5 h-3.5 text-[#CBB496] shrink-0" />
            <span className="truncate">{product.dimensions}</span>
          </div>

          {/* Key Feature Preview */}
          <p className="text-xs text-[#523315]/85 line-clamp-2 leading-relaxed pt-1">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#F3ECE1] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[11px] text-[#6D441F] uppercase tracking-wider font-medium">
                {isWholesaleView ? "Wholesale (3+ Units)" : "Direct Factory Price"}
              </div>
              <div className="text-xl font-serif font-bold text-[#38210B] tabular-nums">
                ₹{displayPrice.toLocaleString('en-IN')}
                <span className="text-xs font-sans font-normal text-[#6D441F] ml-1">
                  {isWholesaleView ? "/ unit" : "incl. GST"}
                </span>
              </div>
            </div>

            {isWholesaleView && (
              <div className="text-right">
                <div className="text-[10px] text-[#6D441F]/80 line-through tabular-nums">
                  MRP ₹{product.retailPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">
                  Save ₹{(product.retailPrice - product.wholesalePrice).toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>

          {/* Buttons: Shortlist + WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onToggleShortlist(product)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isInShortlist
                  ? "bg-[#E6D9C5] text-[#38210B] border border-[#CBB496]"
                  : "bg-[#F3ECE1] hover:bg-[#E6D9C5] text-[#523315]"
              }`}
            >
              {isInShortlist ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>In Shortlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Add to Quote</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(
                `Hello JJ Homekart! I am interested in "${product.name}" (Model ID: ${product.id}). Standard dimensions: ${product.dimensions}. Can you share current lead time and custom finishes?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#CBB496]" />
              <span>Ask Price</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
