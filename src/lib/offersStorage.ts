import { DiamondPack, OfferStatus, INITIAL_DIAMOND_PACKS } from '../types';

const STORAGE_KEY = 'broly_store_offers_v2';
export const OFFERS_UPDATED_EVENT = 'broly_offers_updated';

export function getStoredOffers(): DiamondPack[] {
  if (typeof window === 'undefined') {
    return INITIAL_DIAMOND_PACKS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Check if v1 existed and merge with new Garena packs
      const oldRaw = localStorage.getItem('broly_store_offers_v1');
      if (oldRaw) {
        try {
          const oldList: DiamondPack[] = JSON.parse(oldRaw);
          const existingIds = new Set(oldList.map((p) => p.id));
          const merged = [...oldList];
          INITIAL_DIAMOND_PACKS.forEach((initPack) => {
            if (!existingIds.has(initPack.id)) {
              merged.push(initPack);
            }
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        } catch {
          // fallback
        }
      }
      // First time initialization
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DIAMOND_PACKS));
      return INITIAL_DIAMOND_PACKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure all standard garena packs exist if they were missing
      const existingIds = new Set(parsed.map((p: DiamondPack) => p.id));
      let hadMissing = false;
      const merged = [...parsed];
      INITIAL_DIAMOND_PACKS.forEach((initPack) => {
        if (!existingIds.has(initPack.id)) {
          merged.push(initPack);
          hadMissing = true;
        }
      });
      if (hadMissing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
      return merged;
    }
  } catch (err) {
    console.error('Failed to load offers from localStorage', err);
  }
  return INITIAL_DIAMOND_PACKS;
}

export function saveOffers(offers: DiamondPack[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
    window.dispatchEvent(new CustomEvent(OFFERS_UPDATED_EVENT, { detail: offers }));
  } catch (err) {
    console.error('Failed to save offers to localStorage', err);
  }
}

export function addOrUpdateOffer(offer: DiamondPack): void {
  const current = getStoredOffers();
  const index = current.findIndex((item) => item.id === offer.id);
  let updated: DiamondPack[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = offer;
  } else {
    updated = [offer, ...current];
  }
  saveOffers(updated);
}

export function deleteOffer(id: string): void {
  const current = getStoredOffers();
  const updated = current.filter((item) => item.id !== id);
  saveOffers(updated);
}

export function toggleOfferStatus(id: string): void {
  const current = getStoredOffers();
  const updated: DiamondPack[] = current.map((item) => {
    if (item.id === id) {
      const newStatus: OfferStatus = item.status === 'future' ? 'active' : 'future';
      return {
        ...item,
        status: newStatus,
        badgeText: newStatus === 'future' ? (item.badgeText || 'Offre Future') : undefined,
      };
    }
    return item;
  });
  saveOffers(updated);
}

export function resetOffersToDefault(): void {
  saveOffers(INITIAL_DIAMOND_PACKS);
}
