import { NextRequest, NextResponse } from "next/server";
import Affiliation from "@/models/Affiliation";
import { saveUploadedFile } from "@/lib/upload";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("affiliations", "view");
    if (error) return error;

    const affiliations = await Affiliation.findAll({ order: [["displayOrder", "ASC"], ["id", "ASC"]] });
    return NextResponse.json(affiliations);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("affiliations", "add");
    if (error) return error;

    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const isActive = formData.get("isActive") === "true";
    const displayOrder = Number(formData.get("displayOrder") ?? 0);
    const file = formData.get("logo") as File | null;

    if (!name || !file || file.size === 0) {
        return NextResponse.json({ error: "Name and logo are required." }, { status: 400 });
    }

    const logoPath = await saveUploadedFile(file, "affiliations");

    const affiliation = await Affiliation.create({
        name,
        logo: logoPath,
        isActive,
        displayOrder,
    });

    return NextResponse.json(affiliation, { status: 201 });
}
