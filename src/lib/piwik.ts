import PiwikPro, { CustomEvent, DataLayer, PageViews } from "@piwikpro/react-piwik-pro";

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

export const PIWIK_SITE_ID = import.meta.env.VITE_PIWIK_PRO_SITE_ID || DEFAULT_SITE_ID;
export const PIWIK_CONTAINER_URL = normalizeAccountAddress(import.meta.env.VITE_PIWIK_PRO_CONTAINER_URL || DEFAULT_CONTAINER_URL);

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

export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number,
  extra?: Record<string, unknown>,
): void {
  try {
    CustomEvent.trackEvent(category, action, name, value);
  } catch {
    // noop
  }

  safePush({
    event: "custom_event",
    custom_event_category: category,
    custom_event_action: action,
    custom_event_name: name,
    custom_event_value: value,
    ...extra,
  });
}
