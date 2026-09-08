import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, X, MessageSquare, Headphones } from 'lucide-react';
import { BrolyLogo } from './BrolyLogo';
import { BrolyKiParticles } from './BrolyKiParticles';

export const ContactSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    uid: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', uid: '', message: '' });
    setModalOpen(false);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-40 bg-black border-t border-emerald-500/30 overflow-hidden"
    >
      {/* Floating Broly Ki Particles */}
      <BrolyKiParticles count={16} />

      {/* 
        FULL-SCREEN ANIMATED BACKGROUND:
        Requested URL: https://c.tenor.com/o2yvhKVBgO8AAAAC/tenor.gif
        Covers the full section, brightly visible with subtle overlay for contrast
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Broly Green Ki Ambient Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/12 rounded-full blur-3xl animate-ki-aura pointer-events-none" />

        <img
          src="https://c.tenor.com/o2yvhKVBgO8AAAAC/tenor.gif"
          alt="Broly Store Contact Background"
          className="w-full h-full object-cover object-center scale-105"
          onError={(e) => {
            e.currentTarget.src = '/contact-bg.gif';
          }}
        />

        {/* Minimal dark overlay with emerald aura */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        {/* Seamless edge blending gradients */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-black/75 backdrop-blur-md mb-4 shadow-[0_0_16px_rgba(34,197,94,0.3)]">
          <Headphones className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
            Service Client 24/7 • Réponse Rapide
          </span>
        </div>

        {/* Title: "Besoin d'aide ?" */}
        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Besoin d'
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-green-500 drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]">
            aide
          </span>{' '}
          ?
        </h2>

        {/* Text */}
        <p className="text-zinc-200 text-lg sm:text-xl font-normal max-w-xl mx-auto mb-10 sm:mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Notre équipe <span className="text-emerald-400 font-semibold">Broly Store</span> est là pour vous accompagner.
        </p>

        {/* Large Outlined Button: "Nous contacter" */}
        <div className="flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="group relative inline-flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-emerald-400/80 bg-black/75 backdrop-blur-md hover:bg-emerald-400 hover:text-black text-white text-base sm:text-lg font-bold tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(74,222,128,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Ouvrir le formulaire de contact"
          >
            <span>Nous contacter</span>
            <span className="w-8 h-8 rounded-full bg-emerald-400 text-black group-hover:bg-black group-hover:text-emerald-300 flex items-center justify-center transition-all shadow-[0_0_12px_rgba(74,222,128,0.8)]">
              <Mail className="w-4 h-4 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>

      {/* Contact Modal Dialog */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleReset}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-zinc-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(34,197,94,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <BrolyLogo size={32} glow />
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Support <span className="text-emerald-400">Broly Store</span>
                    </h3>
                    <p className="text-xs text-emerald-400/80">Assistance joueur Free Fire</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-1.5">
                      Nom ou Pseudo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom de joueur"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-emerald-500/30 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-emerald-500/30 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-1.5">
                      UID Free Fire (Optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 198237411"
                      value={formData.uid}
                      onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-emerald-500/30 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-1.5">
                      Votre Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Comment pouvons-nous vous aider concernant votre recharge ?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-emerald-500/30 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-bold text-sm hover:brightness-110 shadow-[0_0_25px_rgba(74,222,128,0.6)] transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Envoyer le message</span>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  Message Envoyé
                </h3>
                <p className="text-sm text-zinc-300 max-w-sm mx-auto">
                  Merci {formData.name}. L'équipe <span className="text-emerald-400 font-semibold">Broly Store</span> prendra en charge votre demande dans les plus brefs délais.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-full border border-emerald-400/50 bg-black text-emerald-300 text-sm hover:bg-emerald-950/50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
