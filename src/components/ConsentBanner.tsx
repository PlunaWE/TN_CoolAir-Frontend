import { useEffect, useState } from "react";
import {
  ConsentState,
  loadConsentState,
  saveConsentState,
  trackEvent,
} from "../lib/piwik";

const defaultState: ConsentState = {
  analytics: false,
  marketing: false,
  functional: true,
};

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(defaultState);

  useEffect(() => {
    const stored = loadConsentState();
    if (stored) {
      setConsent(stored);
      setVisible(false);
      return;
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    const next: ConsentState = {
      analytics: true,
      marketing: true,
      functional: true,
    };
    setConsent(next);
    saveConsentState(next);
    trackEvent("consent", "accept_all");
    setVisible(false);
  };

  const acceptSelected = () => {
    saveConsentState(consent);
    trackEvent("consent", "accept_selected", undefined, undefined, {
      analytics: consent.analytics,
      marketing: consent.marketing,
      functional: consent.functional,
    });
    setVisible(false);
  };

  const rejectOptional = () => {
    const next: ConsentState = {
      analytics: false,
      marketing: false,
      functional: true,
    };
    setConsent(next);
    saveConsentState(next);
    trackEvent("consent", "reject_optional");
    setVisible(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 20,
        right: 20,
        bottom: 20,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
          border: "1px solid #e5e7eb",
          padding: 24,
        }}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: 28,
                color: "#07126d",
                fontWeight: 800,
              }}
            >
              Cookie-Einstellungen
            </h3>
            <p
              style={{
                margin: 0,
                color: "#5b6475",
                fontSize: 16,
                lineHeight: 1.55,
              }}
            >
              Wir verwenden technisch notwendige Cookies sowie optionale
              Dienste für Analyse und Marketing. Sie können alles akzeptieren,
              nur notwendige Cookies verwenden oder Ihre Auswahl selbst
              festlegen.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={acceptAll}
              style={primaryBtn}
            >
              Alle akzeptieren
            </button>

            <button
              type="button"
              onClick={rejectOptional}
              style={secondaryBtn}
            >
              Nur notwendige
            </button>

            <button
              type="button"
              onClick={() => {
                setSettingsOpen((v) => !v);
                trackEvent("consent", "toggle_settings");
              }}
              style={secondaryBtn}
            >
              Einstellungen
            </button>
          </div>

          {settingsOpen && (
            <div
              style={{
                marginTop: 6,
                padding: 18,
                borderRadius: 16,
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                display: "grid",
                gap: 14,
              }}
            >
              <ConsentRow
                title="Funktional"
                description="Erforderlich für die technische Funktion der Website."
                checked={consent.functional}
                disabled
                onChange={() => null}
              />

              <ConsentRow
                title="Analytics"
                description="Hilft uns zu verstehen, wie die Website verwendet wird."
                checked={consent.analytics}
                onChange={(checked) =>
                  setConsent((prev) => ({ ...prev, analytics: checked }))
                }
              />

              <ConsentRow
                title="Marketing"
                description="Erlaubt Marketing- und Kampagnenauswertung."
                checked={consent.marketing}
                onChange={(checked) =>
                  setConsent((prev) => ({ ...prev, marketing: checked }))
                }
              />

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={acceptSelected}
                  style={primaryBtn}
                >
                  Auswahl speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentRow(props: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr",
        gap: 12,
        alignItems: "start",
        cursor: props.disabled ? "default" : "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={props.checked}
        disabled={props.disabled}
        onChange={(e) => props.onChange(e.target.checked)}
        style={{ marginTop: 4 }}
      />
      <div>
        <div
          style={{
            fontWeight: 800,
            color: "#07126d",
            marginBottom: 4,
            fontSize: 17,
          }}
        >
          {props.title}
        </div>
        <div
          style={{
            color: "#5b6475",
            fontSize: 14,
            lineHeight: 1.45,
          }}
        >
          {props.description}
        </div>
      </div>
    </label>
  );
}

const primaryBtn: React.CSSProperties = {
  background: "#05057a",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  padding: "14px 20px",
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  background: "#fff",
  color: "#07126d",
  border: "1px solid #cfd5df",
  borderRadius: 999,
  padding: "14px 20px",
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
};
