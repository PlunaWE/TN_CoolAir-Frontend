const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GUEST_KEY = "sommerfrische_guest_id";

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

function getGuestId() {
  let id = localStorage.getItem(GUEST_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(GUEST_KEY, id);
  }
  return id;
}

export async function apiRequest(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  headers.set("X-Guest-Id", getGuestId());

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data.detail || data.message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return response.json();
}
