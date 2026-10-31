import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { CUSTOMER_REVIEWS, STORE_INFO } from '../data/furnitureData';

export const ReviewsSection: React.FC = () => {
  const [filterType, setFilterType] = useState('All');

  const filteredReviews = filterType === 'All' 
    ? CUSTOMER_REVIEWS 
    : CUSTOMER_REVIEWS.filter(r => r.purchase.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E6D9C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header with quantitative proof adjacent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-xs uppercase tracking-wider text-[#8B5A2B] font-bold">
              Customer Experiences & Social Proof
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#38210B]">
              Trusted by Homeowners Across Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-[#523315]/85 max-w-xl">
              Real feedback from customers in Ramamurthy Nagar, Kasturi Nagar, Horamavu, Kalyan Nagar, and Whitefield.
            </p>
          </div>

          {/* Rating Summary Block */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E6D9C5] shadow-xs">
            <div className="text-center pr-4 border-r border-[#F3ECE1]">
              <div className="text-3xl font-serif font-bold text-[#38210B] tabular-nums">4.6</div>
              <div className="flex items-center gap-0.5 text-amber-500 mt-0.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-500 text-amber-500' : 'fill-amber-500/40 text-amber-500'}`} 
                  />
                ))}
              </div>
              <div className="text-[10px] text-[#6D441F] mt-1 font-medium">10+ Google Reviews</div>
            </div>

            <div className="text-xs space-y-1">
              <div className="text-[#38210B] font-semibold">Verified Local Business</div>
              <div className="text-[#523315]/80 text-[11px]">Direct Factory Showroom</div>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5A2B] hover:text-[#523315] font-semibold text-[11px] underline underline-offset-2 flex items-center gap-1 mt-1"
              >
                <span>View Google Maps Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[#6D441F] font-semibold">Filter:</span>
          {['All', 'Sofa', 'Wardrobe', 'TV', 'Dining', 'Wholesale'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer border ${
                filterType === cat
                  ? 'bg-[#6D441F] text-white border-[#6D441F] font-medium'
                  : 'bg-white text-[#523315] border-[#E6D9C5] hover:bg-[#F3ECE1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-xl border border-[#E6D9C5] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Author & Locality */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#38210B]">{rev.author}</h4>
                    <div className="text-xs text-[#8B5A2B]">{rev.locality}</div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Purchase product unboxed tag */}
                <div className="text-[11px] font-medium text-[#523315] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E6D9C5]/80">
                  Purchased: <strong className="text-[#38210B]">{rev.purchase}</strong>
                </div>

                {/* Comment quote */}
                <p className="text-xs text-[#523315]/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Date & Verified Badge */}
              <div className="pt-3 border-t border-[#F3ECE1] flex items-center justify-between text-[11px] text-[#6D441F]">
                <span>{rev.date}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Customer</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Review Callout */}
        <div className="bg-[#F3ECE1]/70 p-6 rounded-2xl border border-[#E6D9C5] text-center space-y-3 max-w-xl mx-auto">
          <div className="font-serif text-lg font-bold text-[#38210B]">
            Have You Bought From JJ Homekart?
          </div>
          <p className="text-xs text-[#523315]/85">
            We value honest feedback from every client in Bengaluru. Leave a review on our Google Maps profile or share photos of your completed furniture installation!
          </p>
          <a
            href={STORE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-lg transition-colors shadow-2xs"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-3 h-3 text-[#CBB496]" />
          </a>
        </div>

      </div>
    </section>
  );
};
