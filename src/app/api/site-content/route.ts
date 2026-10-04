export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "site-content.json");
const ADMIN_SECRET = process.env.ADMIN_SECRET;

// Environment variables for GitHub Integration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "MenteCriativaIA";
const GITHUB_REPO = process.env.GITHUB_REPO || "priscila-oliveira-psi";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const GITHUB_FILE_PATH = "src/data/site-content.json";

type SiteContent = Record<string, unknown>;
type GitHubContentResponse = {
    content: string;
    sha: string;
};

function isAuthorized(request: Request) {
    if (!ADMIN_SECRET) return process.env.NODE_ENV !== "production";

    const providedSecret = request.headers.get("x-admin-secret");
    return providedSecret === ADMIN_SECRET;
}

function unauthorized() {
    return NextResponse.json(
        { error: "Unauthorized" },
        {
            status: 401,
            headers: { "Cache-Control": "no-store" },
        }
    );
}

function validateUpdate(field: unknown, value: unknown) {
    if (typeof field !== "string" || !field.trim()) {
        return "Field name is required";
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(field)) {
        return "Invalid field name";
    }

    if (typeof value !== "string") {
        return "Field value must be a string";
    }

    if (value.length > 5000) {
        return "Field value is too long";
    }

    return null;
}

async function getGitHubContent() {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = (await response.json()) as GitHubContentResponse;
    const content = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"));
    return { content, sha: data.sha };
}

async function updateGitHubContent(content: SiteContent, sha: string, message: string) {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
            sha,
            branch: GITHUB_BRANCH,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`GitHub Update error: ${error.message || response.statusText}`);
    }

    return response.json();
}

function readLocalContent() {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
}

function writeLocalContent(data: Record<string, unknown>) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: Request) {
    try {
        if (!isAuthorized(request)) return unauthorized();

        // If we have a token, prefer GitHub to get the absolute latest state
        // (especially useful in the admin panel to avoid stale cache from Vercel)
        if (GITHUB_TOKEN) {
            const { content } = await getGitHubContent();
            return NextResponse.json(content, {
                headers: { "Cache-Control": "no-store" },
            });
        }

        const content = readLocalContent();
        return NextResponse.json(content, {
            headers: { "Cache-Control": "no-store" },
        });
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { error: "Failed to read site content" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        if (!isAuthorized(request)) return unauthorized();

        const body = await request.json();
        const { field, value } = body;
        const validationError = validateUpdate(field, value);

        if (validationError) {
            return NextResponse.json(
                { error: validationError },
                { status: 400 }
            );
        }

        const fieldName = field as string;
        const fieldValue = value as string;
        let content: SiteContent;
        let sha: string | undefined;

        if (GITHUB_TOKEN) {
            const result = await getGitHubContent();
            content = result.content;
            sha = result.sha;
        } else {
            content = readLocalContent();
        }

        // Support nested fields like "sobreMim.texto"
        const keys = fieldName.split(".");
        let target: Record<string, unknown> = content;

        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof target[keys[i]] !== "object" || target[keys[i]] === null) {
                target[keys[i]] = {};
            }
            target = target[keys[i]] as Record<string, unknown>;
        }

        target[keys[keys.length - 1]] = fieldValue;

        if (GITHUB_TOKEN && sha) {
            await updateGitHubContent(
                content,
                sha,
                `Admin Update: ${fieldName}`
            );
        } else {
            // Fallback to local file for development
            writeLocalContent(content);
        }

        return NextResponse.json({ success: true, field: fieldName, value: fieldValue });
    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update site content" },
            { status: 500 }
        );
    }
}
