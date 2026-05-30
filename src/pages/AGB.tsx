import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";

const AGB = () => {
  usePageTitle("AGB – Sommerfrische");
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
        <h1 className="text-we-h-xl font-bold text-we-heading mb-2">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="text-we-body-sm text-we-muted italic mb-we-component-xlg">
          für das Angebot „Sommerfrische" der Wien Energie GmbH – Stand: April 2026
        </p>

        <article className="space-y-we-section-md text-we-text leading-[1.7] text-[16px]">
          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">1. Geltungsbereich</h2>
            <p className="mb-3">
              1.1 Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für alle über
              den Onlineshop unter www.sommerfrische.wienenergie.at (nachfolgend „Webshop") geschlossenen
              Verträge zwischen der Wien Energie GmbH, Thomas-Klestil-Platz 14, 1030 Wien
              (nachfolgend „Wien Energie" oder „wir") und Verbraucherinnen und Verbrauchern im
              Sinne des § 1 Konsumentenschutzgesetz (KSchG) (nachfolgend „Kundin/Kunde" oder
              „Sie").
            </p>
            <p className="mb-3">
              1.2 Unser Webshop richtet sich ausschließlich an Verbraucherinnen und Verbraucher.
              Verbraucherin/Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu
              Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen
              beruflichen Tätigkeit zugerechnet werden können (§ 1 KSchG).
            </p>
            <p>
              1.3 Abweichende Bedingungen der Kundin/des Kunden werden nicht Vertragsbestandteil,
              es sei denn, Wien Energie stimmt deren Geltung ausdrücklich schriftlich zu.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">2. Vertragsgegenstand</h2>
            <p className="mb-3">
              2.1 Unter der Marke „Sommerfrische" bietet Wien Energie das mobile Klimagerät Midea
              PortaSplit 3,5 kW (nachfolgend „Gerät") in zwei Angebotsvarianten an:
            </p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              a) Midea Portasplit 3,5 kW ohne Strom-Vorteil
            </h3>
            <p className="mb-3">Kauf des Gerätes ohne weitere Zusatzleistungen.</p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              b) Midea Portasplit 3,5 kW + Strom-Vorteil
            </h3>
            <p className="mb-3">
              Kauf des Gerätes inklusive eines nicht personalisierten Stromgutscheins der Wien
              Energie im Wert von 150 Euro (nachfolgend „Stromgutschein"). Gerät und Stromgutschein
              werden bei dieser Variante gemeinsam als „Sommerfrische-Paket" bezeichnet.
            </p>
            <p className="mb-3">
              2.2 Beide Angebotsvarianten werden ausschließlich per Einmalzahlung angeboten:
            </p>
            <ol className="list-[lower-alpha] pl-6 space-y-2 mb-3">
              <li>Einmalzahlung: Zahlung des gesamten Kaufpreises bei Bestellung.</li>
            </ol>
            <p>
              2.3 Die Kundin/der Kunde wählt die gewünschte Angebotsvariante im Bestellprozess.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              3. Vertragspartner, Vertragsschluss und Korrekturmöglichkeiten
            </h2>
            <p className="mb-3">
              3.1 Der Kaufvertrag über das Sommerfrische-Paket kommt zustande mit der Wien Energie
              GmbH, Thomas-Klestil-Platz 14, 1030 Wien.
            </p>
            <p className="mb-3">
              3.2 Die Warenpräsentation im Webshop ist kein verbindliches Angebot. Ihre Bestellung
              stellt ein Angebot an den Kunden zum Abschluss eines Kaufvertrags dar. Wien Energie
              nimmt dieses Angebot durch ausdrückliche Annahmeerklärung per E-Mail
              (Auftrags-/Versandbestätigung) oder durch Auslieferung der Ware an.
            </p>
            <p className="mb-3">
              3.3 Sie können das Sommerfrische-Paket zunächst unverbindlich in den Warenkorb legen
              und Ihre Eingaben vor Absenden Ihrer verbindlichen Bestellung jederzeit korrigieren,
              indem Sie die hierfür im Bestellablauf vorgesehenen und erläuterten Korrekturhilfen
              nutzen (z. B. „Zurück"-Button, Ändern der Eingabefelder, Löschen aus dem Warenkorb).
            </p>
            <p className="mb-3">
              3.4 Der Vertrag kommt zustande, indem Sie durch Anklicken des Bestellbuttons
              („Zahlungspflichtig bestellen" oder vergleichbare Formulierung) das Angebot annehmen.
              Unmittelbar nach Absenden der Bestellung erhalten Sie eine Bestätigung per E-Mail
              (Auftragsbestätigung).
            </p>
            <p>
              3.5 Wien Energie behält sich vor, Bestellungen im Einzelfall abzulehnen, insbesondere
              bei Verfügbarkeitsengpässen.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              4. Vertragssprache, Vertragstextspeicherung
            </h2>
            <p className="mb-3">
              4.1 Die für den Vertragsschluss zur Verfügung stehende Sprache ist Deutsch.
            </p>
            <p>
              4.2 Wir speichern den Vertragstext und senden Ihnen die Bestelldaten sowie diese AGB
              in Textform (z. B. per E-Mail) zu.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              5. Preise und Zahlungsbedingungen
            </h2>
            <p className="mb-3">
              5.1 Alle im Webshop angegebenen Preise verstehen sich in Euro inklusive der
              gesetzlichen Umsatzsteuer (derzeit 20 %). Etwaige Versandkosten werden gesondert
              ausgewiesen und sind vor Absendung der Bestellung ersichtlich. Bei der Variante
              Midea Portasplit 3,5 kW + Strom-Vorteil umfasst der angegebene Paketpreis das Gerät und den
              Stromgutschein.
            </p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              Einmalzahlung
            </h3>
            <p className="mb-3">
              5.2 Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister TeleCash (First
              Data GmbH). Im Webshop stehen Ihnen grundsätzlich folgende Zahlungsarten zur
              Verfügung:
            </p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              Kreditkarte
            </h3>
            <p className="mb-3">
              Im Bestellprozess geben Sie Ihre Kreditkartendaten an. Ihre Karte wird nach Abgabe
              der Bestellung belastet. Die unterstützten Kreditkartenmarken werden im Bestellprozess
              angezeigt.
            </p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              Weitere Zahlungsarten
            </h3>
            <p className="mb-3">
              Gegebenenfalls weitere im Bestellprozess angezeigte Zahlungsarten. Die jeweiligen
              Zahlungsbedingungen ergeben sich aus den dort angezeigten Hinweisen.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">6. Lieferbedingungen</h2>
            <p className="mb-3">
              6.1 Zusätzlich zu den angegebenen Produktpreisen können Versandkosten anfallen.
              Nähere Bestimmungen zu gegebenenfalls anfallenden Versandkosten erfahren Sie im
              Webshop bei den Angeboten sowie im Bestellprozess.
            </p>
            <p className="mb-3">
              6.2 Die Lieferung des Gerätes erfolgt ausschließlich an die von der Kundin/dem Kunden
              angegebene Lieferadresse innerhalb Österreichs. Eine Lieferung außerhalb Österreichs
              ist nicht möglich.
            </p>
            <p className="mb-3">
              6.3 Wir liefern nur im Versandweg. Eine Selbstabholung des Gerätes ist nicht möglich.
              Wir liefern nicht an Packstationen oder Postfachadressen.
            </p>
            <p className="mb-3">
              6.4 Die voraussichtliche Lieferzeit wird im Webshop und in der Auftragsbestätigung
              angegeben. Sofern kein bestimmter Liefertermin vereinbart wurde, erfolgt die
              Lieferung innerhalb von 5–8 Werktagen nach Auftragsbestätigung.
            </p>
            <p className="mb-3">
              6.5 Die Lieferung erfolgt durch den Logistikpartner von Wien Energie. Bei
              Verbraucherverträgen geht die Gefahr des zufälligen Untergangs oder der zufälligen
              Verschlechterung der Ware erst mit Übergabe des Gerätes an die Kundin/den Kunden
              über.
            </p>
            <p className="mb-3">
              6.6 Teillieferungen sind zulässig, soweit dies für die Kundin/den Kunden zumutbar ist
              und keine Mehrkosten entstehen.
            </p>
            <p>
              6.7 Bei der Variante Midea Portasplit 3,5 kW + Strom-Vorteil wird der Stromgutschein der
              Kundin/dem Kunden in elektronischer Form (z. B. per E-Mail) übermittelt. Der genaue
              Übermittlungsweg wird im Bestellprozess oder in der Auftragsbestätigung angegeben.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">7. Transportschäden</h2>
            <p className="mb-3">
              7.1 Werden Waren mit offensichtlichen Transportschäden angeliefert, so reklamieren
              Sie solche Mängel bitte möglichst sofort beim Zusteller und nehmen Sie bitte
              unverzüglich Kontakt zu uns auf.
            </p>
            <p>
              7.2 Die Versäumnis einer Reklamation oder Kontaktaufnahme hat für Ihre gesetzlichen
              Ansprüche und deren Durchsetzung, insbesondere Ihre Gewährleistungsrechte, keinerlei
              Konsequenzen. Sie helfen uns aber, unsere eigenen Ansprüche gegenüber dem
              Frachtführer bzw. der Transportversicherung geltend machen zu können.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              8. Stromgutschein (nur Variante Midea Portasplit 3,5 kW + Strom-Vorteil)
            </h2>
            <p className="mb-3">
              8.1 Bei Wahl der Variante Midea Portasplit 3,5 kW + Strom-Vorteil ist im Kaufpreis ein nicht
              personalisierter Stromgutschein der Wien Energie im Wert von 150 Euro enthalten.
            </p>
            <p className="mb-3">
              8.2 Der Stromgutschein kann bei Wien Energie für Stromlieferungen eingelöst werden.
              Die Einlösung setzt keinen bestehenden Stromvertrag mit Wien Energie voraus; die
              genauen Einlösebedingungen richten sich nach den auf dem Gutschein bzw. im Webshop
              ausgewiesenen Gutscheinbedingungen der Wien Energie.
            </p>
            <p className="mb-3">
              8.3 Der Stromgutschein ist nicht bar ablösbar und kann nicht gegen andere Gutscheine
              oder Waren eingetauscht werden, sofern nicht ausdrücklich anders angegeben.
            </p>
            <p className="mb-3">
              8.4 Da der Stromgutschein nicht personalisiert ist, kann er von der Kundin/dem
              Kunden frei an Dritte weitergegeben werden.
            </p>
            <p className="mb-3">
              8.5 Die Gültigkeitsdauer des Stromgutscheins ist auf dem Gutschein selbst bzw. in den
              Gutscheinbedingungen angegeben.
            </p>
            <p>
              8.6 Bei Wahl der Variante Midea Portasplit 3,5 kW ohne Strom-Vorteil findet dieser Abschnitt keine
              Anwendung.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              9. Gewährleistung und Garantien
            </h2>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              9.1 Gesetzliche Gewährleistung (Mängelhaftung)
            </h3>
            <p className="mb-3">
              Es gelten die gesetzlichen Gewährleistungsbestimmungen nach §§ 922 ff ABGB. Die
              Gewährleistungsfrist beträgt zwei Jahre ab Übergabe des Gerätes. Die Beweislastumkehr
              gemäß § 924 ABGB zugunsten der Verbraucherin/des Verbrauchers gilt für den gesetzlich
              vorgesehenen Zeitraum.
            </p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              9.2 Herstellergarantie
            </h3>
            <p className="mb-3">
              Darüberhinausgehende Herstellergarantien bleiben unberührt. Informationen zu
              gegebenenfalls geltenden zusätzlichen Garantien und deren genaue Bedingungen finden
              Sie bei den beiliegenden Garantieunterlagen des Herstellers Midea sowie auf
              besonderen Informationsseiten im Webshop.
            </p>
            <h3 className="text-we-body-lg font-bold text-we-heading mt-we-component-md mb-1">
              9.3 Kundendienst
            </h3>
            <p>
              Sie erreichen unseren Kundendienst für Fragen, Reklamationen und Beanstandungen zum
              Sommerfrische-Paket unter:<br />
              Telefon:{" "}
              <a href="tel:+43140048188" className={linkCls}>
                +43 1 4004818888
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:sommerfrische@wienenergie.at" className={linkCls}>
                sommerfrische@wienenergie.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">10. Haftung</h2>
            <p className="mb-3">
              10.1 Für Ansprüche aufgrund von Schäden, die durch Wien Energie, ihre gesetzlichen
              Vertreter oder Erfüllungsgehilfen verursacht wurden, haften wir stets unbeschränkt:
            </p>
            <ol className="list-[lower-alpha] pl-6 space-y-2 mb-3">
              <li>bei Verletzung des Lebens, des Körpers oder der Gesundheit,</li>
              <li>bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung,</li>
              <li>bei Garantieversprechen, soweit vereinbart, sowie</li>
              <li>
                soweit der Anwendungsbereich des österreichischen Produkthaftungsgesetzes (PHG)
                eröffnet ist.
              </li>
            </ol>
            <p className="mb-3">
              10.2 Bei leichter Fahrlässigkeit haftet Wien Energie nur bei Verletzung wesentlicher
              Vertragspflichten. In diesem Fall ist die Haftung auf den typischen, vorhersehbaren
              Schaden beschränkt. Im Übrigen ist jegliche Haftung für leicht fahrlässig
              verursachte Sach- und Vermögensschäden ausgeschlossen. Für Schäden aus der Verletzung
              von Leben, Körper oder Gesundheit, bei Vorsatz oder grober Fahrlässigkeit, nach dem
              Produkthaftungsgesetz sowie aus ausdrücklich übernommenen Garantien haftet Wien
              Energie uneingeschränkt.
            </p>
            <p className="mb-3">
              10.3 Die vorstehenden Haftungsbeschränkungen (Ziffer 10.2) gelten ausschließlich
              gegenüber Unternehmerinnen und Unternehmern. Gegenüber Verbraucherinnen und
              Verbrauchern haftet Wien Energie nach den gesetzlichen Bestimmungen des
              österreichischen Rechts; eine Haftungsbeschränkung für leichte Fahrlässigkeit findet
              gegenüber Verbraucherinnen und Verbrauchern nicht statt.
            </p>
            <p>
              10.4 Wien Energie übernimmt keine Haftung für Schäden, die durch unsachgemäße
              Installation oder Nutzung des Gerätes entgegen der Bedienungsanleitung des
              Herstellers entstehen.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">11. Eigentumsvorbehalt</h2>
            <p>
              11.1 Das Gerät bleibt bis zur vollständigen Bezahlung des Kaufpreises Eigentum der Wien Energie.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">12. Widerrufsrecht</h2>
            <p>
              12.1 Das Widerrufsrecht richtet sich nach den gesetzlichen Bestimmungen des Fern- und
              Auswärtsgeschäfte-Gesetzes (FAGG). Die detaillierte Widerrufsbelehrung und das
              Muster-Widerrufsformular sind in einem gesonderten Abschnitt dieses Dokuments
              enthalten (siehe{" "}
              <Link to="/widerruf" className={linkCls}>
                Widerrufsbelehrung
              </Link>
              ).
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">13. Datenschutz</h2>
            <p>
              13.1 Die Verarbeitung personenbezogener Daten richtet sich nach der{" "}
              <Link to="/datenschutz" className={linkCls}>
                Datenschutzerklärung
              </Link>{" "}
              für das Angebot „Sommerfrische" sowie der Datenschutz-Grundverordnung (DSGVO) und dem
              österreichischen Datenschutzgesetz (DSG).
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">14. Streitbeilegung</h2>
            <p className="mb-3">
              14.1 Die Europäische Kommission stellt unter{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                https://ec.europa.eu/consumers/odr
              </a>{" "}
              eine Plattform zur Online-Streitbeilegung (OS-Plattform) bereit.
            </p>
            <p>
              14.2 Wien Energie ist nicht verpflichtet und nicht bereit, an einem
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen,
              sofern gesetzlich nichts anderes vorgeschrieben ist.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">
              15. Anwendbares Recht und Gerichtsstand
            </h2>
            <p className="mb-3">
              15.1 Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts (CISG). Die
              zwingenden Verbraucherschutzbestimmungen des Staates, in dem die Kundin/der Kunde
              ihren/seinen gewöhnlichen Aufenthalt hat, bleiben unberührt.
            </p>
            <p>
              15.2 Gerichtsstand für Streitigkeiten mit Verbraucherinnen und Verbrauchern ist das
              für den Wohnsitz der Kundin/des Kunden zuständige Gericht oder das sachlich
              zuständige Gericht in Wien, sofern die Kundin/der Kunde dort ihren/seinen Wohnsitz
              oder gewöhnlichen Aufenthalt hat.
            </p>
          </section>

          <section>
            <h2 className="text-we-h-md font-bold text-we-heading mb-3">16. Salvatorische Klausel</h2>
            <p>
              16.1 Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder
              werden, so wird dadurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. An
              die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
            </p>
          </section>
        </article>

        <p className="mt-we-section-lg text-we-body-xs text-we-muted">Stand: April 2026</p>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
