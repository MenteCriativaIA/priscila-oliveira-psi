// Avisa o Bing (IndexNow) das páginas do mapa do site, sem esperar o robô passar.
// Uso:  node scripts/avisar-indexnow.mjs --ensaio   (só mostra a lista, não envia)
//       node scripts/avisar-indexnow.mjs            (envia de verdade)
// Rodar DEPOIS de publicar, sempre que uma página nova ou alterada for ao ar. O envio lê o sitemap do site NO AR.
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const host = "www.priolivepsi.com.br";
const base = `https://${host}`;
const ensaio = process.argv.includes("--ensaio");
const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");

// A chave é o nome do único arquivo .txt de 32 letras/números em public/ (o conteúdo é igual ao nome).
const arquivos = readdirSync(join(raiz, "public")).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (arquivos.length !== 1) {
    console.error(`Esperava 1 arquivo de chave em public/, achei ${arquivos.length}.`);
    process.exit(1);
}
const key = arquivos[0].replace(".txt", "");
if (readFileSync(join(raiz, "public", arquivos[0]), "utf8").trim() !== key) {
    console.error("O conteúdo do arquivo da chave não é igual ao nome dele.");
    process.exit(1);
}

const mapa = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
const urlList = [...mapa.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`${urlList.length} endereços no mapa do site no ar:`);
for (const u of urlList) console.log(" -", u);

// Confere que a chave está mesmo no ar antes de enviar (senão o Bing recusa).
const noAr = await fetch(`${base}/${key}.txt`);
const conteudo = (await noAr.text()).trim();
console.log(`Chave no ar: ${noAr.status} ${conteudo === key ? "(confere)" : "(NÃO confere)"}`);
if (ensaio) {
    console.log("Ensaio: nada foi enviado.");
    process.exit(0);
}
if (noAr.status !== 200 || conteudo !== key) {
    console.error("A chave ainda não está no ar. Publique o site e rode de novo.");
    process.exit(1);
}

const resposta = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${base}/${key}.txt`, urlList }),
});
console.log(`IndexNow respondeu ${resposta.status} (200 ou 202 = recebido).`);
process.exit(resposta.ok ? 0 : 1);
