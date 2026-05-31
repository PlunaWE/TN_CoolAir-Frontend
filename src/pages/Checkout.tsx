import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/Container";
import { useOrder } from "@/context/OrderContext";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import {
  prepareBackendCart,
  startCheckout,
  getOrder,
  type CheckoutPayload,
  type OfferKey,
} from "@/lib/api";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useToast } from "@/hooks/use-toast";

const Req = () => <span aria-hidden="true" className="text-we-danger ml-0.5">*</span>;

const escapeHtml = (value: unknown) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const writePaymentTabPage = (
  paymentTab: Window | null,
  title: string,
  message: string,
  details?: unknown,
) => {
  if (!paymentTab) return;

  paymentTab.document.open();
  paymentTab.document.write(`
    <!doctype html>
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 32px;
            color: #00005a;
            line-height: 1.5;
          }
          .box {
            max-width: 760px;
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 24px;
          }
          h1 {
            margin-top: 0;
          }
          pre {
            white-space: pre-wrap;
            background: #f4f4f4;
            padding: 12px;
            border-radius: 8px;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(message)}</p>
          ${details
      ? `<pre>${escapeHtml(
        typeof details === "string" ? details : JSON.stringify(details, null, 2),
      )}</pre>`
      : ""
    }
        </div>
      </body>
    </html>
  `);
  paymentTab.document.close();
};

const Checkout = () => {
  usePageTitle("Kasse – Sommerfrische");

  const navigate = useNavigate();
  const order = useOrder();
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);
  const agbId = useId();
  const installId = useId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);
  const [paymentWindowOpened, setPaymentWindowOpened] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      salutation: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      houseNumber: "",
      plz: "",
      city: "Wien",
      acceptTerms: false as unknown as true,
      acceptInstallation: false as unknown as true,
    },
  });

  const variant = order.variant ?? "choice";
  const offerKey: OfferKey = variant === "choice" ? "stromvorteil" : "solo";
  const variantLabel =
    variant === "choice"
      ? "Midea Portasplit 3,5 kW + Strom-Vorteil"
      : "Midea Portasplit 3,5 kW ohne Strom-Vorteil";

  const productPrice = variant === "choice" ? 949 : 849;
  const deliveryPrice = 79;
  const totalPrice = productPrice + deliveryPrice;

  const fieldState = (name: keyof CheckoutFormData): "default" | "error" | "success" => {
    const fs = form.getFieldState(name, form.formState);
    if (fs.invalid) return "error";
    if (fs.isDirty && !fs.invalid && form.formState.touchedFields[name]) return "success";
    return "default";
  };

  const onInvalid = () => {
    requestAnimationFrame(() => {
      const firstError = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-error="true"]',
      );

      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus?.();
      }
    });
  };

  const buildCheckoutPayload = (values: CheckoutFormData): CheckoutPayload => {
    const name = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();
    const addressLine = `${values.street.trim()} ${values.houseNumber.trim()}`.trim();

    return {
      customer_name: name,
      customer_email: values.email.trim(),
      customer_phone: values.phone.trim(),
      billing_name: name,
      billing_line1: addressLine,
      billing_line2: null,
      billing_city: values.city.trim(),
      billing_postal_code: values.plz.trim(),
      billing_country: "AT",
      shipping_name: name,
      shipping_line1: addressLine,
      shipping_line2: null,
      shipping_city: values.city.trim(),
      shipping_postal_code: values.plz.trim(),
      shipping_country: "AT",
      notes: values.salutation ? `Anrede: ${values.salutation}` : null,
      accept_terms: values.acceptTerms,
      accept_installation_ack: values.acceptInstallation,
    };
  };

  const onValid = async (values: CheckoutFormData) => {
    setIsSubmitting(true);

    const paymentTab = window.open("about:blank", "_blank");
    setPaymentWindowOpened(Boolean(paymentTab));

    writePaymentTabPage(
      paymentTab,
      "Zahlung wird vorbereitet",
      "Bitte warten Sie. Die Zahlungsseite wird geladen.",
    );

    try {
      await prepareBackendCart(offerKey);

      const response = await startCheckout(buildCheckoutPayload(values));
      const redirectUrl = response.payment?.redirect_url;
      const orderId = response.order?.id;

      if (!orderId) {
        writePaymentTabPage(
          paymentTab,
          "Bestellung konnte nicht erstellt werden",
          "Bitte kehren Sie zum Webshop zurück und versuchen Sie es erneut.",
        );

        throw new Error("Die Bestellung konnte nicht erstellt werden.");
      }

      if (!redirectUrl || response.payment?.status === "gateway_error") {
        const gatewayPayload = response.payment?.gateway_payload;

        const gatewayError =
          gatewayPayload?.error ||
          gatewayPayload?.response?.message ||
          gatewayPayload?.response?.error?.message ||
          gatewayPayload?.response?.error ||
          gatewayPayload?.response?.fault?.faultstring ||
          gatewayPayload?.attempts?.[0]?.response?.message ||
          gatewayPayload?.attempts?.[0]?.response?.error?.message ||
          gatewayPayload?.attempts?.[0]?.response?.fault?.faultstring ||
          gatewayPayload;

        writePaymentTabPage(
          paymentTab,
          "Zahlung konnte nicht gestartet werden",
          "Die Zahlungsseite konnte nicht vorbereitet werden. Bitte kehren Sie zum Webshop zurück.",
          gatewayError || "Die Zahlungsseite konnte nicht vorbereitet werden.",
        );

        throw new Error(String(gatewayError));
      }

      setPaymentOrderId(orderId);

      if (paymentTab) {
        paymentTab.opener = null;
        paymentTab.location.href = redirectUrl;
      } else {
        toast({
          title: "Zahlungsfenster wurde blockiert",
          description: "Bitte erlauben Sie Pop-ups für diese Seite und versuchen Sie es erneut.",
          variant: "destructive",
        });

        setPaymentOrderId(null);
        setIsSubmitting(false);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Beim Start der Zahlung ist ein Fehler aufgetreten.";

      toast({
        title: "Zahlung konnte nicht gestartet werden",
        description: message,
        variant: "destructive",
      });

      setPaymentOrderId(null);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!paymentOrderId) return;

    let stopped = false;
    let timeoutId: number | undefined;

    const checkPaymentStatus = async () => {
      try {
        const orderStatus = await getOrder(paymentOrderId);
        const paymentStatus = String(orderStatus.payment_status || "").toLowerCase();

        if (["paid", "succeeded", "success", "completed", "confirmed"].includes(paymentStatus)) {
          stopped = true;
          navigate(`/payment/success?order_id=${encodeURIComponent(paymentOrderId)}`);
          return;
        }

        if (["failed", "failure", "declined"].includes(paymentStatus)) {
          stopped = true;
          navigate(`/payment/failure?order_id=${encodeURIComponent(paymentOrderId)}`);
          return;
        }

        if (["cancelled", "canceled"].includes(paymentStatus)) {
          stopped = true;
          navigate(`/payment/cancel?order_id=${encodeURIComponent(paymentOrderId)}`);
          return;
        }
      } catch {
        // Keep polling. One failed status check should not kill the flow.
      }

      if (!stopped) {
        timeoutId = window.setTimeout(checkPaymentStatus, 3000);
      }
    };

    checkPaymentStatus();

    return () => {
      stopped = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [paymentOrderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 bg-we-surface-muted py-we-section-lg pb-32 focus:outline-none"
      >
        <Container>
          <h1 className="text-we-h-xl font-bold text-we-heading text-center mb-we-section-lg">
            Kasse
          </h1>

          {paymentOrderId && (
            <div className="max-w-3xl mx-auto mb-we-section-lg rounded-we-lg bg-white shadow-we-card p-we-component-lg text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-we-component-sm text-we-brand-secondary" />
              <h2 className="text-we-h-sm font-bold text-we-heading mb-we-component-sm">
                Zahlung wird verarbeitet
              </h2>
              <p className="text-we-body-md text-we-text">
                Die Zahlungsseite wurde in einem neuen Tab geöffnet. Bitte schließen Sie diese
                Seite nicht. Sobald die Zahlung abgeschlossen ist, aktualisieren wir den Status
                automatisch.
              </p>

              {!paymentWindowOpened && (
                <p className="text-we-body-sm text-we-danger mt-we-component-sm">
                  Das Zahlungsfenster wurde möglicherweise vom Browser blockiert.
                </p>
              )}
            </div>
          )}

          <Form {...form}>
            <form
              ref={formRef}
              id="checkout-form"
              onSubmit={form.handleSubmit(onValid, onInvalid)}
              className="grid lg:grid-cols-3 gap-we-section-lg max-w-5xl mx-auto"
              noValidate
            >
              <div className="lg:col-span-2 space-y-we-component-xlg">
                <p className="text-we-body-sm text-we-muted">
                  Mit <span aria-hidden="true" className="text-we-danger">*</span> markierte Felder
                  sind Pflichtfelder.
                </p>

                <section>
                  <h2 className="text-we-h-sm font-bold text-we-heading mb-we-component-md">
                    Persönliche Daten
                  </h2>

                  <p className="text-we-body-sm text-we-muted mb-we-component-md">
                    Nähere Informationen zu Art, Umfang und Zweck der Datenverarbeitungen sowie zu
                    den Rechten auf Auskunft, Berichtigung, Löschung, Einschränkung der
                    Verarbeitung, Widerruf und Übertragbarkeit finden sich auf{" "}
                    <Link to="/datenschutz" className="underline hover:text-we-brand-secondary">
                      www.sommerfrische.wienenergie.at/datenschutz
                    </Link>
                    . Weiters besteht die Möglichkeit einer Kontaktaufnahme unter{" "}
                    <a
                      href="mailto:datenschutz@wienenergie.at"
                      className="underline hover:text-we-brand-secondary"
                    >
                      datenschutz@wienenergie.at
                    </a>{" "}
                    an den Datenschutzbeauftragten sowie an die Österreichische Datenschutzbehörde.
                  </p>

                  <FormField
                    control={form.control}
                    name="salutation"
                    render={({ field }) => (
                      <FormItem className="mb-we-component-md sm:max-w-[33%]">
                        <FormLabel>Anrede</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frau">Frau</SelectItem>
                            <SelectItem value="herr">Herr</SelectItem>
                            <SelectItem value="divers">Divers</SelectItem>
                            <SelectItem value="keine_angabe">Keine Angabe</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-we-component-md">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Vorname
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Vorname"
                              autoComplete="given-name"
                              aria-required="true"
                              state={fieldState("firstName")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nachname
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nachname"
                              autoComplete="family-name"
                              aria-required="true"
                              state={fieldState("lastName")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            E-Mail
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@beispiel.at"
                              autoComplete="email"
                              aria-required="true"
                              state={fieldState("email")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Telefon
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              inputMode="tel"
                              placeholder="+43 ..."
                              autoComplete="tel"
                              aria-required="true"
                              state={fieldState("phone")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <p className="text-we-body-sm text-we-muted mt-we-component-xs mb-we-component-lg">
                  Ihre E-Mail-Adresse und Telefonnummer benötigen wir, um Sie über den Stand ihrer
                  Bestellung zu informieren und mit Ihnen einen Liefertermin zu vereinbaren.
                </p>

                <section>
                  <h2 className="text-we-h-sm font-bold text-we-heading mb-we-component-md">
                    Lieferadresse
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-we-component-md">
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Straße
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Straße"
                              autoComplete="street-address"
                              aria-required="true"
                              state={fieldState("street")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="houseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Hausnummer
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Hausnummer"
                              autoComplete="address-line2"
                              aria-required="true"
                              state={fieldState("houseNumber")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plz"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            PLZ
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1010"
                              autoComplete="postal-code"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={4}
                              aria-required="true"
                              state={fieldState("plz")}
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.value.replace(/\D/g, "").slice(0, 4))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Ort
                            <Req />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Wien"
                              autoComplete="address-level2"
                              aria-required="true"
                              state={fieldState("city")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field, fieldState: fs }) => (
                    <FormItem>
                      <div
                        className={`flex items-start gap-3 p-we-component-md bg-we-surface-subtle rounded-we-lg border ${fs.invalid ? "border-we-danger" : "border-we-border"
                          }`}
                      >
                        <FormControl>
                          <Checkbox
                            id={agbId}
                            checked={field.value === true}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            aria-required="true"
                            data-error={fs.invalid ? "true" : undefined}
                          />
                        </FormControl>
                        <label
                          htmlFor={agbId}
                          className="text-we-body-sm text-we-text cursor-pointer leading-relaxed"
                        >
                          Ich habe die{" "}
                          <Link
                            to="/agb"
                            className="text-we-brand-secondary hover:underline font-normal"
                          >
                            AGB
                          </Link>{" "}
                          gelesen und akzeptiere diese.
                          <Req />
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptInstallation"
                  render={({ field, fieldState: fs }) => (
                    <FormItem>
                      <div
                        className={`flex items-start gap-3 p-we-component-md bg-we-surface-subtle rounded-we-lg border ${fs.invalid ? "border-we-danger" : "border-we-border"
                          }`}
                      >
                        <FormControl>
                          <Checkbox
                            id={installId}
                            checked={field.value === true}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            aria-required="true"
                            data-error={fs.invalid ? "true" : undefined}
                          />
                        </FormControl>
                        <label
                          htmlFor={installId}
                          className="text-we-body-sm text-we-text cursor-pointer leading-relaxed"
                        >
                          Ich nehme zur Kenntnis, dass Wien Energie nicht für die Montage der Midea
                          Portasplit verantwortlich ist und keine Haftung für die korrekte Montage
                          übernimmt. Die Installation erfolgt eigenverantwortlich.
                          <Req />
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <aside className="bg-white rounded-we-lg shadow-we-card p-we-component-lg h-fit lg:order-last order-first">
                <h2 className="text-we-h-sm font-bold text-we-heading mb-we-component-md">
                  Bestellübersicht
                </h2>

                <div className="space-y-3 text-we-body-sm text-we-text">
                  <div className="flex justify-between gap-4">
                    <span className="text-we-muted">Produkt</span>
                    <span className="font-bold text-we-heading text-right">Midea Portasplit</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-we-muted">Angebot</span>
                    <span className="font-bold text-we-heading text-right">{variantLabel}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-we-muted">Zahlung</span>
                    <span className="font-bold text-we-heading">Einmalzahlung</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-we-muted">Produkt</span>
                    <span className="font-bold text-we-heading">
                      {productPrice.toLocaleString("de-AT")} Euro
                      {variant === "choice" ? "*" : ""}
                    </span>
                  </div>

                  <hr className="my-2 border-we-border" />

                  <div className="flex justify-between">
                    <span className="text-we-muted">Lieferung bis zum Aufstellort</span>
                    <span className="font-bold text-we-heading">{deliveryPrice} Euro</span>
                  </div>

                  <hr className="my-3 border-we-border" />

                  <div className="flex justify-between text-we-body-lg font-bold">
                    <span className="text-we-heading">Gesamt</span>
                    <span className="text-we-heading">
                      {totalPrice.toLocaleString("de-AT")} Euro
                    </span>
                  </div>
                </div>

                <div className="mt-we-component-lg space-y-2 border-t border-we-border pt-we-component-md">
                  <div className="flex items-center gap-2 text-we-body-xs text-we-text">
                    <Shield size={14} className="text-we-success flex-shrink-0" />
                    <span>Sichere Zahlung via fiserv.</span>
                  </div>
                </div>
              </aside>
            </form>
          </Form>
        </Container>
      </main>

      <div
        role="region"
        aria-label="Bestell-Aktion"
        className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-we-neutral-90 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] py-we-component-md"
      >
        <Container className="flex items-center justify-between gap-we-component-md">
          <div className="flex flex-col">
            <span className="text-we-body-xs text-we-muted">Gesamt</span>
            <span className="text-we-body-md sm:text-we-body-lg font-bold text-we-heading">
              {totalPrice.toLocaleString("de-AT")} Euro
              {variant === "choice" ? "*" : ""}
            </span>
          </div>

          <div className="flex items-center gap-we-component-sm">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              disabled={isSubmitting || Boolean(paymentOrderId)}
              className="shrink-0"
            >
              Zurück
            </Button>

            <Button
              type="submit"
              form="checkout-form"
              size="lg"
              disabled={isSubmitting || Boolean(paymentOrderId)}
              className="shrink-0"
            >
              {paymentOrderId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Zahlung läuft...</span>
                  <span className="sm:hidden">Zahlung...</span>
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Zahlung wird vorbereitet...</span>
                  <span className="sm:hidden">Lädt...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Weiter zur Zahlung</span>
                  <span className="sm:hidden">Zahlen</span>
                </>
              )}
            </Button>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
