import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { initPiwikPro, loadConsentState, pushConsentState } from "./lib/piwik";

const queryClient = new QueryClient();

initPiwikPro();

const storedConsent = loadConsentState();
if (storedConsent) {
  pushConsentState(storedConsent);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
