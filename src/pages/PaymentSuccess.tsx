import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { trackEvent } from "../lib/piwik";
import { orderService } from "../services/orderService";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Zahlungsstatus wird geprüft...");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const oid = new URLSearchParams(location.search).get("order_id") || localStorage.getItem("coolair_last_order_id");
      setOrderId(oid);
      if (!oid) {
        setLoading(false);
        setMessage("Keine letzte Bestellung gefunden.");
        return;
      }
      try {
        const result: any = await orderService.refreshPaymentStatus(oid);
        const status = result?.order?.payment_status;
        if (status === "paid") {
          trackEvent("payment", "status_paid", oid || "unknown_order");
          setMessage("Die Zahlung wurde erfolgreich bestätigt.");
        } else if (status === "failed") {
          trackEvent("payment", "status_failed", oid || "unknown_order");
          setMessage("Die Zahlung ist fehlgeschlagen.");
        } else if (status === "cancelled") {
          trackEvent("payment", "status_cancelled", oid || "unknown_order");
          setMessage("Die Zahlung wurde abgebrochen.");
        } else {
          trackEvent("payment", "status_pending_on_success_page", oid || "unknown_order");
          setMessage("Die Zahlung ist noch nicht abgeschlossen. Bitte den Status erneut prüfen.");
        }
      } catch (e) {
        setMessage(String((e as Error).message));
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [location.search]);

  return (
    <BrandShell>
      <section style={{ padding: "48px 0 70px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 34, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 96, height: 96, margin: "0 auto 18px", borderRadius: "50%", background: "#0a8f3d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, fontWeight: 900, lineHeight: 1 }}>✓</div>
            <h1 style={{ fontSize: 44, margin: "12px 0", color: "#06066d" }}>Zahlung erfolgreich</h1>
            <p style={{ fontSize: 20, color: "#6b7280" }}>{loading ? "Bitte warten..." : message}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 22 }}>
              {orderId && (
                <Link to={`/checkout`} style={{ background: "#05057a", color: "#fff", padding: "14px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none" }}>
                  Zurück zur Startseite
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
