import { NextRequest, NextResponse } from "next/server";
import VerificationMaster from "@/models/VerificationMaster";
import VerificationDetail from "@/models/VerificationDetail";
import { requireApiPermission } from "@/lib/permissions";

export async function GET() {
    const { error } = await requireApiPermission("verification-master", "view");
    if (error) return error;

    const masters = await VerificationMaster.findAll({
        include: [{ model: VerificationDetail, as: "details", attributes: ["id"] }],
        order: [["id", "ASC"]],
    });
    return NextResponse.json(masters);
}

export async function POST(request: NextRequest) {
    const { error } = await requireApiPermission("verification-master", "add");
    if (error) return error;

    const body = await request.json();
    const { name } = body;

    if (!name) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const master = await VerificationMaster.create({ name });
    return NextResponse.json(master, { status: 201 });
}
