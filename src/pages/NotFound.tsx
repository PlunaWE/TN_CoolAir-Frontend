import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";

const NotFound = () => {
  const location = useLocation();
  usePageTitle("Seite nicht gefunden – Sommerfrische");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-we-surface-muted focus:outline-none">
      <div className="text-center">
        <h1 className="mb-4 text-we-h-2xl font-bold text-we-heading">404</h1>
        <p className="mb-4 text-we-body-lg text-we-text">Seite nicht gefunden</p>
        <a href="/" className="text-we-brand-secondary font-normal hover:underline">
          Zurück zur Startseite
        </a>
      </div>
    </main>
  );
};

export default NotFound;
