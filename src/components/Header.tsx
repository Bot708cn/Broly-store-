import React, { useState, useEffect } from 'react';
import { BrolyLogo } from './BrolyLogo';
import { ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection = 'home', onNavigate, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Diamants', id: 'services' },
    { label: 'Level Up', id: 'levelup' },
    { label: 'Abonnements', id: 'abonnements' },
    { label: 'À propos', id: 'apropos' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-emerald-500/30 py-2.5 sm:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(34,197,94,0.1)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
        {/* LEFT: Broly Store Logo in WHITE */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
          aria-label="Broly Store Accueil"
        >
          <BrolyLogo size={32} className="group-hover:scale-105 transition-transform duration-300" />
        </button>

        {/* CENTER: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm tracking-wide transition-all duration-200 relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]'
                    : 'text-zinc-400 hover:text-emerald-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#4ade80] animate-in fade-in duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Outlined Pill Button "Broly Store" */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="group relative flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border border-emerald-500/60 bg-black/60 hover:bg-emerald-950/30 hover:border-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:shadow-[0_0_25px_rgba(74,222,128,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Remonter en haut de page - Broly Store"
          >
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white group-hover:text-emerald-200 transition-colors">
              Broly Store
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-400 text-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-lime-300 shadow-[0_0_12px_rgba(74,222,128,0.6)]">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </button>
        </div>

        {/* MOBILE: Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-xl border-b border-white/15 px-6 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-medium text-zinc-300 hover:text-white py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </button>
            ))}

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left text-base font-mono text-emerald-400 py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>Console Admin (/admin)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
              </button>
            )}

            <div className="pt-3 flex justify-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className="w-full flex items-center justify-between px-5 py-3 rounded-full border border-white/80 bg-black text-white hover:bg-white/10 transition-colors"
              >
                <span className="text-sm font-medium tracking-wide">Broly Store</span>
                <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
