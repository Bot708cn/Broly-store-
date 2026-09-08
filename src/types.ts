export type OfferStatus = 'active' | 'future';
export type OfferCategory = 'direct' | 'levelup' | 'membership' | 'pass';

export interface DiamondPack {
  id: string;
  diamonds: number;
  bonus?: number;
  title: string;
  price: string;
  popular?: boolean;
  bestValue?: boolean;
  status?: OfferStatus; // 'active' = disponible immédiatement, 'future' = offre future / à venir
  category?: OfferCategory; // 'direct' | 'levelup' | 'membership' | 'pass'
  releaseDate?: string; // ex: "Prévu le 15 Septembre 2026"
  badgeText?: string; // ex: "Offre Future", "Exclusif Broly", "Rentabilité 300%"
  description?: string;
  // Specific properties for Memberships & Level Up
  totalDiamonds?: number; // Total des diamants délivrés (ex: 800💎 pour level up, 450💎 pour hebdo, 2600💎 pour mensuel)
  immediateDiamonds?: number; // Diamants crédités immédiatement
  dailyDiamonds?: number; // Diamants quotidiens
  durationDays?: number; // 7 jours, 30 jours
  benefits?: string[]; // Avantages VIP, caisses d'armes, etc.
}

export const INITIAL_DIAMOND_PACKS: DiamondPack[] = [
  // --- RECHARGES DIRECTES TRADITIONNELLES GARENA ---
  {
    id: 'pack-100',
    diamonds: 100,
    bonus: 10,
    title: '100 Diamants',
    price: 'Prix à définir',
    category: 'direct',
    status: 'active',
  },
  {
    id: 'pack-310',
    diamonds: 310,
    bonus: 31,
    title: '310 Diamants',
    price: 'Prix à définir',
    category: 'direct',
    status: 'active',
  },
  {
    id: 'pack-520',
    diamonds: 520,
    bonus: 52,
    title: '520 Diamants',
    price: 'Prix à définir',
    popular: true,
    category: 'direct',
    status: 'active',
  },
  {
    id: 'pack-1060',
    diamonds: 1060,
    bonus: 106,
    title: '1060 Diamants',
    price: 'Prix à définir',
    category: 'direct',
    status: 'active',
  },
  {
    id: 'pack-2180',
    diamonds: 2180,
    bonus: 218,
    title: '2180 Diamants',
    price: 'Prix à définir',
    category: 'direct',
    status: 'active',
  },
  {
    id: 'pack-5600',
    diamonds: 5600,
    bonus: 560,
    title: '5600 Diamants',
    price: 'Prix à définir',
    bestValue: true,
    category: 'direct',
    status: 'active',
  },

  // --- PASS MONTÉE DE NIVEAU (LEVEL UP PASS GARENA) ---
  {
    id: 'pack-levelup-pass',
    diamonds: 800,
    title: 'Level Up Pass (Pass Montée de Niveau)',
    price: 'Prix à définir',
    bestValue: true,
    category: 'levelup',
    status: 'active',
    badgeText: 'Rentabilité +300%',
    totalDiamonds: 800,
    description: 'Offre officielle Garena Free Fire : débloquez jusqu\'à 800 diamants au fur et à mesure de votre progression du niveau 1 au niveau 30. (Rétroactif : si vous êtes déjà niveau 30, réclamez les 800💎 instantanément !).',
    benefits: [
      '800 diamants au total pour le coût d\'un petit pack',
      'Paliers débloqués du niveau 2 au niveau 30',
      '100% rétroactif pour les comptes déjà niveau 30+',
      'Offre officielle unique par compte Free Fire',
    ],
  },

  // --- ABONNEMENTS OFFICIELS GARENA FREE FIRE (MEMBERSHIPS) ---
  {
    id: 'pack-weekly-membership',
    diamonds: 450,
    title: 'Abonnement Hebdomadaire (Weekly)',
    price: 'Prix à définir',
    popular: true,
    category: 'membership',
    status: 'active',
    badgeText: 'Carte Hebdo VIP',
    totalDiamonds: 450,
    immediateDiamonds: 100,
    dailyDiamonds: 50,
    durationDays: 7,
    description: '100 Diamants crédités immédiatement + 50 Diamants chaque jour pendant 7 jours (350💎) = 450 Diamants au total + Badge VIP Hebdomadaire et réductions magasin.',
    benefits: [
      '100 diamants crédités immédiatement',
      '50 diamants/jour pendant 7 jours (soit 350💎 supplémentaires)',
      'Icône VIP Hebdomadaire spéciale dans le profil et tchat',
      'Accès aux réductions VIP de la boutique Free Fire',
      'Jeton de rattrapage de check-in offert',
    ],
  },
  {
    id: 'pack-monthly-membership',
    diamonds: 2600,
    title: 'Abonnement Mensuel (Monthly)',
    price: 'Prix à définir',
    bestValue: true,
    category: 'membership',
    status: 'active',
    badgeText: 'Carte Mensuelle VIP',
    totalDiamonds: 2600,
    immediateDiamonds: 500,
    dailyDiamonds: 70,
    durationDays: 30,
    description: '500 Diamants immédiats + 70 Diamants par jour pendant 30 jours (2 100💎) = 2 600 Diamants au total + 5 Caisses d\'armes au choix et Badge VIP Or.',
    benefits: [
      '500 diamants crédités immédiatement',
      '70 diamants/jour pendant 30 jours (soit 2 100💎 en plus)',
      '5 Caisses de choix d\'armes exclusives Garena',
      'Badge VIP Mensuel Or prestigieux',
      '30 jours complets de réductions et privilèges boutique',
      'Jetons de rattrapage de connexion',
    ],
  },
  {
    id: 'pack-super-vip-combo',
    diamonds: 3500,
    title: 'Super VIP Combo (Hebdo + Mensuel)',
    price: 'Prix à définir',
    category: 'membership',
    status: 'active',
    badgeText: 'Super VIP Privilège',
    totalDiamonds: 3500,
    immediateDiamonds: 600,
    dailyDiamonds: 135,
    durationDays: 30,
    description: 'Activez l\'Abonnement Hebdomadaire et l\'Abonnement Mensuel simultanément pour débloquer le statut Super VIP : recevez +15 Diamants quotidiens supplémentaires en cadeau Garena (soit 450💎 bonus cumulés) !',
    benefits: [
      'Cumul des 450💎 Hebdo + 2 600💎 Mensuel',
      'Bonus exclusif Garena : +15 diamants supplémentaires chaque jour',
      'Jusqu\'à 3 500 diamants au total sur la période',
      'Insigne et cadre Super VIP scintillant',
    ],
  },

  // --- PASSES BOOYAH & SAISONNIERS ---
  {
    id: 'pack-booyah-premium',
    diamonds: 499,
    title: 'Booyah Pass Premium',
    price: 'Prix à définir',
    category: 'pass',
    status: 'active',
    badgeText: 'Passe de Saison',
    description: 'Accédez à la voie Premium du Booyah Pass : débloquez le skin de personnage de la saison, les skins d\'armes légendaires, packs d\'émotes et véhicules.',
    benefits: [
      'Déblocage immédiat de la voie Premium du Booyah Pass',
      'Skins légendaires d\'armes et de personnages saisonniers',
      'Émotes exclusives et bannières animées',
      'Coffres de récompenses et tickets Diamond Royale',
    ],
  },
  {
    id: 'pack-booyah-premium-plus',
    diamonds: 999,
    title: 'Booyah Pass Premium Plus (+50 Niveaux)',
    price: 'Prix à définir',
    category: 'pass',
    status: 'active',
    badgeText: '+50 Niveaux Instantanés',
    description: 'La version ultime du Booyah Pass : inclut tous les avantages Premium + 50 niveaux de passe débloqués immédiatement avec les récompenses associées.',
    benefits: [
      'Tous les avantages du Booyah Pass Premium',
      'Saut instantané de 50 niveaux de passe dès l\'activation',
      'Récompenses de haut niveau débloquées le jour 1',
      'Bonus de progression de points de passe de combat',
    ],
  },

  // --- OFFRES FUTURES / ÉVÉNEMENTS SPÉCIAUX ---
  {
    id: 'pack-future-booyah',
    diamonds: 2500,
    bonus: 350,
    title: 'Offre Future : Booyah Pass Broly Edition',
    price: 'À venir',
    category: 'pass',
    status: 'future',
    releaseDate: 'Prochainement (Nouvelle Saison Free Fire)',
    badgeText: 'Offre Future',
    description: 'Pack spécial incluant les diamants et le passe de combat exclusif thématique Broly.',
  },
  {
    id: 'pack-future-legendary',
    diamonds: 10000,
    bonus: 1500,
    title: 'Offre Future : Coffre Légendaire 10 000💎',
    price: 'Prix promo à venir',
    category: 'direct',
    status: 'future',
    releaseDate: 'Événement Spécial 2026',
    badgeText: 'Événement Futur',
    description: 'Le plus gros stock de diamants jamais réuni avec 15% de bonus légendaire.',
  },
];

export const DIAMOND_PACKS = INITIAL_DIAMOND_PACKS;

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  subtext: string;
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'fast',
    number: '01',
    title: 'RAPIDE',
    description: 'Une recharge simple et rapide.',
    subtext: 'Vos diamants sont crédités directement sur votre compte Free Fire sans attente inutile.',
  },
  {
    id: 'secure',
    number: '02',
    title: 'SÉCURISÉ',
    description: "Une expérience d'achat simple et sécurisée.",
    subtext: 'Aucun mot de passe requis. Seul votre identifiant de joueur officiel (UID) est nécessaire.',
  },
  {
    id: 'reliable',
    number: '03',
    title: 'FIABLE',
    description: 'Un service pensé pour les joueurs Free Fire.',
    subtext: 'Une assistance réactive et un accompagnement garanti par Broly Store.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choisissez vos diamants.',
    description: 'Sélectionnez le pack correspondant à vos besoins parmi notre sélection exclusive.',
  },
  {
    step: '02',
    title: 'Entrez votre identifiant Free Fire.',
    description: 'Renseignez simplement votre ID Joueur (UID) visible dans votre profil de jeu.',
  },
  {
    step: '03',
    title: 'Recevez votre recharge.',
    description: 'Validez votre commande et retrouvez instantanément vos diamants dans votre inventaire.',
  },
];
