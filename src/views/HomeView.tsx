import React from 'react';
import { Product, Farm, SubscriptionPlan, Page } from '../types';
import { ProductImage } from '../components/ProductImage';
import { ArrowRight, Sprout, Check, ShieldCheck, Truck, Heart } from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  farms: Farm[];
  subscriptionPlans: SubscriptionPlan[];
  onNavigate: (page: Page) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onSelectFarm: (farm: Farm) => void;
  onToggleFavorite: (productId: string) => void;
  favoriteIds: Set<string>;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  farms,
  subscriptionPlans,
  onNavigate,
  onAddToCart,
  onSelectProduct,
  onSelectFarm,
  onToggleFavorite,
  favoriteIds,
}) => {
  const seasonalProduce = products.slice(0, 6);
  const featuredFarms = farms.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1E3F30] text-white shadow-xl">
        {/* Subtle organic pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D6A4F]/60 border border-[#52B788]/30 text-xs font-semibold text-[#95D5B2]">
              <Sprout className="w-3.5 h-3.5" />
              <span>Direct Farm-to-Table Community</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Fresh From the Farm, <br />
              <span className="text-[#74C69D]">to Your Door.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#C7DACF] max-w-xl leading-relaxed">
              Skip industrial warehouse storage. Savor certified organic vegetables, pasture-raised meats, and tree-ripened fruit harvested within 24 hours of delivery.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('marketplace')}
                className="px-6 py-3.5 bg-[#52B788] hover:bg-[#40916C] text-[#12241B] font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-[#52B788]/20 transition-all hover:translate-y-[-1px]"
              >
                <span>Shop Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('subscriptions')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors"
              >
                Explore Weekly Boxes
              </button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-[#A8C2B3]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#74C69D] shrink-0" />
                <span>100% Organic & Non-GMO</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#74C69D] shrink-0" />
                <span>Harvested within 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#74C69D] shrink-0" />
                <span>Fair Living Pay for Farmers</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Illustrated Produce Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#132A20] p-6 rounded-2xl border border-[#2F5241] shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#244334] text-xs">
                <span className="font-display font-semibold text-white">Today's Harvest Highlights</span>
                <span className="text-[#74C69D] font-mono">Willamette & Sonoma</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div
                  onClick={() => onSelectProduct(products[0])}
                  className="p-3 bg-[#1A382B] rounded-xl border border-[#2D5640] cursor-pointer hover:border-[#52B788] transition-all group"
                >
                  <div className="h-24 rounded-lg overflow-hidden mb-2">
                    <ProductImage category="spinach" className="w-full h-full" />
                  </div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#74C69D] truncate">
                    Organic Spinach
                  </div>
                  <div className="text-xs font-mono font-bold text-[#74C69D] mt-0.5">$4.50</div>
                </div>

                <div
                  onClick={() => onSelectProduct(products[1])}
                  className="p-3 bg-[#1A382B] rounded-xl border border-[#2D5640] cursor-pointer hover:border-[#52B788] transition-all group"
                >
                  <div className="h-24 rounded-lg overflow-hidden mb-2">
                    <ProductImage category="apples" className="w-full h-full" />
                  </div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#74C69D] truncate">
                    Honeycrisp Apples
                  </div>
                  <div className="text-xs font-mono font-bold text-[#74C69D] mt-0.5">$3.80</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#244334] flex items-center justify-between text-[11px] text-[#A8C2B3]">
                <span>Picked this morning at dawn</span>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="text-[#74C69D] hover:underline font-semibold flex items-center gap-1"
                >
                  View all 12 items <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Seasonal Produce Section (Matches Screenshot) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#2D6A4F]">
              Direct From Field
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1E2922] mt-1">
              Seasonal Produce
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E63] mt-1">
              Peak flavor, harvested at physiological ripeness without artificial refrigeration delay.
            </p>
          </div>

          <button
            onClick={() => onNavigate('marketplace')}
            className="text-xs font-bold text-[#2D6A4F] hover:text-[#194331] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explore All Marketplace Listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalProduce.map((product) => {
            const isFav = favoriteIds.has(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E3EAE0] p-4 flex flex-col justify-between hover:shadow-md hover:border-[#2D6A4F]/40 transition-all group"
              >
                <div>
                  {/* Image with favorite button */}
                  <div
                    className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <ProductImage category={product.imageCategory} className="w-full h-full" alt={product.name} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs transition-colors"
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-[#D90429] text-[#D90429]' : 'text-[#6B7C72]'}`} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="mt-3.5">
                    <div className="text-[11px] font-semibold text-[#2D6A4F] uppercase tracking-wider">
                      {product.farmName}
                    </div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-[#1E2922] mt-0.5 cursor-pointer hover:text-[#2D6A4F] transition-colors truncate"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6B7C72] line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-4 pt-3 border-t border-[#EDF2EB] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-mono font-bold text-[#1E2922]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#6B7C72] ml-1">/ {product.unit}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="px-3.5 py-2 bg-[#2D6A4F] hover:bg-[#21543D] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>+ Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Farms Section (Matches Screenshot) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#2D6A4F]">
              Meet The Growers
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1E2922] mt-1">
              Featured Farms
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E63] mt-1">
              Independent multi-generational family farms cultivating regenerative soil health.
            </p>
          </div>

          <button
            onClick={() => onNavigate('farms')}
            className="text-xs font-bold text-[#2D6A4F] hover:text-[#194331] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Partner Farms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFarms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white rounded-2xl border border-[#E3EAE0] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#2D6A4F]/40 transition-all"
            >
              <div>
                {/* Visual Farm Banner */}
                <div className="h-40 relative bg-gradient-to-br from-[#2D6A4F] to-[#52B788] p-4 text-white flex flex-col justify-end">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-100 font-semibold">
                    {farm.location}
                  </div>
                  <h3 className="font-display text-xl font-bold">{farm.name}</h3>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E5EFE9] text-[#2D6A4F] font-display font-bold flex items-center justify-center shrink-0">
                      {farm.farmerName[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E2922]">{farm.farmerName}</div>
                      <div className="text-[11px] text-[#6B7C72]">{farm.farmerRole}</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#526359] leading-relaxed line-clamp-3">
                    {farm.story}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {farm.crops.slice(0, 3).map((crop, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-[#2D6A4F] bg-[#F0F5F1] px-2 py-0.5 rounded"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectFarm(farm)}
                  className="w-full py-2.5 bg-[#FAFBF9] hover:bg-[#EAEFE8] border border-[#D5DDD2] text-[#2D6A4F] font-semibold text-xs rounded-xl transition-colors"
                >
                  Visit Farm & View Harvest
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Subscription Plans (Matches Screenshot) */}
      <section className="bg-[#FAFBF8] rounded-3xl p-8 sm:p-12 border border-[#E3EAE0] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#2D6A4F]">
            Farm to Door Subscriptions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2922]">
            Harvest Subscription Plans
          </h2>
          <p className="text-sm text-[#5C6E63]">
            Customizable delivery, zero commitments, pause or skip anytime with 1-click in your account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-white border-2 border-[#2D6A4F] shadow-lg relative'
                  : 'bg-white border border-[#DCE4D8] hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2D6A4F] text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1E2922]">{plan.title}</h3>
                  <p className="text-xs text-[#6B7C72] mt-1">{plan.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-[#2D6A4F]">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#6B7C72]">/ {plan.frequency.toLowerCase()}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#4A5D52] pt-2 border-t border-[#EDF2EB]">
                  {plan.itemsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('subscriptions')}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                    plan.popular
                      ? 'bg-[#2D6A4F] hover:bg-[#21543D] text-white shadow-sm'
                      : 'bg-[#F0F4EE] hover:bg-[#E2ECE0] text-[#1E2922]'
                  }`}
                >
                  Select Plan & Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
