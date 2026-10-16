import { NextResponse } from "next/server";
import { listaAtiva } from "@/lib/lista";

// Recebe a inscrição da caixa "Receba os próximos textos do blog" e repassa para a planilha
// Google da Priscila (Apps Script). O endereço fica só no servidor (LISTA_EMAIL_ENDPOINT).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function texto(v: unknown, max: number): string {
    return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
    // Mesma regra da caixa: sem o endereço ou sem as três decisões da Priscila, não grava.
    const endpoint = process.env.LISTA_EMAIL_ENDPOINT;
    if (!endpoint || !listaAtiva()) {
        return NextResponse.json({ ok: false, erro: "indisponivel" }, { status: 503 });
    }

    let corpo: Record<string, unknown>;
    try {
        corpo = await req.json();
    } catch {
        return NextResponse.json({ ok: false, erro: "invalido" }, { status: 400 });
    }

    // Campo escondido: só robô preenche.
    if (texto(corpo.site, 200)) {
        return NextResponse.json({ ok: true });
    }

    const nome = texto(corpo.nome, 80);
    const email = texto(corpo.email, 120).toLowerCase();
    const whatsapp = texto(corpo.whatsapp, 20).replace(/[^\d+]/g, "");
    const aceiteEmail = corpo.aceiteEmail === true;
    const aceiteWhatsapp = corpo.aceiteWhatsapp === true;

    if (!EMAIL.test(email) || !aceiteEmail) {
        return NextResponse.json({ ok: false, erro: "invalido" }, { status: 400 });
    }
    if (whatsapp && (whatsapp.replace(/\D/g, "").length < 10 || !aceiteWhatsapp)) {
        return NextResponse.json({ ok: false, erro: "invalido" }, { status: 400 });
    }

    try {
        const r = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: new Date().toISOString(),
                nome,
                email,
                whatsapp,
                aceite_email: aceiteEmail,
                aceite_whatsapp: Boolean(whatsapp) && aceiteWhatsapp,
                pagina: texto(corpo.pagina, 200),
            }),
            signal: AbortSignal.timeout(10000),
        });
        const resposta = await r.json().catch(() => null);
        if (!r.ok || !resposta || resposta.ok !== true) {
            return NextResponse.json({ ok: false, erro: "falhou" }, { status: 502 });
        }
    } catch {
        return NextResponse.json({ ok: false, erro: "falhou" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
