import React from 'react';

export const BrolyKiParticles: React.FC<{ count?: number; className?: string }> = ({
  count = 14,
  className = '',
}) => {
  // Deterministic particle properties
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 7.1 + 4) % 94}%`,
    bottom: `${(i * 11) % 40}%`,
    size: 3 + ((i * 3) % 6),
    duration: 3 + ((i * 1.7) % 4.5),
    delay: (i * 0.45) % 3.5,
    opacity: 0.3 + ((i * 0.1) % 0.5),
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-emerald-400 blur-[1px] shadow-[0_0_12px_#4ade80]"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s infinite ease-out ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
