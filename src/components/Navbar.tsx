import React, { useState } from 'react';
import { Page } from '../types';
import { ShoppingBag, Search, Sprout, Terminal, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenDjangoModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDjangoMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenDjangoModal,
  searchQuery,
  onSearchChange,
  isDjangoMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'farms', label: 'Farms' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'profile', label: 'Profile' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9F5]/95 backdrop-blur-md border-b border-[#E3E8DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-sm group-hover:bg-[#21543D] transition-colors">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#1E2922]">
                Farm<span className="text-[#2D6A4F]">Direct</span>
              </span>
              <p className="text-[10px] uppercase font-semibold tracking-wider text-[#6B7C72] hidden sm:block">
                Field to Fork Freshness
              </p>
            </div>
          </button>

          {/* Search Bar (in header like screenshot) */}
          <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9B90]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => {
                  if (currentPage !== 'marketplace') onNavigate('marketplace');
                }}
                placeholder="Search seasonal produce, farms..."
                className="w-full pl-9 pr-4 py-2 bg-white/80 border border-[#D5DDD2] rounded-lg text-sm text-[#1E2922] placeholder:text-[#8C9B90] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C9B90] hover:text-[#1E2922]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'text-[#2D6A4F] bg-[#E8EFE9] font-semibold'
                      : 'text-[#4A5D52] hover:text-[#1E2922] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Django Connector, Cart, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Django Backend Integration Trigger */}
            <button
              onClick={onOpenDjangoModal}
              title="Configure Python Django REST API Connection"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                isDjangoMode
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                  : 'bg-[#F0F3EC] border-[#D5DDD2] text-[#425247] hover:bg-[#E4ECE0]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span className="hidden sm:inline">Django</span>
              <span className={`inline-block w-2 h-2 rounded-full ${isDjangoMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="lg:hidden p-2 text-[#4A5D52] hover:text-[#1E2922] hover:bg-black/5 rounded-lg"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Profile Quick Link */}
            <button
              onClick={() => onNavigate('profile')}
              title="My Account"
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 'profile'
                  ? 'bg-[#E8EFE9] text-[#2D6A4F]'
                  : 'text-[#4A5D52] hover:text-[#1E2922] hover:bg-black/5'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#21543D] text-white px-3.5 py-2 rounded-xl text-sm font-medium shadow-sm transition-all relative"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D90429] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono tabular-nums text-xs font-semibold">
                ${cartTotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A5D52] hover:text-[#1E2922] hover:bg-black/5 rounded-lg"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input expand */}
        {showSearchInput && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9B90]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => {
                  if (currentPage !== 'marketplace') onNavigate('marketplace');
                }}
                placeholder="Search seasonal produce, farms..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#D5DDD2] rounded-lg text-sm text-[#1E2922]"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Nav Links drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E3E8DC] py-3 space-y-1">
            {navLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-[#2D6A4F] text-white' : 'text-[#4A5D52] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
