/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DiamondsSection } from './components/DiamondsSection';
import { LevelUpSection } from './components/LevelUpSection';
import { MembershipsSection } from './components/MembershipsSection';
import { GarenaRechargeGuideSection } from './components/GarenaRechargeGuideSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminGate } from './components/AdminGate';
import { RechargeModal } from './components/RechargeModal';
import { DiamondPack } from './types';
import { getStoredOffers, OFFERS_UPDATED_EVENT } from './lib/offersStorage';
import { isSecretAdminRoute, isAdminAuthenticated } from './lib/adminSecurity';

export default function App() {
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [offers, setOffers] = useState<DiamondPack[]>([]);
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

  // Détection de l'URL secrète indéchiffrable avec caractères spéciaux
  useEffect(() => {
    const checkRoute = () => {
      const rawHash = (window.location.hash || '').toLowerCase();
      const rawPath = (window.location.pathname || '').toLowerCase();

      // Sécurité : Bloquer et rediriger les anciennes tentatives d'accès à /admin ou #admin
      if (rawHash === '#admin' || rawHash === '#/admin' || rawPath === '/admin') {
        window.location.hash = '';
        window.history.replaceState(null, '', window.location.pathname.replace(/\/admin/i, '') || '/');
        setCurrentView('store');
        return;
      }

      // Vérifier si l'URL contient le jeton d'accès secret camouflé
      if (isSecretAdminRoute()) {
        setCurrentView('admin');
        setAdminUnlocked(isAdminAuthenticated());
      } else {
        setCurrentView('store');
      }
    };

    checkRoute();

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const navigateToStore = () => {
    window.location.hash = '';
    window.history.replaceState(null, '', window.location.pathname || '/');
    setCurrentView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentView !== 'store') return;

    const handleScroll = () => {
      const sections = ['home', 'services', 'levelup', 'abonnements', 'apropos', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleDiscover = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderPack = (pack: DiamondPack) => {
    setSelectedPack(pack);
    setModalOpen(true);
  };

  const levelUpPack = offers.find((p) => p.category === 'levelup' && (p.status || 'active') === 'active');

  // If in Admin View, show either Security Gate or the full Admin Dashboard
  if (currentView === 'admin') {
    if (!adminUnlocked) {
      return (
        <AdminGate
          onUnlock={() => setAdminUnlocked(true)}
          onExit={navigateToStore}
        />
      );
    }
    return <AdminDashboard onBackToStore={navigateToStore} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-400 selection:text-black flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* Fullscreen Hero matching reference design with GIF background */}
        <Hero onDiscoverClick={handleDiscover} />

        {/* Free Fire Diamonds Product Showcase */}
        <DiamondsSection />

        {/* Level Up Pass Section with interactive Level 1-30 simulator */}
        <LevelUpSection levelUpPack={levelUpPack} onOrderPack={handleOrderPack} />

        {/* Garena Memberships & Booyah Pass Section */}
        <MembershipsSection offers={offers} onOrderPack={handleOrderPack} />

        {/* Official Garena Recharge Guide Overview */}
        <GarenaRechargeGuideSection />

        {/* About: Pourquoi Broly Store ? */}
        <AboutSection />

        {/* How It Works: 01 02 03 */}
        <HowItWorksSection />

        {/* Contact Support: Besoin d'aide ? */}
        <ContactSection />
      </main>

      {/* Minimalist Footer */}
      <Footer />

      {/* Shared Recharge Modal for LevelUp / Memberships */}
      <RechargeModal
        isOpen={modalOpen}
        pack={selectedPack}
        onClose={() => {
          setModalOpen(false);
          setSelectedPack(null);
        }}
      />
    </div>
  );
}
