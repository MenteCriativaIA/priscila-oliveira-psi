/**
 * Telefone no formato que o wa.me exige: só dígitos, com país (55) e DDD.
 *
 * O painel de configuração aceita o número digitado à mão. Em 10/2026 ele estava
 * salvo como "973706270" (sem 55 e sem 21) e o wa.me lia "973" como o código do
 * Bahrein: os botões de WhatsApp do site abriam uma conversa com outro país.
 * Aqui o número curto é completado com o DDD 21 (Rio) e o país 55.
 */
const DDD_PADRAO = "21";

export function telefoneWhatsApp(bruto: string | undefined, reserva = "5511999999999"): string {
    const d = (bruto || "").replace(/\D/g, "");
    if (!d) return reserva;
    if (d.length === 8 || d.length === 9) return `55${DDD_PADRAO}${d}`;
    if (d.length === 10 || d.length === 11) return `55${d}`;
    return d;
}

export function linkWhatsApp(bruto: string | undefined, mensagem: string): string {
    return `https://wa.me/${telefoneWhatsApp(bruto)}?text=${encodeURIComponent(mensagem)}`;
}
