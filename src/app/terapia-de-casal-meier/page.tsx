import { formatarCRP } from "@/lib/crp";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CreditCard, MapPin, MessagesSquare } from "lucide-react";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Footer } from "@/components/Footer";
import siteContent from "@/data/site-content.json";
import { BotaoWhatsApp } from "./BotaoWhatsApp";

const siteUrl = "https://www.priolivepsi.com.br";

export const metadata: Metadata = {
    title: { absolute: "Terapia de casal no Méier" },
    description:
        "Terapia de casal no Méier, Rio de Janeiro, com a psicóloga Priscila Oliveira (CRP 0584054). Atendimento presencial com Terapia Cognitivo-Comportamental (TCC), sessões de 50 minutos.",
    alternates: {
        canonical: `${siteUrl}/terapia-de-casal-meier`,
    },
    // Os campos abaixo substituem os do layout, que falam do atendimento online.
    keywords: [
        "terapia de casal Méier",
        "terapia de casal Rio de Janeiro",
        "psicóloga para casal Méier",
        "psicoterapia de casal",
        "terapia de casal TCC",
        "Priscila Oliveira",
    ],
    openGraph: {
        type: "website",
        locale: "pt_BR",
        siteName: "Priscila Oliveira Psicóloga",
        url: `${siteUrl}/terapia-de-casal-meier`,
        title: "Terapia de casal no Méier | Priscila Oliveira Psicóloga",
        description:
            "Terapia de casal com TCC no consultório do Méier, Rio de Janeiro. Priscila Oliveira, CRP 0584054.",
        images: [
            {
                url: `${siteUrl}/android-chrome-512x512.png`,
                width: 512,
                height: 512,
                alt: "Priscila Oliveira – Psicóloga Clínica",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Terapia de casal no Méier | Priscila Oliveira Psicóloga",
        description:
            "Terapia de casal com TCC no consultório do Méier, Rio de Janeiro. Priscila Oliveira, CRP 0584054.",
    },
};

export default function TerapiaDeCasalMeierPage() {
    const nome = siteContent.nomeCompleto;
    const crp = formatarCRP(siteContent.crp);
    const duracao = siteContent.investimento.duracaoSessao?.trim() || "50 minutos";
    // Só as linhas do endereço físico: esta página fala do atendimento presencial.
    const endereco = siteContent.endereco
        .split("\n")
        .filter((linha) => linha.trim() && !/online/i.test(linha));

    return (
        <main className="min-h-screen bg-bege">
            {/* Cabeçalho */}
            <section className="bg-petroleo py-16 px-6 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-bege/70 hover:text-bege-light transition-colors duration-200 mb-8 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao site
                    </Link>
                    <h1 className="font-serif text-4xl font-bold leading-tight text-bege-light sm:text-5xl md:text-6xl">
                        Terapia de casal no Méier
                    </h1>
                    <div className="mt-6 h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-bege/90 sm:text-xl font-light max-w-3xl">
                        Psicoterapia com acolhimento e Terapia Cognitivo-Comportamental (TCC)
                        para casais: um espaço seguro e livre de julgamentos para vocês dois
                        falarem do que está difícil na relação.
                    </p>
                    <p className="mt-4 text-dourado-light text-sm font-medium">
                        {nome} · Psicóloga Clínica · {crp}
                    </p>
                    <div className="mt-10">
                        <BotaoWhatsApp texto="Falar no WhatsApp" />
                    </div>
                </div>
            </section>

            {/* Para quem é */}
            <section id="para-quem-e" className="bg-bege-light py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">
                        Para quem é
                    </h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-petroleo/80 leading-relaxed">
                        Para casais que querem entender o que está acontecendo entre os dois:
                        quando as conversas viram discussão, quando a distância aumentou, ou
                        quando vocês querem atravessar juntos uma fase de mudança. Nas sessões,
                        os dois têm espaço para falar e para ser ouvidos.
                    </p>
                </div>
            </section>

            {/* Como funciona */}
            <section id="como-funciona" className="py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">
                        Como funciona
                    </h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-petroleo/80 leading-relaxed">
                        A TCC é uma abordagem prática e estruturada. Nas sessões, nós vamos
                        investigar juntos quais pensamentos (crenças) estão gerando sofrimento
                        ou comportamentos que atrapalham a relação. O objetivo não é apenas
                        &quot;desabafar&quot; nem apontar culpados, mas trabalhar a comunicação
                        entre vocês dois, com ferramentas concretas para o dia a dia.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-petroleo/60">Duração da sessão</p>
                                <p className="font-medium text-petroleo">{duracao}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <MessagesSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-petroleo/60">Abordagem</p>
                                <p className="font-medium text-petroleo">
                                    Terapia Cognitivo-Comportamental (TCC)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Onde e como agendar */}
            <section id="onde-fica" className="bg-bege-light py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">
                        Onde fica o consultório
                    </h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <p className="text-petroleo/80 leading-relaxed">
                                {endereco.map((linha, i) => (
                                    <span key={i} className="block">
                                        {linha}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <div className="text-petroleo/80 leading-relaxed">
                                <p className="font-medium text-petroleo">Atendimento particular</p>
                                <p className="mt-1">
                                    Valor sob consulta. Pagamento por PIX, cartão ou
                                    transferência. Emito recibo para vocês solicitarem reembolso.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chamada final */}
            <section className="bg-petroleo py-20 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-serif text-3xl font-bold text-bege-light sm:text-4xl">
                        Vamos conversar?
                    </h2>
                    <p className="mt-6 text-lg text-bege/90 font-light max-w-2xl mx-auto">
                        Será um prazer acolher vocês. Me chame no WhatsApp para tirar dúvidas
                        e combinar o primeiro horário.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <BotaoWhatsApp texto="Agendar pelo WhatsApp" />
                    </div>
                    <p className="mt-6 text-sm text-bege/60">
                        {nome} · Psicóloga Clínica · {crp}
                    </p>
                </div>
            </section>

            <EmergencyBanner />
            <Footer ocultarOnline />
        </main>
    );
}
