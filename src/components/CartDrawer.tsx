import React, { useState } from 'react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => Promise<string>;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckoutClick = async () => {
    setIsCheckingOut(true);
    try {
      const orderNum = await onCheckout();
      setCompletedOrderNumber(orderNum);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E8EEE5] flex items-center justify-between bg-[#F8F9F5]">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1E2922]">
                Your Harvest Basket
              </h2>
              <p className="text-xs text-[#6B7C72]">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items from local partner farms
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6B7C72] hover:text-[#1E2922] hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {completedOrderNumber ? (
            /* Checkout success state */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs uppercase font-semibold text-[#2D6A4F] tracking-wider">
                Harvest Order Placed!
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1E2922] mt-1 mb-2">
                {completedOrderNumber}
              </h3>
              <p className="text-sm text-[#5C6E63] max-w-xs mb-6">
                Your order was successfully sent to the growers! Freshly picked produce is scheduled for delivery to your doorstep on Wednesday morning.
              </p>
              <div className="w-full bg-[#F4F7F2] p-4 rounded-xl text-left text-xs space-y-1.5 mb-6 text-[#4A5D52]">
                <div className="flex justify-between">
                  <span>Harvest packing:</span>
                  <span className="font-medium text-[#1E2922]">Tuesday afternoon</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon-neutral transit:</span>
                  <span className="font-medium text-[#1E2922]">Wednesday 7:00 AM - 10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery method:</span>
                  <span className="font-medium text-[#1E2922]">Reusable Chilled Farm Tote</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCompletedOrderNumber(null);
                  onClose();
                }}
                className="w-full py-3 bg-[#2D6A4F] hover:bg-[#21543D] text-white font-medium text-sm rounded-xl transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free delivery bar */}
              <div className="px-6 py-3 bg-[#EDF3EC] border-b border-[#DEE6DB]">
                <div className="flex items-center justify-between text-xs font-medium text-[#2D6A4F] mb-1.5">
                  <span>
                    {amountNeeded === 0
                      ? '🎉 You unlocked Free Farm Delivery!'
                      : `Add $${amountNeeded.toFixed(2)} more for Free Delivery`}
                  </span>
                  <span className="font-mono tabular-nums font-semibold">{progressToFreeShipping.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#D6E3D4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D6A4F] rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#EBEFE8]">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F0F4EE] text-[#6B7C72] flex items-center justify-center mx-auto mb-3">
                      🧺
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1E2922]">
                      Your basket is empty
                    </h3>
                    <p className="text-xs text-[#6B7C72] mt-1 max-w-xs mx-auto">
                      Explore fresh seasonal vegetables, tree-ripened fruits, and pasture eggs directly from family farms.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-4 py-2 bg-[#2D6A4F] text-white text-xs font-semibold rounded-lg hover:bg-[#21543D] transition-colors"
                    >
                      Browse Marketplace
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#E3EAE0]">
                        <ProductImage category={item.product.imageCategory} className="w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#1E2922] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-[#6B7C72] truncate">
                          {item.product.farmName}
                        </p>
                        <div className="text-xs font-mono font-semibold text-[#2D6A4F] mt-0.5">
                          ${item.product.price.toFixed(2)}{' '}
                          <span className="text-[10px] text-[#6B7C72] font-normal">/ {item.product.unit}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D5DDD2] rounded-lg bg-[#FAFBF9]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1.5 text-[#5C6E63] hover:text-[#1E2922]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-mono text-xs font-semibold text-[#1E2922] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1.5 text-[#5C6E63] hover:text-[#1E2922]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#99A69D] hover:text-[#D90429] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#E8EEE5] bg-[#F8F9F5] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#5C6E63]">
                    <div className="flex justify-between">
                      <span>Harvest Subtotal:</span>
                      <span className="font-mono tabular-nums text-[#1E2922]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eco-Chilled Delivery:</span>
                      <span className="font-mono tabular-nums text-[#1E2922]">
                        {shipping === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#1E2922] pt-2 border-t border-[#E0E7DC]">
                      <span>Total Due:</span>
                      <span className="font-mono tabular-nums text-[#2D6A4F] text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 bg-[#2D6A4F] hover:bg-[#21543D] disabled:opacity-50 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    {isCheckingOut ? (
                      <span>Placing Order with Farms...</span>
                    ) : (
                      <>
                        <span>Place Farm-Direct Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B7C72] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>100% Farm Fresh Guarantee · Cancel Anytime</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
