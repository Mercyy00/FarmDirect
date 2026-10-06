import React, { useState } from 'react';
import { SubscriptionPlan, UserSubscription } from '../types';
import { Calendar, PauseCircle, PlayCircle, Settings2, Check, RefreshCw, AlertCircle, Sparkles, Plus, Trash2 } from 'lucide-react';

interface SubscriptionsViewProps {
  subscription: UserSubscription;
  plans: SubscriptionPlan[];
  onUpdateSubscription: (updated: Partial<UserSubscription>) => Promise<void>;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  subscription,
  plans,
  onUpdateSubscription,
}) => {
  const [isPaused, setIsPaused] = useState(subscription.status === 'Paused');
  const [frequency, setFrequency] = useState(subscription.frequency);
  const [boxSize, setBoxSize] = useState(subscription.boxSize);
  const [pauseStart, setPauseStart] = useState('2026-10-14');
  const [pauseEnd, setPauseEnd] = useState('2026-10-28');
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Available addons
  const availableAddons = [
    'Artisan Country Sourdough (+\$6.50)',
    'Pasture-Raised Brown Eggs (+\$5.50)',
    'Cultured Farmhouse Butter (+\$6.20)',
    'Raw Wildflower Honey (+\$9.50)',
  ];

  const [selectedAddons, setSelectedAddons] = useState<string[]>(subscription.customAddons);
  const [excludedList, setExcludedList] = useState<string[]>(subscription.excludedItems);
  const [newExcluded, setNewExcluded] = useState('');

  // Interactive Calendar Days
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const deliveryDays = [7, 14, 21, 28]; // Wednesdays in October 2026

  const handleTogglePause = async () => {
    setSaving(true);
    const nextStatus = isPaused ? 'Active' : 'Paused';
    try {
      await onUpdateSubscription({
        status: nextStatus,
        pauseStartDate: nextStatus === 'Paused' ? pauseStart : undefined,
        pauseEndDate: nextStatus === 'Paused' ? pauseEnd : undefined,
      });
      setIsPaused(!isPaused);
      setSaveMessage(nextStatus === 'Paused' ? 'Subscription successfully paused.' : 'Subscription resumed!');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await onUpdateSubscription({
        frequency,
        boxSize,
        customAddons: selectedAddons,
        excludedItems: excludedList,
      });
      setSaveMessage('Your subscription preferences have been updated!');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const addExcludedItem = () => {
    if (newExcluded.trim() && !excludedList.includes(newExcluded.trim())) {
      setExcludedList([...excludedList, newExcluded.trim()]);
      setNewExcluded('');
    }
  };

  const removeExcludedItem = (item: string) => {
    setExcludedList(excludedList.filter((i) => i !== item));
  };

  return (
    <div className="space-y-10">
      {/* Top Banner & Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E3E8DC]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Farm Box Membership
          </span>
          <h1 className="font-display text-3xl font-bold text-[#1E2922] mt-0.5">
            My Subscriptions
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E63] mt-0.5">
            Manage your harvest cadence, swap items, and control upcoming delivery dates.
          </p>
        </div>

        {saveMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveMessage}</span>
          </div>
        )}
      </div>

      {/* Active Subscription Highlight Card (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE0] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#E8EFE9] text-[#2D6A4F] flex items-center justify-center font-display text-2xl font-bold shrink-0">
            📦
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isPaused ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isPaused ? '● Paused' : '● Active Plan'}
              </span>
              <span className="text-xs text-[#6B7C72]">· {subscription.frequency}</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#1E2922]">
              {subscription.planTitle} ({boxSize})
            </h2>
            <p className="text-xs text-[#5C6E63]">
              Next Harvest Delivery:{' '}
              <strong className="text-[#1E2922]">
                {isPaused ? 'On Hold' : subscription.nextDeliveryDate}
              </strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTogglePause}
            disabled={saving}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
              isPaused
                ? 'bg-[#2D6A4F] hover:bg-[#21543D] text-white'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
            }`}
          >
            {isPaused ? (
              <>
                <PlayCircle className="w-4 h-4" /> Resume Subscription
              </>
            ) : (
              <>
                <PauseCircle className="w-4 h-4" /> Pause Deliveries
              </>
            )}
          </button>
        </div>
      </div>

      {/* Delivery Schedule & Calendar (Matches Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Column */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#E3EAE0] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDF2EB]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D6A4F]" />
              <h3 className="font-display text-base font-bold text-[#1E2922]">
                Delivery Schedule · October 2026
              </h3>
            </div>
            <span className="text-xs text-[#6B7C72]">Wednesdays</span>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#6B7C72] py-1">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span className="text-[#2D6A4F]">We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {/* Offset 4 days for Thu start */}
            <span />
            <span />
            <span />
            <span />
            {daysInMonth.map((day) => {
              const isDelivery = deliveryDays.includes(day);
              const isNext = day === 7;
              return (
                <div
                  key={day}
                  className={`h-9 rounded-xl flex items-center justify-center font-mono transition-colors relative ${
                    isNext
                      ? 'bg-[#2D6A4F] text-white font-bold ring-2 ring-[#2D6A4F]/20'
                      : isDelivery
                      ? 'bg-[#E5EFE9] text-[#2D6A4F] font-bold border border-[#52B788]/30'
                      : 'text-[#4A5D52] hover:bg-[#F4F7F2]'
                  }`}
                >
                  <span>{day}</span>
                  {isDelivery && (
                    <span
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        isNext ? 'bg-white' : 'bg-[#2D6A4F]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#EDF2EB] flex items-center justify-between text-xs text-[#6B7C72]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#2D6A4F]" /> Next Harvest (Oct 7)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#E5EFE9] border border-[#52B788]/30" /> Scheduled Delivery
            </div>
          </div>
        </div>

        {/* Box Items Preview for upcoming delivery */}
        <div className="lg:col-span-6 bg-[#FAFBF9] p-6 rounded-3xl border border-[#E3EAE0] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDF2EB]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F]">
                Curated Field Harvest
              </span>
              <h3 className="font-display text-base font-bold text-[#1E2922]">
                What's In Your Next Box (Oct 7)
              </h3>
            </div>
            <span className="text-xs font-mono text-[#2D6A4F] font-bold">8 Items Included</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs text-[#3D4F44]">
            <div className="p-2.5 bg-white rounded-xl border border-[#E3EAE0] flex items-center gap-2">
              <span>🥬</span> <span>1x Baby Spinach (Highgrove)</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#E3EAE0] flex items-center gap-2">
              <span>🥕</span> <span>1x Rainbow Carrots (Sunshine)</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#E3EAE0] flex items-center gap-2">
              <span>🍅</span> <span>2x Heirloom Tomatoes (Highgrove)</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#E3EAE0] flex items-center gap-2">
              <span>🌽</span> <span>4x Sweet Corn (Willow Creek)</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#E3EAE0] flex items-center gap-2">
              <span>🍎</span> <span>3x Honeycrisp Apples (Sunshine)</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#E3EAE0] flex items-center gap-2">
              <span>🧅</span> <span>1x Sweet Walla Walla Alliums</span>
            </div>
          </div>

          {/* Add-ons attached */}
          {selectedAddons.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-[#2D6A4F] block mb-1.5">
                Your Recurring Add-Ons:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedAddons.map((addon, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white border border-[#D5DDD2] px-2.5 py-1 rounded-lg text-[#1E2922]"
                  >
                    + {addon}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modify Subscription Section (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAE0] space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EDF2EB]">
          <Settings2 className="w-5 h-5 text-[#2D6A4F]" />
          <div>
            <h3 className="font-display text-lg font-bold text-[#1E2922]">
              Modify Subscription Preferences
            </h3>
            <p className="text-xs text-[#6B7C72]">
              Adjust box sizing, delivery cadence, and dietary exclusions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sizing */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E2922] block">Box Size</label>
            <div className="space-y-1.5">
              {(['Solo (1-2)', 'Family (3-5)', 'Harvest Feast (5+)'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setBoxSize(size)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                    boxSize === size
                      ? 'bg-[#E5EFE9] text-[#2D6A4F] font-bold border border-[#52B788]/40'
                      : 'bg-[#FAFBF9] border border-[#E3EAE0] text-[#4A5D52]'
                  }`}
                >
                  <span>{size}</span>
                  {boxSize === size && <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Cadence */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E2922] block">Delivery Frequency</label>
            <div className="space-y-1.5">
              {(['Weekly', 'Bi-Weekly', 'Monthly'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                    frequency === freq
                      ? 'bg-[#E5EFE9] text-[#2D6A4F] font-bold border border-[#52B788]/40'
                      : 'bg-[#FAFBF9] border border-[#E3EAE0] text-[#4A5D52]'
                  }`}
                >
                  <span>{freq}</span>
                  {frequency === freq && <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E2922] block">Recurring Add-Ons</label>
            <div className="space-y-1.5">
              {availableAddons.map((addon) => {
                const selected = selectedAddons.includes(addon);
                return (
                  <button
                    key={addon}
                    onClick={() => toggleAddon(addon)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selected
                        ? 'bg-[#E5EFE9] text-[#2D6A4F] font-bold border border-[#52B788]/40'
                        : 'bg-[#FAFBF9] border border-[#E3EAE0] text-[#4A5D52]'
                    }`}
                  >
                    <span>{addon}</span>
                    <input
                      type="checkbox"
                      checked={selected}
                      readOnly
                      className="rounded text-[#2D6A4F] pointer-events-none"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Excluded items (Do Not Send List) */}
        <div className="pt-4 border-t border-[#EDF2EB] space-y-2">
          <label className="text-xs font-bold text-[#1E2922] block">
            Dietary Exclusions / Swap List (Items You Never Want To Receive)
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            {excludedList.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4F7F2] border border-[#D5DDD2] rounded-lg text-xs text-[#1E2922]"
              >
                <span>🚫 {item}</span>
                <button
                  onClick={() => removeExcludedItem(item)}
                  className="text-[#8C9B90] hover:text-[#D90429]"
                >
                  ✕
                </button>
              </span>
            ))}

            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newExcluded}
                onChange={(e) => setNewExcluded(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addExcludedItem()}
                placeholder="e.g. Radishes, Mushrooms..."
                className="px-3 py-1 bg-[#FAFBF9] border border-[#D5DDD2] rounded-lg text-xs w-48 text-[#1E2922] focus:outline-none focus:border-[#2D6A4F]"
              />
              <button
                onClick={addExcludedItem}
                className="px-2.5 py-1 bg-[#2D6A4F] text-white text-xs rounded-lg hover:bg-[#21543D]"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EDF2EB] flex justify-end">
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#21543D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            {saving ? 'Updating...' : 'Save Subscription Changes'}
          </button>
        </div>
      </div>

      {/* Available Plans for Upgrade/Cross-Subscription */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-[#1E2922]">
          Available Harvest Box Varieties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-[#E3EAE0] flex flex-col justify-between">
              <div>
                <h4 className="font-display text-base font-bold text-[#1E2922]">{p.title}</h4>
                <p className="text-xs text-[#6B7C72] mt-0.5">{p.subtitle}</p>
                <div className="mt-2 text-xl font-mono font-bold text-[#2D6A4F]">
                  ${p.price.toFixed(2)}{' '}
                  <span className="text-xs font-sans text-[#6B7C72] font-normal">/ {p.frequency.toLowerCase()}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onUpdateSubscription({ planId: p.id, planTitle: p.title, price: p.price });
                  setSaveMessage(`Switched plan to ${p.title}!`);
                  setTimeout(() => setSaveMessage(null), 3000);
                }}
                className="mt-4 w-full py-2 bg-[#FAFBF9] hover:bg-[#EAEFE8] border border-[#D5DDD2] text-[#2D6A4F] font-semibold text-xs rounded-xl transition-colors"
              >
                Switch to this Box
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
