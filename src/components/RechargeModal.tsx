import React, { useState } from 'react';
import { DiamondPack } from '../types';
import { DiamondIcon } from './DiamondIcon';
import { BrolyLogo } from './BrolyLogo';
import { X, CheckCircle2, ShieldCheck, Zap, Copy, Check } from 'lucide-react';

interface RechargeModalProps {
  pack: DiamondPack | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({
  pack,
  isOpen,
  onClose,
}) => {
  const [playerId, setPlayerId] = useState('');
  const [serverRegion, setServerRegion] = useState('europe');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !pack) return null;

  const isFutureOffer = pack.status === 'future';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerId.trim()) return;

    setIsSubmitting(true);
    // Simulate brief processing verification
    setTimeout(() => {
      const generatedRef = isFutureOffer
        ? `BROLY-FUTUR-${Math.floor(100000 + Math.random() * 900000)}`
        : `BROLY-FF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderRef(generatedRef);
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 800);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(orderRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setPlayerId('');
    setOrderComplete(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={resetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(34,197,94,0.3)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle geometric background ki glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-emerald-300 hover:bg-zinc-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Fermer la boîte de dialogue"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <BrolyLogo size={32} glow />
              <div>
                <h3 id="modal-title" className="font-display font-bold text-lg text-white">
                  {isFutureOffer ? (
                    <span>Offre Future • <span className="text-cyan-400">Pré-inscription</span></span>
                  ) : (
                    <span>Recharge Free Fire • <span className="text-emerald-400">Broly</span></span>
                  )}
                </h3>
                <p className="text-xs text-emerald-400/80">
                  {isFutureOffer
                    ? 'Soyez notifié et prioritaire dès le lancement du pack'
                    : 'Broly Store • Service instantané garanti'}
                </p>
              </div>
            </div>

            {/* Selected Pack Card */}
            <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/30 mb-6 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-black/90 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                    <DiamondIcon size={30} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-base">
                      {pack.title}
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center flex-wrap gap-2 mt-0.5">
                      {pack.bonus ? (
                        <span className="text-emerald-400 font-semibold">+{pack.bonus} bonus offerts</span>
                      ) : null}
                      {pack.totalDiamonds ? (
                        <span className="text-emerald-400 font-semibold font-mono">Total {pack.totalDiamonds} 💎</span>
                      ) : null}
                      <span>• {pack.price}</span>
                    </div>
                    {isFutureOffer && pack.releaseDate && (
                      <div className="text-[11px] text-cyan-300 font-mono mt-1">
                        Sortie : {pack.releaseDate}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border shadow-sm ${
                    isFutureOffer
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {pack.price}
                  </span>
                </div>
              </div>

              {/* Special breakdown badge for memberships & levelup */}
              {(pack.immediateDiamonds || pack.category === 'levelup') && (
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-300">
                  {pack.category === 'levelup' ? (
                    <span className="text-emerald-300 font-medium">
                      ⚡ Déblocage progressif ou instantané (jusqu'à 800💎 selon votre niveau)
                    </span>
                  ) : pack.immediateDiamonds && pack.dailyDiamonds ? (
                    <span className="text-emerald-300 font-medium">
                      ⚡ +{pack.immediateDiamonds}💎 immédiats et +{pack.dailyDiamonds}💎/jour pendant {pack.durationDays}j
                    </span>
                  ) : null}
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-1.5">
                  Identifiant Joueur Free Fire (UID) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Ex: 1892837410"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-emerald-500/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors font-mono"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Retrouvez votre UID dans votre profil joueur en haut à gauche du jeu.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-1.5">
                  Région du serveur
                </label>
                <select
                  value={serverRegion}
                  onChange={(e) => setServerRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-emerald-500/30 text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                >
                  <option value="europe">Europe (EU)</option>
                  <option value="mena">Moyen-Orient & Afrique du Nord (MENA)</option>
                  <option value="na">Amérique du Nord (NA)</option>
                  <option value="latam">Amérique Latine (LATAM)</option>
                  <option value="global">Autre / Global</option>
                </select>
              </div>

              {/* Guarantees */}
              <div className="pt-2 pb-1 grid grid-cols-2 gap-2 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Sécurisé sans mot de passe</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Recharge ultra-rapide</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !playerId.trim()}
                className={`w-full mt-4 py-3.5 px-6 rounded-xl font-extrabold text-sm hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 ${
                  isFutureOffer
                    ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_rgba(34,211,238,0.8)]'
                    : 'bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500 text-black shadow-[0_0_25px_rgba(74,222,128,0.6)] hover:shadow-[0_0_35px_rgba(163,230,53,0.8)]'
                }`}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    {isFutureOffer ? 'Enregistrement de la pré-inscription...' : "Vérification de l'ID Joueur..."}
                  </span>
                ) : (
                  <span>
                    {isFutureOffer ? "M'inscrire pour l'Offre Future" : `Confirmer la recharge (${pack.title})`}
                  </span>
                )}
              </button>

              <p className="text-center text-[11px] text-zinc-500 pt-1">
                {isFutureOffer
                  ? 'Broly Store • Soyez alerté dès la sortie officielle de ce pack.'
                  : 'Broly Store • Vos diamants crédités directement par UID.'}
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-4 space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              isFutureOffer
                ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.6)]'
                : 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 shadow-[0_0_30px_rgba(74,222,128,0.6)]'
            }`}>
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">
                {isFutureOffer ? 'Pré-inscription Validée !' : 'Demande Enregistrée !'}
              </h3>
              <p className="text-sm text-zinc-300 max-w-sm mx-auto">
                {isFutureOffer ? (
                  <>
                    Votre pré-inscription pour l'offre future <span className="text-cyan-300 font-semibold">{pack.title}</span> pour le compte UID{' '}
                    <span className="text-cyan-400 font-semibold font-mono">{playerId}</span> a été enregistrée en priorité.
                  </>
                ) : (
                  <>
                    Votre sélection de <span className="text-emerald-300 font-semibold">{pack.title}</span> pour le compte UID{' '}
                    <span className="text-emerald-400 font-semibold font-mono">{playerId}</span> a été préparée avec succès.
                  </>
                )}
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 rounded-xl bg-black border border-emerald-500/40 max-w-sm mx-auto text-left shadow-lg">
              <div className="text-[11px] uppercase tracking-wider text-emerald-400/80 mb-1">
                Numéro de référence
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-white tracking-wider">{orderRef}</span>
                <button
                  onClick={handleCopyRef}
                  className="p-1.5 rounded bg-zinc-900 border border-emerald-500/30 hover:bg-emerald-950/40 text-emerald-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copié' : 'Copier'}</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-zinc-400 max-w-xs mx-auto">
              Conservez cette référence. Notre service finalisera les livraisons avec la puissance Broly.
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 px-6 rounded-xl border border-emerald-500/40 bg-black hover:bg-emerald-950/40 text-emerald-300 font-semibold text-sm transition-colors"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
