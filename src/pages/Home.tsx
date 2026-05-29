
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { FaqAccordion } from "../components/FaqAccordion";
import { Footer } from "../components/Footer";
import { trackEvent } from "../lib/piwik";
import { offers, faqItems } from "../lib/content";
import { cartService } from "../services/cartService";

const pageWidth: CSSProperties = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 28px",
};

function CheckIcon() {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#0b7f61",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      ✓
    </span>
  );
}

function InfoIcon() {
  return (
    <span
      style={{
        width: 17,
        height: 17,
        borderRadius: "50%",
        border: "1.5px solid #090a72",
        color: "#090a72",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      i
    </span>
  );
}

function SpecialBadge({ label = "SOMMERFRISCHE SPEZIAL" }: { label?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#07086d",
        color: "#fff",
        borderRadius: 999,
        padding: "6px 14px",
        fontSize: 11,
        lineHeight: 1,
        fontWeight: 800,
        letterSpacing: 0.15,
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

function LogoImage({ src, alt, width, href }: { src: string; alt: string; width: number; href?: string }) {
  const image = (
    <img
      src={src}
      alt={alt}
      style={{ width, height: "auto", display: "block", objectFit: "contain" }}
      onError={(e) => {
        const img = e.currentTarget;
        img.style.display = "none";
        const parent = img.parentElement;
        if (parent) {
          parent.textContent = alt;
          parent.setAttribute("style", (parent.getAttribute("style") || "") + ";display:flex;align-items:center;justify-content:center;color:#666;font-weight:800;");
        }
      }}
    />
  );

  const boxStyle: CSSProperties = { minWidth: width, minHeight: 44 };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", ...boxStyle }}>
        {image}
      </a>
    );
  }

  return <div style={boxStyle}>{image}</div>;
}

function ImageOrPlaceholder({
  src,
  alt,
  fallback,
  style,
}: {
  src: string;
  alt: string;
  fallback: string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#efefef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7a7a7a",
          fontWeight: 700,
          ...style,
        }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      onError={() => setFailed(true)}
    />
  );
}

function BenefitCard({
  icon,
  title,
  text,
  special = false,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  special?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "18px 18px 20px",
        minHeight: 150,
        border: special ? "1.5px solid #0a0a7a" : "1px solid #ececf2",
        boxShadow: "0 10px 22px rgba(0,0,0,0.03)",
      }}
    >
      {special ? <div style={{ marginBottom: 14 }}><SpecialBadge /></div> : <div style={{ height: 27, marginBottom: 14 }} />}
      <div style={{ color: "#0a0a7a", fontSize: 24, lineHeight: 1 }}>{icon}</div>
      <div style={{ marginTop: 14, color: "#0a0a7a", fontWeight: 800, fontSize: 16, lineHeight: 1.35 }}>{title}</div>
      <div style={{ marginTop: 10, color: "#666d7a", lineHeight: 1.6, fontSize: 14 }}>{text}</div>
    </div>
  );
}

const galleryImages = [
  "/placeholders/gallery-1.webp",
  "/placeholders/gallery-2.webp",
  "/placeholders/gallery-3.webp",
  "/placeholders/gallery-4.webp",
  "/placeholders/gallery-5.webp",
];

const heroBullets = [
  "Midea Portasplit 3,5 kW Klimagerät",
  "In wenigen Minuten einsatzbereit, ohne Fachinstallation",
  "Sofort lieferbar",
  "Lieferung bis zum Aufstellort",
  "Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*",
];

export default function HomePage() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [tipOpen, setTipOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ctaError, setCtaError] = useState("");
  const [activeImage, setActiveImage] = useState(1);
  const navigate = useNavigate();

  const selected = useMemo(() => offers.find((offer) => offer.key === selectedOffer) || null, [selectedOffer]);

  async function handleContinueToCheckout() {
    if (busy) return;
    if (!selected) {
      trackEvent("checkout", "blocked_without_offer", "Weiter zur Kasse");
      setCtaError("Bitte wählen Sie zuerst ein Angebot.");
      document.getElementById("angebote")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setBusy(true);
    setCtaError("");

    try {
      trackEvent("checkout", "start_from_landing", selected.title, selected.price, { offer_key: selected.key });

      try {
        await cartService.clearCart();
      } catch {}

      await cartService.addItem({
        product_slug: "midea-portasplit-3-5kw",
        offer_key: selected.key,
        quantity: 1,
      });

      trackEvent("cart", "add_item_success", selected.title, 1, {
        offer_key: selected.key,
        location: "landing_page",
      });

      navigate("/checkout");
    } catch (error) {
      trackEvent("cart", "add_item_failure", selected.title, undefined, {
        offer_key: selected.key,
        message: (error as Error).message || "unknown_error",
      });
      setCtaError((error as Error).message || "Weiter zur Kasse ist fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  function prevImage() {
    setActiveImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }

  function nextImage() {
    setActiveImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }

  return (
    <BrandShell>
      <div style={{ position: "relative", overflow: "hidden", background: "#efefef", minHeight: "100vh" }}>
        <div
          style={{
            position: "absolute",
            top: -92,
            right: -10,
            width: 720,
            height: 238,
            background: "linear-gradient(135deg, #efc563 0%, #ee7c2b 32%, #e46014 100%)",
            borderBottomLeftRadius: 280,
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <section style={{ ...pageWidth, paddingTop: 14 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "18px 34px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
              }}
            >
              <LogoImage
                src="/placeholders/logo-wienenergie.svg"
                alt="Wien Energie"
                width={178}
                href="https://www.wienenergie.at/"
              />
              <Link to="/" style={{ textDecoration: "none" }}>
                <LogoImage src="/placeholders/logo-sommerfrische.png" alt="Sommerfrische" width={256} />
              </Link>
            </div>
          </section>

          <section style={{ ...pageWidth, paddingTop: 70, paddingBottom: 88 }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 54, alignItems: "center" }}>
              <div>
                <h1 style={{ color: "#05057a", fontSize: 52, lineHeight: 1.06, margin: 0, fontWeight: 800, maxWidth: 560 }}>
                  Cooles Klima für heiße Sommer.
                </h1>
                <div style={{ marginTop: 12, color: "#767a84", fontSize: 18, lineHeight: 1.4 }}>Jetzt neu: Sommerfrische von Wien Energie</div>
                <p style={{ marginTop: 30, color: "#606672", fontSize: 17, lineHeight: 1.58, maxWidth: 560 }}>
                  Wenn Ventilator oder offene Fenster nicht mehr gegen die Hitze in der Wohnung helfen, braucht&apos;s unsere Sommerfrische. Ein effizientes Klimagerät samt optionalem 150 Euro Wien Energie-Stromgutschein.
                </p>
                <div style={{ display: "grid", gap: 11, marginTop: 28, maxWidth: 560 }}>
                  {heroBullets.map((bullet) => (
                    <div key={bullet} style={{ display: "flex", alignItems: "center", gap: 12, color: "#5f6673", fontSize: 15.5 }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#0b7f61", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>✓</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, color: "#7a7a82", fontSize: 13 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("landing_page", "hero_cta_click", "Jetzt bestellen");
                    document.getElementById("angebote")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    marginTop: 28,
                    background: "#05057a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "16px 30px",
                    fontWeight: 900,
                    fontSize: 17,
                    cursor: "pointer",
                  }}
                >
                  Jetzt bestellen
                </button>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                  minHeight: 370,
                }}
              >
                <ImageOrPlaceholder
                  src="/placeholders/hero-couple.jpg"
                  alt="Sommerfrische Hero"
                  fallback="HERO BILD-PLATZHALTER"
                  style={{ height: 370, objectFit: "cover" }}
                />
              </div>
            </div>
          </section>

          <section id="angebote" style={{ ...pageWidth, paddingBottom: 82 }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.98fr 0.9fr", gap: 54, alignItems: "start" }}>
              <div>
                <h2 style={{ fontSize: 27, margin: "0 0 12px", color: "#0a0a7a", lineHeight: 1.12, fontWeight: 800 }}>
                  Jetzt Sommerfrische bestellen
                </h2>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, color: "#0a0a7a" }}>
                  <span style={{ fontSize: 18, lineHeight: 1.1 }}>⚡</span>
                  <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3 }}>
                    Kühlung + Wien Energie-Stromgutschein – alles in einem Paket
                  </div>
                </div>
                <p style={{ color: "#6f7481", lineHeight: 1.6, fontSize: 14, margin: "0 0 18px", maxWidth: 560 }}>
                  Sommerfrische ist Ihr Komplettpaket gegen die Hitze daheim. Das mobile Split-Klimagerät Midea Portasplit 3,5 kW gibt&apos;s inklusive oder exklusive Wien Energie-Stromgutschein zum Top-Preis!
                </p>

                <div style={{ width: "100%", maxWidth: 560 }}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
                      border: "1px solid #ececf2",
                    }}
                  >
                    <div style={{ position: "relative", minHeight: 474 }}>
                      <div style={{ width: "100%", height: 474 }}>
                        <ImageOrPlaceholder
                          src={galleryImages[activeImage]}
                          alt={`Produktbild ${activeImage + 1}`}
                          fallback={`BILD-PLATZHALTER ${activeImage + 1}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("carousel", "previous_image", `image_${activeImage + 1}`);
                          prevImage();
                        }}
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: "none",
                          background: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                          cursor: "pointer",
                          fontSize: 22,
                          color: "#0a0a7a",
                          lineHeight: 1,
                        }}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("carousel", "next_image", `image_${activeImage + 1}`);
                          nextImage();
                        }}
                        style={{
                          position: "absolute",
                          right: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: "none",
                          background: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                          cursor: "pointer",
                          fontSize: 22,
                          color: "#0a0a7a",
                          lineHeight: 1,
                        }}
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 9, marginTop: 12 }}>
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          trackEvent("carousel", "dot_click", `image_${index + 1}`);
                          setActiveImage(index);
                        }}
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: index === activeImage ? "#0a0a7a" : "#8a8d96",
                          border: "none",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                    {galleryImages.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => {
                          trackEvent("carousel", "thumbnail_click", `image_${index + 1}`);
                          setActiveImage(index);
                        }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                          border: index === activeImage ? "2px solid #f26a21" : "1px solid #ddd",
                          background: "#fff",
                          cursor: "pointer",
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        <ImageOrPlaceholder src={src} alt={`Thumbnail ${index + 1}`} fallback={`Bild ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: 27, margin: "0 0 14px", color: "#0a0a7a", lineHeight: 1.08, fontWeight: 800 }}>
                  Wählen Sie Ihr Angebot
                </h2>

                {offers.map((offer) => {
                  const active = selectedOffer === offer.key;
                  return (
                    <button
                      key={offer.key}
                      type="button"
                      onClick={() => {
                        trackEvent("offers", "select_offer", offer.title, offer.price, { offer_key: offer.key });
                        setSelectedOffer(offer.key);
                        setCtaError("");
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "#fff",
                        borderRadius: 18,
                        padding: "18px 18px 18px",
                        marginBottom: 12,
                        border: active ? "1.5px solid #2a2a84" : "1px solid #ddddea",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.03)",
                        cursor: "pointer",
                        color: "#0a0a7a",
                      }}
                    >
                      {offer.badge ? <SpecialBadge label={offer.badge} /> : null}
                      <div style={{ fontSize: 23, lineHeight: 1.28, fontWeight: 800, marginTop: offer.badge ? 12 : 0, maxWidth: 380 }}>
                        {offer.title}
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8 }}>{offer.price} Euro</div>
                      <div style={{ color: "#7a7f8c", marginTop: 2, fontSize: 13 }}>einmalig</div>

                      {offer.includedText ? (
                        <div
                          style={{
                            background: "#f3f2fb",
                            border: "1px solid #d8d5ee",
                            borderRadius: 10,
                            padding: 12,
                            marginTop: 14,
                          }}
                        >
                          <div style={{ fontWeight: 800, fontSize: 13 }}>🎁 {offer.includedText}</div>
                          <div style={{ marginTop: 6, color: "#73788a", lineHeight: 1.55, fontSize: 13 }}>{offer.hint}</div>
                        </div>
                      ) : null}

                      <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#6e7381" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <CheckIcon />
                          <span style={{ fontSize: 13 }}>2 Jahre Garantie</span>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <InfoIcon />
                          <span style={{ fontSize: 13 }}>Gültig bis 31.07.2026, nur solange der Vorrat reicht.</span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                <div
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e1e1ea",
                    overflow: "hidden",
                    marginBottom: 16,
                    boxShadow: "0 8px 18px rgba(0,0,0,0.03)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("offers", "toggle_tip", tipOpen ? "close" : "open");
                      setTipOpen((prev) => !prev);
                    }}
                    style={{
                      width: "100%",
                      background: "#fff",
                      border: "none",
                      padding: "16px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      fontWeight: 800,
                      color: "#0a0a7a",
                      fontSize: 16,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}><InfoIcon />Tipp</span>
                    <span style={{ fontSize: 18 }}>{tipOpen ? "⌃" : "⌄"}</span>
                  </button>
                  {tipOpen ? (
                    <div style={{ padding: "0 18px 18px", color: "#666", lineHeight: 1.55, fontSize: 13 }}>
                      Eine fixe Installation ist für Sommerfrische nicht nötig. In einzelnen Fällen kann es sinnvoll sein, vorab kurz auf eigene Verantwortung mit der Hausverwaltung oder Vermietung zu sprechen, ob es besondere Vorgaben in Ihrem Wohnhaus gibt.
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={handleContinueToCheckout}
                  disabled={busy || !selected}
                  style={{
                    width: "100%",
                    background: "#05057a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "17px 24px",
                    fontWeight: 900,
                    fontSize: 18,
                    cursor: "pointer",
                    opacity: busy || !selected ? 0.8 : 1,
                  }}
                >
                  {busy ? "Wird vorbereitet..." : "Weiter zur Kasse"}
                </button>
                {ctaError ? <div style={{ marginTop: 12, color: "#c62828", fontWeight: 700, fontSize: 14 }}>{ctaError}</div> : null}
              </div>
            </div>
          </section>

          <section id="geraet" style={{ ...pageWidth, paddingBottom: 88 }}>
            <h2 style={{ textAlign: "center", fontSize: 30, color: "#0a0a7a", marginBottom: 14, fontWeight: 800 }}>
              Die Midea Portasplit 3,5 kW
            </h2>
            <p style={{ textAlign: "center", color: "#7e705f", maxWidth: 760, margin: "0 auto", lineHeight: 1.6, fontSize: 16 }}>
              Eine Einheit drinnen, eine draußen – verbunden durch einen schmalen Schlauch durch gekippte Fenster.
              Das mitgelieferte Set dichtet alles sauber ab. Echte Split-Kühlung, ganz ohne Bohren.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 14,
                alignItems: "stretch",
                marginTop: 28,
                maxWidth: 700,
                marginInline: "auto",
              }}
            >
              {[
                ["❄", "Kühlen", "3,5 kW · A++ · bis 42 m²"],
                ["◔", "Heizen", "3,5 kW · A+ · vollwertige Wärmepumpe"],
                ["🔊", "Leise", "39 dB(A) – flüsterleise"],
                ["🍃", "Effizient", "~160 kWh pro Saison"],
              ].map(([icon, title, text]) => (
                <div
                  key={title}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "20px 16px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
                    textAlign: "center",
                    minHeight: 118,
                  }}
                >
                  <div style={{ fontSize: 24 }}>{icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 17, marginTop: 10, color: "#0a0a7a" }}>{title}</div>
                  <div style={{ color: "#6e7381", marginTop: 6, lineHeight: 1.5, fontSize: 12 }}>{text}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, color: "#8b8f9b", textAlign: "center", fontSize: 12 }}>
              Im Vergleich zu herkömmlichen Mobilgeräten: 4× stärkere Kühlleistung, deutlich leiser, höhere Effizienz.
            </div>
          </section>

          <section style={{ ...pageWidth, paddingBottom: 88 }}>
            <h2 style={{ textAlign: "center", fontSize: 27, color: "#0a0a7a", marginBottom: 30, fontWeight: 800 }}>
              Sommerfrische Vorteile
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 18 }}>
              <BenefitCard
                icon="🎁"
                title="150 Euro Wien Energie-Stromgutschein"
                text="Optional und direkt einlösbar auf Ihre Stromrechnung bei Wien Energie."
                special
              />
              <BenefitCard
                icon="🚚"
                title="Lieferung bis in Ihre Wohnung"
                text="Bequem zum Aufstellort bis ins Dachgeschoss."
                special
              />
              <BenefitCard
                icon="🔧"
                title="Installationsfrei"
                text="Kein Bohren, kein*e Handwerker*in. In unter einer Stunde aufgestellt."
              />
              <BenefitCard
                icon="⚡"
                title="Echte Split-Kühlung"
                text="4× stärker als herkömmliche Mobilgeräte. Leise mit nur 39 dB."
              />
            </div>
            <div style={{ marginTop: 18, textAlign: "center", fontSize: 16, fontWeight: 800, color: "#0a0a7a" }}>
              <span style={{ color: "#0b8a69" }}>✔</span> Sofort lieferbar
            </div>
          </section>

          <section style={{ ...pageWidth, paddingBottom: 88 }}>
            <h2 style={{ textAlign: "center", fontSize: 32, color: "#0a0a7a", lineHeight: 1.22, fontWeight: 800 }}>
              Ein Klimagerät bekommen Sie überall.
              <br />
              150 Euro Stromgutschein dazu nur bei uns.
            </h2>
            <p style={{ textAlign: "center", color: "#6e7381", marginTop: 16, fontSize: 15 }}>
              Unsere Sommerfrische kühlt nicht nur Ihre Wohnung. Sie senkt auch Ihre Stromrechnung bei uns.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
                marginTop: 28,
                maxWidth: 760,
                marginInline: "auto",
              }}
            >
              <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "1px solid #d9dbe7", minHeight: 154 }}>
                <div style={{ fontWeight: 800, color: "#5d6476", marginBottom: 18, fontSize: 16 }}>Andere Anbieter</div>
                <div style={{ display: "grid", gap: 12, color: "#5d6476", fontSize: 15 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Mobiles Klimagerät</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Lieferung</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ color: "#999" }}>✕</span><span>150 Euro Wien Energie-Stromgutschein</span></div>
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "1.5px solid #0a0a7a", position: "relative", minHeight: 154 }}>
                <div style={{ position: "absolute", top: -12, left: 18 }}><SpecialBadge label="IHR VORTEIL" /></div>
                <div style={{ fontWeight: 900, color: "#0a0a7a", marginTop: 8, marginBottom: 18, fontSize: 21 }}>Sommerfrische</div>
                <div style={{ display: "grid", gap: 12, color: "#5d6476", fontSize: 15 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Mobiles Split-Klimagerät</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Lieferung in die Wohnung</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "#0a0a7a", fontWeight: 800 }}>
                    <CheckIcon />
                    <span>Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*</span>
                  </div>
                </div>
                <div style={{ marginTop: 12, color: "#7b7b85", fontSize: 12 }}>
                  * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                type="button"
                onClick={() => {
                  trackEvent("promo", "stromgutschein_cta_click", "stromvorteil");
                  setSelectedOffer("stromvorteil");
                  setCtaError("");
                  document.getElementById("angebote")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  background: "#05057a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "15px 34px",
                  fontWeight: 900,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Jetzt Wien Energie-Stromgutschein sichern
              </button>
            </div>
          </section>

          <section style={{ ...pageWidth, paddingBottom: 88 }}>
            <h2 style={{ textAlign: "center", fontSize: 26, color: "#0a0a7a", fontWeight: 800 }}>
              So funktioniert Sommerfrische
            </h2>
            <div style={{ position: "relative", marginTop: 28, maxWidth: 760, marginInline: "auto", paddingTop: 6 }}>
              <div
                style={{
                  position: "absolute",
                  left: 58,
                  right: 58,
                  top: 28,
                  height: 2,
                  background: "#d8dbe5",
                  zIndex: 0,
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, position: "relative", zIndex: 1 }}>
                {[
                  ["01", "Bestellen", "Online im Webshop Ihr Sommerfrische-Paket auswählen und bestellen."],
                  ["02", "Liefern lassen", "Lieferung bis zum Aufstellort – bequem zu Ihnen nach Hause."],
                  ["03", "Loskühlen", "Anschließen, einschalten, fertig. Kein*e Techniker*in nötig."],
                ].map(([num, title, text]) => (
                  <div key={num} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "#0a0a7a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: 18,
                        boxShadow: "0 0 0 10px #efefef",
                      }}
                    >
                      {num}
                    </div>
                    <div style={{ marginTop: 20, fontSize: 20, fontWeight: 900, color: "#0a0a7a" }}>{title}</div>
                    <div style={{ marginTop: 10, color: "#6e7381", lineHeight: 1.6, fontSize: 14, maxWidth: 240 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ ...pageWidth, paddingBottom: 0 }}>
            <h2 style={{ textAlign: "center", fontSize: 26, color: "#0a0a7a", marginBottom: 24, fontWeight: 800 }}>
              Häufig gestellte Fragen
            </h2>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <FaqAccordion items={faqItems} />
            </div>
          </section>

          <Footer />

          {selected ? (
            <div
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255,255,255,0.98)",
                borderTop: "1px solid #d8d8d8",
                backdropFilter: "blur(8px)",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  maxWidth: 1280,
                  margin: "0 auto",
                  padding: "10px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div>
                  <div style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>{selected.title}</div>
                  <div style={{ color: "#05057a", fontWeight: 900, fontSize: 24 }}>
                    {selected.price} Euro{selected.key === "stromvorteil" ? "*" : ""}
                  </div>
                  {selected.key === "stromvorteil" ? (
                    <div style={{ color: "#777", fontSize: 13 }}>
                      * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={handleContinueToCheckout}
                  disabled={busy}
                  style={{
                    border: "none",
                    borderRadius: 999,
                    background: "#05057a",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 18,
                    padding: "15px 30px",
                    cursor: "pointer",
                    opacity: busy ? 0.75 : 1,
                  }}
                >
                  {busy ? "Bitte warten..." : "Weiter zur Kasse"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </BrandShell>
  );
}
