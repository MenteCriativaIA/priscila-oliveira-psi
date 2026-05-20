# 🧩 Guia: Como Criar um Novo Site para uma Psicóloga

Este guia explica como replicar o site da Dra. Priscila Oliveira para uma nova cliente.  
**Tempo estimado:** 15 minutos por site.  
**Custo:** R$ 0 (exceto o domínio da cliente, ~R$40/ano).

---

## Passo 1: Duplicar o Repositório no GitHub

1. Acesse: **https://github.com/MenteCriativaIA/priscila-oliveira-psi**
2. Clique no botão **"Use this template"** (ou "Fork" se não houver o botão)
3. Dê um nome para o novo repositório.  
   **Padrão sugerido:** `site-dra-[nome-da-psicologa]`  
   Exemplo: `site-dra-maria-souza`
4. Marque como **Private** (privado)
5. Clique em **Create repository**

---

## Passo 2: Zerar os Dados do Novo Site

1. No novo repositório, abra o arquivo: `src/data/site-content.json`
2. Clique no **ícone de lápis** (editar)
3. Apague todo o conteúdo e cole o conteúdo do arquivo `template/site-content-template.json`
4. Clique em **Commit changes**

---

## Passo 3: Conectar na Vercel

1. Acesse: **https://vercel.com/new**
2. Clique em **Import Git Repository**
3. Selecione o novo repositório (ex: `site-dra-maria-souza`)
4. Nas configurações:
   - **Framework Preset:** Next.js
   - **Root Directory:** `.` (deixe como está)
5. Clique em **Deploy**

---

## Passo 4: Configurar Variáveis de Ambiente na Vercel

1. Ainda no projeto na Vercel, vá em **Settings → Environment Variables**
2. Adicione estas 4 variáveis:

| Key              | Value                              |
|------------------|------------------------------------|
| `GITHUB_TOKEN`   | Seu token pessoal (começa com ghp_) |
| `GITHUB_OWNER`   | `MenteCriativaIA`                  |
| `GITHUB_REPO`    | `site-dra-maria-souza` (o nome do novo repo) |
| `GITHUB_BRANCH`  | `master` (ou `main`, confira no GitHub) |

3. Faça um **Redeploy** para aplicar as variáveis

---

## Passo 5: Configurar o Domínio (Opcional)

1. Na Vercel, vá em **Settings → Domains**
2. Adicione o domínio da cliente (ex: `www.drafulana.com.br`)
3. A Vercel vai mostrar os **registros DNS** que a cliente precisa configurar no provedor de domínio dela

---

## Passo 6: Enviar o Link do Painel para a Cliente

Envie para a cliente o link:

```
https://[nome-do-projeto].vercel.app/admin/configuracao
```

Exemplo: `https://site-dra-maria-souza.vercel.app/admin/configuracao`

A cliente preenche **todos os campos** do formulário, clica em salvar em cada um, e o site vai se atualizando sozinho! 🎉

---

## ⚠️ Dicas Importantes

- **Token do GitHub:** Use o MESMO token para todos os sites. Ele tem permissão a todos os repositórios da organização `MenteCriativaIA`.
- **Limite do Vercel gratuito:** Cada conta pode ter vários projetos. Não há limite de número de sites.
- **Limite do GitHub gratuito:** Repositórios privados são ilimitados.
- **Atualização após salvar:** Cada vez que a cliente salva um campo, leva ~2 minutos para o site atualizar (é o tempo do Vercel fazer o redeploy).

---

## 📋 Checklist Rápido (Para Colar no seu Bloco de Notas)

```
Nova Cliente: _________________________
Repositório: site-dra-_________________

[ ] 1. Repositório criado no GitHub
[ ] 2. site-content.json zerado com o template
[ ] 3. Projeto importado na Vercel
[ ] 4. Variáveis de ambiente configuradas (4 variáveis)
[ ] 5. Redeploy feito na Vercel
[ ] 6. Domínio configurado (se houver)
[ ] 7. Link do painel admin enviado para a cliente
```
