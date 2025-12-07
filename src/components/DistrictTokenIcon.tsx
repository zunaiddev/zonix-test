import React from 'react';

interface DistrictTokenIconProps {
  districtName: string;
  size?: number;
}

// Generate unique color gradient based on district name
const getDistrictColors = (name: string) => {
  const colorMap: { [key: string]: { primary: string; secondary: string; accent: string; glow: string } } = {
    'Mumbai': { primary: '#FCD34D', secondary: '#FBBF24', accent: '#F59E0B', glow: '#FEF3C7' },
    'Bengaluru': { primary: '#34D399', secondary: '#10B981', accent: '#059669', glow: '#D1FAE5' },
    'Bangalore': { primary: '#34D399', secondary: '#10B981', accent: '#059669', glow: '#D1FAE5' },
    'Pune': { primary: '#A78BFA', secondary: '#8B5CF6', accent: '#7C3AED', glow: '#EDE9FE' },
    'Delhi': { primary: '#F87171', secondary: '#EF4444', accent: '#DC2626', glow: '#FEE2E2' },
    'Hyderabad': { primary: '#60A5FA', secondary: '#3B82F6', accent: '#2563EB', glow: '#DBEAFE' },
    'Chennai': { primary: '#F472B6', secondary: '#EC4899', accent: '#DB2777', glow: '#FCE7F3' },
    'Ahmedabad': { primary: '#FB923C', secondary: '#F97316', accent: '#EA580C', glow: '#FFEDD5' },
    'Kolkata': { primary: '#4ADE80', secondary: '#22C55E', accent: '#16A34A', glow: '#DCFCE7' },
    'Jaipur': { primary: '#FBBF24', secondary: '#F59E0B', accent: '#D97706', glow: '#FEF3C7' },
    'Surat': { primary: '#F59E0B', secondary: '#D97706', accent: '#B45309', glow: '#FEF3C7' },
    'Lucknow': { primary: '#EC4899', secondary: '#DB2777', accent: '#BE185D', glow: '#FCE7F3' },
    'Kanpur': { primary: '#3B82F6', secondary: '#2563EB', accent: '#1D4ED8', glow: '#DBEAFE' },
    'Nagpur': { primary: '#F97316', secondary: '#EA580C', accent: '#C2410C', glow: '#FFEDD5' },
    'Indore': { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#6D28D9', glow: '#EDE9FE' },
    'Thane': { primary: '#14B8A6', secondary: '#0D9488', accent: '#0F766E', glow: '#CCFBF1' },
    'Bhopal': { primary: '#10B981', secondary: '#059669', accent: '#047857', glow: '#D1FAE5' },
    'Visakhapatnam': { primary: '#06B6D4', secondary: '#0891B2', accent: '#0E7490', glow: '#CFFAFE' },
    'Pimpri': { primary: '#A855F7', secondary: '#9333EA', accent: '#7E22CE', glow: '#F3E8FF' },
    'Patna': { primary: '#EF4444', secondary: '#DC2626', accent: '#B91C1C', glow: '#FEE2E2' },
  };

  return colorMap[name] || { primary: '#FCD34D', secondary: '#FBBF24', accent: '#F59E0B', glow: '#FEF3C7' };
};

// Generate district initials (first 2-3 letters)
const getDistrictInitials = (name: string) => {
  if (name.length <= 4) return name.toUpperCase();
  
  // Special cases
  const specialCases: { [key: string]: string } = {
    'Mumbai': 'MUM',
    'Bengaluru': 'BLR',
    'Bangalore': 'BLR',
    'Pune': 'PUN',
    'Delhi': 'DEL',
    'Hyderabad': 'HYD',
    'Chennai': 'CHN',
    'Ahmedabad': 'AMD',
    'Kolkata': 'KOL',
    'Jaipur': 'JAI',
    'Surat': 'SRT',
    'Lucknow': 'LKO',
    'Kanpur': 'KNP',
    'Nagpur': 'NGP',
    'Indore': 'IDR',
    'Thane': 'THN',
    'Bhopal': 'BHO',
    'Visakhapatnam': 'VIZ',
    'Pimpri': 'PMP',
    'Patna': 'PAT',
  };

  return specialCases[name] || name.substring(0, 3).toUpperCase();
};

// Generate unique pattern for each district
const getDistrictPattern = (name: string) => {
  const patterns: { [key: string]: string } = {
    'Mumbai': 'M8,8 L10,6 L12,8 L14,6', // Wave pattern
    'Bengaluru': 'M6,6 L10,10 M10,6 L6,10', // Tech cross
    'Bangalore': 'M6,6 L10,10 M10,6 L6,10',
    'Pune': 'M8,6 L8,10 M6,8 L10,8', // Plus
    'Delhi': 'M6,8 L10,8 M8,6 L8,10 M7,7 L9,9 M9,7 L7,9', // Star
    'Hyderabad': 'M8,6 L10,8 L8,10 L6,8 Z', // Diamond
    'Chennai': 'M6,8 Q8,6 10,8 Q8,10 6,8', // Curves
    'Ahmedabad': 'M6,6 L10,6 L10,10 L6,10 Z', // Square
    'Kolkata': 'M8,6 L10,8 L8,10 L6,8 L8,6', // Diamond outline
    'Jaipur': 'M8,6 L9,8 L11,8 L9,9 L10,11 L8,10 L6,11 L7,9 L5,8 L7,8 Z', // Complex star
  };
  
  return patterns[name] || 'M6,6 L10,10 M10,6 L6,10';
};

export function DistrictTokenIcon({ districtName, size = 88 }: DistrictTokenIconProps) {
  const colors = getDistrictColors(districtName);
  const initials = getDistrictInitials(districtName);
  const pattern = getDistrictPattern(districtName);

  return (
    <div 
      className="relative group cursor-pointer"
      style={{ width: size, height: size }}
    >
      {/* Outer Ring with Circuit Pattern */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="absolute inset-0 animate-[spin_20s_linear_infinite] drop-shadow-lg"
      >
        <defs>
          <linearGradient id={`gradient-outer-${districtName}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0.9" />
          </linearGradient>
          
          {/* Circuit pattern */}
          <pattern id={`circuit-${districtName}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0,4 L2,2 L4,4 L6,2 L8,4"
              stroke={colors.primary}
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />
          </pattern>
          
          {/* Unique district pattern */}
          <pattern id={`district-pattern-${districtName}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d={pattern}
              stroke={colors.accent}
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
          </pattern>
        </defs>
        
        {/* Outer circle ring with glow */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke={`url(#gradient-outer-${districtName})`}
          strokeWidth="3"
          opacity="0.8"
          className="drop-shadow-2xl"
        />
        
        {/* Middle ring */}
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          stroke={colors.accent}
          strokeWidth="1"
          opacity="0.5"
          strokeDasharray="4 4"
          className="animate-[spin_15s_linear_infinite_reverse]"
        />
        
        {/* Circuit decoration dots - larger and more prominent */}
        <circle cx="32" cy="2" r="2" fill={colors.primary} opacity="0.9" className="drop-shadow-md" />
        <circle cx="62" cy="32" r="2" fill={colors.secondary} opacity="0.9" className="drop-shadow-md" />
        <circle cx="32" cy="62" r="2" fill={colors.accent} opacity="0.9" className="drop-shadow-md" />
        <circle cx="2" cy="32" r="2" fill={colors.primary} opacity="0.9" className="drop-shadow-md" />
        
        {/* Corner accents */}
        <circle cx="10" cy="10" r="1.5" fill={colors.secondary} opacity="0.7" />
        <circle cx="54" cy="10" r="1.5" fill={colors.secondary} opacity="0.7" />
        <circle cx="10" cy="54" r="1.5" fill={colors.secondary} opacity="0.7" />
        <circle cx="54" cy="54" r="1.5" fill={colors.secondary} opacity="0.7" />
      </svg>

      {/* Main coin body */}
      <div
        className="absolute inset-0 m-1.5 rounded-full shadow-2xl overflow-hidden backdrop-blur-sm border-[3px] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}30, ${colors.accent}20)`,
          borderColor: colors.secondary + '60',
          boxShadow: `0 10px 40px ${colors.accent}40, 0 0 0 1px ${colors.primary}20 inset`,
        }}
      >
        {/* District unique pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <rect width="100%" height="100%" fill={`url(#district-pattern-${districtName})`} />
        </svg>
        
        {/* Circuit pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <rect width="100%" height="100%" fill={`url(#circuit-${districtName})`} />
        </svg>

        {/* Inner circle with gradient */}
        <div
          className="absolute inset-2 rounded-full flex flex-col items-center justify-center shadow-inner transition-all duration-300"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.primary}50, ${colors.secondary}70, ${colors.accent}50)`,
            boxShadow: `inset 0 4px 12px ${colors.accent}30`,
          }}
        >
          {/* ZONIX text at top */}
          <div
            className="text-[0.5rem] tracking-[0.15em] opacity-70 mb-1 font-semibold transition-opacity group-hover:opacity-100"
            style={{ color: colors.accent }}
          >
            ZONIX
          </div>

          {/* District initials */}
          <div
            className="font-black text-center leading-none transition-all duration-300 group-hover:scale-110"
            style={{
              fontSize: `${size * 0.32}px`,
              color: colors.secondary,
              textShadow: `0 3px 12px ${colors.accent}60, 0 0 20px ${colors.glow}40`,
              letterSpacing: '-0.02em',
            }}
          >
            {initials}
          </div>

          {/* India flag inspired element - enhanced */}
          <div className="flex gap-0.5 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ background: '#FF9933' }} />
            <div className="w-1.5 h-1.5 rounded-full shadow-sm border border-gray-300" style={{ background: '#FFFFFF' }} />
            <div className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ background: '#138808' }} />
          </div>
        </div>

        {/* Animated metallic shine effect */}
        <div
          className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-60 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, white 40%, transparent 70%)',
          }}
        />

        {/* Enhanced edge highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `inset 0 3px 8px ${colors.primary}70, inset 0 -3px 8px ${colors.accent}50`,
          }}
        />
      </div>
    </div>
  );
}
