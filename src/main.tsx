import PiwikPro from "@piwikpro/react-piwik-pro";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PIWIK_CONTAINER_ID, PIWIK_CONTAINER_URL, PIWIK_DATA_LAYER_NAME } from "./lib/piwik";

PiwikPro.initialize(PIWIK_CONTAINER_ID, PIWIK_CONTAINER_URL, {
  dataLayerName: PIWIK_DATA_LAYER_NAME,
});

createRoot(document.getElementById("root")!).render(<App />);
