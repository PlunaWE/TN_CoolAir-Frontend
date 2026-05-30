import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Barrierefreiheit = () => {
  usePageTitle("Erklärung der Barrierefreiheit – Sommerfrische");

  return (
    <div className="min-h-screen flex flex-col bg-we-surface-default">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 container mx-auto px-4 py-we-section-lg max-w-3xl focus:outline-none"
      >
        <h1 className="text-we-h-xl font-bold text-we-heading mb-we-component-lg">
          Erklärung der Barrierefreiheit
        </h1>

        <div className="space-y-we-component-xlg text-we-text leading-relaxed">
          <p>
            Diese Erklärung zur Barrierefreiheit gilt für die Website{" "}
          <a
            href="https://www.sommerfrische.wienenergie.at"
            className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded"
          >
            www.sommerfrische.wienenergie.at
          </a>
            .
          </p>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Stand der Vereinbarkeit mit den Anforderungen
            </h2>
            <p>
              Diese Website ist mit der unten angeführten Ausnahme der
              unverhältnismäßigen Belastung mit der Konformitätsstufe AA der{" "}
              <a
                href="https://www.w3.org/Translations/WCAG21-de/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded inline-flex items-baseline gap-1"
              >
                Richtlinien für barrierefreie Webinhalte – WCAG 2.1
                <ExternalLink className="h-3.5 w-3.5 self-center" aria-hidden="true" />
                <span className="sr-only">(öffnet in neuem Tab)</span>
              </a>{" "}
              entsprechend der geltenden harmonisierten europäischen Norm
              „Europäischer Standard EN 301 549 V3.2.1 (2021-03)" vereinbar.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Unterstützende Maßnahmen
            </h2>
            <p className="mb-3">
              Unsere Website stellt folgende unterstützende Maßnahmen bereit:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Einsatz von kontrastreichen Fließtexten</li>
              <li>Alternativtexte für Bilder</li>
              <li>Kein Verlust von Inhalt bei Anpassung der Größe</li>
              <li>Pausierbarkeit von beweglichen Elementen</li>
              <li>Textliche Identifizierung von Pflichtfeldern</li>
              <li>
                Konsistente Bedienung per Tastatur und mittels assistiven
                Technologien möglich
              </li>
            </ul>
            <p>
              Wir arbeiten laufend daran, Barrieren so weit wie möglich zu
              beheben.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Nicht barrierefreie Inhalte
            </h2>
            <p>
              Diese Website enthält ältere Applikationen und Anwendungen, welche
              teilweise nicht bzw. noch nicht vollständig barrierefrei umgesetzt
              sind. Es wird aber bestrebt, die Informationen bestmöglich
              barrierefrei anzubieten. Neue Applikationen beziehungsweise
              Erweiterungen werden barrierefrei umgesetzt.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Erstellung dieser Erklärung zur Barrierefreiheit
            </h2>
            <p>Diese Erklärung wurde am 7. Mai 2026 aktualisiert.</p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Feedback und Kontaktangaben
            </h2>
            <p className="mb-we-component-md">
              Sollten Sie auf{" "}
              <a
                href="https://www.sommerfrische.wienenergie.at"
                className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded"
              >
                www.sommerfrische.wienenergie.at
              </a>{" "}
              Barrieren finden, können Sie diese melden und somit helfen, das
              Webservice der Wien Energie GmbH weiter zu verbessern. Wenden Sie
              sich hierfür gerne an:
            </p>

            <div className="space-y-we-component-lg">
              <div>
                <h3 className="text-we-body-lg font-bold text-we-heading mb-2">
                  Barrierefreiheitsbeauftragte Wien Energie GmbH
                </h3>
                <address className="not-italic">
                  Thomas-Klestil-Platz 14<br />
                  1030 Wien<br />
                  Tel:{" "}
                  <a
                    href="tel:+436648848393"
                    className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded"
                  >
                    +43 (664) 88483933
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:barrierefreiheit@wienenergie.at"
                    className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded"
                  >
                    barrierefreiheit@wienenergie.at
                  </a>
                </address>
              </div>

              <div>
                <h3 className="text-we-body-lg font-bold text-we-heading mb-2">
                  Barrierefreiheitsbeauftragte Wien Energie Vertrieb GmbH &amp; Co KG
                </h3>
                <address className="not-italic">
                  Thomas-Klestil-Platz 14<br />
                  1030 Wien<br />
                  Tel:{" "}
                  <a
                    href="tel:+436648848393"
                    className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded"
                  >
                    +43 (664) 88483933
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:barrierefreiheit@wienenergie.at"
                    className="text-we-accent-blue underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-accent-blue rounded"
                  >
                    barrierefreiheit@wienenergie.at
                  </a>
                </address>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Verantwortlich für diese Seite
            </h2>
            <address className="not-italic">
              Wien Energie GmbH<br />
              Thomas-Klestil-Platz 14<br />
              1030 Wien
            </address>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Barrierefreiheit;
