import Script from "next/script";
import { GOOGLE_ADS_ID, medicaoLigada } from "@/lib/conversao";

/** Etiqueta do Google (gtag.js). Só carrega com as duas variáveis do Google Ads definidas. */
export function GoogleAdsTag() {
    if (!medicaoLigada) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}', { allow_ad_personalization_signals: false });`}
            </Script>
        </>
    );
}
