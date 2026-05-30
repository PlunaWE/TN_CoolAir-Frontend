import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOrder } from "@/context/OrderContext";
import { usePageTitle } from "@/hooks/usePageTitle";

const Bestaetigung = () => {
  usePageTitle("Bestellung erfolgreich – Sommerfrische");
  const order = useOrder();
  const variantLabel = order.variant === "choice" ? "Midea Portasplit 3,5 kW + Strom-Vorteil" : "Midea Portasplit 3,5 kW ohne Strom-Vorteil";
  const price = order.variant === "choice" ? "1.199 Euro" : "1.099 Euro";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-we-surface-muted py-we-section-xlg focus:outline-none">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <CheckCircle size={64} className="mx-auto mb-6 text-we-success" />
          <h1 className="text-we-h-lg font-bold text-we-heading mb-4">Vielen Dank für Ihre Bestellung!</h1>
          <dl className="bg-white rounded-we-lg shadow-we-card p-we-component-lg text-left mb-4 text-we-body-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-we-muted">Angebot:</dt>
            <dd className="font-bold text-we-heading">{variantLabel}</dd>
            <dt className="text-we-muted">Produkt:</dt>
            <dd className="font-bold text-we-heading">Midea Portasplit</dd>
            <dt className="text-we-muted">Preis:</dt>
            <dd className="font-bold text-we-heading">{price}{order.variant === "choice" ? "*" : ""}</dd>
            <dt className="text-we-muted">Voraussichtliche Lieferung:</dt>
            <dd className="font-bold text-we-heading">5–8 Werktage</dd>
          </dl>
          {order.variant === "choice" && (
            <p className="text-we-body-sm text-we-text text-left mb-8 leading-snug">
              * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
            </p>
          )}
          <p className="text-we-body-md text-we-text mb-8">
            Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details zu Ihrer Bestellung.
          </p>
          <Link to="/" className="text-we-brand-secondary font-normal hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bestaetigung;