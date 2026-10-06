import React, { useState } from 'react';
import { Farm } from '../types';
import { FarmCoverImage } from '../components/ProductImage';
import { Search, MapPin, Sprout, Award, Heart, Check, Users } from 'lucide-react';

interface FarmsViewProps {
  farms: Farm[];
  onSelectFarm: (farm: Farm) => void;
}

export const FarmsView: React.FC<FarmsViewProps> = ({ farms, onSelectFarm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [followedFarms, setFollowedFarms] = useState<Set<string>>(new Set(['farm-peterson']));
  const [activeMapPin, setActiveMapPin] = useState<string | null>(null);

  const states = ['All', 'OR', 'WA', 'PA', 'CA', 'NY'];

  const filteredFarms = farms.filter((f) => {
    if (selectedState !== 'All' && f.state !== selectedState) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchLoc = f.location.toLowerCase().includes(q);
      const matchCrop = f.crops.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchLoc && !matchCrop) return false;
    }
    return true;
  });

  const toggleFollow = (farmId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowedFarms((prev) => {
      const next = new Set(prev);
      if (next.has(farmId)) {
        next.delete(farmId);
      } else {
        next.add(farmId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E3E8DC]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
            Transparent Agronomy
          </span>
          <h1 className="font-display text-3xl font-bold text-[#1E2922] mt-0.5">
            Partner Family Farms
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E63] mt-0.5">
            Know who grows your food. Every partner farm practices biological pest management and restorative soil stewardship.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9B90]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by crop, farmer, or region..."
              className="pl-9 pr-4 py-2 bg-white border border-[#D5DDD2] rounded-xl text-xs text-[#1E2922] w-56 sm:w-64 focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#D5DDD2] p-1 rounded-xl text-xs">
            <span className="text-[11px] text-[#6B7C72] px-2 font-medium">State:</span>
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  selectedState === st
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#5C6E63] hover:text-[#1E2922]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Stylized Farm Map Canvas */}
      <div className="bg-[#EAEFE8] rounded-3xl p-6 sm:p-8 border border-[#D6DFD3] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#1E2922]">
              Regional Grower Map
            </h3>
            <p className="text-xs text-[#5C6E63]">
              Click any pin to inspect farm coordinates and acreage
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#4A5D52]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#2D6A4F]" /> Active Farm Hub
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E76F51]" /> Cold-Chain Transit &lt; 24h
            </span>
          </div>
        </div>

        {/* Map stylized container */}
        <div className="relative w-full h-64 sm:h-72 bg-[#DCE5D9] rounded-2xl border border-[#CBD7C8] overflow-hidden flex items-center justify-center">
          {/* Topographic organic curves */}
          <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
            <path d="M0 50 Q 150 120 300 60 T 600 80 T 900 40 T 1200 90 L 1200 200 L 0 200 Z" fill="#C5D3C1" />
            <path d="M0 130 Q 200 70 450 150 T 800 110 T 1200 160 L 1200 300 L 0 300 Z" fill="#B2C4AC" />
          </svg>

          {/* Interactive Pins */}
          {farms.map((farm) => {
            const isSelected = activeMapPin === farm.id;
            return (
              <div
                key={farm.id}
                style={{ left: `${farm.coordinates.x}%`, top: `${farm.coordinates.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
              >
                <button
                  onClick={() => {
                    setActiveMapPin(farm.id);
                    onSelectFarm(farm);
                  }}
                  className={`relative p-2 rounded-full shadow-lg transition-transform hover:scale-110 ${
                    isSelected ? 'bg-[#1E2922] text-white ring-4 ring-white' : 'bg-[#2D6A4F] text-white'
                  }`}
                  aria-label={`View ${farm.name}`}
                >
                  <MapPin className="w-4 h-4 fill-current" />
                </button>

                {/* Hover / Active tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 pointer-events-none">
                  <div className="bg-[#193226] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl">
                    <div>{farm.name}</div>
                    <div className="text-[10px] text-[#95D5B2] font-normal">{farm.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farm Stories Grid */}
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-[#1E2922]">
          Farm Stories & Heritage Profiles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarms.map((farm) => {
            const isFollowed = followedFarms.has(farm.id);

            return (
              <div
                key={farm.id}
                onClick={() => onSelectFarm(farm)}
                className="bg-white rounded-2xl border border-[#E3EAE0] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#2D6A4F]/40 transition-all cursor-pointer group"
              >
                <div>
                  {/* Cover */}
                  <FarmCoverImage style={farm.imageStyle} name={farm.name} className="w-full h-44 relative" />

                  <div className="p-5 space-y-4">
                    {/* Farmer intro */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E5EFE9] text-[#2D6A4F] font-display font-bold flex items-center justify-center shrink-0">
                          {farm.farmerName[0]}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#1E2922] group-hover:text-[#2D6A4F] transition-colors">
                            {farm.name}
                          </h3>
                          <p className="text-[11px] text-[#6B7C72]">
                            {farm.farmerName} · {farm.farmerRole}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleFollow(farm.id, e)}
                        className={`p-2 rounded-lg border text-xs transition-colors ${
                          isFollowed
                            ? 'bg-[#EBF3ED] border-[#52B788] text-[#2D6A4F]'
                            : 'border-[#D5DDD2] text-[#6B7C72] hover:bg-black/5'
                        }`}
                        title={isFollowed ? 'Following Farm' : 'Follow Farm Updates'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFollowed ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-[#526359] leading-relaxed line-clamp-3">
                      {farm.story}
                    </p>

                    {/* Practices list */}
                    <div className="space-y-1 text-xs text-[#4A5D52] bg-[#FAFBF9] p-3 rounded-xl border border-[#EDF2EB]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] mb-1">
                        Regenerative Focus
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {farm.practices.slice(0, 2).map((p, idx) => (
                          <span key={idx} className="text-[11px] text-[#334D3D] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" /> {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Crops */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {farm.crops.map((crop, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-[#2D6A4F] bg-[#F0F5F1] px-2 py-0.5 rounded-md"
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
                    className="w-full py-2.5 bg-[#FAFBF9] hover:bg-[#2D6A4F] hover:text-white border border-[#D5DDD2] text-[#2D6A4F] font-semibold text-xs rounded-xl transition-all"
                  >
                    View Harvest & Farm Story
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
