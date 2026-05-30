import { z } from "zod";

const NAME_REGEX = /^[a-zA-ZäöüÄÖÜß\s'-]+$/;

export const checkoutSchema = z.object({
  salutation: z.enum(["frau", "herr", "divers", "keine_angabe"]).optional(),
  firstName: z
    .string()
    .min(2, "Bitte geben Sie Ihren Vornamen ein.")
    .regex(NAME_REGEX, "Bitte geben Sie Ihren Vornamen ein."),
  lastName: z
    .string()
    .min(2, "Bitte geben Sie Ihren Nachnamen ein.")
    .regex(NAME_REGEX, "Bitte geben Sie Ihren Nachnamen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z
    .string()
    .min(1, "Bitte geben Sie Ihre Telefonnummer ein.")
    .regex(/^(\+43|0)[1-9]\d{8,}$/, "Bitte geben Sie eine gültige Telefonnummer ein."),
  street: z.string().min(2, "Bitte geben Sie Ihre Straße ein."),
  houseNumber: z.string().min(1, "Bitte geben Sie Ihre Hausnummer ein."),
  plz: z
    .string()
    .regex(/^\d{4}$/, "Bitte eine gültige Postleitzahl eingeben.")
    .refine(
      (val) => {
        const num = parseInt(val, 10);
        return num >= 1000 && num <= 9999;
      },
      "Leider liefern wir aktuell nur innerhalb Österreichs.",
    ),
  city: z.string().min(2, "Bitte geben Sie Ihren Wohnort ein."),
  acceptTerms: z.literal(true, {
    errorMap: () => ({
      message: "Bitte akzeptieren Sie die AGB und Datenschutzbestimmungen.",
    }),
  }),
  acceptInstallation: z.literal(true, {
    errorMap: () => ({
      message: "Bitte bestätigen Sie, dass Wien Energie nicht für die Montage verantwortlich ist.",
    }),
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
