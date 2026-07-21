import { NextRequest, NextResponse } from "next/server";
import Slider from "@/models/Slider";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("slider", "view");
    if (error) return error;

    const sliders = await Slider.findAll({ order: [["displayOrder", "ASC"], ["id", "ASC"]] });
    return NextResponse.json(sliders);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("slider", "add");
    if (error) return error;

    const formData = await request.formData();

    const heading = formData.get("heading") as string | null;
    const description = formData.get("description") as string | null;
    const isActive = formData.get("isActive") === "true";
    const displayOrder = Number(formData.get("displayOrder") ?? 0);
    const file = formData.get("image") as File | null;

    if (!heading || !file || file.size === 0) {
        return NextResponse.json({ error: "Heading and image are required." }, { status: 400 });
    }

    const imagePath = await saveUploadedFile(file, "slider");

    const slider = await Slider.create({
        heading,
        description: description || null,
        isActive,
        displayOrder,
        image: imagePath,
    });

    return NextResponse.json(slider, { status: 201 });
}
