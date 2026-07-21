import { NextRequest, NextResponse } from "next/server";
import About, { ABOUT_TYPES } from "@/models/About";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("about", "view");
    if (error) return error;

    const { id } = await params;
    const item = await About.findByPk(id);
    if (!item) return NextResponse.json({ error: "Section not found." }, { status: 404 });
    return NextResponse.json(item);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("about", "edit");
    if (error) return error;

    const { id } = await params;
    const item = await About.findByPk(id);
    if (!item) return NextResponse.json({ error: "Section not found." }, { status: 404 });

    const formData = await request.formData();
    const type = formData.get("type") as string | null;
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;
    const description = formData.get("description") as string | null;
    const displayOrder = Number(formData.get("displayOrder") ?? item.displayOrder);
    const isActive = formData.get("isActive") === "true";
    const removePicture = formData.get("removePicture") === "true";
    const file = formData.get("picture") as File | null;

    if (!type || !ABOUT_TYPES.includes(type as (typeof ABOUT_TYPES)[number])) {
        return NextResponse.json({ error: "A valid type is required." }, { status: 400 });
    }
    if (!title) {
        return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let picturePath = item.picture;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "about");
        await deleteUploadedFile(item.picture ?? "");
    } else if (removePicture && item.picture) {
        await deleteUploadedFile(item.picture);
        picturePath = null;
    }

    await item.update({
        type: type as (typeof ABOUT_TYPES)[number],
        title,
        subtitle: subtitle || null,
        description: description || null,
        picture: picturePath,
        displayOrder,
        isActive,
    });

    return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("about", "delete");
    if (error) return error;

    const { id } = await params;
    const item = await About.findByPk(id);
    if (!item) return NextResponse.json({ error: "Section not found." }, { status: 404 });

    if (item.picture) await deleteUploadedFile(item.picture);
    await item.destroy();

    return NextResponse.json({ success: true });
}
