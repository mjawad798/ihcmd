import { NextRequest, NextResponse } from "next/server";
import Affiliation from "@/models/Affiliation";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("affiliations", "view");
    if (error) return error;

    const { id } = await params;
    const affiliation = await Affiliation.findByPk(id);
    if (!affiliation) return NextResponse.json({ error: "Affiliation not found." }, { status: 404 });
    return NextResponse.json(affiliation);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("affiliations", "edit");
    if (error) return error;

    const { id } = await params;
    const affiliation = await Affiliation.findByPk(id);
    if (!affiliation) return NextResponse.json({ error: "Affiliation not found." }, { status: 404 });

    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const isActive = formData.get("isActive") === "true";
    const displayOrder = Number(formData.get("displayOrder") ?? affiliation.displayOrder);
    const file = formData.get("logo") as File | null;

    if (!name) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    let logoPath = affiliation.logo;
    if (file && file.size > 0) {
        logoPath = await saveUploadedFile(file, "affiliations");
        await deleteUploadedFile(affiliation.logo);
    }

    await affiliation.update({
        name,
        logo: logoPath,
        isActive,
        displayOrder,
    });

    return NextResponse.json(affiliation);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("affiliations", "delete");
    if (error) return error;

    const { id } = await params;
    const affiliation = await Affiliation.findByPk(id);
    if (!affiliation) return NextResponse.json({ error: "Affiliation not found." }, { status: 404 });

    await deleteUploadedFile(affiliation.logo);
    await affiliation.destroy();

    return NextResponse.json({ success: true });
}
