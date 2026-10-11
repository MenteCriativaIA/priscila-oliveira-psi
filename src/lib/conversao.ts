/**
 * Medição de conversão do Google Ads (D6 e GA-Q2 do projeto).
 *
 * A conversão do site é o clique no WhatsApp. Os dois valores saem da conta do
 * Google Ads e entram como variáveis de ambiente na Vercel:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID        ex.: AW-123456789
 *   NEXT_PUBLIC_GOOGLE_ADS_CONVERSAO ex.: o "rótulo" da ação de conversão
 * Sem os dois, nada é carregado e nenhum evento é enviado.
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GOOGLE_ADS_CONVERSAO = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSAO || "";
export const medicaoLigada = Boolean(GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSAO);

type Gtag = (...args: unknown[]) => void;

export function registrarCliqueWhatsApp() {
    if (!medicaoLigada || typeof window === "undefined") return;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSAO}`,
    });
}
