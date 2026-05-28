import { Link, useLocation } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { trackEvent } from "../lib/piwik";

export default function PaymentCancelPage() {
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("order_id") || localStorage.getItem("coolair_last_order_id");
  trackEvent("payment", "cancel_page_view");
  return (
    <BrandShell>
      <section style={{ padding: "48px 0 70px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 34, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 64 }}>↩</div>
            <h1 style={{ fontSize: 44, margin: "12px 0", color: "#06066d" }}>Zahlung abgebrochen</h1>
            <p style={{ fontSize: 20, color: "#6b7280" }}>Sie haben den Zahlungsvorgang abgebrochen.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 22 }}>
              <Link to={orderId ? "/payment/pending" : "/"} style={{ background: "#05057a", color: "#fff", padding: "14px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none" }}>
                Zurück
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
