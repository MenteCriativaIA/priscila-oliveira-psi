# Defeitos que custaram mais de uma hora

## 09/11/2026 — `forceMount` no acordeão deixou as respostas abertas na tela
Sintoma: depois de `forceMount`, as 9 respostas do FAQ apareciam abertas, com 44 a 524 px de altura, mesmo com `data-state="closed"`.
Causa: com `forceMount` o Radix não escreve o atributo `hidden`; a classe do componente só animava a saída.
Conserto: `data-[state=closed]:hidden` no `AccordionContent` quando `forceMount` está ligado (`src/components/ui/accordion.tsx`).
Como achei: a checagem de texto passou (`conferir-seo`), mas a medição da altura no navegador mostrou o defeito. A checagem automática não vê o visual; olhe a tela depois de mexer em componente.

## 09/11/2026 — `next build` falhou uma vez com erro de fonte do Google (`module-not-found` em `cormorant_garamond`)
Causa: o download das fontes do Google falhou na rede. A segunda execução passou sem mudar nada. Se repetir, rode o build de novo antes de investigar o código.
