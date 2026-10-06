import React from 'react';
import { Farm, Product } from '../types';
import { FarmCoverImage, ProductImage } from './ProductImage';
import { X, MapPin, Award, CheckCircle2, Calendar, Sprout, ShoppingBag } from 'lucide-react';

interface FarmDetailModalProps {
  farm: Farm | null;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FarmDetailModal: React.FC<FarmDetailModalProps> = ({
  farm,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!farm) return null;

  const farmProducts = products.filter((p) => p.farmId === farm.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DCE4D8] animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#4A5D52] hover:text-[#1E2922] flex items-center justify-center shadow-md transition-all"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Farm Cover Banner */}
          <FarmCoverImage style={farm.imageStyle} name={farm.name} className="w-full h-56 relative" />

          {/* Body content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E8EEE5]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
                  <Sprout className="w-4 h-4" />
                  <span>Partner Grower Since {farm.establishedYear}</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1E2922] mt-1">
                  {farm.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#6B7C72] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>{farm.location}</span>
                  <span>·</span>
                  <span>{farm.distanceMiles} miles from regional hub</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#F4F7F2] p-3 rounded-xl border border-[#E3EAE0]">
                <div className="w-12 h-12 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xl font-display font-bold">
                  {farm.farmerName[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1E2922]">{farm.farmerName}</div>
                  <div className="text-xs text-[#526359]">{farm.farmerRole}</div>
                  <div className="text-[11px] font-mono text-[#2D6A4F] font-semibold">{farm.acreage} Acres Farmed</div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-2">
                Agronomic Story & Heritage
              </h3>
              <p className="text-sm text-[#4A5D52] leading-relaxed">
                {farm.story}
              </p>
            </div>

            {/* Practices & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FAFBF9] p-4 rounded-xl border border-[#E8EDE4]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E2922] mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Regenerative Practices</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#526359]">
                  {farm.practices.map((practice, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAFBF9] p-4 rounded-xl border border-[#E8EDE4]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E2922] mb-2.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Certifications & Standards</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {farm.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-[#2D6A4F] bg-[#E5EFE9] px-2.5 py-1 rounded-md"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-[#6B7C72] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Next scheduled field harvest: Tomorrow at sunrise</span>
                </div>
              </div>
            </div>

            {/* Available products from this farm */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Harvest Items Available From {farm.name}</span>
                </h3>
                <span className="text-xs text-[#6B7C72]">{farmProducts.length} items</span>
              </div>

              {farmProducts.length === 0 ? (
                <p className="text-xs text-[#6B7C72] italic">
                  Next seasonal batch harvesting soon. Check back shortly!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {farmProducts.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="text-left p-3 rounded-xl border border-[#E2E8DE] hover:border-[#2D6A4F] bg-[#F8F9F5] hover:bg-white transition-all flex items-center gap-3 group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#D5DDD2]">
                        <ProductImage category={prod.imageCategory} className="w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#1E2922] truncate group-hover:text-[#2D6A4F]">
                          {prod.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-[#2D6A4F]">
                          ${prod.price.toFixed(2)}{' '}
                          <span className="text-[10px] font-sans font-normal text-[#6B7C72]">/ {prod.unit}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
