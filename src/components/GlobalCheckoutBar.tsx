import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/context/OrderContext";
import { Container } from "@/components/Container";

const PRICES: Record<string, { einmal: number; label: string }> = {
  choice: { einmal: 949, label: "Midea Portasplit 3,5 kW + Strom-Vorteil" },
  solo: { einmal: 849, label: "Midea Portasplit 3,5 kW ohne Strom-Vorteil" },
};

const GlobalCheckoutBar = () => {
  const navigate = useNavigate();
  const { variant, paymentMethod } = useOrder();
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);

  const visible = variant !== null && paymentMethod !== null;

  useEffect(() => {
    if (!visible || !barRef.current) {
      document.body.style.paddingBottom = "";
      return;
    }
    const el = barRef.current;
    const update = () => setBarHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  useEffect(() => {
    if (visible && barHeight > 0) {
      document.body.style.paddingBottom = `${barHeight + 16}px`;
    } else {
      document.body.style.paddingBottom = "";
    }
  }, [visible, barHeight]);

  if (!visible || !variant) return null;

  const info = PRICES[variant];
  const priceText = `${info.einmal.toLocaleString("de-AT")} Euro`;

  return (
    <div
      ref={barRef}
      role="region"
      aria-label="Bestell-Aktion"
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-we-neutral-90 shadow-[0_-2px_12px_rgba(3,0,0,0.06)] py-we-component-md transition-opacity duration-200"
    >
      <Container className="flex items-center justify-between gap-we-component-md">
        <div className="flex flex-col min-w-0">
          <span className="text-we-body-xs text-we-muted truncate">{info.label}</span>
          <span className="text-we-body-md sm:text-we-body-lg font-bold text-we-heading">
            {priceText}{variant === "choice" ? "*" : ""}
          </span>
          {variant === "choice" && (
            <span className="text-we-body-sm text-we-text leading-snug mt-0.5">
              * 150-Euro-Gutschein nur für Wien Energie-Stromkund*innen einlösbar.
            </span>
          )}
        </div>
        <Button
          variant="default"
          size="lg"
          className="shrink-0"
          onClick={() => navigate("/checkout")}
        >
          <span className="hidden sm:inline">Weiter zur Kasse</span>
          <span className="sm:hidden">Zur Kasse</span>
          
        </Button>
      </Container>
    </div>
  );
};

export default GlobalCheckoutBar;
