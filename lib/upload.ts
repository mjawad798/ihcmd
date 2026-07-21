import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

export const DOWNLOAD_ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf"];

export function isAllowedExtension(fileName: string, allowed: string[]): boolean {
    return allowed.includes(path.extname(fileName).toLowerCase());
}

// Centralized upload config. Files live in a project-root folder (sibling
// to app/, public/), not inside public/ — so a redeploy that replaces the
// app's deployable files can never wipe admin-uploaded content. An Apache
// Alias (httpd.conf / .htaccess) maps PUBLIC_MEDIA_URL straight to
// UPLOAD_DIR on disk, so those requests bypass Node entirely in production.
// The app/[PUBLIC_MEDIA_URL]/[...path] route handler is the fallback that
// makes this work in local dev or wherever Apache isn't fronting Node.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "ihcmduploads");
export const PUBLIC_MEDIA_URL = process.env.PUBLIC_MEDIA_URL || "/ihcmduploads";

export async function saveUploadedFile(file: File, subdir: string): Promise<string> {
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || "";
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    const dir = path.join(UPLOAD_DIR, subdir);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, safeName), bytes);

    return `${PUBLIC_MEDIA_URL}/${subdir}/${safeName}`;
}

export async function deleteUploadedFile(publicPath: string) {
    if (!publicPath || !publicPath.startsWith(`${PUBLIC_MEDIA_URL}/`)) return;
    const relative = publicPath.slice(PUBLIC_MEDIA_URL.length + 1);
    const filePath = path.join(UPLOAD_DIR, relative);
    try {
        await unlink(filePath);
    } catch {
        // file may already be gone; ignore
    }
}
