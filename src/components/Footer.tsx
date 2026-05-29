import { Link } from "react-router-dom";
import { Container } from "@/components/Container";

/**
 * Footer — migriert auf Wien Energie Design Tokens (we-*).
 * Heller Hintergrund (bg-white) → Standard-Modus:
 *  - Headlines: text-we-heading
 *  - Body: text-we-text
 *  - Links: text-we-text mit hover:text-we-brand-secondary (Navy)
 *  - Trennlinien: border-we-neutral-90
 *  - Copyright: text-we-body-xs text-we-muted
 *
 * Logo-SVGs behalten ihre Brand-Farben (Orange/Weiß) — Brand-Asset-Regel.
 */
const Footer = () => (
  <footer
    id="footer"
    className="bg-we-neutral-90 pt-we-section-lg pb-we-component-xlg mt-we-section-lg font-sans"
  >
    <Container>
      <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-we-component-xlg">
        <div className="flex md:items-center py-4">
          <img
            src="/wien-energie-logo-2.svg"
            alt="Wien Energie"
            className="h-10 md:h-12 lg:h-14 w-auto object-contain"
          />
        </div>
        <div>
          <h4 className="text-we-body-lg font-bold mb-we-component-sm text-we-heading">Rechtliches</h4>
          <ul className="space-y-2 text-we-body-sm">
            <li><Link to="/impressum" className="text-we-heading hover:text-we-heading/80 transition-colors">Impressum</Link></li>
            <li><Link to="/datenschutz" className="text-we-heading hover:text-we-heading/80 transition-colors">Datenschutz</Link></li>
            <li><Link to="/agb" className="text-we-heading hover:text-we-heading/80 transition-colors">AGB</Link></li>
            <li><Link to="/widerruf" className="text-we-heading hover:text-we-heading/80 transition-colors">Widerrufsbelehrung</Link></li>
            <li><Link to="/barrierefreiheit" className="text-we-heading hover:text-we-heading/80 transition-colors">Barrierefreiheit</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-we-body-lg font-bold mb-we-component-sm text-we-heading">Kontakt</h4>
          <p className="text-we-body-sm text-we-heading">
            Wien Energie GmbH<br />
            Thomas-Klestil-Platz 14<br />
            1030 Wien<br />
            Telefon: +43 1 4004 81880<br />
            Telefonzeiten: Mo–Fr 09:00–17:00 Uhr<br />
            sommerfrische@wienenergie.at
          </p>
        </div>
      </div>
      <div className="mt-we-section-lg pt-we-component-lg border-t border-white text-we-body-xs text-we-heading text-left font-bold">
        <p className="mb-2 font-normal">Gültig bis 31.07.2026, nur solange der Vorrat reicht.</p>
        © {new Date().getFullYear()} Sommerfrische – powered by Wien Energie GmbH. Alle Rechte vorbehalten.
      </div>
    </Container>
  </footer>
);

export default Footer;
