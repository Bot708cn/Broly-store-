import React from 'react';
import { FEATURES } from '../types';
import { BrolyKiParticles } from './BrolyKiParticles';
import { Zap, ShieldCheck, Gamepad2, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'fast':
        return <Zap className="w-6 h-6 stroke-[2] text-emerald-400 drop-shadow-[0_0_8px_#4ade80]" />;
      case 'secure':
        return <ShieldCheck className="w-6 h-6 stroke-[2] text-emerald-400 drop-shadow-[0_0_8px_#4ade80]" />;
      case 'reliable':
        return <Gamepad2 className="w-6 h-6 stroke-[2] text-emerald-400 drop-shadow-[0_0_8px_#4ade80]" />;
      default:
        return <Zap className="w-6 h-6 stroke-[2] text-emerald-400 drop-shadow-[0_0_8px_#4ade80]" />;
    }
  };

  return (
    <section
      id="apropos"
      className="relative w-full py-24 sm:py-32 bg-black border-t border-emerald-500/30 overflow-hidden"
    >
      {/* Floating Broly Ki Particles */}
      <BrolyKiParticles count={14} />

      {/* 
        FULL-SCREEN ANIMATED BACKGROUND:
        Requested URL: https://c.tenor.com/sSVLSCK8cwEAAAAd/tenor.gif
        Clearly visible, vibrant backdrop covering the entire screen
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ambient Ki glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl animate-ki-aura pointer-events-none" />

        <img
          src="https://c.tenor.com/sSVLSCK8cwEAAAAd/tenor.gif"
          alt="Broly Store À Propos Animation"
          className="w-full h-full object-cover object-center scale-105"
          onError={(e) => {
            e.currentTarget.src = '/about-bg.gif';
          }}
        />

        {/* Light overlay allowing the animation to remain clearly visible */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        {/* Seamless edge blending */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-black/70 backdrop-blur-md mb-3 shadow-[0_0_12px_rgba(34,197,94,0.2)]">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-300">
              Broly Store Gaming Excellence
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Pourquoi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-green-500 drop-shadow-[0_0_25px_rgba(74,222,128,0.7)]">
              Broly Store
            </span>{' '}
            ?
          </h2>
        </div>

        {/* 3 Feature Blocks with Glassmorphism and Broly Green Accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-7 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between hover:bg-black/75 hover:shadow-[0_12px_45px_rgba(34,197,94,0.3)] hover:-translate-y-1"
            >
              <div>
                {/* Top row: Number and minimal icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-emerald-300 font-semibold border border-emerald-500/40 bg-black/80 px-2.5 py-1 rounded shadow-sm">
                    {feature.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-black/80 border border-emerald-500/40 flex items-center justify-center group-hover:border-emerald-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-all duration-300 shadow-inner">
                    {getFeatureIcon(feature.id)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-emerald-300 tracking-wider mb-3 transition-colors drop-shadow-sm">
                  {feature.title}
                </h3>

                {/* Primary Description */}
                <p className="text-zinc-100 text-base font-semibold mb-3 drop-shadow-sm">
                  {feature.description}
                </p>

                {/* Secondary details */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {feature.subtext}
                </p>
              </div>

              {/* Bottom minimal line indicator */}
              <div className="mt-8 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-emerald-400/80 font-mono">
                  Standard Garanti
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:bg-lime-300 transition-colors shadow-[0_0_8px_#4ade80]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

