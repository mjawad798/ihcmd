import { NextRequest, NextResponse } from "next/server";
import { UniqueConstraintError } from "sequelize";
import VerificationDetail from "@/models/VerificationDetail";
import { requireApiPermission } from "@/lib/permissions";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-detail", "view");
    if (error) return error;

    const { id } = await params;
    const details = await VerificationDetail.findAll({
        where: { verificationMasterId: id },
        order: [["id", "DESC"]],
    });
    return NextResponse.json(details);
}

export async function POST(request: NextRequest, { params }: Params) {
    const { error } = await requireApiPermission("verification-detail", "add");
    if (error) return error;

    const { id } = await params;
    const body = await request.json();
    const { serialNumber, registrationNo, studentName, fatherName, duration } = body;

    if (!serialNumber || !registrationNo || !studentName || !fatherName || !duration) {
        return NextResponse.json(
            { error: "Serial number, registration no, student name, father name and duration are all required." },
            { status: 400 }
        );
    }

    try {
        const detail = await VerificationDetail.create({
            verificationMasterId: Number(id),
            serialNumber,
            registrationNo,
            studentName,
            fatherName,
            duration,
        });
        return NextResponse.json(detail, { status: 201 });
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
