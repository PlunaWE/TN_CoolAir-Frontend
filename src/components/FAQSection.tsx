import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, FileText } from "lucide-react";
import { Container } from "@/components/Container";

const specsData = [
  ["Modellbezeichnung", "Midea Portasplit 3.5kW"],
  ["Kühlleistung", "3,5 kW (9.000 BTU/h)"],
  ["Heizleistung", "3,5 kW (9.000 BTU/h)"],
  ["Geeignete Raumgröße", "Bis zu 42 m² (je nach Dämmung und Sonneneinstrahlung)"],
  ["Energieeffizienzklasse Kühlen / SEER", "A++ / 6,1"],
  ["Energieeffizienzklasse Heizen / SCOP", "A+ / 4,0"],
  ["Kältemittel", "R32"],
  ["Lautstärke Inneneinheit", "ab 39 dB(A)"],
  ["Lautstärke Außeneinheit", "ca. 62 dB"],
  ["Verbindung Innen-/Außeneinheit", "Flexibler Quick-Connect-Schlauch (vormontiert)"],
  ["Durchmesser Schlauch", "ca. 6 cm – passt durch ein gekipptes Fenster"],
  ["Länge Verbindungsschlauch", "200 cm"],
  ["Gewicht Inneneinheit", "32,5 kg"],
  ["Gewicht Außeneinheit", "9,9 kg"],
  ["Abmessungen Inneneinheit", "518 × 340 × 646 mm (B × T × H)"],
  ["Abmessungen Außeneinheit", "500 × 260 × 438 mm (B × T × H)"],
  ["Betriebsmodi", "Kühlen, Heizen, Entfeuchten, Ventilieren"],
  ["Steuerung", "Fernbedienung oder per App"],
  ["Timer-Funktion", "Ja"],
  ["Luftfilter", "Herausnehmbarer & waschbarer Filter"],
  ["Stromversorgung", "220–240 V / 50 Hz, Standard-Haushaltssteckdose"],
  ["Leistungsaufnahme / Durchschnittsverbrauch", "Abhängig von Betriebsmodus und Last; im Kühlmodus typischerweise ca. 400–450 W (0,4–0,45 kWh/h)"],
  ["Außenumgebungstemperatur (Kühlen / Heizen)", "0–45 °C / −10–24 °C"],
];

const setupSteps = [
  "Stelle die Inneneinheit an der gewünschten Position im Raum auf (idealerweise in Fensternähe).",
  "Platziere die Außeneinheit auf dem Balkon, der Terrasse oder mit der Universalhalterung außerhalb des Fensters.",
  "Führe den Verbindungsschlauch durch das leicht geöffnete Fenster oder die Balkontür.",
  "Dichte die Fensteröffnung mit dem mitgelieferten Fensterabdichtungskit ab, damit keine warme Luft eindringt.",
  "Stecke die Inneneinheit an die Steckdose und schalte das Gerät ein.",
];

interface FaqItem {
  q: string;
  a: string | "TABLE" | "STEPS" | "DOCS";
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "Das Gerät: Midea Portasplit",
    items: [
      { q: "Was ist die Midea Portasplit?", a: "Die Midea Portasplit ist ein mobiles Split-Klimagerät der neuesten Generation. Im Gegensatz zu klassischen Monobloc-Klimageräten besteht die Midea Portasplit aus zwei Einheiten: einer kompakten Inneneinheit, die den Raum kühlt, und einer Außeneinheit, in der sich der Kompressor befindet. Beide Einheiten sind über einen flexiblen Verbindungsschlauch miteinander verbunden, der durch ein leicht geöffnetes Fenster oder eine Balkontür geführt wird. So bleibt der Lärm draußen und die Kühle drinnen." },
      { q: "Was unterscheidet die Midea Portasplit von einem normalen mobilen Klimagerät?", a: "Herkömmliche mobile Klimageräte (Monobloc-Geräte) haben den Kompressor im Inneren des Gehäuses und leiten die warme Abluft über einen dicken Schlauch nach draußen.\n\nDas bringt zwei Nachteile mit sich: Erstens sind diese Geräte im Betrieb im Innenbereich sehr laut (oft über 60 dB), zweitens strömt durch den dicken Abluftschlauch bei ungünstiger Installation (weit geöffnete Tür/Fenster) ständig warme Luft in den Raum zurück, was die Effizienz deutlich reduziert. Die Midea Portasplit löst beide Probleme, indem sie den Kompressor nach außen verlagert und die dünne Kältemittelleitung kein großes Öffnen benötigt, durch die die warme Luft in den Innenbereich strömen kann. Die dazu gelieferte Fensterabdichtung minimiert zusätzlich Kühlverluste. Die Inneneinheit arbeitet dadurch mit nur ca. 39 dB(A) (vergleichbar mit einem leisen Gespräch)." },
      { q: "Wie laut ist das Gerät wirklich?", a: "Die Inneneinheit arbeitet auf der niedrigsten Stufe mit ca. 39 dB(A). Zum Vergleich: Ein leises Gespräch liegt bei etwa 40 dB(A), eine Bibliothek bei ca. 35 dB(A). Sie können das Gerät also problemlos nachts im Schlafzimmer betreiben. Die Außeneinheit ist mit ca. 62 dB etwas lauter, wird aber draußen angebracht und ist daher kaum wahrnehmbar." },
      { q: "Kann das Gerät auch heizen?", a: "Ja, die Midea Portasplit kann sowohl kühlen als auch heizen. Das Gerät bietet darüber hinaus auch noch einen Entfeuchtungsmodus, der an schwülen Tagen besonders angenehm ist, sowie einen reinen Ventilator-Modus." },
      { q: "Welches Kältemittel wird verwendet? Ist das umweltfreundlich?", a: "Die Midea Portasplit verwendet das moderne Kältemittel R32. Dieses hat ein deutlich geringeres Treibhauspotenzial als ältere Standard-Kältemittel und sorgt gleichzeitig für eine hohe Energieeffizienz.\n\nDadurch arbeitet das Gerät nicht nur leistungsstark, sondern auch vergleichsweise umweltfreundlich. Zwar ist R32 nicht vollständig klimaneutral, gilt jedoch aktuell als guter Standard für effiziente und verantwortungsbewusste Klimatisierung im Haushalt." },
      { q: "Für welche Raumgröße eignet sich das Gerät?", a: "Mit einer Kühlleistung von 3,5 kW (9.000 BTU/h) eignet sich die Midea Portasplit optimal für Räume bis 42 m². Die tatsächliche Leistung hängt von mehreren Faktoren ab: Dämmqualität des Gebäudes, Anzahl und Größe der Fenster, Sonneneinstrahlung (Süd- vs. Nordseite), Anzahl der Personen und elektrischen Geräte im Raum sowie die Raumhöhe." },

      { q: "Braucht das Gerät eine spezielle Steckdose?", a: "Nein. Die Midea Portasplit wird an eine ganz normale Haushaltssteckdose (220–240 V / 50 Hz, Schuko-Stecker) angeschlossen. Ein Starkstromanschluss oder eine spezielle Absicherung ist nicht erforderlich. Wir empfehlen allerdings, das Gerät nicht über ein Verlängerungskabel oder eine Mehrfachsteckdose zu betreiben, sondern direkt an der Wandsteckdose anzuschließen." },
      { q: "Muss ich das Gerät regelmäßig warten?", a: "Der Wartungsaufwand ist minimal. Wir empfehlen, den herausnehmbaren Luftfilter der Inneneinheit alle zwei bis vier Wochen unter fließendem Wasser zu reinigen und vollständig trocknen zu lassen. Vor der ersten Inbetriebnahme im Sommer sollten Sie prüfen, ob die Verbindungsschläuche dicht sitzen und die Außeneinheit frei von Verschmutzungen ist. Ein professionelles Service ist bei normaler Nutzung im Privathaushalt nicht erforderlich." },
      { q: "Was tun, wenn das Gerät defekt ist?", a: "Sollten Sie Probleme mit Ihrer Midea Portasplit haben, melden Sie sich direkt bei uns — wir helfen Ihnen schnell und unkompliziert weiter:\n\nE-Mail: sommerfrische@wienenergie.at\n\nTelefon: +43 1 4004818888\n\nErste Schritte zur Selbsthilfe (Stromversorgung prüfen, Reset, Filter reinigen) finden Sie in der Bedienungsanleitung unter „Technische Details“." },
      { q: "Kann ich das Gerät über eine App steuern?", a: "Ja, die Midea Portasplit lässt sich über die Midea Air App (verfügbar für iOS und Android) per WLAN steuern. So können Sie das Gerät bequem von unterwegs einschalten, die Temperatur anpassen oder einen Timer setzen – zum Beispiel, damit die Wohnung bereits angenehm kühl ist, wenn Sie nach Hause kommen.\n\n[Hier gelangen Sie zur App](https://apps.apple.com/de/app/smarthome-msmarthome/id1254346490)" },
      { q: "Wie entsorge ich das Gerät nachhaltig?", a: "Ihre Midea Portasplit darf am Ende ihrer Lebensdauer nicht im Hausmüll entsorgt werden — sie enthält elektronische Komponenten, die fachgerecht recycelt werden müssen.\n\nSo entsorgen Sie das Gerät korrekt:\n\nGeben Sie es bei einer offiziellen Sammelstelle für Elektro-Altgeräte ab. In Wien sind das die Mistplätze der MA 48. Alternativ können Sie sich bei Ihrer zuständigen Stadt- oder Gemeindeverwaltung nach weiteren Sammelstellen erkundigen.\n\nDas Gerät entspricht der EU-WEEE-Richtlinie (2012/19/EU). Ausführliche Hinweise zur sicheren Nutzung und Entsorgung finden Sie in der Bedienungsanleitung unter „Technische Details“." },
      { q: "Muss ich beim Aufbau oder Betrieb der Midea PortaSplit etwas beachten?", a: "Halten Sie sich beim Aufbau und Betrieb an die Bedienungsanleitung der Midea PortaSplit. Bei starkem Wind sind Sie dafür verantwortlich, das Gerät rechtzeitig zu sichern oder abzubauen. Die vollständige Bedienungsanleitung finden Sie [hier](/docs/PortaSplit-Gebrauchsanweisung-DE.pdf)." },
    ],
  },
  {
    title: "Lieferung, Aufbau & Installation",
    items: [
      { q: "Was umfasst die Lieferung?", a: "Das Sommerfrische-Paket wird direkt bequem zu Ihnen nach Hause bis zum Aufstellort von unserem Speditionspartner geliefert. Im Lieferumfang enthalten sind: die Inneneinheit, die Außeneinheit, der vormontierte Verbindungsschlauch, die Universalhalterung, eine Fernbedienung, ein Fensterabdichtungskit in Standard-Länge sowie die Bedienungsanleitung.\n\nHinweis zur Fensterabdichtung: Das mitgelieferte Kit passt für die meisten gängigen Fenster. Für Terrassentüren, Balkontüren oder besonders große Fenster benötigen Sie eine verlängerte Abdichtung. Diese ist nicht im Standardpaket enthalten und muss separat erworben werden." },
      { q: "Wie lange dauert die Lieferung?", a: "Nach Bestelleingang wird Ihr Sommerfrische-Paket in der Regel innerhalb von 5–8 Werktagen an Ihre angegebene Adresse geliefert. Sie erhalten eine Versandbestätigung mit Tracking-Nummer per E-Mail, sobald das Paket auf dem Weg zu Ihnen ist." },
      { q: "Wohin wird geliefert?", a: "Wir liefern an alle Adressen in Österreich. Eine Zustellung an Packstationen oder Postfächer ist leider nicht möglich, da es sich um eine Spedition handelt." },
      { q: "Muss ich das Gerät von einem Fachbetrieb installieren lassen?", a: "Nein, das ist einer der größten Vorteile der Midea Portasplit. Das Gerät ist so konzipiert, dass Sie es in unter einer Stunde selbst aufstellen und in Betrieb nehmen können. Es sind keinerlei Bohrungen, bauliche Veränderungen oder Fachkenntnisse erforderlich." },
      { q: "Wie funktioniert der Aufbau Schritt für Schritt?", a: "Eine detaillierte Beschreibung finden Sie in der mitgelieferten Anleitung sowie in dem untenstehenden Dokument (Anhang Anleitung)." },
      { q: "Brauche ich einen Balkon oder eine Terrasse?", a: "Ein Balkon oder eine Terrasse ist ideal, aber nicht zwingend erforderlich. Die Außeneinheit kann über die Universalhalterung außerhalb des Fensters (auch französische Fenster) platziert werden. Wichtig ist nur, dass die Außeneinheit im Freien steht und ausreichend Luftzirkulation hat." },
      { q: "Funktioniert das Gerät auch bei Mietwohnungen ohne bauliche Veränderungen?", a: "Ja, genau dafür ist die Midea Portasplit konzipiert. Es sind keine Bohrungen, Wanddurchbrüche oder andere bauliche Eingriffe notwendig. Der Verbindungsschlauch wird durch ein gekipptes Fenster geführt und die Öffnung mit dem Fensterabdichtungskit verschlossen. Damit ist das Gerät die perfekte Lösung für Mieter*innen, die keine baulichen Veränderungen vornehmen möchten oder können." },
      { q: "Brauche ich die Zustimmung meines/meiner Vermieter*in, um die Midea Portasplit zu installieren?", a: "In der Regel benötigen Sie keine Zustimmung Ihres/Ihrer Vermieter*in, da die Midea Portasplit ohne feste bauliche Veränderungen installiert wird. Das Gerät ist mobil und kann ohne Bohren oder dauerhafte Eingriffe in die Bausubstanz betrieben werden.\n\nWichtig ist jedoch, dass bei der Nutzung keine dauerhaften Veränderungen an Fenstern, Türen oder der Fassade vorgenommen werden.\n\nIn Einzelfällen (z. B. bei besonderen Mietvertragsklauseln oder denkmalgeschützten Gebäuden) kann es sinnvoll sein, vorab Rücksprache mit dem/der Vermieter*in zu halten.\n\nBitte beachten Sie: Die Abklärung mit Ihrer Vermieterin oder Ihrem Vermieter sowie mit der Hausverwaltung liegt in Ihrer Verantwortung. Wien Energie übernimmt keine Haftung für etwaige Konflikte, Auflagen oder Folgen, die sich aus Ihrem Mietverhältnis oder der Hausordnung im Zusammenhang mit der Nutzung der Midea Portasplit ergeben." },
      { q: "Kann ich das Gerät in verschiedenen Räumen verwenden?", a: "Grundsätzlich ja: Das Gerät ist mobil und kann in einen anderen Raum umgestellt werden. Beachten Sie allerdings, dass Sie die Außeneinheit entsprechend umpositionieren und die Fensterdichtung neu anbringen müssen." },
      { q: "Entsteht Kondenswasser? Muss ich das Wasser ablassen?", a: "Beim Kühlbetrieb entsteht naturgemäß Kondenswasser. Die Midea Portasplit leitet das Kondenswasser automatisch an die Außeneinheit weiter, wo es dann kontrolliert ablaufen kann. In der Regel müssen Sie kein Wasser manuell ablassen. Nur bei extrem hoher Luftfeuchtigkeit über einen längeren Zeitraum kann es vorkommen, dass überschüssiges Kondenswasser anfällt – in diesem Fall zeigt das Gerät einen Hinweis an." },
    ],
  },
  {
    title: "Der Wien Energie-Stromgutschein",
    items: [
      { q: "Was hat es mit dem Wien Energie-Stromgutschein auf sich?", a: "Sommerfrische ist mehr als nur ein Klimagerät – es ist eine Kühllösung, die Gerät und Energie verbindet. Deshalb erhalten Sie bei ausgewählten Sommerfrische-Angeboten einen Gutschein im Wert von 150 Euro inklusive. Diesen können Sie für Ihre Wien Energie-Rechnung einlösen oder auch an Familie oder Freunde verschenken. Ein Klimagerät verbraucht im Betrieb naturgemäß zusätzlichen Strom – der Gutschein hilft Ihnen, die Stromkosten der ersten Saison abzufedern. Bitte beachten Sie, dass es sich um eine einmalige Zugabe zum Gerätekauf handelt; der laufende Stromverbrauch in den Folgejahren wird wie gewohnt über Ihre Stromrechnung abgerechnet." },
      { q: "Wie erhalte ich den Gutschein?", a: "Nach Abschluss Ihrer Bestellung und Eingang der Zahlung erhalten Sie den Gutschein automatisch per E-Mail an die bei der Bestellung angegebene E-Mail-Adresse. Bitte prüfen Sie auch Ihren Spam-Ordner. Der Versand erfolgt in der Regel 14 Tage nach Zahlungseingang." },
      { q: "Ist der Gutschein personalisiert? Kann ich ihn weitergeben?", a: "Der Wien Energie-Stromgutschein ist nicht personalisiert und kann grundsätzlich auch von einer anderen Person eingelöst werden – er eignet sich also auch als Geschenk." },
      { q: "Wie lange ist der Gutschein gültig?", a: "Der Wien Energie-Stromgutschein ist unbefristet gültig." },
      { q: "Wie hoch ist der Stromverbrauch des Geräts und wie weit reicht der 150 Euro Gutschein?", a: "Transparenz ist uns wichtig: Der tatsächliche Stromverbrauch hängt stark vom gewählten Betriebsmodus (Kühlen, Heizen, Entfeuchten, Ventilieren) sowie von Zieltemperatur, Raumgröße und Dämmung ab. Im typischen Sommereinsatz liegt die Leistungsaufnahme erfahrungsgemäß bei ca. 400–450 W (im Schnitt rund 434 W) und kann in Leistungsspitzen auf bis zu ca. 600 W ansteigen.\n\nWas heißt das in Euro? Bei einem Haushaltsstrompreis von rund 0,25 Euro/kWh entstehen im Kühl-Modus rechnerisch ca. 10–11 Cent pro Betriebsstunde im typischen Bereich und bis zu ca. 15 Cent pro Betriebsstunde in Leistungsspitzen. Bei einer typischen Nutzung von 4 Stunden pro Tag sind das rund 1,7 kWh/Tag bzw. ca. 42 Cent pro Tag.\n\nWie weit reicht der 150 Euro Gutschein? Bei diesem Preisniveau deckt der Gutschein ca. 600 kWh ab – das entspricht deutlich mehr als einer kompletten Sommersaison Kühlbetrieb. Den darüberhinausgehenden sowie den laufenden Stromverbrauch in den Folgejahren rechnen wir wie gewohnt transparent über Ihre Stromrechnung ab." },
      { q: "Wie löse ich den Wien Energie-Stromgutschein ein?", a: "Die Einlösung Ihres Wien Energie-Stromgutscheins dauert nur wenige Minuten. So gehen Sie vor:\n\nSchritt 1 – Gutschein-E-Mail öffnen: Sie erhalten den Gutschein-Code ca. 14 Tage nach Zahlungseingang per E-Mail (bitte ggf. auch Spam-Ordner prüfen).\n\nSchritt 2 – Einlöseseite aufrufen: Öffnen Sie https://meine.wienenergie.at/privat/energiegutschein-einloesen/gutschein-eingeben.\n\nSchritt 3 – Code eingeben: Tragen Sie den Gutschein-Code aus der E-Mail in das dafür vorgesehene Feld ein und bestätigen Sie die Eingabe.\n\nSchritt 4 – Automatische Verrechnung: Der Betrag von 150 Euro wird anschließend mit Ihrer nächsten offenen Stromrechnung bei Wien Energie verrechnet. Eine zusätzliche detaillierte Anleitung ist Ihrer Gutschein-E-Mail beigefügt." },
      { q: "Muss ich Wien Energie-Kund*innen sein, um den Wien Energie-Stromgutschein zu nutzen?", a: "Ja, für die Einlösung des Wien Energie-Stromgutscheins benötigen Sie einen aufrechten Stromvertrag bei Wien Energie. Wenn Sie (noch) kein*e Wien Energie-Kund*innen sind, können Sie alternativ den Gutschein weiterverschenken – oder natürlich zu Wien Energie wechseln und dann den Wien Energie-Stromgutschein einlösen." },
    ],
  },
  {
    title: "Kühlung im Vergleich: Welche Lösung passt zu mir?",
    items: [
      { q: "Welche Kühlungsoptionen bietet Wien Energie an?", a: "Wien Energie setzt bei Kühlung auf verschiedene Lösungen: Die strategische Priorität liegt auf Fernkälte, einer klimaschonenden, zentralen Kühlung für ganze Gebäude und Stadtteile, ähnlich wie Fernwärme. Für Einfamilienhäuser und Eigentumswohnungen können fest installierte Split-Klimaanlagen eine gute Lösung sein. Und für alle, bei denen weder Fernkälte noch eine Festinstallation möglich oder sinnvoll ist, ist die beste Lösung Sommerfrische, die mobile, flexible Kühllösung." },
      { q: "Was ist Fernkälte und warum setzt Wien Energie darauf?", a: "Fernkälte funktioniert ähnlich wie Fernwärme: Kaltes Wasser wird in einer zentralen Anlage erzeugt und über ein Leitungsnetz an angeschlossene Gebäude verteilt. Das ist hocheffizient, weil die Kühlung zentral und im großen Maßstab erfolgt – mit deutlich weniger Energieverbrauch als tausende Einzelgeräte. Allerdings ist Fernkälte aktuell nur in vereinzelten größeren Wohn- und Bürogebäuden verfügbar." },
      { q: "Für wen ist Sommerfrische mit der Midea Portasplit die optimale Lösung?", a: "Sommerfrische ist die richtige Wahl, wenn an Ihrem Standort keine Fernkälte verfügbar ist und eine Festinstallation nicht möglich oder nicht gewünscht ist. Besonders geeignet ist sie für Mieter*innen, die keine baulichen Veränderungen vornehmen dürfen, sowie für alle, die eine flexible, saisonale Lösung suchen, die sich bei einem Umzug einfach mitnehmen lässt – und effizient kühlen wollen, ohne Installationsaufwand und hohe Vorabkosten." },
      { q: "Ich wohne in einem Einfamilienhaus – ist Sommerfrische trotzdem das Richtige?", a: "Im Einfamilienhaus haben Sie als Eigentümer*in in der Regel die Freiheit, bauliche Veränderungen vorzunehmen. Wenn Sie langfristig mehrere Räume kühlen möchten, ist eine fest installierte Multi-Split-Anlage oder eine Wärmepumpe mit Kühlfunktion meist die wirtschaftlichere Lösung. Sommerfrische kann im Einfamilienhaus aber dennoch sinnvoll sein, zum Beispiel als schnelle Lösung für einen einzelnen Raum (Schlafzimmer, Home-Office), als Überbrückung bis zur Installation einer Festanlage oder wenn Sie die Investition in eine Festinstallation aktuell nicht tätigen möchten." },
    ],
  },
  {
    title: "Zahlung",
    items: [
      { q: "Welche Zahlungsmethoden stehen zur Verfügung?", a: "Sie bezahlen per Einmalzahlung über unseren Zahlungsdienstleister TeleCash. Folgende Zahlungsarten stehen Ihnen zur Verfügung: Kreditkarte oder Debitkarte." },
      { q: "Gibt es versteckte Kosten?", a: "Nein. Der angezeigte Preis ist der Endpreis inklusive Lieferung und Umsatzsteuer." },
    ],
  },
  {
    title: "Technische Details",
    items: [
      { q: "Welche technischen Daten hat die Midea Portasplit?", a: "TABLE" },
      { q: "Wo finde ich Datenblatt, Bedienungsanleitung und Kurzanleitung?", a: "DOCS" },
    ],
  },
];

const SpecsTable = () => (
  <div className="overflow-x-auto mt-we-component-sm">
    <table className="w-full text-we-body-sm border-collapse font-sans">
      <thead>
        <tr className="bg-we-brand-secondary text-we-text-inverse">
          <th className="text-left px-we-component-md py-we-component-sm font-bold">Eigenschaft</th>
          <th className="text-left px-we-component-md py-we-component-sm font-bold">Wert</th>
        </tr>
      </thead>
      <tbody>
        {specsData.map(([key, val], i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-we-surface-muted" : "bg-white"}>
            <td className="px-we-component-md py-we-component-sm text-we-text font-bold">{key}</td>
            <td className="px-we-component-md py-we-component-sm text-we-text">{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StepsList = () => (
  <ol className="mt-we-component-sm space-y-we-component-sm">
    {setupSteps.map((step, i) => (
      <li key={i} className="flex gap-we-component-sm text-we-body-sm text-we-text font-sans">
        <span className="flex-shrink-0 w-7 h-7 rounded-we-full bg-we-brand-secondary text-we-text-inverse flex items-center justify-center text-we-body-xs font-bold">
          {i + 1}
        </span>
        <span className="pt-0.5">{step}</span>
      </li>
    ))}
  </ol>
);

const DocsList = () => (
  <div className="mt-we-component-sm">
    <p className="text-we-body-md text-we-muted mb-we-component-sm">
      Die Selbstinstallation ist möglich, wir empfehlen bei fehlender fachlicher Erfahrung die Installation durch einen Fachbetrieb.
    </p>

    <ul className="space-y-we-component-sm">
      {[
        { label: "Datenblatt Midea Portasplit 3,5 kW", href: "/docs/20240325-Midea-PortaSplit-Datenblatt-final.pdf" },
        { label: "Kurzanleitung", href: "/docs/Kurzanleitung-DE_portasplit.pdf" },
        { label: "Gebrauchsanweisung", href: "/docs/PortaSplit-Gebrauchsanweisung-DE.pdf" },
      ].map((doc) => (
        <li key={doc.href}>
          <a
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-we-component-sm text-we-brand-secondary hover:text-we-brand-secondary/80 underline text-we-body-md"
          >
            <FileText className="h-5 w-5 flex-shrink-0" />
            <span>{doc.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const linkify = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdMatch) {
      return (
        <a
          key={i}
          href={mdMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-we-brand-secondary underline hover:text-we-brand-secondary/80 break-all"
        >
          {mdMatch[1]}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-we-brand-secondary underline hover:text-we-brand-secondary/80 break-all"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const renderAnswer = (a: string) => {
  if (a === "TABLE") return <SpecsTable />;
  if (a === "STEPS") return <StepsList />;
  if (a === "DOCS") return <DocsList />;
  const paragraphs = a.split("\n\n");
  return (
    <div className="space-y-we-component-sm">
      {paragraphs.map((p, i) => (
        <p key={i}>{linkify(p)}</p>
      ))}
    </div>
  );
};

const FAQSection = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-we-section-lg lg:py-we-section-xlg font-sans">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-we-h-lg font-bold text-we-heading text-center mb-we-component-xlg">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-we-component-sm">
            {faqCategories.map((cat, ci) => (
              <div key={ci} className="bg-white rounded-we-lg shadow-we-card overflow-hidden">
                <button
                  onClick={() => setOpenCategory(openCategory === ci ? null : ci)}
                  className="w-full flex items-center justify-between p-we-component-lg hover:bg-we-surface-muted transition-colors"
                >
                  <h3 className="text-we-h-sm font-bold text-we-heading text-left">{cat.title}</h3>
                  <ChevronDown
                    size={22}
                    className={`text-we-brand-secondary transition-transform flex-shrink-0 ${openCategory === ci ? "rotate-180" : ""}`}
                  />
                </button>
                {openCategory === ci && (
                  <div className="px-we-component-lg pb-we-component-lg pl-we-component-lg">
                    <Accordion type="single" collapsible className="divide-y divide-we-neutral-90 pl-we-component-lg mt-we-component-xlg">
                      {cat.items.map((item, qi) => (
                        <AccordionItem
                          key={qi}
                          value={`cat-${ci}-q-${qi}`}
                          className="border-b border-we-neutral-90 last:border-b-0"
                        >
                          <AccordionTrigger className="text-left text-we-body-md font-bold text-we-heading hover:text-we-brand-secondary/80 hover:no-underline py-we-component-sm [&>svg]:text-we-brand-secondary">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-we-text text-we-body-md">
                            {renderAnswer(item.a)}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;