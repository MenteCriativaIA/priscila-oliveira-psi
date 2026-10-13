// Etiquetas para robôs (JSON-LD, schema.org): o que Google, ChatGPT, Gemini e Perplexity leem para entender
// quem é a Priscila, onde fica o consultório e do que trata cada página. Tudo sai dos mesmos dados que aparecem
// na tela (site-content.json, artigos.ts, servicos.ts), para a etiqueta nunca dizer uma coisa e a página outra.
// Fatos de marketing/negocio.md e marketing/decisoes-respondidas.md. Sem promessa de resultado (Código de Ética do CFP).
import siteContent from "@/data/site-content.json";
import type { Artigo } from "@/data/artigos";
import { formatarCRP } from "@/lib/crp";
import { telefoneWhatsApp } from "@/lib/whatsapp";

export const siteUrl = "https://www.priolivepsi.com.br";

const idConsultorio = `${siteUrl}/#consultorio`;
const idPriscila = `${siteUrl}/#priscila`;
const idSite = `${siteUrl}/#site`;

const redes = [siteContent.instagram, siteContent.linkedin].filter(Boolean);

export function pessoa() {
    return {
        "@type": "Person",
        "@id": idPriscila,
        name: siteContent.nomeCompleto,
        jobTitle: "Psicóloga Clínica",
        description: `Psicóloga clínica, ${formatarCRP(siteContent.crp)}, com Terapia Cognitivo-Comportamental (TCC).`,
        identifier: {
            "@type": "PropertyValue",
            propertyID: "CRP (Conselho Regional de Psicologia)",
            value: formatarCRP(siteContent.crp).replace(/^CRP\s*/, ""),
        },
        knowsAbout: [
            "Terapia Cognitivo-Comportamental (TCC)",
            "Ansiedade",
            "Depressão",
            "Terapia de casal",
            "Psicologia infantil e de adolescentes",
            "Autoestima",
        ],
        url: siteUrl,
        email: siteContent.emailProfissional,
        sameAs: redes,
        worksFor: { "@id": idConsultorio },
    };
}

// Horário do perfil do Google Maps, lido em 10/10/2026 (marketing/negocio.md).
const horario: [string, string, string][] = [
    ["Monday", "07:00", "19:00"],
    ["Tuesday", "18:00", "22:00"],
    ["Wednesday", "19:00", "22:00"],
    ["Thursday", "09:00", "20:00"],
    ["Friday", "09:00", "20:00"],
    ["Saturday", "09:00", "18:00"],
];

export function consultorio() {
    return {
        "@type": "MedicalBusiness",
        "@id": idConsultorio,
        name: `${siteContent.nomeCompleto} Psicóloga`,
        description:
            "Consultório de psicologia com Terapia Cognitivo-Comportamental (TCC): atendimento presencial no Méier, Rio de Janeiro, e online para todo o Brasil. Adultos, casais (só presencial), crianças e adolescentes. Particular, com recibo para reembolso do plano de saúde.",
        url: siteUrl,
        image: `${siteUrl}/android-chrome-512x512.png`,
        logo: `${siteUrl}/android-chrome-512x512.png`,
        telephone: `+${telefoneWhatsApp(siteContent.telefoneWhatsApp)}`,
        email: siteContent.emailProfissional,
        address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Dias da Cruz, 185, sala 207",
            addressLocality: "Rio de Janeiro",
            addressRegion: "RJ",
            postalCode: "20720-010",
            addressCountry: "BR",
        },
        areaServed: [
            { "@type": "Place", name: "Méier, Rio de Janeiro" },
            { "@type": "City", name: "Rio de Janeiro" },
            { "@type": "Country", name: "Brasil" },
        ],
        openingHoursSpecification: horario.map(([dia, abre, fecha]) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${dia}`,
            opens: abre,
            closes: fecha,
        })),
        paymentAccepted: "PIX, cartão, transferência",
        currenciesAccepted: "BRL",
        priceRange: "Sob consulta",
        availableService: [
            "Psicoterapia presencial",
            "Psicoterapia online",
            "Terapia Cognitivo-Comportamental (TCC)",
            "Terapia de casal",
            "Psicoterapia infantil e de adolescentes",
        ].map((nome) => ({ "@type": "MedicalTherapy", name: nome })),
        founder: { "@id": idPriscila },
        employee: { "@id": idPriscila },
        sameAs: redes,
    };
}

export function site() {
    return {
        "@type": "WebSite",
        "@id": idSite,
        url: siteUrl,
        name: `${siteContent.nomeCompleto} Psicóloga`,
        inLanguage: "pt-BR",
        publisher: { "@id": idConsultorio },
    };
}

export function perguntasFrequentes(itens: { pergunta: string; resposta: string }[]) {
    return {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: itens.map((i) => ({
            "@type": "Question",
            name: i.pergunta,
            acceptedAnswer: { "@type": "Answer", text: i.resposta },
        })),
    };
}

export function trilha(itens: [string, string][]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: itens.map(([nome, url], i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: nome,
            item: url,
        })),
    };
}

export function servico(caminho: string, titulo: string, descricao: string, online: boolean) {
    const url = `${siteUrl}/${caminho}`;
    return [
        {
            "@type": "Service",
            "@id": `${url}#servico`,
            name: titulo,
            description: descricao,
            url,
            serviceType: titulo,
            provider: consultorio(),
            areaServed: online
                ? [{ "@type": "City", name: "Rio de Janeiro" }, { "@type": "Country", name: "Brasil" }]
                : [{ "@type": "Place", name: "Méier, Rio de Janeiro" }],
            availableChannel: {
                "@type": "ServiceChannel",
                serviceLocation: { "@type": "Place", address: consultorio().address },
            },
        },
        trilha([
            ["Início", siteUrl],
            [titulo, url],
        ]),
    ];
}

export function artigo(a: Artigo) {
    const url = `${siteUrl}/blog/${a.slug}`;
    return [
        {
            "@type": "Article",
            "@id": `${url}#artigo`,
            headline: a.titulo,
            description: a.resumo,
            articleSection: a.categoria,
            datePublished: a.data,
            dateModified: a.data,
            inLanguage: "pt-BR",
            url,
            mainEntityOfPage: url,
            image: `${siteUrl}/android-chrome-512x512.png`,
            author: pessoa(),
            publisher: { "@type": "Organization", name: `${siteContent.nomeCompleto} Psicóloga`, url: siteUrl },
        },
        trilha([
            ["Início", siteUrl],
            ["Blog", `${siteUrl}/#blog`],
            [a.titulo, url],
        ]),
    ];
}

// Pronto para pôr numa <script type="application/ld+json">. Troca "<" para a etiqueta não fechar a tag por engano.
export function jsonLd(nos: object[]) {
    return JSON.stringify({ "@context": "https://schema.org", "@graph": nos }).replace(/</g, "\\u003c");
}
