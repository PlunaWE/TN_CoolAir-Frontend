import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { trackEvent } from "../lib/piwik";
import { orderService } from "../services/orderService";

export default function PaymentPendingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  const orderId = useMemo(() => (location.state as any)?.orderId || new URLSearchParams(location.search).get("order_id") || localStorage.getItem("coolair_last_order_id"), [location.state, location.search]);
  const paymentUrl = useMemo(() => (location.state as any)?.paymentUrl || localStorage.getItem("coolair_last_payment_link_url"), [location.state]);
  const [message, setMessage] = useState("Wir prüfen laufend, ob die Zahlung abgeschlossen wurde.");

  useEffect(() => {
    if (!orderId) {
      setMessage("Keine Bestellung gefunden.");
      return;
    }

    const checkStatus = async () => {
      try {
        const result: any = await orderService.refreshPaymentStatus(orderId);
        const paymentStatus = result?.order?.payment_status || "pending";
        if (paymentStatus === "paid") {
          trackEvent("payment", "pending_resolved_paid", orderId);
          navigate("/payment/success");
          return;
        }
        if (paymentStatus === "failed" || paymentStatus === "gateway_error") {
          trackEvent("payment", "pending_resolved_failed", orderId, undefined, { payment_status: paymentStatus });
          navigate("/payment/failure");
          return;
        }
        if (paymentStatus === "cancelled") {
          trackEvent("payment", "pending_resolved_cancelled", orderId);
          navigate("/payment/cancel");
          return;
        }
        setMessage("Zahlung noch ausstehend. Wenn du im anderen Tab fertig bist, aktualisieren wir den Status automatisch.");
      } catch (e) {
        setMessage(String((e as Error).message));
      }
    };

    void checkStatus();
    timerRef.current = window.setInterval(() => void checkStatus(), 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [orderId, navigate]);

  return (
    <BrandShell>
      <section style={{ padding: "48px 0 70px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 34, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 64 }}>⌛</div>
            <h1 style={{ fontSize: 44, margin: "12px 0", color: "#06066d" }}>Zahlung läuft</h1>
            <p style={{ fontSize: 20, color: "#6b7280", maxWidth: 720, margin: "0 auto" }}>{message}</p>
            <div style={{ marginTop: 24, display: "grid", gap: 12, justifyContent: "center" }}>
              {paymentUrl && (
                <button onClick={() => {
                    trackEvent("payment", "reopen_payment_tab", orderId || undefined);
                    window.open(paymentUrl, "_blank", "noopener,noreferrer");
                  }} style={{ background: "#05057a", color: "#fff", padding: "14px 18px", borderRadius: 999, fontWeight: 800, border: "none", cursor: "pointer" }}>
                  Zahlungsseite erneut in neuem Tab öffnen
                </button>
              )}
              {orderId && (
                <button
                  onClick={async () => {
                    trackEvent("payment", "manual_status_check", orderId || undefined);
                    const result: any = await orderService.refreshPaymentStatus(orderId);
                    const paymentStatus = result?.order?.payment_status || "pending";
                    if (paymentStatus === "paid") navigate("/payment/success");
                    else if (paymentStatus === "failed" || paymentStatus === "gateway_error") navigate("/payment/failure");
                    else if (paymentStatus === "cancelled") navigate("/payment/cancel");
                  }}
                  style={{ background: "#fff", color: "#07126d", padding: "14px 18px", borderRadius: 999, fontWeight: 800, border: "1px solid #ddd", cursor: "pointer" }}
                >
                  Status jetzt prüfen
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
