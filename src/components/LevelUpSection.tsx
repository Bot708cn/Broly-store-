import React, { useState } from 'react';
import { DiamondPack } from '../types';
import { DiamondIcon } from './DiamondIcon';
import { BrolyKiParticles } from './BrolyKiParticles';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  Zap,
  ArrowRight,
  Info,
  Flame,
} from 'lucide-react';

interface LevelUpSectionProps {
  levelUpPack?: DiamondPack;
  onOrderPack: (pack: DiamondPack) => void;
}

// Official Garena Free Fire Level Up Milestones
const LEVEL_UP_MILESTONES = [
  { level: 2, diamonds: 50, label: 'Niv. 2' },
  { level: 4, diamonds: 50, label: 'Niv. 4' },
  { level: 6, diamonds: 50, label: 'Niv. 6' },
  { level: 8, diamonds: 50, label: 'Niv. 8' },
  { level: 10, diamonds: 100, label: 'Niv. 10' },
  { level: 13, diamonds: 50, label: 'Niv. 13' },
  { level: 16, diamonds: 50, label: 'Niv. 16' },
  { level: 20, diamonds: 100, label: 'Niv. 20' },
  { level: 25, diamonds: 150, label: 'Niv. 25' },
  { level: 30, diamonds: 200, label: 'Niv. 30' },
];

export const LevelUpSection: React.FC<LevelUpSectionProps> = ({
  levelUpPack,
  onOrderPack,
}) => {
  const [playerLevel, setPlayerLevel] = useState<number>(30);

  // Default pack fallback if not passed
  const fallbackPack: DiamondPack = {
    id: 'pack-levelup-pass',
    diamonds: 800,
    title: 'Level Up Pass (Pass Montée de Niveau)',
    price: 'Prix à définir',
    bestValue: true,
    category: 'levelup',
    status: 'active',
    badgeText: 'Rentabilité +300%',
    totalDiamonds: 800,
    description:
      "Offre officielle Garena Free Fire : 800 diamants débloqués en montant du niveau 1 au niveau 30. Déblocage rétroactif instantané pour les comptes déjà au niveau 30.",
  };

  const pack = levelUpPack || fallbackPack;

  // Compute unlocked diamonds according to the interactive simulator slider
  const unlockedDiamonds = LEVEL_UP_MILESTONES.reduce((acc, m) => {
    return playerLevel >= m.level ? acc + m.diamonds : acc;
  }, 0);

  const remainingDiamonds = 800 - unlockedDiamonds;
  const progressPercent = Math.min(100, Math.round((playerLevel / 30) * 100));

  return (
    <section
      id="levelup"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden border-t border-emerald-500/20"
    >
      {/* Background Energy Glows */}
      <BrolyKiParticles intensity="low" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-black/80 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              Offre Exclusive Garena • Rentabilité Maximale
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] mb-4">
            Level Up <span className="text-emerald-400">Pass</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Obtenez jusqu'à <strong className="text-emerald-300 font-bold">800 Diamants</strong> à un tarif imbattable grâce au Pass Montée de Niveau officiel de Free Fire.
          </p>
        </div>

        {/* Level Up Main Showcase Card */}
        <div className="relative rounded-3xl bg-zinc-950/85 border border-emerald-500/40 p-6 sm:p-10 backdrop-blur-xl shadow-[0_10px_50px_rgba(34,197,94,0.15)] mb-12">
          {/* Top Floating Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-black border border-emerald-500/50 flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                <DiamondIcon size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display font-bold text-2xl text-white">
                    Pass Montée de Niveau Free Fire
                  </h3>
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-emerald-400 text-black shadow-[0_0_12px_rgba(74,222,128,0.6)]">
                    300% Valeur
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  1 seul achat autorisé par compte UID joueur officiel.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[11px] font-mono text-zinc-500 uppercase block">Tarif Pack</span>
                <span className="text-xl font-bold font-mono text-white">{pack.price}</span>
              </div>

              <button
                onClick={() => onOrderPack(pack)}
                className="px-6 py-3 rounded-full bg-emerald-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:shadow-[0_0_30px_rgba(163,230,53,0.8)] flex items-center gap-2 group"
              >
                <span>Acheter le Pass</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Interactive Player Level Simulator */}
          <div className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-emerald-500/30 mb-8 shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <Flame className="w-4 h-4" />
                  <span>Simulateur de Niveau Free Fire</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Glissez le curseur pour voir combien de diamants vous recevez selon votre niveau actuel dans le jeu :
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 uppercase font-mono">Mon Niveau :</span>
                <span className="px-4 py-1.5 rounded-xl bg-emerald-950 border border-emerald-400/60 font-mono font-black text-emerald-300 text-lg shadow-[0_0_12px_rgba(74,222,128,0.3)]">
                  Niv. {playerLevel}{playerLevel >= 30 ? '+' : ''}
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-3 mb-6">
              <input
                type="range"
                min="1"
                max="30"
                value={playerLevel}
                onChange={(e) => setPlayerLevel(Number(e.target.value))}
                className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>Niveau 1</span>
                <span>Niveau 10</span>
                <span>Niveau 20</span>
                <span className="text-emerald-400 font-bold">Niveau 30+ (Plafond 800💎)</span>
              </div>
            </div>

            {/* Live Calculation Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block">
                    Débloqués Immédiatement
                  </span>
                  <div className="text-2xl font-black font-display text-emerald-300 mt-1">
                    {unlockedDiamonds} <span className="text-sm">💎</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Unlock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block">
                    En Attente de Progression
                  </span>
                  <div className="text-2xl font-black font-display text-zinc-300 mt-1">
                    {remainingDiamonds} <span className="text-sm">💎</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-950 to-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-emerald-400 block">
                    Total Garanti du Pass
                  </span>
                  <div className="text-2xl font-black font-display text-white mt-1">
                    800 <span className="text-sm text-emerald-400">💎</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Retroactive notice */}
            {playerLevel >= 30 && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Félicitations !</strong> Comme votre compte a atteint ou dépassé le niveau 30, les <strong>800 diamants complets</strong> seront débloqués en une seule fois dans votre jeu dès l'achat du pass.
                </span>
              </div>
            )}
          </div>

          {/* Breakdown Milestones Grid */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Paliers officiels de progression du Level Up Pass :</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {LEVEL_UP_MILESTONES.map((m) => {
                const isUnlocked = playerLevel >= m.level;

                return (
                  <div
                    key={m.level}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isUnlocked
                        ? 'bg-emerald-950/40 border-emerald-400/60 shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800/80 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {isUnlocked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-zinc-500" />
                      )}
                      <span className={`text-xs font-mono font-bold ${isUnlocked ? 'text-emerald-300' : 'text-zinc-400'}`}>
                        {m.label}
                      </span>
                    </div>

                    <div className="font-display font-extrabold text-base text-white">
                      +{m.diamonds} 💎
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Info / Rules */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Achat Unique :</strong> Un seul Pass Level Up peut être activé par compte de joueur Free Fire.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>100% Rétroactif :</strong> Tous les niveaux que vous avez déjà validés sont crédités immédiatement.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Sécurisé par UID :</strong> Aucune transmission de mot de passe requise sur Broly Store.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
