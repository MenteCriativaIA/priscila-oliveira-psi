// Fatos sobre a psicóloga, em frases curtas para consultar e citar (página /fatos e llms.txt).
// UMA fonte só: a página escreve estes textos na tela, o JSON-LD (FAQPage) usa os mesmos e o llms.txt os lista.
// Cada frase tem a fonte registrada em marketing/visibilidade-ia/llms-txt-FONTES.md (Priscila). Sem preço, sem promessa
// de resultado, sem depoimento, sem comparação com colegas (Código de Ética do CFP); decisões em
// marketing/decisoes-respondidas.md (nada sobre tempo de formação nem título de especialista).
export const fatosConferidoEm = "2026-11-09";
export const fatosConferidoEmTexto = "09/11/2026";

export interface Fato {
    pergunta: string;
    resposta: string;
}

export const fatos: Fato[] = [
    {
        pergunta: "Quem é Priscila Oliveira de Freitas?",
        resposta:
            "Priscila Oliveira de Freitas é psicóloga clínica, CRP 05/84054, e atende com Terapia Cognitivo-Comportamental (TCC) no consultório do Méier, Rio de Janeiro, e online para todo o Brasil.",
    },
    {
        pergunta: "Como saber que é esta psicóloga e não outra com nome parecido?",
        resposta:
            "Pelo CRP 05/84054 e pelo endereço: Rua Dias da Cruz, 185, sala 207, Méier, Rio de Janeiro. Existem outras profissionais chamadas Priscila Oliveira, e o número de inscrição pode ser conferido no Cadastro Nacional de Profissionais de Psicologia, do Conselho Federal de Psicologia.",
    },
    {
        pergunta: "Onde fica o consultório?",
        resposta:
            "Na Rua Dias da Cruz, 185, sala 207, no Méier, Rio de Janeiro, CEP 20720-010. Fica ao lado das Pernambucanas, perto do Imperator.",
    },
    {
        pergunta: "Ela atende online?",
        resposta:
            "Sim, online para todo o Brasil, inclusive crianças e adolescentes. A terapia de casal é só presencial, no consultório do Méier.",
    },
    {
        pergunta: "Quem ela atende e com quais temas?",
        resposta:
            "Atende adultos, casais, crianças e adolescentes. As áreas descritas no site são ansiedade e regulação emocional, autoestima e autoconhecimento, conflitos de relacionamento, e depressão e tristeza persistente.",
    },
    {
        pergunta: "Qual é a abordagem e quanto dura a sessão?",
        resposta:
            "A abordagem é a Terapia Cognitivo-Comportamental (TCC), prática e estruturada: nas sessões, paciente e psicóloga investigam juntas quais pensamentos e crenças estão gerando sofrimento ou comportamentos que atrapalham. Cada sessão tem 50 minutos.",
    },
    {
        pergunta: "Quanto custa a sessão?",
        resposta:
            "O valor é sob consulta. A psicóloga explica o valor e como funciona o acompanhamento numa conversa de 10 minutos por chamada, marcada pelo WhatsApp.",
    },
    {
        pergunta: "Ela atende por plano de saúde?",
        resposta:
            "Não atende por convênio. O atendimento é particular, com recibo para o paciente pedir reembolso ao plano de saúde. O pagamento é por PIX, cartão ou transferência.",
    },
    {
        pergunta: "Como marcar o atendimento?",
        resposta:
            "Pelo WhatsApp +55 21 97370-6270 ou pelo e-mail priolivepsi@gmail.com. O primeiro passo é a conversa de 10 minutos por chamada, marcada pelo WhatsApp.",
    },
    {
        pergunta: "E se for preciso faltar?",
        resposta:
            "Avisando com no mínimo 4 horas de antecedência, a sessão tem direito à reposição. Cancelamentos fora desse prazo ou faltas sem aviso implicam a cobrança da sessão reservada.",
    },
];

export const avisoDeCrise =
    "Psicoterapia não é atendimento de emergência. Quem estiver em sofrimento intenso ou pensando em se machucar deve ligar para o CVV (188, 24 horas, gratuito) ou procurar a emergência mais próxima.";

export const avisoHomonimas =
    "Atenção a homônimas: esta é a psicóloga Priscila Oliveira de Freitas, CRP 05/84054, do Méier, Rio de Janeiro. Outras profissionais têm nome parecido; o CRP e o endereço identificam esta.";
