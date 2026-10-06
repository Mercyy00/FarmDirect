import React, { useState } from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, Star, MapPin, Sprout, Plus, Minus, Check, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewFarm: (farmId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFarm,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DCE4D8] animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#4A5D52] hover:text-[#1E2922] flex items-center justify-center shadow-md transition-all"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual preview */}
            <div className="bg-[#F4F7F2] p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-[#E8EEE5]">
              <div className="w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden shadow-inner border border-[#D5DDD2]">
                <ProductImage category={product.imageCategory} className="w-full h-full" alt={product.name} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium text-[#2D6A4F] bg-[#E3EFE8] px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info and purchase module */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7C72] mb-1">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-600 font-medium">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-[#8C9B90]">({product.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-[#1E2922] leading-tight">
                  {product.name}
                </h2>

                <div className="mt-2 text-xl font-mono font-bold text-[#2D6A4F]">
                  ${product.price.toFixed(2)}{' '}
                  <span className="text-xs font-sans text-[#6B7C72] font-normal">/ {product.unit}</span>
                </div>

                {/* Farm Origin badge */}
                <div className="mt-4 p-3 bg-[#F8F9F5] border border-[#E3EAE0] rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#2D6A4F] font-semibold">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>{product.farmName}</span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onViewFarm(product.farmId);
                      }}
                      className="text-[11px] font-medium text-[#2D6A4F] hover:underline flex items-center gap-0.5"
                    >
                      Farm Story <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#6B7C72] mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{product.origin}</span>
                    {product.harvestDate && (
                      <>
                        <span>·</span>
                        <span>{product.harvestDate}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs text-[#526359] leading-relaxed">
                  {product.description}
                </p>

                {/* Nutrition details */}
                {product.nutrition && (
                  <div className="mt-4 pt-4 border-t border-[#EAEFE8] text-xs">
                    <span className="text-[11px] font-semibold text-[#1E2922] uppercase tracking-wider block mb-1">
                      Nutritional Profile
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[#526359]">
                      {product.calories && <div>Calories: <strong className="text-[#1E2922]">{product.calories}</strong></div>}
                      {product.nutrition.protein && <div>Protein: <strong className="text-[#1E2922]">{product.nutrition.protein}</strong></div>}
                      {product.nutrition.fiber && <div>Fiber: <strong className="text-[#1E2922]">{product.nutrition.fiber}</strong></div>}
                      {product.nutrition.vitamins && (
                        <div className="col-span-2 text-[11px] text-[#6B7C72]">
                          Rich in: {product.nutrition.vitamins.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase action */}
              <div className="mt-6 pt-4 border-t border-[#EAEFE8] flex items-center gap-3">
                <div className="flex items-center border border-[#D5DDD2] rounded-xl bg-[#FAFBF9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#5C6E63] hover:text-[#1E2922]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-mono font-semibold text-sm tabular-nums text-[#1E2922]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#5C6E63] hover:text-[#1E2922]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#2D6A4F] hover:bg-[#21543D] text-white shadow-sm'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <span>Add to Basket · ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
