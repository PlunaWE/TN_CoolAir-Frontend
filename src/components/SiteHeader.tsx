import { Link } from "react-router-dom";
import { trackEvent } from "../lib/piwik";

type SiteHeaderProps = {
  compact?: boolean;
};

const outerStyle = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "10px 22px 0",
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <section style={outerStyle}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: compact ? "18px 30px" : "18px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <a
          href="https://www.wienenergie.at/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("navigation", "external_logo_click", "wienenergie")} 
          style={{ width: 240, minHeight: 54, display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <img
            src="/placeholders/logo-wienenergie.svg"
            alt="Wien Energie"
            style={{ width: 200, height: "auto", display: "block", objectFit: "contain" }}
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

        <Link to="/" onClick={() => trackEvent("navigation", "home_logo_click", "sommerfrische")} style={{ width: 300, minHeight: 54, display: "flex", alignItems: "center", justifyContent: "flex-end", textDecoration: "none" }}>
          <img
            src="/placeholders/logo-sommerfrische.png"
            alt="Sommerfrische"
            style={{ width: 248, height: "auto", display: "block", objectFit: "contain" }}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.textContent = "SOMMERFRISCHE LOGO";
                parent.style.color = "#666";
                parent.style.fontWeight = "800";
                parent.style.justifyContent = "center";
              }
            }}
          />
        </Link>
      </div>
    </section>
  );
}
