// Trava de SEO: confere um site já montado e rodando (local ou no ar) e sai com erro se algo estiver errado.
// Uso:  node scripts/conferir-seo.mjs http://localhost:3101        (depois de `npm run build` e `npm start -- -p 3101`)
//       node scripts/conferir-seo.mjs https://www.priolivepsi.com.br
// Falha se: página do mapa sem texto no HTML bruto; JSON-LD inválido; pergunta do FAQPage sem a mesma resposta escrita
// no HTML; endereço do mapa com noindex ou fora do canonical; faltando title, description ou canonical; data do mapa
// diferente da data do JSON-LD; mapa com changefreq/priority; todas as datas do mapa iguais; /admin sem noindex.
import { readFileSync } from "node:fs";

const alvo = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const oficial = "https://www.priolivepsi.com.br";
const erros = [];
const falha = (msg) => erros.push(msg);

const pegar = async (url, opts) => {
    const r = await fetch(url, { redirect: "manual", ...opts });
    return { status: r.status, headers: r.headers, texto: await r.text() };
};
const entidades = (s) =>
    s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const textoDe = (html) =>
    entidades(html.replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const meta = (html, nome) => {
    const m = html.match(new RegExp(`<meta[^>]*name="${nome}"[^>]*content="([^"]*)"`, "i"));
    return m ? entidades(m[1]) : null;
};

const mapa = await pegar(`${alvo}/sitemap.xml`);
if (mapa.status !== 200) {
    console.error(`sitemap.xml respondeu ${mapa.status}`);
    process.exit(1);
}
if (/<changefreq>|<priority>/.test(mapa.texto)) falha("sitemap.xml ainda tem changefreq/priority (o Google ignora)");
const entradas = [...mapa.texto.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
}));
if (new Set(entradas.map((e) => e.lastmod)).size === 1 && entradas.length > 3) falha("todas as datas do sitemap são iguais (parece data de montagem)");

for (const { loc, lastmod } of entradas) {
    const caminho = loc.replace(oficial, "");
    const r = await pegar(`${alvo}${caminho || "/"}`);
    const nome = caminho || "/";
    if (r.status !== 200) {
        falha(`${nome}: respondeu ${r.status}`);
        continue;
    }
    if (!lastmod) falha(`${nome}: sem lastmod no sitemap`);
    const palavras = textoDe(r.texto).split(" ").length;
    if (palavras < 150) falha(`${nome}: só ${palavras} palavras no HTML bruto (esperado 150 ou mais)`);
    const titulo = r.texto.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    if (!titulo) falha(`${nome}: sem title`);
    if (!meta(r.texto, "description")) falha(`${nome}: sem description`);
    const canonical = r.texto.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
    if (!canonical) falha(`${nome}: sem canonical`);
    else if (canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "")) falha(`${nome}: canonical ${canonical} difere do endereço do mapa ${loc}`);
    const ogLargura = r.texto.match(/<meta[^>]*property="og:image:width"[^>]*content="([^"]*)"/i)?.[1];
    if (ogLargura !== "1200") falha(`${nome}: og:image com largura ${ogLargura ?? "ausente"} (esperado 1200, imagem de prévia 1200x630)`);
    if (/noindex/i.test(meta(r.texto, "robots") ?? "") || /noindex/i.test(r.headers.get("x-robots-tag") ?? "")) falha(`${nome}: está no mapa mas tem noindex`);

    const visivel = textoDe(r.texto);
    const datas = new Set();
    for (const bloco of r.texto.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
        let json;
        try {
            json = JSON.parse(bloco[1]);
        } catch (e) {
            falha(`${nome}: JSON-LD inválido (${e.message})`);
            continue;
        }
        (function andar(x) {
            if (Array.isArray(x)) return x.forEach(andar);
            if (x && typeof x === "object") {
                if (x["@type"] === "Question") {
                    const resp = x.acceptedAnswer?.text ?? "";
                    if (!visivel.includes(x.name)) falha(`${nome}: pergunta do FAQPage não está no texto da página: ${x.name}`);
                    if (!visivel.includes(resp)) falha(`${nome}: resposta do FAQPage não está escrita no HTML: ${x.name}`);
                }
                if (x.dateModified) datas.add(x.dateModified.slice(0, 10));
                Object.values(x).forEach(andar);
            }
        })(json);
    }
    if (datas.size && !datas.has(lastmod?.slice(0, 10))) falha(`${nome}: data do mapa (${lastmod}) diferente do dateModified do JSON-LD (${[...datas]})`);
}

const admin = await pegar(`${alvo}/admin/configuracao`);
if (!/noindex/i.test(admin.headers.get("x-robots-tag") ?? "")) falha("/admin/configuracao sem X-Robots-Tag: noindex");

const robots = await pegar(`${alvo}/robots.txt`);
for (const bot of ["Googlebot", "Bingbot", "*"]) {
    if (!new RegExp(`User-Agent: ${bot.replace("*", "\\*")}\\s[\\s\\S]*?Disallow: /admin`, "i").test(robots.texto)) falha(`robots.txt: bloco ${bot} sem Disallow: /admin`);
}

if (erros.length) {
    console.error(`SEO: ${erros.length} problema(s):`);
    erros.forEach((e) => console.error(" - " + e));
    process.exit(1);
}
console.log(`SEO ok: ${entradas.length} páginas do mapa conferidas em ${alvo}.`);
