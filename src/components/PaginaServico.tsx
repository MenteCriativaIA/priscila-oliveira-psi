import { formatarCRP } from "@/lib/crp";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CreditCard, Laptop, MapPin, MessagesSquare } from "lucide-react";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Footer } from "@/components/Footer";
import { BotaoWhatsAppServico } from "@/components/BotaoWhatsAppServico";
import siteContent from "@/data/site-content.json";
import { jsonLd, servico } from "@/lib/dados-estruturados";

const siteUrl = "https://www.priolivepsi.com.br";

/** Bloco de texto próprio da página (sinais, avisos, como começar). Entra entre "Como funciona" e "Onde e como". */
export interface BlocoServico {
    titulo: string;
    paragrafos?: string[];
    lista?: { texto: string; href?: string }[];
    /** Parágrafos depois da lista. */
    depois?: string[];
    /** Aviso em caixa (ex.: crise, CVV 188). */
    aviso?: string;
    leiaTambem?: { texto: string; href: string };
}

export interface Servico {
    caminho: string;
    titulo: string;
    /** Título do Google e da aba (até ~60 caracteres). O H1 da página continua `titulo`. */
    tituloBusca?: string;
    descricao: string;
    palavras: string[];
    subtitulo: string;
    paraQuem: string;
    comoFunciona: string;
    // Online para todo o Brasil, inclusive crianças e adolescentes (13/10/2026); só casal fica presencial.
    online: boolean;
    blocos?: BlocoServico[];
}

export function metadadosServico(s: Servico): Metadata {
    const url = `${siteUrl}/${s.caminho}`;
    const titulo = s.tituloBusca ?? `${s.titulo} | Priscila Oliveira Psicóloga`;
    return {
        title: { absolute: s.tituloBusca ?? s.titulo },
        description: s.descricao,
        alternates: { canonical: url },
        keywords: s.palavras,
        openGraph: {
            type: "website",
            locale: "pt_BR",
            siteName: "Priscila Oliveira Psicóloga",
            url,
            title: titulo,
            description: s.descricao,
            images: [
                {
                    url: `${siteUrl}/og-priscila.png`,
                    width: 1200,
                    height: 630,
                    alt: "Priscila Oliveira – Psicóloga Clínica",
                },
            ],
        },
        twitter: { card: "summary_large_image", title: titulo, description: s.descricao, images: [`${siteUrl}/og-priscila.png`] },
    };
}

export function PaginaServico({ s }: { s: Servico }) {
    const nome = siteContent.nomeCompleto;
    const crp = formatarCRP(siteContent.crp);
    const duracao = siteContent.investimento.duracaoSessao?.trim() || "50 minutos";
    const endereco = siteContent.endereco
        .split("\n")
        .filter((linha) => linha.trim() && !/online/i.test(linha));

    return (
        <main className="min-h-screen bg-bege">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(servico(s.caminho, s.titulo, s.descricao, s.online)) }}
            />
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
                        {s.titulo}
                    </h1>
                    <div className="mt-6 h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-bege/90 sm:text-xl font-light max-w-3xl">{s.subtitulo}</p>
                    <p className="mt-4 text-dourado-light text-sm font-medium">
                        {nome} · Psicóloga Clínica · {crp}
                    </p>
                    <div className="mt-10">
                        <BotaoWhatsAppServico texto="Falar no WhatsApp" />
                    </div>
                </div>
            </section>

            {/* Para quem é */}
            <section id="para-quem-e" className="bg-bege-light py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">Para quem é</h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-petroleo/80 leading-relaxed">{s.paraQuem}</p>
                </div>
            </section>

            {/* Como funciona */}
            <section id="como-funciona" className="py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">Como funciona</h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-petroleo/80 leading-relaxed">{s.comoFunciona}</p>
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-petroleo/70">Duração da sessão</p>
                                <p className="font-medium text-petroleo">{duracao}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <MessagesSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-petroleo/70">Abordagem</p>
                                <p className="font-medium text-petroleo">Terapia Cognitivo-Comportamental (TCC)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blocos próprios da página */}
            {s.blocos && (
                <section id="mais-sobre-o-tema" className="bg-bege-light py-20 px-6">
                    <div className="mx-auto max-w-4xl space-y-12">
                        {s.blocos.map((b) => (
                            <div key={b.titulo}>
                                <h2 className="font-serif text-2xl font-bold text-petroleo sm:text-3xl">{b.titulo}</h2>
                                <div className="mt-3 h-1 w-12 rounded-full bg-dourado" />
                                {b.paragrafos?.map((t) => (
                                    <p key={t} className="mt-5 text-lg text-petroleo/80 leading-relaxed">
                                        {t}
                                    </p>
                                ))}
                                {b.lista && (
                                    <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-petroleo/80">
                                        {b.lista.map((i) => (
                                            <li key={i.texto}>
                                                {i.href ? (
                                                    <Link className="underline underline-offset-2" href={i.href}>
                                                        {i.texto}
                                                    </Link>
                                                ) : (
                                                    i.texto
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {b.depois?.map((t) => (
                                    <p key={t} className="mt-5 text-lg text-petroleo/80 leading-relaxed">
                                        {t}
                                    </p>
                                ))}
                                {b.aviso && (
                                    <p className="mt-5 rounded-3xl border border-bege-dark/20 bg-white/80 p-6 text-lg text-petroleo/80 leading-relaxed">
                                        {b.aviso}
                                    </p>
                                )}
                                {b.leiaTambem && (
                                    <p className="mt-5 text-lg text-petroleo/80">
                                        <Link className="underline underline-offset-2" href={b.leiaTambem.href}>
                                            {b.leiaTambem.texto}
                                        </Link>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Onde */}
            <section id="onde-fica" className={`${s.blocos ? "" : "bg-bege-light "}py-20 px-6`}>
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">
                        {s.online ? "Onde e como" : "Onde fica o consultório"}
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
                        {s.online && (
                            <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                    <Laptop className="h-5 w-5" />
                                </div>
                                <div className="text-petroleo/80 leading-relaxed">
                                    <p className="font-medium text-petroleo">Também online</p>
                                    <p className="mt-1">Atendimento online para todo o Brasil.</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-4 rounded-3xl bg-white/80 border border-bege-dark/20 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <div className="text-petroleo/80 leading-relaxed">
                                <p className="font-medium text-petroleo">Atendimento particular</p>
                                <p className="mt-1">
                                    Valor sob consulta. Pagamento por PIX, cartão ou transferência. Emito recibo
                                    para você solicitar reembolso.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chamada final */}
            <section className="bg-petroleo py-20 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-serif text-3xl font-bold text-bege-light sm:text-4xl">Vamos conversar?</h2>
                    <p className="mt-6 text-lg text-bege/90 font-light max-w-2xl mx-auto">
                        Me chame no WhatsApp para tirar dúvidas e combinar o primeiro horário.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <BotaoWhatsAppServico texto="Agendar pelo WhatsApp" />
                    </div>
                    <p className="mt-6 text-sm text-bege/80">
                        {nome} · Psicóloga Clínica · {crp}
                    </p>
                </div>
            </section>

            <EmergencyBanner />
            <Footer ocultarOnline={!s.online} />
        </main>
    );
}
