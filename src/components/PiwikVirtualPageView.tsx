import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { createVirtualPageViewPayload, pushVirtualPageView } from "@/lib/piwik";

const getInitialReferrer = () => {
  if (typeof document === "undefined" || !document.referrer) return "";

  try {
    const referrer = new URL(document.referrer);

    if (referrer.origin === window.location.origin) {
      return `${referrer.pathname}${referrer.search}${referrer.hash}`;
    }

    return document.referrer;
  } catch {
    return document.referrer;
  }
};

const PiwikVirtualPageView = () => {
  const location = useLocation();
  const previousVirtualUrlRef = useRef<string>(getInitialReferrer());

  useEffect(() => {
    const currentUrl = `${location.pathname}${location.search}${location.hash}`;
    const payload = createVirtualPageViewPayload(location.pathname, previousVirtualUrlRef.current);

    pushVirtualPageView({
      ...payload,
      url: currentUrl,
    });

    previousVirtualUrlRef.current = currentUrl;
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default PiwikVirtualPageView;