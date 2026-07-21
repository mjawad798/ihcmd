import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";
import { UPLOAD_DIR } from "@/lib/upload";

// Dev/fallback file server for uploaded content stored outside public/.
// In production (and now local dev too, via the httpd.conf Alias) Apache
// serves PUBLIC_MEDIA_URL/* directly from UPLOAD_DIR on disk, so requests
// never reach Node at all — this route only runs where that Alias isn't
// in front of the request, e.g. hitting `next dev` directly without Apache.
const MIME_TYPES: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
};

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { path: segments } = await params;

    // Reject traversal attempts before touching the filesystem.
    if (segments.some((s) => s === ".." || s.includes("\0"))) {
        return NextResponse.json({ error: "Invalid path." }, { status: 400 });
    }

    const filePath = path.join(UPLOAD_DIR, ...segments);
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(UPLOAD_DIR))) {
        return NextResponse.json({ error: "Invalid path." }, { status: 400 });
    }

    try {
        const info = await stat(resolved);
        if (!info.isFile()) throw new Error("Not a file");

        const bytes = await readFile(resolved);
        const ext = path.extname(resolved).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";

        return new NextResponse(bytes, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return NextResponse.json({ error: "File not found." }, { status: 404 });
    }
}
