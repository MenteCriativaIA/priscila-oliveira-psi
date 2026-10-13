import { formatarCRP } from "@/lib/crp";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    Flag,
    Heart,
    Hourglass,
    Laptop,
    Lightbulb,
    MapPin,
    MessageSquare,
    Phone,
    ReceiptText,
    RefreshCw,
    UserCheck,
    Wallet,
    Activity,
    type LucideIcon,
} from "lucide-react";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Footer } from "@/components/Footer";
import { BotaoWhatsAppServico } from "@/components/BotaoWhatsAppServico";
import { artigoPorSlug, artigos } from "@/data/artigos";
import siteContent from "@/data/site-content.json";
import { artigo, jsonLd } from "@/lib/dados-estruturados";

const siteUrl = "https://www.priolivepsi.com.br";

// Ícone de cada seção, pela palavra do título (o mesmo critério dos PDFs dos artigos).
const ICONES: [string, LucideIcon][] = [
    ["crise", Phone],
    ["valor", Wallet],
    ["onde", MapPin],
    ["quanto tempo", Hourglass],
    ["sessões", MessageSquare],
    ["quando", Flag],
    ["sinais", Activity],
    ["para quem", UserCheck],
    ["pensamentos", RefreshCw],
    ["tcc trabalha", RefreshCw],
    ["ideia", Lightbulb],
    ["o que é", Lightbulb],
    ["emoção", Heart],
];

function iconeDaSecao(titulo: string): LucideIcon {
    const t = titulo.toLowerCase();
    return ICONES.find(([chave]) => t.includes(chave))?.[1] ?? MessageSquare;
}

export function generateStaticParams() {
    return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const a = artigoPorSlug(slug);
    if (!a) return {};
    const url = `${siteUrl}/blog/${a.slug}`;
    return {
        title: { absolute: a.titulo },
        description: a.resumo,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            locale: "pt_BR",
            siteName: "Priscila Oliveira Psicóloga",
            url,
            title: `${a.titulo} | Priscila Oliveira Psicóloga`,
            description: a.resumo,
            images: [{ url: `${siteUrl}/android-chrome-512x512.png`, width: 512, height: 512, alt: "Priscila Oliveira – Psicóloga Clínica" }],
        },
        twitter: { card: "summary", title: `${a.titulo} | Priscila Oliveira Psicóloga`, description: a.resumo },
    };
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const a = artigoPorSlug(slug);
    if (!a) notFound();

    const nome = siteContent.nomeCompleto;
    const crp = formatarCRP(siteContent.crp);
    const palavras = [...a.abertura, ...a.secoes.flatMap((s) => s.paragrafos)].join(" ").split(/\s+/).length;
    const minutos = Math.max(1, Math.round(palavras / 200));
    const comeco = a.secoes.find((s) => s.titulo.toLowerCase().includes("começar"));
    const secoes = a.secoes.filter((s) => s !== comeco);
    const data = new Date(`${a.data}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

    const cards: [LucideIcon, string, string][] = [
        [Clock, "Sessão", "50 minutos"],
        [MapPin, "Consultório", "Rua Dias da Cruz, 185, sala 207 · Méier"],
        ...(a.online ? [[Laptop, "Online", "Para todo o Brasil"] as [LucideIcon, string, string]] : []),
        [ReceiptText, "Particular", "Valor sob consulta, com recibo para reembolso"],
    ];

    return (
        <main className="min-h-screen bg-bege">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(artigo(a)) }} />
            <header className="bg-petroleo py-16 px-6 md:py-20">
                <div className="mx-auto max-w-3xl">
                    <Link href="/#blog" className="inline-flex items-center gap-2 text-bege/80 hover:text-bege-light transition-colors duration-200 mb-8 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao site
                    </Link>
                    <p className="text-xs uppercase tracking-[0.14em] text-dourado-light">Blog · {a.categoria}</p>
                    <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-bege-light sm:text-5xl text-balance">{a.titulo}</h1>
                    <div className="mt-6 h-1 w-16 rounded-full bg-dourado" />
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bege/85">
                        <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-dourado" />Leitura de {minutos} min</span>
                        <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-dourado" />{data}</span>
                        <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-dourado" />Méier, Rio de Janeiro</span>
                    </div>
                </div>
            </header>

            <article className="bg-bege-light px-6 py-14 md:py-16">
                <div className="mx-auto max-w-3xl flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        {a.abertura.map((p, i) => (
                            <p key={i} className="font-serif text-xl leading-relaxed text-petroleo">{p}</p>
                        ))}
                    </div>

                    {secoes.map((s, i) => {
                        const Icone = iconeDaSecao(s.titulo);
                        const t = s.titulo.toLowerCase();
                        if (t.includes("crise")) {
                            return (
                                <aside key={i} className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900">
                                    <Phone className="h-6 w-6 shrink-0 text-red-700" />
                                    <div>
                                        <p className="font-serif text-lg font-bold">{s.titulo}</p>
                                        {s.paragrafos.map((p, j) => <p key={j} className="mt-1 leading-relaxed">{p}</p>)}
                                    </div>
                                </aside>
                            );
                        }
                        const comCards = t.startsWith("onde") || t.includes("valor");
                        return (
                            <div key={i} className="flex flex-col gap-4">
                                <section className="flex flex-col gap-3">
                                    <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-petroleo">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-petroleo/10">
                                            <Icone className="h-5 w-5" />
                                        </span>
                                        {s.titulo}
                                    </h2>
                                    <div className="flex flex-col gap-3 sm:pl-[52px]">
                                        {s.paragrafos.map((p, j) => (
                                            <p key={j} className="text-lg leading-relaxed text-petroleo/85">{p}</p>
                                        ))}
                                    </div>
                                    {comCards && (
                                        <div className={`mt-2 grid grid-cols-1 gap-3 sm:pl-[52px] ${cards.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                                            {cards.map(([C, k, v]) => (
                                                <div key={k} className="flex items-start gap-3 rounded-2xl border border-bege-dark/20 bg-white/80 p-4">
                                                    <C className="mt-0.5 h-5 w-5 shrink-0 text-dourado-dark" />
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wider text-petroleo/70">{k}</p>
                                                        <p className="font-medium text-petroleo">{v}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                                {i === 1 && (
                                    <blockquote className="border-l-4 border-dourado bg-dourado/10 py-5 pl-6 pr-4 font-serif text-2xl italic leading-snug text-petroleo">
                                        {a.destaque}
                                    </blockquote>
                                )}
                            </div>
                        );
                    })}

                    {comeco && (
                        <div className="flex flex-col items-start gap-5 rounded-3xl bg-petroleo p-8 sm:flex-row sm:items-center">
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dourado text-petroleo-dark">
                                <MessageSquare className="h-6 w-6" />
                            </span>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-bege-light">{comeco.titulo}</h2>
                                    {comeco.paragrafos.map((p, j) => <p key={j} className="mt-2 text-bege/90">{p}</p>)}
                                </div>
                                <div>
                                    <BotaoWhatsAppServico texto="Falar no WhatsApp" />
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="border-t border-bege-dark/30 pt-4 text-sm text-petroleo/75">
                        <strong className="text-petroleo">{nome}</strong> · Psicóloga Clínica · {crp}
                    </p>
                </div>
            </article>

            <EmergencyBanner />
            <Footer />
        </main>
    );
}
