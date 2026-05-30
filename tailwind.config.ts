import type { Config } from "tailwindcss";

/**
 * Wien Energie Tailwind Configuration
 * ===================================
 * Diese Config bindet die Design Tokens als Tailwind-Utility-Klassen ein.
 * In Lovable: ersetzt die bestehende tailwind.config.ts.
 *
 * Verwendung in Komponenten:
 *   <button class="bg-we-brand-primary text-white rounded-full">
 *   <h1 class="text-we-heading font-sans">
 *   <div class="shadow-we-card rounded-we-lg p-we-component-lg">
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── FARBEN ─────────────────────────────────────────────
      colors: {
        // Wien Energie Brand
        "we-brand-primary": "#EB6828",
        "we-brand-secondary": "#060460",

        // Accents
        "we-accent-blue": "#005797",
        "we-accent-gold": "#F8BE2C",
        "we-accent-pine-green": "#006B5A",
        "we-accent-magenta": "#CD0045",

        // Semantic
        "we-info": "#005797",
        "we-success": "#1C6B4B",
        "we-danger": "#B4271F",
        "we-warning": "#CCA720",

        // Neutral Scale
        "we-neutral": {
          10: "#1B1B1B",
          20: "#303030",
          30: "#474747",
          40: "#5E5E5E",
          50: "#767676",
          60: "#919191",
          70: "#ABABAB",
          80: "#C6C6C6",
          90: "#E2E2E2",
          95: "#F1F1F1",
          99: "#FCFCFC",
        },

        // Aliases
        "we-text": "#5E5E5E",
        "we-heading": "#060460",
        "we-muted": "#767676",
        "we-border-color": "#E2E2E2",

        // Text Aliases (aus tokens.ts / index.css)
        "we-text-default": "#5E5E5E",
        "we-text-inverse": "#FFFFFF",
        "we-text-heading": "#060460",
        "we-text-muted": "#767676",

        // Surface Aliases (aus tokens.ts / index.css)
        "we-surface-default": "#FFFFFF",
        "we-surface-muted": "#FCFCFC",
        "we-surface-subtle": "#F1F1F1",
        "we-border": "#E2E2E2",

        // shadcn Mapping (verwendet HSL-Variablen aus globals.css)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },

      // ── TYPOGRAFIE ─────────────────────────────────────────
      fontFamily: {
        sans: ['"Fira Sans"', "system-ui", "-apple-system", "sans-serif"],
      },

      fontSize: {
        // Headlines (Desktop-Werte; Mobile-Resize via clamp() in CSS)
        // Hinweis: KEIN fontWeight in den Tokens — Weight wird via font-bold/font-normal
        // explizit pro Element gesteuert (saubere Trennung Size ↔ Weight).
        "we-h-3xl":  ["76px", { lineHeight: "94px"   }],
        "we-h-2xl":  ["40px", { lineHeight: "52px"   }],
        "we-h-xl":   ["36px", { lineHeight: "48px"   }],
        "we-h-lg":   ["32px", { lineHeight: "42px"   }],
        "we-h-md":   ["28px", { lineHeight: "36px"   }],
        "we-h-sm":   ["24px", { lineHeight: "32px"   }],
        "we-h-xs":   ["20px", { lineHeight: "28px"   }],
        "we-h-2xs":  ["18px", { lineHeight: "26px"   }],

        // Body
        "we-body-xl": ["20px", { lineHeight: "30px" }],
        "we-body-lg": ["18px", { lineHeight: "28px" }],
        "we-body-md": ["16px", { lineHeight: "24px" }],
        "we-body-sm": ["14px", { lineHeight: "22px" }],
        "we-body-xs": ["12px", { lineHeight: "20px" }],
      },

      // ── SPACING ────────────────────────────────────────────
      spacing: {
        "we-component-sm": "8px",
        "we-component-md": "16px",
        "we-component-lg": "24px",
        "we-component-xlg": "32px",
        "we-section-lg": "40px",
        "we-section-xlg": "80px",
        "we-horizontal-md": "32px",
      },

      // ── RADII ──────────────────────────────────────────────
      borderRadius: {
        "we-sm": "6px",
        "we-md": "8px",
        "we-lg": "12px",
        "we-full": "9999px",
        // shadcn-Standard
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ── SHADOWS ────────────────────────────────────────────
      boxShadow: {
        "we-card": "0px 22px 45px 0px rgba(3, 0, 0, 0.11)",
        "we-sm":   "0px 1px 2px 0px rgba(3, 0, 0, 0.06)",
        "we-md":   "0px 4px 8px 0px rgba(3, 0, 0, 0.08)",
        "we-focus": "0 0 0 3px rgba(0, 87, 151, 0.25)",
      },

      // ── BACKGROUND IMAGES (Gradients) ──────────────────────
      // ⚠️ TODO Stops/Winkel aus Figma final verifizieren
      backgroundImage: {
        "we-gradient-brand-primary":     "linear-gradient(135deg, #060460 0%, #EB6828 100%)",
        "we-gradient-brand-secondary":   "linear-gradient(135deg, #FFFFFF 0%, #EB6828 100%)",
        "we-gradient-accent-blue":       "linear-gradient(135deg, #FFFFFF 0%, #005797 100%)",
        "we-gradient-accent-magenta":    "linear-gradient(135deg, #060460 0%, #CD0045 100%)",
        "we-gradient-accent-pine-green": "linear-gradient(135deg, #060460 0%, #006B5A 100%)",
      },

      // ── BREAKPOINTS ────────────────────────────────────────
      screens: {
        "we-mobile": "360px",
        "we-desktop": "1200px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
