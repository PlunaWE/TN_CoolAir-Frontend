import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { FaqAccordion } from "../components/FaqAccordion";
import { Footer } from "../components/Footer";
import { trackEvent } from "../lib/piwik";
import { offers, faqItems } from "../lib/content";
import { cartService } from "../services/cartService";

const pageWrap: CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "0 18px",
};

const sectionGap = 92;
const headingColor = "#05057a";
const mutedText = "#717785";
const cardBorder = "#d9dced";
const surface = "#efefef";

function SvgIcon({ children, size = 20, color = "currentColor", stroke = 2 }: { children: ReactNode; size?: number; color?: string; stroke?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function CheckCircleIcon({ size = 21 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", background: "#0b8967", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <SvgIcon size={size - 7} color="#fff" stroke={2.8}>
        <path d="M5 12.5l4 4L19 7.5" />
      </SvgIcon>
    </span>
  );
}

function InfoCircleIcon({ size = 18, color = headingColor }: { size?: number; color?: string }) {
  return (
    <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <SvgIcon size={size} color={color} stroke={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v5" />
        <path d="M12 7.5h.01" />
      </SvgIcon>
    </span>
  );
}

function SnowflakeIcon() {
  return (
    <SvgIcon size={24} color={headingColor} stroke={1.9}>
      <path d="M12 2v20" />
      <path d="M4.9 6.1L19.1 17.9" />
      <path d="M4.9 17.9L19.1 6.1" />
      <path d="M12 2l-2 2" />
      <path d="M12 2l2 2" />
      <path d="M12 22l-2-2" />
      <path d="M12 22l2-2" />
    </SvgIcon>
  );
}

function HeatIcon() {
  return (
    <SvgIcon size={24} color={headingColor} stroke={1.9}>
      <path d="M15 14a4 4 0 1 1-6 3.5" />
      <path d="M12 3v10" />
      <path d="M9 6c0 1 1 1.8 1 2.8S9 10.5 9 11.5" />
      <path d="M15 6c0 1-1 1.8-1 2.8s1 1.7 1 2.7" />
    </SvgIcon>
  );
}

function VolumeIcon() {
  return (
    <SvgIcon size={24} color={headingColor} stroke={1.9}>
      <path d="M5 14h3l4 4V6L8 10H5z" />
      <path d="M16 9a5 5 0 0 1 0 6" />
      <path d="M18.5 6.5a8 8 0 0 1 0 11" />
    </SvgIcon>
  );
}

function LeafIcon() {
  return (
    <SvgIcon size={24} color={headingColor} stroke={1.9}>
      <path d="M19 5c-8 0-12 4.5-12 10 0 2.8 1.8 4 4.2 4C16 19 19 14.6 19 5z" />
      <path d="M8 14c2.5 0 5-1 7.5-3.5" />
    </SvgIcon>
  );
}

function GiftIcon() {
  return (
    <SvgIcon size={22} color={headingColor} stroke={1.8}>
      <path d="M3 9h18v4H3z" />
      <path d="M5 13v7h14v-7" />
      <path d="M12 9v11" />
      <path d="M12 9H8.5A2.5 2.5 0 0 1 8.5 4c2 0 3.5 2 3.5 5z" />
      <path d="M12 9h3.5A2.5 2.5 0 0 0 15.5 4c-2 0-3.5 2-3.5 5z" />
    </SvgIcon>
  );
}

function TruckIcon() {
  return (
    <SvgIcon size={22} color={headingColor} stroke={1.8}>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7.5" cy="17.5" r="1.7" />
      <circle cx="18" cy="17.5" r="1.7" />
    </SvgIcon>
  );
}

function WrenchIcon() {
  return (
    <SvgIcon size={22} color={headingColor} stroke={1.8}>
      <path d="M14 6a4 4 0 0 0 4.8 4.8L11 18.6a2 2 0 1 1-2.8-2.8l7.8-7.8A4 4 0 0 0 20 3.2z" />
    </SvgIcon>
  );
}

function LightningIcon() {
  return (
    <SvgIcon size={22} color={headingColor} stroke={1.8}>
      <path d="M13 2L6 13h5l-1 9 8-12h-5l0-8z" />
    </SvgIcon>
  );
}

function BulletLightning() {
  return (
    <span style={{ width: 17, height: 17, display: "inline-flex", alignItems: "center", justifyContent: "center", color: headingColor, flexShrink: 0 }}>
      <SvgIcon size={15} color={headingColor} stroke={2}>
        <path d="M13 2L6.5 12h4l-.8 8 7-10.5h-4L13 2z" />
      </SvgIcon>
    </span>
  );
}

function SpecialBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: headingColor,
        color: "#fff",
        borderRadius: 999,
        padding: "6px 14px",
        fontSize: 10,
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: 0.2,
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

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

const specs = [
  { icon: <SnowflakeIcon />, title: "Kühlen", text: "3,5 kW · A++ · bis 42 m²" },
  { icon: <HeatIcon />, title: "Heizen", text: "3,5 kW · A+ · vollwertige Wärmepumpe" },
  { icon: <VolumeIcon />, title: "Leise", text: "39 dB(A) – flüsterleise" },
  { icon: <LeafIcon />, title: "Effizient", text: "~160 kWh pro Saison" },
];

const benefits = [
  { icon: <GiftIcon />, title: "150 Euro Wien Energie-Stromgutschein", text: "Optional und direkt einlösbar auf Ihre Stromrechnung bei Wien Energie.", special: true, badge: "SOMMERFRISCHE SPEZIAL" },
  { icon: <TruckIcon />, title: "Lieferung bis in Ihre Wohnung", text: "Bequem zum Aufstellort bis ins Dachgeschoss.", special: true, badge: "SOMMERFRISCHE SPEZIAL" },
  { icon: <WrenchIcon />, title: "Installationsfrei", text: "Kein Bohren, kein*e Handwerker*in. In unter einer Stunde aufgestellt.", special: false },
  { icon: <LightningIcon />, title: "Echte Split-Kühlung", text: "4× stärker als herkömmliche Mobilgeräte. Leise mit nur 39 dB.", special: false },
];

const steps = [
  ["01", "Bestellen", "Online im Webshop Ihr Sommerfrische-Paket auswählen und bestellen."],
  ["02", "Liefern lassen", "Lieferung bis zum Aufstellort – bequem zu Ihnen nach Hause."],
  ["03", "Loskühlen", "Anschließen, einschalten, fertig. Kein*e Techniker*in nötig."],
] as const;

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
      <div style={{ background: surface, minHeight: "100vh", overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              right: -96,
              top: -126,
              width: 760,
              height: 290,
              background: "linear-gradient(135deg, #f0c55f 0%, #ec6a17 42%, #e65a09 100%)",
              borderBottomLeftRadius: 320,
            }}
          />
          <section style={{ ...pageWrap, position: "relative", zIndex: 1, paddingTop: 14 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                height: 62,
                padding: "0 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
              <LogoImage src="/placeholders/logo-wienenergie.svg" alt="Wien Energie" width={142} href="https://www.wienenergie.at/" />
              <Link to="/" style={{ textDecoration: "none" }}>
                <LogoImage src="/placeholders/logo-sommerfrische.png" alt="Sommerfrische" width={220} />
              </Link>
            </div>
          </section>

          <section style={{ ...pageWrap, position: "relative", zIndex: 1, paddingTop: 72, paddingBottom: 88 }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 42, alignItems: "center" }}>
              <div style={{ maxWidth: 495 }}>
                <h1 style={{ color: headingColor, fontSize: 54, lineHeight: 1.06, fontWeight: 900, letterSpacing: -1.6, margin: 0 }}>Cooles Klima für heiße Sommer.</h1>
                <div style={{ marginTop: 14, color: "#7b7b85", fontSize: 20 }}>Jetzt neu: Sommerfrische von Wien Energie</div>
                <p style={{ marginTop: 26, color: "#616673", fontSize: 17, lineHeight: 1.58 }}>
                  Wenn Ventilator oder offene Fenster nicht mehr gegen die Hitze in der Wohnung helfen, braucht&apos;s unsere Sommerfrische. Ein effizientes Klimagerät samt optionalem 150 Euro Wien Energie-Stromgutschein.
                </p>
                <div style={{ display: "grid", gap: 10, marginTop: 26 }}>
                  {heroBullets.map((bullet) => (
                    <div key={bullet} style={{ display: "flex", alignItems: "center", gap: 10, color: "#616673", fontSize: 15 }}>
                      <CheckCircleIcon />
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
                  style={{ marginTop: 24, background: headingColor, color: "#fff", border: "none", borderRadius: 999, padding: "17px 28px", fontWeight: 900, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 0 rgba(0,0,0,0.08)" }}
                >
                  Jetzt bestellen
                </button>
              </div>

              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.04)", background: "#fff", height: 468 }}>
                <ImageOrPlaceholder src="/placeholders/hero-couple.jpg" alt="Sommerfrische Hero" fallback="HERO BILD-PLATZHALTER" style={{ height: 468, objectFit: "cover" }} />
              </div>
            </div>
          </section>
        </div>

        <section id="angebote" style={{ ...pageWrap, paddingBottom: sectionGap }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: 34, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: 33, margin: "0 0 12px", color: headingColor, lineHeight: 1.1, fontWeight: 900 }}>Jetzt Sommerfrische bestellen</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: headingColor, fontWeight: 800, marginBottom: 10 }}>
                <BulletLightning />
                <span style={{ fontSize: 19 }}>Kühlung + Wien Energie-Stromgutschein – alles in einem Paket</span>
              </div>
              <p style={{ color: mutedText, lineHeight: 1.58, fontSize: 14, margin: "0 0 18px", maxWidth: 560 }}>
                Sommerfrische ist Ihr Komplettpaket gegen die Hitze daheim. Das mobile Split-Klimagerät Midea Portasplit 3,5 kW gibt&apos;s inklusive oder exklusive Wien Energie-Stromgutschein zum Top-Preis!
              </p>

              <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${cardBorder}`, background: "#fff", boxShadow: "0 10px 24px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: headingColor, color: "#fff", padding: "18px 22px", columnGap: 12, textAlign: "center", fontWeight: 800, fontSize: 13, lineHeight: 1.45 }}>
                  <div>A++ Kühlen<br />A+ Heizen</div>
                  <div>Nur 39 dB(A)<br />im Silent-Modus</div>
                  <div>518 x 340<br />x 646 mm Innengerät</div>
                  <div>42 kg<br />Gesamtgewicht</div>
                </div>

                <div style={{ position: "relative", height: 474 }}>
                  <ImageOrPlaceholder src={galleryImages[activeImage]} alt={`Produktbild ${activeImage + 1}`} fallback={`BILD-PLATZHALTER ${activeImage + 1}`} style={{ height: 474, objectFit: "contain", background: "#fff" }} />
                  <button type="button" onClick={() => { trackEvent("carousel", "previous_image", `image_${activeImage + 1}`); prevImage(); }} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 10px rgba(0,0,0,0.12)", cursor: "pointer", fontSize: 24, color: headingColor, lineHeight: 1 }}>‹</button>
                  <button type="button" onClick={() => { trackEvent("carousel", "next_image", `image_${activeImage + 1}`); nextImage(); }} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 10px rgba(0,0,0,0.12)", cursor: "pointer", fontSize: 24, color: headingColor, lineHeight: 1 }}>›</button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                {galleryImages.map((_, index) => (
                  <button key={index} type="button" onClick={() => { trackEvent("carousel", "dot_click", `image_${index + 1}`); setActiveImage(index); }} style={{ width: 8, height: 8, borderRadius: "50%", background: index === activeImage ? headingColor : "#83889a", border: "none", cursor: "pointer" }} />
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 14 }}>
                {galleryImages.map((src, index) => (
                  <button key={src} type="button" onClick={() => { trackEvent("carousel", "thumbnail_click", `image_${index + 1}`); setActiveImage(index); }} style={{ aspectRatio: "1 / 1", borderRadius: 10, border: index === activeImage ? "2px solid #f26a21" : "1px solid #d8d8de", background: "#fff", cursor: "pointer", padding: 0, overflow: "hidden" }}>
                    <ImageOrPlaceholder src={src} alt={`Thumbnail ${index + 1}`} fallback={`Bild ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: 4 }}>
              <h2 style={{ fontSize: 33, marginTop: 0, marginBottom: 14, color: headingColor, lineHeight: 1.08, fontWeight: 900 }}>Wählen Sie Ihr Angebot</h2>
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
                      borderRadius: 16,
                      padding: offer.badge ? "18px 18px 16px" : "16px 18px",
                      marginBottom: 12,
                      border: active ? `1.5px solid ${headingColor}` : `1px solid ${cardBorder}`,
                      boxShadow: active ? "none" : "0 8px 18px rgba(0,0,0,0.03)",
                      cursor: "pointer",
                      color: headingColor,
                    }}
                  >
                    {offer.badge ? <SpecialBadge label={offer.badge} /> : null}
                    <div style={{ fontSize: offer.badge ? 23 : 18, lineHeight: 1.22, fontWeight: 900, marginTop: offer.badge ? 12 : 0, maxWidth: 380 }}>{offer.title}</div>
                    <div style={{ fontSize: offer.badge ? 25 : 22, fontWeight: 900, marginTop: 8 }}>{offer.price} Euro</div>
                    <div style={{ color: "#7a7f8c", marginTop: 2, fontSize: 13 }}>einmalig</div>
                    {offer.includedText ? (
                      <div style={{ background: "#f3f2fb", border: "1px solid #d8d5ee", borderRadius: 10, padding: 12, marginTop: 14 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                          <GiftIcon /> <span>{offer.includedText}</span>
                        </div>
                        <div style={{ marginTop: 6, color: "#73788a", lineHeight: 1.55, fontSize: 13 }}>{offer.hint}</div>
                      </div>
                    ) : null}
                    <div style={{ display: "grid", gap: 10, marginTop: 14, color: mutedText }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}><CheckCircleIcon size={18} /><span style={{ fontSize: 13 }}>2 Jahre Garantie</span></div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}><InfoCircleIcon size={16} /><span style={{ fontSize: 13 }}>Gültig bis 31.07.2026, nur solange der Vorrat reicht.</span></div>
                    </div>
                  </button>
                );
              })}

              <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${cardBorder}`, overflow: "hidden", marginBottom: 16, boxShadow: "0 8px 18px rgba(0,0,0,0.03)" }}>
                <button type="button" onClick={() => { trackEvent("offers", "toggle_tip", tipOpen ? "close" : "open"); setTipOpen((prev) => !prev); }} style={{ width: "100%", background: "#fff", border: "none", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 800, color: headingColor, fontSize: 16 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}><InfoCircleIcon />Tipp</span>
                  <span style={{ fontSize: 18 }}>{tipOpen ? "⌃" : "⌄"}</span>
                </button>
                {tipOpen ? <div style={{ padding: "0 18px 18px", color: "#666", lineHeight: 1.55, fontSize: 13 }}>Eine fixe Installation ist für Sommerfrische nicht nötig. In einzelnen Fällen kann es sinnvoll sein, vorab kurz auf eigene Verantwortung mit der Hausverwaltung oder Vermietung zu sprechen, ob es besondere Vorgaben in Ihrem Wohnhaus gibt.</div> : null}
              </div>

              <button type="button" onClick={handleContinueToCheckout} disabled={busy || !selected} style={{ width: "100%", background: headingColor, color: "#fff", border: "none", borderRadius: 999, padding: "17px 24px", fontWeight: 900, fontSize: 18, cursor: "pointer", opacity: busy || !selected ? 0.82 : 1 }}>
                {busy ? "Wird vorbereitet..." : "Weiter zur Kasse"}
              </button>
              {ctaError ? <div style={{ marginTop: 12, color: "#c62828", fontWeight: 700, fontSize: 14 }}>{ctaError}</div> : null}
            </div>
          </div>
        </section>

        <section style={{ ...pageWrap, paddingBottom: sectionGap }}>
          <h2 style={{ textAlign: "center", fontSize: 28, color: headingColor, marginBottom: 10, fontWeight: 900 }}>Die Midea Portasplit 3,5 kW</h2>
          <p style={{ textAlign: "center", color: "#7b6f63", maxWidth: 700, margin: "0 auto", lineHeight: 1.58, fontSize: 15 }}>
            Eine Einheit drinnen, eine draußen – verbunden durch einen schmalen Schlauch durch gekippte Fenster. Das mitgelieferte Set dichtet alles sauber ab. Echte Split-Kühlung, ganz ohne Bohren.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 26, maxWidth: 680, marginInline: "auto" }}>
            {specs.map((item) => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 14, padding: "18px 14px", boxShadow: "0 8px 20px rgba(0,0,0,0.03)", textAlign: "center", minHeight: 112 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>{item.icon}</div>
                <div style={{ fontWeight: 900, fontSize: 17, marginTop: 10, color: headingColor }}>{item.title}</div>
                <div style={{ color: mutedText, marginTop: 6, lineHeight: 1.45, fontSize: 12 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, color: "#8b8f9b", textAlign: "center", fontSize: 12 }}>Im Vergleich zu herkömmlichen Mobilgeräten: 4× stärkere Kühlleistung, deutlich leiser, höhere Effizienz.</div>
        </section>

        <section style={{ ...pageWrap, paddingBottom: sectionGap - 8 }}>
          <h2 style={{ textAlign: "center", fontSize: 28, color: headingColor, marginBottom: 28, fontWeight: 900 }}>Sommerfrische Vorteile</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 18 }}>
            {benefits.map((item) => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px 18px", minHeight: 150, border: item.special ? `1.5px solid ${headingColor}` : "1px solid #ececf2", boxShadow: item.special ? "none" : "0 8px 20px rgba(0,0,0,0.03)" }}>
                {item.special ? <div style={{ marginBottom: 16 }}><SpecialBadge label={item.badge || "SOMMERFRISCHE SPEZIAL"} /></div> : <div style={{ height: 30, marginBottom: 16 }} />}
                <div style={{ color: headingColor, display: "flex" }}>{item.icon}</div>
                <div style={{ marginTop: 14, color: headingColor, fontWeight: 900, fontSize: 16, lineHeight: 1.35 }}>{item.title}</div>
                <div style={{ marginTop: 10, color: mutedText, lineHeight: 1.6, fontSize: 14 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: "center", fontSize: 16, fontWeight: 900, color: headingColor, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><CheckCircleIcon /> Sofort lieferbar</div>
        </section>

        <section style={{ ...pageWrap, paddingBottom: sectionGap - 8 }}>
          <h2 style={{ textAlign: "center", fontSize: 26, color: headingColor, lineHeight: 1.24, fontWeight: 900, margin: 0 }}>Ein Klimagerät bekommen Sie überall.<br />150 Euro Stromgutschein dazu nur bei uns.</h2>
          <p style={{ textAlign: "center", color: mutedText, marginTop: 14, fontSize: 15 }}>Unsere Sommerfrische kühlt nicht nur Ihre Wohnung. Sie senkt auch Ihre Stromrechnung bei uns.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 28, maxWidth: 750, marginInline: "auto" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: `1px solid ${cardBorder}`, minHeight: 170 }}>
              <div style={{ fontWeight: 800, color: "#5d6476", marginBottom: 16, fontSize: 16 }}>Andere Anbieter</div>
              <div style={{ display: "grid", gap: 12, color: "#5d6476", fontSize: 15 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><CheckCircleIcon /><span>Mobiles Klimagerät</span></div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><CheckCircleIcon /><span>Lieferung</span></div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ color: "#999", fontSize: 18, lineHeight: 1 }}>✕</span><span>150 Euro Wien Energie-Stromgutschein</span></div>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: `1.5px solid ${headingColor}`, position: "relative", minHeight: 170 }}>
              <div style={{ position: "absolute", top: -12, left: 16 }}><SpecialBadge label="IHR VORTEIL" /></div>
              <div style={{ fontWeight: 900, color: headingColor, marginTop: 10, marginBottom: 16, fontSize: 18 }}>Sommerfrische</div>
              <div style={{ display: "grid", gap: 12, color: "#5d6476", fontSize: 15 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><CheckCircleIcon /><span>Mobiles Split-Klimagerät</span></div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><CheckCircleIcon /><span>Lieferung in die Wohnung</span></div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: headingColor, fontWeight: 900 }}><CheckCircleIcon /><span>Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*</span></div>
              </div>
              <div style={{ marginTop: 12, color: "#7b7b85", fontSize: 12 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              type="button"
              onClick={() => {
                trackEvent("promo", "stromgutschein_cta_click", "stromvorteil");
                setSelectedOffer("stromvorteil");
                setCtaError("");
                document.getElementById("angebote")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{ background: headingColor, color: "#fff", border: "none", borderRadius: 999, padding: "15px 34px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}
            >
              Jetzt Wien Energie-Stromgutschein sichern
            </button>
          </div>
        </section>

        <section style={{ ...pageWrap, paddingBottom: sectionGap - 16 }}>
          <h2 style={{ textAlign: "center", fontSize: 28, color: headingColor, marginBottom: 28, fontWeight: 900 }}>So funktioniert Sommerfrische</h2>
          <div style={{ position: "relative", maxWidth: 900, marginInline: "auto", paddingTop: 4 }}>
            <div style={{ position: "absolute", left: 112, right: 112, top: 26, height: 2, background: "#d8dbe5", zIndex: 0 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, position: "relative", zIndex: 1 }}>
              {steps.map(([num, title, text]) => (
                <div key={num} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: headingColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, boxShadow: `0 0 0 8px ${surface}` }}>{num}</div>
                  <div style={{ marginTop: 18, fontSize: 22, fontWeight: 900, color: headingColor }}>{title}</div>
                  <div style={{ marginTop: 9, color: mutedText, lineHeight: 1.55, fontSize: 14, maxWidth: 230 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...pageWrap, paddingBottom: 0 }}>
          <h2 style={{ textAlign: "center", fontSize: 28, color: headingColor, marginBottom: 26, fontWeight: 900 }}>Häufig gestellte Fragen</h2>
          <div style={{ maxWidth: 930, margin: "0 auto" }}><FaqAccordion items={faqItems} /></div>
        </section>

        <Footer />

        {selected ? (
          <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.98)", borderTop: "1px solid #d8d8d8", backdropFilter: "blur(8px)", zIndex: 50 }}>
            <div style={{ ...pageWrap, paddingTop: 10, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
              <div>
                <div style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>{selected.title}</div>
                <div style={{ color: headingColor, fontWeight: 900, fontSize: 24 }}>{selected.price} Euro{selected.key === "stromvorteil" ? "*" : ""}</div>
                {selected.key === "stromvorteil" ? <div style={{ color: "#777", fontSize: 13 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div> : null}
              </div>
              <button type="button" onClick={handleContinueToCheckout} disabled={busy} style={{ border: "none", borderRadius: 999, background: headingColor, color: "#fff", fontWeight: 900, fontSize: 18, padding: "15px 30px", cursor: "pointer", opacity: busy ? 0.75 : 1 }}>{busy ? "Bitte warten..." : "Weiter zur Kasse"}</button>
            </div>
          </div>
        ) : null}
      </div>
    </BrandShell>
  );
}
