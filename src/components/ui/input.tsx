import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-12 w-full rounded-we-sm border bg-white px-we-component-md py-we-component-sm text-we-body-md text-we-text placeholder:text-we-muted file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus:outline-none disabled:bg-we-surface-muted disabled:text-we-muted disabled:cursor-not-allowed disabled:border-we-neutral-90 read-only:bg-we-surface-muted read-only:cursor-default",
  {
    variants: {
      state: {
        default: "border-we-neutral-50 focus:border-we-brand-secondary focus:shadow-we-focus",
        error: "border-we-danger focus:border-we-danger focus:shadow-we-focus",
        success: "border-we-success focus:border-we-success focus:shadow-we-focus",
        loading: "border-we-neutral-50 pointer-events-none",
        readonly: "border-we-neutral-50 bg-we-surface-muted cursor-default",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, state, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ state }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
