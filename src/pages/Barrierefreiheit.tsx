
import { LegalLayout, LegalSection } from "./LegalCommon";

export default function BarrierefreiheitPage() {
  return (
    <LegalLayout title="Erklärung der Barrierefreiheit">
      <p>Diese Erklärung zur Barrierefreiheit gilt für die Website www.sommerfrische.wienenergie.at.</p>

      <LegalSection title="Stand der Vereinbarkeit mit den Anforderungen">
        <p>Diese Website ist mit den unten angeführten Ausnahmen der unverhältnismäßigen Belastung mit der Konformitätsstufe AA der Richtlinie für barrierefreie Webinhalte – WCAG 2.1 entsprechend der geltenden harmonisierten europäischen Norm „Europäischer Standard EN 301 549 V3.2.1 (2021-03)“ vereinbar.</p>
      </LegalSection>

      <LegalSection title="Unterstützende Maßnahmen">
        <p>Unsere Website stellt folgende unterstützende Maßnahmen bereit:</p>
        <ul>
          <li>Einsatz von kontrastreichen Fließtexten</li>
          <li>Alternativtexte für Bilder</li>
          <li>Kein Verlust von Inhalt bei Anpassung der Größe</li>
          <li>Pausierbarkeit von beweglichen Elementen</li>
          <li>Textliche Identifizierung von Pflichtfeldern</li>
          <li>Konsistente Bedienung per Tastatur und mittels assistiven Technologien möglich</li>
        </ul>
        <p>Wir arbeiten laufend daran, Barrieren so weit wie möglich zu beheben.</p>
      </LegalSection>

      <LegalSection title="Nicht barrierefreie Inhalte">
        <p>Diese Website enthält ältere Applikationen und Anwendungen, welche teilweise nicht bzw. noch nicht vollständig barrierefrei umgesetzt sind. Es wird aber bestrebt, die Informationen bestmöglich barrierefrei anzubieten. Neue Applikationen beziehungsweise Erweiterungen werden barrierefrei umgesetzt.</p>
      </LegalSection>

      <LegalSection title="Erstellung dieser Erklärung zur Barrierefreiheit">
        <p>Diese Erklärung wurde am 7. Mai 2026 aktualisiert.</p>
      </LegalSection>

      <LegalSection title="Feedback und Kontaktangaben">
        <p>Sollten Sie auf www.sommerfrische.wienenergie.at Barrieren finden, können Sie diese melden und somit helfen, das Webservice der Wien Energie GmbH weiter zu verbessern. Wenden Sie sich hierfür gerne an:</p>
        <p><strong>Barrierefreiheitsbeauftragte Wien Energie GmbH</strong><br />Thomas-Klestil-Platz 14<br />1030 Wien<br />Tel: +43 (664) 88483933<br />E-Mail: barrierefreiheit@wienenergie.at</p>
        <p><strong>Barrierefreiheitsbeauftragte Wien Energie Vertrieb GmbH & Co KG</strong><br />Thomas-Klestil-Platz 14<br />1030 Wien<br />Tel: +43 (664) 88483933<br />E-Mail: barrierefreiheit@wienenergie.at</p>
      </LegalSection>

      <LegalSection title="Verantwortlich für diese Seite">
        <p>Wien Energie GmbH</p>
        <p>Thomas-Klestil-Platz 14</p>
        <p>1030 Wien</p>
      </LegalSection>
    </LegalLayout>
  );
}
