import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Widerruf = () => {
  usePageTitle("Widerrufsbelehrung – Sommerfrische");
  const linkCls =
    "text-we-brand-secondary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-we-brand-secondary rounded";
  return (
    <div className="min-h-screen flex flex-col bg-we-surface-default">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 container mx-auto px-4 py-we-section-lg max-w-[800px] focus:outline-none"
      >
        <h1 className="text-we-h-xl font-bold text-we-heading mb-2">Widerrufsbelehrung</h1>
        <p className="text-we-body-sm text-we-muted italic mb-we-component-xlg">
          gemäß §§ 11 ff Fern- und Auswärtsgeschäfte-Gesetz (FAGG)
        </p>

        <article className="space-y-we-section-md text-we-text leading-[1.7] text-[16px]">
          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">Widerrufsrecht</h2>
            <p className="mb-3">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
              widerrufen.
            </p>
            <p className="mb-3">
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
              benannter Dritter, der nicht der Beförderer ist, die Ware in Besitz genommen haben
              bzw. hat.
            </p>
            <p className="mb-3">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>

            <address className="not-italic bg-we-surface-muted border border-we-border rounded-we-lg p-we-component-lg my-we-component-md font-bold text-we-heading">
              Wien Energie GmbH<br />
              Thomas-Klestil-Platz 14, 1030 Wien<br />
              Telefon:{" "}
              <a href="tel:+43140048188" className={linkCls}>
                +43 1 4004818888
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:sommerfrische@wienenergie.at" className={linkCls}>
                sommerfrische@wienenergie.at
              </a>
            </address>

            <p className="mb-3">
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
              eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie
              können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
              vorgeschrieben ist.
            </p>
            <p>
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
              Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">Folgen des Widerrufs</h2>
            <p className="mb-3">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
              erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen
              Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von
              uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und
              spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
              über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
            </p>
            <p className="mb-3">
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
              ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
              ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
              Rückzahlung Entgelte berechnet.
            </p>
            <p>
              Wir können die Rückzahlung verweigern, bis wir die Ware zurückerhalten haben oder bis
              Sie den Nachweis erbracht haben, dass Sie die Ware zurückgesandt haben, je nachdem,
              welches der frühere Zeitpunkt ist.
            </p>

            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-lg mb-2">
              Rücksendung
            </h3>
            <p className="mb-3">
              Sie haben die Ware unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab
              dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns
              zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Ware vor Ablauf
              der Frist von vierzehn Tagen absenden.
            </p>
            <p className="mb-3">
              Bei der Variante Midea Portasplit 3,5 kW + Strom-Vorteil ist auch der Stromgutschein
              zurückzugeben, sofern er noch nicht eingelöst wurde. Wurde der Stromgutschein bereits
              ganz oder teilweise eingelöst, ist der entsprechende Wert von der Rückerstattung
              abzuziehen.
            </p>
            <p className="mb-3">Die unmittelbaren Kosten der Rücksendung der Ware tragen Sie.</p>
            <p>
              Sie müssen für einen etwaigen Wertverlust der Ware nur aufkommen, wenn dieser
              Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise
              der Ware nicht notwendigen Umgang mit ihr zurückzuführen ist.
            </p>

          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              Muster-Widerrufsformular
            </h2>
            <p className="text-we-body-sm italic text-we-muted mb-4">
              Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und
              senden Sie es zurück.
            </p>
            <div className="bg-we-surface-muted border border-we-border rounded-we-lg p-we-component-lg space-y-3 text-we-body-sm">
              <p>
                <strong className="font-bold text-we-heading">An:</strong>
                <br />
                Wien Energie GmbH<br />
                Thomas-Klestil-Platz 14<br />
                1030 Wien<br />
                E-Mail:{" "}
                <a href="mailto:sommerfrische@wienenergie.at" className={linkCls}>
                  sommerfrische@wienenergie.at
                </a>
              </p>
              <p>
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über
                den Kauf der folgenden Ware (*):
              </p>
              <p>_____________________________________________</p>
              <p>Bestellt am (*) / erhalten am (*): _______________</p>
              <p>Name der Verbraucherin / des Verbrauchers: _______________</p>
              <p>
                Anschrift der Verbraucherin / des Verbrauchers: _______________
                <br />
                _______________________________________________
              </p>
              <p>Datum: _______________</p>
              <p>
                Unterschrift der Verbraucherin / des Verbrauchers (nur bei Mitteilung auf Papier):
                <br />
                _______________________________________________
              </p>
              <p className="text-we-body-xs text-we-muted pt-2">(*) Unzutreffendes streichen.</p>
            </div>
          </section>
        </article>

        <p className="mt-we-section-lg text-we-body-xs text-we-muted">Stand: April 2026</p>
      </main>
      <Footer />
    </div>
  );
};

export default Widerruf;
