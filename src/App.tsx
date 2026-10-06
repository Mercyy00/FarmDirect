/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Page, Product, Farm, SubscriptionPlan, UserSubscription, Order, UserProfile, CartItem } from './types';
import { api, getApiConfig } from './services/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FarmDetailModal } from './components/FarmDetailModal';
import { DjangoIntegrationModal } from './components/DjangoIntegrationModal';

import { HomeView } from './views/HomeView';
import { MarketplaceView } from './views/MarketplaceView';
import { FarmsView } from './views/FarmsView';
import { SubscriptionsView } from './views/SubscriptionsView';
import { ProfileView } from './views/ProfileView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data
  const [products, setProducts] = useState<Product[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Cart & Favorites State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 item for immediate interactive experience
    {
      product: {
        id: 'prod-1',
        name: 'Organic Baby Spinach',
        slug: 'organic-baby-spinach',
        category: 'Vegetables',
        price: 4.50,
        unit: 'bunch (8 oz)',
        farmId: 'farm-highgrove',
        farmName: 'Highgrove Organic Farm',
        description: 'Tender, sweet baby spinach leaves freshly harvested at dawn.',
        organic: true,
        inStock: true,
        rating: 4.9,
        reviewsCount: 38,
        origin: 'Willamette Valley, OR',
        tags: ['Certified Organic', 'No Pesticides'],
        imageCategory: 'spinach',
      },
      quantity: 2,
    },
  ]);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['prod-1', 'prod-3', 'prod-7']));

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isDjangoModalOpen, setIsDjangoModalOpen] = useState(false);

  // Config & Django Mode
  const [apiConfig, setApiConfig] = useState(getApiConfig());

  // Load data on startup
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [prods, frms, plans, sub, ords, prof] = await Promise.all([
        api.getProducts(),
        api.getFarms(),
        api.getSubscriptionPlans(),
        api.getUserSubscription(),
        api.getPastOrders(),
        api.getUserProfile(),
      ]);
      setProducts(prods);
      setFarms(frms);
      setSubscriptionPlans(plans);
      setUserSubscription(sub);
      setOrders(ords);
      setUserProfile(prof);
    } catch (err) {
      console.error('Failed to load application data:', err);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = async (): Promise<string> => {
    const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    const orderPayload: Omit<Order, 'id' | 'orderNumber' | 'date'> = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        unit: item.product.unit,
        farmName: item.product.farmName,
      })),
      subtotal,
      shipping,
      total,
      status: 'Processing',
      deliveryDate: 'Wednesday, Oct 7, 2026',
      shippingAddress: userProfile?.shippingAddress.street || '742 Evergreen Terrace, Springfield, OR',
    };

    const created = await api.createOrder(orderPayload);
    setOrders((prev) => [created, ...prev]);
    setCartItems([]);
    return created.orderNumber;
  };

  const handleToggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleUpdateSubscription = async (updated: Partial<UserSubscription>) => {
    const result = await api.modifySubscription(updated);
    setUserSubscription(result);
  };

  const handleUpdateProfile = async (updated: Partial<UserProfile>) => {
    const result = await api.updateUserProfile(updated);
    setUserProfile(result);
  };

  const cartTotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleConfigChange = () => {
    setApiConfig(getApiConfig());
    loadAllData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F5] text-[#1E2922]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDjangoModal={() => setIsDjangoModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDjangoMode={apiConfig.mode === 'django'}
      />

      {/* Main View Router */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 w-full">
        {currentPage === 'home' && (
          <HomeView
            products={products}
            farms={farms}
            subscriptionPlans={subscriptionPlans}
            onNavigate={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            onSelectFarm={setSelectedFarm}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
          />
        )}

        {currentPage === 'marketplace' && (
          <MarketplaceView
            products={products}
            farms={farms}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentPage === 'farms' && (
          <FarmsView
            farms={farms}
            onSelectFarm={setSelectedFarm}
          />
        )}

        {currentPage === 'subscriptions' && userSubscription && (
          <SubscriptionsView
            subscription={userSubscription}
            plans={subscriptionPlans}
            onUpdateSubscription={handleUpdateSubscription}
          />
        )}

        {currentPage === 'profile' && userProfile && (
          <ProfileView
            profile={userProfile}
            orders={orders}
            products={products}
            farms={farms}
            favoriteIds={favoriteIds}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
            onSelectFarm={setSelectedFarm}
            onToggleFavorite={handleToggleFavorite}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDjangoModal={() => setIsDjangoModalOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        onClearCart={() => setCartItems([])}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFarm={(farmId) => {
          const farm = farms.find((f) => f.id === farmId);
          if (farm) {
            setSelectedFarm(farm);
          }
        }}
      />

      {/* Farm Detail Modal */}
      <FarmDetailModal
        farm={selectedFarm}
        onClose={() => setSelectedFarm(null)}
        products={products}
        onSelectProduct={setSelectedProduct}
      />

      {/* Django Integration Modal */}
      <DjangoIntegrationModal
        isOpen={isDjangoModalOpen}
        onClose={() => setIsDjangoModalOpen(false)}
        onConfigChange={handleConfigChange}
      />
    </div>
  );
}
