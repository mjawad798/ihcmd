import { NextRequest, NextResponse } from "next/server";
import About, { ABOUT_TYPES } from "@/models/About";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("about", "view");
    if (error) return error;

    const items = await About.findAll({ order: [["type", "ASC"], ["displayOrder", "ASC"], ["id", "ASC"]] });
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("about", "add");
    if (error) return error;

    const formData = await request.formData();

    const type = formData.get("type") as string | null;
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;
    const description = formData.get("description") as string | null;
    const displayOrder = Number(formData.get("displayOrder") ?? 0);
    const isActive = formData.get("isActive") === "true";
    const file = formData.get("picture") as File | null;

    if (!type || !ABOUT_TYPES.includes(type as (typeof ABOUT_TYPES)[number])) {
        return NextResponse.json({ error: "A valid type is required." }, { status: 400 });
    }
    if (!title) {
        return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let picturePath: string | null = null;
    if (file && file.size > 0) {
        picturePath = await saveUploadedFile(file, "about");
    }

    const item = await About.create({
        type: type as (typeof ABOUT_TYPES)[number],
        title,
        subtitle: subtitle || null,
        description: description || null,
        picture: picturePath,
        displayOrder,
        isActive,
    });

    return NextResponse.json(item, { status: 201 });
}
