import React from 'react';

interface ProductImageProps {
  category: string;
  className?: string;
  alt?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ category, className = 'w-full h-48', alt = 'Product' }) => {
  // Rich SVG visual representations tailored to produce types
  switch (category) {
    case 'spinach':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Cluster of vibrant organic spinach leaves */}
            <path d="M100 170 Q95 120 70 85 C50 60 70 30 95 45 C115 57 110 85 100 170 Z" fill="#2D6A4F" />
            <path d="M100 170 Q105 110 135 80 C155 60 140 25 115 35 C95 45 98 80 100 170 Z" fill="#40916C" />
            <path d="M100 170 Q80 130 55 115 C35 100 45 75 70 80 C90 85 95 110 100 170 Z" fill="#52B788" />
            <path d="M100 170 Q120 130 145 110 C165 95 155 70 130 78 C110 85 105 110 100 170 Z" fill="#74C69D" />
            {/* Veins */}
            <path d="M100 160 Q105 110 120 65" stroke="#95D5B2" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M100 155 Q92 110 85 75" stroke="#74C69D" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'apples':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-red-100 via-amber-50 to-rose-50 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Crisp Honeycrisp Apple */}
            <path d="M100 70 C70 40 40 60 45 110 C50 150 85 170 100 165 C115 170 150 150 155 110 C160 60 130 40 100 70 Z" fill="#E63946" />
            <path d="M100 70 C80 50 60 70 62 105 C65 140 90 160 100 165 C95 140 90 90 100 70 Z" fill="#D90429" opacity="0.6" />
            {/* Apple Stem and Leaf */}
            <path d="M100 68 Q102 45 112 35" stroke="#582F0E" strokeWidth="4" strokeLinecap="round" />
            <path d="M108 45 Q130 35 135 48 C135 60 115 55 108 45 Z" fill="#52B788" />
            {/* Highlight */}
            <ellipse cx="75" cy="85" rx="12" ry="20" fill="white" opacity="0.3" transform="rotate(-20 75 85)" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'eggs':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-amber-100 via-stone-50 to-orange-50 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Rustic carton base */}
            <rect x="35" y="115" width="130" height="45" rx="8" fill="#DDB892" />
            <rect x="45" y="122" width="110" height="30" rx="4" fill="#B08968" opacity="0.4" />
            {/* Three pasture eggs */}
            <ellipse cx="70" cy="110" rx="22" ry="28" fill="#E6CCB2" transform="rotate(-5 70 110)" />
            <ellipse cx="100" cy="105" rx="23" ry="30" fill="#EDE0D4" />
            <ellipse cx="130" cy="110" rx="22" ry="28" fill="#DDB892" transform="rotate(5 130 110)" />
            {/* Golden yolk glimpse */}
            <circle cx="100" cy="102" r="6" fill="#F4A261" opacity="0.25" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'beef':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-rose-100 via-red-50 to-stone-100 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Butcher board */}
            <rect x="30" y="45" width="140" height="110" rx="12" fill="#DDB892" />
            <rect x="35" y="50" width="130" height="100" rx="8" fill="#EDE0D4" />
            {/* Grass Fed Ribeye Cut */}
            <path d="M55 90 C55 65 95 60 135 70 C150 75 155 105 145 125 C135 145 80 145 60 130 C52 118 55 105 55 90 Z" fill="#9D0208" />
            {/* Natural Marbling lines */}
            <path d="M75 80 Q95 90 85 105 Q105 115 125 95" stroke="#FFF" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
            <path d="M70 115 Q90 125 110 120" stroke="#FFF" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
            <circle cx="135" cy="85" r="5" fill="#FFE5D9" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'tomatoes':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            <circle cx="95" cy="115" r="48" fill="#E63946" />
            <circle cx="125" cy="120" r="38" fill="#D90429" opacity="0.9" />
            {/* Green calyx & stem */}
            <path d="M95 72 L95 55" stroke="#2D6A4F" strokeWidth="5" strokeLinecap="round" />
            <path d="M95 72 L80 65 M95 72 L110 65 M95 72 L78 78 M95 72 L112 78 M95 72 L95 85" stroke="#40916C" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="80" cy="98" rx="8" ry="14" fill="#FFF" opacity="0.3" transform="rotate(-25 80 98)" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'corn':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-50 to-emerald-50 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Corn Ear */}
            <rect x="75" y="55" width="50" height="95" rx="25" fill="#F4A261" transform="rotate(-15 100 100)" />
            {/* Kernels pattern */}
            <circle cx="90" cy="80" r="4" fill="#E76F51" />
            <circle cx="102" cy="77" r="4" fill="#FFE3A8" />
            <circle cx="85" cy="95" r="4" fill="#FFE3A8" />
            <circle cx="98" cy="92" r="4" fill="#E76F51" />
            <circle cx="110" cy="89" r="4" fill="#FFE3A8" />
            <circle cx="92" cy="110" r="4" fill="#FFE3A8" />
            <circle cx="105" cy="107" r="4" fill="#E76F51" />
            {/* Husk leaves */}
            <path d="M60 145 C65 110 80 80 85 65 C70 95 65 130 60 145 Z" fill="#52B788" />
            <path d="M135 155 C130 115 120 85 110 70 C125 100 135 135 135 155 Z" fill="#40916C" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'honey':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Honey Jar */}
            <rect x="65" y="60" width="70" height="20" rx="4" fill="#E9C46A" />
            <rect x="60" y="80" width="80" height="80" rx="16" fill="#F4A261" />
            {/* Honey level */}
            <rect x="65" y="90" width="70" height="65" rx="12" fill="#E76F51" opacity="0.75" />
            {/* Label */}
            <rect x="72" y="105" width="56" height="35" rx="4" fill="#FFFDF8" />
            <path d="M100 115 L106 122 L94 122 Z" fill="#2D6A4F" />
            <circle cx="100" cy="128" r="3" fill="#E76F51" />
            <ellipse cx="85" cy="98" rx="4" ry="12" fill="#FFF" opacity="0.4" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'sourdough':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-stone-100 to-amber-100 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Round Boule */}
            <ellipse cx="100" cy="115" rx="65" ry="45" fill="#B08968" />
            <ellipse cx="100" cy="110" rx="60" ry="40" fill="#DDB892" />
            {/* Score marks */}
            <path d="M65 105 Q100 120 135 105" stroke="#7F5539" strokeWidth="4" strokeLinecap="round" />
            <path d="M80 90 Q100 102 120 90" stroke="#7F5539" strokeWidth="3" strokeLinecap="round" />
            {/* Flour dusting */}
            <ellipse cx="95" cy="100" rx="20" ry="8" fill="#FFF" opacity="0.3" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'chicken':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            <ellipse cx="100" cy="115" rx="55" ry="40" fill="#E6CCB2" />
            <ellipse cx="85" cy="110" rx="45" ry="32" fill="#DDB892" />
            <path d="M135 110 C145 95 160 100 160 115 C160 125 145 130 135 125 Z" fill="#B08968" />
            {/* Fresh rosemary sprig */}
            <path d="M70 135 Q100 120 125 140" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="85" cy="128" r="2" fill="#40916C" />
            <circle cx="105" cy="128" r="2" fill="#40916C" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'carrots':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Carrots */}
            <path d="M85 75 L70 160 C70 163 73 163 75 160 L100 75 Z" fill="#E76F51" />
            <path d="M105 75 L115 165 C116 167 119 167 120 164 L125 75 Z" fill="#F4A261" />
            <path d="M95 78 L95 155 L108 78 Z" fill="#8338EC" opacity="0.85" />
            {/* Carrot leafy tops */}
            <path d="M90 75 Q75 40 60 30 M90 75 Q90 35 85 25 M90 75 Q105 35 115 25 M115 75 Q130 40 145 35" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'butter':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-50 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            {/* Slate board */}
            <rect x="40" y="70" width="120" height="85" rx="6" fill="#3D405B" />
            {/* Butter Roll */}
            <rect x="55" y="80" width="90" height="50" rx="10" fill="#FFD166" />
            <rect x="58" y="83" width="84" height="44" rx="8" fill="#FFE3A8" />
            {/* Sea salt crystals */}
            <rect x="80" y="92" width="4" height="4" fill="#FFF" />
            <rect x="110" y="96" width="3" height="3" fill="#FFF" />
            <rect x="95" y="105" width="4" height="4" fill="#FFF" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'berries':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-md" fill="none">
            <circle cx="85" cy="110" r="22" fill="#3A0CA3" />
            <circle cx="115" cy="105" r="24" fill="#4361EE" />
            <circle cx="100" cy="130" r="20" fill="#1D3557" />
            <circle cx="70" cy="125" r="16" fill="#4895EF" />
            <circle cx="130" cy="125" r="17" fill="#3F37C9" />
            {/* Crown notches */}
            <circle cx="85" cy="110" r="4" fill="#7209B7" />
            <circle cx="115" cy="105" r="4" fill="#3F37C9" />
            <circle cx="100" cy="130" r="3" fill="#4361EE" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center ${className}`}>
          <div className="w-16 h-16 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-800 font-display text-2xl">
            FD
          </div>
        </div>
      );
  }
};

export const FarmCoverImage: React.FC<{ style: string; className?: string; name: string }> = ({
  style,
  className = 'w-full h-48',
  name,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {style === 'vegetable_field' && (
        <div className="w-full h-full bg-gradient-to-br from-[#2D6A4F] via-[#40916C] to-[#52B788] flex flex-col justify-end p-4 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wider text-emerald-200">Certified Organic Valley</span>
            <div className="text-lg font-bold font-display">{name}</div>
          </div>
        </div>
      )}
      {style === 'orchard' && (
        <div className="w-full h-full bg-gradient-to-br from-[#E76F51] via-[#F4A261] to-[#E9C46A] flex flex-col justify-end p-4 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wider text-amber-100">Heritage Orchard Terraces</span>
            <div className="text-lg font-bold font-display">{name}</div>
          </div>
        </div>
      )}
      {style === 'pasture' && (
        <div className="w-full h-full bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#74C69D] flex flex-col justify-end p-4 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wider text-emerald-200">Rotational Clover Rangeland</span>
            <div className="text-lg font-bold font-display">{name}</div>
          </div>
        </div>
      )}
      {style === 'ranch' && (
        <div className="w-full h-full bg-gradient-to-br from-[#6F1D1B] via-[#99582A] to-[#BB9457] flex flex-col justify-end p-4 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wider text-amber-200">Coastal Regenerative Ranch</span>
            <div className="text-lg font-bold font-display">{name}</div>
          </div>
        </div>
      )}
      {style === 'greenhouse' && (
        <div className="w-full h-full bg-gradient-to-br from-[#264653] via-[#2A9D8F] to-[#E9C46A] flex flex-col justify-end p-4 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wider text-teal-100">Artisan Creamery & Greenhouse</span>
            <div className="text-lg font-bold font-display">{name}</div>
          </div>
        </div>
      )}
    </div>
  );
};
