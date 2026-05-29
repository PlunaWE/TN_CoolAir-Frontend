import { Link } from "react-router-dom";
import { trackEvent } from "../lib/piwik";
import { Container } from "@/components/Container";

const Footer = () => (
  <footer
    id="footer"
    className="bg-we-neutral-90 pt-we-section-lg pb-we-component-xlg mt-we-section-lg font-sans"
  >
    <Container>
      <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-we-component-xlg">
        <div className="flex md:items-center py-4">
          <a
            href="https://www.wienenergie.at/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-16 no-underline"
          >
            <img
              src="/placeholders/logo-wienenergie.svg"
              alt="Wien Energie"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const parent = img.parentElement;
                if (parent) {
                  parent.textContent = "WIEN ENERGIE LOGO";
                  parent.className =
                    "inline-flex items-center justify-center min-h-16 text-gray-500 font-extrabold";
                }
              }}
            />
          </a>
        </div>

        <div>
          <h4 className="text-we-body-lg font-bold mb-we-component-sm text-we-heading">
            Rechtliches
          </h4>
          <ul className="space-y-2 text-we-body-sm">
            <li>
              <Link
                to="/impressum"
                onClick={() =>
                  trackEvent("navigation", "legal_link_click", "impressum")
                }
                className="text-we-heading hover:text-we-heading/80 transition-colors no-underline"
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
                className="text-we-heading hover:text-we-heading/80 transition-colors no-underline"
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <Link
                to="/agb"
                onClick={() =>
                  trackEvent("navigation", "legal_link_click", "agb")
                }
                className="text-we-heading hover:text-we-heading/80 transition-colors no-underline"
              >
                AGB
              </Link>
            </li>
            <li>
              <Link
                to="/widerrufsbelehrung"
                onClick={() =>
                  trackEvent(
                    "navigation",
                    "legal_link_click",
                    "widerrufsbelehrung"
                  )
                }
                className="text-we-heading hover:text-we-heading/80 transition-colors no-underline"
              >
                Widerrufsbelehrung
              </Link>
            </li>
            <li>
              <Link
                to="/barrierefreiheit"
                onClick={() =>
                  trackEvent(
                    "navigation",
                    "legal_link_click",
                    "barrierefreiheit"
                  )
                }
                className="text-we-heading hover:text-we-heading/80 transition-colors no-underline"
              >
                Barrierefreiheit
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-we-body-lg font-bold mb-we-component-sm text-we-heading">
            Kontakt
          </h4>
          <p className="text-we-body-sm text-we-heading">
            Wien Energie GmbH
            <br />
            Thomas-Klestil-Platz 14
            <br />
            1030 Wien
            <br />
            Telefon: +43 1 4004 81880
            <br />
            Telefonzeiten: Mo–Fr 09:00–17:00 Uhr
            <br />
            sommerfrische@wienenergie.at
          </p>
        </div>
      </div>

      <div className="mt-we-section-lg pt-we-component-lg border-t border-white text-we-body-xs text-we-heading text-left">
        <p className="mb-2 font-normal">
          Gültig bis 31.07.2026, nur solange der Vorrat reicht.
        </p>
        <div className="font-bold">
          © {new Date().getFullYear()} Sommerfrische – powered by Wien Energie
          GmbH. Alle Rechte vorbehalten.
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
