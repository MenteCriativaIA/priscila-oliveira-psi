# Decisões deste site que fecham uma porta

## 09/11/2026 — Datas do sitemap vêm de `src/data/datas-paginas.ts` (e de `artigos.ts`), não da montagem
O sitemap mostrava a data da montagem em todas as páginas (2026-10-18T19:39:05Z). O Google ignora a data quando todas são iguais.
Agora cada grupo de páginas tem a data da última mudança de conteúdo, escrita à mão. **Ao mudar o texto de uma página, atualize a data dela.**
A data de artigo vem de `data` (publicação) e `atualizado` (revisão); o sitemap e o `dateModified` do JSON-LD usam a mesma. O programa `scripts/conferir-seo.mjs` barra se divergirem.
Alternativa descartada: ler a data do `git log` na montagem. A Vercel pode clonar sem histórico completo, e a data sairia errada sem aviso.

## 09/11/2026 — robots.txt com blocos por robô; sem robô de IA citado pelo nome; sem linha Host
Blocos: Googlebot, Bingbot, Twitterbot, facebookexternalhit, `*`. Bloqueios (`/admin`, `/api/`) repetidos em Googlebot, Bingbot e `*`, porque cada robô lê só o próprio bloco.
`Host:` saiu: só o Yandex lê. Robôs de IA seguem o bloco `*`. Bloquear ou liberar um robô de IA específico é decisão da Priscila e do Leandro, em ficha.

## 09/11/2026 — `/admin` e `/api` levam `X-Robots-Tag: noindex, nofollow` em `next.config.ts`
O `robots.txt` só impede a leitura; um endereço já linkado por outro site continua listado. Só o noindex retira.

## 09/11/2026 — Respostas do FAQ ficam escritas no HTML (`forceMount` no acordeão)
O acordeão (Radix) não escrevia a resposta enquanto fechado, mas o FAQPage (JSON-LD) dizia a resposta. Agora `AccordionContent forceMount` + `data-[state=closed]:hidden`.
Custo: a animação de fechar não roda (some na hora); a de abrir segue igual.

## 09/11/2026 — Chave do IndexNow é o arquivo `public/<32 caracteres>.txt`
Não apagar nem trocar sem rodar `npm run avisar:indexnow` de novo. O programa descobre a chave pelo nome do arquivo.

## 09/11/2026 — Imagem de prévia única `public/og-priscila.png` (1200x630), sem foto
Fundo petróleo, nome com "de Freitas", CRP, TCC, Méier e online. Sem foto de pessoa: foto é decisão da Priscila. Vale para home, serviços, casal e artigos (twitter:card `summary_large_image`). Uma imagem por tipo de página fica para depois.
Os campos `image` e `logo` do JSON-LD continuam com o ícone 512x512 (logo quadrado).

## 09/11/2026 — Título e descrição do Google ficam separados do H1 (`tituloBusca`, `src/data/seo-artigos.ts`)
Aprovados pelo Leandro em 09/11/2026 (T1 a T9, "Tudo A"). Serviços: campo `tituloBusca` em `src/data/servicos.ts`; artigos: `src/data/seo-artigos.ts` (artigos.ts é gerado por programa e seria sobrescrito). O H1 da página não mudou.
`conferir-seo` barra título com mais de 60 caracteres e descrição com mais de 155.

## 09/11/2026 — llms.txt e /fatos montados de uma fonte só (`src/lib/fatos.ts`)
Aprovados pelo Leandro em 09/11/2026 ("Tudo A": LLM1, FAT1, CONF1 a CONF3). As 10 perguntas de `fatos.ts` aparecem na tela da `/fatos` (lista `dl`, sempre escrita no HTML), no FAQPage do JSON-LD e na seção "Fatos para citar" do `llms.txt`: mudou o texto num lugar, muda nos três.
O `llms.txt` lê `datasPaginas.llms` para o "Atualizado em": ao mexer no `llms.txt` ou em `fatos.ts`, atualizar `llms` e `fatos` em `src/data/datas-paginas.ts` e `fatosConferidoEm` em `fatos.ts`.
Fonte de cada frase: `marketing/visibilidade-ia/llms-txt-FONTES.md` (projeto Priscila). Frase sem fonte sai.
Horário do consultório publicado vem do perfil do Google Maps (lido em 10/10/2026); se mudar lá, mudar em `dados-estruturados.ts` (`horario`).
