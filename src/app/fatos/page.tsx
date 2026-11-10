import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Footer } from "@/components/Footer";
import { BotaoWhatsAppServico } from "@/components/BotaoWhatsAppServico";
import { artigos } from "@/data/artigos";
import { paginasServico } from "@/data/servicos";
import { avisoDeCrise, avisoHomonimas, fatos, fatosConferidoEm, fatosConferidoEmTexto } from "@/lib/fatos";
import { horario, jsonLd, paginaDeFatos, siteUrl } from "@/lib/dados-estruturados";

// Página de fatos: o que é, o que atende, onde fica e como funciona, em frases curtas para consultar e citar.
// Texto das perguntas = src/lib/fatos.ts (o mesmo que vai no FAQPage e no llms.txt). Sem depoimento, sem promessa de resultado.
const titulo = "Fatos sobre a psicóloga Priscila Oliveira | CRP 05/84054";
const descricao =
    "Quem é, o que atende, onde fica e como agendar: fatos sobre a psicóloga Priscila Oliveira de Freitas, CRP 05/84054, do Méier, Rio de Janeiro.";

export const metadata: Metadata = {
    title: { absolute: titulo },
    description: descricao,
    alternates: { canonical: `${siteUrl}/fatos` },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        siteName: "Priscila Oliveira Psicóloga",
        url: `${siteUrl}/fatos`,
        title: titulo,
        description: descricao,
        images: [{ url: `${siteUrl}/og-priscila.png`, width: 1200, height: 630, alt: "Priscila Oliveira – Psicóloga Clínica" }],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [`${siteUrl}/og-priscila.png`] },
};

const DIAS: Record<string, string> = {
    Monday: "Segunda",
    Tuesday: "Terça",
    Wednesday: "Quarta",
    Thursday: "Quinta",
    Friday: "Sexta",
    Saturday: "Sábado",
};

const hora = (h: string) => h.replace(":00", "h");

export default function FatosPage() {
    return (
        <main className="min-h-screen bg-bege">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(paginaDeFatos(titulo, descricao, fatosConferidoEm, fatos)) }}
            />
            <section className="bg-petroleo py-16 px-6 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-bege/70 hover:text-bege-light transition-colors duration-200 mb-8 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao site
                    </Link>
                    <h1 className="font-serif text-4xl font-bold leading-tight text-bege-light sm:text-5xl">
                        Fatos sobre a psicóloga Priscila Oliveira de Freitas
                    </h1>
                    <div className="mt-6 h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-bege/90 font-light max-w-3xl">
                        Quem é, o que atende, onde fica e como agendar, em frases curtas para consultar.
                    </p>
                    <p className="mt-4 text-dourado-light text-sm font-medium">
                        Psicóloga Clínica · CRP 05/84054 · Conferido em {fatosConferidoEmTexto}
                    </p>
                    <div className="mt-10">
                        <BotaoWhatsAppServico texto="Falar no WhatsApp" />
                    </div>
                </div>
            </section>

            <section className="bg-bege-light py-16 px-6">
                <div className="mx-auto max-w-4xl">
                    <p className="rounded-3xl border border-bege-dark/20 bg-white/80 p-6 text-petroleo/80 leading-relaxed">{avisoHomonimas}</p>
                </div>
            </section>

            <section id="perguntas" className="py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">Perguntas e respostas</h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <dl className="mt-8 space-y-8">
                        {fatos.map((f) => (
                            <div key={f.pergunta}>
                                <dt className="font-serif text-xl font-semibold text-petroleo">{f.pergunta}</dt>
                                <dd className="mt-2 text-lg text-petroleo/80 leading-relaxed">{f.resposta}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section id="horario" className="bg-bege-light py-16 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">Horário do consultório</h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <ul className="mt-6 space-y-1 text-lg text-petroleo/80">
                        {horario.map(([dia, abre, fecha]) => (
                            <li key={dia}>
                                {DIAS[dia]}: {hora(abre)} às {hora(fecha)}
                            </li>
                        ))}
                        <li>Domingo: fechado</li>
                    </ul>
                    <p className="mt-4 text-sm text-petroleo/60">Horário do perfil do consultório no Google Maps.</p>
                </div>
            </section>

            <section id="paginas" className="py-16 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl">Para saber mais</h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-dourado" />
                    <ul className="mt-6 space-y-2 text-lg text-petroleo/80">
                        <li>
                            <Link className="underline underline-offset-2" href="/terapia-de-casal-meier">
                                Terapia de casal no Méier
                            </Link>
                        </li>
                        {paginasServico.map((s) => (
                            <li key={s.caminho}>
                                <Link className="underline underline-offset-2" href={`/${s.caminho}`}>
                                    {s.titulo}
                                </Link>
                            </li>
                        ))}
                        {artigos.map((a) => (
                            <li key={a.slug}>
                                <Link className="underline underline-offset-2" href={`/blog/${a.slug}`}>
                                    {a.titulo}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="bg-bege-light py-16 px-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <p className="text-lg text-petroleo/80 leading-relaxed">{avisoDeCrise}</p>
                    <p className="text-sm text-petroleo/60">
                        Fontes: dados do consultório e do site de Priscila Oliveira de Freitas; número de inscrição conferível no{" "}
                        <a
                            className="underline underline-offset-2"
                            href="https://cadastro.cfp.org.br/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Cadastro Nacional de Profissionais de Psicologia
                        </a>{" "}
                        (Conselho Federal de Psicologia). Conferido em {fatosConferidoEmTexto}.
                    </p>
                </div>
            </section>

            <EmergencyBanner />
            <Footer />
        </main>
    );
}
