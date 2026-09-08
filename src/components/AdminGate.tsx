import React, { useState } from 'react';
import { ShieldAlert, Lock, ArrowRight, Eye, EyeOff, Store, KeyRound } from 'lucide-react';
import { authenticateAdmin, getSecretAdminUrl } from '../lib/adminSecurity';
import { BrolyLogo } from './BrolyLogo';

interface AdminGateProps {
  onUnlock: () => void;
  onExit: () => void;
}

export const AdminGate: React.FC<AdminGateProps> = ({ onUnlock, onExit }) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(passcode.trim())) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 selection:bg-emerald-400 selection:text-black relative overflow-hidden">
      {/* Background Aura Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Lock Box */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-950/90 border border-emerald-500/40 rounded-3xl p-7 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-xl">
          {/* Logo & Security Badge */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-2xl bg-black border border-emerald-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                <BrolyLogo size={36} glow />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_10px_#4ade80]">
                <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 uppercase tracking-widest mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Console Privée Propriétaire</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl tracking-wider text-white">
              TERMINAL <span className="text-emerald-400">SÉCURISÉ</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Zone strictement réservée à l'administrateur de Broly Store.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
                <span>Code d'Accès Maître</span>
                <span className="text-[10px] text-zinc-500 font-sans">Défaut : BROLY2026</span>
              </label>

              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <KeyRound className="w-4 h-4 text-emerald-400/80" />
                </div>
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Entrez votre code maître..."
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-black/80 border text-sm text-white placeholder-zinc-600 font-mono tracking-widest focus:outline-none transition-all ${
                    error
                      ? 'border-red-500/80 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : 'border-zinc-800 focus:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.15)]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs font-mono text-red-400 flex items-center gap-1.5 animate-in fade-in">
                  <span>⚠️ Code maître incorrect. Veuillez réessayer.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 text-black font-semibold text-sm tracking-wide hover:bg-lime-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] cursor-pointer"
            >
              <span>Déverrouiller le Terminal</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Secret URL Reminder Card */}
          <div className="mt-6 pt-5 border-t border-zinc-900 text-center">
            <p className="text-[11px] text-zinc-500 leading-relaxed mb-4">
              Conservez l'URL secrète de cette page dans vos favoris privés pour y revenir à tout moment sans laisser de trace sur la boutique.
            </p>

            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-300 transition-colors font-mono"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Retourner à la boutique publique</span>
            </button>
          </div>
        </div>

        {/* Security Note Footer */}
        <p className="text-center text-[10px] text-zinc-600 font-mono mt-4">
          URL camouflée & protégée • Broly Store 2026
        </p>
      </div>
    </div>
  );
};
