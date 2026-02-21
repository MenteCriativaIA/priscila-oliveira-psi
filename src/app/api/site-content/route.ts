import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "site-content.json");

function readContent() {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
}

function writeContent(data: Record<string, unknown>) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
    try {
        const content = readContent();
        return NextResponse.json(content);
    } catch {
        return NextResponse.json(
            { error: "Failed to read site content" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { field, value } = body;

        if (!field) {
            return NextResponse.json(
                { error: "Field name is required" },
                { status: 400 }
            );
        }

        const content = readContent();

        // Support nested fields like "sobreMim.texto"
        const keys = field.split(".");
        let target: Record<string, unknown> = content;

        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof target[keys[i]] !== "object" || target[keys[i]] === null) {
                target[keys[i]] = {};
            }
            target = target[keys[i]] as Record<string, unknown>;
        }

        target[keys[keys.length - 1]] = value;

        writeContent(content);

        return NextResponse.json({ success: true, field, value });
    } catch {
        return NextResponse.json(
            { error: "Failed to update site content" },
            { status: 500 }
        );
    }
}
