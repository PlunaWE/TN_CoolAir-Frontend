import { apiRequest } from "../lib/api";

export function checkoutStart(payload: any) {
  return apiRequest("/checkout/start", { method: "POST", body: JSON.stringify(payload) });
}

export function getOrder(orderId: string) {
  return apiRequest(`/orders/${orderId}`);
}

export function refreshPaymentStatus(orderId: string) {
  return apiRequest(`/payments/telecash/refresh/${orderId}`, { method: "POST" });
}

export const orderService = { checkoutStart, getOrder, refreshPaymentStatus };
