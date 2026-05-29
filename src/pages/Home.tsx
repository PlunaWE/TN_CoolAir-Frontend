import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { FaqAccordion } from "../components/FaqAccordion";
import { Footer } from "../components/Footer";
import { trackEvent } from "../lib/piwik";
import { offers, faqItems } from "../lib/content";
import { cartService } from "../services/cartService";

const sectionStyle: CSSProperties = {
  maxWidth: 1460,
  margin: "0 auto",
  padding: "0 22px",
};

function CheckIcon() {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#0d8a64",
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
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: "1.5px solid #0a0a7a",
        color: "#0a0a7a",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      i
    </span>
  );
}

function SpecialBadge({ label = "SOMMERFRISCHE SPEZIAL" }: { label?: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#0a0a7a",
        color: "#fff",
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: 0.2,
      }}
    >
      {label}
    </div>
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
        padding: "16px 18px 18px",
        minHeight: 168,
        border: special ? "1.5px solid #0a0a7a" : "1px solid #ececf2",
        boxShadow: special ? "none" : "0 8px 20px rgba(0,0,0,0.03)",
      }}
    >
      {special ? <div style={{ marginBottom: 14 }}><SpecialBadge /></div> : <div style={{ height: 32, marginBottom: 14 }} />}
      <div style={{ color: "#0a0a7a", fontSize: 22, lineHeight: 1 }}>{icon}</div>
      <div style={{ marginTop: 14, color: "#0a0a7a", fontWeight: 800, fontSize: 16, lineHeight: 1.45 }}>{title}</div>
      <div style={{ marginTop: 10, color: "#6e7381", lineHeight: 1.65, fontSize: 14 }}>{text}</div>
    </div>
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

  const boxStyle: CSSProperties = {
    minWidth: width,
    minHeight: 42,
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", ...boxStyle }}>
        {image}
      </a>
    );
  }

  return <div style={boxStyle}>{image}</div>;
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

function ImageOrPlaceholder({ src, alt, fallback, style }: { src: string; alt: string; fallback: string; style?: CSSProperties }) {
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

  return <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }} onError={() => setFailed(true)} />;
}

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
      } catch { }
      await cartService.addItem({ product_slug: "midea-portasplit-3-5kw", offer_key: selected.key, quantity: 1 });
      trackEvent("cart", "add_item_success", selected.title, 1, { offer_key: selected.key, location: "landing_page" });
      navigate("/checkout");
    } catch (error) {
      trackEvent("cart", "add_item_failure", selected.title, undefined, { offer_key: selected.key, message: (error as Error).message || "unknown_error" });
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
      <div style={{ position: "relative", overflow: "hidden", background: "#efefef" }}>
        <div
          style={{
            position: "absolute",
            right: -40,
            top: -116,
            width: 640,
            height: 240,
            background: "linear-gradient(135deg, #f0c55f 0%, #ec6a17 42%, #e65a09 100%)",
            borderBottomLeftRadius: 260,
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <section style={{ ...sectionStyle, paddingTop: 14 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "18px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
              <LogoImage src="/placeholders/logo-wienenergie.svg" alt="Wien Energie" width={228} href="https://www.wienenergie.at/" />
              <Link to="/" style={{ textDecoration: "none" }}>
                <LogoImage src="/placeholders/logo-sommerfrische.png" alt="Sommerfrische" width={300} />
              </Link>
            </div>
          </section>

          <section style={{ ...sectionStyle, paddingTop: 40, paddingBottom: 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.02fr", gap: 54, alignItems: "center" }}>
              <div>
                <h1 style={{ color: "#0a0a7a", fontSize: 32, lineHeight: 1.08, margin: 0, maxWidth: 650 }}>
                  Cooles Klima für heiße Sommer.
                </h1>
                <div style={{ marginTop: 12, color: "#7b7b85", fontSize: 17 }}>Jetzt neu: Sommerfrische von Wien Energie</div>
                <p style={{ marginTop: 22, color: "#616673", fontSize: 16, lineHeight: 1.58, maxWidth: 600 }}>
                  Wenn Ventilator oder offene Fenster nicht mehr gegen die Hitze in der Wohnung helfen, braucht&apos;s unsere Sommerfrische. Ein effizientes Klimagerät samt optionalem 150 Euro Wien Energie-Stromgutschein.
                </p>
                <div style={{ display: "grid", gap: 10, marginTop: 24, maxWidth: 560 }}>
                  {heroBullets.map((bullet) => (
                    <div key={bullet} style={{ display: "flex", alignItems: "center", gap: 10, color: "#5d6472", fontSize: 14 }}>
                      <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#0d8a64", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>✓</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, color: "#777", fontSize: 13 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("landing_page", "hero_cta_click", "Jetzt bestellen");
                    document.getElementById("angebote")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{ marginTop: 22, background: "#0a0a7a", color: "#fff", border: "none", borderRadius: 999, padding: "15px 28px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}
                >
                  Jetzt bestellen
                </button>
              </div>

              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.04)", minHeight: 420 }}>
                <ImageOrPlaceholder src="/placeholders/hero-couple.jpg" alt="Sommerfrische Hero" fallback="HERO BILD-PLATZHALTER" style={{ height: 420, objectFit: "cover" }} />
              </div>
            </div>
          </section>

          <section id="angebote" style={{ ...sectionStyle, paddingBottom: 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.08fr 0.92fr", gap: 42, alignItems: "start" }}>
              <div>
                <h2 style={{ fontSize: 25, margin: "0 0 12px", color: "#0a0a7a", lineHeight: 1.15 }}>Jetzt Sommerfrische bestellen</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "#0a0a7a", fontWeight: 800 }}>
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span style={{ fontSize: 17 }}>Kühlung + Wien Energie-Stromgutschein – alles in einem Paket</span>
                </div>
                <p style={{ color: "#6e7381", lineHeight: 1.58, fontSize: 14, margin: "0 0 14px", maxWidth: 600 }}>
                  Sommerfrische ist Ihr Komplettpaket gegen die Hitze daheim. Das mobile Split-Klimagerät Midea Portasplit 3,5 kW gibt&apos;s inklusive oder exklusive Wien Energie-Stromgutschein zum Top-Preis!
                </p>

                <div style={{ width: "100%", maxWidth: 700 }}>
                  <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 24px rgba(0,0,0,0.04)", border: "1px solid #ececf2" }}>
                    <div style={{ position: "relative", minHeight: 540 }}>
                      <div style={{ width: "100%", height: 540 }}>
                        <ImageOrPlaceholder src={galleryImages[activeImage]} alt={`Produktbild ${activeImage + 1}`} fallback={`BILD-PLATZHALTER ${activeImage + 1}`} />
                      </div>
                      <button type="button" onClick={() => {
                        trackEvent("carousel", "previous_image", `image_${activeImage + 1}`);
                        prevImage();
                      }} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.12)", cursor: "pointer", fontSize: 24, color: "#0a0a7a", lineHeight: 1 }}>‹</button>
                      <button type="button" onClick={() => {
                        trackEvent("carousel", "next_image", `image_${activeImage + 1}`);
                        nextImage();
                      }} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.12)", cursor: "pointer", fontSize: 24, color: "#0a0a7a", lineHeight: 1 }}>›</button>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 12 }}>
                    {galleryImages.map((_, index) => (
                      <button key={index} type="button" onClick={() => {
                        trackEvent("carousel", "dot_click", `image_${index + 1}`);
                        setActiveImage(index);
                      }} style={{ width: 9, height: 9, borderRadius: "50%", background: index === activeImage ? "#0a0a7a" : "#7e7e89", border: "none", cursor: "pointer" }} />
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                    {galleryImages.map((src, index) => (
                      <button key={src} type="button" onClick={() => {
                        trackEvent("carousel", "thumbnail_click", `image_${index + 1}`);
                        setActiveImage(index);
                      }} style={{ width: 92, height: 92, borderRadius: 10, border: index === activeImage ? "2px solid #f26a21" : "1px solid #ddd", background: "#fff", cursor: "pointer", padding: 0, overflow: "hidden" }}>
                        <ImageOrPlaceholder src={src} alt={`Thumbnail ${index + 1}`} fallback={`Bild ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: 26, marginTop: 2, marginBottom: 14, color: "#0a0a7a", lineHeight: 1.08 }}>Wählen Sie Ihr Angebot</h2>
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
                        padding: "18px 18px 17px",
                        marginBottom: 12,
                        border: active ? "1.5px solid #2a2a84" : "1px solid #ddddea",
                        boxShadow: active ? "none" : "0 8px 18px rgba(0,0,0,0.03)",
                        cursor: "pointer",
                        color: "#0a0a7a",
                      }}
                    >
                      {offer.badge ? <div style={{ display: "inline-block", background: "#0a0a7a", color: "#fff", borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 800, lineHeight: 1 }}>{offer.badge}</div> : null}
                      <div style={{ fontSize: 21, lineHeight: 1.28, fontWeight: 800, marginTop: offer.badge ? 12 : 0, maxWidth: 380 }}>{offer.title}</div>
                      <div style={{ fontSize: 23, fontWeight: 900, marginTop: 8 }}>{offer.price} Euro</div>
                      <div style={{ color: "#7a7f8c", marginTop: 2, fontSize: 13 }}>einmalig</div>
                      {offer.includedText ? (
                        <div style={{ background: "#f3f2fb", border: "1px solid #d8d5ee", borderRadius: 10, padding: 12, marginTop: 14 }}>
                          <div style={{ fontWeight: 800, fontSize: 13 }}>🎁 {offer.includedText}</div>
                          <div style={{ marginTop: 6, color: "#73788a", lineHeight: 1.55, fontSize: 13 }}>{offer.hint}</div>
                        </div>
                      ) : null}
                      <div style={{ display: "grid", gap: 10, marginTop: 14, color: "#6e7381" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}><CheckIcon /><span style={{ fontSize: 13 }}>2 Jahre Garantie</span></div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}><InfoIcon /><span style={{ fontSize: 13 }}>Gültig bis 31.07.2026, nur solange der Vorrat reicht.</span></div>
                      </div>
                    </button>
                  );
                })}

                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e1e1ea", overflow: "hidden", marginBottom: 16, boxShadow: "0 8px 18px rgba(0,0,0,0.03)" }}>
                  <button type="button" onClick={() => {
                    trackEvent("offers", "toggle_tip", tipOpen ? "close" : "open");
                    setTipOpen((prev) => !prev);
                  }} style={{ width: "100%", background: "#fff", border: "none", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 800, color: "#0a0a7a", fontSize: 16 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}><InfoIcon />Tipp</span>
                    <span style={{ fontSize: 18 }}>{tipOpen ? "⌃" : "⌄"}</span>
                  </button>
                  {tipOpen ? <div style={{ padding: "0 18px 18px", color: "#666", lineHeight: 1.55, fontSize: 13 }}>Eine fixe Installation ist für Sommerfrische nicht nötig. In einzelnen Fällen kann es sinnvoll sein, vorab kurz auf eigene Verantwortung mit der Hausverwaltung oder Vermietung zu sprechen, ob es besondere Vorgaben in Ihrem Wohnhaus gibt.</div> : null}
                </div>

                <button type="button" onClick={handleContinueToCheckout} disabled={busy || !selected} style={{ width: "100%", background: "#05057a", color: "#fff", border: "none", borderRadius: 999, padding: "17px 24px", fontWeight: 900, fontSize: 18, cursor: "pointer", opacity: busy || !selected ? 0.8 : 1 }}>
                  {busy ? "Wird vorbereitet..." : "Weiter zur Kasse"}
                </button>
                {ctaError ? <div style={{ marginTop: 12, color: "#c62828", fontWeight: 700, fontSize: 14 }}>{ctaError}</div> : null}
              </div>
            </div>
          </section>

          <section id="geraet" style={{ ...sectionStyle, paddingBottom: 56 }}>
            <h2 style={{ textAlign: "center", fontSize: 26, color: "#0a0a7a", marginBottom: 14 }}>Die Midea Portasplit 3,5 kW</h2>
            <p style={{ textAlign: "center", color: "#7b6f63", maxWidth: 760, margin: "0 auto", lineHeight: 1.6, fontSize: 15 }}>
              Eine Einheit drinnen, eine draußen – verbunden durch einen schmalen Schlauch durch gekippte Fenster. Das mitgelieferte Set dichtet alles sauber ab. Echte Split-Kühlung, ganz ohne Bohren.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, alignItems: "stretch", marginTop: 24, maxWidth: 760, marginInline: "auto" }}>
              {[["❄", "Kühlen", "3,5 kW · A++ · bis 42 m²"], ["◔", "Heizen", "3,5 kW · A+ · vollwertige Wärmepumpe"], ["🔊", "Leise", "39 dB(A) – flüsterleise"], ["🍃", "Effizient", "~160 kWh pro Saison"]].map(([icon, title, text]) => (
                <div key={title} style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", boxShadow: "0 8px 20px rgba(0,0,0,0.03)", textAlign: "center", minHeight: 126 }}>
                  <div style={{ fontSize: 24 }}>{icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 17, marginTop: 10, color: "#0a0a7a" }}>{title}</div>
                  <div style={{ color: "#6e7381", marginTop: 6, lineHeight: 1.5, fontSize: 12 }}>{text}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, color: "#8b8f9b", textAlign: "center", fontSize: 12 }}>Im Vergleich zu herkömmlichen Mobilgeräten: 4× stärkere Kühlleistung, deutlich leiser, höhere Effizienz.</div>
          </section>

          <section style={{ ...sectionStyle, paddingBottom: 56 }}>
            <h2 style={{ textAlign: "center", fontSize: 24, color: "#0a0a7a", marginBottom: 26 }}>Sommerfrische Vorteile</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 18 }}>
              <BenefitCard icon="🎁" title="150 Euro Wien Energie-Stromgutschein" text="Optional und direkt einlösbar auf Ihre Stromrechnung bei Wien Energie." special />
              <BenefitCard icon="🚚" title="Lieferung bis in Ihre Wohnung" text="Bequem zum Aufstellort bis ins Dachgeschoss." special />
              <BenefitCard icon="🔧" title="Installationsfrei" text="Kein Bohren, kein*e Handwerker*in. In unter einer Stunde aufgestellt." />
              <BenefitCard icon="⚡" title="Echte Split-Kühlung" text="4× stärker als herkömmliche Mobilgeräte. Leise mit nur 39 dB." />
            </div>
            <div style={{ marginTop: 18, textAlign: "center", fontSize: 16, fontWeight: 800, color: "#0a0a7a" }}><span style={{ color: "#0b8a69" }}>✔</span> Sofort lieferbar</div>
          </section>

          <section style={{ ...sectionStyle, paddingBottom: 68 }}>
            <h2 style={{ textAlign: "center", fontSize: 26, color: "#0a0a7a", lineHeight: 1.26 }}>Ein Klimagerät bekommen Sie überall.<br />150 Euro Stromgutschein dazu nur bei uns.</h2>
            <p style={{ textAlign: "center", color: "#6e7381", marginTop: 14, fontSize: 15 }}>Unsere Sommerfrische kühlt nicht nur Ihre Wohnung. Sie senkt auch Ihre Stromrechnung bei uns.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 28, maxWidth: 1020, marginInline: "auto" }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #d9dbe7", minHeight: 152 }}>
                <div style={{ fontWeight: 800, color: "#5d6476", marginBottom: 18, fontSize: 16 }}>Andere Anbieter</div>
                <div style={{ display: "grid", gap: 12, color: "#5d6476", fontSize: 15 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Mobiles Klimagerät</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Lieferung</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ color: "#999" }}>✕</span><span>150 Euro Wien Energie-Stromgutschein</span></div>
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1.5px solid #0a0a7a", position: "relative", minHeight: 152 }}>
                <div style={{ position: "absolute", top: -12, left: 20 }}><SpecialBadge label="IHR VORTEIL" /></div>
                <div style={{ fontWeight: 900, color: "#0a0a7a", marginTop: 14, marginBottom: 18, fontSize: 22 }}>Sommerfrische</div>
                <div style={{ display: "grid", gap: 12, color: "#5d6476", fontSize: 15 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Mobiles Split-Klimagerät</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckIcon /><span>Lieferung in die Wohnung</span></div>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "#0a0a7a", fontWeight: 800 }}><CheckIcon /><span>Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*</span></div>
                </div>
                <div style={{ marginTop: 12, color: "#7b7b85", fontSize: 12 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div>
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
                style={{ background: "#05057a", color: "#fff", border: "none", borderRadius: 999, padding: "15px 34px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}
              >
                Jetzt Wien Energie-Stromgutschein sichern
              </button>
            </div>
          </section>

          <section style={{ ...sectionStyle, paddingBottom: 66 }}>
            <h2 style={{ textAlign: "center", fontSize: 24, color: "#0a0a7a" }}>So funktioniert Sommerfrische</h2>
            <div style={{ position: "relative", marginTop: 28, maxWidth: 1120, marginInline: "auto", paddingTop: 4 }}>
              <div
                style={{
                  position: "absolute",
                  left: "16.66%",
                  right: "16.66%",
                  top: 25,
                  height: 2,
                  background: "#d8dbe5",
                  zIndex: 0,
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, position: "relative", zIndex: 1 }}>
                {[["01", "Bestellen", "Online im Webshop Ihr Sommerfrische-Paket auswählen und bestellen."], ["02", "Liefern lassen", "Lieferung bis zum Aufstellort – bequem zu Ihnen nach Hause."], ["03", "Loskühlen", "Anschließen, einschalten, fertig. Kein*e Techniker*in nötig."]].map(([num, title, text]) => (
                  <div key={num} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: 50,
                        height: 50,
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
                    <div style={{ marginTop: 10, color: "#6e7381", lineHeight: 1.6, fontSize: 14, maxWidth: 250 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ ...sectionStyle, paddingBottom: 0 }}>
            <h2 style={{ textAlign: "center", fontSize: 24, color: "#0a0a7a", marginBottom: 26 }}>Häufig gestellte Fragen</h2>
            <div style={{ maxWidth: 920, margin: "0 auto" }}><FaqAccordion items={faqItems} /></div>
          </section>

          <Footer />

          {selected ? (
            <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.98)", borderTop: "1px solid #d8d8d8", backdropFilter: "blur(8px)", zIndex: 50 }}>
              <div style={{ maxWidth: 1460, margin: "0 auto", padding: "10px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
                <div>
                  <div style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>{selected.title}</div>
                  <div style={{ color: "#05057a", fontWeight: 900, fontSize: 24 }}>{selected.price} Euro{selected.key === "stromvorteil" ? "*" : ""}</div>
                  {selected.key === "stromvorteil" ? <div style={{ color: "#777", fontSize: 13 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div> : null}
                </div>
                <button type="button" onClick={handleContinueToCheckout} disabled={busy} style={{ border: "none", borderRadius: 999, background: "#05057a", color: "#fff", fontWeight: 900, fontSize: 18, padding: "15px 30px", cursor: "pointer", opacity: busy ? 0.75 : 1 }}>{busy ? "Bitte warten..." : "Weiter zur Kasse"}</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </BrandShell>
  );
}
