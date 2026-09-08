import React, { useState, useEffect, useRef } from 'react';
import { BrolyLogo } from './BrolyLogo';
import { BrolyKiParticles } from './BrolyKiParticles';
import { ArrowRight, Instagram, Zap } from 'lucide-react';

interface HeroProps {
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [gifLoaded, setGifLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on desktop
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16; // Subtle -8px to +8px
      const y = (e.clientY / innerHeight - 0.5) * 12; // Subtle -6px to +6px
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onDiscoverClick();
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full bg-black select-none pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Floating Broly Ki Particles around the container */}
      <BrolyKiParticles count={14} />

      {/* Ambient background glow behind the YouTube 16:9 frame */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none animate-ki-aura" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-lime-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* 
        16:9 YOUTUBE FORMAT CINEMATIC CONTAINER:
        Compact, modern, contained framed card matching the reference design.
        aspect-video = 16:9 YouTube ratio!
      */}
      <div
        className="relative w-full max-w-5xl min-h-[390px] sm:min-h-0 sm:aspect-video rounded-2xl sm:rounded-3xl border border-emerald-500/40 bg-zinc-950 shadow-[0_0_60px_rgba(34,197,94,0.28)] overflow-hidden flex flex-col justify-between transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      >
        {/* 
          16:9 BACKGROUND GIF (Fitted inside YouTube frame):
          https://i.pinimg.com/originals/25/26/65/252665c6c55444816d8150872588a150.gif
        */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <img
            src="https://i.pinimg.com/originals/25/26/65/252665c6c55444816d8150872588a150.gif"
            alt="Broly Store Cinematic Background"
            className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
              gifLoaded ? 'opacity-100' : 'opacity-90'
            }`}
            onLoad={() => setGifLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = '/hero-bg.gif';
            }}
          />

          {/* Contrast overlays for crisp readability */}
          <div className="absolute inset-0 bg-black/45 sm:bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent sm:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Subtle inner emerald ring like in reference */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-emerald-400/20 blur-sm pointer-events-none" />
        </div>

        {/* Top spacer inside 16:9 frame to keep content centered */}
        <div className="w-full pt-4 sm:pt-6" aria-hidden="true" />

        {/* 
          HERO CONTENT INSIDE 16:9 FRAME:
          Exact ORION typography layout from reference mockup
        */}
        <div className="relative z-10 px-5 sm:px-8 md:px-12 py-3 sm:py-6 my-auto max-w-xl text-left">
          {/* Main Title: BROLY STORE with wide tracking matching ORION in reference */}
          <h1
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] tracking-[0.18em] text-white uppercase leading-[1.08] mb-2 sm:mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-green-500 drop-shadow-[0_0_25px_rgba(74,222,128,0.85)]">
              BROLY
            </span>{' '}
            <span className="text-white">
              STORE
            </span>
          </h1>

          {/* Slogan (Where Innovation Knows No Bounds in reference) */}
          <p
            className="text-zinc-200 sm:text-zinc-300 text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-md mb-4 sm:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Le meilleur endroit pour acheter vos diamants{' '}
            <span className="text-emerald-400 font-semibold drop-shadow-[0_0_12px_rgba(74,222,128,0.7)]">
              Free Fire avec Broly
            </span>
          </p>

          {/* Call To Action Row (Discover -> | Connect in reference) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Primary Button: "Découvrir" with circular arrow */}
            <button
              onClick={scrollToServices}
              className="group relative flex items-center gap-3 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full border border-emerald-400/80 bg-black/75 hover:bg-emerald-950/60 hover:border-emerald-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.35)] hover:shadow-[0_0_30px_rgba(74,222,128,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Découvrir les diamants Free Fire"
            >
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-emerald-200 transition-colors">
                Découvrir
              </span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-400 text-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-lime-300 shadow-[0_0_12px_rgba(74,222,128,0.8)]">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </button>

            {/* Subtle Divider (as in reference composition) */}
            <div className="h-6 w-[1px] bg-emerald-500/40" aria-hidden="true" />

            {/* Brand Logo + "Broly Store" (matching Connect in reference) */}
            <div
              className="flex items-center gap-2 px-1.5 py-1 cursor-pointer group"
              onClick={scrollToServices}
            >
              <BrolyLogo size={26} glow className="shrink-0 transition-transform group-hover:scale-110" />
              <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-emerald-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                Broly Store
              </span>
            </div>
          </div>
        </div>

        {/* 
          HERO BOTTOM BAR INSIDE 16:9 FRAME (Exact reference layout):
          Left: Social icons
          Center: Minimalist mouse scroll indicator
          Right: 01 // HOME
        */}
        <div className="relative z-10 w-full px-5 sm:px-8 pb-4 sm:pb-6 flex items-center justify-between">
          {/* Social Icons (Facebook, Instagram, X) */}
          <div className="flex items-center gap-4 sm:gap-5 text-zinc-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_#4ade80] transition-all duration-200 p-0.5"
              aria-label="Facebook Broly Store"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.18-1.5 1.5-1.5h2.5V2h-3.604C9.5 2 8 3.51 8 6.99v2.52H5v3.98h3v8.01h1.198z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_#4ade80] transition-all duration-200 p-0.5"
              aria-label="Instagram Broly Store"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_#4ade80] transition-all duration-200 p-0.5"
              aria-label="X Broly Store"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Minimalist Scroll Mouse Indicator (Centered) */}
          <div className="flex flex-col items-center">
            <button
              onClick={scrollToServices}
              className="group flex flex-col items-center text-zinc-400 hover:text-emerald-400 transition-colors focus:outline-none"
              aria-label="Défiler vers les produits"
            >
              <div className="w-4 h-6 sm:w-4 sm:h-7 rounded-full border-[1.5px] border-zinc-600 group-hover:border-emerald-400 flex items-start justify-center p-0.5 transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                <span className="w-1 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80] animate-bounce" />
              </div>
            </button>
          </div>

          {/* Right balance: 01 // HOME */}
          <div className="text-right">
            <span className="text-[11px] font-mono text-zinc-500">01 // HOME</span>
          </div>
        </div>
      </div>
    </section>
  );
};
