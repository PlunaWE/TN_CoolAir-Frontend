import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";

const Impressum = () => {
  usePageTitle("Impressum – Sommerfrische");
  return (
    <div className="min-h-screen flex flex-col bg-we-surface-default">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 container mx-auto px-4 py-we-section-lg max-w-[800px] focus:outline-none"
      >
        <h1 className="text-we-h-xl font-bold text-we-heading mb-2">Impressum</h1>
        <p className="text-we-body-sm text-we-muted italic mb-we-component-xlg">
          Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz (MedienG)
        </p>

        <article className="space-y-we-component-xlg text-we-text leading-[1.7] text-[16px]">
          <section>
            <h3 className="text-we-body-lg font-bold text-we-heading mb-2">
              Betreiberin und Medieninhaberin
            </h3>
            <p>
              Wien Energie GmbH<br />
              Thomas-Klestil-Platz 14<br />
              1030 Wien, Österreich<br />
              Telefon: <a href="tel:+4314004000" className="text-we-brand-secondary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-brand-secondary rounded">+43 (0)1 4004-0</a><br />
              E-Mail: <a href="mailto:sommerfrische@wienenergie.at" className="text-we-brand-secondary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-brand-secondary rounded">sommerfrische@wienenergie.at</a><br />
              Website: www.sommerfrische.wienenergie.at
            </p>
          </section>

          <section>
            <h3 className="text-we-body-lg font-bold text-we-heading mb-2">Unternehmensgegenstand</h3>
            <p>
              Energiewirtschaft<br />
              FN 215854h<br />
              Registriert beim Handelsgericht Wien
            </p>
          </section>

          <section>
            <h3 className="text-we-body-lg font-bold text-we-heading mb-2">UID-Nummer</h3>
            <p>ATU55685501</p>
          </section>

          <section>
            <h3 className="text-we-body-lg font-bold text-we-heading mb-2">Aufsichtsbehörde</h3>
            <p>Energie-Control Austria; Österreich</p>
          </section>

          <section>
            <h3 className="text-we-body-lg font-bold text-we-heading mb-2">Geschäftsführung</h3>
            <p>
              Geschäftsführerin: Mag. Alma Kahler<br />
              Geschäftsführer: Dipl.-Ing. Sascha Zabransky<br />
              Geschäftsführer: Dipl.-Ing. Karl Gruber, MBA
            </p>
          </section>
        </article>

        <p className="mt-we-section-lg text-we-body-xs text-we-muted">Stand: April 2026</p>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
