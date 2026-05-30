import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button — migriert auf Wien Energie Design Tokens (we-*).
 *
 * Variants (alle Navy gemäß Wien Energie Style Guide §07):
 *  - default     → Navy Filled, Primary CTA
 *  - secondary   → Navy Outline, Secondary CTA
 *  - outline     → Navy Border, transparenter Background
 *  - ghost       → Nur Text (Navy), Hover-Tint
 *  - destructive → Danger (rot)
 *  - link        → Textlink Navy
 *  - hero        → Navy Filled + Card-Shadow
 *  - accent      → Accent-Blau
 *
 * Hover-Farben kommen aus der Neutral-Scale, da die Tokens keine
 * dedizierten *-hover Werte definieren (Guide: 10 % dunkler ≈ neutral-10/20).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-we-component-sm whitespace-nowrap font-sans text-we-body-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:shadow-we-focus disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-we-brand-secondary text-we-text-inverse hover:bg-we-brand-secondary/90 rounded-we-full",
        destructive:
          "bg-we-danger text-we-text-inverse hover:bg-we-danger/90 rounded-we-full",
        outline:
          "border-2 border-we-brand-secondary bg-transparent text-we-brand-secondary hover:bg-we-brand-secondary/10 rounded-we-full",
        secondary:
          "bg-transparent border-2 border-we-brand-secondary text-we-brand-secondary hover:bg-we-brand-secondary/10 rounded-we-full",
        ghost:
          "bg-transparent text-we-brand-secondary font-bold hover:bg-we-brand-secondary/10",
        link: "text-we-brand-secondary underline-offset-4 hover:underline",
        hero:
          "bg-we-brand-secondary text-we-text-inverse hover:bg-we-brand-secondary/90 rounded-we-full shadow-we-card",
        accent:
          "bg-we-accent-blue text-we-text-inverse hover:bg-we-accent-blue/90 rounded-we-full",
      },
      size: {
        default: "h-11 px-we-component-lg py-we-component-sm",
        sm: "h-9 px-we-component-md py-we-component-sm",
        lg: "h-12 px-we-component-xlg py-we-component-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
