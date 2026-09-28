import Script from "next/script";
import { publicEnv } from "@/lib/env";

/** Google Analytics and AdSense loaders. Both are no-ops until their env vars are set. */
export function AnalyticsScripts() {
  const ga = publicEnv.gaMeasurementId;
  const ads = publicEnv.adsenseClientId;
  return (
    <>
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {ads && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ads}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
