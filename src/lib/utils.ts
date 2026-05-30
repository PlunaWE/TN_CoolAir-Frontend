import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [
        "text-we-text",
        "text-we-text-default",
        "text-we-text-inverse",
        "text-we-text-heading",
        "text-we-text-muted",
        "text-we-heading",
        "text-we-muted",
        "text-we-brand-primary",
        "text-we-brand-secondary",
        "text-we-accent-blue",
        "text-we-accent-gold",
        "text-we-accent-pine-green",
        "text-we-accent-magenta",
        "text-we-info",
        "text-we-success",
        "text-we-danger",
        "text-we-warning",
        { "text-we-neutral": ["10", "20", "30", "40", "50", "60", "70", "80", "90", "95", "99"] },
      ],
      "font-size": [
        "text-we-h-3xl", "text-we-h-2xl", "text-we-h-xl", "text-we-h-lg",
        "text-we-h-md", "text-we-h-sm", "text-we-h-xs", "text-we-h-2xs",
        "text-we-body-xl", "text-we-body-lg", "text-we-body-md",
        "text-we-body-sm", "text-we-body-xs",
      ],
      "bg-color": [
        "bg-we-brand-primary", "bg-we-brand-secondary",
        "bg-we-accent-blue", "bg-we-accent-gold", "bg-we-accent-pine-green", "bg-we-accent-magenta",
        "bg-we-info", "bg-we-success", "bg-we-danger", "bg-we-warning",
        "bg-we-text-inverse", "bg-we-surface-default", "bg-we-surface-muted", "bg-we-surface-subtle",
        { "bg-we-neutral": ["10", "20", "30", "40", "50", "60", "70", "80", "90", "95", "99"] },
      ],
      "border-color": [
        "border-we-brand-primary", "border-we-brand-secondary",
        "border-we-accent-blue", "border-we-accent-gold", "border-we-accent-pine-green", "border-we-accent-magenta",
        "border-we-info", "border-we-success", "border-we-danger", "border-we-warning",
        "border-we-border", "border-we-border-color",
        { "border-we-neutral": ["10", "20", "30", "40", "50", "60", "70", "80", "90", "95", "99"] },
      ],
      "shadow": ["shadow-we-card", "shadow-we-sm", "shadow-we-md", "shadow-we-focus"],
      "rounded": ["rounded-we-sm", "rounded-we-md", "rounded-we-lg", "rounded-we-full"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
