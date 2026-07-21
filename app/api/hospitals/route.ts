import { NextRequest, NextResponse } from "next/server";
import Hospital from "@/models/Hospital";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("hospitals", "view");
    if (error) return error;

    const hospitals = await Hospital.findAll({ order: [["displayOrder", "ASC"], ["id", "ASC"]] });
    return NextResponse.json(hospitals);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("hospitals", "add");
    if (error) return error;

    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const isActive = formData.get("isActive") === "true";
    const displayOrder = Number(formData.get("displayOrder") ?? 0);
    const file = formData.get("logo") as File | null;

    if (!name || !file || file.size === 0) {
        return NextResponse.json({ error: "Name and logo are required." }, { status: 400 });
    }

    const logoPath = await saveUploadedFile(file, "hospitals");

    const hospital = await Hospital.create({
        name,
        logo: logoPath,
        isActive,
        displayOrder,
    });

    return NextResponse.json(hospital, { status: 201 });
}
