import React from "react";

const SHOW_TEMP_BADGES = true;

interface TemporaryImageBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const TemporaryImageBadge = ({ children, className = "" }: TemporaryImageBadgeProps) => {
  if (!SHOW_TEMP_BADGES) {
    return <>{children}</>;
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      <span
        className="absolute top-2 right-2 z-10 uppercase text-white font-bold tracking-wide rounded-md pointer-events-none"
        style={{
          fontSize: "10px",
          fontFamily: "'Fira Sans', sans-serif",
          background: "rgba(230, 81, 0, 0.9)",
          padding: "4px 10px",
          transform: "rotate(-12deg)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}
      >
        Temporäres Bild
      </span>
    </div>
  );
};

export default TemporaryImageBadge;
