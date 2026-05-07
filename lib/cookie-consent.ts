export const COOKIE_CONSENT_STORAGE_KEY = "siam_cookie_consent_v1";
export const COOKIE_CONSENT_COOKIE_NAME = "siam_cookie_consent";
export const COOKIE_CONSENT_EVENT = "siam-cookie-consent-updated";
export const COOKIE_PREFERENCES_EVENT = "siam-cookie-preferences-open";
const COOKIE_CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export type CookieConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  updatedAt: string;
  version: 1;
};

type CookieConsentDraft = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCookieConsentPreferences(value: unknown): value is CookieConsentPreferences {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.necessary === true &&
    typeof value.analytics === "boolean" &&
    typeof value.marketing === "boolean" &&
    typeof value.preferences === "boolean" &&
    typeof value.updatedAt === "string" &&
    value.version === 1
  );
}

function parseCookieConsent(value: string | null): CookieConsentPreferences | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return isCookieConsentPreferences(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isConsentExpired(preferences: CookieConsentPreferences) {
  const updatedAt = new Date(preferences.updatedAt).getTime();

  if (Number.isNaN(updatedAt)) {
    return true;
  }

  return Date.now() - updatedAt > COOKIE_CONSENT_MAX_AGE_MS;
}

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const target = `${name}=`;
  const source = document.cookie.split(";");

  for (const chunk of source) {
    const trimmed = chunk.trim();
    if (trimmed.startsWith(target)) {
      return decodeURIComponent(trimmed.slice(target.length));
    }
  }

  return null;
}

function getDomainCandidates() {
  if (typeof window === "undefined") {
    return [];
  }

  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string>([host]);

  if (parts.length >= 2) {
    const root = parts.slice(-2).join(".");
    domains.add(`.${root}`);
    domains.add(root);
  }

  return Array.from(domains);
}

function deleteCookieByName(name: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;

  for (const domain of getDomainCandidates()) {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
  }
}

export function clearOptionalCookies(preferences: CookieConsentPreferences) {
  if (typeof document === "undefined") {
    return;
  }

  if (!preferences.analytics) {
    for (const chunk of document.cookie.split(";")) {
      const key = chunk.trim().split("=")[0];
      if (key === "_ga" || key === "_gid" || key === "_gat" || key.startsWith("_ga_")) {
        deleteCookieByName(key);
      }
    }
  }

  if (!preferences.marketing) {
    deleteCookieByName("_fbp");
    deleteCookieByName("_fbc");
  }
}

export function buildCookieConsent(draft: CookieConsentDraft): CookieConsentPreferences {
  return {
    necessary: true,
    analytics: draft.analytics,
    marketing: draft.marketing,
    preferences: draft.preferences,
    updatedAt: new Date().toISOString(),
    version: 1
  };
}

export function readCookieConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  const storageValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  const storageConsent = parseCookieConsent(storageValue);

  if (storageConsent) {
    if (isConsentExpired(storageConsent)) {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      deleteCookieByName(COOKIE_CONSENT_COOKIE_NAME);
      return null;
    }

    return storageConsent;
  }

  const cookieConsent = parseCookieConsent(getCookieValue(COOKIE_CONSENT_COOKIE_NAME));
  if (cookieConsent) {
    if (isConsentExpired(cookieConsent)) {
      deleteCookieByName(COOKIE_CONSENT_COOKIE_NAME);
      return null;
    }

    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(cookieConsent));
    return cookieConsent;
  }

  return null;
}

export function writeCookieConsent(preferences: CookieConsentPreferences) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const serialized = JSON.stringify(preferences);
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(serialized)}; max-age=31536000; path=/; SameSite=Lax`;

  clearOptionalCookies(preferences);
}

export function emitCookieConsentUpdate(preferences: CookieConsentPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: preferences }));
}

export function emitOpenCookiePreferences() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
}
