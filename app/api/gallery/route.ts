import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Gallery";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("gallery", "view");
    if (error) return error;

    const items = await Gallery.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("gallery", "add");
    if (error) return error;

    const formData = await request.formData();

    const caption = formData.get("caption") as string | null;
    const isActive = formData.get("isActive") === "true";
    const file = formData.get("picture") as File | null;

    if (!caption || !file || file.size === 0) {
        return NextResponse.json({ error: "Caption and picture are required." }, { status: 400 });
    }

    const picturePath = await saveUploadedFile(file, "gallery");

    const item = await Gallery.create({
        caption,
        picture: picturePath,
        isActive,
    });

    return NextResponse.json(item, { status: 201 });
}
