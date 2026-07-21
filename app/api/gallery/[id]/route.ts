import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Gallery";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("gallery", "view");
    if (error) return error;

    const { id } = await params;
    const item = await Gallery.findByPk(id);
    if (!item) return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("gallery", "edit");
    if (error) return error;

    const { id } = await params;
    const item = await Gallery.findByPk(id);
    if (!item) return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });

    const formData = await request.formData();
    const caption = formData.get("caption") as string | null;
    const isActive = formData.get("isActive") === "true";
    const file = formData.get("picture") as File | null;

    if (!caption) {
        return NextResponse.json({ error: "Caption is required." }, { status: 400 });
    }

    let picturePath = item.picture;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "gallery");
        await deleteUploadedFile(item.picture);
    }

    await item.update({
        caption,
        picture: picturePath,
        isActive,
    });

    return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("gallery", "delete");
    if (error) return error;

    const { id } = await params;
    const item = await Gallery.findByPk(id);
    if (!item) return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });

    await deleteUploadedFile(item.picture);
    await item.destroy();

    return NextResponse.json({ success: true });
}
