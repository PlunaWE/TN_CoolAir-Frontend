import { Link } from "react-router-dom";
import { trackEvent } from "../lib/piwik";

const linkStyle = {
  color: "#1c2266",
  textDecoration: "none",
  fontSize: 12,
  lineHeight: 1.9,
  fontWeight: 500,
};

const wrapStyle = {
  maxWidth: 1380,
  margin: "0 auto",
  padding: "0 22px",
};

export function Footer() {
  return (
    <footer style={{ marginTop: 72, background: "#e9e9ea", padding: "34px 0 18px", color: "#06066d" }}>
      <div style={{ ...wrapStyle, display: "grid", gridTemplateColumns: "1.22fr 0.78fr 1fr", gap: 42, alignItems: "start" }}>
        <div style={{ paddingTop: 8 }}>
          <a
            href="https://www.wienenergie.at/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 316, minHeight: 64, display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <img
              src="/placeholders/logo-wienenergie.svg"
              alt="Wien Energie"
              style={{ width: 280, height: "auto", display: "block", objectFit: "contain" }}
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
          <h4 style={{ margin: "0 0 12px", fontSize: 15, color: "#06066d", fontWeight: 800 }}>Rechtliches</h4>
          <div style={{ display: "grid", gap: 2 }}>
            <Link to="/impressum" onClick={() => trackEvent("navigation", "legal_link_click", "impressum")} style={linkStyle}>Impressum</Link>
            <Link to="/datenschutz" onClick={() => trackEvent("navigation", "legal_link_click", "datenschutz")} style={linkStyle}>Datenschutz</Link>
            <Link to="/agb" onClick={() => trackEvent("navigation", "legal_link_click", "agb")} style={linkStyle}>AGB</Link>
            <Link to="/widerrufsbelehrung" onClick={() => trackEvent("navigation", "legal_link_click", "widerrufsbelehrung")} style={linkStyle}>Widerrufsbelehrung</Link>
            <Link to="/barrierefreiheit" onClick={() => trackEvent("navigation", "legal_link_click", "barrierefreiheit")} style={linkStyle}>Barrierefreiheit</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "0 0 12px", fontSize: 15, color: "#06066d", fontWeight: 800 }}>Kontakt</h4>
          <div style={{ display: "grid", gap: 3, color: "#1c2266", fontSize: 12, lineHeight: 1.7, fontWeight: 500 }}>
            <span>Wien Energie GmbH</span>
            <span>Thomas-Klestil-Platz 14</span>
            <span>1030 Wien</span>
            <span>Telefon: +43 1 4004 81880</span>
            <span>Telefonzeiten: Mo–Fr 09:00–17:00 Uhr</span>
            <span>sommerfrische@wienenergie.at</span>
          </div>
        </div>
      </div>
      <div style={{ ...wrapStyle, marginTop: 14, borderTop: "1px solid #d2d3d7", paddingTop: 18, color: "#2f3560", fontSize: 10 }}>
        <div>Gültig bis 31.07.2026, nur solange der Vorrat reicht.</div>
        <div style={{ marginTop: 8, fontWeight: 700 }}>© 2026 Sommerfrische – powered by Wien Energie GmbH. Alle Rechte vorbehalten.</div>
      </div>
    </footer>
  );
}


export default Footer;
