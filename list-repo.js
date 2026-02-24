const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

async function listContents(path = "") {
    console.log(`Listing contents of: ${path || "root"}`);
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;

    try {
        const resp = await fetch(url, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        });

        if (!resp.ok) {
            console.error(`❌ Erro ao listar ${path}:`, resp.status);
            return;
        }

        const items = await resp.json();
        for (const item of items) {
            console.log(`${item.type === 'dir' ? '[DIR]' : '[FILE]'} ${item.path}`);
            if (item.type === 'dir' && (item.path === 'src' || item.path === 'src/data' || item.path === 'data')) {
                await listContents(item.path);
            }
        }
    } catch (err) {
        console.error("❌ Erro:", err.message);
    }
}

listContents();
