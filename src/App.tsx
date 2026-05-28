import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/Home";
import CheckoutPage from "./pages/Checkout";
import PaymentPendingPage from "./pages/PaymentPending";
import PaymentSuccessPage from "./pages/PaymentSuccess";
import PaymentFailurePage from "./pages/PaymentFailure";
import PaymentCancelPage from "./pages/PaymentCancel";
import ImpressumPage from "./pages/Impressum";
import DatenschutzPage from "./pages/Datenschutz";
import AgbPage from "./pages/Agb";
import WiderrufPage from "./pages/Widerruf";
import BarrierefreiheitPage from "./pages/Barrierefreiheit";
import { trackPage } from "./lib/piwik";

function RouteTracker() {
  const location = useLocation();
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;
    trackPage(path, document.title);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/pending" element={<PaymentPendingPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failure" element={<PaymentFailurePage />} />
        <Route path="/payment/cancel" element={<PaymentCancelPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
        <Route path="/agb" element={<AgbPage />} />
        <Route path="/widerrufsbelehrung" element={<WiderrufPage />} />
        <Route path="/barrierefreiheit" element={<BarrierefreiheitPage />} />
      </Routes>
    </>
  );
}
