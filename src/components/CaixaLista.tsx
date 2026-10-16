"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

// Caixa de inscrição da lista (M49). Só é colocada na página quando a lista está ligada
// (ver src/lib/lista.ts); nunca aparece um formulário que finge gravar.
export function CaixaLista({ pagina }: { pagina: string }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [aceiteEmail, setAceiteEmail] = useState(false);
    const [aceiteWhatsapp, setAceiteWhatsapp] = useState(false);
    const [site, setSite] = useState("");
    const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "erro">("livre");

    const temWhatsapp = whatsapp.trim().length > 0;

    async function enviar(e: React.FormEvent) {
        e.preventDefault();
        setEstado("enviando");
        try {
            const r = await fetch("/api/lista", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, whatsapp, aceiteEmail, aceiteWhatsapp: temWhatsapp && aceiteWhatsapp, site, pagina }),
            });
            const j = await r.json().catch(() => null);
            setEstado(r.ok && j?.ok === true ? "ok" : "erro");
        } catch {
            setEstado("erro");
        }
    }

    if (estado === "ok") {
        return (
            <div id="lista" className="rounded-3xl border border-dourado/40 bg-white/80 p-8 text-petroleo">
                <p className="font-serif text-2xl font-bold">Inscrição feita.</p>
                <p className="mt-2 text-petroleo/80">Quando eu publicar um texto novo no blog, envio para você. Para sair da lista, é só responder pedindo.</p>
            </div>
        );
    }

    const campo = "w-full rounded-xl border border-bege-dark/30 bg-white px-4 py-3 text-petroleo placeholder:text-petroleo/40 focus:border-dourado focus:outline-none";

    return (
        <form id="lista" onSubmit={enviar} className="flex flex-col gap-5 rounded-3xl border border-dourado/40 bg-white/80 p-6 sm:p-8">
            <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-petroleo text-bege-light">
                    <Mail className="h-5 w-5" />
                </span>
                <div>
                    <h2 className="font-serif text-2xl font-bold text-petroleo">Receba os próximos textos do blog</h2>
                    <p className="mt-1 text-petroleo/80">Quando eu publicar um texto novo, envio para você. Você sai da lista quando quiser.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-petroleo/80">
                    Nome (opcional)
                    <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80} autoComplete="given-name" />
                </label>
                <label className="flex flex-col gap-1 text-sm text-petroleo/80">
                    E-mail
                    <input className={campo} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} autoComplete="email" />
                </label>
                <label className="flex flex-col gap-1 text-sm text-petroleo/80 sm:col-span-2">
                    WhatsApp (opcional)
                    <input className={campo} type="tel" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} maxLength={20} placeholder="(21) 9…" autoComplete="tel" />
                </label>
            </div>

            {/* Campo escondido contra robôs. */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={site} onChange={(e) => setSite(e.target.value)} />

            <label className="flex items-start gap-3 text-sm text-petroleo/85">
                <input type="checkbox" required checked={aceiteEmail} onChange={(e) => setAceiteEmail(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--site-primary)]" />
                <span>Aceito receber por e-mail os textos novos do blog, como explica a <Link href="/politica-de-privacidade#lista" className="text-dourado-dark underline">Política de Privacidade</Link>.</span>
            </label>
            <label className={`flex items-start gap-3 text-sm ${temWhatsapp ? "text-petroleo/85" : "text-petroleo/50"}`}>
                <input type="checkbox" required={temWhatsapp} disabled={!temWhatsapp} checked={temWhatsapp && aceiteWhatsapp} onChange={(e) => setAceiteWhatsapp(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--site-primary)]" />
                <span>Aceito receber os textos novos também pelo WhatsApp (só vale se você preencher o número acima).</span>
            </label>

            <p className="text-xs text-petroleo/70">Não escreva aqui nada sobre a sua saúde. Para conversar sobre atendimento, use o WhatsApp.</p>

            <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={estado === "enviando"} className="rounded-full bg-petroleo px-6 py-3 font-medium text-bege-light transition-colors hover:bg-petroleo-dark disabled:opacity-60">
                    {estado === "enviando" ? "Enviando…" : "Quero receber"}
                </button>
                {estado === "erro" && <p className="text-sm text-red-700" role="alert">Não consegui gravar agora. Tente de novo mais tarde.</p>}
            </div>
        </form>
    );
}
