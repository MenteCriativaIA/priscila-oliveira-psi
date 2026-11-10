import type { Servico } from "@/components/PaginaServico";
import { avisoDeCrise } from "@/lib/fatos";

// Páginas por área (GADS-L3-Q2, 13/10/2026). Só fatos de marketing/negocio.md e decisoes-respondidas.md:
// TCC, sessão de 50 minutos, Méier, online para todo o Brasil, criança e adolescente (D7 = A), particular com recibo.
// Nada de promessa de cura ou de resultado (Código de Ética do CFP).

export const psicologaInfantilMeier: Servico = {
    caminho: "psicologa-infantil-meier",
    titulo: "Psicóloga infantil no Méier",
    tituloBusca: "Psicóloga Infantil no Méier e Online | Priscila Oliveira",
    descricao:
        "Psicóloga infantil no Méier, Rio de Janeiro, e online. Atendimento de crianças e adolescentes com TCC. Priscila Oliveira de Freitas, CRP 05/84054.",
    palavras: [
        "psicóloga infantil Méier",
        "psicólogo infantil Méier",
        "psicóloga para adolescente Méier",
        "psicóloga infantil Rio de Janeiro",
        "Priscila Oliveira",
    ],
    subtitulo:
        "Atendimento de crianças e adolescentes com Terapia Cognitivo-Comportamental (TCC), presencial no Méier e online para todo o Brasil.",
    paraQuem:
        "Para crianças e adolescentes que estão passando por um momento difícil, em casa, na escola ou com as próprias emoções, e para famílias que procuram um espaço de escuta e cuidado para eles.",
    comoFunciona:
        "A TCC é uma abordagem prática e estruturada. Nas sessões, a criança ou o adolescente tem espaço para falar do que está sentindo, e nós vamos entender juntos quais pensamentos e comportamentos estão gerando sofrimento, com ferramentas para o dia a dia.",
    online: true,
    blocos: [
        {
            "titulo": "Sinais que pedem atenção",
            "paragrafos": [
                "Em crianças, costumam chamar atenção:"
            ],
            "lista": [
                {
                    "texto": "mudança no comportamento ou irritação frequente;"
                },
                {
                    "texto": "medo ou preocupação além do esperado para a idade;"
                },
                {
                    "texto": "queda no rendimento na escola;"
                },
                {
                    "texto": "dificuldade para dormir;"
                },
                {
                    "texto": "isolamento dos colegas e da família."
                }
            ],
            "depois": [
                "Em adolescentes, é comum aparecerem o isolamento, mudanças fortes de humor e perda de interesse pelo que gostavam. Essa lista não é diagnóstico: só uma conversa individual mostra o que está acontecendo."
            ]
        },
        {
            "titulo": "Presencial ou online",
            "paragrafos": [
                "Crianças e adolescentes são atendidos no consultório do Méier ou online, para todo o Brasil. Cada sessão tem 50 minutos."
            ]
        },
        {
            "titulo": "Para os responsáveis",
            "paragrafos": [
                "O primeiro passo é uma conversa de 10 minutos por chamada, marcada pelo WhatsApp, para os responsáveis tirarem dúvidas e combinarem o primeiro horário."
            ]
        }
    ],
};

export const tccMeier: Servico = {
    caminho: "terapia-cognitivo-comportamental-meier",
    titulo: "Terapia Cognitivo-Comportamental (TCC) no Méier",
    tituloBusca: "Terapia TCC no Méier e Online | Priscila Oliveira",
    descricao:
        "Terapia Cognitivo-Comportamental (TCC) no Méier, Rio de Janeiro, e online. Psicóloga Priscila Oliveira de Freitas, CRP 05/84054. Sessões de 50 minutos.",
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
        "Para quem quer entender melhor o que sente e por que age de determinado jeito, e procura uma terapia prática, com conversa e ferramentas para o dia a dia. Atendo também crianças e adolescentes.",
    comoFunciona:
        "A TCC é uma abordagem focada em entender como nossos pensamentos e comportamentos impactam nossas emoções. Nas sessões, nós vamos identificar juntos os pensamentos e hábitos que estão gerando sofrimento e trabalhar formas novas de lidar com eles.",
    online: true,
    blocos: [
        {
            "titulo": "Em que situações as pessoas procuram a TCC",
            "paragrafos": [
                "A TCC é a abordagem de todos os atendimentos. Cada tema tem uma página própria:"
            ],
            "lista": [
                {
                    "texto": "Terapia para ansiedade",
                    "href": "/terapia-para-ansiedade"
                },
                {
                    "texto": "Terapia para depressão",
                    "href": "/terapia-para-depressao"
                },
                {
                    "texto": "Terapia de casal no Méier, para conflitos de relacionamento",
                    "href": "/terapia-de-casal-meier"
                },
                {
                    "texto": "Psicóloga infantil no Méier, para crianças e adolescentes",
                    "href": "/psicologa-infantil-meier"
                },
                {
                    "texto": "Autoestima e autoconhecimento, que também fazem parte do atendimento"
                }
            ]
        },
        {
            "titulo": "Como a TCC costuma ser organizada",
            "paragrafos": [
                "A TCC costuma olhar para o que está acontecendo agora e para os pensamentos e comportamentos que mantêm o sofrimento. Paciente e psicóloga combinam juntas no que trabalhar."
            ]
        },
        {
            "titulo": "Presencial no Méier, online no Brasil",
            "paragrafos": [
                "O atendimento presencial é na Rua Dias da Cruz, 185, sala 207, no Méier. O online é para todo o Brasil. A terapia de casal é só presencial."
            ],
            "leiaTambem": {
                "texto": "Leia também: O que é a Terapia Cognitivo-Comportamental (TCC)",
                "href": "/blog/o-que-e-a-tcc"
            }
        }
    ],
};

export const terapiaAnsiedade: Servico = {
    caminho: "terapia-para-ansiedade",
    titulo: "Terapia para ansiedade",
    tituloBusca: "Terapia para Ansiedade no Méier e Online | Priscila Oliveira",
    descricao:
        "Terapia para ansiedade com TCC, presencial no Méier, Rio de Janeiro, e online. Psicóloga Priscila Oliveira de Freitas, CRP 05/84054.",
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
    blocos: [
        {
            "titulo": "Sinais que as pessoas mais descrevem",
            "paragrafos": [
                "A ansiedade é uma emoção comum, e todo mundo sente em algum momento. Ela passa a merecer atenção quando começa a atrapalhar o trabalho, os estudos, o sono ou as relações. Entre os sinais mais descritos:"
            ],
            "lista": [
                {
                    "texto": "preocupação difícil de controlar;"
                },
                {
                    "texto": "inquietação ou tensão no corpo;"
                },
                {
                    "texto": "dificuldade de se concentrar;"
                },
                {
                    "texto": "sono ruim;"
                },
                {
                    "texto": "irritabilidade;"
                },
                {
                    "texto": "evitar situações por medo de errar ou de passar mal."
                }
            ]
        },
        {
            "titulo": "O que a terapia faz e o que ela não faz",
            "paragrafos": [
                "A terapia é um acompanhamento por meio da conversa. Ela não substitui a avaliação médica: se os sintomas no corpo forem fortes ou houver suspeita de outro problema de saúde, vale também consultar um médico. A psicóloga não receita medicamentos."
            ],
            "aviso": avisoDeCrise
        },
        {
            "titulo": "Como começar",
            "paragrafos": [
                "O primeiro passo é uma conversa de 10 minutos por chamada, marcada pelo WhatsApp. Nela eu explico como funciona o acompanhamento e combinamos o primeiro horário."
            ],
            "leiaTambem": {
                "texto": "Leia também: Quando procurar terapia para ansiedade",
                "href": "/blog/quando-procurar-terapia-para-ansiedade"
            }
        }
    ],
};

export const terapiaDepressao: Servico = {
    caminho: "terapia-para-depressao",
    titulo: "Terapia para depressão",
    tituloBusca: "Terapia para Depressão no Méier e Online | Priscila Oliveira",
    descricao:
        "Terapia para depressão e tristeza persistente com TCC, no Méier, Rio de Janeiro, e online. Psicóloga Priscila Oliveira de Freitas, CRP 05/84054.",
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
    blocos: [
        {
            "titulo": "Quando a tristeza merece atenção",
            "paragrafos": [
                "Todo mundo fica triste às vezes. O que chama atenção é quando a tristeza dura semanas e vem com outros sinais, como:"
            ],
            "lista": [
                {
                    "texto": "perda de interesse pelo que antes dava prazer;"
                },
                {
                    "texto": "cansaço e falta de energia;"
                },
                {
                    "texto": "mudança no sono ou no apetite;"
                },
                {
                    "texto": "dificuldade de se concentrar;"
                },
                {
                    "texto": "sentimento de culpa ou de não valer nada."
                }
            ]
        },
        {
            "titulo": "Terapia e avaliação médica",
            "paragrafos": [
                "Diante da suspeita de depressão, vale também uma avaliação médica. A psicóloga trabalha por meio da conversa; remédios, quando indicados, são prescritos por médico."
            ]
        },
        {
            "titulo": "Se for urgente",
            "aviso": avisoDeCrise
        },
        {
            "titulo": "Como começar",
            "paragrafos": [
                "O primeiro passo é uma conversa de 10 minutos por chamada, marcada pelo WhatsApp, para tirar dúvidas e combinar o primeiro horário."
            ]
        }
    ],
};

export const paginasServico = [psicologaInfantilMeier, tccMeier, terapiaAnsiedade, terapiaDepressao];
