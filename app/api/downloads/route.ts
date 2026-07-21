import { NextRequest, NextResponse } from "next/server";
import Download from "@/models/Download";
import { saveUploadedFile, isAllowedExtension, DOWNLOAD_ALLOWED_EXTENSIONS } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("downloads", "view");
    if (error) return error;

    const items = await Download.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("downloads", "add");
    if (error) return error;

    const formData = await request.formData();

    const title = formData.get("title") as string | null;
    const showInDownloads = formData.get("showInDownloads") === "true";
    const isActive = formData.get("isActive") === "true";
    const file = formData.get("file") as File | null;

    if (!title || !file || file.size === 0) {
        return NextResponse.json({ error: "Title and file are required." }, { status: 400 });
    }

    if (!isAllowedExtension(file.name, DOWNLOAD_ALLOWED_EXTENSIONS)) {
        return NextResponse.json(
            { error: `Only ${DOWNLOAD_ALLOWED_EXTENSIONS.join(", ")} files are allowed.` },
            { status: 400 }
        );
    }

    const filePath = await saveUploadedFile(file, "downloads");

    const item = await Download.create({
        title,
        file: filePath,
        showInDownloads,
        isActive,
    });

    return NextResponse.json(item, { status: 201 });
}
