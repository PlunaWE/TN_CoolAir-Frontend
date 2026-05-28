import type { ReactNode } from "react";

export function BrandShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
