import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShell } from "../components/BrandShell";
import { Footer } from "../components/Footer";
import { useCartApi } from "../hooks/useCartApi";
import { checkoutStart } from "../services/orderService";
import { formatMoney } from "../lib/format";
import { trackEvent } from "../lib/piwik";

type FormState = {
  salutation: string;
  first_name: string;
  last_name: string;
  customer_email: string;
  customer_phone: string;
  street: string;
  house_number: string;
  postal_code: string;
  city: string;
  notes: string;
  accept_terms: boolean;
  accept_installation_ack: boolean;
};

const SHIPPING_PRICE = 79;

const initialForm: FormState = {
  salutation: "",
  first_name: "",
  last_name: "",
  customer_email: "",
  customer_phone: "",
  street: "",
  house_number: "",
  postal_code: "",
  city: "Wien",
  notes: "",
  accept_terms: false,
  accept_installation_ack: false,
};

const pageWidth: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 36px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: 7,
  border: "1px solid #8f929b",
  fontSize: 15,
  background: "#fff",
  boxSizing: "border-box",
  height: 44,
};

const fieldLabel: CSSProperties = {
  color: "#7a7e88",
  fontSize: 12,
  marginBottom: 7,
  display: "block",
};

const checkboxCardStyle: CSSProperties = {
  background: "#f2f2f2",
  border: "1px solid #d7d7d7",
  borderRadius: 12,
  padding: "16px 18px",
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  color: "#5e6370",
  lineHeight: 1.65,
  fontSize: 14,
};

function HeaderBar() {
  return (
    <section style={{ ...pageWidth, paddingTop: 10 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        }}
      >
        <a href="https://www.wienenergie.at/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("navigation", "external_logo_click", "wienenergie_checkout_header")} style={{ width: 230, minHeight: 42, display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/placeholders/logo-wienenergie.svg"
            alt="Wien Energie"
            style={{ width: 190, height: "auto", display: "block", objectFit: "contain" }}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.textContent = "WIEN ENERGIE LOGO";
                parent.style.color = "#666";
                parent.style.fontWeight = "800";
                parent.style.justifyContent = "center";
              }
            }}
          />
        </a>

        <Link to="/" style={{ width: 300, minHeight: 42, display: "flex", alignItems: "center", justifyContent: "flex-end", textDecoration: "none" }}>
          <img
            src="/placeholders/logo-sommerfrische.png"
            alt="Sommerfrische"
            style={{ width: 235, height: "auto", display: "block", objectFit: "contain" }}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.textContent = "SOMMERFRISCHE LOGO";
                parent.style.color = "#666";
                parent.style.fontWeight = "800";
                parent.style.justifyContent = "center";
              }
            }}
          />
        </Link>
      </div>
    </section>
  );
}


function submitHostedPayment(tab: Window | null, action: string, fields: Record<string, string>) {
  if (!tab) throw new Error("Die Zahlungsseite konnte nicht geöffnet werden.");
  const escaped = (value: string) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const inputs = Object.entries(fields)
    .map(([key, value]) => `<input type="hidden" name="${escaped(key)}" value="${escaped(String(value))}" />`)
    .join("");

  tab.document.open();
  tab.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Zahlungsseite wird geöffnet</title></head><body><form id="telecash-connect-form" method="post" action="${escaped(action)}">${inputs}</form><script>document.getElementById('telecash-connect-form').submit();<\/script></body></html>`);
  tab.document.close();
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart } = useCartApi();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const paymentTabRef = useRef<Window | null>(null);

  const cartItem = cart?.items?.[0];
  const subtotal = Number(cartItem?.line_total || 0);
  const total = subtotal + SHIPPING_PRICE;
  const hasStromVorteil = String(cartItem?.offer_key || "").toLowerCase().includes("strom") || String(cartItem?.offer_name || "").toLowerCase().includes("strom-vorteil");
  const cartOfferTitle = String(cartItem?.offer_name || cartItem?.offer_key || "").trim();
  const orderTotal = total;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
        if (!form.first_name.trim()) return "Bitte geben Sie Ihren Vornamen ein.";
    if (!form.last_name.trim()) return "Bitte geben Sie Ihren Nachnamen ein.";
    if (!form.customer_email.trim()) return "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    if (!form.customer_phone.trim()) return "Bitte geben Sie Ihre Telefonnummer ein.";
    if (!form.street.trim()) return "Bitte geben Sie die Straße ein.";
    if (!form.house_number.trim()) return "Bitte geben Sie die Hausnummer ein.";
    if (!form.postal_code.trim()) return "Bitte geben Sie die PLZ ein.";
    if (!form.city.trim()) return "Bitte geben Sie den Ort ein.";
    if (!form.accept_terms) return "Bitte akzeptieren Sie die AGB.";
    if (!form.accept_installation_ack) return "Bitte bestätigen Sie den Hinweis zur Montage.";
    return "";
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      trackEvent("checkout", "validation_error", validationError);
      setError(validationError);
      return;
    }

    setSubmitting(true);
    const paymentTab = paymentTabRef.current && !paymentTabRef.current.closed
      ? paymentTabRef.current
      : window.open("", "_blank");
    paymentTabRef.current = paymentTab;
    trackEvent("checkout", "submit_click", cartOfferTitle || "unknown_offer", orderTotal);

    const fullName = `${form.first_name} ${form.last_name}`.trim();
    const addressLine = `${form.street} ${form.house_number}`.trim();

    const payload = {
      customer_name: fullName,
      customer_email: form.customer_email,
      customer_phone: form.customer_phone,
      billing_name: fullName,
      billing_line1: addressLine,
      billing_line2: "",
      billing_city: form.city,
      billing_postal_code: form.postal_code,
      billing_country: "AT",
      shipping_name: fullName,
      shipping_line1: addressLine,
      shipping_line2: "",
      shipping_city: form.city,
      shipping_postal_code: form.postal_code,
      shipping_country: "AT",
      notes: form.notes,
      accept_terms: form.accept_terms,
      accept_installation_ack: form.accept_installation_ack,
    };

    try {
      const result: any = await checkoutStart(payload);
      const orderId = result?.order?.id;
      const payment = result?.payment || {};
      const redirectUrl = payment?.redirect_url;
      const formAction = payment?.form_action;
      const formFields = payment?.form_fields;

      if (orderId) localStorage.setItem("coolair_last_order_id", orderId);
      if (redirectUrl) localStorage.setItem("coolair_last_payment_link_url", redirectUrl);
      if (formAction && formFields && typeof formFields === "object") {
        trackEvent("checkout", "redirect_to_payment", cartOfferTitle || "unknown_offer", orderTotal, { order_id: orderId });
        submitHostedPayment(paymentTab, formAction, formFields as Record<string, string>);
        paymentTabRef.current = null;
        navigate("/payment/pending", { state: { orderId, paymentUrl: redirectUrl || null } });
        return;
      }
      if (redirectUrl) {
        trackEvent("checkout", "redirect_to_payment", cartOfferTitle || "unknown_offer", orderTotal, { order_id: orderId });
        if (paymentTab) paymentTab.location.href = redirectUrl;
        paymentTabRef.current = null;
        navigate("/payment/pending", { state: { orderId, paymentUrl: redirectUrl } });
        return;
      }

      if (paymentTab) paymentTab.close();
      paymentTabRef.current = null;
      const message = payment?.gateway_payload?.errors?.[0]?.detail || payment?.gateway_payload?.raw || "Die Zahlungsseite konnte nicht erstellt werden.";
      trackEvent("checkout", "payment_link_error", cartOfferTitle || "unknown_offer", undefined, { message });
      setError(message);
    } catch (err: any) {
      if (paymentTab) paymentTab.close();
      paymentTabRef.current = null;
      const message = err?.message || "Checkout fehlgeschlagen.";
      trackEvent("checkout", "request_failed", cartOfferTitle || "unknown_offer", undefined, { message });
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BrandShell>
      <div style={{ background: "#efefef", minHeight: "100vh" }}>
        <HeaderBar />
        <section style={{ ...pageWidth, paddingTop: 26, paddingBottom: 40 }}>
          <h1 style={{ textAlign: "center", color: "#06066d", fontSize: 40, marginBottom: 22 }}>Kasse</h1>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 56, alignItems: "start", justifyContent: "center" }}>
            <form id="checkout-form" onSubmit={onSubmit} style={{ maxWidth: 760 }}>
              <div style={{ color: "#7f7f87", marginBottom: 22, fontSize: 13 }}>Mit <span style={{ color: "#d54d3d" }}>*</span> markierte Felder sind Pflichtfelder.</div>
              <h2 style={{ color: "#06066d", fontSize: 20, marginBottom: 12 }}>Persönliche Daten</h2>
              <div style={{ color: "#707683", fontSize: 14, lineHeight: 1.7, maxWidth: 700, marginBottom: 18 }}>
                Nähere Informationen zu Art, Umfang und Zweck der Datenverarbeitungen sowie zu den Rechten auf
                Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerruf und Übertragbarkeit finden
                sich auf <a href="/datenschutz" style={{ color: "#06066d" }}>www.sommerfrische.wienenergie.at/datenschutz</a>. Weiters besteht die Möglichkeit einer
                Kontaktaufnahme unter <a href="mailto:datenschutz@wienenergie.at" style={{ color: "#06066d" }}>datenschutz@wienenergie.at</a> an den Datenschutzbeauftragten sowie an die
                österreichische Datenschutzbehörde.
              </div>

              <div style={{ maxWidth: 180, marginBottom: 16 }}>
                <label style={fieldLabel}>Anrede</label>
                <select style={{ ...inputStyle }} value={form.salutation} onChange={(e) => update("salutation", e.target.value)}>
                  <option value="">Bitte wählen</option>
                  <option value="Frau">Frau</option>
                  <option value="Herr">Herr</option>
                  <option value="Divers">Divers</option>
                  <option value="Keine Angabe">Keine Angabe</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={fieldLabel}>Vorname<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="Vorname" />
                </div>
                <div>
                  <label style={fieldLabel}>Nachname<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="Nachname" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 10 }}>
                <div>
                  <label style={fieldLabel}>E-Mail<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.customer_email} onChange={(e) => update("customer_email", e.target.value)} placeholder="name@beispiel.at" />
                </div>
                <div>
                  <label style={fieldLabel}>Telefon<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.customer_phone} onChange={(e) => update("customer_phone", e.target.value)} placeholder="+43 ..." />
                </div>
              </div>

              <div style={{ color: "#707683", fontSize: 13, lineHeight: 1.55, maxWidth: 720, marginBottom: 22 }}>
                Ihre E-Mail-Adresse und Telefonnummer benötigen wir, um sie über den Stand ihrer Bestellung zu
                informieren und mit Ihnen einen Liefertermin zu vereinbaren.
              </div>

              <h2 style={{ color: "#06066d", fontSize: 20, marginBottom: 16 }}>Lieferadresse</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 0.95fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={fieldLabel}>Straße<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.street} onChange={(e) => update("street", e.target.value)} placeholder="Straße" />
                </div>
                <div>
                  <label style={fieldLabel}>Hausnummer<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.house_number} onChange={(e) => update("house_number", e.target.value)} placeholder="Hausnummer" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                <div>
                  <label style={fieldLabel}>PLZ<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.postal_code} onChange={(e) => update("postal_code", e.target.value)} placeholder="1010" />
                </div>
                <div>
                  <label style={fieldLabel}>Ort<span style={{ color: "#d54d3d" }}>*</span></label>
                  <input style={inputStyle} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Wien" />
                </div>
              </div>

              <div style={{ display: "grid", gap: 16, maxWidth: 640 }}>
                <label style={checkboxCardStyle}>
                  <input type="checkbox" checked={form.accept_terms} onChange={(e) => update("accept_terms", e.target.checked)} style={{ marginTop: 3 }} />
                  <span>Ich habe die <strong>AGB</strong> gelesen und akzeptiere diese.<span style={{ color: "#d54d3d" }}> *</span></span>
                </label>
                <label style={checkboxCardStyle}>
                  <input type="checkbox" checked={form.accept_installation_ack} onChange={(e) => update("accept_installation_ack", e.target.checked)} style={{ marginTop: 3 }} />
                  <span>Ich nehme zur Kenntnis, dass Wien Energie nicht für die Montage der Midea Portasplit verantwortlich ist und keine Haftung für die korrekte Montage übernimmt. Die Installation erfolgt eigenverantwortlich.<span style={{ color: "#d54d3d" }}> *</span></span>
                </label>
              </div>

              {error ? <div style={{ color: "crimson", marginTop: 16, fontWeight: 700 }}>{error}</div> : null}
            </form>

            <aside style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 10px 24px rgba(0,0,0,0.04)", position: "sticky", top: 24 }}>
              <h3 style={{ marginTop: 0, color: "#06066d", fontSize: 20, marginBottom: 18 }}>Bestellübersicht</h3>
              <div style={{ display: "grid", gap: 13, color: "#6b7180", fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>Produkt</span><strong style={{ color: "#06066d", textAlign: "right" }}>Midea Portasplit</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>Angebot</span><strong style={{ color: "#06066d", textAlign: "right", maxWidth: 130 }}>{cartItem?.offer_name || "–"}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>Zahlung</span><strong style={{ color: "#06066d", textAlign: "right" }}>Einmalzahlung</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>Produkt</span><strong style={{ color: "#06066d", textAlign: "right" }}>{formatMoney(subtotal, "EUR")}</strong></div>
                                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 14, display: "flex", justifyContent: "space-between", gap: 12 }}><span>Lieferung bis zum Aufstellort</span><strong style={{ color: "#06066d", textAlign: "right" }}>{formatMoney(SHIPPING_PRICE, "EUR")}</strong></div>
                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 14, display: "flex", justifyContent: "space-between", gap: 12, fontSize: 16 }}><strong style={{ color: "#06066d" }}>Gesamt</strong><strong style={{ color: "#06066d" }}>{formatMoney(total, "EUR")}</strong></div>
                <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 16, color: "#5b6678", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}><span style={{ color: "#0b8a69" }}>◌</span>Sichere Zahlung via fiserv</div>
              </div>
            </aside>
          </div>
        </section>

        <Footer />

        <div style={{ position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #dadada", padding: "12px 0", boxShadow: "0 -8px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ ...pageWidth, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div>
              <div style={{ color: "#6b7180", fontSize: 12 }}>Gesamt</div>
              <div style={{ color: "#06066d", fontSize: 20, fontWeight: 900 }}>{formatMoney(total, "EUR")}{hasStromVorteil ? "*" : ""}</div>
              {hasStromVorteil ? <div style={{ color: "#6b7180", fontSize: 12, marginTop: 2 }}>* 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.</div> : null}
            </div>
            <button
              type="button"
              onClick={() => {
                if (!paymentTabRef.current || paymentTabRef.current.closed) {
                  paymentTabRef.current = window.open("", "_blank");
                }
                const formEl = document.getElementById("checkout-form") as HTMLFormElement | null;
                formEl?.requestSubmit();
              }}
              disabled={submitting}
              style={{ background: "#06066d", color: "#fff", border: "none", borderRadius: 999, padding: "15px 28px", fontWeight: 900, fontSize: 18, cursor: "pointer", minWidth: 220, opacity: submitting ? 0.75 : 1 }}
            >
              {submitting ? "Wird vorbereitet..." : "Weiter zur Zahlung"}
            </button>
          </div>
        </div>
      </div>
    </BrandShell>
  );
}
