import React from 'react';
import { DiamondPack } from '../types';
import { DiamondIcon } from './DiamondIcon';
import { BrolyKiParticles } from './BrolyKiParticles';
import {
  Crown,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Zap,
  Award,
  Layers,
} from 'lucide-react';

interface MembershipsSectionProps {
  offers: DiamondPack[];
  onOrderPack: (pack: DiamondPack) => void;
}

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({
  offers,
  onOrderPack,
}) => {
  // Extract membership and pass packs
  const membershipPacks = offers.filter(
    (p) => p.category === 'membership' && (p.status || 'active') === 'active'
  );

  const passPacks = offers.filter(
    (p) => p.category === 'pass' && (p.status || 'active') === 'active'
  );

  return (
    <section
      id="abonnements"
      className="relative py-20 sm:py-28 bg-black overflow-hidden border-t border-emerald-500/20"
    >
      <BrolyKiParticles intensity="low" />

      {/* Decorative Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-black/80 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              Cartes VIP & Passes Garena Free Fire
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] mb-4">
            Abonnements & <span className="text-emerald-400">Booyah Pass</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Recevez des diamants tous les jours et profitez des privilèges VIP exclusifs grâce aux adhésions officielles Free Fire.
          </p>
        </div>

        {/* Memberships Cards Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                Abonnements Membres VIP (Weekly & Monthly)
              </h3>
              <p className="text-xs text-zinc-400">
                Crédit immédiat + diamants quotidiens délivrés chaque jour dans votre jeu.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {membershipPacks.map((pack) => {
              const isMonthly = pack.id.includes('monthly');
              const isSuperVip = pack.id.includes('super-vip');

              return (
                <div
                  key={pack.id}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 backdrop-blur-md border ${
                    isSuperVip
                      ? 'bg-gradient-to-b from-zinc-950 via-emerald-950/40 to-black border-emerald-400 shadow-[0_10px_40px_rgba(74,222,128,0.25)]'
                      : isMonthly
                      ? 'bg-zinc-950/80 border-amber-500/40 hover:border-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.15)]'
                      : 'bg-zinc-950/80 border-emerald-500/30 hover:border-emerald-400 shadow-[0_10px_30px_rgba(34,197,94,0.15)]'
                  }`}
                >
                  {/* Badge */}
                  {pack.badgeText && (
                    <div className="absolute -top-3 left-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-sm ${
                          isSuperVip
                            ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(74,222,128,0.8)]'
                            : isMonthly
                            ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {pack.badgeText}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Top: Icon + Title */}
                    <div className="flex items-center gap-3.5 mb-5 mt-1">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isSuperVip
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(74,222,128,0.4)]'
                            : isMonthly
                            ? 'bg-amber-950/40 border-amber-500/40 text-amber-400'
                            : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                        }`}
                      >
                        <Crown size={28} />
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-lg text-white leading-tight">
                          {pack.title}
                        </h4>
                        <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                          {pack.totalDiamonds || pack.diamonds} Diamants au total
                        </div>
                      </div>
                    </div>

                    {/* Breakdown banner */}
                    {pack.immediateDiamonds && pack.dailyDiamonds && (
                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-black/60 border border-zinc-800 mb-5 text-center">
                        <div className="border-r border-zinc-800 pr-2">
                          <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                            Immédiat
                          </span>
                          <span className="text-sm font-bold text-emerald-300 font-mono">
                            +{pack.immediateDiamonds} 💎
                          </span>
                        </div>
                        <div className="pl-1">
                          <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                            Chaque Jour
                          </span>
                          <span className="text-sm font-bold text-white font-mono">
                            +{pack.dailyDiamonds} 💎/j
                          </span>
                        </div>
                      </div>
                    )}

                    {pack.description && (
                      <p className="text-xs text-zinc-300 mb-5 leading-relaxed">
                        {pack.description}
                      </p>
                    )}

                    {/* Benefits list */}
                    {pack.benefits && pack.benefits.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {pack.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price + Action */}
                  <div className="pt-5 border-t border-zinc-800/80 flex items-center justify-between mt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono block">
                        Tarif
                      </span>
                      <span className="text-base font-bold text-white font-mono">
                        {pack.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onOrderPack(pack)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                        isSuperVip
                          ? 'bg-emerald-400 text-black hover:bg-lime-300 shadow-[0_0_20px_rgba(74,222,128,0.6)]'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 hover:bg-emerald-400 hover:text-black shadow-sm'
                      }`}
                    >
                      <span>S'abonner</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booyah Pass Section */}
        {passPacks.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Pass Booyah & Passes de Combat Saisonnier
                </h3>
                <p className="text-xs text-zinc-400">
                  Débloquez les tenues exclusives, skins d'armes évolutives et animations de la saison.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {passPacks.map((pack) => {
                const isPremiumPlus = pack.id.includes('plus');

                return (
                  <div
                    key={pack.id}
                    className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md border transition-all duration-300 hover:-translate-y-1 ${
                      isPremiumPlus
                        ? 'bg-gradient-to-br from-zinc-950 via-emerald-950/30 to-black border-emerald-400/60 shadow-[0_10px_35px_rgba(74,222,128,0.2)]'
                        : 'bg-zinc-950/80 border-emerald-500/30 hover:border-emerald-400'
                    }`}
                  >
                    {pack.badgeText && (
                      <div className="absolute -top-3 left-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-emerald-400 text-black shadow-[0_0_12px_rgba(74,222,128,0.6)]">
                          <Gift className="w-3 h-3" />
                          {pack.badgeText}
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-start gap-4 mb-4 mt-1">
                        <div className="w-14 h-14 rounded-2xl bg-black border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                          <Award size={28} />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-lg text-white">
                            {pack.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1">
                            {pack.description}
                          </p>
                        </div>
                      </div>

                      {pack.benefits && (
                        <div className="space-y-2 my-5">
                          {pack.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-5 border-t border-zinc-800 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono block">
                          Tarif
                        </span>
                        <span className="text-base font-bold text-white font-mono">
                          {pack.price}
                        </span>
                      </div>

                      <button
                        onClick={() => onOrderPack(pack)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide bg-emerald-400 text-black hover:bg-lime-300 shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-all"
                      >
                        <span>Activer le Booyah Pass</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
