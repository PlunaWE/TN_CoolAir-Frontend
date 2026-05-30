import { Check } from "lucide-react";

interface CheckBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const iconSize = {
  sm: 12,
  md: 14,
  lg: 18,
};

export const CheckBadge = ({ size = "md", className = "" }: CheckBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-we-accent-pine-green flex-shrink-0 ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <Check className="text-white" size={iconSize[size]} strokeWidth={3} />
    </span>
  );
};

export default CheckBadge;
