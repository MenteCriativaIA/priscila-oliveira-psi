const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

async function debugRepo() {
    console.log("Debugging GitHub Repository Access...");
    console.log("- Owner:", GITHUB_OWNER);
    console.log("- Repo:", GITHUB_REPO);

    const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

    try {
        // 1. Check if repo exists
        const repoResp = await fetch(baseUrl, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        });

        if (!repoResp.ok) {
            console.error("❌ REPO NOT FOUND:", repoResp.status, repoResp.statusText);
            const data = await repoResp.json();
            console.error("Mensagem:", data.message);
            return;
        }
        console.log("✅ Repo encontrado!");

        // 2. List branches
        const branchResp = await fetch(`${baseUrl}/branches`, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        });
        const branches = await branchResp.json();
        console.log("Ramos (branches) disponíveis no GitHub:");
        branches.forEach(b => console.log(`- ${b.name}`));

    } catch (err) {
        console.error("❌ ERRO fatal:", err.message);
    }
}

debugRepo();
