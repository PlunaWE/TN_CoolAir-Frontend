import PiwikPro, { DataLayer, PageViews } from "@piwikpro/react-piwik-pro";

const DEFAULT_SITE_ID = "7a869ec1-2d1e-4866-a58f-67de85df74e8";
const DEFAULT_CONTAINER_URL = "https://wienenergie.piwik.pro/login";

let initialized = false;

function normalizeAccountAddress(input?: string): string {
  const raw = (input || DEFAULT_CONTAINER_URL).trim();
  try {
    const url = new URL(raw);
    return `${url.origin}/`;
  } catch {
    return "https://wienenergie.piwik.pro/";
  }
}

export const PIWIK_SITE_ID =
  import.meta.env.VITE_PIWIK_PRO_SITE_ID || DEFAULT_SITE_ID;

export const PIWIK_CONTAINER_URL = normalizeAccountAddress(
  import.meta.env.VITE_PIWIK_PRO_CONTAINER_URL || DEFAULT_CONTAINER_URL
);

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export const CONSENT_STORAGE_KEY = "sommerfrische_consent";

export function initPiwikPro(): void {
  if (initialized || typeof window === "undefined") return;

  try {
    PiwikPro.initialize(PIWIK_SITE_ID, PIWIK_CONTAINER_URL);
    initialized = true;

    safePush({
      event: "piwik_initialized",
      piwik_site_id: PIWIK_SITE_ID,
      piwik_account_address: PIWIK_CONTAINER_URL,
    });
  } catch (error) {
    console.warn("Piwik PRO initialization failed", error);
  }
}

function safePush(payload: Record<string, unknown>): void {
  try {
    DataLayer.push(payload);
  } catch {
    // noop
  }
}

export function trackPage(path: string, title?: string): void {
  try {
    PageViews.trackPageView(title);
  } catch {
    // noop
  }

  safePush({
    event: "spa_page_view",
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * IMPORTANT:
 * - no custom Piwik tracking request for click/button events
 * - only Data Layer events remain
 */
export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number,
  extra?: Record<string, unknown>,
): void {
  safePush({
    event: "custom_event",
    custom_event_category: category,
    custom_event_action: action,
    custom_event_name: name,
    custom_event_value: value,
    ...extra,
  });
}

export function pushConsentState(state: ConsentState) {
  safePush({
    event: "consent_state_update",
    consent_analytics: !!state.analytics,
    consent_marketing: !!state.marketing,
    consent_functional: !!state.functional,
  });
}

export function saveConsentState(state: ConsentState) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  pushConsentState(state);
}

export function loadConsentState(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      functional: !!parsed.functional,
    };
  } catch {
    return null;
  }
}
