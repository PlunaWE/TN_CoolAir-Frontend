import type { ReactNode } from "react";
import { BrandShell } from "../components/BrandShell";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";

export function LegalLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <BrandShell>
      <div style={{ background: "#efefef", minHeight: "100vh" }}>
        <SiteHeader />
        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "42px 30px 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h1 style={{ color: "#06066d", fontSize: 48, marginBottom: 12, lineHeight: 1.1 }}>{title}</h1>
            {subtitle ? (
              <p style={{ color: "#7a7a7a", fontStyle: "italic", marginBottom: 34, fontSize: 15 }}>{subtitle}</p>
            ) : null}
            <div style={{ color: "#4f5562", fontSize: 17, lineHeight: 1.72 }}>{children}</div>
          </div>
        </section>
        <Footer />
      </div>
    </BrandShell>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: 34 }}>
      <h2 style={{ color: "#06066d", fontSize: 22, marginBottom: 14 }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function CardBox({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 12,
        padding: "22px 24px",
        margin: "18px 0",
        background: "#f4f4f4",
      }}
    >
      {children}
    </div>
  );
}
