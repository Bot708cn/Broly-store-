import React from 'react';
import {
  Diamond,
  TrendingUp,
  Crown,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const GarenaRechargeGuideSection: React.FC = () => {
  const rechargeMethods = [
    {
      title: 'Recharge Directe Diamants',
      category: 'Top-Up Immédiat',
      badge: 'Crédit 100% Instantané',
      diamonds: '100 à 5 600+ 💎',
      summary:
        'Le moyen le plus direct : vos diamants sont crédités en quelques secondes sur votre compte Free Fire via votre UID.',
      points: [
        'Crédit direct dans l\'inventaire',
        'Valable pour débloquer les Top-Up Events en cours',
        'Nombreuses coupures disponibles (100, 310, 520, 1060, 2180, 5600💎)',
      ],
      icon: Diamond,
      color: 'emerald',
    },
    {
      title: 'Level Up Pass (Pass Niveau)',
      category: 'Rentabilité Maximale',
      badge: 'Jusqu\'à +300% de Diamants',
      diamonds: '800 💎 au Total',
      summary:
        'L\'offre la plus rentable créée par Garena : débloquez 800 diamants du niveau 1 au niveau 30. (Rétroactif si déjà niveau 30+ !)',
      points: [
        'Meilleur ratio prix/diamant de Free Fire',
        '800 diamants au prix d\'un petit pack standard',
        'Récupération rétroactive immédiate pour les anciens joueurs',
      ],
      icon: TrendingUp,
      color: 'lime',
    },
    {
      title: 'Abonnements Hebdo & Mensuel',
      category: 'Adhésion VIP Quotidienne',
      badge: '450💎 à 2 600💎 + Badge VIP',
      diamonds: 'Journalier + Immédiat',
      summary:
        'Recevez des diamants à la connexion tous les jours pendant 7 ou 30 jours, plus des caisses d\'armes et privilèges boutique.',
      points: [
        'Carte Hebdo : 100 immédiats + 50/j (450💎)',
        'Carte Mensuelle : 500 immédiats + 70/j (2600💎) + caisses d\'armes',
        'Super VIP : +15💎 bonus par jour en cumulant les deux',
      ],
      icon: Crown,
      color: 'amber',
    },
    {
      title: 'Pass Booyah Saisonnier',
      category: 'Cosmétiques & Armes Légendaires',
      badge: 'Pass Saisonnier Officiel',
      diamonds: 'Récompenses exclusives',
      summary:
        'Débloquez les tenues emblématiques de la saison, les skins d\'armes évolutives, émotes mythiques et packs de caisses.',
      points: [
        'Déblocage des paliers de combat de la saison',
        'Option Premium Plus avec 50 niveaux d\'avance immédiats',
        'Objets exclusifs non disponibles en boutique normale',
      ],
      icon: Layers,
      color: 'cyan',
    },
  ];

  return (
    <section
      id="guide-recharge"
      className="relative py-20 sm:py-24 bg-zinc-950 border-t border-emerald-500/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-black/80 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              Guide Complet Garena Free Fire
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white uppercase drop-shadow-sm mb-4">
            Tous les Moyens de <span className="text-emerald-400">Recharge</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
            Broly Store prend en charge l'ensemble des méthodes officielles de recharges et d'abonnements proposées par Garena.
          </p>
        </div>

        {/* 4 Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rechargeMethods.map((method, index) => {
            const IconComponent = method.icon;

            return (
              <div
                key={index}
                className="rounded-2xl p-6 bg-black/70 border border-zinc-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      {method.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {method.title}
                  </h3>

                  <div className="text-xs font-mono font-bold text-emerald-400 mb-3">
                    {method.diamonds}
                  </div>

                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                    {method.summary}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-zinc-800/80">
                    {method.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <div className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{method.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
