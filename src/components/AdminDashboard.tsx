import React, { useState, useEffect } from 'react';
import { DiamondPack, OfferStatus, OfferCategory } from '../types';
import {
  getStoredOffers,
  saveOffers,
  addOrUpdateOffer,
  deleteOffer,
  toggleOfferStatus,
  resetOffersToDefault,
  OFFERS_UPDATED_EVENT,
} from '../lib/offersStorage';
import {
  getSecretAdminUrl,
  logoutAdmin,
  getMasterPasscode,
  updateMasterPasscode,
  SECRET_ADMIN_TOKEN,
} from '../lib/adminSecurity';
import { BrolyLogo } from './BrolyLogo';
import { DiamondIcon } from './DiamondIcon';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Calendar,
  Zap,
  CheckCircle2,
  Clock,
  RotateCcw,
  Search,
  ExternalLink,
  ShieldAlert,
  Tag,
  Eye,
  Sliders,
  X,
  Crown,
  TrendingUp,
  Layers,
  Copy,
  Check,
  Lock,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const [offers, setOffers] = useState<DiamondPack[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'future' | 'levelup' | 'membership' | 'pass'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<DiamondPack | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    id?: string;
    title: string;
    diamonds: number;
    bonus: number;
    price: string;
    status: OfferStatus;
    category: OfferCategory;
    releaseDate: string;
    badgeText: string;
    popular: boolean;
    bestValue: boolean;
    description: string;
    totalDiamonds?: number;
    immediateDiamonds?: number;
    dailyDiamonds?: number;
    durationDays?: number;
  }>({
    title: '',
    diamonds: 500,
    bonus: 50,
    price: 'Prix à définir',
    status: 'active',
    category: 'direct',
    releaseDate: '',
    badgeText: '',
    popular: false,
    bestValue: false,
    description: '',
    totalDiamonds: 500,
    immediateDiamonds: 0,
    dailyDiamonds: 0,
    durationDays: 0,
  });

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeMsg, setPasscodeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCopyUrl = async () => {
    const url = getSecretAdminUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedUrl(true);
      showToast('URL secrète copiée ! Sauvegardez-la dans vos favoris privés.');
      setTimeout(() => setCopiedUrl(false), 3000);
    } catch {
      showToast("Impossible de copier automatiquement l'URL.");
    }
  };

  const handleSaveNewPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.trim().length < 4) {
      setPasscodeMsg({ type: 'error', text: 'Le code doit comporter au moins 4 caractères.' });
      return;
    }
    updateMasterPasscode(newPasscode.trim());
    setPasscodeMsg({ type: 'success', text: 'Code maître mis à jour avec succès !' });
    setNewPasscode('');
    setTimeout(() => {
      setShowSecurityModal(false);
      setPasscodeMsg(null);
    }, 1500);
  };

  // Load offers on mount and listen to changes
  useEffect(() => {
    const load = () => {
      setOffers(getStoredOffers());
    };
    load();

    const handleUpdate = () => {
      setOffers(getStoredOffers());
    };

    window.addEventListener(OFFERS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(OFFERS_UPDATED_EVENT, handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openCreateModal = (presetStatus: OfferStatus = 'active') => {
    setEditingOffer(null);
    setFormData({
      title: presetStatus === 'future' ? 'Offre Future : Pack ' : 'Pack ',
      diamonds: 1000,
      bonus: 100,
      price: presetStatus === 'future' ? 'À venir' : 'Prix à définir',
      status: presetStatus,
      category: 'direct',
      releaseDate: presetStatus === 'future' ? 'Prochainement en 2026' : '',
      badgeText: presetStatus === 'future' ? 'Offre Future' : '',
      popular: false,
      bestValue: false,
      description: presetStatus === 'future' 
        ? 'Offre spéciale à venir prochainement sur Broly Store avec des bonus exclusifs.'
        : 'Recharge directe sur votre identifiant joueur Free Fire.',
      totalDiamonds: 1000,
      immediateDiamonds: 0,
      dailyDiamonds: 0,
      durationDays: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pack: DiamondPack) => {
    setEditingOffer(pack);
    setFormData({
      id: pack.id,
      title: pack.title,
      diamonds: pack.diamonds,
      bonus: pack.bonus || 0,
      price: pack.price,
      status: pack.status || 'active',
      category: pack.category || 'direct',
      releaseDate: pack.releaseDate || '',
      badgeText: pack.badgeText || '',
      popular: !!pack.popular,
      bestValue: !!pack.bestValue,
      description: pack.description || '',
      totalDiamonds: pack.totalDiamonds || pack.diamonds,
      immediateDiamonds: pack.immediateDiamonds || 0,
      dailyDiamonds: pack.dailyDiamonds || 0,
      durationDays: pack.durationDays || 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Veuillez entrer un titre pour cette offre.');
      return;
    }

    const offerId = editingOffer ? editingOffer.id : `pack-${Date.now()}`;
    const newOffer: DiamondPack = {
      id: offerId,
      title: formData.title.trim(),
      diamonds: Number(formData.diamonds) || 0,
      bonus: Number(formData.bonus) > 0 ? Number(formData.bonus) : undefined,
      price: formData.price.trim() || 'Prix à définir',
      status: formData.status,
      category: formData.category,
      releaseDate: formData.releaseDate.trim() || undefined,
      badgeText: formData.badgeText.trim() || undefined,
      popular: formData.popular,
      bestValue: formData.bestValue,
      description: formData.description.trim() || undefined,
      totalDiamonds: Number(formData.totalDiamonds) || undefined,
      immediateDiamonds: Number(formData.immediateDiamonds) > 0 ? Number(formData.immediateDiamonds) : undefined,
      dailyDiamonds: Number(formData.dailyDiamonds) > 0 ? Number(formData.dailyDiamonds) : undefined,
      durationDays: Number(formData.durationDays) > 0 ? Number(formData.durationDays) : undefined,
    };

    addOrUpdateOffer(newOffer);
    setIsModalOpen(false);
    showToast(
      editingOffer
        ? `Offre "${newOffer.title}" modifiée avec succès.`
        : `Nouvelle offre ${newOffer.status === 'future' ? 'FUTURE' : 'ACTIVE'} ajoutée !`
    );
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l'offre "${title}" ?`)) {
      deleteOffer(id);
      showToast(`Offre "${title}" supprimée.`);
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleOfferStatus(id);
    showToast('Statut de l\'offre mis à jour (Active ⟷ Future).');
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser toutes les offres aux packs par défaut ?')) {
      resetOffersToDefault();
      showToast('Offres réinitialisées aux valeurs initiales.');
    }
  };

  // Filtered offers
  const filteredOffers = offers.filter((o) => {
    let matchesTab = true;
    if (activeTab === 'active') {
      matchesTab = (o.status || 'active') === 'active';
    } else if (activeTab === 'future') {
      matchesTab = o.status === 'future';
    } else if (activeTab === 'levelup') {
      matchesTab = o.category === 'levelup';
    } else if (activeTab === 'membership') {
      matchesTab = o.category === 'membership';
    } else if (activeTab === 'pass') {
      matchesTab = o.category === 'pass';
    }

    const matchesSearch =
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.diamonds.toString().includes(searchQuery) ||
      (o.price && o.price.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.releaseDate && o.releaseDate.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const activeCount = offers.filter((o) => (o.status || 'active') === 'active').length;
  const futureCount = offers.filter((o) => o.status === 'future').length;
  const levelUpCount = offers.filter((o) => o.category === 'levelup').length;
  const membershipCount = offers.filter((o) => o.category === 'membership').length;
  const passCount = offers.filter((o) => o.category === 'pass').length;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-400 selection:text-black font-sans pb-20">
      {/* Toast message */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl bg-emerald-500 text-black font-semibold text-sm shadow-[0_0_25px_rgba(74,222,128,0.7)] flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-emerald-500/30 px-5 sm:px-8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <button
              onClick={onBackToStore}
              className="p-2 rounded-xl bg-black border border-zinc-800 text-zinc-400 hover:text-white hover:border-emerald-500/60 transition-all group"
              title="Retour à la boutique publique"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <BrolyLogo size={32} glow />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-lg tracking-wider text-white uppercase">
                  Broly Store <span className="text-emerald-400">Admin</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>ACCÈS CAMOUFLÉ</span>
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Console de gestion privée • URL secrète et sécurisée
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Copier URL Secrète */}
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/40 text-xs font-mono text-emerald-300 transition-all shadow-sm"
              title="Copier votre URL secrète d'accès à l'administration"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline font-semibold">{copiedUrl ? 'URL Copiée !' : 'Copier URL Secrète'}</span>
            </button>

            {/* Code Maître */}
            <button
              onClick={() => setShowSecurityModal(true)}
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
              title="Modifier le code maître de sécurité"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
            </button>

            {/* Verrouiller / Quitter */}
            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-red-950/50 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors"
              title="Verrouiller la session admin et retourner à la boutique"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={onBackToStore}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-emerald-500/50 text-xs font-semibold text-zinc-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Boutique</span>
            </button>

            <button
              onClick={() => openCreateModal('active')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 text-black hover:bg-lime-300 font-bold text-xs shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Nouvelle Offre</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 mt-6">
        {/* Security Info Banner */}
        <div className="mb-6 p-4.5 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Boutique et Console Séparées & Camouflées
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black text-zinc-400 border border-zinc-800">
                  Invisible pour les visiteurs
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Aucun lien d'administration n'est affiché sur la boutique publique. Votre console est protégée par un jeton secret et un code maître.
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500">Votre URL secrète :</span>
                <code className="text-[11px] font-mono text-emerald-300 bg-black px-3 py-1 rounded-lg border border-zinc-800 break-all select-all font-semibold">
                  {getSecretAdminUrl()}
                </code>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyUrl}
            className="shrink-0 w-full md:w-auto px-4 py-2.5 rounded-xl bg-emerald-400 text-black hover:bg-lime-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(74,222,128,0.4)] cursor-pointer"
          >
            {copiedUrl ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            <span>{copiedUrl ? 'URL Copiée !' : 'Copier mon URL secrète'}</span>
          </button>
        </div>
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Card 1: Total Offres */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Total Catalogue</span>
              <div className="text-3xl font-black font-display text-white mt-1">{offers.length}</div>
              <span className="text-[11px] text-zinc-400">Packs configurés</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Tag className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Offres Actives */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 to-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">Actives</span>
              </div>
              <div className="text-3xl font-black font-display text-emerald-300 mt-1">{activeCount}</div>
              <span className="text-[11px] text-emerald-400/80">Disponibles immédiatement</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Offres Futures */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 to-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold">Offres Futures</span>
              </div>
              <div className="text-3xl font-black font-display text-cyan-300 mt-1">{futureCount}</div>
              <span className="text-[11px] text-cyan-400/80">Prochainement / Teasers</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Bar: Filters, Search, Create Future Offer shortcut */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Toutes ({offers.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === 'active'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Actives ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('levelup')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === 'levelup'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              Level Up ({levelUpCount})
            </button>
            <button
              onClick={() => setActiveTab('membership')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === 'membership'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Crown className="w-3 h-3 text-amber-400" />
              Abonnements ({membershipCount})
            </button>
            <button
              onClick={() => setActiveTab('pass')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === 'pass'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3 text-emerald-400" />
              Passes ({passCount})
            </button>
            <button
              onClick={() => setActiveTab('future')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === 'future'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3 text-cyan-400" />
              Futures ({futureCount})
            </button>
          </div>

          {/* Search + Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher une offre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/70"
              />
            </div>

            <button
              onClick={() => openCreateModal('future')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 text-xs font-semibold transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Offre Future</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-red-400 transition-colors"
              title="Réinitialiser les packs par défaut"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Offers Grid / List */}
        {filteredOffers.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-zinc-800 bg-zinc-950/60 my-6">
            <Tag className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-300 mb-1">Aucune offre trouvée</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-5">
              Aucune offre ne correspond à vos critères de recherche ou de filtre.
            </p>
            <button
              onClick={() => openCreateModal('active')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 text-black font-bold text-xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Créer une offre maintenant
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOffers.map((pack) => {
              const isFuture = pack.status === 'future';

              return (
                <div
                  key={pack.id}
                  className={`relative p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
                    isFuture
                      ? 'bg-gradient-to-b from-zinc-950 to-cyan-950/20 border-cyan-500/40 hover:border-cyan-400 shadow-[0_4px_25px_rgba(6,182,212,0.15)]'
                      : 'bg-gradient-to-b from-zinc-950 to-emerald-950/20 border-emerald-500/30 hover:border-emerald-400 shadow-[0_4px_25px_rgba(34,197,94,0.1)]'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold tracking-wider uppercase ${
                        isFuture
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(74,222,128,0.3)]'
                      }`}
                    >
                      {isFuture ? (
                        <>
                          <Clock className="w-3 h-3 text-cyan-400" />
                          OFFRE FUTURE
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          ACTIVE
                        </>
                      )}
                    </span>

                    {/* Secondary tags */}
                    <div className="flex flex-wrap items-center gap-1">
                      {pack.category === 'levelup' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          ⚡ Level Up
                        </span>
                      )}
                      {pack.category === 'membership' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          👑 VIP
                        </span>
                      )}
                      {pack.category === 'pass' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          🏆 Pass
                        </span>
                      )}
                      {pack.popular && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-black">
                          Populaire
                        </span>
                      )}
                      {pack.bestValue && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-black">
                          Meilleur
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>
                    <div className="flex items-start gap-3.5 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                          isFuture
                            ? 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
                            : 'bg-black border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        <DiamondIcon size={26} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-lg text-white truncate leading-snug">
                          {pack.title}
                        </h3>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">
                          <span className="text-white font-bold">{pack.diamonds.toLocaleString()}</span> Diamants
                          {pack.bonus ? (
                            <span className="text-emerald-400 font-bold ml-1.5">
                              (+{pack.bonus} bonus)
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Release Date for Future Offers */}
                    {isFuture && (
                      <div className="mb-3 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-2 text-xs text-cyan-300">
                        <Calendar className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                        <span className="font-mono">
                          Sortie : <strong className="text-white">{pack.releaseDate || 'Bientôt disponible'}</strong>
                        </span>
                      </div>
                    )}

                    {pack.description && (
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                        {pack.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom: Price + Action Controls */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Tarif</span>
                      <span className="text-sm font-bold text-white font-mono">{pack.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Toggle Active / Future */}
                      <button
                        onClick={() => handleToggleStatus(pack.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                          isFuture
                            ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                            : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60'
                        }`}
                        title={isFuture ? "Activer l'offre immédiatement" : "Transformer en Offre Future"}
                      >
                        {isFuture ? 'Activer' : 'Mettre en Future'}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(pack)}
                        className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        title="Modifier cette offre"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(pack.id, pack.title)}
                        className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-red-950/60 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Supprimer cette offre"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* CREATE / EDIT OFFER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(34,197,94,0.25)] my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-zinc-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                    {editingOffer ? "Modifier l'offre" : 'Créer une nouvelle offre'}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Définissez les caractéristiques du pack ou de l'offre future
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type / Statut Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Type de l'offre *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'active' })}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all ${
                      formData.status === 'active'
                        ? 'bg-emerald-950/50 border-emerald-400 text-white shadow-[0_0_20px_rgba(74,222,128,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.status === 'active'
                          ? 'border-emerald-400 bg-emerald-400'
                          : 'border-zinc-600'
                      }`}
                    >
                      {formData.status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Offre Active</div>
                      <div className="text-[11px] text-zinc-400">Disponible immédiatement à l'achat</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'future' })}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all ${
                      formData.status === 'future'
                        ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.status === 'future'
                          ? 'border-cyan-400 bg-cyan-400'
                          : 'border-zinc-600'
                      }`}
                    >
                      {formData.status === 'future' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-300">Offre Future</div>
                      <div className="text-[11px] text-zinc-400">À venir / Teaser / Précommande</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Catégorie d'offre Garena Free Fire */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Catégorie d'offre Garena Free Fire *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'direct' })}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      formData.category === 'direct'
                        ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    💎 Recharge Directe
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: 'levelup',
                        title: formData.title || 'Level Up Pass',
                        diamonds: 800,
                        totalDiamonds: 800,
                        badgeText: formData.badgeText || 'Rentabilité +300%',
                      })
                    }
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      formData.category === 'levelup'
                        ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    ⚡ Level Up Pass
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: 'membership',
                        title: formData.title || 'Abonnement VIP Free Fire',
                        immediateDiamonds: 100,
                        dailyDiamonds: 50,
                        durationDays: 7,
                        totalDiamonds: 450,
                      })
                    }
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      formData.category === 'membership'
                        ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    👑 Abonnement VIP
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: 'pass',
                        title: formData.title || 'Booyah Pass Premium',
                      })
                    }
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      formData.category === 'pass'
                        ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    🏆 Booyah Pass
                  </button>
                </div>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Titre du Pack / Offre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: 520 Diamants ou Level Up Pass ou Carte Hebdo"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/70"
                />
              </div>

              {/* Diamants & Bonus / Membership breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {formData.category === 'membership' || formData.category === 'levelup'
                      ? 'Total Diamants Délivrés *'
                      : 'Quantité de Diamants *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.diamonds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        diamonds: Number(e.target.value),
                        totalDiamonds: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-500/70 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Diamants Bonus offerts (optionnel)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.bonus}
                    onChange={(e) => setFormData({ ...formData, bonus: Number(e.target.value) })}
                    placeholder="Ex: 52"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500/70 font-mono"
                  />
                </div>
              </div>

              {/* Specific inputs for Memberships */}
              {formData.category === 'membership' && (
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                      Diamants Immédiats
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.immediateDiamonds || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, immediateDiamonds: Number(e.target.value) })
                      }
                      placeholder="Ex: 100"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-amber-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                      Diamants par Jour
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.dailyDiamonds || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, dailyDiamonds: Number(e.target.value) })
                      }
                      placeholder="Ex: 50"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-amber-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                      Durée (en Jours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.durationDays || 7}
                      onChange={(e) =>
                        setFormData({ ...formData, durationDays: Number(e.target.value) })
                      }
                      placeholder="7 ou 30"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-amber-300 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tarif & Date de sortie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Tarif affiché *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ex: 4.99 €, 2500 FCFA ou À venir"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-500/70 font-mono"
                  />
                </div>

                {formData.status === 'future' ? (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
                      Date ou Période de sortie prévue
                    </label>
                    <input
                      type="text"
                      value={formData.releaseDate}
                      onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                      placeholder="Ex: 15 Octobre 2026, Dans 2 semaines"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-cyan-500/50 text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Texte du Badge Spécial (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText}
                      onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                      placeholder="Ex: Exclusif Broly, Promo -20%"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-500/70"
                    />
                  </div>
                )}
              </div>

              {/* Options populaires / badges */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                  />
                  <span>Afficher badge "Populaire"</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.bestValue}
                    onChange={(e) => setFormData({ ...formData, bestValue: e.target.checked })}
                    className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                  />
                  <span>Afficher badge "Meilleure Valeur"</span>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Description de l'offre
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Informations supplémentaires sur le pack..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500/70"
                />
              </div>

              {/* Live Card Preview */}
              <div className="pt-3 border-t border-zinc-800">
                <div className="text-xs font-mono text-zinc-400 mb-2 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aperçu sur la boutique :</span>
                </div>

                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    formData.status === 'future'
                      ? 'bg-cyan-950/30 border-cyan-500/40'
                      : 'bg-black border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <DiamondIcon size={24} />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {formData.title || 'Titre du Pack'}
                      </div>
                      <div className="text-xs text-zinc-400 font-mono">
                        {formData.diamonds} 💎
                        {formData.bonus > 0 && ` (+${formData.bonus} bonus)`}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-300">
                      {formData.price || 'À venir'}
                    </div>
                    {formData.status === 'future' && (
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {formData.releaseDate || 'Bientôt'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-400 text-black hover:bg-lime-300 text-xs font-bold shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-all"
                >
                  {editingOffer ? 'Enregistrer les modifications' : "Créer l'offre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Security Passcode Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-emerald-500/40 p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)]">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Sécurité Administrateur
                  </h3>
                  <span className="text-[11px] text-zinc-500">Changement du code maître</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSecurityModal(false);
                  setPasscodeMsg(null);
                  setNewPasscode('');
                }}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPasscode} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Code Maître Actuel
                </label>
                <div className="px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-emerald-300">
                  {getMasterPasscode()}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Nouveau Code Maître (min. 4 caractères)
                </label>
                <input
                  type="text"
                  required
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Ex: BROLY_SECRET_99"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>

              {passcodeMsg && (
                <p
                  className={`text-xs font-mono ${
                    passcodeMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {passcodeMsg.text}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={() => {
                    setShowSecurityModal(false);
                    setPasscodeMsg(null);
                    setNewPasscode('');
                  }}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-400 text-black hover:bg-lime-300 text-xs font-bold shadow-[0_0_15px_rgba(74,222,128,0.4)]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
