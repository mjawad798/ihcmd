import { NextRequest, NextResponse } from "next/server";
import Slider from "@/models/Slider";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("slider", "view");
    if (error) return error;

    const { id } = await params;
    const slider = await Slider.findByPk(id);
    if (!slider) return NextResponse.json({ error: "Slider not found." }, { status: 404 });
    return NextResponse.json(slider);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("slider", "edit");
    if (error) return error;

    const { id } = await params;
    const slider = await Slider.findByPk(id);
    if (!slider) return NextResponse.json({ error: "Slider not found." }, { status: 404 });

    const formData = await request.formData();
    const heading = formData.get("heading") as string | null;
    const description = formData.get("description") as string | null;
    const isActive = formData.get("isActive") === "true";
    const displayOrder = Number(formData.get("displayOrder") ?? slider.displayOrder);
    const file = formData.get("image") as File | null;

    if (!heading) {
        return NextResponse.json({ error: "Heading is required." }, { status: 400 });
    }

    let imagePath = slider.image;
    if (file && file.size > 0) {
        imagePath = await saveUploadedFile(file, "slider");
        await deleteUploadedFile(slider.image);
    }

    await slider.update({
        heading,
        description: description || null,
        isActive,
        displayOrder,
        image: imagePath,
    });

    return NextResponse.json(slider);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("slider", "delete");
    if (error) return error;

    const { id } = await params;
    const slider = await Slider.findByPk(id);
    if (!slider) return NextResponse.json({ error: "Slider not found." }, { status: 404 });

    await deleteUploadedFile(slider.image);
    await slider.destroy();

    return NextResponse.json({ success: true });
}
