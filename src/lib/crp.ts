// CRP no formato que o Código de Ética e o anúncio usam: "CRP 05/84054".
// O painel guarda só os dígitos ("0584054"): os 2 primeiros são a região.
// Se já vier com barra ou com "CRP" na frente, só padroniza.
export function formatarCRP(bruto: string | undefined | null): string {
    const s = (bruto ?? "").replace(/^\s*crp\s*/i, "").trim();
    if (!s) return "";
    if (s.includes("/")) return `CRP ${s}`;
    const d = s.replace(/\D/g, "");
    return d.length > 2 ? `CRP ${d.slice(0, 2)}/${d.slice(2)}` : `CRP ${s}`;
}
