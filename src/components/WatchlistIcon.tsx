import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface WatchlistIconProps {
  itemId: string;
  itemType: 'district' | 'state' | 'mutual-fund';
  isInWatchlist?: boolean;
  size?: number;
  onToggle?: (isAdded: boolean) => void;
  className?: string;
}

export function WatchlistIcon({
  itemId,
  itemType,
  isInWatchlist = false,
  size = 48,
  onToggle,
  className = '',
}: WatchlistIconProps) {
  const [isActive, setIsActive] = useState(isInWatchlist);
  const [isHovered, setIsHovered] = useState(false);
  const [justToggled, setJustToggled] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    setJustToggled(true);
    
    // Trigger callback
    onToggle?.(newState);
    
    // Reset animation state
    setTimeout(() => setJustToggled(false), 600);
    
    // Here you would integrate with the watchlist service
    // Example:
    // if (newState) {
    //   watchlistService.addToWatchlist({ itemId, itemType });
    // } else {
    //   watchlistService.removeFromWatchlist(itemId);
    // }
  };

  const iconSize = size * 0.5;

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={false}
    >
      {/* Outer glow ring - pulses when active */}
      <motion.div
        className="absolute inset-[-8px] rounded-full pointer-events-none"
        initial={false}
        animate={{
          opacity: isActive ? 0.6 : isHovered ? 0.3 : 0.1,
          scale: isActive ? [1, 1.1, 1] : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: {
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
        style={{
          background: isActive
            ? 'radial-gradient(circle at center, #FEF3C760 0%, #FCD34D40 40%, #FBBF2430 70%, transparent 100%)'
            : 'radial-gradient(circle at center, #6B728030 0%, #4B556320 40%, #1F293710 70%, transparent 100%)',
          filter: 'blur(12px)',
          boxShadow: isActive
            ? '0 0 20px #FEF3C740, 0 0 40px #FCD34D20'
            : '0 0 10px #6B728020',
        }}
      />

      {/* Main circular container with glassmorphism */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-md border-2 transition-all duration-300"
        style={{
          background: isActive
            ? 'linear-gradient(135deg, rgba(252, 211, 77, 0.25), rgba(251, 191, 36, 0.35), rgba(245, 158, 11, 0.25))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08))',
          borderColor: isActive ? '#FCD34D80' : '#FFFFFF20',
          boxShadow: isActive
            ? '0 8px 32px rgba(252, 211, 77, 0.3), 0 0 0 1px rgba(252, 211, 77, 0.2) inset'
            : '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        }}
        animate={{
          rotate: justToggled ? [0, -10, 10, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Inner gradient background */}
        <div
          className="absolute inset-2 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isActive
              ? 'radial-gradient(circle at 30% 30%, #FCD34D50, #FBBF2470, #F59E0B50)'
              : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.05))',
            boxShadow: isActive
              ? 'inset 0 4px 12px rgba(245, 158, 11, 0.3)'
              : 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Star Icon */}
          <motion.div
            animate={{
              scale: justToggled ? [1, 1.3, 1] : 1,
              rotate: justToggled ? [0, 72, 144, 216, 288, 360] : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <Star
              size={iconSize}
              className="transition-all duration-300"
              style={{
                color: isActive ? '#FBBF24' : '#9CA3AF',
                fill: isActive ? '#FCD34D' : 'none',
                filter: isActive
                  ? 'drop-shadow(0 2px 8px rgba(252, 211, 77, 0.6))'
                  : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
                strokeWidth: 2,
              }}
            />
          </motion.div>
        </div>

        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{
            backgroundPosition: { duration: 1.5, ease: 'easeInOut' },
            opacity: { duration: 1, repeat: isHovered ? Infinity : 0 },
          }}
        />

        {/* Edge highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300"
          style={{
            boxShadow: isActive
              ? 'inset 0 3px 8px rgba(252, 211, 77, 0.7), inset 0 -3px 8px rgba(245, 158, 11, 0.5)'
              : 'inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </motion.div>

      {/* Particle burst effect when toggled */}
      {justToggled && isActive && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 4,
                height: 4,
                background: '#FCD34D',
                top: '50%',
                left: '50%',
                marginTop: -2,
                marginLeft: -2,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 0.8, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * (size * 0.8),
                y: Math.sin((i * Math.PI * 2) / 8) * (size * 0.8),
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}