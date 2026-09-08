/**
 * Broly Store Admin Security Module
 * Camouflage de l'administration dans une URL secrète indéchiffrable avec caractères spéciaux.
 */

export const SECRET_ADMIN_TOKEN = 'bRoLy-x9$K!7mQ_zP9@vL4#sEcReT_c0ns0l3_2026';

const PASSCODE_STORAGE_KEY = 'broly_admin_master_passcode';
const SESSION_STORAGE_KEY = 'broly_admin_session_auth';

export const DEFAULT_MASTER_PASSCODE = 'BROLY2026';

/**
 * Vérifie si l'URL actuelle correspond au jeton secret camouflé.
 * Supporte le hash (#/...), le query (?key=...), et le path.
 */
export function isSecretAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const rawHash = window.location.hash || '';
    const decodedHash = decodeURIComponent(rawHash);

    const rawPath = window.location.pathname || '';
    const decodedPath = decodeURIComponent(rawPath);

    const rawSearch = window.location.search || '';
    const decodedSearch = decodeURIComponent(rawSearch);

    // Vérification du token secret
    const matchesToken =
      rawHash.includes(SECRET_ADMIN_TOKEN) ||
      decodedHash.includes(SECRET_ADMIN_TOKEN) ||
      rawPath.includes(SECRET_ADMIN_TOKEN) ||
      decodedPath.includes(SECRET_ADMIN_TOKEN) ||
      rawSearch.includes(SECRET_ADMIN_TOKEN) ||
      decodedSearch.includes(SECRET_ADMIN_TOKEN);

    return matchesToken;
  } catch {
    return false;
  }
}

/**
 * Génère l'URL secrète complète à copier/sauvegarder par le propriétaire.
 */
export function getSecretAdminUrl(): string {
  if (typeof window === 'undefined') return `/#/${SECRET_ADMIN_TOKEN}`;
  const origin = window.location.origin || '';
  const pathname = window.location.pathname || '/';
  const cleanPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${origin}${cleanPath}#/${SECRET_ADMIN_TOKEN}`;
}

/**
 * Récupère le code maître configuré (ou le code par défaut).
 */
export function getMasterPasscode(): string {
  if (typeof window === 'undefined') return DEFAULT_MASTER_PASSCODE;
  return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_MASTER_PASSCODE;
}

/**
 * Permet au propriétaire de changer son code d'accès maître.
 */
export function updateMasterPasscode(newPasscode: string): boolean {
  if (!newPasscode || newPasscode.trim().length < 4) return false;
  localStorage.setItem(PASSCODE_STORAGE_KEY, newPasscode.trim());
  return true;
}

/**
 * Vérifie si la session admin est actuellement active.
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'authorized';
}

/**
 * Authentifie le propriétaire avec son code maître.
 */
export function authenticateAdmin(enteredPasscode: string): boolean {
  const currentPasscode = getMasterPasscode();
  if (enteredPasscode === currentPasscode) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'authorized');
    return true;
  }
  return false;
}

/**
 * Déconnecte le propriétaire et redirige vers la boutique publique.
 */
export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  window.location.hash = '';
  window.history.replaceState(null, '', window.location.pathname);
  window.location.reload();
}
