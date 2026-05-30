import { Link } from "react-router-dom";
import { Container } from "@/components/Container";

/**
 * Header — schwebende Card im Wien-Energie-Stil.
 * Weißer Hintergrund, abgerundete Ecken, weicher Drop-Shadow.
 * Links: Wien Energie Logo (Absender).
 * Rechts: Sommerfrische Co-Branding (Schriftzug).
 * Keine Navigation, keine Buttons.
 */
const Navbar = () => {
  return (
    <div className="relative z-10 pt-3 md:pt-4 lg:pt-5 pb-3 md:pb-4">
      <Container>
        <header
          className="bg-white rounded-[10px] flex items-center justify-between gap-4 px-4 md:px-8 lg:px-10 py-4 md:py-5"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <a
            href="https://www.wienenergie.at"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Wien Energie"
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-brand-secondary rounded"
          >
            <img
              src="/wien-energie-logo.svg"
              alt="Wien Energie"
              className="h-6 sm:h-8 md:h-8 lg:h-9 w-auto object-contain"
            />
          </a>

          <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="Sommerfrische – Startseite">
            <img
              src="/sommerfrische-schriftzug.png"
              alt="Sommerfrische"
              className="h-7 md:h-9 lg:h-11 w-auto object-contain"
            />
          </Link>
        </header>
      </Container>
    </div>
  );
};

export default Navbar;
