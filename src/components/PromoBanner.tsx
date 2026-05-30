import { useState } from "react";
import { X } from "lucide-react";
import { Container } from "@/components/Container";

const PromoBanner = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-white text-we-heading font-sans border-b border-we-neutral-90">
      <Container className="py-2 flex items-center gap-3">
        <div className="flex-1 text-center">
          <p className="text-we-body-xs sm:text-we-body-sm font-bold">
            <span className="hidden sm:inline">
              Launch-Angebot: Kühlung + Wien Energie-Stromgutschein für 949 Euro* – Gültig bis 31.07.2026, nur solange der Vorrat reicht.
            </span>
            <span className="sm:hidden">
              Kühlung + Stromgutschein für 949 Euro* – Gültig bis 31.07.2026, nur solange der Vorrat reicht.
            </span>
          </p>
          <p className="text-we-body-sm mt-0.5 leading-snug">
            * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
          </p>
        </div>
        <button
          aria-label="Banner schließen"
          onClick={() => setClosed(true)}
          className="p-1 hover:bg-we-heading/10 rounded-we-sm transition-colors focus-visible:outline-none focus-visible:shadow-we-focus"
        >
          <X size={16} />
        </button>
      </Container>
    </div>
  );
};

export default PromoBanner;
