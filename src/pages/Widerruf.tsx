
import { CardBox, LegalLayout, LegalSection } from "./LegalCommon";

export default function WiderrufPage() {
  return (
    <LegalLayout
      title="Widerrufsbelehrung"
      subtitle="gemäß §§ 11 ff Fern- und Auswärtsgeschäfte-Gesetz (FAGG)"
    >
      <LegalSection title="Widerrufsrecht">
        <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
        <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Ware in Besitz genommen haben bzw. hat.</p>
        <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
        <CardBox>
          <p><strong>Wien Energie GmbH</strong></p>
          <p><strong>Thomas-Klestil-Platz 14, 1030 Wien</strong></p>
          <p><strong>Telefon: +43 1 4004 81880</strong></p>
          <p><strong>E-Mail: sommerfrische@wienenergie.at</strong></p>
        </CardBox>
        <p>mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</p>
        <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
      </LegalSection>

      <LegalSection title="Folgen des Widerrufs">
        <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
        <p>Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>
        <p>Wir können die Rückzahlung verweigern, bis wir die Ware zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Ware zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.</p>
      </LegalSection>

      <LegalSection title="Rücksendung">
        <p>Sie haben die Ware unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Ware vor Ablauf der Frist von vierzehn Tagen absenden.</p>
        <p>Bei der Variante Midea PortaSplit 3,5 kW + Strom-Vorteil ist auch der Stromgutschein zurückzugeben, sofern er noch nicht eingelöst wurde. Wurde der Stromgutschein bereits ganz oder teilweise eingelöst, ist der entsprechende Wert von der Rückerstattung abzuziehen.</p>
        <p>Die unmittelbaren Kosten der Rücksendung der Ware tragen Sie.</p>
        <p>Sie müssen für einen etwaigen Wertverlust der Ware nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Ware nicht notwendigen Umgang mit ihr zurückzuführen ist.</p>
      </LegalSection>

      <LegalSection title="Muster-Widerrufsformular">
        <p style={{ fontStyle: "italic", color: "#7a7a7a" }}>Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.</p>
        <CardBox>
          <p><strong>An:</strong></p>
          <p>Wien Energie GmbH<br />Thomas-Klestil-Platz 14<br />1030 Wien<br />E-Mail: sommerfrische@wienenergie.at</p>
          <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Ware (*):</p>
          <p>__________________________________________</p>
          <p>Bestellt am (*) / erhalten am (*): ______________</p>
          <p>Name der Verbraucherin / des Verbrauchers: __________________________</p>
          <p>Anschrift der Verbraucherin / des Verbrauchers: __________________________</p>
          <p>__________________________________________</p>
          <p>Datum: ____________</p>
          <p>Unterschrift der Verbraucherin / des Verbrauchers (nur bei Mitteilung auf Papier):</p>
          <p>__________________________________________</p>
          <p>(*) Unzutreffendes streichen.</p>
        </CardBox>
      </LegalSection>

      <p style={{ color: "#7a7a7a", fontSize: 14, marginTop: 44 }}>Stand: April 2026</p>
    </LegalLayout>
  );
}
