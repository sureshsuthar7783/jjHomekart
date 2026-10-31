import React from 'react';
import { X, Trash2, MessageSquare, ArrowRight, ShoppingBag, ShieldCheck, Check } from 'lucide-react';
import { Product, STORE_INFO } from '../data/furnitureData';
import confetti from 'canvas-confetti';

interface ShortlistItem {
  product: Product;
  quantity: number;
}

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShortlistItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClear: () => void;
  onOpenMeasurement: () => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClear,
  onOpenMeasurement,
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const isWholesaleEligible = totalQuantity >= 3;

  const totalAmount = items.reduce((acc, curr) => {
    const unitPrice = isWholesaleEligible ? curr.product.wholesalePrice : curr.product.retailPrice;
    return acc + unitPrice * curr.quantity;
  }, 0);

  const totalRetailValue = items.reduce((acc, curr) => {
    return acc + curr.product.retailPrice * curr.quantity;
  }, 0);

  const totalSavings = totalRetailValue - totalAmount;

  // Build formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `Hello JJ Homekart! I created an itemized furniture quotation on your website:\n\n`;
    items.forEach((item, idx) => {
      const price = isWholesaleEligible ? item.product.wholesalePrice : item.product.retailPrice;
      msg += `${idx + 1}. *${item.product.name}*\n   - Qty: ${item.quantity}\n   - Rate: ₹${price.toLocaleString('en-IN')}\n   - Model: ${item.product.id}\n\n`;
    });

    msg += `*Total Units:* ${totalQuantity}\n`;
    msg += `*Pricing Tier:* ${isWholesaleEligible ? 'Wholesale Bulk Tier (3+ items)' : 'Direct Factory Rate'}\n`;
    msg += `*Estimated Total:* ₹${totalAmount.toLocaleString('en-IN')}\n`;
    if (totalSavings > 0) {
      msg += `*Total Savings:* ₹${totalSavings.toLocaleString('en-IN')}\n`;
    }
    msg += `\nPlease confirm availability and delivery timeline to my address in Bengaluru.`;
    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E6D9C5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E6D9C5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B5A2B]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#38210B]">
                Furniture Quote Shortlist
              </h3>
              <div className="text-xs text-[#6D441F]">
                {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} selected
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#523315] hover:bg-[#F3ECE1] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wholesale Tier Alert */}
        {isWholesaleEligible ? (
          <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-2.5 text-xs text-emerald-800 flex items-center justify-between">
            <span className="font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Wholesale Bulk Pricing Unlocked (3+ units)!</span>
            </span>
            <span className="font-bold tabular-nums">Save ₹{totalSavings.toLocaleString('en-IN')}</span>
          </div>
        ) : (
          <div className="bg-[#F3ECE1] border-b border-[#E6D9C5] px-5 py-2 text-xs text-[#523315] flex items-center justify-between">
            <span>Add {3 - totalQuantity} more items to unlock wholesale rates</span>
            <span className="text-[#8B5A2B] font-semibold text-[11px]">Save up to 25%</span>
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#CBB496]" />
              <div className="font-serif text-lg font-bold text-[#38210B]">Your Shortlist is Empty</div>
              <p className="text-xs text-[#523315]/80 max-w-xs mx-auto">
                Browse our handcrafted catalog and click "Add to Quote" to build your custom furniture estimation.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold bg-[#6D441F] text-white rounded-lg hover:bg-[#523315] cursor-pointer"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => {
              const currentPrice = isWholesaleEligible ? product.wholesalePrice : product.retailPrice;
              return (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-xl border border-[#E6D9C5] shadow-2xs flex gap-3 items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-[#F3ECE1] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-[#38210B] truncate">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-[#8B5A2B] truncate">
                      {product.dimensions.split('·')[0]}
                    </div>
                    <div className="text-xs font-serif font-bold text-[#38210B] tabular-nums">
                      ₹{(currentPrice * quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E6D9C5] rounded-lg overflow-hidden bg-[#FAF7F2]">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#523315] hover:bg-[#E6D9C5] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-[#38210B]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-0.5 text-xs text-[#523315] hover:bg-[#E6D9C5] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#8B5A2B] hover:text-red-700 p-1 cursor-pointer transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E6D9C5] bg-white space-y-4">
            
            {/* Totals */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#523315]">
                <span>Catalogue Base Price:</span>
                <span className="tabular-nums">₹{totalRetailValue.toLocaleString('en-IN')}</span>
              </div>
              {isWholesaleEligible && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Wholesale Discount:</span>
                  <span className="tabular-nums">-₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#F3ECE1] flex justify-between items-baseline text-[#38210B]">
                <span className="font-bold text-sm">Estimated Total:</span>
                <span className="font-serif text-xl font-bold tabular-nums">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <a
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    confetti({
                      particleCount: 60,
                      spread: 70,
                      origin: { y: 0.7 },
                      colors: ['#8B5A2B', '#CBB496', '#6D441F', '#F3ECE1']
                    });
                  } catch {}
                }}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#6D441F] hover:bg-[#523315] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#CBB496]" />
                <span>Send Quotation to JJ Homekart on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenMeasurement();
                  }}
                  className="py-2 text-xs font-medium text-[#523315] bg-[#FAF7F2] hover:bg-[#E6D9C5] border border-[#E6D9C5] rounded-lg transition-colors cursor-pointer text-center"
                >
                  Book Measurement
                </button>

                <button
                  onClick={onClear}
                  className="py-2 text-xs font-medium text-[#8B5A2B] hover:text-[#523315] rounded-lg transition-colors cursor-pointer text-center"
                >
                  Clear Shortlist
                </button>
              </div>
            </div>

            <div className="text-[10px] text-center text-[#6D441F]/80">
              *Delivery charges and customized Bangalore floor plan alterations confirmed via WhatsApp.
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
