// Data da última mudança de CONTEÚDO de cada página (aaaa-mm-dd). Alimenta o sitemap.xml e as datas dos dados estruturados.
// Regra: ao mudar o texto de uma página, atualize a data dela aqui. Nunca use a data da montagem do site: o Google passa a
// ignorar o campo quando todas as páginas dizem a mesma data (foi o que aconteceu até 09/11/2026, tudo 2026-10-18).
// Datas iniciais tiradas do último commit que tocou cada grupo de arquivos (git log, 09/11/2026).
export const datasPaginas = {
    inicio: "2026-10-17",
    terapiaDeCasal: "2026-10-17",
    servicos: "2026-10-17", // psicóloga infantil, TCC, ansiedade e depressão (mesmo arquivo de dados)
    privacidade: "2026-10-17",
} as const;
