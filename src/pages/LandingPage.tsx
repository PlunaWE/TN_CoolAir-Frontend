import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

import { usePageTitle } from "@/hooks/usePageTitle";
import {
  Wrench,
  Zap,
  
  
  Snowflake,
  ThermometerSun,
  Volume2,
  Leaf,
  Gift,
  X,
  Clock,
  Truck,
} from "lucide-react";
import ProductSection from "@/components/ProductSection";
import GlobalCheckoutBar from "@/components/GlobalCheckoutBar";
import { Container } from "@/components/Container";
import { CheckBadge } from "@/components/ui/CheckBadge";


const benefits = [
  {
    icon: Gift,
    title: "150 Euro Wien Energie-Stromgutschein",
    desc: "Optional und direkt einlösbar auf Ihre Stromrechnung bei Wien Energie.",
    highlight: true,
  },
  {
    icon: Truck,
    title: "Lieferung bis in Ihre Wohnung",
    desc: "Bequem zum Aufstellort bis ins Dachgeschoss.",
    highlight: true,
    badge: "Sommerfrische Spezial",
  },
  {
    icon: Wrench,
    title: "Installationsfrei",
    desc: "Kein Bohren, kein*e Handwerker*in. In unter einer Stunde aufgestellt.",
  },
  {
    icon: Zap,
    title: "Echte Split-Kühlung",
    desc: "4× stärker als herkömmliche Mobilgeräte. Leise mit nur 39 dB.",
  },
];

const steps = [
  { num: "01", title: "Bestellen", desc: "Online im Webshop Ihr Sommerfrische-Paket auswählen und bestellen." },
  { num: "02", title: "Liefern lassen", desc: "Lieferung bis zum Aufstellort – bequem zu Ihnen nach Hause." },
  { num: "03", title: "Loskühlen", desc: "Anschließen, einschalten, fertig. Kein*e Techniker*in nötig." },
];

const productSpecs = [
  { icon: Snowflake, title: "Kühlen", text: "3,5 kW · A++ · bis 42 m²" },
  { icon: ThermometerSun, title: "Heizen", text: "3,5 kW · A+ · vollwertige Wärmepumpe" },
  { icon: Volume2, title: "Leise", text: "39 dB(A) – flüsterleise" },
  { icon: Leaf, title: "Effizient", text: "~160 kWh pro Saison" },
];

const LandingPage = () => {
  usePageTitle("Sommerfrische – die mobile Klimaanlage von Wien Energie");
  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-x-hidden">
      <img
        src="/orange-bubble.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-40px] right-[-80px] z-0 h-auto w-[90vw] md:w-[70vw] lg:w-[60vw] max-w-[1100px] select-none"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
      {/* 1) HERO */}
      <section className="relative">
        <Container className="relative z-10 py-we-section-lg md:py-we-section-xlg">
          <div className="grid md:grid-cols-2 gap-we-component-xlg items-center">
            <div>
              <h1 className="text-[32px] leading-[40px] md:text-[42px] md:leading-[50px] font-bold text-we-heading">
                Cooles Klima für heiße Sommer.
              </h1>
              <p className="text-we-body-lg text-we-muted mt-we-component-sm mb-we-component-lg">
                Jetzt neu: Sommerfrische von Wien Energie
              </p>
              <p className="text-we-body-lg text-we-text mb-we-component-lg max-w-2xl">
                Wenn Ventilator oder offene Fenster nicht mehr gegen die Hitze in der Wohnung helfen, braucht‘s unsere Sommerfrische. Ein effizientes Klimagerät samt optionalem 150 Euro Wien Energie-Stromgutschein.
              </p>
              <ul className="space-y-we-component-sm mb-we-component-lg">
                <li className="flex items-center gap-we-component-sm">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Midea Portasplit 3,5 kW Klimagerät</span>
                </li>
                <li className="flex items-center gap-we-component-sm">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">In wenigen Minuten einsatzbereit, ohne Fachinstallation</span>
                </li>
                <li className="flex items-center gap-we-component-sm">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Sofort lieferbar</span>
                </li>
                <li className="flex items-center gap-we-component-sm">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Lieferung bis zum Aufstellort</span>
                </li>
                <li className="flex items-center gap-we-component-sm">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*</span>
                </li>
              </ul>
              <p className="text-we-body-sm text-we-text mb-we-component-lg leading-snug">
                * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
              </p>
              <a href="#produkt">
                <Button variant="default" size="lg" className="px-8 py-6 text-we-body-lg">
                  Jetzt bestellen
                </Button>
              </a>
            </div>
            <div className="aspect-square md:aspect-[4/3] rounded-we-lg overflow-hidden shadow-we-card">
              <picture>
                <source media="(max-width: 767px)" srcSet="/hero-keyvisual-mobile.jpg" />
                <img
                  src="/hero-keyvisual-desktop.jpg"
                  alt="Paar leidet auf dem Sofa unter Sommerhitze und kühlt sich notdürftig mit einem kleinen Ventilator und einem Fächer"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>
        </Container>
      </section>

      {/* 2) PRODUKT-SHOP */}
      <ProductSection />

      {/* 3) ÜBER DAS GERÄT / TECHNISCHE DETAILS */}
      <section id="ueber-geraet" className="bg-white py-we-section-lg md:py-we-section-xlg">
        <Container>
          <div className="max-w-4xl mx-auto">
          <h2 className="text-we-h-xl font-bold text-we-heading text-center mb-we-component-md">
            Die Midea Portasplit 3,5 kW
          </h2>
          <p className="text-we-text text-center max-w-3xl mx-auto mb-we-component-xlg">
            Eine Einheit drinnen, eine draußen – verbunden durch einen schmalen Schlauch durchs gekippte Fenster.
            Das mitgelieferte Set dichtet alles sauber ab. Echte Split-Kühlung, ganz ohne Bohren.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-we-component-md mb-we-component-md">
            {productSpecs.map((s) => (
              <div key={s.title} className="bg-white rounded-we-lg shadow-we-card p-we-component-md text-center">
                <s.icon className="text-we-brand-secondary mx-auto mb-3" size={28} />
                <h3 className="text-we-h-xs font-bold text-we-heading mb-1">{s.title}</h3>
                <p className="text-we-body-sm text-we-text">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-we-body-sm text-we-muted">
            Im Vergleich zu herkömmlichen Mobilgeräten: 4× stärkere Kühlleistung, deutlich leiser, höhere Effizienz.
          </p>
          </div>
        </Container>
      </section>

      {/* 3) USP-KACHELN */}
      <section className="bg-we-surface-muted py-we-section-lg md:py-we-section-xlg">
        <Container>
          <h2 className="text-we-h-xl font-bold text-we-heading text-center mb-we-component-xlg">
            Sommerfrische Vorteile
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-we-component-lg">
            {benefits.map((b) => (
              <div
                key={b.title}
                className={`bg-white rounded-we-lg shadow-we-card p-we-component-lg ${
                  b.highlight ? "border-2 border-we-brand-secondary relative" : ""
                }`}
              >
                {b.highlight && (
                  <span className="absolute -top-3 left-4 bg-we-brand-secondary text-we-text-inverse text-we-body-xs font-bold px-2.5 py-1 rounded-we-full uppercase tracking-wider">
                    {b.badge || "Sommerfrische Spezial"}
                  </span>
                )}
                <b.icon className="text-we-brand-secondary mb-4" size={32} />
                <h3 className="text-we-body-md font-bold text-we-heading mb-2">{b.title}</h3>
                <p className="text-we-body-sm text-we-text">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-we-component-lg flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-we-body-md font-bold text-we-brand-secondary">
            <span className="inline-flex items-center gap-2">
              <CheckBadge size="md" /> Sofort lieferbar
            </span>
          </div>
        </Container>
      </section>

      {/* 4) STROMGUTSCHEIN-VERGLEICH */}
      <section className="bg-we-surface-muted py-we-section-lg md:py-we-section-xlg">
        <Container>
          <div className="max-w-5xl mx-auto">
          <div className="text-center mb-we-component-xlg">
            <h2 className="text-we-h-lg font-bold mb-we-component-md text-we-heading">
              Ein Klimagerät bekommen Sie überall.<br />
              <span className="text-we-brand-secondary">150 Euro Stromgutschein dazu nur bei uns.</span>
            </h2>
            <p className="text-we-body-md text-we-text max-w-none mx-auto">
              Unsere Sommerfrische kühlt nicht nur Ihre Wohnung. Sie senkt auch Ihre Stromrechnung bei uns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-we-component-lg">
            {/* Andere Anbieter */}
            <div className="bg-white rounded-we-lg border border-we-neutral-90 p-we-component-lg">
              <p className="text-we-body-lg font-bold text-we-muted mb-4">
                Andere Anbieter
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Mobiles Klimagerät</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Lieferung</span>
                </li>
                <li className="flex items-center gap-3">
                  <X size={18} className="text-we-neutral-60 flex-shrink-0" />
                  <span className="text-we-body-md text-we-text">150 Euro Wien Energie-Stromgutschein</span>
                </li>
              </ul>
            </div>

            {/* Sommerfrische */}
            <div className="relative bg-white rounded-we-lg border-2 border-we-brand-secondary shadow-we-card p-we-component-lg">
              <span className="absolute -top-3 left-we-component-lg bg-we-brand-secondary text-we-text-inverse text-we-body-xs font-bold uppercase tracking-wider px-we-component-md py-1 rounded-we-full">
                Ihr Vorteil
              </span>
              <p className="text-we-body-lg font-bold text-we-heading mb-4">
                Sommerfrische
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Mobiles Split-Klimagerät</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md text-we-text">Lieferung in die Wohnung</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckBadge size="md" />
                  <span className="text-we-body-md font-bold text-we-heading">Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*</span>
                </li>
              </ul>
              <p className="text-we-body-sm text-we-text mt-we-component-md leading-snug">
                * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
              </p>
            </div>
          </div>


          <div className="text-center mt-we-component-md">
            <a href="#produkt">
              <Button size="lg" variant="default" className="px-8 py-6 text-we-body-lg">
                Jetzt Wien Energie-Stromgutschein sichern
              </Button>
            </a>
          </div>
          </div>
        </Container>
      </section>

      {/* 5) SO FUNKTIONIERT SOMMERFRISCHE */}
      <section id="how" className="bg-we-surface-muted py-we-section-lg md:py-we-section-xlg">
        <Container>
          <h2 className="text-we-h-xl font-bold text-we-heading text-center mb-we-component-xlg">So funktioniert Sommerfrische</h2>
          <div className="grid md:grid-cols-3 gap-we-component-lg mb-we-component-xlg">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                <div className="w-14 h-14 rounded-we-full bg-we-brand-secondary text-we-text-inverse flex items-center justify-center text-we-h-md font-bold mx-auto mb-4">
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-we-neutral-90" />
                )}
                <h3 className="text-we-h-md font-bold text-we-heading mb-2">{s.title}</h3>
                <p className="text-we-body-sm text-we-text max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7) FAQs */}
      <FAQSection />
      </main>

      <Footer />
      <GlobalCheckoutBar />
    </div>
  );
};

export default LandingPage;
