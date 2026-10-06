import React from 'react';
import { TEAM_MEMBERS } from '../data/mockData';
import { Sprout, HeartHandshake, ShieldCheck, Sun, ArrowRight, Award } from 'lucide-react';
import { Page } from '../types';

interface AboutViewProps {
  onNavigate: (page: Page) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Mission Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] px-3 py-1 rounded-full bg-[#E8EFE9]">
          Our Agronomic Mission
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1E2922] leading-tight">
          Bridging the distance between regenerative growers and your kitchen table.
        </h1>
        <p className="text-base sm:text-lg text-[#526359] leading-relaxed">
          The modern grocery industrial complex moves food an average of 1,500 miles, sitting in refrigerated ethylene chambers for up to 14 days. FarmDirect was founded to restore the direct bond: field-harvested crops, delivered within 24 hours.
        </p>
      </section>

      {/* 2. About Us & Founder Story (Matches Screenshot) */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3EAE0] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
              The FarmDirect Origin
            </span>
            <h2 className="font-display text-3xl font-bold text-[#1E2922]">
              Founded by Soil Ecologists & Multi-Generational Farmers
            </h2>
            <p className="text-sm text-[#4A5D52] leading-relaxed">
              In 2021, while conducting soil microbiome research in the Willamette Valley, our founders noticed a recurring heartbreak: small family farmers with the richest, most ecologically vibrant heirloom produce were receiving pennies on the dollar from wholesale middlemen.
            </p>
            <p className="text-sm text-[#4A5D52] leading-relaxed">
              We asked a simple question: What if technology could connect families directly with local growers, giving farmers 85% of retail price while giving consumers produce harvested that very morning? Today, FarmDirect empowers 52 family farms across Oregon, Washington, California, New York, and Pennsylvania.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#F4F7F2] rounded-xl border border-[#E3EAE0]">
                <div className="font-bold text-[#1E2922] text-sm">85% Revenue Share</div>
                <div className="text-[#6B7C72]">Goes directly back to the farming family</div>
              </div>
              <div className="p-3 bg-[#F4F7F2] rounded-xl border border-[#E3EAE0]">
                <div className="font-bold text-[#1E2922] text-sm">&lt; 24h From Soil</div>
                <div className="text-[#6B7C72]">Preserving 40% more natural vitamin density</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-[#D5DDD2] shadow-lg bg-gradient-to-br from-[#2D6A4F] to-[#52B788] p-6 text-white text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl shadow-inner">
                👩‍🌾
              </div>
              <div className="font-display text-2xl font-bold">
                "Healthy soil produces healthy plants. Healthy plants nourish healthy families."
              </div>
              <div className="text-xs text-emerald-100 font-medium">
                — Maya Lin-Peterson, Co-Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works (4 Steps diagram from Screenshot) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Transparent Supply Chain
          </span>
          <h2 className="font-display text-3xl font-bold text-[#1E2922]">
            How FarmDirect Works
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E63]">
            From dawn field harvest to your porch in four intentional steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E3EAE0] space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#2D6A4F] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-display text-base font-bold text-[#1E2922]">
              Dawn Harvesting
            </h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              Growers pick crops at physiological maturity when natural sugars and mineral profiles are at their absolute peak.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E3EAE0] space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#2D6A4F] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-display text-base font-bold text-[#1E2922]">
              Eco-Sorting & Packing
            </h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              Harvest is sorted at regional aggregation centers and packed into reusable chilled containers with biodegradable cold-packs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E3EAE0] space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#2D6A4F] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-display text-base font-bold text-[#1E2922]">
              Carbon-Neutral Transit
            </h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              Our electric delivery vans follow optimized cluster routes, delivering straight to your doorstep before mid-day.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E3EAE0] space-y-3 relative shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE9] text-[#2D6A4F] flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-display text-base font-bold text-[#1E2922]">
              Kitchen Table Delight
            </h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              You cook nourishing, vibrant meals with produce that stays crisp in your refrigerator for over two weeks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Team Members (Matches Screenshot) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            The Stewards
          </span>
          <h2 className="font-display text-3xl font-bold text-[#1E2922]">
            Meet Our Leadership Team
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E63]">
            Dedicated agronomists, logistics veterans, and culinary advocates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-[#E3EAE0] flex flex-col justify-between shadow-xs hover:border-[#2D6A4F]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#F0F5F1] text-3xl flex items-center justify-center mx-auto shadow-inner">
                  {member.avatar}
                </div>
                <div className="text-center">
                  <h3 className="font-display text-base font-bold text-[#1E2922]">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#2D6A4F] mt-0.5">
                    {member.role}
                  </p>
                </div>
                <p className="text-xs text-[#526359] leading-relaxed text-center">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-[#1E3F30] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Taste the difference of true local harvesting.
        </h2>
        <p className="text-sm text-[#C7DACF] max-w-lg mx-auto">
          Support independent regional growers while transforming your weekly meals with pure flavor.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-6 py-3.5 bg-[#52B788] hover:bg-[#40916C] text-[#12241B] font-bold text-sm rounded-xl inline-flex items-center gap-2 shadow-lg transition-colors"
          >
            <span>Explore Today's Harvest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
