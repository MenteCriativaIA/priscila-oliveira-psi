import type { Servico } from "@/components/PaginaServico";

// Páginas por área (GADS-L3-Q2, 13/10/2026). Só fatos de marketing/negocio.md e decisoes-respondidas.md:
// TCC, sessão de 50 minutos, Méier, online para todo o Brasil, criança e adolescente (D7 = A), particular com recibo.
// Nada de promessa de cura ou de resultado (Código de Ética do CFP).

export const psicologaInfantilMeier: Servico = {
    caminho: "psicologa-infantil-meier",
    titulo: "Psicóloga infantil no Méier",
    descricao:
        "Psicóloga infantil no Méier, Rio de Janeiro: atendimento de crianças e adolescentes com Terapia Cognitivo-Comportamental (TCC), com Priscila Oliveira (CRP 05/84054).",
    palavras: [
        "psicóloga infantil Méier",
        "psicólogo infantil Méier",
        "psicóloga para adolescente Méier",
        "psicóloga infantil Rio de Janeiro",
        "Priscila Oliveira",
    ],
    subtitulo:
        "Atendimento de crianças e adolescentes com Terapia Cognitivo-Comportamental (TCC), no consultório do Méier.",
    paraQuem:
        "Para crianças e adolescentes que estão passando por um momento difícil, em casa, na escola ou com as próprias emoções, e para famílias que procuram um espaço de escuta e cuidado para eles.",
    comoFunciona:
        "A TCC é uma abordagem prática e estruturada. Nas sessões, a criança ou o adolescente tem espaço para falar do que está sentindo, e nós vamos entender juntos quais pensamentos e comportamentos estão gerando sofrimento, com ferramentas para o dia a dia.",
    online: false,
};

export const tccMeier: Servico = {
    caminho: "terapia-cognitivo-comportamental-meier",
    titulo: "Terapia Cognitivo-Comportamental (TCC) no Méier",
    descricao:
        "Terapia Cognitivo-Comportamental (TCC) no Méier, Rio de Janeiro, e online para todo o Brasil, com a psicóloga Priscila Oliveira (CRP 05/84054). Sessões de 50 minutos.",
    palavras: [
        "TCC Méier",
        "psicóloga TCC Méier",
        "terapia cognitivo-comportamental Rio de Janeiro",
        "terapia comportamental cognitiva",
        "Priscila Oliveira",
    ],
    subtitulo:
        "Psicoterapia com Terapia Cognitivo-Comportamental (TCC), presencial no Méier e online para todo o Brasil.",
    paraQuem:
        "Para quem quer entender melhor o que sente e por que age de determinado jeito, e procura uma terapia prática, com conversa e ferramentas para o dia a dia. Atendo também crianças e adolescentes, no consultório do Méier.",
    comoFunciona:
        "A TCC é uma abordagem focada em entender como nossos pensamentos e comportamentos impactam nossas emoções. Nas sessões, nós vamos identificar juntos os pensamentos e hábitos que estão gerando sofrimento e trabalhar formas novas de lidar com eles.",
    online: true,
};

export const terapiaAnsiedade: Servico = {
    caminho: "terapia-para-ansiedade",
    titulo: "Terapia para ansiedade",
    descricao:
        "Terapia para ansiedade com Terapia Cognitivo-Comportamental (TCC), presencial no Méier, Rio de Janeiro, e online para todo o Brasil. Psicóloga Priscila Oliveira (CRP 05/84054).",
    palavras: [
        "terapia para ansiedade",
        "psicóloga para ansiedade Méier",
        "terapia para ansiedade online",
        "psicólogo para ansiedade Rio de Janeiro",
        "Priscila Oliveira",
    ],
    subtitulo:
        "Acolhimento e Terapia Cognitivo-Comportamental (TCC) para quem convive com a ansiedade, presencial no Méier e online para todo o Brasil.",
    paraQuem:
        "Para quem sente a ansiedade pesando no dia a dia: preocupação que não para, tensão, dificuldade de desligar a cabeça ou de dar conta das tarefas. A terapia é um espaço para falar disso sem julgamento.",
    comoFunciona:
        "A TCC é uma abordagem prática e estruturada. Nas sessões, nós vamos identificar juntos o que dispara a ansiedade e os pensamentos que a alimentam, e trabalhar estratégias para lidar com ela no dia a dia.",
    online: true,
};

export const terapiaDepressao: Servico = {
    caminho: "terapia-para-depressao",
    titulo: "Terapia para depressão",
    descricao:
        "Terapia para depressão e tristeza persistente com Terapia Cognitivo-Comportamental (TCC), presencial no Méier, Rio de Janeiro, e online para todo o Brasil. Psicóloga Priscila Oliveira (CRP 05/84054).",
    palavras: [
        "terapia para depressão",
        "psicóloga para depressão Méier",
        "terapia para depressão online",
        "tristeza persistente",
        "Priscila Oliveira",
    ],
    subtitulo:
        "Acolhimento e Terapia Cognitivo-Comportamental (TCC) para quem vive a depressão ou uma tristeza que não passa, presencial no Méier e online para todo o Brasil.",
    paraQuem:
        "Para quem sente uma tristeza que não passa, perdeu o interesse pelo que gostava ou está sem energia para o dia a dia. Pedir ajuda já é um passo, e a terapia é um espaço para falar disso com cuidado.",
    comoFunciona:
        "A TCC é uma abordagem prática e estruturada. Nas sessões, nós vamos entender juntos os pensamentos e hábitos que mantêm o desânimo e planejar juntos, aos poucos e no seu ritmo, pequenos passos no dia a dia.",
    online: true,
};

export const paginasServico = [psicologaInfantilMeier, tccMeier, terapiaAnsiedade, terapiaDepressao];
