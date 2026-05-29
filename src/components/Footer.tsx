import { Link } from "react-router-dom";
import { trackEvent } from "../lib/piwik";

const wrapStyle = {
  maxWidth: 1380,
  margin: "0 auto",
  padding: "0 22px",
};

const headingStyle = {
  margin: "0 0 12px",
  fontSize: 15,
  color: "#06066d",
  fontWeight: 800,
};

const linkStyle = {
  color: "#06066d",
  textDecoration: "none",
  fontSize: 12,
  lineHeight: 1.9,
  fontWeight: 500,
  transition: "opacity 0.2s ease",
};

const textStyle = {
  display: "grid",
  gap: 3,
  color: "#1c2266",
  fontSize: 12,
  lineHeight: 1.7,
  fontWeight: 500,
};

export function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "#e9e9ea",
        padding: "34px 0 18px",
        marginTop: 72,
        color: "#06066d",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          ...wrapStyle,
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 42,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", paddingTop: 8 }}>
          <a
            href="https://www.wienenergie.at/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: 64,
              textDecoration: "none",
            }}
          >
            <img
              src="/placeholders/logo-wienenergie.svg"
              alt="Wien Energie"
              style={{
                width: 280,
                height: "auto",
                display: "block",
                objectFit: "contain",
              }}
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const parent = img.parentElement;
                if (parent) {
                  parent.textContent = "WIEN ENERGIE LOGO";
                  parent.style.color = "#666";
                  parent.style.fontWeight = "800";
                  parent.style.justifyContent = "center";
                }
              }}
            />
          </a>
        </div>

        <div>
          <h4 style={headingStyle}>Rechtliches</h4>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: 2,
            }}
          >
            <li>
              <Link
                to="/impressum"
                onClick={() =>
                  trackEvent("navigation", "legal_link_click", "impressum")
                }
                style={linkStyle}
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                to="/datenschutz"
                onClick={() =>
                  trackEvent("navigation", "legal_link_click", "datenschutz")
                }
                style={linkStyle}
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <Link
                to="/agb"
                onClick={() => trackEvent("navigation", "legal_link_click", "agb")}
                style={linkStyle}
              >
                AGB
              </Link>
            </li>
            <li>
              <Link
                to="/widerrufsbelehrung"
                onClick={() =>
                  trackEvent("navigation", "legal_link_click", "widerrufsbelehrung")
                }
                style={linkStyle}
              >
                Widerrufsbelehrung
              </Link>
            </li>
            <li>
              <Link
                to="/barrierefreiheit"
                onClick={() =>
                  trackEvent("navigation", "legal_link_click", "barrierefreiheit")
                }
                style={linkStyle}
              >
                Barrierefreiheit
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={headingStyle}>Kontakt</h4>
          <div style={textStyle}>
            <span>Wien Energie GmbH</span>
            <span>Thomas-Klestil-Platz 14</span>
            <span>1030 Wien</span>
            <span>Telefon: +43 1 4004 81880</span>
            <span>Telefonzeiten: Mo–Fr 09:00–17:00 Uhr</span>
            <span>sommerfrische@wienenergie.at</span>
          </div>
        </div>
      </div>

      <div
        style={{
          ...wrapStyle,
          marginTop: 14,
          paddingTop: 18,
          borderTop: "1px solid #d2d3d7",
          color: "#06066d",
          textAlign: "left",
          fontSize: 10,
        }}
      >
        <p
          style={{
            margin: "0 0 8px",
            fontWeight: 400,
          }}
        >
          Gültig bis 31.07.2026, nur solange der Vorrat reicht.
        </p>
        <div style={{ fontWeight: 700 }}>
          © {new Date().getFullYear()} Sommerfrische – powered by Wien Energie GmbH.
          Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
