import React from 'react';
import { BrolyLogo } from './BrolyLogo';
import { Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-black border-t border-emerald-500/30 pt-16 pb-12 overflow-hidden">
      {/* Subtle green ambient aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-900">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <BrolyLogo size={38} glow />
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-white block">
                <span className="text-emerald-400">BROLY</span> STORE
              </span>
              <span className="text-xs text-zinc-400">
                Diamants Free Fire & Gaming Services
              </span>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-zinc-400">
            <button
              onClick={() => scrollTo('home')}
              className="hover:text-emerald-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('apropos')}
              className="hover:text-emerald-400 transition-colors"
            >
              À propos
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="hover:text-emerald-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-emerald-400 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-5">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.18-1.5 1.5-1.5h2.5V2h-3.604C9.5 2 8 3.51 8 6.99v2.52H5v3.98h3v8.01h1.198z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all"
              aria-label="X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Scroll Top */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-emerald-400 text-black flex items-center justify-center hover:bg-lime-300 shadow-[0_0_15px_rgba(74,222,128,0.7)] transition-all ml-2"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 <span className="text-emerald-400/90 font-medium">Broly Store</span>. Tous droits réservés.</p>
          <p className="text-zinc-500 text-center sm:text-right">
            Le meilleur endroit pour acheter vos diamants Free Fire avec <span className="text-emerald-400 font-semibold">Broly</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

