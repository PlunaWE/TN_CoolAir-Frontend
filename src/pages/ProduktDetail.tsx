import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronLeft, ChevronRight, ChevronDown, Wrench, Snowflake, Smartphone, Leaf, Truck, Zap, Package, Clock, Gift, Info, Wind } from "lucide-react";
import Navbar from "@/components/Navbar";
import TemporaryImageBadge from "@/components/TemporaryImageBadge";
import { CheckBadge } from "@/components/ui/CheckBadge";
import Footer from "@/components/Footer";
import { Container } from "@/components/Container";
import { useOrder } from "@/context/OrderContext";
import { useToast } from "@/hooks/use-toast";
import { ProductImage, sommerfrischeImages as productImages } from "@/components/ProductImage";


const offers = [
  {
    id: "choice" as const,
    name: "Midea Portasplit 3,5 kW + Strom-Vorteil",
    price: "949 EUR",
    badge: "Empfohlen",
    features: [
      "Midea Portasplit Klimagerät",
      "2 Jahre Garantie",
      "150 Euro Wien Energie-Stromgutschein für Ihre Wien Energie-Rechnung",
    ],
  },
  {
    id: "solo" as const,
    name: "Midea Portasplit 3,5 kW ohne Strom-Vorteil",
    price: "849 EUR",
    badge: null,
    features: [
      "Midea Portasplit Klimagerät",
      "2 Jahre Garantie",
    ],
  },
];

const uspStrip = [
  { icon: Wind, text: "Starke Kühlleistung" },
  { icon: Wrench, text: "Installationsfrei" },
  { icon: Smartphone, text: "Steuerbar über die Midea App" },
  { icon: Truck, text: "Lieferung bis in die Wohnung" },
];

import { usePageTitle } from "@/hooks/usePageTitle";

const ProduktDetail = () => {
  usePageTitle("Midea Portasplit 3.5 kW – Sommerfrische");
  const navigate = useNavigate();
  const order = useOrder();
  const { toast } = useToast();

  const [imgIndex, setImgIndex] = useState(0);
  
  const [priceInfoOpen, setPriceInfoOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<"solo" | "choice" | null>(null);
  const [rentalForm, setRentalForm] = useState({ name: "", email: "" });

  const canContinue = selectedOffer !== null;

  const handleContinue = () => {
    order.setVariant(selectedOffer);
    order.setVoucher(selectedOffer === "choice" ? "strom" : null);
    order.setPaymentMethod("credit_card");
    navigate("/checkout");
  };

  const handleRentalInterest = () => {
    if (!rentalForm.name.trim() || !rentalForm.email.trim()) {
      toast({ title: "Bitte alle Felder ausfüllen", variant: "destructive" });
      return;
    }
    toast({ title: "Vielen Dank!", description: "Wir haben Ihr Interesse am Mietmodell vorgemerkt." });
    setRentalForm({ name: "", email: "" });
  };

  const prevImg = () => setImgIndex((i) => (i === 0 ? productImages.length - 1 : i - 1));
  const nextImg = () => setImgIndex((i) => (i === productImages.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-we-surface-muted py-we-section-lg focus:outline-none">
        <Container>
          <div className="grid lg:grid-cols-3 gap-we-component-xlg">
            {/* LEFT 2/3 – Product images & specs */}
            <div className="lg:col-span-2 space-y-we-component-lg">
              {/* Image Carousel */}
              <div
                className="relative"
                role="region"
                aria-label="Produktbilder Sommerfrische"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") { e.preventDefault(); prevImg(); }
                  if (e.key === "ArrowRight") { e.preventDefault(); nextImg(); }
                }}
              >
                <div className="aspect-square rounded-we-lg bg-white shadow-we-card overflow-hidden relative focus-visible:ring-2 focus-visible:ring-we-brand-primary">
                  <TemporaryImageBadge>
                    <ProductImage
                      key={imgIndex}
                      item={productImages[imgIndex]}
                      eager={imgIndex === 0}
                      sizes="(min-width: 1024px) 800px, 100vw"
                      className="w-full h-full object-cover object-center"
                    />
                  </TemporaryImageBadge>
                  {/* USP Strip overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-we-neutral-10/85 backdrop-blur-sm px-4 py-5 flex items-center justify-between gap-3">
                    {uspStrip.map((usp) => (
                      <div key={usp.text} className="flex items-center gap-2 flex-1 justify-center">
                        <usp.icon size={18} className="text-we-text-inverse flex-shrink-0" />
                        <span className="text-we-body-xs md:text-we-body-sm font-bold text-we-text-inverse leading-tight">{usp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={prevImg}
                  aria-label="Vorheriges Bild"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-we-full bg-white/80 shadow-we-card flex items-center justify-center hover:bg-white focus-visible:ring-2 focus-visible:ring-we-brand-primary transition-colors"
                >
                  <ChevronLeft size={20} className="text-we-brand-secondary" />
                </button>
                <button
                  onClick={nextImg}
                  aria-label="Nächstes Bild"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-we-full bg-white/80 shadow-we-card flex items-center justify-center hover:bg-white focus-visible:ring-2 focus-visible:ring-we-brand-primary transition-colors"
                >
                  <ChevronRight size={20} className="text-we-brand-secondary" />
                </button>
                {/* Dots */}
                <div className="flex justify-center gap-2 mt-we-component-md">
                  {productImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      aria-label={`Bild ${i + 1} von ${productImages.length} anzeigen`}
                      aria-current={i === imgIndex ? "true" : undefined}
                      className={`w-2.5 h-2.5 rounded-we-full transition-colors focus-visible:ring-2 focus-visible:ring-we-brand-primary ${
                        i === imgIndex ? "bg-we-brand-secondary" : "bg-we-neutral-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Bild ${i + 1} anzeigen: ${img.alt}`}
                    aria-current={i === imgIndex ? "true" : undefined}
                    className={`aspect-square rounded-we-md overflow-hidden bg-white transition-all focus-visible:ring-2 focus-visible:ring-we-brand-primary ${
                      i === imgIndex
                        ? "border-2 border-we-brand-primary opacity-100"
                        : "border border-we-neutral-90 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <TemporaryImageBadge>
                      <ProductImage item={img} sizes="160px" className="w-full h-full object-cover object-center" />
                    </TemporaryImageBadge>
                  </button>
                ))}
              </div>

            </div>

            {/* RIGHT 1/3 – Offer & payment selection */}
            <div className="space-y-we-component-lg">
              <div>
                <h1 className="text-we-h-md font-bold text-we-heading mb-1">Midea Portasplit 3,5kW</h1>
                <p className="text-we-body-sm text-we-text mb-2">
                  Mobiles Split-Klimagerät · Kühlen & Heizen · bis 42 m²
                </p>
                <span className="inline-flex items-center gap-1.5 bg-we-success/10 text-we-success text-we-body-xs font-bold px-3 py-1 rounded-we-full">
                  <Package size={14} />
                  Sofort lieferbar
                </span>
              </div>

              {/* Bundle message */}
              <div className="bg-we-brand-secondary/10 border border-we-brand-secondary/30 rounded-we-lg p-we-component-md flex items-start gap-3">
                <Zap size={20} className="text-we-brand-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-we-body-sm font-bold text-we-brand-secondary">Kühlung + Wien Energie-Stromgutschein — alles in einem Paket</p>
                  <p className="text-we-body-xs font-normal text-we-text mt-1">Sommerfrische ist nicht nur ein Gerät. Es ist ein Komplettpaket: Klimagerät, Lieferung, Beratung und optional ein Wien Energie-Stromgutschein.</p>
                </div>
              </div>


              {/* Offer selection */}
              <fieldset className="border-0 p-0 m-0">
                <legend className="text-we-h-xs font-bold text-we-heading mb-we-component-sm">Wählen Sie Ihr Angebot</legend>
                <div className="space-y-3">
                  {offers.map((o) => {
                    const checked = selectedOffer === o.id;
                    return (
                      <label
                        key={o.id}
                        className={`block text-left w-full p-we-component-md rounded-we-lg transition-all relative cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-we-accent-blue ${
                          checked
                            ? "border-2 border-we-brand-primary bg-we-brand-primary/5 shadow-we-card"
                            : "border border-we-neutral-90 bg-white hover:shadow-we-card"
                        }`}
                      >
                        <input
                          type="radio"
                          name="offer"
                          value={o.id}
                          checked={checked}
                          onChange={() => setSelectedOffer(o.id)}
                          className="sr-only"
                        />
                        <span className="sr-only">
                          {o.name}, {o.price}, {o.features.join(", ")}
                        </span>
                        <div aria-hidden="true">
                          {o.badge && (
                            <span className="absolute -top-2.5 left-4 bg-we-brand-primary text-we-text-inverse text-we-body-xs font-bold px-3 py-0.5 rounded-we-full">
                              {o.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 bg-we-success/10 text-we-success text-we-body-xs font-bold px-2 py-0.5 rounded-we-full mb-2">
                            <Package size={10} />
                            Sofort lieferbar
                          </span>
                          <p className="text-we-body-md font-bold text-we-brand-secondary mb-1">{o.name}</p>
                          <p className="text-we-h-sm font-bold text-we-brand-secondary mb-1">
                            {o.price}{o.id === "choice" ? "*" : ""}
                          </p>
                          {o.id === "choice" && (
                            <p className="text-we-body-sm text-we-text mb-3 leading-snug">
                              * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
                            </p>
                          )}


                          {o.id === "choice" && (
                            <div className="bg-we-brand-secondary/10 border border-we-brand-secondary/20 rounded-we-md p-3 mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Gift size={16} className="text-we-brand-secondary" />
                                <span className="text-we-body-xs font-bold text-we-brand-secondary">150 Euro Wien Energie-Stromgutschein inklusive</span>
                              </div>
                              <p className="text-we-body-xs font-normal text-we-text">
                                Für nur 100 EUR mehr bekommen Sie einen Gutschein im Wert von 150 Euro für Ihre Wien Energie-Stromrechnung.
                              </p>
                              <span className="inline-flex items-center gap-1 mt-1.5 bg-we-success/10 text-we-success text-we-body-xs font-bold px-2 py-0.5 rounded-we-full">
                                <Check size={10} />
                                50 EUR Netto-Vorteil
                              </span>
                              <p className="text-we-body-xs font-normal text-we-text mt-1">
                                Für alle verfügbar – auch wenn Sie noch kein*e Wien Energie-Kund*in sind.
                              </p>
                            </div>
                          )}

                          <ul className="space-y-1.5">
                            {o.features.map((f) => (
                              <li key={f} className="flex gap-2 text-we-body-xs text-we-heading">
                                <CheckBadge size="sm" className="mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </label>
                    );
                  })}

                  {/* Rental teaser card */}
                  <Link to="/coming-soon" className="block relative border-2 border-dashed border-we-neutral-90 rounded-we-lg p-we-component-md bg-white/50 opacity-90 hover:opacity-100 hover:border-we-brand-secondary/40 transition-all cursor-pointer">
                    <span className="absolute -top-2.5 left-4 bg-we-text text-we-text-inverse text-we-body-xs font-bold px-3 py-0.5 rounded-we-full flex items-center gap-1.5">
                      <Clock size={12} />
                      Bald verfügbar
                    </span>
                    <p className="text-we-body-md font-bold text-we-brand-secondary mb-1 mt-2">Sommerfrische Mieten</p>
                    <p className="text-we-body-sm font-normal text-we-text mb-4">
                      Mieten Sie das Gerät nur für den Sommer — inklusive Lagerung im Winter.
                    </p>
                    <Button variant="outline" className="w-full pointer-events-none">
                      Mehr erfahren
                    </Button>
                  </Link>
                </div>
              </fieldset>

              {/* Price justification */}
              <div className="rounded-we-lg overflow-hidden shadow-we-card bg-white">
                <button
                  onClick={() => setPriceInfoOpen(!priceInfoOpen)}
                  className="w-full flex items-center justify-between p-we-component-md hover:bg-we-surface-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Info size={18} className="text-we-brand-secondary flex-shrink-0" />
                    <span className="text-we-body-sm font-bold text-we-heading">Wie setzt sich der Preis zusammen?</span>
                  </div>
                  <ChevronDown size={18} className={`text-we-brand-secondary transition-transform flex-shrink-0 ${priceInfoOpen ? "rotate-180" : ""}`} />
                </button>
                {priceInfoOpen && (
                  <div className="px-we-component-md pb-we-component-md text-we-body-sm font-normal text-we-text leading-relaxed">
                    Bei Sommerfrische bekommen Sie nicht nur das Gerät, sondern ein Komplettpaket: Lieferung direkt in Ihre Wohnung (nicht nur bis zur Haustür), ein Wien Energie-Stromgutschein und persönliche Beratung. Bei anderen Anbietern zahlen Sie möglicherweise weniger für das Gerät; aber Speditionslieferung, Strom und Beratung müssen Sie selbst organisieren.
                  </div>
                )}
              </div>


              {canContinue && (
                <Button onClick={handleContinue} className="w-full py-6 text-we-body-md">
                  Weiter zur Kasse
                </Button>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ProduktDetail;