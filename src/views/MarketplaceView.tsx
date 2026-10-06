import React, { useState, useMemo } from 'react';
import { Product, Farm } from '../types';
import { ProductImage } from '../components/ProductImage';
import { Heart, SlidersHorizontal, ArrowUpDown, Check, RefreshCw } from 'lucide-react';

interface MarketplaceViewProps {
  products: Product[];
  farms: Farm[];
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  favoriteIds: Set<string>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  products,
  farms,
  onAddToCart,
  onSelectProduct,
  onToggleFavorite,
  favoriteIds,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFarmId, setSelectedFarmId] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(25);
  const [onlyOrganic, setOnlyOrganic] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Meat & Poultry', 'Bakery & Pantry'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedFarmId !== 'All' && p.farmId !== selectedFarmId) return false;
        if (p.price > maxPrice) return false;
        if (onlyOrganic && !p.organic) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchFarm = p.farmName.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchFarm && !matchDesc && !matchTag) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default order
      });
  }, [products, selectedCategory, selectedFarmId, maxPrice, onlyOrganic, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedFarmId('All');
    setMaxPrice(25);
    setOnlyOrganic(false);
    onSearchChange('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E3E8DC]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Direct From 5 Regional Farms
          </span>
          <h1 className="font-display text-3xl font-bold text-[#1E2922] mt-0.5">
            Product Listings
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E63] mt-0.5">
            Showing {filteredProducts.length} farm-harvested seasonal items
          </p>
        </div>

        {/* Search, Sort and Mobile Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-[#D5DDD2] rounded-xl text-xs font-semibold text-[#1E2922]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-[#D5DDD2] px-3 py-2 rounded-xl text-xs text-[#1E2922]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#6B7C72]" />
            <span className="text-[#6B7C72]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Fresh</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Filters + Right Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } md:block md:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-[#E3EAE0] shadow-xs`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EDF2EB]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E2922]">
              Filters & Categories
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#2D6A4F] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1E2922] block">Department</label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#E5EFE9] text-[#2D6A4F] font-bold'
                      : 'text-[#4A5D52] hover:bg-[#F4F7F2]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3 h-3 text-[#2D6A4F]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Farm Source Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EDF2EB]">
            <label className="text-xs font-semibold text-[#1E2922] block">Partner Farm</label>
            <select
              value={selectedFarmId}
              onChange={(e) => setSelectedFarmId(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F9F5] border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
            >
              <option value="All">All Partner Farms</option>
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-3 border-t border-[#EDF2EB]">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#1E2922]">Max Price</span>
              <span className="font-mono font-bold text-[#2D6A4F]">${maxPrice}.00</span>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#2D6A4F] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C9B90] font-mono">
              <span>$3.00</span>
              <span>$25.00+</span>
            </div>
          </div>

          {/* Organic Only Toggle */}
          <div className="pt-3 border-t border-[#EDF2EB]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1E2922] select-none">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={(e) => setOnlyOrganic(e.target.checked)}
                className="rounded text-[#2D6A4F] focus:ring-[#2D6A4F] w-4 h-4"
              />
              <span className="font-medium">100% Certified Organic Only</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#E3EAE0] text-center space-y-3">
              <div className="text-3xl">🌱</div>
              <h3 className="font-display text-lg font-bold text-[#1E2922]">
                No harvest items match your criteria
              </h3>
              <p className="text-xs text-[#6B7C72] max-w-sm mx-auto">
                Try widening your price range or clearing category filters to view other fresh seasonal produce.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-[#2D6A4F] text-white text-xs font-semibold rounded-xl hover:bg-[#21543D]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const isFav = favoriteIds.has(product.id);
                const isJustAdded = addedId === product.id;

                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="bg-white rounded-2xl border border-[#E3EAE0] p-4 flex flex-col justify-between hover:shadow-md hover:border-[#2D6A4F]/40 transition-all cursor-pointer group"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                        <ProductImage category={product.imageCategory} className="w-full h-full" alt={product.name} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(product.id);
                          }}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs transition-colors"
                          aria-label="Toggle favorite"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-[#D90429] text-[#D90429]' : 'text-[#6B7C72]'}`} />
                        </button>
                      </div>

                      {/* Origin & Title */}
                      <div className="text-[11px] font-semibold text-[#2D6A4F] uppercase tracking-wider truncate">
                        {product.farmName}
                      </div>
                      <h3 className="text-base font-bold text-[#1E2922] mt-0.5 group-hover:text-[#2D6A4F] transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6B7C72] line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Cart button */}
                    <div className="mt-4 pt-3 border-t border-[#EDF2EB] flex items-center justify-between">
                      <div>
                        <span className="text-base font-mono font-bold text-[#1E2922]">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-[#6B7C72] ml-1">/ {product.unit}</span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                          isJustAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#2D6A4F] hover:bg-[#21543D] text-white shadow-xs'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added!
                          </>
                        ) : (
                          <span>+ Add to Cart</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
