// Título e descrição que aparecem no Google para cada artigo (aprovados pelo Leandro em 09/11/2026, T7 a T9).
// Ficam fora de artigos.ts porque aquele arquivo é gerado por programa a partir de marketing/blog/*.md.
// O H1 do artigo continua sendo `titulo` de artigos.ts; `resumo` segue nos cartões, no llms.txt e no JSON-LD.
export const seoArtigos: Record<string, { titulo: string; descricao: string }> = {
    "como-funciona-a-terapia-de-casal": {
        titulo: "Como funciona a terapia de casal | Priscila Oliveira",
        descricao:
            "Como a terapia de casal funciona na prática: o que acontece nas sessões, quando procurar e como começar. Priscila Oliveira de Freitas, CRP 05/84054.",
    },
    "o-que-e-a-tcc": {
        titulo: "O que é Terapia Cognitivo-Comportamental (TCC)?",
        descricao:
            "O que é a Terapia Cognitivo-Comportamental, explicada sem linguagem acadêmica, e como ela acontece nas sessões. Priscila Oliveira de Freitas, CRP 05/84054.",
    },
    "quando-procurar-terapia-para-ansiedade": {
        titulo: "Quando procurar terapia para ansiedade | Priscila Oliveira",
        descricao:
            "Sinais de que a ansiedade está ocupando espaço demais no dia a dia e quando vale procurar terapia. Priscila Oliveira de Freitas, CRP 05/84054.",
    },
};
