import React from 'react';

interface DiamondIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const DiamondIcon: React.FC<DiamondIconProps> = ({
  className = '',
  size = 32,
  glow = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-300 ${
        glow ? 'drop-shadow-[0_0_12px_rgba(74,222,128,0.7)]' : ''
      } ${className}`}
    >
      <defs>
        <linearGradient id="diamondKiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Top crown facets */}
      <polygon
        points="14,6 34,6 44,18 4,18"
        stroke="url(#diamondKiGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(34, 197, 94, 0.15)"
      />
      {/* Upper facet triangles */}
      <polygon
        points="24,6 34,6 28,18"
        stroke="#86efac"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="rgba(74, 222, 128, 0.25)"
      />
      <polygon
        points="24,6 14,6 20,18"
        stroke="#86efac"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="rgba(74, 222, 128, 0.25)"
      />
      {/* Lower pavilion main body */}
      <polygon
        points="4,18 44,18 24,42"
        stroke="url(#diamondKiGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(16, 185, 129, 0.18)"
      />
      {/* Inner pavilion facets */}
      <polygon
        points="20,18 28,18 24,42"
        stroke="#a3e635"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="rgba(163, 230, 53, 0.3)"
      />
      <line
        x1="4"
        y1="18"
        x2="24"
        y2="42"
        stroke="#86efac"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="44"
        y1="18"
        x2="24"
        y2="42"
        stroke="#86efac"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

