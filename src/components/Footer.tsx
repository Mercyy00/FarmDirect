import React, { useState } from 'react';
import { Page } from '../types';
import { Sprout, Check, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onOpenDjangoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDjangoModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#193226] text-[#E0EBE4] mt-24 border-t border-[#264434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#52B788] text-[#193226] flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Farm<span className="text-[#74C69D]">Direct</span>
              </span>
            </div>
            <p className="text-sm text-[#A8C2B3] max-w-sm leading-relaxed">
              Bridging local family farms and conscious kitchens. Pure organic produce, pasture-raised meats, and artisanal staples delivered within 24 hours of harvest.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#74C69D] mb-2">
                Seasonal Harvest Newsletter
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#95D5B2] bg-[#214333] px-3 py-2 rounded-lg">
                  <Check className="w-4 h-4" /> You're on the seasonal harvest dispatch list!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3.5 py-2 bg-[#12241B] border border-[#2B4B3B] rounded-lg text-sm text-white placeholder:text-[#6C8577] focus:outline-none focus:ring-1 focus:ring-[#74C69D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#52B788] hover:bg-[#40916C] text-[#12241B] font-semibold text-sm rounded-lg flex items-center gap-1 transition-colors"
                  >
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav: Marketplace */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#74C69D] mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8C2B3]">
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">
                  Seasonal Produce
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">
                  Grass-Fed Meats
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">
                  Pasture Eggs & Dairy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">
                  Artisan Sourdough & Honey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subscriptions')} className="hover:text-white transition-colors">
                  Weekly Veggie Box
                </button>
              </li>
            </ul>
          </div>

          {/* Nav: Farms & Learn */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#74C69D] mb-4">
              Farms & Learn
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8C2B3]">
              <li>
                <button onClick={() => onNavigate('farms')} className="hover:text-white transition-colors">
                  Partner Farm Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('farms')} className="hover:text-white transition-colors">
                  Farm Stories & Soil Tour
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Agronomy Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Carbon Sequestration
                </button>
              </li>
            </ul>
          </div>

          {/* Nav: Account & Django */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#74C69D] mb-4">
              Account & Tech
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8C2B3]">
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-white transition-colors">
                  User Account & Orders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subscriptions')} className="hover:text-white transition-colors">
                  Delivery Schedule & Pause
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Help & FAQs
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenDjangoModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#244634] text-[#95D5B2] hover:bg-[#2D5640] text-xs font-mono transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Django Backend Spec
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="mt-12 pt-8 border-t border-[#244334] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F9A8A]">
          <div>
            © 2026 FarmDirect Inc. All rights reserved. Connecting independent agriculture with conscious homes.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Farmer Cooperative Agreement</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
