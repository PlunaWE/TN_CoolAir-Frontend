import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Globaler Content-Container.
 * - max-width: 1280px
 * - Horizontales Padding: 16px / 24px (sm) / 32px (md) / 48px (lg+)
 * - Zentriert per mx-auto
 *
 * Verwendung: section-Hintergründe bleiben full-bleed,
 * der Inhalt wird in <Container> gewrappt.
 */
export const Container = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
      className,
    )}
  >
    {children}
  </div>
);

export default Container;
