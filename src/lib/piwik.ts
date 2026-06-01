export const PIWIK_DATA_LAYER_NAME = "dataLayer";

export const PIWIK_CONTAINER_ID =
  import.meta.env.VITE_PIWIK_CONTAINER_ID || "7a869ec1-2d1e-4866-a58f-67de85df74e8";

export const PIWIK_CONTAINER_URL = normalizePiwikContainerUrl(
  import.meta.env.VITE_PIWIK_CONTAINER_URL || "https://wienenergie.piwik.pro"
);

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    ppms?: {
      cm?: {
        api?: (
          method: string,
          onFulfilled?: unknown,
          onRejected?: unknown,
          ...args: unknown[]
        ) => void;
      };
    };
  }
}

type DataLayerValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | DataLayerValue[]
  | { [key: string]: DataLayerValue };

export type DataLayerEvent = {
  event: string;
  [key: string]: DataLayerValue;
};

export type VirtualPageViewEvent = DataLayerEvent & {
  event: "virtualPageView";
  title: string;
  url: string;
  url_referrer: string;
  area: "privat" | "business" | "";
  breadcrumb: string[];
  categorynames: string;
  tagnames: string;
};

function normalizePiwikContainerUrl(url: string): string {
  return url.replace(/\/login\/?$/i, "").replace(/\/+$/, "");
}

export function getDataLayer(): DataLayerEvent[] {
  if (typeof window === "undefined") return [];

  window[PIWIK_DATA_LAYER_NAME] = window[PIWIK_DATA_LAYER_NAME] || [];
  return window[PIWIK_DATA_LAYER_NAME] as DataLayerEvent[];
}

export function pushDataLayerEvent(event: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  getDataLayer().push(event);
}

export function pushVirtualPageView(event: Omit<VirtualPageViewEvent, "event">): void {
  pushDataLayerEvent({
    event: "virtualPageView",
    ...event,
  });
}

/**
 * DataLayer-only event.
 *
 * Important:
 * This does NOT call Piwik trackEvent.
 * It only pushes an event into dataLayer, so no direct Piwik tracking request
 * is created by button clicks or UI interactions.
 */

export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number,
  metadata?: Record<string, DataLayerValue>
): void {
  pushDataLayerEvent({
    event: "customEvent",
    event_category: category,
    event_action: action,
    event_name: name || "",
    event_value: typeof value === "number" ? value : null,
    ...(metadata || {}),
  });
}

const ROUTE_META: Record<string, { title: string; breadcrumb: string[]; categorynames?: string; tagnames?: string }> = {
  "/": {
    title: "Sommerfrische - die mobile Klimaanlage von Wien Energie",
    breadcrumb: ["privat", "sommerfrische"],
  },
  "/checkout": {
    title: "Kasse - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "kasse"],
  },
  "/payment/success": {
    title: "Bestellung erfolgreich - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "zahlung", "erfolgreich"],
  },
  "/payment/failure": {
    title: "Zahlung fehlgeschlagen - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "zahlung", "fehlgeschlagen"],
  },
  "/payment/cancel": {
    title: "Zahlung abgebrochen - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "zahlung", "abgebrochen"],
  },
  "/impressum": {
    title: "Impressum - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "impressum"],
  },
  "/agb": {
    title: "AGB - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "agb"],
  },
  "/widerruf": {
    title: "Widerruf - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "widerruf"],
  },
  "/datenschutz": {
    title: "Datenschutz - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "datenschutz"],
  },
  "/barrierefreiheit": {
    title: "Barrierefreiheit - Sommerfrische",
    breadcrumb: ["privat", "sommerfrische", "barrierefreiheit"],
  },
};

export function createVirtualPageViewPayload(
  pathname: string,
  referrerPath: string
): Omit<VirtualPageViewEvent, "event"> {
  const meta = ROUTE_META[pathname] || {
    title: document.title || "Sommerfrische - Wien Energie",
    breadcrumb: ["privat", "sommerfrische"],
  };

  return {
    title: meta.title,
    url: pathname,
    url_referrer: referrerPath,
    area: "privat",
    breadcrumb: meta.breadcrumb,
    categorynames: meta.categorynames || "No categories",
    tagnames: meta.tagnames || "No tags",
  };
}

export function openPiwikConsentForm(): void {
  if (typeof window === "undefined") return;

  if (window.ppms?.cm?.api) {
    window.ppms.cm.api(
      "openConsentForm",
      () => {
        console.info("[Piwik PRO] Consent form opened.");
      },
      (error: unknown) => {
        console.warn("[Piwik PRO] Consent form could not be opened.", error);
      }
    );

    return;
  }

  console.warn("[Piwik PRO] Consent Manager API is not available yet.");
}
