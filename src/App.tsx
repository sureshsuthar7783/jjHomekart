import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ProductModal } from './components/ProductModal';
import { CustomConfigurator } from './components/CustomConfigurator';
import { WholesaleSection } from './components/WholesaleSection';
import { StoreLocatorSection } from './components/StoreLocatorSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ShortlistDrawer } from './components/ShortlistDrawer';
import { MeasurementModal } from './components/MeasurementModal';
import { Footer } from './components/Footer';
import { Product, FURNITURE_PRODUCTS, STORE_INFO } from './data/furnitureData';
import { CustomCursor } from './components/CustomCursor';
import { TactileWoodSelector } from './components/TactileWoodSelector';
import { Phone, MessageSquare, ShoppingBag, Ruler } from 'lucide-react';

interface ShortlistItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [shortlist, setShortlist] = useState<ShortlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('jj_homekart_shortlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Initial friendly default shortlist item
    return [{ product: FURNITURE_PRODUCTS[0], quantity: 1 }];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [isMeasurementOpen, setIsMeasurementOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('catalogue');

  // Persist shortlist
  useEffect(() => {
    try {
      localStorage.setItem('jj_homekart_shortlist', JSON.stringify(shortlist));
    } catch {
      // ignore storage errors
    }
  }, [shortlist]);

  const handleToggleShortlist = (product: Product) => {
    setShortlist((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setShortlist((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as ShortlistItem[]
    );
  };

  const handleRemoveShortlistItem = (productId: string) => {
    setShortlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearShortlist = () => {
    setShortlist([]);
  };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalShortlistCount = shortlist.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24211D]">
      {/* Awwwards-style Custom Cursor */}
      <CustomCursor />

      {/* Header adhering to Top Bar Contract */}
      <Header
        shortlistCount={totalShortlistCount}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onOpenMeasurement={() => setIsMeasurementOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content */}
      <main className="flex-1 pb-16 sm:pb-0">
        {/* Hero Section with 3D Studio & Kinetic Ticker */}
        <Hero
          onExploreCatalog={() => scrollTo('catalogue')}
          onOpenMeasurement={() => setIsMeasurementOpen(true)}
        />

        {/* Furniture Catalog */}
        <CatalogSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          shortlist={shortlist.map((i) => i.product)}
          onToggleShortlist={handleToggleShortlist}
          onOpenCustomConfigurator={() => scrollTo('configurator')}
        />

        {/* 02 · The Material Laboratory: Anatomy of Seasoned Hardwood */}
        <TactileWoodSelector />

        {/* Interactive Dimension & Custom Price Configurator */}
        <CustomConfigurator
          onOpenMeasurement={() => setIsMeasurementOpen(true)}
        />

        {/* Wholesale & B2B Portal for Builders and Designers */}
        <WholesaleSection
          onOpenMeasurement={() => setIsMeasurementOpen(true)}
        />

        {/* Store Location & Commute Route Guide for Ramamurthy Nagar */}
        <StoreLocatorSection />

        {/* Verified Customer Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenMeasurement={() => setIsMeasurementOpen(true)}
        onScrollTo={scrollTo}
      />

      {/* Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isInShortlist={Boolean(selectedProduct && shortlist.some((i) => i.product.id === selectedProduct.id))}
        onToggleShortlist={handleToggleShortlist}
        onOpenMeasurement={() => setIsMeasurementOpen(true)}
      />

      <ShortlistDrawer
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        items={shortlist}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveShortlistItem}
        onClear={handleClearShortlist}
        onOpenMeasurement={() => setIsMeasurementOpen(true)}
      />

      <MeasurementModal
        isOpen={isMeasurementOpen}
        onClose={() => setIsMeasurementOpen(false)}
      />

      {/* Mobile Sticky Quick Action Bar (Under 15% viewport height cap) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#FAF7F2] border-t border-[#E6D9C5] px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${STORE_INFO.rawPhone}`}
          className="flex-1 py-2 px-2 text-center text-xs font-semibold text-[#523315] bg-[#F3ECE1] rounded-lg border border-[#E6D9C5] flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#8B5A2B]" />
          <span>Call Store</span>
        </a>

        <a
          href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent("Hello JJ Homekart! I would like to inquire about your furniture catalog and custom sizes.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-2 text-center text-xs font-semibold text-white bg-[#6D441F] rounded-lg flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#CBB496]" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setIsShortlistOpen(true)}
          className="relative py-2 px-3 text-xs font-semibold text-[#38210B] bg-[#E6D9C5] rounded-lg flex items-center justify-center gap-1"
        >
          <ShoppingBag className="w-4 h-4 text-[#6D441F]" />
          <span>Quote</span>
          {totalShortlistCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#8B5A2B] text-white text-[10px] inline-flex items-center justify-center font-bold">
              {totalShortlistCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
