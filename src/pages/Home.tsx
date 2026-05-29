import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const surface = "#f3f3f3";
const headingColor = "#07126d";
const bodyColor = "#666b78";
const mutedColor = "#7f8491";
const borderColor = "#d9dbe5";
const cardBorder = "#1a1f8a";
const successGreen = "#0b8967";

type OfferKey = "stromvorteil" | "solo";

type GalleryItem = {
  src: string;
  thumb: string;
  alt: string;
};

type FaqItem = {
  question: string;
  answer: string | JSX.Element;
};

type FaqGroup = {
  title: string;
  items: FaqItem[];
};

function CheckCircleIcon({ size = 21 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: successGreen,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size - 7}
        height={size - 7}
        fill="none"
        stroke="#fff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12.5l4 4L19 7.5" />
      </svg>
    </span>
  );
}

function LogoImage({
  src,
  alt,
  width,
  href,
}: {
  src: string;
  alt: string;
  width: number;
  href?: string;
}) {
  const image = (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={{ display: "block" }}>
        {image}
      </a>
    );
  }

  return image;
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: 34 }}>
      <h2
        style={{
          margin: 0,
          color: headingColor,
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -0.6,
        }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          style={{
            margin: "14px auto 0",
            maxWidth: 760,
            color: bodyColor,
            fontSize: 18,
            lineHeight: 1.55,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [openItemKey, setOpenItemKey] = useState<string | null>(null);

  return (
    <section style={{ padding: "90px 0 90px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 32px" }}>
        <SectionTitle title="Häufig gestellte Fragen" />

        <div style={{ display: "grid", gap: 14 }}>
          {groups.map((group, groupIndex) => {
            const groupOpen = openGroup === groupIndex;

            return (
              <div
                key={group.title}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenGroup(groupOpen ? null : groupIndex);
                    setOpenItemKey(null);
                  }}
                  style={faqGroupBtn}
                >
                  <span>{group.title}</span>
                  {groupOpen ? (
                    <ChevronUp size={20} color={headingColor} />
                  ) : (
                    <ChevronDown size={20} color={headingColor} />
                  )}
                </button>

                {groupOpen ? (
                  <div style={{ padding: "0 22px 18px" }}>
                    {group.items.map((item, itemIndex) => {
                      const itemKey = `${groupIndex}-${itemIndex}`;
                      const itemOpen = openItemKey === itemKey;

                      return (
                        <div
                          key={item.question}
                          style={{
                            borderTop: itemIndex === 0 ? "none" : "1px solid #e8ebf0",
                            paddingTop: itemIndex === 0 ? 0 : 10,
                            marginTop: itemIndex === 0 ? 0 : 10,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenItemKey(itemOpen ? null : itemKey)
                            }
                            style={faqItemBtn}
                          >
                            <span>{item.question}</span>
                            {itemOpen ? (
                              <ChevronUp size={18} color={headingColor} />
                            ) : (
                              <ChevronDown size={18} color={headingColor} />
                            )}
                          </button>

                          {itemOpen ? (
                            <div
                              style={{
                                color: bodyColor,
                                fontSize: 16,
                                lineHeight: 1.65,
                                padding: "4px 0 8px",
                              }}
                            >
                              {typeof item.answer === "string" ? (
                                <p style={{ margin: 0 }}>{item.answer}</p>
                              ) : (
                                item.answer
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<OfferKey>("stromvorteil");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tipOpen, setTipOpen] = useState(false);

  const gallery: GalleryItem[] = useMemo(
    () => [
      {
        src: "/placeholders/gallery-1.webp",
        thumb: "/placeholders/gallery-1.webp",
        alt: "Midea Portasplit Hauptansicht",
      },
      {
        src: "/placeholders/gallery-2.webp",
        thumb: "/placeholders/gallery-2.webp",
        alt: "Midea Portasplit Wohnraumszene",
      },
      {
        src: "/placeholders/gallery-3.webp",
        thumb: "/placeholders/gallery-3.webp",
        alt: "Midea Portasplit Detailansicht",
      },
      {
        src: "/placeholders/gallery-4.webp",
        thumb: "/placeholders/gallery-4.webp",
        alt: "Midea Außeneinheit Detail",
      },
      {
        src: "/placeholders/gallery-5.webp",
        thumb: "/placeholders/gallery-5.webp",
        alt: "Midea Portsaplit Fensterschlauch",
      },
    ],
    []
  );

  const specs = [
    { icon: Snowflake, title: "Kühlen", text: "3,5 kW · A++ · bis 42 m²" },
    {
      icon: ThermometerSun,
      title: "Heizen",
      text: "3,5 kW · A+ · vollwertige Wärmepumpe",
    },
    { icon: Volume2, title: "Leise", text: "39 dB(A) – flüsterleise" },
    { icon: Leaf, title: "Effizient", text: "~160 kWh pro Saison" },
  ];

  const benefits = [
    {
      icon: Gift,
      title: "150 Euro Wien Energie-Stromgutschein",
      text: "Optional und direkt einlösbar auf Ihre Stromrechnung bei Wien Energie.",
      badge: "SOMMERFRISCHE SPEZIAL",
      highlighted: true,
    },
    {
      icon: Truck,
      title: "Lieferung bis in Ihre Wohnung",
      text: "Bequem zum Aufstellort bis ins Dachgeschoss.",
      badge: "SOMMERFRISCHE SPEZIAL",
      highlighted: true,
    },
    {
      icon: Wrench,
      title: "Installationsfrei",
      text: "Kein Bohren, kein*e Handwerker*in. In unter einer Stunde aufgestellt.",
      badge: "",
      highlighted: false,
    },
    {
      icon: Zap,
      title: "Echte Split-Kühlung",
      text: "4× stärker als herkömmliche Mobilgeräte. Leise mit nur 39 dB.",
      badge: "",
      highlighted: false,
    },
  ];

  const faqGroups: FaqGroup[] = [
    {
      title: "Das Gerät: Midea Portasplit",
      items: [
        {
          question: "Was ist die Midea Portasplit?",
          answer:
            "Die Midea Portasplit ist ein mobiles Split-Klimagerät mit innenliegender Einheit und Außeneinheit, verbunden über einen flexiblen Schlauch durch ein gekipptes Fenster.",
        },
      ],
    },
    {
      title: "Lieferung, Aufbau & Installation",
      items: [
        {
          question: "Was umfasst die Lieferung?",
          answer:
            "Geliefert wird das Gerät inklusive Zubehör und Fenster-Set bis zum Aufstellort.",
        },
      ],
    },
    {
      title: "Der Wien Energie-Stromgutschein",
      items: [
        {
          question: "Wie erhalte ich den Gutschein?",
          answer:
            "Bei Wahl der Variante mit Strom-Vorteil ist der Gutschein im Paket inkludiert und wird entsprechend übermittelt.",
        },
      ],
    },
    {
      title: "Kühlung im Vergleich: Welche Lösung passt zu mir?",
      items: [
        {
          question: "Für wen ist Sommerfrische die optimale Lösung?",
          answer:
            "Für alle, die echte Split-Kühlung ohne aufwendige Fachinstallation möchten.",
        },
      ],
    },
    {
      title: "Zahlung",
      items: [
        {
          question: "Welche Zahlungsmethoden stehen zur Verfügung?",
          answer: "Die Zahlungsabwicklung erfolgt bequem online über den Zahlungsdienstleister.",
        },
      ],
    },
    {
      title: "Technische Details",
      items: [
        {
          question: "Welche technischen Daten hat die Midea Portasplit?",
          answer: (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr style={{ background: headingColor }}>
                    <th style={thStyle}>Eigenschaft</th>
                    <th style={thStyle}>Wert</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Modellbezeichnung", "Midea Portasplit 3.5 kW"],
                    ["Kühlleistung", "3,5 kW (9.000 BTU/h)"],
                    ["Heizleistung", "3,5 kW (9.000 BTU/h)"],
                    ["Geeignete Raumgröße", "Bis zu 42 m²"],
                    ["Energieeffizienzklasse Kühlen / SEER", "A++ / 6,1"],
                    ["Energieeffizienzklasse Heizen / SCOP", "A+ / 4,0"],
                    ["Kältemittel", "R32"],
                    ["Lautstärke Inneneinheit", "ab 39 dB(A)"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td style={tdStyleLabel}>{label}</td>
                      <td style={tdStyleValue}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    const selected = selectedOffer === "stromvorteil" ? "with-power-benefit" : "without-power-benefit";
    localStorage.setItem("coolair_selected_offer", selected);
  }, [selectedOffer]);

  const offerTitle =
    selectedOffer === "stromvorteil"
      ? "Midea Portasplit 3,5 kW + Strom-Vorteil"
      : "Midea Portasplit 3,5 kW ohne Strom-Vorteil";

  const offerPrice = selectedOffer === "stromvorteil" ? 949 : 849;
  const offerFootnote =
    selectedOffer === "stromvorteil"
      ? "* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar."
      : "";

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div
      style={{
        background: surface,
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 620,
          height: 220,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 620 220"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 H620 V220 C490,220 408,185 332,150 C250,112 170,95 0,95 Z"
            fill="#e96517"
          />
          <path
            d="M0,0 H235 C235,36 210,58 182,73 C145,93 90,99 0,95 Z"
            fill="#f1b152"
          />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "14px 32px 0" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              height: 64,
              padding: "0 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            }}
          >
            <LogoImage
              src="/placeholders/logo-wienenergie.svg"
              alt="Wien Energie"
              width={140}
              href="https://www.wienenergie.at/"
            />

            <Link to="/" style={{ textDecoration: "none" }}>
              <LogoImage
                src="/placeholders/logo-sommerfrische.png"
                alt="Sommerfrische"
                width={220}
              />
            </Link>
          </div>
        </div>

        <section style={{ padding: "68px 0 56px" }}>
          <div
            style={{
              maxWidth: 1040,
              margin: "0 auto",
              padding: "0 32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 34,
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  color: headingColor,
                  fontSize: 56,
                  lineHeight: 1.08,
                  fontWeight: 800,
                  letterSpacing: -1.4,
                  margin: 0,
                }}
              >
                Cooles Klima für heiße Sommer.
              </h1>

              <div style={{ marginTop: 14, color: "#7b7b85", fontSize: 18 }}>
                Jetzt neu: Sommerfrische von Wien Energie
              </div>

              <p
                style={{
                  marginTop: 26,
                  color: bodyColor,
                  fontSize: 18,
                  lineHeight: 1.55,
                  maxWidth: 620,
                }}
              >
                Wenn Ventilator oder offene Fenster nicht mehr gegen die Hitze
                in der Wohnung helfen, braucht‘s unsere Sommerfrische. Ein
                effizientes Klimagerät samt optionalem 150 Euro Wien
                Energie-Stromgutschein.
              </p>

              <div style={{ marginTop: 26, display: "grid", gap: 12 }}>
                {[
                  "Midea Portasplit 3,5 kW Klimagerät",
                  "In wenigen Minuten einsatzbereit, ohne Fachinstallation",
                  "Sofort lieferbar",
                  "Lieferung bis zum Aufstellort",
                  "Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      color: bodyColor,
                      fontSize: 17,
                    }}
                  >
                    <CheckCircleIcon />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 18,
                  color: mutedColor,
                  fontSize: 14,
                }}
              >
                * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen
                einlösbar.
              </div>

              <button type="button" onClick={goToCheckout} style={{ ...primaryCta, marginTop: 28 }}>
                Jetzt bestellen
              </button>
            </div>

            <div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
                }}
              >
                <img
                  src="/placeholders/hero-couple.jpg"
                  alt="Sommerfrische Hero"
                  style={{
                    display: "block",
                    width: "100%",
                    height: 400,
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "44px 0 84px" }}>
          <div
            style={{
              maxWidth: 1040,
              margin: "0 auto",
              padding: "0 32px",
              display: "grid",
              gridTemplateColumns: "1.08fr 0.92fr",
              gap: 36,
              alignItems: "start",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: headingColor,
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                Jetzt Sommerfrische bestellen
              </h2>

              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: headingColor,
                  fontWeight: 800,
                  fontSize: 17,
                }}
              >
                <Zap size={16} color={headingColor} strokeWidth={2.2} />
                <span>Kühlung + Wien Energie-Stromgutschein — alles in einem Paket</span>
              </div>

              <p
                style={{
                  marginTop: 10,
                  color: bodyColor,
                  fontSize: 16,
                  lineHeight: 1.55,
                  maxWidth: 560,
                }}
              >
                Sommerfrische ist Ihr Komplettpaket gegen die Hitze daheim. Das
                mobile Split-Klimagerät Midea Portasplit 3,5 kW gibt's inklusive
                oder exklusive Wien Energie-Stromgutschein zum Top-Preis!
              </p>

              <div
                style={{
                  marginTop: 18,
                  background: "#fff",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
                  border: "1px solid #ececf2",
                }}
              >
                <div
                  style={{
                    background: headingColor,
                    color: "#fff",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 8,
                    padding: "18px 20px",
                    fontSize: 15,
                    fontWeight: 800,
                    lineHeight: 1.45,
                    textAlign: "center",
                  }}
                >
                  <div>
                    A++ Kühlen
                    <br />
                    A+ Heizen
                  </div>
                  <div>
                    Nur 39 dB(A)
                    <br />
                    im Silent-Modus
                  </div>
                  <div>
                    518 x 340
                    <br />x 646 mm
                    <br />
                    Innengerät
                  </div>
                  <div>
                    42 kg
                    <br />
                    Gesamtgewicht
                  </div>
                </div>

                <div style={{ position: "relative", minHeight: 470 }}>
                  <img
                    src={gallery[currentSlide].src}
                    alt={gallery[currentSlide].alt}
                    style={{
                      display: "block",
                      width: "100%",
                      height: 470,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? gallery.length - 1 : prev - 1
                      )
                    }
                    style={{ ...carouselArrowBtn, left: 14 }}
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft size={18} strokeWidth={2.2} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                    style={{ ...carouselArrowBtn, right: 14 }}
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight size={18} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {gallery.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Zu Bild ${index + 1}`}
                    style={{
                      width: index === currentSlide ? 10 : 8,
                      height: index === currentSlide ? 10 : 8,
                      borderRadius: "50%",
                      border: "none",
                      background: index === currentSlide ? headingColor : "#7b7b7b",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 10,
                }}
              >
                {gallery.map((item, index) => (
                  <button
                    key={item.thumb}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      border:
                        index === currentSlide
                          ? "2px solid #ef7d32"
                          : "1px solid #ddd",
                      padding: 0,
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      style={{
                        display: "block",
                        width: "100%",
                        height: 78,
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  color: headingColor,
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                Wählen Sie Ihr Angebot
              </h2>

              <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
                <OfferCard
                  selected={selectedOffer === "stromvorteil"}
                  badge="LAUNCH-ANGEBOT"
                  title="Midea Portasplit 3,5 kW + Strom-Vorteil"
                  price="949 Euro"
                  hasGift
                  description="Gutschein nur für Wien Energie-Stromkund*innen einlösbar. Auf andere Personen übertragbar und unbefristet gültig."
                  onClick={() => setSelectedOffer("stromvorteil")}
                />

                <OfferCard
                  selected={selectedOffer === "solo"}
                  title="Midea Portasplit 3,5 kW ohne Strom-Vorteil"
                  price="849 Euro"
                  onClick={() => setSelectedOffer("solo")}
                />

                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setTipOpen((v) => !v)}
                    style={{
                      width: "100%",
                      background: "#fff",
                      border: "none",
                      padding: "18px 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      color: headingColor,
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CircleHelp size={17} color={headingColor} strokeWidth={2} />
                      Tipp
                    </span>
                    {tipOpen ? (
                      <ChevronUp size={18} color={headingColor} />
                    ) : (
                      <ChevronDown size={18} color={headingColor} />
                    )}
                  </button>

                  {tipOpen ? (
                    <div
                      style={{
                        padding: "0 18px 18px",
                        color: bodyColor,
                        fontSize: 15,
                        lineHeight: 1.6,
                      }}
                    >
                      Eine fixe Installation ist für Sommerfrische nicht nötig. In
                      einzelnen Fällen kann es sinnvoll sein, vorab kurz auf eigene
                      Verantwortung mit der Hausverwaltung oder Vermietung zu
                      sprechen, ob es besondere Vorgaben im Wohnhaus gibt.
                    </div>
                  ) : null}
                </div>

                <button type="button" onClick={goToCheckout} style={widePrimaryBtn}>
                  Weiter zur Kasse
                </button>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "56px 0 72px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
            <SectionTitle
              title="Die Midea Portasplit 3,5 kW"
              subtitle="Eine Einheit drinnen, eine draußen – verbunden durch einen schmalen Schlauch durchs gekippte Fenster. Das mitgelieferte Set dichtet alles sauber ab. Echte Split-Kühlung, ganz ohne Bohren."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                maxWidth: 760,
                margin: "0 auto",
              }}
            >
              {specs.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "22px 18px",
                    textAlign: "center",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <item.icon size={24} color={headingColor} strokeWidth={1.9} />
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      color: headingColor,
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      color: bodyColor,
                      fontSize: 15,
                      lineHeight: 1.45,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 18,
                textAlign: "center",
                color: bodyColor,
                fontSize: 15,
              }}
            >
              Im Vergleich zu herkömmlichen Mobilgeräten: 4× stärkere
              Kühlleistung, deutlich leiser, höhere Effizienz.
            </div>
          </div>
        </section>

        <section style={{ padding: "44px 0 72px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
            <SectionTitle title="Sommerfrische Vorteile" />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 18,
              }}
            >
              {benefits.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: item.highlighted ? `1.5px solid ${cardBorder}` : "none",
                    boxShadow: item.highlighted
                      ? "none"
                      : "0 10px 24px rgba(0,0,0,0.04)",
                    padding: "18px 18px 20px",
                    position: "relative",
                    minHeight: 148,
                  }}
                >
                  {item.badge ? (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: 14,
                        background: headingColor,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "6px 13px",
                        borderRadius: 999,
                        letterSpacing: 0.3,
                      }}
                    >
                      {item.badge}
                    </div>
                  ) : null}

                  <div style={{ color: headingColor, display: "flex" }}>
                    <item.icon size={22} color={headingColor} strokeWidth={1.8} />
                  </div>

                  <div
                    style={{
                      marginTop: 16,
                      color: headingColor,
                      fontWeight: 800,
                      fontSize: 17,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      color: bodyColor,
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                color: headingColor,
                fontWeight: 800,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <CheckCircleIcon size={22} />
              Sofort lieferbar
            </div>
          </div>
        </section>

        <section style={{ padding: "56px 0 84px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
            <SectionTitle
              title="Ein Klimagerät bekommen Sie überall. 150 Euro Stromgutschein dazu nur bei uns."
              subtitle="Unsere Sommerfrische kühlt nicht nur Ihre Wohnung. Sie senkt auch Ihre Stromrechnung bei uns."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                maxWidth: 760,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #dbdde6",
                  padding: "22px 18px",
                }}
              >
                <div
                  style={{
                    color: "#646a78",
                    fontWeight: 800,
                    fontSize: 17,
                    marginBottom: 14,
                  }}
                >
                  Andere Anbieter
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  {["Mobiles Klimagerät", "Lieferung"].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: bodyColor,
                        fontSize: 16,
                      }}
                    >
                      <CheckCircleIcon size={20} />
                      <span>{item}</span>
                    </div>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: bodyColor,
                      fontSize: 16,
                    }}
                  >
                    <X size={16} color="#999" strokeWidth={2.2} />
                    <span>150 Euro Wien Energie-Stromgutschein</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: `1.5px solid ${cardBorder}`,
                  padding: "18px 18px 20px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 14,
                    background: headingColor,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "6px 13px",
                    borderRadius: 999,
                    letterSpacing: 0.3,
                  }}
                >
                  IHR VORTEIL
                </div>

                <div
                  style={{
                    color: headingColor,
                    fontWeight: 800,
                    fontSize: 17,
                    marginBottom: 16,
                  }}
                >
                  Sommerfrische
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    "Mobiles Split-Klimagerät",
                    "Lieferung in die Wohnung",
                    "Inklusive oder exklusive 150 Euro Wien Energie-Stromgutschein*",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        color: item.includes("150 Euro") ? headingColor : bodyColor,
                        fontSize: 16,
                        fontWeight: item.includes("150 Euro") ? 800 : 400,
                        lineHeight: 1.45,
                      }}
                    >
                      <CheckCircleIcon size={20} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 14,
                    color: mutedColor,
                    fontSize: 14,
                  }}
                >
                  * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen
                  einlösbar.
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button type="button" onClick={() => setSelectedOffer("stromvorteil")} style={primaryCta}>
                Jetzt Wien Energie-Stromgutschein sichern
              </button>
            </div>
          </div>
        </section>

        <section style={{ padding: "34px 0 70px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
            <SectionTitle title="So funktioniert Sommerfrische" />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
                marginTop: 20,
              }}
            >
              {[
                {
                  n: "01",
                  title: "Bestellen",
                  text: "Online im Webshop Ihr Sommerfrische-Paket auswählen und bestellen.",
                },
                {
                  n: "02",
                  title: "Liefern lassen",
                  text: "Lieferung bis zum Aufstellort – bequem zu Ihnen nach Hause.",
                },
                {
                  n: "03",
                  title: "Loskühlen",
                  text: "Anschließen, einschalten, fertig. Kein*e Techniker*in nötig.",
                },
              ].map((step, index) => (
                <div
                  key={step.n}
                  style={{
                    textAlign: "center",
                    position: "relative",
                    paddingTop: 10,
                  }}
                >
                  {index < 2 ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 28,
                        right: "-9%",
                        width: "58%",
                        height: 1.5,
                        background: "#d7d8de",
                      }}
                    />
                  ) : null}

                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: headingColor,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 24,
                      margin: "0 auto 18px",
                    }}
                  >
                    {step.n}
                  </div>

                  <div
                    style={{
                      color: headingColor,
                      fontWeight: 800,
                      fontSize: 21,
                    }}
                  >
                    {step.title}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      color: bodyColor,
                      fontSize: 16,
                      lineHeight: 1.55,
                      maxWidth: 280,
                      marginInline: "auto",
                    }}
                  >
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqAccordion groups={faqGroups} />

        <footer style={{ background: "#dcdcdc", padding: "54px 0 24px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.8fr 0.9fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <LogoImage
                src="/placeholders/logo-wienenergie.svg"
                alt="Wien Energie"
                width={170}
              />

              <div>
                <div style={footerHeading}>Rechtliches</div>
                <div style={footerLinkList}>
                  <Link to="/impressum" style={footerLink}>Impressum</Link>
                  <Link to="/datenschutz" style={footerLink}>Datenschutz</Link>
                  <Link to="/agb" style={footerLink}>AGB</Link>
                  <Link to="/widerrufsbelehrung" style={footerLink}>Widerrufsbelehrung</Link>
                  <Link to="/barrierefreiheit" style={footerLink}>Barrierefreiheit</Link>
                </div>
              </div>

              <div>
                <div style={footerHeading}>Kontakt</div>
                <div style={{ color: headingColor, fontSize: 15, lineHeight: 1.75 }}>
                  Wien Energie GmbH
                  <br />
                  Thomas-Klestil-Platz 14
                  <br />
                  1030 Wien
                  <br />
                  Telefon: +43 1 4004 81880
                  <br />
                  Telefonzeiten: Mo–Fr 09:00–17:00 Uhr
                  <br />
                  sommerfrische@wienenergie.at
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 36,
                borderTop: "1px solid #ececec",
                paddingTop: 18,
                color: headingColor,
                fontSize: 13,
              }}
            >
              Gültig bis 31.07.2026, nur solange der Vorrat reicht.
            </div>
            <div
              style={{
                marginTop: 8,
                color: headingColor,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              © 2026 Sommerfrische – powered by Wien Energie GmbH. Alle Rechte
              vorbehalten.
            </div>
          </div>
        </footer>

        <div
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 40,
            background: "#fff",
            borderTop: "1px solid #d8d8de",
            boxShadow: "0 -2px 14px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <div style={{ color: mutedColor, fontSize: 14 }}>{offerTitle}</div>
              <div
                style={{
                  color: headingColor,
                  fontWeight: 800,
                  fontSize: 24,
                  lineHeight: 1.1,
                  marginTop: 2,
                }}
              >
                {offerPrice} Euro*
              </div>
              {offerFootnote ? (
                <div style={{ color: mutedColor, fontSize: 13, marginTop: 4 }}>
                  {offerFootnote}
                </div>
              ) : null}
            </div>

            <button type="button" onClick={goToCheckout} style={primaryCta}>
              Weiter zur Kasse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferCard({
  selected,
  title,
  price,
  description,
  badge,
  hasGift,
  onClick,
}: {
  selected: boolean;
  title: string;
  price: string;
  description?: string;
  badge?: string;
  hasGift?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 18,
        border: selected ? `2px solid ${cardBorder}` : "1px solid #d6d8e1",
        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        padding: "18px 18px 18px",
        textAlign: "left",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {badge ? (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: 18,
            background: headingColor,
            color: "#fff",
            fontSize: 11,
            fontWeight: 800,
            padding: "6px 13px",
            borderRadius: 999,
            letterSpacing: 0.3,
          }}
        >
          {badge}
        </div>
      ) : null}

      <div
        style={{
          color: headingColor,
          fontWeight: 800,
          fontSize: 20,
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          color: headingColor,
          fontWeight: 800,
          fontSize: 26,
        }}
      >
        {price}
      </div>

      <div style={{ marginTop: 2, color: mutedColor, fontSize: 14 }}>
        einmalig
      </div>

      {hasGift ? (
        <div
          style={{
            marginTop: 16,
            background: "#f0effa",
            borderRadius: 10,
            border: "1px solid #cfcfe6",
            padding: "12px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              color: headingColor,
              fontWeight: 800,
              fontSize: 14,
              lineHeight: 1.4,
            }}
          >
            <Gift size={14} color={headingColor} strokeWidth={2} />
            <span>150 Euro Wien Energie-Stromgutschein inklusive</span>
          </div>

          {description ? (
            <div
              style={{
                marginTop: 8,
                color: bodyColor,
                fontSize: 13,
                lineHeight: 1.55,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
      ) : null}

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: bodyColor,
            fontSize: 14,
          }}
        >
          <CheckCircleIcon size={20} />
          <span>2 Jahre Garantie</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: bodyColor,
            fontSize: 14,
          }}
        >
          <Clock size={14} color="#5f61b6" strokeWidth={2} />
          <span>Gültig bis 31.07.2026, nur solange der Vorrat reicht.</span>
        </div>
      </div>
    </button>
  );
}

const primaryCta: CSSProperties = {
  background: "#05057a",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  padding: "15px 28px",
  fontWeight: 800,
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "none",
};

const widePrimaryBtn: CSSProperties = {
  ...primaryCta,
  width: "100%",
  textAlign: "center",
};

const carouselArrowBtn: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.94)",
  color: headingColor,
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const faqGroupBtn: CSSProperties = {
  width: "100%",
  background: "#fff",
  border: "none",
  padding: "20px 22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  color: headingColor,
  fontWeight: 800,
  fontSize: 18,
  textAlign: "left",
};

const faqItemBtn: CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  padding: "10px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  color: headingColor,
  fontWeight: 800,
  fontSize: 16,
  textAlign: "left",
};

const footerHeading: CSSProperties = {
  color: headingColor,
  fontWeight: 800,
  fontSize: 18,
  marginBottom: 12,
};

const footerLinkList: CSSProperties = {
  display: "grid",
  gap: 10,
};

const footerLink: CSSProperties = {
  color: headingColor,
  textDecoration: "none",
  fontSize: 15,
};

const thStyle: CSSProperties = {
  color: "#fff",
  textAlign: "left",
  fontSize: 14,
  fontWeight: 800,
  padding: "12px 14px",
};

const tdStyleLabel: CSSProperties = {
  borderBottom: "1px solid #ececf2",
  padding: "12px 14px",
  color: headingColor,
  fontWeight: 700,
  fontSize: 14,
  verticalAlign: "top",
};

const tdStyleValue: CSSProperties = {
  borderBottom: "1px solid #ececf2",
  padding: "12px 14px",
  color: bodyColor,
  fontSize: 14,
  verticalAlign: "top",
};
