// Lista de e-mail (M49). O endereço da planilha da Priscila vem da variável de ambiente
// LISTA_EMAIL_ENDPOINT, lida só no servidor.
//
// Os três pontos abaixo entram na Política de Privacidade e comprometem a Priscila: são decisão
// dela (perguntas GADS-L8-Q2, Q3 e Q4). Enquanto algum estiver vazio, a lista fica desligada mesmo com a
// variável: a caixa não aparece e a seção não entra na Política.
export const POLITICA_LISTA: { frequencia: string; acesso: string; prazo: string } = {
    // De quanto em quanto tempo ela manda mensagem. Ex. de formato: "no máximo uma vez por mês".
    frequencia: "",
    // Quem tem acesso à planilha. Ex. de formato: "somente a psicóloga responsável".
    acesso: "",
    // Por quanto tempo os dados ficam guardados. Ex. de formato: "enquanto você estiver inscrito(a); ao sair, são apagados em até 15 dias".
    prazo: "",
};

export function politicaListaCompleta(): boolean {
    return Object.values(POLITICA_LISTA).every((v) => v.trim().length > 0);
}

// No computador de quem programa (next dev) a lista aparece com os pontos ainda vazios, marcados
// para preencher, só para conferir a tela. No site publicado, nunca.
export function listaAtiva(): boolean {
    if (!process.env.LISTA_EMAIL_ENDPOINT) return false;
    return politicaListaCompleta() || process.env.NODE_ENV === "development";
}
