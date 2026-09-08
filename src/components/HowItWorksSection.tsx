import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../types';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-2 block">
            Procédure Simplifiée
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            Comment ça marche ?
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle connecting line for desktop */}
          <div
            className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-zinc-800/80 -z-0"
            aria-hidden="true"
          />

          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center p-6 sm:p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 md:border-transparent md:bg-transparent"
            >
              {/* Step Number Badge */}
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-700/80 flex items-center justify-center font-mono font-bold text-lg text-white mb-6 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                {item.step}
              </div>

              {/* Step Title */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide mb-3">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
