
import { LegalLayout, LegalSection } from "./LegalCommon";

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle='für das Angebot „Sommerfrische“ der Wien Energie GmbH'
    >
      <LegalSection title="1. Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der DSGVO und des österreichischen Datenschutzgesetzes (DSG) ist:
          Wien Energie GmbH, Thomas-Klestil-Platz 14, 1030 Wien
        </p>
        <p>Telefon: +43 1 4004 81880, E-Mail: sommerfrische@wienenergie.at</p>
      </LegalSection>

      <LegalSection title="2. Verarbeitete Daten und Zwecke">
        <p>
          Wir verarbeiten personenbezogene Daten, die Sie uns im Rahmen des Bestellprozesses zur Verfügung
          stellen (Name, Anschrift, E-Mail, Telefon, Zahlungsdaten). Die Verarbeitung erfolgt zum Zweck der
          Vertragsabwicklung (Art. 6 Abs. 1 lit. b DSGVO), der Erfüllung gesetzlicher Pflichten (Art. 6 Abs. 1 lit. c DSGVO)
          sowie auf Basis berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection title="3. Empfänger">
        <p>
          Daten werden an Logistik- und Zahlungspartner weitergegeben, soweit dies zur Vertragsabwicklung
          erforderlich ist (z. B. TeleCash).
        </p>
      </LegalSection>

      <LegalSection title="4. Speicherdauer">
        <p>
          Personenbezogene Daten werden gelöscht, sobald der Zweck der Verarbeitung weggefallen ist und
          keine gesetzlichen Aufbewahrungspflichten (insbesondere § 132 BAO, 7 Jahre) mehr bestehen.
        </p>
      </LegalSection>

      <LegalSection title="5. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Beschwerden können Sie bei der Österreichischen
          Datenschutzbehörde (Barichgasse 40–42, 1030 Wien, dsb@dsb.gv.at) einreichen.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies und Webanalyse">
        <p>
          Wir verwenden technisch notwendige Cookies sowie — mit Ihrer Einwilligung — Webanalyse-Tools
          (z. B. Google Analytics, Mouseflow), um unser Angebot zu verbessern.
        </p>
      </LegalSection>

      <LegalSection title="7. Kontakt Datenschutz">
        <p>Datenschutzanfragen richten Sie bitte an: datenschutz@wienenergie.at</p>
      </LegalSection>
    </LegalLayout>
  );
}
