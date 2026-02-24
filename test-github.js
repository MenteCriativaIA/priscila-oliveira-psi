const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_FILE_PATH = "src/data/site-content.json";

async function test() {
    console.log("Testing GitHub API connection...");
    console.log("- Owner:", GITHUB_OWNER);
    console.log("- Repo:", GITHUB_REPO);
    console.log("- Token:", GITHUB_TOKEN ? "PRESENT (length " + GITHUB_TOKEN.length + ")" : "MISSING");

    if (!GITHUB_TOKEN || GITHUB_TOKEN === "coloque_seu_token_aqui") {
        console.error("ERRO: Token não configurado ou padrão no .env.local");
        return;
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ SUCESSO: Conexão com GitHub API funcionando!");
            console.log("Arquivo encontrado:", GITHUB_FILE_PATH);
            console.log("SHA atual:", data.sha);
        } else {
            console.error("❌ ERRO na API:", response.status, response.statusText);
            const errorData = await response.json();
            console.error("Mensagem:", errorData.message);
        }
    } catch (err) {
        console.error("❌ ERRO fatal:", err.message);
    }
}

test();
