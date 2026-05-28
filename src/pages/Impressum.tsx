
import { LegalLayout, LegalSection } from "./LegalCommon";

export default function ImpressumPage() {
  return (
    <LegalLayout
      title="Impressum"
      subtitle="Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz (MedienG)"
    >
      <LegalSection title="Betreiberin und Medieninhaberin">
        <p>Wien Energie GmbH</p>
        <p>Thomas-Klestil-Platz 14</p>
        <p>1030 Wien, Österreich</p>
        <p>Telefon: +43 (0)1 4004-0</p>
        <p>E-Mail: sommerfrische@wienenergie.at</p>
        <p>Website: www.sommerfrische.wienenergie.at</p>
      </LegalSection>

      <LegalSection title="Unternehmensgegenstand">
        <p>Energiewirtschaft</p>
        <p>FN 215854h</p>
        <p>Registriert beim Handelsgericht Wien</p>
      </LegalSection>

      <LegalSection title="UID-Nummer">
        <p>ATU55685501</p>
      </LegalSection>

      <LegalSection title="Aufsichtsbehörde">
        <p>Energie-Control Austria; Österreich</p>
      </LegalSection>

      <LegalSection title="Geschäftsführung">
        <p>Geschäftsführerin: Mag. Alma Kahler</p>
        <p>Geschäftsführer: Dipl.-Ing. Sascha Zabransky</p>
        <p>Geschäftsführer: Dipl.-Ing. Karl Gruber, MBA</p>
      </LegalSection>

      <p style={{ color: "#7a7a7a", fontSize: 14, marginTop: 44 }}>Stand: April 2026</p>
    </LegalLayout>
  );
}
