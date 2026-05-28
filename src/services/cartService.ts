import { apiRequest } from "../lib/api";

export const cartService = {
  getCart() {
    return apiRequest("/cart");
  },
  addItem(payload: { product_slug: string; offer_key: string; quantity: number }) {
    return apiRequest("/cart/items", { method: "POST", body: JSON.stringify(payload) });
  },
  clearCart() {
    return apiRequest("/cart", { method: "DELETE" });
  },
};
