import React, { useState } from 'react';
import { UserProfile, Order, Product, Farm } from '../types';
import { ProductImage } from '../components/ProductImage';
import { User, Package, MapPin, Heart, Edit2, Check, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  orders: Order[];
  products: Product[];
  farms: Farm[];
  favoriteIds: Set<string>;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onSelectFarm: (farm: Farm) => void;
  onToggleFavorite: (productId: string) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => Promise<void>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  orders,
  products,
  farms,
  favoriteIds,
  onAddToCart,
  onSelectProduct,
  onSelectFarm,
  onToggleFavorite,
  onUpdateProfile,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [street, setStreet] = useState(profile.shippingAddress.street);
  const [city, setCity] = useState(profile.shippingAddress.city);
  const [state, setState] = useState(profile.shippingAddress.state);
  const [zip, setZip] = useState(profile.shippingAddress.zip);
  const [saving, setSaving] = useState(false);

  const favoriteProducts = products.filter((p) => favoriteIds.has(p.id));

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdateProfile({
        shippingAddress: { street, city, state, zip },
        billingAddress: { street, city, state, zip },
      });
      setIsEditingAddress(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E3E8DC]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Member Account
          </span>
          <h1 className="font-display text-3xl font-bold text-[#1E2922] mt-0.5">
            User Account & Activity
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E63] mt-0.5">
            Manage your personal details, order receipts, saved addresses, and favorite farm staples.
          </p>
        </div>
      </div>

      {/* Account Info Card (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#EDF2EB]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center font-display text-2xl font-bold shadow-md">
              {profile.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold text-[#1E2922]">{profile.name}</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {profile.membershipTier}
                </span>
              </div>
              <p className="text-xs text-[#6B7C72] mt-0.5">
                {profile.email} · {profile.phone}
              </p>
              <p className="text-[11px] text-[#2D6A4F] font-semibold mt-1">
                Active Member Since {profile.memberSince}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#F4F7F2] p-4 rounded-2xl border border-[#E3EAE0]">
            <div className="text-center px-2">
              <div className="font-mono text-xl font-bold text-[#2D6A4F]">
                {profile.carbonOffsetKg} kg
              </div>
              <div className="text-[10px] uppercase font-semibold text-[#6B7C72]">
                CO₂ Offset
              </div>
            </div>
            <div className="h-8 w-px bg-[#D5DDD2]" />
            <div className="text-center px-2">
              <div className="font-mono text-xl font-bold text-[#2D6A4F]">
                {profile.localFarmsSupported}
              </div>
              <div className="text-[10px] uppercase font-semibold text-[#6B7C72]">
                Farms Supported
              </div>
            </div>
          </div>
        </div>

        {/* Address & Payment summaries */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-[#E8EDE4] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Primary Delivery Address
                </span>
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>

              <div className="text-sm font-semibold text-[#1E2922]">
                {profile.shippingAddress.street}
              </div>
              <div className="text-xs text-[#526359]">
                {profile.shippingAddress.city}, {profile.shippingAddress.state} {profile.shippingAddress.zip}
              </div>
              <div className="text-[11px] text-[#6B7C72] mt-2">
                Delivery Instructions: Porch side cooler box behind trellis.
              </div>
            </div>
          </div>

          {/* Billing & Payment */}
          <div className="bg-[#FAFBF9] p-5 rounded-2xl border border-[#E8EDE4]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Payment Method
              </span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                Verified
              </span>
            </div>
            <div className="text-sm font-semibold text-[#1E2922]">
              •••• •••• •••• 4289 (Visa)
            </div>
            <div className="text-xs text-[#526359]">
              Expires 09/28 · Secure Tokenized Checkout
            </div>
            <div className="text-[11px] text-[#6B7C72] mt-2">
              Billing Address: Same as delivery address
            </div>
          </div>
        </div>
      </div>

      {/* Edit Address Modal */}
      {isEditingAddress && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsEditingAddress(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#D5DDD2]">
              <h3 className="font-display text-lg font-bold text-[#1E2922] mb-4">
                Update Delivery Address
              </h3>
              <form onSubmit={handleSaveAddress} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#1E2922] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="text-xs font-semibold text-[#1E2922] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1E2922] block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1E2922] block mb-1">ZIP</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922]"
                    />
                  </div>
                </div>
                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    className="px-4 py-2 border border-[#D5DDD2] rounded-xl text-xs font-semibold text-[#6B7C72]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-xs font-semibold hover:bg-[#21543D]"
                  >
                    {saving ? 'Saving...' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Past Orders Section (Matches Screenshot) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold text-[#1E2922]">
            Past Orders & Invoices
          </h3>
          <span className="text-xs text-[#6B7C72]">{orders.length} orders total</span>
        </div>

        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl p-5 border border-[#E3EAE0] hover:border-[#2D6A4F]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F5F1] text-[#2D6A4F] flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#1E2922]">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7C72] mt-0.5">
                    Placed on {ord.date} · {ord.items.length} items
                  </div>
                  <div className="text-xs text-[#526359] mt-1 line-clamp-1">
                    {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EDF2EB]">
                <div className="text-right">
                  <span className="font-mono text-base font-bold text-[#2D6A4F]">
                    ${ord.total.toFixed(2)}
                  </span>
                  <div className="text-[10px] text-[#8C9B90]">Free Delivery</div>
                </div>

                <button
                  onClick={() => setSelectedOrder(ord)}
                  className="px-3.5 py-2 bg-[#FAFBF9] hover:bg-[#EAEFE8] border border-[#D5DDD2] rounded-xl text-xs font-semibold text-[#2D6A4F] flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Invoice Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-[#D5DDD2]">
              <div className="flex items-center justify-between pb-4 border-b border-[#EDF2EB]">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1E2922]">
                    {selectedOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-[#6B7C72]">Delivered on {selectedOrder.deliveryDate}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-xs text-[#6B7C72] hover:text-[#1E2922] font-semibold"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3 divide-y divide-[#EDF2EB] max-h-60 overflow-y-auto">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#1E2922]">{item.productName}</div>
                      <div className="text-[11px] text-[#6B7C72]">{item.farmName}</div>
                    </div>
                    <div className="text-right font-mono">
                      <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                      <div className="font-semibold text-[#2D6A4F]">${(item.quantity * item.price).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#EDF2EB] space-y-1.5 text-xs text-[#526359]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#1E2922]">${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco-Delivery:</span>
                  <span className="font-mono text-[#1E2922]">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1E2922] pt-2 border-t border-[#EDF2EB]">
                  <span>Total Paid:</span>
                  <span className="font-mono text-[#2D6A4F]">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-[#2D6A4F] text-white text-xs font-semibold rounded-xl"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Section (Matches Screenshot) */}
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-bold text-[#1E2922]">
          Favorite Harvest Items ({favoriteProducts.length})
        </h3>

        {favoriteProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#E3EAE0] text-center text-xs text-[#6B7C72]">
            You haven't bookmarked any favorite produce yet. Click the heart icon on any product to save it here for fast re-ordering.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-4 rounded-2xl border border-[#E3EAE0] flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#D5DDD2]">
                  <ProductImage category={prod.imageCategory} className="w-full h-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#1E2922] truncate">{prod.name}</h4>
                  <p className="text-[11px] text-[#6B7C72] truncate">{prod.farmName}</p>
                  <div className="text-xs font-mono font-bold text-[#2D6A4F] mt-0.5">
                    ${prod.price.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(prod, 1)}
                  className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#21543D] text-white text-xs font-semibold rounded-xl shrink-0 transition-colors"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
