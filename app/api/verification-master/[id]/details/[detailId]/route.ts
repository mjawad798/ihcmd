import { NextRequest, NextResponse } from "next/server";
import { UniqueConstraintError } from "sequelize";
import VerificationDetail from "@/models/VerificationDetail";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string; detailId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-detail", "view");
    if (error) return error;

    const { detailId } = await params;
    const detail = await VerificationDetail.findByPk(detailId);
    if (!detail) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json(detail);
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-detail", "edit");
    if (error) return error;

    const { detailId } = await params;
    const detail = await VerificationDetail.findByPk(detailId);
    if (!detail) return NextResponse.json({ error: "Record not found." }, { status: 404 });

    const body = await request.json();
    const { serialNumber, registrationNo, studentName, fatherName, duration } = body;

    if (!serialNumber || !registrationNo || !studentName || !fatherName || !duration) {
        return NextResponse.json(
            { error: "Serial number, registration no, student name, father name and duration are all required." },
            { status: 400 }
        );
    }

    try {
        await detail.update({ serialNumber, registrationNo, studentName, fatherName, duration });
        return NextResponse.json(detail);
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            return NextResponse.json(
                { error: "This serial number already exists for this record type." },
                { status: 409 }
            );
        }
        throw err;
    }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-detail", "delete");
    if (error) return error;

    const { detailId } = await params;
    const detail = await VerificationDetail.findByPk(detailId);
    if (!detail) return NextResponse.json({ error: "Record not found." }, { status: 404 });

    await detail.destroy();
    return NextResponse.json({ success: true });
}
