import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown, Snowflake, Leaf, Zap, Clock, Gift, Info } from "lucide-react";

import { CheckBadge } from "@/components/ui/CheckBadge";
import { useOrder } from "@/context/OrderContext";
import { useToast } from "@/hooks/use-toast";
import { Container } from "@/components/Container";
import { ProductImage, sommerfrischeImages as productImages } from "@/components/ProductImage";


const offers = [
  {
    id: "choice" as const,
    name: "Midea Portasplit 3,5 kW + Strom-Vorteil",
    price: "949 Euro",
    badge: "Launch-Angebot",
    features: [
      "2 Jahre Garantie",
    ],
  },
  {
    id: "solo" as const,
    name: "Midea Portasplit 3,5 kW ohne Strom-Vorteil",
    price: "849 Euro",
    badge: null,
    features: [
      "2 Jahre Garantie",
    ],
  },
];


const ProductSection = () => {
  const navigate = useNavigate();
  const order = useOrder();
  const { toast } = useToast();

  const [imgIndex, setImgIndex] = useState(0);

  const [priceInfoOpen, setPriceInfoOpen] = useState(false);
  const [landlordInfoOpen, setLandlordInfoOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<"solo" | "choice" | null>(null);

  const [showError, setShowError] = useState(false);
  const offerBlockRef = useRef<HTMLDivElement>(null);

  // Sync local selection into global OrderContext so the global Sticky-Bar can react
  useEffect(() => {
    order.setVariant(selectedOffer);
    order.setVoucher(selectedOffer === "choice" ? "strom" : null);
    order.setPaymentMethod(selectedOffer ? "credit_card" : null);
  }, [selectedOffer]);

  const canContinue = selectedOffer !== null;

  const handleContinue = () => {
    if (!canContinue) {
      setShowError(true);
      offerBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    navigate("/checkout");
  };

  const prevImg = () => setImgIndex((i) => (i === 0 ? productImages.length - 1 : i - 1));
  const nextImg = () => setImgIndex((i) => (i === productImages.length - 1 ? 0 : i + 1));

  return (
    <section id="produkt" className="bg-we-surface-muted py-16 font-sans">
      <Container>
        <h2 className="text-we-h-xl font-bold text-we-heading text-left mb-we-component-md">Jetzt Sommerfrische bestellen</h2>
        <div className="grid lg:grid-cols-2 gap-we-component-lg lg:gap-12 max-w-7xl mx-auto">
          {/* LEFT – Product images & specs (50%) */}
          <div className="space-y-we-component-lg max-w-[620px] mr-auto w-full">
            <div className="flex items-start gap-we-component-sm">
              <Zap size={20} className="text-we-brand-secondary flex-shrink-0 mt-1" />
              <div>
                <p className="text-we-body-md font-bold text-we-brand-secondary">Kühlung + Wien Energie-Stromgutschein — alles in einem Paket</p>
                <p className="text-we-body-sm text-we-muted mt-1">Sommerfrische ist Ihr Komplettpaket gegen die Hitze daheim. Das mobile Split-Klimagerät Midea Portasplit 3,5 kW gibt's inklusive oder exklusive Wien Energie-Stromgutschein zum Top-Preis!</p>
              </div>
            </div>
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
                <ProductImage
                  key={imgIndex}
                  item={productImages[imgIndex]}
                  eager={imgIndex === 0}
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <button onClick={prevImg} aria-label="Vorheriges Bild" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-we-full bg-white/80 shadow-we-card flex items-center justify-center hover:bg-white focus-visible:ring-2 focus-visible:ring-we-brand-primary transition-colors">
                <ChevronLeft size={20} className="text-we-brand-secondary" />
              </button>
              <button onClick={nextImg} aria-label="Nächstes Bild" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-we-full bg-white/80 shadow-we-card flex items-center justify-center hover:bg-white focus-visible:ring-2 focus-visible:ring-we-brand-primary transition-colors">
                <ChevronRight size={20} className="text-we-brand-secondary" />
              </button>
              <div className="flex justify-center gap-2 mt-4">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Bild ${i + 1} von ${productImages.length} anzeigen`}
                    aria-current={i === imgIndex ? "true" : undefined}
                    className={`w-2.5 h-2.5 rounded-we-full transition-colors focus-visible:ring-2 focus-visible:ring-we-brand-primary ${i === imgIndex ? "bg-we-brand-secondary" : "bg-we-neutral-50"}`}
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
                  className={`aspect-square rounded-we-md overflow-hidden bg-white transition-all focus-visible:ring-2 focus-visible:ring-we-brand-primary ${i === imgIndex
                      ? "border-2 border-we-brand-primary opacity-100"
                      : "border border-we-neutral-90 opacity-70 hover:opacity-100"
                    }`}
                >
                  <ProductImage item={img} sizes="160px" className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT – Offer & payment (50%) */}
          <div className="space-y-we-component-lg max-w-[560px] ml-auto w-full lg:sticky lg:top-24 lg:self-start">

            <div>
              <h3 className="text-we-h-md font-bold text-we-heading mb-3">Wählen Sie Ihr Angebot</h3>

              <fieldset className="border-0 p-0 m-0">
                <legend className="sr-only">Variante wählen</legend>
                <div ref={offerBlockRef} className="space-y-3">
                  {offers
                    .map((o) => {
                      const checked = selectedOffer === o.id;
                      const priceText = `${o.price} einmalig`;
                      return (
                        <label
                          key={o.id}
                          className={`block text-left w-full rounded-we-lg transition-all relative cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-we-accent-blue ${o.id === "choice" ? "p-we-component-lg" : "p-we-component-md"
                            } ${checked
                              ? "border-2 border-we-brand-secondary bg-we-brand-secondary/5 shadow-we-card"
                              : showError
                                ? "border-2 border-we-danger bg-white"
                                : o.id === "choice"
                                  ? "border-2 border-we-brand-secondary/60 bg-white shadow-we-card hover:shadow-we-card"
                                  : "border border-we-neutral-90 bg-we-surface-muted hover:bg-white hover:shadow-we-card"
                            }`}
                        >
                          <input
                            type="radio"
                            name="offer"
                            value={o.id}
                            checked={checked}
                            onChange={() => {
                              setSelectedOffer(o.id);
                              setShowError(false);
                            }}
                            className="sr-only"
                          />
                          <span className="sr-only">
                            {o.name}, {priceText}, {o.features.join(", ")}
                          </span>
                          <div aria-hidden="true">
                            {o.badge && (
                              <span className="absolute -top-3 left-4 bg-we-brand-secondary text-we-text-inverse text-we-body-xs font-bold px-we-component-md py-1 rounded-we-full uppercase tracking-wider shadow-we-card">{o.badge}</span>
                            )}
                            <p className={`font-bold text-we-heading mb-1 ${o.id === "choice" ? "text-we-h-md" : "text-we-body-sm"}`}>{o.name}</p>
                            <p className={`font-bold text-we-brand-secondary ${o.id === "choice" ? "text-we-h-lg" : "text-we-h-md"}`}>
                              {o.price}
                            </p>
                            <p className="text-we-body-xs text-we-muted mb-2">einmalig</p>


                            {o.id === "choice" && (
                              <div className="bg-we-brand-secondary/10 border border-we-brand-secondary/20 rounded-we-md p-3 mb-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <Gift size={16} className="text-we-brand-secondary" />
                                  <span className="text-we-body-xs font-bold text-we-brand-secondary">150 Euro Wien Energie-Stromgutschein inklusive</span>
                                </div>
                                <p className="text-we-body-xs text-we-muted mt-1">Effektiver Zusatzvorteil: 50 Euro gegenüber dem Angebot ohne Strom-Vorteil. Gutschein nur für Wien Energie-Stromkund*innen einlösbar. Auf andere Personen übertragbar und unbefristet gültig.</p>
                              </div>
                            )}

                            <ul className="space-y-1.5">
                              {o.features.map((f) => (
                                <li key={f} className="flex gap-2 text-we-body-xs text-we-text">
                                  <CheckBadge size="sm" className="mt-0.5" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-we-body-xs text-we-muted">
                              <Clock size={12} className="text-we-brand-secondary" />
                              Gültig bis 31.07.2026, nur solange der Vorrat reicht.
                            </p>
                          </div>
                        </label>
                      );
                    })}
                </div>
              </fieldset>
            </div>

            {/* Landlord notice */}
            <div className="rounded-we-lg overflow-hidden shadow-we-card bg-white">
              <button onClick={() => setLandlordInfoOpen(!landlordInfoOpen)} className="w-full flex items-center justify-between p-we-component-md hover:bg-we-surface-muted transition-colors text-left">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-we-brand-secondary flex-shrink-0" />
                  <span className="text-we-body-sm font-bold text-we-heading">Tipp</span>
                </div>
                <ChevronDown size={18} className={`text-we-brand-secondary transition-transform flex-shrink-0 ${landlordInfoOpen ? "rotate-180" : ""}`} />
              </button>
              {landlordInfoOpen && (
                <div className="px-we-component-md pb-we-component-md text-we-body-sm text-we-muted leading-relaxed">
                  Eine fixe Installation ist für Sommerfrische nicht nötig. In einzelnen Fällen kann es sinnvoll sein, vorab kurz auf eigene Verantwortung mit der Hausverwaltung oder Vermietung zu sprechen, ob es besondere Vorgaben in Ihrem Wohnhaus gibt.
                </div>
              )}
            </div>

            <div>
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full mt-we-component-lg py-we-component-md text-we-body-lg"
              >
                Weiter zur Kasse
              </Button>
              {showError && !canContinue && (
                <p className="mt-2 text-we-body-xs text-we-danger text-center">
                  Bitte wählen Sie ein Angebot
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductSection;
