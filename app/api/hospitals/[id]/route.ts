import { NextRequest, NextResponse } from "next/server";
import Hospital from "@/models/Hospital";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("hospitals", "view");
    if (error) return error;

    const { id } = await params;
    const hospital = await Hospital.findByPk(id);
    if (!hospital) return NextResponse.json({ error: "Hospital not found." }, { status: 404 });
    return NextResponse.json(hospital);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("hospitals", "edit");
    if (error) return error;

    const { id } = await params;
    const hospital = await Hospital.findByPk(id);
    if (!hospital) return NextResponse.json({ error: "Hospital not found." }, { status: 404 });

    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const isActive = formData.get("isActive") === "true";
    const displayOrder = Number(formData.get("displayOrder") ?? hospital.displayOrder);
    const file = formData.get("logo") as File | null;

    if (!name) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    let logoPath = hospital.logo;
    if (file && file.size > 0) {
        logoPath = await saveUploadedFile(file, "hospitals");
        await deleteUploadedFile(hospital.logo);
    }

    await hospital.update({
        name,
        logo: logoPath,
        isActive,
        displayOrder,
    });

    return NextResponse.json(hospital);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("hospitals", "delete");
    if (error) return error;

    const { id } = await params;
    const hospital = await Hospital.findByPk(id);
    if (!hospital) return NextResponse.json({ error: "Hospital not found." }, { status: 404 });

    await deleteUploadedFile(hospital.logo);
    await hospital.destroy();

    return NextResponse.json({ success: true });
}
