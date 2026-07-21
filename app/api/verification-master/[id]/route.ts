import { NextRequest, NextResponse } from "next/server";
import VerificationMaster from "@/models/VerificationMaster";
import VerificationDetail from "@/models/VerificationDetail";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-master", "view");
    if (error) return error;

    const { id } = await params;
    const master = await VerificationMaster.findByPk(id);
    if (!master) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json(master);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-master", "edit");
    if (error) return error;

    const { id } = await params;
    const master = await VerificationMaster.findByPk(id);
    if (!master) return NextResponse.json({ error: "Record not found." }, { status: 404 });

    const body = await request.json();
    const { name } = body;

    if (!name) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    await master.update({ name });
    return NextResponse.json(master);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-master", "delete");
    if (error) return error;

    const { id } = await params;
    const master = await VerificationMaster.findByPk(id);
    if (!master) return NextResponse.json({ error: "Record not found." }, { status: 404 });

    await VerificationDetail.destroy({ where: { verificationMasterId: master.id } });
    await master.destroy();

    return NextResponse.json({ success: true });
}
