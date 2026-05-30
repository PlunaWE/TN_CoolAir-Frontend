import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOrder, formatEuro, type BackendOrder } from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";

const copy = {
  success: {
    title: "Bestellung erfolgreich",
    headline: "Vielen Dank für Ihre Bestellung!",
    text: "Ihre Zahlung wurde bestätigt. Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details.",
    icon: CheckCircle,
    iconClass: "text-we-success",
  },
  failure: {
    title: "Zahlung fehlgeschlagen",
    headline: "Da ist bei der Zahlung etwas schiefgelaufen.",
    text: "Ihre Bestellung wurde nicht bezahlt. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support, falls der Betrag trotzdem abgebucht wurde.",
    icon: AlertCircle,
    iconClass: "text-we-danger",
  },
  cancel: {
    title: "Zahlung abgebrochen",
    headline: "Die Zahlung wurde abgebrochen.",
    text: "Ihre Bestellung ist noch nicht bezahlt. Sie können zur Startseite zurückkehren und den Kauf erneut starten.",
    icon: Clock,
    iconClass: "text-we-muted",
  },
} as const;

type ResultKind = keyof typeof copy;

function useQuery() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

const PaymentResult = ({ kind }: { kind: ResultKind }) => {
  const query = useQuery();
  const orderId = query.get("order_id");
  const [order, setOrder] = useState<BackendOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const state = copy[kind];
  const Icon = state.icon;

  usePageTitle(`${state.title} – Sommerfrische`);

  useEffect(() => {
    if (!orderId) return;
    getOrder(orderId)
      .then(setOrder)
      .catch((err) => setError(err instanceof Error ? err.message : "Bestellung konnte nicht geladen werden."));
  }, [orderId]);

  const primaryItem = order?.items?.[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-we-surface-muted py-we-section-xlg focus:outline-none">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Icon size={64} className={`mx-auto mb-6 ${state.iconClass}`} />
          <h1 className="text-we-h-lg font-bold text-we-heading mb-4">{state.headline}</h1>
          <p className="text-we-body-md text-we-text mb-8">{state.text}</p>

          {order && (
            <dl className="bg-white rounded-we-lg shadow-we-card p-we-component-lg text-left mb-6 text-we-body-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <dt className="text-we-muted">Bestellnummer:</dt>
              <dd className="font-bold text-we-heading break-all">{order.id}</dd>
              <dt className="text-we-muted">Status:</dt>
              <dd className="font-bold text-we-heading">{order.payment_status}</dd>
              <dt className="text-we-muted">Produkt:</dt>
              <dd className="font-bold text-we-heading">{primaryItem?.product_name ?? "Midea Portasplit"}</dd>
              <dt className="text-we-muted">Angebot:</dt>
              <dd className="font-bold text-we-heading">{primaryItem?.offer_name ?? "Sommerfrische"}</dd>
              <dt className="text-we-muted">Gesamt:</dt>
              <dd className="font-bold text-we-heading">{formatEuro(order.total_amount)}</dd>
              {order.provider_transaction_id && (
                <>
                  <dt className="text-we-muted">Transaktion:</dt>
                  <dd className="font-bold text-we-heading break-all">{order.provider_transaction_id}</dd>
                </>
              )}
            </dl>
          )}

          {!order && orderId && !error && (
            <p className="text-we-body-sm text-we-muted mb-6">Bestellstatus wird geladen.</p>
          )}

          {error && (
            <p className="bg-white rounded-we-lg shadow-we-card p-we-component-md text-we-body-sm text-we-danger mb-6">
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-we-component-md">
            <Link to="/" className="inline-flex items-center justify-center rounded-we-md bg-we-brand-secondary px-we-component-lg py-we-component-sm text-white font-bold hover:opacity-90">
              Zur Startseite
            </Link>
            {kind !== "success" && (
              <Link to="/checkout" className="inline-flex items-center justify-center rounded-we-md border border-we-border bg-white px-we-component-lg py-we-component-sm text-we-heading font-bold hover:bg-we-surface-subtle">
                Zahlung erneut versuchen
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentResult;
