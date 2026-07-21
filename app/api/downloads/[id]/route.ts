import { NextRequest, NextResponse } from "next/server";
import Download from "@/models/Download";
import { saveUploadedFile, deleteUploadedFile, isAllowedExtension, DOWNLOAD_ALLOWED_EXTENSIONS } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("downloads", "view");
    if (error) return error;

    const { id } = await params;
    const item = await Download.findByPk(id);
    if (!item) return NextResponse.json({ error: "Download not found." }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("downloads", "edit");
    if (error) return error;

    const { id } = await params;
    const item = await Download.findByPk(id);
    if (!item) return NextResponse.json({ error: "Download not found." }, { status: 404 });

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const showInDownloads = formData.get("showInDownloads") === "true";
    const isActive = formData.get("isActive") === "true";
    const file = formData.get("file") as File | null;

    if (!title) {
        return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let filePath = item.file;
    if (file && file.size > 0) {
        if (!isAllowedExtension(file.name, DOWNLOAD_ALLOWED_EXTENSIONS)) {
            return NextResponse.json(
                { error: `Only ${DOWNLOAD_ALLOWED_EXTENSIONS.join(", ")} files are allowed.` },
                { status: 400 }
            );
        }
        filePath = await saveUploadedFile(file, "downloads");
        await deleteUploadedFile(item.file);
    }

    await item.update({
        title,
        file: filePath,
        showInDownloads,
        isActive,
    });

    return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("downloads", "delete");
    if (error) return error;

    const { id } = await params;
    const item = await Download.findByPk(id);
    if (!item) return NextResponse.json({ error: "Download not found." }, { status: 404 });

    await deleteUploadedFile(item.file);
    await item.destroy();

    return NextResponse.json({ success: true });
}
