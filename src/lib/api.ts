export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8000/api/v1";

const GUEST_ID_KEY = "sommerfrische_guest_id";

export type OfferKey = "stromvorteil" | "solo";

export type CheckoutPayload = {
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  billing_name: string;
  billing_line1: string;
  billing_line2?: string | null;
  billing_city: string;
  billing_postal_code: string;
  billing_country: string;
  shipping_name: string;
  shipping_line1: string;
  shipping_line2?: string | null;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  notes?: string | null;
  accept_terms: boolean;
  accept_installation_ack: boolean;
};

export type BackendOrderItem = {
  id: string;
  product_id: string;
  product_name: string;
  offer_key: string;
  offer_name: string;
  quantity: number;
  unit_price: string | number;
  line_total: string | number;
};

export type BackendOrder = {
  id: string;
  status: string;
  payment_status: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  currency: string;
  subtotal_amount: string | number;
  shipping_amount: string | number;
  tax_amount: string | number;
  total_amount: string | number;
  shipping_line1: string;
  shipping_line2?: string | null;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  provider_transaction_id?: string | null;
  provider_checkout_id?: string | null;
  items: BackendOrderItem[];
};

export type CheckoutStartResponse = {
  order: BackendOrder;
  payment: {
    provider: string;
    status: "form_ready" | "gateway_error" | string;
    redirect_url?: string | null;
    form_action?: string | null;
    form_fields?: Record<string, string> | null;
    gateway_payload?: any;
  };
};

export function getGuestId(): string {
  const existing = window.localStorage.getItem(GUEST_ID_KEY);
  if (existing) return existing;

  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(GUEST_ID_KEY, generated);
  return generated;
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("X-Guest-Id", getGuestId());

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const detail = data?.detail;
    const message = typeof detail === "string" ? detail : "Die Anfrage konnte nicht verarbeitet werden.";
    throw new Error(message);
  }

  return data as T;
}

export async function prepareBackendCart(offerKey: OfferKey) {
  await apiFetch("/cart", { method: "DELETE" });
  return apiFetch("/cart/items", {
    method: "POST",
    body: JSON.stringify({
      product_slug: "midea-portasplit-3-5kw",
      offer_key: offerKey,
      quantity: 1,
    }),
  });
}

export async function startCheckout(payload: CheckoutPayload): Promise<CheckoutStartResponse> {
  return apiFetch<CheckoutStartResponse>("/checkout/start", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getOrder(orderId: string): Promise<BackendOrder> {
  return apiFetch<BackendOrder>(`/orders/${encodeURIComponent(orderId)}`, { method: "GET" });
}

export function formatEuro(value: string | number): string {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return `${value} Euro`;
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(numeric);
}
