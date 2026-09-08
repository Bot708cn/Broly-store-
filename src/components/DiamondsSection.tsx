import React, { useState, useEffect } from 'react';
import { DiamondPack } from '../types';
import { getStoredOffers, OFFERS_UPDATED_EVENT } from '../lib/offersStorage';
import { DiamondIcon } from './DiamondIcon';
import { RechargeModal } from './RechargeModal';
import { BrolyKiParticles } from './BrolyKiParticles';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Clock, Calendar } from 'lucide-react';

export const DiamondsSection: React.FC = () => {
  const [offers, setOffers] = useState<DiamondPack[]>([]);
  const [filter, setFilter] = useState<'all' | 'direct' | 'levelup' | 'membership' | 'pass' | 'future'>('all');
  const [selectedPack, setSelectedPack] = useState<DiamondPack | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setOffers(getStoredOffers());

    const handleOffersUpdate = () => {
      setOffers(getStoredOffers());
    };

    window.addEventListener(OFFERS_UPDATED_EVENT, handleOffersUpdate);
    return () => window.removeEventListener(OFFERS_UPDATED_EVENT, handleOffersUpdate);
  }, []);

  const handleBuyClick = (pack: DiamondPack) => {
    setSelectedPack(pack);
    setModalOpen(true);
  };

  const directPacks = offers.filter((p) => (!p.category || p.category === 'direct') && (p.status || 'active') === 'active');
  const levelUpPacks = offers.filter((p) => p.category === 'levelup' && (p.status || 'active') === 'active');
  const membershipPacks = offers.filter((p) => p.category === 'membership' && (p.status || 'active') === 'active');
  const passPacks = offers.filter((p) => p.category === 'pass' && (p.status || 'active') === 'active');
  const futurePacks = offers.filter((p) => p.status === 'future');

  const displayedPacks = offers.filter((pack) => {
    if (filter === 'direct') return (!pack.category || pack.category === 'direct') && (pack.status || 'active') === 'active';
    if (filter === 'levelup') return pack.category === 'levelup' && (pack.status || 'active') === 'active';
    if (filter === 'membership') return pack.category === 'membership' && (pack.status || 'active') === 'active';
    if (filter === 'pass') return pack.category === 'pass' && (pack.status || 'active') === 'active';
    if (filter === 'future') return pack.status === 'future';
    return true;
  });

  return (
    <section
      id="services"
      className="relative w-full py-24 sm:py-32 bg-black border-t border-emerald-500/30 overflow-hidden"
    >
      {/* Floating Broly Ki Particles */}
      <BrolyKiParticles count={14} />

      {/* 
        FULL-SCREEN ANIMATED BACKGROUND:
        URL: https://i.pinimg.com/originals/9d/0e/08/9d0e0846c6e64d02c63496a29984525b.gif
        Infused with Broly green ambient radiance
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Broly Green Ki Ambient Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-ki-aura pointer-events-none" />

        <img
          src="https://i.pinimg.com/originals/9d/0e/08/9d0e0846c6e64d02c63496a29984525b.gif"
          alt="Broly Store Services Background"
          className="w-full h-full object-cover object-center scale-105"
          onError={(e) => {
            e.currentTarget.src = '/service-bg.gif';
          }}
        />

        {/* Minimal dark overlay with subtle emerald aura tone */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        {/* Seamless edge gradients */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-black/70 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              Broly Ki Energy • Packs & Offres
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Choisissez vos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-green-500 drop-shadow-[0_0_25px_rgba(74,222,128,0.7)]">
              diamants
            </span>
          </h2>
          <p className="text-zinc-200 text-base sm:text-lg font-normal max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Rechargez votre compte Free Fire rapidement avec la puissance de <span className="text-emerald-400 font-medium">Broly Store</span>.
          </p>

          {/* Filter Tabs for all Garena recharge methods */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black/80 border border-emerald-500/30 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.8)] max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                filter === 'all'
                  ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(74,222,128,0.6)] font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Tous ({offers.length})
            </button>
            <button
              onClick={() => setFilter('direct')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                filter === 'direct'
                  ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(74,222,128,0.6)] font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              💎 Direct ({directPacks.length})
            </button>
            <button
              onClick={() => setFilter('levelup')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                filter === 'levelup'
                  ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(74,222,128,0.6)] font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ⚡ Level Up Pass ({levelUpPacks.length})
            </button>
            <button
              onClick={() => setFilter('membership')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                filter === 'membership'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              👑 Abonnements ({membershipPacks.length})
            </button>
            <button
              onClick={() => setFilter('pass')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                filter === 'pass'
                  ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(74,222,128,0.6)] font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🏆 Booyah Pass ({passPacks.length})
            </button>
            {futurePacks.length > 0 && (
              <button
                onClick={() => setFilter('future')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  filter === 'future'
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.6)] font-bold'
                    : 'text-cyan-300 hover:text-cyan-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Futures ({futurePacks.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Diamond Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPacks.map((pack) => {
            const isFuture = pack.status === 'future';

            return (
              <div
                key={pack.id}
                className={`group relative backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isFuture
                    ? 'bg-black/75 border border-cyan-500/40 hover:border-cyan-300 hover:bg-black/90 hover:shadow-[0_12px_45px_rgba(6,182,212,0.3)]'
                    : 'bg-black/60 border border-emerald-500/30 hover:border-emerald-400 hover:bg-black/75 hover:shadow-[0_12px_45px_rgba(34,197,94,0.3)]'
                }`}
              >
                {/* Badges */}
                <div className="absolute -top-3 left-6 flex items-center gap-2">
                  {isFuture ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-cyan-400 text-black shadow-[0_0_16px_rgba(34,211,238,0.8)]">
                      <Clock className="w-3 h-3 fill-black" />
                      {pack.badgeText || 'Offre Future'}
                    </span>
                  ) : pack.popular ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-lime-400 to-emerald-500 text-black shadow-[0_0_16px_rgba(74,222,128,0.7)]">
                      <Sparkles className="w-3 h-3 fill-black" /> Populaire
                    </span>
                  ) : pack.bestValue ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black text-emerald-300 border border-emerald-500/70 shadow-[0_0_14px_rgba(34,197,94,0.4)]">
                      Meilleure Valeur
                    </span>
                  ) : pack.badgeText ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/50 shadow-sm">
                      {pack.badgeText}
                    </span>
                  ) : null}
                </div>

                {/* Top: Icon & Diamond Quantity */}
                <div>
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 shadow-inner border ${
                    isFuture
                      ? 'bg-cyan-950/40 border-cyan-500/50 group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] text-cyan-300'
                      : 'bg-black/80 border-emerald-500/40 group-hover:border-emerald-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] text-emerald-400'
                  }`}>
                    <DiamondIcon size={38} className="transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className={`font-display font-bold text-2xl tracking-wide transition-colors drop-shadow-sm ${
                      isFuture ? 'text-white group-hover:text-cyan-300' : 'text-white group-hover:text-emerald-300'
                    }`}>
                      {pack.title}
                    </h3>
                  </div>

                  {pack.bonus ? (
                    <div className="text-xs text-emerald-400 font-semibold mb-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                      <span>+{pack.bonus} diamants offerts en bonus</span>
                    </div>
                  ) : null}

                  {/* Future Release Date badge */}
                  {isFuture && pack.releaseDate && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Sortie : {pack.releaseDate}</span>
                    </div>
                  )}

                  <p className="text-zinc-300 text-xs line-clamp-2 mb-6">
                    {pack.description || (isFuture
                      ? "Offre future en avant-première Broly Store. Pré-inscription ouverte."
                      : "Crédit direct sur ID joueur Free Fire sans partage d'identifiants.")}
                  </p>
                </div>

                {/* Bottom: Price & Button */}
                <div className="pt-5 border-t border-zinc-800/80 flex items-center justify-between mt-4">
                  <div>
                    <div className={`text-[11px] uppercase tracking-wider font-medium ${
                      isFuture ? 'text-cyan-400/90' : 'text-emerald-400/80'
                    }`}>
                      {isFuture ? 'Statut' : 'Tarif'}
                    </div>
                    <div className="text-base font-bold text-white font-mono">
                      {pack.price}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyClick(pack)}
                    className={`group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 focus:outline-none ${
                      isFuture
                        ? 'border border-cyan-400 bg-cyan-400 text-black hover:bg-cyan-300 hover:border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]'
                        : 'border border-emerald-400 bg-emerald-400 text-black hover:bg-lime-300 hover:border-lime-300 shadow-[0_0_20px_rgba(74,222,128,0.5)] hover:shadow-[0_0_30px_rgba(163,230,53,0.8)]'
                    }`}
                    aria-label={isFuture ? `Pré-inscrire à ${pack.title}` : `Acheter ${pack.title}`}
                  >
                    <span>{isFuture ? 'Offre Future' : 'Acheter'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Security Notice below cards */}
        <div className="mt-14 max-w-2xl mx-auto p-4 rounded-xl border border-emerald-500/30 bg-black/75 backdrop-blur-md text-center text-xs text-emerald-200/90 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center justify-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Recharge 100% sécurisée. Aucun mot de passe ni accès au compte Google/Facebook n'est requis.</span>
        </div>
      </div>

      {/* Recharge Modal */}
      <RechargeModal
        pack={selectedPack}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

