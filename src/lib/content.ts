export type FaqQuestion = {
  question: string;
  answer?: string;
  resources?: { label: string; href: string }[];
  table?: { headers: [string, string]; rows: [string, string][] };
};

export type FaqSection = {
  title: string;
  items: FaqQuestion[];
};

export const faqItems: FaqSection[] = [
  {
    title: "Das Gerät: Midea Portasplit",
    items: [
      {
        question: "Was ist die Midea Portasplit?",
        answer:
          "Die Midea Portasplit ist ein mobiles Split-Klimagerät der neuesten Generation. Im Gegensatz zu klassischen Monobloc-Klimageräten besteht die Midea Portasplit aus zwei Einheiten: einer kompakten Inneneinheit, die den Raum kühlt, und einer Außeneinheit, in der sich der Kompressor befindet. Beide Einheiten sind über einen flexiblen Verbindungsschlauch miteinander verbunden, der durch ein leicht geöffnetes Fenster oder eine Balkontür geführt wird. So bleibt der Lärm draußen und die Kühle drinnen.",
      },
      {
        question: "Was unterscheidet die Midea Portasplit von einem normalen mobilen Klimagerät?",
        answer:
          "Herkömmliche mobile Klimageräte (Monobloc-Geräte) haben den Kompressor im Inneren des Gehäuses und leiten die warme Abluft über einen dicken Schlauch nach draußen.\n\nDas bringt zwei Nachteile mit sich: Erstens sind diese Geräte im Betrieb im Innenbereich sehr laut (oft über 60 dB), zweitens strömt durch den dicken Abluftschlauch bei ungünstiger Installation (weit geöffnete Tür/Fenster) ständig warme Luft in den Raum zurück, was die Effizienz deutlich reduziert. Die Midea Portasplit löst beide Probleme, indem sie den Kompressor nach außen verlagert und die dünne Kältemittelleitung kein großes Öffnen benötigt, durch die die warme Luft in den Innenbereich strömen kann. Die dazu gelieferte Fensterabdichtung minimiert zusätzlich Kühlverluste. Die Inneneinheit arbeitet dadurch mit nur ca. 39 dB(A) (vergleichbar mit einem leisen Gespräch).",
      },
      {
        question: "Wie laut ist das Gerät wirklich?",
        answer:
          "Die Inneneinheit arbeitet auf der niedrigsten Stufe mit ca. 39 dB(A). Zum Vergleich: Ein leises Gespräch liegt bei etwa 40 dB(A), eine Bibliothek bei ca. 35 dB(A). Sie können das Gerät also problemlos nachts im Schlafzimmer betreiben. Die Außeneinheit ist mit ca. 62 dB etwas lauter, wird aber draußen angebracht und ist daher kaum wahrnehmbar.",
      },
      {
        question: "Kann das Gerät auch heizen?",
        answer:
          "Ja, die Midea Portasplit kann sowohl kühlen als auch heizen. Das Gerät bietet darüber hinaus auch noch einen Entfeuchtungsmodus, der an schwülen Tagen besonders angenehm ist, sowie einen reinen Ventilator-Modus.",
      },
      {
        question: "Welches Kältemittel wird verwendet? Ist das umweltfreundlich?",
        answer:
          "Die Midea Portasplit verwendet das moderne Kältemittel R32. Dieses hat ein deutlich geringeres Treibhauspotenzial als ältere Standard-Kältemittel und sorgt gleichzeitig für eine hohe Energieeffizienz.\n\nDadurch arbeitet das Gerät nicht nur leistungsstark, sondern auch vergleichsweise umweltfreundlich. Zwar ist R32 nicht vollständig klimaneutral, gilt jedoch aktuell als guter Standard für effiziente und verantwortungsbewusste Klimatisierung im Haushalt.",
      },
      {
        question: "Für welche Raumgröße eignet sich das Gerät?",
        answer:
          "Mit einer Kühlleistung von 3,5 kW (9.000 BTU/h) eignet sich die Midea Portasplit optimal für Räume bis 42 m². Die tatsächliche Leistung hängt von mehreren Faktoren ab: Dämmqualität des Gebäudes, Anzahl und Größe der Fenster, Sonneneinstrahlung (Süd- vs. Nordseite), Anzahl der Personen und elektrischen Geräte im Raum sowie die Raumhöhe.",
      },
      {
        question: "Braucht das Gerät eine spezielle Steckdose?",
        answer:
          "Nein. Die Midea Portasplit wird an eine ganz normale Haushaltssteckdose (220–240 V / 50 Hz, Schuko-Stecker) angeschlossen. Ein Starkstromanschluss oder eine spezielle Absicherung ist nicht erforderlich. Wir empfehlen allerdings, das Gerät nicht über ein Verlängerungskabel oder eine Mehrfachsteckdose zu betreiben, sondern direkt an der Wandsteckdose anzuschließen.",
      },
      {
        question: "Muss ich das Gerät regelmäßig warten?",
        answer:
          "Der Wartungsaufwand ist minimal. Wir empfehlen, den herausnehmbaren Luftfilter der Inneneinheit alle zwei bis vier Wochen unter fließendem Wasser zu reinigen und vollständig trocknen zu lassen. Vor der ersten Inbetriebnahme im Sommer sollten Sie prüfen, ob die Verbindungsschläuche dicht sitzen und die Außeneinheit frei von Verschmutzungen ist. Ein professionelles Service ist bei normaler Nutzung im Privathaushalt nicht erforderlich.",
      },
      {
        question: "Was tun, wenn das Gerät defekt ist?",
        answer:
          "Sollten Sie Probleme mit Ihrer Midea Portasplit haben, melden Sie sich direkt bei uns — wir helfen Ihnen schnell und unkompliziert weiter:\n\nE-Mail: sommerfrische@wienenergie.at\n\nTelefon: +43 1 4004 81880\n\nErste Schritte zur Selbsthilfe (Stromversorgung prüfen, Reset, Filter reinigen) finden Sie in der Bedienungsanleitung unter „Technische Details“.",
      },
      {
        question: "Kann ich das Gerät über eine App steuern?",
        answer:
          "Ja, die Midea Portasplit lässt sich über die Midea Air App (verfügbar für iOS und Android) per WLAN steuern. So können Sie das Gerät bequem von unterwegs einschalten, die Temperatur anpassen oder einen Timer setzen – zum Beispiel, damit die Wohnung bereits angenehm kühl ist, wenn Sie nach Hause kommen.",
      },
      {
        question: "Wie entsorge ich das Gerät nachhaltig?",
        answer:
          "Ihre Midea Portasplit darf am Ende ihrer Lebensdauer nicht im Hausmüll entsorgt werden — sie enthält elektronische Komponenten, die fachgerecht recycelt werden müssen.\n\nSo entsorgen Sie das Gerät korrekt:\n\nGeben Sie es bei einer offiziellen Sammelstelle für Elektro-Altgeräte ab. In Wien sind das die Mistplätze der MA 48. Alternativ können Sie sich bei Ihrer zuständigen Stadt- oder Gemeindeverwaltung nach weiteren Sammelstellen erkundigen.\n\nDas Gerät entspricht der EU-WEEE-Richtlinie (2012/19/EU). Ausführliche Hinweise zur sicheren Nutzung und Entsorgung finden Sie in der Bedienungsanleitung unter „Technische Details“.",
      },
    ],
  },
  {
    title: "Lieferung, Aufbau & Installation",
    items: [
      {
        question: "Was umfasst die Lieferung?",
        answer:
          "Das Sommerfrische-Paket wird direkt bequem zu Ihnen nach Hause bis zum Aufstellort von unserem Speditionspartner geliefert. Im Lieferumfang enthalten sind: die Inneneinheit, die Außeneinheit, der vormontierte Verbindungsschlauch, die Universalhalterung, eine Fernbedienung, ein Fensterabdichtungskit in Standard-Länge sowie die Bedienungsanleitung.\n\nHinweis zur Fensterabdichtung: Das mitgelieferte Kit passt für die meisten gängigen Fenster. Für Terrassentüren, Balkontüren oder besonders große Fenster benötigen Sie eine verlängerte Abdichtung. Diese ist nicht im Standardpaket enthalten und muss separat erworben werden.",
      },
      {
        question: "Wie lange dauert die Lieferung?",
        answer:
          "Nach Bestelleingang wird Ihr Sommerfrische-Paket in der Regel innerhalb von 5–8 Werktagen an Ihre angegebene Adresse geliefert. Sie erhalten eine Versandbestätigung mit Tracking-Nummer per E-Mail, sobald das Paket auf dem Weg zu Ihnen ist.",
      },
      {
        question: "Wohin wird geliefert?",
        answer:
          "Wir liefern an alle Adressen in Österreich. Eine Zustellung an Packstationen oder Postfächer ist leider nicht möglich, da es sich um eine Spedition handelt.",
      },
      {
        question: "Muss ich das Gerät von einem Fachbetrieb installieren lassen?",
        answer:
          "Nein, das ist einer der größten Vorteile der Midea Portasplit. Das Gerät ist so konzipiert, dass Sie es in unter einer Stunde selbst aufstellen und in Betrieb nehmen können. Es sind keinerlei Bohrungen, bauliche Veränderungen oder Fachkenntnisse erforderlich.",
      },
      {
        question: "Wie funktioniert der Aufbau Schritt für Schritt?",
        answer:
          "Eine detaillierte Beschreibung finden Sie in der mitgelieferten Anleitung sowie in dem untenstehenden Dokument (Anhang Anleitung).",
      },
      {
        question: "Brauche ich einen Balkon oder eine Terrasse?",
        answer:
          "Ein Balkon oder eine Terrasse ist ideal, aber nicht zwingend erforderlich. Die Außeneinheit kann über die Universalhalterung außerhalb des Fensters (auch französische Fenster) platziert werden. Wichtig ist nur, dass die Außeneinheit im Freien steht und ausreichend Luftzirkulation hat.",
      },
      {
        question: "Funktioniert das Gerät auch bei Mietwohnungen ohne bauliche Veränderungen?",
        answer:
          "Ja, genau dafür ist die Midea Portasplit konzipiert. Es sind keine Bohrungen, Wanddurchbrüche oder andere bauliche Eingriffe notwendig. Der Verbindungsschlauch wird durch ein gekipptes Fenster geführt und die Öffnung mit dem Fensterabdichtungskit verschlossen. Damit ist das Gerät die perfekte Lösung für Mieter*innen, die keine baulichen Veränderungen vornehmen möchten oder können.",
      },
      {
        question: "Brauche ich die Zustimmung meines/meiner Vermieter*in, um die Midea Portasplit zu installieren?",
        answer:
          "In der Regel benötigen Sie keine Zustimmung Ihres/Ihrer Vermieter*in, da die Midea Portasplit ohne feste bauliche Veränderungen installiert wird. Das Gerät ist mobil und kann ohne Bohren oder dauerhafte Eingriffe in die Bausubstanz betrieben werden.\n\nWichtig ist jedoch, dass bei der Nutzung keine dauerhaften Veränderungen an Fenstern, Türen oder der Fassade vorgenommen werden.\n\nIn Einzelfällen (z. B. bei besonderen Mietvertragsklauseln oder denkmalgeschützten Gebäuden) kann es sinnvoll sein, vorab Rücksprache mit dem/der Vermieter*in zu halten.\n\nBitte beachten Sie: Die Abklärung mit Ihrer Vermieterin oder Ihrem Vermieter sowie mit der Hausverwaltung liegt in Ihrer Verantwortung. Wien Energie übernimmt keine Haftung für etwaige Konflikte, Auflagen oder Folgen, die sich aus Ihrem Mietverhältnis oder der Hausordnung im Zusammenhang mit der Nutzung der Midea Portasplit ergeben.",
      },
      {
        question: "Kann ich das Gerät in verschiedenen Räumen verwenden?",
        answer:
          "Grundsätzlich ja: Das Gerät ist mobil und kann in einen anderen Raum umgestellt werden. Beachten Sie allerdings, dass Sie die Außeneinheit entsprechend umpositionieren und die Fensterdichtung neu anbringen müssen.",
      },
      {
        question: "Entsteht Kondenswasser? Muss ich das Wasser ablassen?",
        answer:
          "Beim Kühlbetrieb entsteht naturgemäß Kondenswasser. Die Midea Portasplit leitet das Kondenswasser automatisch an die Außeneinheit weiter, wo es dann kontrolliert ablaufen kann. In der Regel müssen Sie kein Wasser manuell ablassen. Nur bei extrem hoher Luftfeuchtigkeit über einen längeren Zeitraum kann es vorkommen, dass überschüssiges Kondenswasser anfällt – in diesem Fall zeigt das Gerät einen Hinweis an.",
      },
    ],
  },
  {
    title: "Der Wien Energie-Stromgutschein",
    items: [
      {
        question: "Was hat es mit dem Wien Energie-Stromgutschein auf sich?",
        answer:
          "Sommerfrische ist mehr als nur ein Klimagerät – es ist eine Kühllösung, die Gerät und Energie verbindet. Deshalb erhalten Sie bei ausgewählten Sommerfrische-Angeboten einen Gutschein im Wert von 150 Euro inklusive. Diesen können Sie für Ihre Wien Energie-Rechnung einlösen oder auch an Familie oder Freunde verschenken. Ein Klimagerät verbraucht im Betrieb naturgemäß zusätzlichen Strom – der Gutschein hilft Ihnen, die Stromkosten der ersten Saison abzufedern. Bitte beachten Sie, dass es sich um eine einmalige Zugabe zum Gerätekauf handelt; der laufende Stromverbrauch in den Folgejahren wird wie gewohnt über Ihre Stromrechnung abgerechnet.",
      },
      {
        question: "Wie erhalte ich den Gutschein?",
        answer:
          "Nach Abschluss Ihrer Bestellung und Eingang der Zahlung erhalten Sie den Gutschein automatisch per E-Mail an die bei der Bestellung angegebene E-Mail-Adresse. Bitte prüfen Sie auch Ihren Spam-Ordner. Der Versand erfolgt in der Regel 14 Tage nach Zahlungseingang.",
      },
      {
        question: "Ist der Gutschein personalisiert? Kann ich ihn weitergeben?",
        answer:
          "Der Wien Energie-Stromgutschein ist nicht personalisiert und kann grundsätzlich auch von einer anderen Person eingelöst werden – er eignet sich also auch als Geschenk.",
      },
      {
        question: "Wie lange ist der Gutschein gültig?",
        answer:
          "Der Wien Energie-Stromgutschein ist unbefristet gültig.",
      },
      {
        question: "Wie hoch ist der Stromverbrauch des Geräts und wie weit reicht der 150 Euro Gutschein?",
        answer:
          "Transparenz ist uns wichtig: Der tatsächliche Stromverbrauch hängt stark vom gewählten Betriebsmodus (Kühlen, Heizen, Entfeuchten, Ventilieren) sowie von Zieltemperatur, Raumgröße und Dämmung ab. Im typischen Sommereinsatz liegt die Leistungsaufnahme erfahrungsgemäß bei ca. 400–450 W (im Schnitt rund 434 W) und kann in Leistungsspitzen auf bis zu ca. 600 W ansteigen.\n\nWas heißt das in Euro? Bei einem Haushaltsstrompreis von rund 0,25 Euro/kWh entstehen im Kühl-Modus rechnerisch ca. 10–11 Cent pro Betriebsstunde im typischen Bereich und bis zu ca. 15 Cent pro Betriebsstunde in Leistungsspitzen. Bei einer typischen Nutzung von 4 Stunden pro Tag sind das rund 1,7 kWh/Tag bzw. ca. 42 Cent pro Tag.\n\nWie weit reicht der 150 Euro Gutschein? Bei diesem Preisniveau deckt der Gutschein ca. 600 kWh ab – das entspricht deutlich mehr als einer kompletten Sommersaison Kühlbetrieb. Den darüberhinausgehenden sowie den laufenden Stromverbrauch in den Folgejahren rechnen wir wie gewohnt transparent über Ihre Stromrechnung ab.",
      },
      {
        question: "Wie löse ich den Wien Energie-Stromgutschein ein?",
        answer:
          "Die Einlösung Ihres Wien Energie-Stromgutscheins dauert nur wenige Minuten. So gehen Sie vor:\n\nSchritt 1 – Gutschein-E-Mail öffnen: Sie erhalten den Gutschein-Code ca. 14 Tage nach Zahlungseingang per E-Mail (bitte ggf. auch Spam-Ordner prüfen).\n\nSchritt 2 – Einlöseseite aufrufen: Öffnen Sie https://meine.wienenergie.at/privat/energiegutschein-einloesen/gutschein-eingeben.\n\nSchritt 3 – Code eingeben: Tragen Sie den Gutschein-Code aus der E-Mail in das dafür vorgesehene Feld ein und bestätigen Sie die Eingabe.\n\nSchritt 4 – Automatische Verrechnung: Der Betrag von 150 Euro wird anschließend mit Ihrer nächsten offenen Stromrechnung bei Wien Energie verrechnet. Eine zusätzliche detaillierte Anleitung ist Ihrer Gutschein-E-Mail beigefügt.",
      },
      {
        question: "Muss ich Wien Energie-Kund*innen sein, um den Wien Energie-Stromgutschein zu nutzen?",
        answer:
          "Ja, für die Einlösung des Wien Energie-Stromgutscheins benötigen Sie einen aufrechten Stromvertrag bei Wien Energie. Wenn Sie (noch) kein*e Wien Energie-Kund*innen sind, können Sie alternativ den Gutschein weiterverschenken – oder natürlich zu Wien Energie wechseln und dann den Wien Energie-Stromgutschein einlösen.",
      },
    ],
  },
  {
    title: "Kühlung im Vergleich: Welche Lösung passt zu mir?",
    items: [
      {
        question: "Welche Kühlungsoptionen bietet Wien Energie an?",
        answer:
          "Wien Energie setzt bei Kühlung auf verschiedene Lösungen: Die strategische Priorität liegt auf Fernkälte, einer klimaschonenden, zentralen Kühlung für ganze Gebäude und Stadtteile, ähnlich wie Fernwärme. Für Einfamilienhäuser und Eigentumswohnungen können fest installierte Split-Klimaanlagen eine gute Lösung sein. Und für alle, bei denen weder Fernkälte noch eine Festinstallation möglich oder sinnvoll ist, ist die beste Lösung Sommerfrische, die mobile, flexible Kühllösung.",
      },
      {
        question: "Was ist Fernkälte und warum setzt Wien Energie darauf?",
        answer:
          "Fernkälte funktioniert ähnlich wie Fernwärme: Kaltes Wasser wird in einer zentralen Anlage erzeugt und über ein Leitungsnetz an angeschlossene Gebäude verteilt. Das ist hocheffizient, weil die Kühlung zentral und im großen Maßstab erfolgt – mit deutlich weniger Energieverbrauch als tausende Einzelgeräte. Allerdings ist Fernkälte aktuell nur in vereinzelten größeren Wohn- und Bürogebäuden verfügbar.",
      },
      {
        question: "Für wen ist Sommerfrische mit der Midea Portasplit die optimale Lösung?",
        answer:
          "Sommerfrische ist die richtige Wahl, wenn an Ihrem Standort keine Fernkälte verfügbar ist und eine Festinstallation nicht möglich oder nicht gewünscht ist. Besonders geeignet ist sie für Mieter*innen, die keine baulichen Veränderungen vornehmen dürfen, sowie für alle, die eine flexible, saisonale Lösung suchen, die sich bei einem Umzug einfach mitnehmen lässt – und effizient kühlen wollen, ohne Installationsaufwand und hohe Vorabkosten.",
      },
      {
        question: "Ich wohne in einem Einfamilienhaus – ist Sommerfrische trotzdem das Richtige?",
        answer:
          "Im Einfamilienhaus haben Sie als Eigentümer*in in der Regel die Freiheit, bauliche Veränderungen vorzunehmen. Wenn Sie langfristig mehrere Räume kühlen möchten, ist eine fest installierte Multi-Split-Anlage oder eine Wärmepumpe mit Kühlfunktion meist die wirtschaftlichere Lösung. Sommerfrische kann im Einfamilienhaus aber dennoch sinnvoll sein, zum Beispiel als schnelle Lösung für einen einzelnen Raum (Schlafzimmer, Home-Office), als Überbrückung bis zur Installation einer Festanlage oder wenn Sie die Investition in eine Festinstallation aktuell nicht tätigen möchten.",
      },
    ],
  },
  {
    title: "Zahlung",
    items: [
      {
        question: "Welche Zahlungsmethoden stehen zur Verfügung?",
        answer:
          "Sie bezahlen per Einmalzahlung über unseren Zahlungsdienstleister TeleCash. Folgende Zahlungsarten stehen Ihnen zur Verfügung: Kreditkarte oder Debitkarte.",
      },
      {
        question: "Gibt es versteckte Kosten?",
        answer:
          "Nein. Der angezeigte Preis ist der Endpreis inklusive Lieferung und Umsatzsteuer.",
      },
    ],
  },
  {
    title: "Technische Details",
    items: [
      {
        question: "Welche technischen Daten hat die Midea Portasplit?",
        table: {
          headers: ["Eigenschaft", "Wert"],
          rows: [
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
            ["Durchmesser Schlauch", "ca. 6 cm - passt durch ein gekipptes Fenster"],
            ["Länge Verbindungsschlauch", "200 cm"],
            ["Gewicht Inneneinheit", "32,5 kg"],
            ["Gewicht Außeneinheit", "9,9 kg"],
            ["Abmessungen Inneneinheit", "518 × 340 × 646 mm (B × T × H)"],
            ["Abmessungen Außeneinheit", "500 × 260 × 438 mm (B × T × H)"],
            ["Betriebsmodi", "Kühlen, Heizen, Entfeuchten, Ventilieren"],
            ["Steuerung", "Fernbedienung oder per App"],
            ["Timer-Funktion", "Ja"],
            ["Luftfilter", "Herausnehmbarer & waschbarer Filter"],
            ["Stromversorgung", "220-240 V / 50 Hz, Standard-Haushaltssteckdose"],
            ["Leistungsaufnahme / Durchschnittsverbrauch", "Abhängig von Betriebsmodus und Last; im Kühlmodus typischerweise ca. 400-450 W (0,4-0,45 kWh/h)"],
            ["Außenumgebungstemperatur (Kühlen / Heizen)", "0-45 °C / -10-24 °C"],
          ],
        },
      },
      {
        question: "Wo finde ich Datenblatt, Bedienungsanleitung und Kurzanleitung?",
        resources: [
          { label: "Datenblatt Midea Portasplit 3,5 kW", href: "/docs/Datenblatt-Midea-Portasplit-3-5-kW.pdf" },
          { label: "Bedienungsanleitung", href: "/docs/Bedienungsanleitung.pdf" },
          { label: "Kurzanleitung", href: "/docs/Kurzanleitung.pdf" },
        ],
      },
    ],
  },
];

export const offers = [
  {
    key: "stromvorteil",
    title: "Midea Portasplit 3,5 kW + Strom-Vorteil",
    price: 949,
    badge: "LAUNCH-ANGEBOT",
    includedText: "150 Euro Wien Energie-Stromgutschein inklusive",
    hint: "Gutschein nur für Wien Energie-Stromkund*innen einlösbar. Auf andere Personen übertragbar und unbefristet gültig."
  },
  {
    key: "solo",
    title: "Midea Portasplit 3,5 kW ohne Strom-Vorteil",
    price: 849,
    badge: "",
    includedText: "",
    hint: ""
  }
];
