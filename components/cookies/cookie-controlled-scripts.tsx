"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  type CookieConsentPreferences
} from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export function CookieControlledScripts() {
  const [consent, setConsent] = useState<CookieConsentPreferences | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setConsent(readCookieConsent());

    const syncConsent = () => {
      setConsent(readCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const analyticsEnabled = Boolean(consent?.analytics && gaMeasurementId);
  const marketingEnabled = Boolean(consent?.marketing && metaPixelId);

  useEffect(() => {
    if (!analyticsEnabled || !gaMeasurementId || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("config", gaMeasurementId, {
      anonymize_ip: true,
      page_path: `${pathname}${window.location.search}`
    });
  }, [analyticsEnabled, gaMeasurementId, pathname]);

  return (
    <>
      {analyticsEnabled && gaMeasurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {marketingEnabled && metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}
