/**
 * Wien Energie Design Tokens
 * ===========================
 * Single Source of Truth für das Wien Energie UI-Design-System.
 * Quelle: UI Style Guidelines (Kundenkonto - MWE), extrahiert aus
 * der offiziellen PDF-Dokumentation.
 *
 * Regel: ALLE Komponenten referenzieren ausschließlich diese Tokens.
 * Keine inline Hex-Werte, keine px-Werte direkt im Code.
 *
 * Kennzeichnung:
 *   ✅ = direkt aus dem offiziellen Guide übernommen
 *   ⚠️  TODO = aus Figma/Live-App nachzutragen, mit konservativem Default vorbelegt
 */

export const tokens = {
  // ============================================================
  // FARBEN
  // ============================================================
  color: {
    // ── Brand Colors ──────────────────────────────────────────
    brand: {
      primary: "#EB6828",   // ✅ color/brand/orange/60
      secondary: "#060460", // ✅ color/brand/blue/10
    },

    // ── Accent Colors ─────────────────────────────────────────
    accent: {
      blue: "#005797",      // ✅ color/blue/40
      gold: "#F8BE2C",      // ✅ color/gold/80
      pineGreen: "#006B5A", // ✅ color/pine-green/40
      magenta: "#CD0045",   // ✅ color/magenta/40
    },

    // ── Semantic Colors ───────────────────────────────────────
    semantic: {
      information: "#005797", // ✅ color/blue/40
      success: "#1C6B4B",     // ✅ color/green/40
      danger: "#B4271F",      // ✅ color/red/40
      warning: "#CCA720",     // ✅ color/yellow/70
    },

    // ── Neutral / Grayscale ───────────────────────────────────
    neutral: {
      10: "#1B1B1B",
      20: "#303030",
      30: "#474747",
      40: "#5E5E5E", // Default text color
      50: "#767676",
      60: "#919191",
      70: "#ABABAB",
      80: "#C6C6C6",
      90: "#E2E2E2",
      95: "#F1F1F1",
      99: "#FCFCFC",
      black: "#000000",
      white: "#FFFFFF",
    },

    // ── Surface / Background Aliases ──────────────────────────
    // Praktische Aliase für UI-Layer (basierend auf Neutral-Skala).
    surface: {
      default: "#FFFFFF",
      muted: "#FCFCFC",   // neutral/99
      subtle: "#F1F1F1",  // neutral/95
      border: "#E2E2E2",  // neutral/90
    },

    // ── Text Aliases ──────────────────────────────────────────
    text: {
      default: "#5E5E5E",   // neutral/40 (per Style Guide default)
      heading: "#060460",   // brand-secondary (per Headlines spec)
      muted: "#767676",     // neutral/50
      inverse: "#FFFFFF",
      onBrand: "#FFFFFF",
    },
  },

  // ── Gradients ───────────────────────────────────────────────
  // ⚠️ TODO Stops/Winkel aus Figma verifizieren. Werte unten sind
  //   visuell aus dem Guide abgeleitet — funktional korrekt, aber
  //   für 100%-Genauigkeit final gegenchecken.
  gradient: {
    brandPrimary:    "linear-gradient(135deg, #060460 0%, #EB6828 100%)", // ⚠️ TODO
    brandSecondary:  "linear-gradient(135deg, #FFFFFF 0%, #EB6828 100%)", // ⚠️ TODO
    accentBlue:      "linear-gradient(135deg, #FFFFFF 0%, #005797 100%)", // ⚠️ TODO
    accentMagenta:   "linear-gradient(135deg, #060460 0%, #CD0045 100%)", // ⚠️ TODO
    accentPineGreen: "linear-gradient(135deg, #060460 0%, #006B5A 100%)", // ⚠️ TODO
    blackOpacity:    "linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
    whiteOpacity:    "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
  },

  // ============================================================
  // TYPOGRAFIE
  // ============================================================
  // Default: Fira Sans, Bold, line-height 1.3em, color brand-secondary
  // Mobile-Resize folgt RFS-Logik (https://github.com/twbs/rfs)
  // — Werte gelten für viewport ≥ 1200px (Desktop) bzw. 360px (Mobile).
  font: {
    family: {
      sans: '"Fira Sans", system-ui, -apple-system, sans-serif', // ✅
    },
    weight: {
      regular: 400,
      bold: 700, // ✅ Default für Headlines
    },
    letterSpacing: {
      none: "0",
    },

    // ── Headlines (Desktop / Mobile @ 360px) ──────────────────
    headline: {
      "3xl":  { sizeDesktop: "76px",   lineHeight: "94px",   sizeMobile: "40.72px", weight: 700 }, // ✅ default
      "2xl":  { sizeDesktop: "40px",   lineHeight: "52px",   sizeMobile: "27.40px", weight: 700 }, // ✅
      "xl":   { sizeDesktop: "36px",   lineHeight: "48px",   sizeMobile: "25.92px", weight: 700 }, // ✅ H1
      "lg":   { sizeDesktop: "32px",   lineHeight: "42px",   sizeMobile: "24.44px", weight: 700 }, // ✅ H2
      "md":   { sizeDesktop: "28px",   lineHeight: "36px",   sizeMobile: "22.96px", weight: 700 }, // ✅ H3
      "sm":   { sizeDesktop: "24px",   lineHeight: "32px",   sizeMobile: "24px",    weight: 700 }, // ✅ H4 (kein Resize)
      "xs":   { sizeDesktop: "20px",   lineHeight: "28px",   sizeMobile: "20px",    weight: 700 }, // ✅ H5
      "2xs":  { sizeDesktop: "18px",   lineHeight: "26px",   sizeMobile: "18px",    weight: 700 }, // ✅ H6
    },

    // ── Body ──────────────────────────────────────────────────
    body: {
      xl: { size: "20px", lineHeight: "30px", weight: 400 }, // ✅
      lg: { size: "18px", lineHeight: "28px", weight: 400 }, // ✅
      md: { size: "16px", lineHeight: "24px", weight: 400 }, // ✅ Default
      sm: { size: "14px", lineHeight: "22px", weight: 400 }, // ✅
      xs: { size: "12px", lineHeight: "20px", weight: 400 }, // ✅
      // Body Bold (gleiche Sizes, weight 700)
      // Body Underline (gleiche Sizes, mit text-decoration: underline)
      // Body xs Legal: 12px / 20px / italic / regular
    },
  },

  // ============================================================
  // SPACING
  // ============================================================
  spacing: {
    // ── Vertikal ──────────────────────────────────────────────
    verticalPaddingMd: "24px", // ✅ space/vertical/padding/md

    // Vertikal zwischen Komponenten
    componentSm:  "8px",  // ✅
    componentMd:  "16px", // ✅
    componentLg:  "24px", // ✅
    componentXlg: "32px", // ✅

    // Vertikal zwischen Sections
    sectionLgDesktop:  "40px", // ✅ space/vertical/heading-bottom/lg
    sectionXlgDesktop: "80px", // ✅ space/vertical/section-footer/xlg
    sectionLgMobile:   "32px", // ✅
    sectionXlgMobile:  "40px", // ✅

    // ── Horizontal ────────────────────────────────────────────
    horizontalMd: "32px", // ✅ space/horizontal/spacing/md
  },

  // ============================================================
  // RADIUS
  // ============================================================
  radius: {
    none: "0",
    sm: "6px",      // ⚠️ TODO Inputs/Toasts — visuell ~6px, aus Figma final
    md: "8px",      // ⚠️ TODO Inline Notifications/Infoboxes
    lg: "12px",     // ✅ Cards (explizit dokumentiert: "Border Radius 12px")
    full: "9999px", // ✅ Buttons sind pill-shaped
  },

  // ============================================================
  // SHADOWS
  // ============================================================
  shadow: {
    // ✅ Card-Schatten explizit aus Guide:
    //   box-shadow: 0px 22px 45px 0px #0300001C
    card: "0px 22px 45px 0px rgba(3, 0, 0, 0.11)",

    // ⚠️ TODO Buttons/Dropdowns/Modals — aus Figma final ergänzen.
    sm:   "0px 1px 2px 0px rgba(3, 0, 0, 0.06)",
    md:   "0px 4px 8px 0px rgba(3, 0, 0, 0.08)",
    focus: "0 0 0 3px rgba(0, 87, 151, 0.25)", // accent/blue mit 25% Alpha
  },

  // ============================================================
  // BREAKPOINTS
  // ============================================================
  // Wien Energie Resize-Skala referenziert 360px (Mobile) und
  // ≥1200px (Desktop) als Anker. Die Standard-Tailwind-Breakpoints
  // funktionieren dazwischen kompatibel.
  breakpoint: {
    sm: "360px",   // Mobile-Anker
    md: "768px",
    lg: "1024px",
    xl: "1200px",  // Desktop-Anker
    "2xl": "1536px",
  },

  // ============================================================
  // BUTTON HIERARCHY
  // ============================================================
  // Pyramide aus dem Guide (Sektion 07.1):
  //   Filled  = primary  / high emphasis
  //   Outline = secondary / medium emphasis  ← WE-Empfehlung als Default
  //   Ghost   = tertiary  / low emphasis
  // Begründung WE: Outline harmoniert besser mit der Marke und ist
  // ebenso accessibility-konform wie Filled.
  button: {
    hierarchy: ["filled", "outline", "ghost"] as const,
  },
} as const;

export type Tokens = typeof tokens;
export default tokens;
