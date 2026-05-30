import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "@/context/OrderContext";
import ScrollToTop from "./components/ScrollToTop";
import PiwikVirtualPageView from "@/components/PiwikVirtualPageView";
import LandingPage from "./pages/LandingPage";
import Checkout from "./pages/Checkout";
import PaymentResult from "./pages/PaymentResult";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";
import Widerruf from "./pages/Widerruf";
import Datenschutz from "./pages/Datenschutz";
import Barrierefreiheit from "./pages/Barrierefreiheit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrderProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-we-brand-secondary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-we-accent-blue"
          >
            Zum Hauptinhalt springen
          </a>
          <PiwikVirtualPageView />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bestaetigung" element={<PaymentResult kind="success" />} />
            <Route path="/payment/success" element={<PaymentResult kind="success" />} />
            <Route path="/payment/failure" element={<PaymentResult kind="failure" />} />
            <Route path="/payment/cancel" element={<PaymentResult kind="cancel" />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/widerruf" element={<Widerruf />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/barrierefreiheit" element={<Barrierefreiheit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
