import React from 'react';

interface BrolyLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
  variant?: 'white' | 'brolyGreen' | 'gradient';
}

export const BrolyLogo: React.FC<BrolyLogoProps> = ({
  className = '',
  size = 40,
  glow = true,
  variant = 'gradient',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${
        glow
          ? 'drop-shadow-[0_0_18px_rgba(74,222,128,0.85)] hover:drop-shadow-[0_0_26px_rgba(163,230,53,1)]'
          : 'hover:drop-shadow-[0_0_14px_rgba(74,222,128,0.7)]'
      } ${className}`}
      style={{ width: size, height: size }}
      aria-label="Broly Store Logo"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-all duration-300 hover:scale-110"
      >
        <defs>
          {/* Broly Legendary Ki Gradient: Lime to Emerald to Cyan */}
          <linearGradient id="brolyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="45%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Electric Green Glow filter */}
          <filter id="brolyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/*
          Exact reproduction of the Broly Store geometric logo from the reference image,
          now infused with Broly's signature Legendary Super Saiyan Ki Green.
        */}
        <g fill={variant === 'white' ? '#FFFFFF' : 'url(#brolyGradient)'}>
          {/* Top Upper-Right Polygon */}
          <path
            d="M 28 54 
               L 56 26 
               C 58 24 62 23 66 23 
               L 82 23 
               C 86 23 88 26 86 29 
               L 77 41 
               C 75.5 43 73 44 70 44 
               L 62 44 
               L 48 58 
               C 46 60 42 60 39 58 
               L 29 55.5 
               C 27 55 27 54.5 28 54 Z"
          />

          {/* Bottom Lower-Left Polygon */}
          <path
            d="M 72 46 
               L 44 74 
               C 42 76 38 77 34 77 
               L 18 77 
               C 14 77 12 74 14 71 
               L 23 59 
               C 24.5 57 27 56 30 56 
               L 38 56 
               L 52 42 
               C 54 40 58 40 61 42 
               L 71 44.5 
               C 73 45 73 45.5 72 46 Z"
          />
        </g>
      </svg>
    </div>
  );
};

